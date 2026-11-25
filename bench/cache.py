#!/usr/bin/env python3
"""Time an actions/cache save and restore of SIZE_MB of incompressible data.

The workflow runs the stock actions/cache/save and actions/cache/restore steps
between these subcommands, so providers that accelerate actions/cache are
measured as a user would get it without changing their workflow.

  cache.py generate <dir>        write the data, then start the save timer
  cache.py saved <dir>           stop the save timer, delete the data, start the restore timer
  cache.py restored <dir> <hit>  stop the restore timer, check the data, write cache.json
  cache.py delete <key>          remove the cache from GitHub's cache storage
"""

import json
import os
import shutil
import sys
import time
import urllib.request

SIZE_MB = 1024
FILES = 16
TIMES = os.path.join(os.environ.get("RUNNER_TEMP", "/tmp"), "cache-times.json")
OUTPUT = os.path.join(os.environ.get("RUNNER_TEMP", "/tmp"), "cache.json")


def mark(name):
    times = json.load(open(TIMES)) if os.path.exists(TIMES) else {}
    times[name] = time.time()
    with open(TIMES, "w") as f:
        json.dump(times, f)
    return times


def size(path):
    return sum(os.path.getsize(os.path.join(root, n)) for root, _, names in os.walk(path) for n in names)


def generate(path):
    os.makedirs(path, exist_ok=True)
    chunk = SIZE_MB // FILES
    for i in range(FILES):
        with open(os.path.join(path, f"{i:02}.bin"), "wb") as f:
            for _ in range(chunk):
                f.write(os.urandom(2**20))
    mark("save_start")


def saved(path):
    mark("save_end")
    shutil.rmtree(path)
    mark("restore_start")


def restored(path, hit):
    times = mark("restore_end")
    restored_bytes = size(path) if os.path.isdir(path) else 0
    result = {"size_mb": SIZE_MB, "save_seconds": times["save_end"] - times["save_start"]}
    if hit == "true" and restored_bytes == SIZE_MB * 2**20:
        result["restore_seconds"] = times["restore_end"] - times["restore_start"]
    else:
        result["error"] = f"cache-hit={hit!r}, restored {restored_bytes} bytes"
    with open(OUTPUT, "w") as f:
        json.dump(result, f)
    print(json.dumps(result, indent=2))


def delete(key):
    repo, token = os.environ["GITHUB_REPOSITORY"], os.environ["GITHUB_TOKEN"]
    req = urllib.request.Request(
        f"https://api.github.com/repos/{repo}/actions/caches?key={urllib.request.quote(key)}", method="DELETE",
        headers={"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json"})
    try:
        urllib.request.urlopen(req, timeout=30)
    except Exception as e:
        # Providers with their own cache backend never store it on GitHub.
        print(f"Not deleted from GitHub: {e}")


if __name__ == "__main__":
    command, *args = sys.argv[1:]
    {"generate": generate, "saved": saved, "restored": restored, "delete": delete}[command](*args)
