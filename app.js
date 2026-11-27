let color = () => null;

const PLATFORMS = [
  ["x64", "Linux x64"],
  ["arm64", "Linux arm64"],
  ["macos", "macOS"],
];

const HEADLINES = [
  ["redis_build", "Fastest Redis build"],
  ["redis_cost", "Cheapest Redis build"],
  ["cpu_multi", "Most CPU throughput"],
  ["queue", "Shortest queue"],
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

function truncate(text, max = 30) {
  const cell = el("td", { textContent: text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text });
  if (text.length > max) cell.title = text;
  return cell;
}

function stacked(main, sub, className = "") {
  return el("td", { className }, ...[].concat(main), sub ? el("span", { className: "sub", textContent: sub }) : null);
}

function showOverflow(scroller) {
  const update = () => {
    const more = scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft > 1;
    scroller.classList.toggle("more", more);
  };
  scroller.addEventListener("scroll", update, { passive: true });
  new ResizeObserver(update).observe(scroller);
  update();
}

function caveat(runner, metric) {
  if (!runner.pricing_caveat || (metric && metric.key !== "redis_cost")) return null;
  const mark = el("sup", { className: "caveat", textContent: "*", title: runner.pricing_caveat });
  mark.setAttribute("aria-label", runner.pricing_caveat);
  return mark;
}

function renderCaveats(runners) {
  const flagged = runners.filter((r) => r.pricing_caveat);
  for (const node of document.querySelectorAll(".pricing-notes")) {
    node.replaceChildren(...(flagged.length ? ["* Extra costs apply. These costs cover compute only and leave out: ",
      ...flagged.flatMap((r, i) => [i ? " " : "", el("strong", { textContent: r.provider_name }), ` ${r.pricing_caveat}`])] : []));
    node.hidden = !flagged.length;
  }
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

// Costs that leave out a plan or other fees are shown, but can't be the cheapest.
function eligible(runner, metric) {
  return !(metric.key === "redis_cost" && runner.pricing_caveat);
}

// The lowest value overall when it belongs to a runner with extra costs, so it can be flagged rather than ranked.
function lowestWithFees(runners, metric) {
  const first = ranked(runners, metric)[0];
  return first && !eligible(first, metric) ? first : null;
}

function best(runners, metric) {
  const order = ranked(runners, metric);
  const top = order.find((r) => eligible(r, metric));
  return order.length > 1 && top ? top.medians[metric.key] : null;
}

function feesLine(runners, metric) {
  const r = lowestWithFees(runners, metric);
  if (!r) return null;
  return el("div", { className: "who fees", title: r.pricing_caveat },
    `${r.provider_name} is ${fmt(r.medians[metric.key], metric)} + fees`);
}

function renderStats(data) {
  const container = document.getElementById("stats");
  for (const [key, label] of HEADLINES) {
    const metric = data.metrics.find((m) => m.key === key);
    const winner = metric && ranked(data.runners, metric).find((r) => eligible(r, metric));
    if (!winner) continue;
    const winners = ranked(data.runners, metric).filter((r) => eligible(r, metric) && r.medians[key] === winner.medians[key]);
    container.append(el("div", { className: "stat" },
      el("div", { className: "label", textContent: label }),
      el("div", { className: "value" }, fmt(winner.medians[key], metric), ...winners.map((r) => caveat(r, metric)),
        el("span", { className: "unit", textContent: metric.label.startsWith("$") ? "" : unit(metric) })),
      el("div", { className: "who" }, ...winners.flatMap((r, i) => [i ? ", " : "", swatch(r), r.provider_name])),
      feesLine(data.runners, metric)));
  }
}

// How a value compares with the best in its row: 1 is the best, 0.5 half as good.
function ratioToBest(value, bestValue, metric) {
  if (value === null || bestValue === null) return null;
  if (metric.higher_is_better) return bestValue > 0 ? value / bestValue : null;
  return value > 0 ? Math.min(bestValue / value, 1) : 1;
}

// Green at the best, amber at half as good, red at a quarter or worse.
function heatHue(ratio) {
  const t = Math.min(Math.max(1 + Math.log2(ratio) / 2, 0), 1);
  return Math.round(10 + t * 120);
}

function renderTables(data) {
  const { runners, metrics } = data;
  const bests = Object.fromEntries(metrics.map((m) => [m.key, best(runners, m)]));
  const withFees = Object.fromEntries(metrics.map((m) => [m.key, lowestWithFees(runners, m)]));
  document.getElementById("benchmarks-caption").textContent =
    `${runners.length} runners · ${metrics.length} metrics · median of ${Math.max(...runners.map((r) => r.sample_count))} runs · benchmark v${data.benchmark_versions.join(", ")}`;
  const benchmarks = document.getElementById("benchmarks");
  table(
    benchmarks,
    [
      el("th", { className: "corner" }, el("button", { className: "sort", type: "button", title: "Restore the default order", textContent: "Metric" })),
      ...runners.map((r, i) => {
        const th = el("th", { className: "provider", title: r.label, style: `border-top-color:${color(r.provider)}`, textContent: r.provider_name });
        th.dataset.col = r.label;
        th.dataset.index = i;
        return th;
      }),
    ],
    metrics.map((m) => {
      const label = el(
        "td",
        {},
        el("button", { className: "sort", type: "button", title: `Sort runners by ${m.label}`, textContent: m.label }),
        hint(m),
        el("span", { className: "sort-order" }),
      );
      label.dataset.row = m.key;
      label.dataset.higher = m.higher_is_better ? "1" : "";
      return [
        label,
        ...runners.map((r) => {
          const value = r.medians[m.key];
          const isBest = value !== null && value === bests[m.key] && eligible(r, m);
          const className = isBest ? "num best" : withFees[m.key] === r ? "num lowest-fees" : eligible(r, m) ? "num" : "num caveated";
          const cell = textCell(compact(value, m), className);
          if (value !== null) cell.append(caveat(r, m) ?? "");
          cell.title = rangeText(r, m);
          const ratio = eligible(r, m) ? ratioToBest(value, bests[m.key], m) : null;
          if (ratio !== null) {
            cell.style.setProperty("--heat", heatHue(ratio));
            cell.title += ` · ${Math.round(ratio * 100)}% of the best`;
          }
          cell.dataset.row = m.key;
          cell.dataset.col = r.label;
          cell.dataset.value = value ?? "";
          return cell;
        }),
      ];
    }),
  );

  document.getElementById("runners-caption").textContent = `${runners.length} runners · as reported by each machine`;
  const runnersTable = document.getElementById("runners");
  const headers = ["Provider", "CPU", "vCPU · RAM · Disk", "Price", "Compliance", "Location"];
  table(
    runnersTable,
    headers,
    runners.map((r) => [
      stacked([swatch(r), r.provider_name], r.label, "provider"),
      truncate([...new Set(r.cpu_models.map(cpuName))].join(", "), 26),
      textCell([r.vcpus, r.memory_gib && `${r.memory_gib} GiB`, r.disk_gb && `${r.disk_gb} GB`].filter(Boolean).join(" · ") || null),
      stacked([r.price_per_minute === null ? "–" : `$${r.price_per_minute}/min`, caveat(r) ?? ""], r.billing),
      complianceCell(data.compliance?.[r.provider]),
      stacked(r.location ?? "–", r.network?.replace(/^AS\d+\s+/, "")),
    ]),
  );
  // Labels and a single content box per cell, for the card layout on narrow screens.
  for (const tr of runnersTable.tBodies[0].rows) {
    [...tr.cells].forEach((td, i) => {
      td.dataset.label = headers[i];
      if (i) td.replaceChildren(el("span", {}, ...td.childNodes));
    });
  }
}

function complianceParts(entry) {
  if (!entry) return [];
  const soc2 = entry.soc2 === "In progress" ? "SOC 2 in progress" : entry.soc2 && `SOC 2 ${entry.soc2}`;
  return [soc2, entry.iso27001 === true && "ISO 27001"].filter(Boolean);
}

// "Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz" -> "Intel Xeon Platinum 8375C"
function cpuName(model) {
  return model.replace(/\((R|TM)\)/g, "").replace(/ CPU @.*$/, "").replace(/ \d+-Core Processor$| Processor$/, "").replace(/\s+/g, " ").trim();
}

function complianceCell(entry) {
  const parts = complianceParts(entry);
  if (!parts.length) return el("td", { className: "muted", textContent: "–", title: entry?.note ?? "No claim found on the provider's site" });
  const link = el("a", { href: entry.source, title: entry.note ?? "As stated by the provider" },
    ...parts.flatMap((part, i) => (i ? [el("br"), part] : [part])));
  return el("td", { className: entry.soc2 === "In progress" ? "muted" : "" }, link);
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

// Reorders the runner columns by one metric row, best first or worst first. Runners without a value go last.
function enableSorting(node) {
  let sort = null;

  const apply = () => {
    const headers = [...node.querySelectorAll("thead th[data-col]")];
    const original = headers.sort((a, b) => a.dataset.index - b.dataset.index).map((th) => th.dataset.col);
    const label = sort && node.querySelector(`tbody td[data-row="${sort.row}"]:not([data-col])`);
    let order = original;
    if (label) {
      const values = new Map(
        [...node.querySelectorAll(`td[data-row="${sort.row}"][data-col]`)].map((c) => [c.dataset.col, c.dataset.value === "" ? null : Number(c.dataset.value)]),
      );
      const sign = (label.dataset.higher === "1") === sort.bestFirst ? -1 : 1;
      order = [...original].sort((a, b) => {
        const x = values.get(a);
        const y = values.get(b);
        if (x === null || y === null) return (x === null) - (y === null);
        return sign * (x - y);
      });
    }
    for (const tr of node.querySelectorAll("tr")) {
      const cells = new Map([...tr.querySelectorAll("[data-col]")].map((c) => [c.dataset.col, c]));
      tr.append(...order.map((col) => cells.get(col)));
    }
    for (const td of node.querySelectorAll("tbody td[data-row]:not([data-col])")) {
      td.classList.toggle("sorted", td === label);
      td.querySelector(".sort-order").textContent = td === label ? (sort.bestFirst ? "best first" : "worst first") : "";
    }
  };

  node.addEventListener("click", (e) => {
    const button = !e.shiftKey && e.target.closest("button.sort");
    if (!button) return;
    const row = button.closest("td")?.dataset.row;
    sort = !row ? null : sort?.row === row ? { row, bestFirst: !sort.bestFirst } : { row, bestFirst: true };
    apply();
  });
  return apply;
}

const DEFAULT_PICKS = ["redis_build", "redis_cost", "download"];
let picks = (new URLSearchParams(location.search).get("pick") ?? localStorage.getItem("picks") ?? DEFAULT_PICKS.join(","))
  .split(",")
  .filter(Boolean);

function savePicks() {
  localStorage.setItem("picks", picks.join(","));
  const url = new URL(location.href);
  url.searchParams.set("pick", picks.join(","));
  history.replaceState(null, "", url);
}

// Ranks runners by the average of their share of the best value on each picked metric.
function renderCustom(data) {
  const node = document.getElementById("custom");
  const available = data.metrics.filter((m) => best(data.runners, m) !== null);
  const chosen = available.filter((m) => picks.includes(m.key));
  const chips = el("div", { className: "picks" }, ...available.map((m) => {
    const chip = el("button", { type: "button", className: "pick", textContent: m.label });
    chip.setAttribute("aria-pressed", chosen.includes(m));
    chip.addEventListener("click", () => {
      picks = picks.includes(m.key) ? picks.filter((k) => k !== m.key) : [...picks, m.key];
      savePicks();
      renderCustom(data);
    });
    return chip;
  }));
  node.replaceChildren(
    el("h3", {}, "Leaderboard"),
    el("p", { className: "caption", textContent: "Pick the metrics that matter to you. Each runner scores the average of how close it gets to the best on each one, so 100 means best on all of them." }),
    chips,
  );
  if (!chosen.length) {
    node.append(el("p", { className: "caption", textContent: "Pick at least one metric." }));
    return;
  }

  const scored = [];
  const unranked = [];
  for (const r of data.runners) {
    const parts = chosen.map((m) => [m, ratioToBest(r.medians[m.key], best(data.runners, m), m)]);
    if (parts.some(([, ratio]) => ratio === null)) unranked.push(r);
    else scored.push({ r, parts, score: parts.reduce((sum, [, ratio]) => sum + Math.min(ratio, 1), 0) / parts.length });
  }
  scored.sort((a, b) => b.score - a.score);
  const winner = scored.find(({ r }) => chosen.every((m) => eligible(r, m)));
  node.style.setProperty("--picked", chosen.length);
  node.append(el("div", { className: "row head" },
    el("span", { className: "name" }), el("span", { className: "bar-head" }), el("span", { className: "val", textContent: "Score" }),
    ...chosen.map((m) => el("span", { className: "raw" }, m.label, hint(m)))));
  node.append(...scored.map((entry) => {
    const { r, parts, score } = entry;
    const fill = el("div", { className: "fill" });
    fill.style.width = `${score * 100}%`;
    fill.style.background = color(r.provider);
    const breakdown = parts.map(([m, ratio]) => `${m.label}: ${fmt(r.medians[m.key], m)}, ${Math.round(Math.min(ratio, 1) * 100)}% of the best`);
    const marks = chosen.map((m) => caveat(r, m)).filter(Boolean);
    const rowClass = marks.length ? "row caveated" : entry === winner ? "row best" : "row";
    return el("div", { className: rowClass, title: [r.label, ...breakdown].join("\n") },
      el("span", { className: "name" }, swatch(r), r.provider_name),
      el("div", { className: "track" }, fill),
      el("span", { className: "val" }, String(Math.round(score * 100)), ...marks),
      ...chosen.map((m) => {
        const value = r.medians[m.key];
        const className = !eligible(r, m) ? "raw caveated" : value === best(data.runners, m) ? "raw top" : "raw";
        return el("span", { className }, fmt(value, m), caveat(r, m) ?? "");
      }));
  }));
  if (unranked.length) {
    node.append(el("p", { className: "caption unranked", textContent: `Not ranked, missing a picked metric: ${unranked.map((r) => r.provider_name).join(", ")}` }));
  }
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
        const rowClass = r === lowestWithFees(data.runners, metric) ? "row lowest-fees"
          : !eligible(r, metric) ? "row caveated" : value === top ? "row best" : "row";
        return el("div", { className: rowClass, title: `${r.label} · ${rangeText(r, metric)}` },
          el("span", { className: "name" }, swatch(r), r.provider_name),
          track,
          el("span", { className: "val" }, fmt(value, metric), caveat(r, metric), rowClass === "row lowest-fees"
            ? el("span", { className: "spread", textContent: "+ fees" })
            : pct === null ? null : el("span", { className: "spread", textContent: `±${pct}%` })));
      })));
  }
}

// Miller projection in degree units, matching scripts/worldmap.py.
function project([lat, lon]) {
  return [lon, (-180 / Math.PI) * 1.25 * Math.log(Math.tan(Math.PI / 4 + (0.4 * lat * Math.PI) / 180))];
}

// Frames the runners of every tab, so the map stays still when switching tabs.
function mapFrame(runners) {
  const points = runners.filter((r) => r.coordinates).map((r) => project(r.coordinates));
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const x = Math.min(...xs) - 14;
  const width = Math.max(...xs) + 14 - x;
  let y = Math.min(...ys) - 10;
  let height = Math.max(...ys) + 10 - y;
  const minHeight = width / 2.6;
  if (height < minHeight) {
    y -= (minHeight - height) / 2;
    height = minHeight;
  }
  return { x, y, width, height };
}

function renderMap(data, everyRunner) {
  const node = document.getElementById("map");
  const frame = mapFrame(everyRunner);
  const cities = new Map();
  for (const r of data.runners.filter((r) => r.coordinates)) {
    if (!cities.has(r.location)) cities.set(r.location, { name: r.location, point: project(r.coordinates), runners: [] });
    cities.get(r.location).runners.push(r);
  }
  // Cities closer than 3% of the map's width share a marker.
  const markers = [];
  for (const city of [...cities.values()].sort((a, b) => b.runners.length - a.runners.length)) {
    const near = markers.find((m) => Math.hypot(m.point[0] - city.point[0], m.point[1] - city.point[1]) < frame.width * 0.03);
    if (near) near.cities.push(city);
    else markers.push({ point: city.point, cities: [city] });
  }

  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `${frame.x} ${frame.y} ${frame.width} ${frame.height}`);
  svg.setAttribute("aria-hidden", "true");
  const land = document.createElementNS(NS, "use");
  land.setAttribute("href", "land.svg#land");
  svg.append(land);
  const canvas = el("div", { className: "map-canvas", style: `aspect-ratio:${frame.width} / ${frame.height}` }, svg);
  const list = el("ul", { className: "map-list" });

  markers.forEach((marker, i) => {
    const runners = marker.cities.flatMap((c) => c.runners);
    const providers = [...new Map(runners.map((r) => [r.provider, r])).values()];
    const pin = el("span", {
      className: "pin",
      title: marker.cities.map((c) => `${c.name}: ${c.runners.map((r) => r.provider_name).join(", ")}`).join("\n"),
      style: `left:${((marker.point[0] - frame.x) / frame.width) * 100}%;top:${((marker.point[1] - frame.y) / frame.height) * 100}%`,
    }, ...providers.map((r) => el("span", { className: "dot", style: `background:${color(r.provider)}` })));
    pin.dataset.marker = i;
    canvas.append(pin);
    for (const city of marker.cities) {
      const item = el("li", {},
        el("span", { className: "where", textContent: city.name }),
        el("span", { className: "who" }, ...city.runners.map((r) => el("span", { className: "nowrap" }, swatch(r), r.provider_name))));
      item.dataset.marker = i;
      list.append(item);
    }
  });

  const focus = (marker) => {
    node.classList.toggle("focus", marker !== null);
    for (const item of node.querySelectorAll("[data-marker]")) item.classList.toggle("on", item.dataset.marker === marker);
  };
  for (const item of [...canvas.querySelectorAll(".pin"), ...list.children]) {
    item.addEventListener("mouseenter", () => focus(item.dataset.marker));
    item.addEventListener("mouseleave", () => focus(null));
  }
  node.append(canvas, list);
}

function renderErrors(data) {
  document.getElementById("errors-section").hidden = !data.errors.length;
  document.getElementById("errors").append(...data.errors.map((e) =>
    el("li", {}, el("code", { textContent: e.label }), ` ${e.benchmark} (run ${e.run_id}): ${e.error}`)));
}

function render(data, platform, afterRender) {
  const runners = data.runners.filter((r) => r.platform === platform);
  const labels = new Set(runners.map((r) => r.label));
  const view = { ...data, runners, errors: data.errors.filter((e) => labels.has(e.label)) };
  for (const id of ["stats", "benchmarks", "runners", "map", "custom", "boards", "errors"]) {
    document.getElementById(id).replaceChildren();
  }
  document.getElementById("meta").textContent =
    `Updated ${new Date(data.generated_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · median of 3 runs · benchmark v${data.benchmark_versions.join(", ")}`;
  renderStats(view);
  renderTables(view);
  renderCustom(view);
  renderBoards(view);
  renderMap(view, data.runners);
  renderErrors(view);
  renderCaveats(runners);
  afterRender();
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
      history.replaceState(null, "", platform === PLATFORMS[0][0] ? location.pathname + location.search : `#${platform}`);
      select(platform);
    });
    container.append(tab);
  }
  const fromHash = location.hash.slice(1);
  select(platforms.some(([platform]) => platform === fromHash) ? fromHash : platforms[0][0]);
}

function enableHeatMap(node) {
  const toggle = document.getElementById("heat-toggle");
  const legend = document.getElementById("heat-legend");
  const apply = () => {
    node.classList.toggle("heat", toggle.checked);
    legend.hidden = !toggle.checked;
  };
  // On unless the visitor turned it off, which stores "".
  toggle.checked = localStorage.getItem("heat") !== "";
  toggle.addEventListener("change", () => {
    localStorage.setItem("heat", toggle.checked ? "1" : "");
    apply();
  });
  apply();
}

// Scrolls without touching location.hash, which holds the selected platform tab.
function enableSectionNav() {
  const nav = document.querySelector(".section-nav");
  const links = [...nav.querySelectorAll("a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  const bar = nav.querySelector(".wrap");
  let shown;
  for (const [i, a] of links.entries()) {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      sections[i].scrollIntoView({ behavior: "smooth" });
    });
  }
  const update = () => {
    const line = nav.offsetHeight + 24;
    let current = -1;
    sections.forEach((s, i) => {
      if (s.getBoundingClientRect().top <= line) current = i;
    });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = sections.length - 1;
    if (current === shown) return;
    shown = current;
    links.forEach((a, i) => a.classList.toggle("active", i === current));
    const a = links[current];
    if (a) bar.scrollLeft = a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2;
  };
  addEventListener("scroll", update, { passive: true });
  update();
}

async function main() {
  const data = await (await fetch("data.json", { cache: "no-cache" })).json();
  color = (provider) => data.colors[provider];
  const resetHighlights = enableHighlighting(document.getElementById("benchmarks"));
  const applySort = enableSorting(document.getElementById("benchmarks"));
  enableHeatMap(document.getElementById("benchmarks"));
  document.querySelectorAll(".scroll").forEach(showOverflow);
  renderTabs(data, (platform) =>
    render(data, platform, () => {
      resetHighlights();
      applySort();
    }),
  );
  enableSectionNav();
}

main();
