#!/usr/bin/env python3
"""Rewrite the provider table in README.md from the site's data.json, in the site's colours.

Usage: scripts/readme.py <data.json> <README.md>
"""

import json
import sys

START, END = "<!-- providers:start -->", "<!-- providers:end -->"
PLATFORMS = [("x64", "Linux x64"), ("arm64", "Linux arm64"), ("macos", "macOS")]


def table(data):
    names, platforms = {}, {}
    for r in data["runners"]:
        names[r["provider"]] = r["provider_name"]
        platforms.setdefault(r["provider"], set()).add(r["platform"])
    rows = ["| | Provider | " + " | ".join(label for _, label in PLATFORMS) + " |", "|---|---|" + ":-:|" * len(PLATFORMS)]
    for provider in sorted(names):
        swatch = f"![](https://img.shields.io/badge/-%20-{data['colors'][provider].lstrip('#')}?style=flat-square)"
        ticks = " | ".join("✓" if key in platforms[provider] else "" for key, _ in PLATFORMS)
        rows.append(f"| {swatch} | {names[provider]} | {ticks} |")
    return "\n".join(rows)


def main():
    data_path, readme_path = sys.argv[1:3]
    with open(data_path) as f:
        data = json.load(f)
    with open(readme_path) as f:
        readme = f.read()
    head, rest = readme.split(START, 1)
    _, tail = rest.split(END, 1)
    with open(readme_path, "w") as f:
        f.write(f"{head}{START}\n{table(data)}\n{END}{tail}")


if __name__ == "__main__":
    main()
