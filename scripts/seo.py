#!/usr/bin/env python3
"""Write crawlable text into the built site from its data.json.

The page renders its tables with JavaScript, so this fills index.html with an
intro naming the providers, answers to common questions from the latest
results, and matching JSON-LD, and writes robots.txt and sitemap.xml.

Usage: scripts/seo.py <site directory containing data.json and index.html>
"""

import json
import os
import re
import sys
from datetime import datetime
from html import escape

URL = "https://runnersbench.com/"
REPO = "https://github.com/lockyer-labs/runnersbench"
PLATFORMS = [("x64", "Linux x64"), ("arm64", "Linux arm64"), ("macos", "macOS")]


def join(items):
    items = list(items)
    return items[0] if len(items) == 1 else ", ".join(items[:-1]) + " and " + items[-1]


def ranked(runners, key):
    return sorted((r for r in runners if r["medians"].get(key) is not None), key=lambda r: r["medians"][key])


def by_platform(data):
    for key, label in PLATFORMS:
        runners = [r for r in data["runners"] if r["platform"] == key]
        if runners:
            yield label, runners


def questions(data):
    names = sorted({r["provider_name"] for r in data["runners"]})
    updated = datetime.fromisoformat(data["generated_at"]).strftime("%-d %B %Y")

    fastest, cheapest, covered = [], [], []
    for label, runners in by_platform(data):
        order = ranked(runners, "redis_build")
        if order:
            runner_up = join(f"{r['provider_name']} ({r['medians']['redis_build']:.1f} s)" for r in order[1:3]) if order[1:] else ""
            fastest.append(f"On {label}, {order[0]['provider_name']} built Redis fastest, in "
                           f"{order[0]['medians']['redis_build']:.1f} s" + (f", ahead of {runner_up}." if runner_up else "."))
        order = ranked(runners, "redis_cost")
        if order:
            cheapest.append(f"On {label}, {order[0]['provider_name']} was cheapest at "
                            f"${order[0]['medians']['redis_cost']:.4f} per Redis build, against "
                            f"${order[-1]['medians']['redis_cost']:.4f} for {order[-1]['provider_name']}.")
        covered.append(f"{label}: {join(sorted({r['provider_name'] for r in runners}))}.")
    per_minute = sorted({r["provider_name"] for r in data["runners"] if (r.get("billing") or "").startswith("per minute")})

    qa = [
        ("Which GitHub Actions runner is the fastest?",
         " ".join(fastest) + " Build time is the median of three runs of make -j on the Redis source."),
        ("Which GitHub Actions runner is the cheapest?",
         " ".join(cheapest) + " Costs use each provider's list price and how it rounds a job's duration."),
        ("Which runner providers are compared?", " ".join(covered)
         + " Linux runners are each provider's 4 vCPU size on Ubuntu 24.04; Macs are each provider's smallest Apple Silicon size on macOS 26."),
        ("How are the runners benchmarked?",
         "Every runner runs the same script at the same moment, three times: sysbench CPU and memory tests after a warm-up, "
         "fio sequential and 4k random disk tests, a download from Cloudflare, package installs, a 1 GB actions/cache save and restore, and a Redis build. "
         "Queue time comes from the GitHub API. The site shows each metric's median and the spread across runs."),
    ]
    if per_minute:
        qa.append(("Why do some runners cost more for short jobs?",
                   f"{join(per_minute)} bill by the minute, rounding every job up, so a 25-second job is charged as a full minute. "
                   "Per-second providers charge only for the time used, which makes a large difference for short jobs."))
    qa.append(("How often are the results updated?",
               f"The benchmark runs weekly on GitHub Actions and the code is open source. These results were updated on {updated}, "
               f"covering {len(names)} providers."))
    return names, qa


def jsonld(data, names, qa):
    graph = [
        {"@type": "WebSite", "@id": URL + "#website", "url": URL, "name": "runners/bench",
         "description": "Benchmarks of GitHub Actions runner providers."},
        {"@type": "Dataset", "@id": URL + "#dataset", "url": URL, "name": "GitHub Actions runner benchmarks",
         "description": f"CPU, memory, disk, network, queue time, Redis build time and cost for GitHub Actions runners from {join(names)}, "
                        "on 4 vCPU Linux x64 and arm64 runners and Apple Silicon Macs.",
         "creator": {"@type": "Person", "name": "Daniel Lockyer", "url": "https://x.com/daniellockyer"},
         "dateModified": data["generated_at"], "isAccessibleForFree": True, "sameAs": REPO,
         "keywords": ["GitHub Actions", "CI runners", "benchmarks", *names],
         "variableMeasured": [m["label"] for m in data["metrics"]],
         "distribution": [
             {"@type": "DataDownload", "encodingFormat": "application/json", "contentUrl": URL + "data.json"},
             {"@type": "DataDownload", "encodingFormat": "application/json", "contentUrl": URL + "results.json"},
             {"@type": "DataDownload", "encodingFormat": "text/markdown", "contentUrl": URL + "report.md"},
         ]},
        {"@type": "FAQPage", "@id": URL + "#questions", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in qa]},
    ]
    body = json.dumps({"@context": "https://schema.org", "@graph": graph}, indent=1).replace("</", "<\\/")
    return f'<script type="application/ld+json">\n{body}\n</script>'


def main():
    site = sys.argv[1]
    with open(os.path.join(site, "data.json")) as f:
        data = json.load(f)
    names, qa = questions(data)

    path = os.path.join(site, "index.html")
    with open(path) as f:
        html = f.read()
    lede = f"{len(names)} GitHub Actions runner providers, benchmarked side by side on Linux x64, arm64 and macOS. Refreshed weekly."
    html = re.sub(r'(<p class="lede" id="lede">).*?(</p>)', lambda m: m.group(1) + lede + m.group(2), html, flags=re.S)
    faq = "\n".join(f"        <div><h3>{escape(q)}</h3><p>{escape(a)}</p></div>" for q, a in qa)
    html = html.replace("        <!-- seo:faq -->", faq).replace("  <!-- seo:jsonld -->", "  " + jsonld(data, names, qa))
    with open(path, "w") as f:
        f.write(html)

    with open(os.path.join(site, "robots.txt"), "w") as f:
        f.write(f"User-agent: *\nAllow: /\n\nSitemap: {URL}sitemap.xml\n")
    with open(os.path.join(site, "sitemap.xml"), "w") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n'
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                f"  <url><loc>{URL}</loc><lastmod>{data['generated_at'][:10]}</lastmod><changefreq>weekly</changefreq></url>\n"
                "</urlset>\n")


if __name__ == "__main__":
    main()
