#!/usr/bin/env python3
"""Summarise benchmark results into a Markdown report.

Accepts result files written by bench/run.py, or combined results.json files
written by this script, and any directories containing them. Multiple samples
of the same runner label are reduced to their median.
"""

import argparse
import json
import math
import os
import statistics
import subprocess
from collections import defaultdict
from datetime import datetime, timezone


def load(paths):
    results = {}
    for path in paths:
        files = [path] if os.path.isfile(path) else [
            os.path.join(root, name) for root, _, names in os.walk(path) for name in names if name.endswith(".json")
        ]
        for file in sorted(files):
            with open(file) as f:
                data = json.load(f)
            for result in data if isinstance(data, list) else [data]:
                if "benchmarks" not in result:
                    continue
                gh, spec = result["github"], result["spec"]
                key = (gh["run_id"], gh["run_attempt"], spec.get("label"), spec.get("rep"))
                if "timing" in results.get(key, {}) and "timing" not in result:
                    continue
                results[key] = result
    return list(results.values())


def apply_providers(results, path):
    """Refresh each result's spec (name, price, ...) from providers.json, so stored results don't need re-running."""
    with open(path) as f:
        specs = {r["label"]: r for r in json.load(f)["runners"]}
    for r in results:
        r["spec"] = {**r["spec"], **specs.get(r["spec"].get("label"), {})}


def job_name(spec):
    return f"{spec['label']} ({spec['rep']})"


def parse_time(value):
    return datetime.fromisoformat(value.replace("Z", "+00:00")) if value else None


def add_job_timing(results):
    """Add queue and job durations from the GitHub API; needs `gh` and a token with actions:read."""
    runs = {(r["github"]["repository"], r["github"]["run_id"], r["github"]["run_attempt"]) for r in results if "timing" not in r}
    jobs = {}
    for repo, run_id, attempt in runs:
        out = subprocess.run(
            ["gh", "api", "--paginate", f"repos/{repo}/actions/runs/{run_id}/attempts/{attempt}/jobs",
             "--jq", ".jobs[] | [.name, .created_at, .started_at, .completed_at] | @tsv"],
            capture_output=True, text=True, check=True,
        ).stdout
        for line in out.splitlines():
            name, created, started, completed = (line.split("\t") + [""] * 4)[:4]
            jobs[(run_id, attempt, name)] = (parse_time(created), parse_time(started), parse_time(completed))
    for r in results:
        if "timing" in r:  # Buildkite results carry their own queue times.
            continue
        created, started, completed = jobs.get((r["github"]["run_id"], r["github"]["run_attempt"], job_name(r["spec"])), (None,) * 3)
        r["timing"] = {
            "queue_seconds": (started - created).total_seconds() if created and started else None,
            "job_seconds": (completed - started).total_seconds() if started and completed else None,
        }


def get(obj, *path):
    for key in path:
        if not isinstance(obj, dict) or obj.get(key) is None:
            return None
        obj = obj[key]
    return obj


def billed_seconds(seconds, billing):
    """What a job of this length is charged for: `grace_seconds` past a boundary are free, then the
    remainder rounds up to a whole `increment_seconds`, with at least `minimum_seconds` charged."""
    increment = billing.get("increment_seconds", 1)
    chargeable = max(seconds - billing.get("grace_seconds", 0), 0)
    return max(math.ceil(chargeable / increment) * increment, billing.get("minimum_seconds", 0))


def billing_label(billing):
    if not billing:
        return None
    if billing.get("increment_seconds", 1) == 1:
        parts = ["per second"]
    elif billing.get("grace_seconds"):
        parts = [f"per minute, rounded up after {billing['grace_seconds']} s"]
    else:
        parts = ["per minute, rounded up"]
    if billing.get("minimum_seconds"):
        parts.append(f"{billing['minimum_seconds'] // 60} min minimum")
    return ", ".join(parts)


def cost_per_build(r):
    price, seconds = get(r, "spec", "price_per_minute"), get(r, "benchmarks", "compile_redis", "seconds")
    if price is None or seconds is None:
        return None
    return price * billed_seconds(seconds, get(r, "spec", "billing") or {}) / 60


# Assigned to providers in alphabetical order; the site and README both read them from data.json.
COLORS = ["#4269d0", "#efb118", "#ff725c", "#6cc5b0", "#3ca951", "#ff8ab7", "#a463f2", "#97bbf5", "#9c6b4e", "#9498a0"]

# (key, column header, extractor, higher_is_better)
METRICS = [
    ("queue", "Queue (s)", lambda r: get(r, "timing", "queue_seconds"), False),
    ("apt_install", "Package install (s)", lambda r: get(r, "benchmarks", "apt_install", "seconds"), False),
    ("cpu_single", "CPU 1 thread (events/s)", lambda r: get(r, "benchmarks", "cpu_single", "events_per_second"), True),
    ("cpu_multi", "CPU all threads (events/s)", lambda r: get(r, "benchmarks", "cpu_multi", "events_per_second"), True),
    ("memory", "Memory (MiB/s)", lambda r: get(r, "benchmarks", "memory", "mib_per_second"), True),
    ("seq_read", "Seq read (MB/s)", lambda r: get(r, "benchmarks", "disk", "seq_read", "mb_per_second"), True),
    ("seq_write", "Seq write (MB/s)", lambda r: get(r, "benchmarks", "disk", "seq_write", "mb_per_second"), True),
    ("rand_read", "4k rand read (IOPS)", lambda r: get(r, "benchmarks", "disk", "rand_read", "iops"), True),
    ("rand_write", "4k rand write (IOPS)", lambda r: get(r, "benchmarks", "disk", "rand_write", "iops"), True),
    ("download", "Download (MB/s)", lambda r: get(r, "benchmarks", "download_cloudflare", "mb_per_second"), True),
    ("cache_save", "Cache save 1 GB (s)", lambda r: get(r, "benchmarks", "cache", "save_seconds"), False),
    ("cache_restore", "Cache restore 1 GB (s)", lambda r: get(r, "benchmarks", "cache", "restore_seconds"), False),
    ("redis_build", "Redis build (s)", lambda r: get(r, "benchmarks", "compile_redis", "seconds"), False),
    ("redis_cost", "$ per Redis build", cost_per_build, False),
]


def fmt(value, header=""):
    if value is None:
        return "–"
    if header.startswith("$"):
        return f"${value:.4f}"
    if abs(value) >= 100:
        return f"{value:,.0f}"
    return f"{value:.1f}"


def table(headers, rows):
    lines = ["| " + " | ".join(headers) + " |", "|" + "---|" * len(headers)]
    lines += ["| " + " | ".join(str(c) for c in row) + " |" for row in rows]
    return "\n".join(lines)


def summarise(results):
    """One entry per runner label, with hardware details and medians across its samples."""
    by_label = defaultdict(list)
    for r in results:
        by_label[(r["spec"].get("provider"), r["spec"].get("label"))].append(r)

    runners = []
    for (provider, label), samples in by_label.items():
        samples.sort(key=lambda r: r["started_at"])
        spec, system = samples[-1]["spec"], samples[-1]["system"]
        mem = get(system, "memory", "total_bytes")
        disk = get(system, "disk", "total_bytes")
        net = system.get("network") or {}
        medians, ranges = {}, {}
        for key, _, extract, _ in METRICS:
            values = [v for v in map(extract, samples) if v is not None]
            medians[key] = statistics.median(values) if values else None
            ranges[key] = [min(values), max(values)] if len(values) > 1 else None
        runners.append({
            "provider": provider,
            "provider_name": spec.get("name") or provider,
            "label": label,
            "arch": spec.get("arch"),
            "platform": "macos" if spec.get("os") == "macos" else spec.get("arch"),
            "price_per_minute": spec.get("price_per_minute"),
            "billing": billing_label(spec.get("billing")),
            "cpu_models": sorted({get(r, "system", "cpu", "model") or "?" for r in samples}),
            "vcpus": get(system, "cpu", "available_cpus"),
            "memory_gib": round(mem / 2**30, 1) if mem else None,
            "disk_gb": round(disk / 1e9) if disk else None,
            "virtualization": system.get("virtualization"),
            "location": ", ".join(filter(None, [net.get("city"), net.get("country")])) or None,
            "network": net.get("org"),
            "medians": medians,
            "ranges": ranges,
            "sample_count": len(samples),
            "measured_at": samples[-1]["started_at"],
            "run_url": f"https://github.com/{samples[-1]['github']['repository']}/actions/runs/{samples[-1]['github']['run_id']}",
        })
    runners.sort(key=lambda x: (x["platform"] or "", x["provider"] or "", x["label"] or ""))

    errors = [
        {"label": r["spec"].get("label"), "run_id": r["github"]["run_id"], "benchmark": name,
         "error": str(b["error"]).splitlines()[0]}
        for r in results for name, b in r["benchmarks"].items() if isinstance(b, dict) and "error" in b
    ]
    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "sample_count": len(results),
        "benchmark_versions": sorted({r.get("benchmark_version") for r in results}, key=lambda v: (v is None, v)),
        "runs": [
            {"run_id": run_id, "url": f"https://github.com/{repo}/actions/runs/{run_id}"}
            for repo, run_id in sorted({(r["github"]["repository"], r["github"]["run_id"]) for r in results})
        ],
        "metrics": [{"key": k, "label": h, "higher_is_better": hib} for k, h, _, hib in METRICS],
        "runners": runners,
        "colors": {p: COLORS[i % len(COLORS)] for i, p in enumerate(sorted({x["provider"] for x in runners}))},
        "errors": errors,
    }


def report(summary):
    runners = summary["runners"]
    info_rows = [
        [x["provider"], f"`{x['label']}`", "<br>".join(x["cpu_models"]), x["vcpus"] or "–",
         x["memory_gib"] or "–", x["disk_gb"] or "–", x["virtualization"] or "–", x["location"] or "–",
         x["network"] or "–", x["sample_count"]]
        for x in runners
    ]

    bench_rows = []
    for x in runners:
        cells = [x["provider"], f"`{x['label']}`"]
        for key, header, _, higher_is_better in METRICS:
            column = [y["medians"][key] for y in runners if y["medians"][key] is not None]
            best = (max if higher_is_better else min)(column) if len(column) > 1 else None
            value = x["medians"][key]
            text = fmt(value, header)
            if x["ranges"][key] and x["ranges"][key][0] != x["ranges"][key][1]:
                text += f" ({' to '.join(fmt(v, header) for v in x['ranges'][key])})"
            cells.append(f"**{text}**" if value is not None and value == best else text)
        bench_rows.append(cells)

    sections = [
        "# Runner benchmark report",
        f"Benchmark version {', '.join(str(v) for v in summary['benchmark_versions'])}. "
        f"{summary['sample_count']} samples from {len(summary['runs'])} workflow run(s). "
        "Benchmark values are medians across samples, with the lowest to highest sample in brackets; "
        "the best median in each column is bold.",
        "## Runners",
        table(["Provider", "Label", "CPU", "vCPUs", "Memory (GiB)", "Disk (GB)", "Virtualization", "Location",
               "Network", "Samples"], info_rows),
        "## Benchmarks",
        table(["Provider", "Label"] + [h for _, h, _, _ in METRICS], bench_rows),
    ]
    if summary["errors"]:
        sections += ["## Errors", "\n".join(f"- `{e['label']}` {e['benchmark']}: {e['error']}" for e in summary["errors"])]
    return "\n\n".join(sections) + "\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paths", nargs="+", help="result files or directories")
    parser.add_argument("--job-timing", action="store_true", help="fetch queue times from the GitHub API")
    parser.add_argument("--providers", help="refresh runner specs (name, price, ...) from this providers.json")
    parser.add_argument("--json", help="write combined results to this file")
    parser.add_argument("--markdown", help="write the report to this file instead of stdout")
    parser.add_argument("--summary", help="write per-runner medians and samples (used by the Pages site) to this file")
    args = parser.parse_args()

    results = load(args.paths)
    if not results:
        parser.error("no results found")
    if args.job_timing:
        add_job_timing(results)
    if args.providers:
        apply_providers(results, args.providers)

    for path in (args.json, args.markdown, args.summary):
        if path:
            os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    if args.json:
        with open(args.json, "w") as f:
            json.dump(results, f, indent=2)
    summary = summarise(results)
    if args.summary:
        with open(args.summary, "w") as f:
            json.dump(summary, f, indent=1)
    text = report(summary)
    if args.markdown:
        with open(args.markdown, "w") as f:
            f.write(text)
    else:
        print(text)


if __name__ == "__main__":
    main()
