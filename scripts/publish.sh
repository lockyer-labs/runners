#!/usr/bin/env bash
# Usage: scripts/publish.sh <new results.json> <gh-pages checkout>
#
# Stores the new results as results/v<benchmark version>/<label>.json, replacing
# that runner's previous result at this version, then rebuilds the site from the
# stored result of every enabled runner in providers.json.
set -euo pipefail
new=$1
pages=$2

version=$(cat bench/VERSION)
store="$pages/results/v$version"
mkdir -p "$store"

jq -r '[.[].spec.label] | unique[]' "$new" | while read -r label; do
  jq --arg label "$label" '[.[] | select(.spec.label == $label)]' "$new" > "$store/$label.json"
done

files=()
while read -r label; do
  if [ -f "$store/$label.json" ]; then
    files+=("$store/$label.json")
  fi
done < <(jq -r '.runners[] | select(.enabled) | .label' providers.json)

find "$pages" -mindepth 1 -maxdepth 1 ! -name .git ! -name results -exec rm -rf {} +
python analyze/analyze.py --providers providers.json --json "$pages/results.json" \
  --summary "$pages/data.json" --markdown "$pages/report.md" "${files[@]}" >/dev/null
cp -r site/. "$pages/"
touch "$pages/.nojekyll"
python scripts/seo.py "$pages"
# GitHub Pages lets browsers cache assets for 10 minutes; a new URL per publish skips that.
sed -i -E "s/(style\.css|app\.js)\"/\1?v=${GITHUB_RUN_ID:-$(date +%s)}\"/" "$pages/index.html"
