let color = () => null;

const PLATFORMS = [
  ["x64", "Linux x64"],
  ["arm64", "Linux arm64"],
  ["macos", "macOS"],
];

const HEADLINES = [
  ["redis_build", "fastest redis build"],
  ["redis_cost", "cheapest redis build"],
  ["cpu_multi", "most cpu throughput"],
  ["queue", "shortest queue"],
];

function el(tag, props = {}, ...children) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children.filter((c) => c !== null && c !== undefined));
  return node;
}

function fmt(value, metric) {
  if (value === null || value === undefined) return "–";
  if (metric.label.startsWith("$")) return `$${value.toFixed(4)}`;
  if (Math.abs(value) >= 100) return Math.round(value).toLocaleString("en-US");
  return value.toFixed(1);
}

function spread(runner, metric) {
  const range = runner.ranges?.[metric.key];
  const median = runner.medians[metric.key];
  if (!range || !median) return null;
  return Math.round(((range[1] - range[0]) / 2 / Math.abs(median)) * 100);
}

function rangeText(runner, metric) {
  const range = runner.ranges?.[metric.key];
  const value = fmt(runner.medians[metric.key], metric);
  return range ? `median ${value} · ${fmt(range[0], metric)} to ${fmt(range[1], metric)} across ${runner.sample_count} samples` : value;
}

function compact(value, metric) {
  if (value === null || value === undefined || Math.abs(value) < 10000) return fmt(value, metric);
  return Math.abs(value) < 100000 ? `${(value / 1000).toFixed(1)}k` : `${Math.round(value / 1000)}k`;
}

function unit(metric) {
  const match = metric.label.match(/\(([^)]+)\)$/);
  return match ? ` ${match[1]}` : "";
}

function table(node, headers, rows) {
  node.append(el("thead", {}, el("tr", {}, ...headers.map((h) => (typeof h === "string" ? el("th", { textContent: h }) : h)))));
  node.append(el("tbody", {}, ...rows.map((cells) => el("tr", {}, ...cells))));
}

function textCell(text, className = "") {
  return el("td", { className, textContent: text ?? "–" });
}

function swatch(runner) {
  return el("span", { className: "swatch", style: `background:${color(runner.provider)}` });
}

function hint(metric) {
  const text = metric.higher_is_better ? "higher is better" : "lower is better";
  const node = el("span", { className: "hint", title: text, textContent: metric.higher_is_better ? "↑" : "↓" });
  node.setAttribute("aria-label", text);
  return node;
}

function ranked(runners, metric) {
  return runners
    .filter((r) => r.medians[metric.key] !== null)
    .sort((a, b) => (b.medians[metric.key] - a.medians[metric.key]) * (metric.higher_is_better ? 1 : -1));
}

function best(runners, metric) {
  const order = ranked(runners, metric);
  return order.length > 1 ? order[0].medians[metric.key] : null;
}

function renderStats(data) {
  const container = document.getElementById("stats");
  for (const [key, label] of HEADLINES) {
    const metric = data.metrics.find((m) => m.key === key);
    const winner = metric && ranked(data.runners, metric)[0];
    if (!winner) continue;
    const winners = ranked(data.runners, metric).filter((r) => r.medians[key] === winner.medians[key]);
    container.append(el("div", { className: "stat" },
      el("div", { className: "label", textContent: label }),
      el("div", { className: "value" }, fmt(winner.medians[key], metric),
        el("span", { className: "unit", textContent: metric.label.startsWith("$") ? "" : unit(metric) })),
      el("div", { className: "who" }, ...winners.flatMap((r, i) => [i ? ", " : "", swatch(r), r.provider_name]))));
  }
}

function renderTables(data) {
  const { runners, metrics } = data;
  const bests = Object.fromEntries(metrics.map((m) => [m.key, best(runners, m)]));
  document.getElementById("benchmarks-caption").textContent =
    `${runners.length} runners · ${metrics.length} metrics · median of ${Math.max(...runners.map((r) => r.sample_count))} runs · benchmark v${data.benchmark_versions.join(", ")}`;
  const benchmarks = document.getElementById("benchmarks");
  table(
    benchmarks,
    [
      el("th", { className: "corner", textContent: "Metric" }),
      ...runners.map((r) => {
        const th = el("th", { className: "provider", title: r.label, style: `border-top-color:${color(r.provider)}`, textContent: r.provider_name });
        th.dataset.col = r.label;
        return th;
      }),
    ],
    metrics.map((m) => {
      const label = el("td", {}, m.label, hint(m));
      label.dataset.row = m.key;
      return [
        label,
        ...runners.map((r) => {
          const value = r.medians[m.key];
          const cell = textCell(compact(value, m), value !== null && value === bests[m.key] ? "num best" : "num");
          cell.title = rangeText(r, m);
          cell.dataset.row = m.key;
          cell.dataset.col = r.label;
          return cell;
        }),
      ];
    }),
  );

  document.getElementById("runners-caption").textContent = `${runners.length} runners · as reported by each machine`;
  table(
    document.getElementById("runners"),
    ["Provider", "Label", "CPU", "vCPUs", "Memory (GiB)", "Disk (GB)", "$/min", "Billed", "Virtualization", "Location", "Network", "Samples", "Measured"],
    runners.map((r) => [
      el("td", {}, swatch(r), r.provider_name), el("td", {}, el("code", { textContent: r.label })),
      textCell(r.cpu_models.join(", ")), textCell(r.vcpus, "num"), textCell(r.memory_gib, "num"), textCell(r.disk_gb, "num"),
      textCell(r.price_per_minute === null ? null : `$${r.price_per_minute}`, "num"), textCell(r.billing), textCell(r.virtualization),
      textCell(r.location), textCell(r.network), textCell(r.sample_count, "num"),
      el("td", {}, el("a", { href: r.run_url, textContent: new Date(r.measured_at).toLocaleDateString() })),
    ]),
  );
}

function enableHighlighting(node) {
  const rows = new Set();
  const cols = new Set();
  const cells = new Set();
  const toggle = (set, key) => (set.has(key) ? set.delete(key) : set.add(key));

  const update = () => {
    const litRows = new Set(rows);
    const litCols = new Set(cols);
    for (const key of cells) {
      const [row, col] = key.split("|");
      litRows.add(row);
      litCols.add(col);
    }
    node.classList.toggle("spotlight", rows.size + cols.size + cells.size > 0);
    for (const cell of node.querySelectorAll("[data-row], [data-col]")) {
      const { row, col } = cell.dataset;
      if (row && col) {
        cell.classList.toggle("hl", rows.has(row) || cols.has(col) || cells.has(`${row}|${col}`));
      } else if (row) {
        cell.classList.toggle("lit", litRows.has(row) || cols.size > 0);
      } else {
        cell.classList.toggle("lit", litCols.has(col) || rows.size > 0);
      }
    }
  };

  const shift = (e) => node.classList.toggle("shift-held", e.shiftKey);
  document.addEventListener("keydown", shift);
  document.addEventListener("keyup", shift);
  window.addEventListener("blur", () => node.classList.remove("shift-held"));
  node.addEventListener("mousedown", (e) => {
    if (e.shiftKey) e.preventDefault();
  });
  node.addEventListener("click", (e) => {
    const cell = e.shiftKey && e.target.closest("[data-row], [data-col]");
    if (!cell) return;
    getSelection().removeAllRanges();
    const { row, col } = cell.dataset;
    if (row && col) toggle(cells, `${row}|${col}`);
    else if (row) toggle(rows, row);
    else toggle(cols, col);
    update();
  });
  const reset = () => {
    rows.clear();
    cols.clear();
    cells.clear();
    update();
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") reset();
  });
  return reset;
}

function renderBoards(data) {
  const container = document.getElementById("boards");
  for (const metric of data.metrics) {
    const order = ranked(data.runners, metric);
    if (!order.length) continue;
    const max = Math.max(...order.map((r) => r.ranges?.[metric.key]?.[1] ?? r.medians[metric.key]));
    const top = best(data.runners, metric);
    container.append(el("div", { className: "board" },
      el("h3", {}, metric.label, hint(metric)),
      ...order.map((r) => {
        const value = r.medians[metric.key];
        const fill = el("div", { className: "fill" });
        fill.style.width = `${max > 0 ? (value / max) * 100 : 0}%`;
        fill.style.background = color(r.provider);
        const track = el("div", { className: "track" }, fill);
        const range = r.ranges?.[metric.key];
        if (range && max > 0) {
          const whisker = el("div", { className: "range" });
          whisker.style.left = `${(range[0] / max) * 100}%`;
          whisker.style.width = `${((range[1] - range[0]) / max) * 100}%`;
          track.append(whisker);
        }
        const pct = spread(r, metric);
        return el("div", { className: value === top ? "row best" : "row", title: `${r.label} · ${rangeText(r, metric)}` },
          el("span", { className: "name" }, swatch(r), r.provider_name),
          track,
          el("span", { className: "val" }, fmt(value, metric), pct === null ? null : el("span", { className: "spread", textContent: `±${pct}%` })));
      })));
  }
}

function renderErrors(data) {
  document.getElementById("errors-section").hidden = !data.errors.length;
  document.getElementById("errors").append(...data.errors.map((e) =>
    el("li", {}, el("code", { textContent: e.label }), ` ${e.benchmark} (run ${e.run_id}): ${e.error}`)));
}

function render(data, platform, resetHighlights) {
  const runners = data.runners.filter((r) => r.platform === platform);
  const labels = new Set(runners.map((r) => r.label));
  const view = { ...data, runners, errors: data.errors.filter((e) => labels.has(e.label)) };
  for (const id of ["stats", "benchmarks", "runners", "boards", "errors"]) {
    document.getElementById(id).replaceChildren();
  }
  document.getElementById("meta").textContent =
    `benchmark v${data.benchmark_versions.join(", ")} · ${runners.length} runners · updated ${new Date(data.generated_at).toLocaleDateString()}`;
  renderStats(view);
  renderTables(view);
  renderBoards(view);
  renderErrors(view);
  resetHighlights();
}

function renderTabs(data, onSelect) {
  const container = document.getElementById("tabs");
  const platforms = PLATFORMS.filter(([platform]) => data.runners.some((r) => r.platform === platform));
  const select = (platform) => {
    for (const tab of container.children) tab.setAttribute("aria-selected", tab.dataset.platform === platform);
    onSelect(platform);
  };
  for (const [platform, label] of platforms) {
    const count = data.runners.filter((r) => r.platform === platform).length;
    const tab = el("button", { type: "button", className: "tab", textContent: label }, el("span", { className: "count", textContent: count }));
    tab.setAttribute("role", "tab");
    tab.dataset.platform = platform;
    tab.addEventListener("click", () => {
      history.replaceState(null, "", platform === PLATFORMS[0][0] ? location.pathname : `#${platform}`);
      select(platform);
    });
    container.append(tab);
  }
  const fromHash = location.hash.slice(1);
  select(platforms.some(([platform]) => platform === fromHash) ? fromHash : platforms[0][0]);
}

async function main() {
  const data = await (await fetch("data.json", { cache: "no-cache" })).json();
  color = (provider) => data.colors[provider];
  const resetHighlights = enableHighlighting(document.getElementById("benchmarks"));
  renderTabs(data, (platform) => render(data, platform, resetHighlights));
}

main();
