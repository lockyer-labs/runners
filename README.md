<a href="https://runnersbench.com/"><img src="site/og.png" alt="runners/bench: CI runner benchmarks"></a>

<p align="center">
  <a href="https://runnersbench.com/"><img src="https://img.shields.io/badge/results-runnersbench.com-2b3445?style=flat-square" alt="Results"></a>
  <a href="https://github.com/lockyer-labs/runnersbench/actions/workflows/benchmark.yml"><img src="https://img.shields.io/github/actions/workflow/status/lockyer-labs/runnersbench/benchmark.yml?style=flat-square&label=benchmark&color=2b3445" alt="Benchmark workflow"></a>
  <img src="https://img.shields.io/badge/runs-weekly-677286?style=flat-square" alt="Runs weekly">
</p>

Every runner runs the same script at the same moment, three times, and
[runnersbench.com](https://runnersbench.com/) publishes the median and the
spread.

## Providers

<!-- providers:start -->
| | Provider | Linux x64 | Linux arm64 | macOS |
|---|---|:-:|:-:|:-:|
| ![](https://img.shields.io/badge/-%20-4269d0?style=flat-square) | Avrea | ✓ | ✓ | ✓ |
| ![](https://img.shields.io/badge/-%20-efb118?style=flat-square) | Blacksmith | ✓ | ✓ | ✓ |
| ![](https://img.shields.io/badge/-%20-ff725c?style=flat-square) | Buildkite | ✓ |  |  |
| ![](https://img.shields.io/badge/-%20-6cc5b0?style=flat-square) | Celesto | ✓ |  |  |
| ![](https://img.shields.io/badge/-%20-3ca951?style=flat-square) | Checklane | ✓ |  |  |
| ![](https://img.shields.io/badge/-%20-ff8ab7?style=flat-square) | Depot | ✓ | ✓ | ✓ |
| ![](https://img.shields.io/badge/-%20-a463f2?style=flat-square) | GitHub | ✓ | ✓ | ✓ |
| ![](https://img.shields.io/badge/-%20-97bbf5?style=flat-square) | Groundbox | ✓ |  | ✓ |
| ![](https://img.shields.io/badge/-%20-9c6b4e?style=flat-square) | Luxor | ✓ |  | ✓ |
| ![](https://img.shields.io/badge/-%20-9498a0?style=flat-square) | Namespace | ✓ |  |  |
| ![](https://img.shields.io/badge/-%20-4269d0?style=flat-square) | WarpBuild | ✓ | ✓ | ✓ |
<!-- providers:end -->

Linux runners are 4 vCPU on Ubuntu 24.04. Macs don't share a common size, so
each provider runs its smallest Apple Silicon machine on macOS 26.

## What's measured

| Metric | How |
|---|---|
| **Queue** | Job created to runner picking it up |
| **Package install** | `apt-get update` + `sysbench fio build-essential`; `brew install sysbench fio` on macOS |
| **CPU** | `sysbench cpu`, 1 thread and all threads, after a 5 s warm-up (skipped on macOS, where Homebrew's sysbench is broken) |
| **Memory** | `sysbench memory`, single thread |
| **Disk** | `fio` sequential read/write (1M) and 4k random read/write IOPS |
| **Network** | 50 MB from Cloudflare, Redis source from GitHub |
| **Cache** | Save and restore 1 GB of incompressible data with the stock `actions/cache`, so providers that speed it up show it |
| **Redis build** | `make -j$(nproc)`, and its cost at list price with each provider's billing rounding |

Plus the system details each runner reports: CPU model, memory, disk,
virtualization, kernel, location and network.

## How it works

```
setup ─▶ bench × runner × 3 ─▶ analyze ─▶ gh-pages
```

[`benchmark.yml`](.github/workflows/benchmark.yml) runs weekly and on demand.
**setup** builds a matrix from [`providers.json`](providers.json), skipping
runners that already have a result at the current benchmark version.
**bench** runs [`bench/run.py`](bench/run.py) on each runner. **analyze**
merges the results, adds queue times, rebuilds the [site](site/) from every
stored result and refreshes the provider table above.

Run **Benchmark** from the Actions tab with `providers` (e.g. `depot,luxor`),
`repetitions` (default 3) and `force` (re-run runners that have results).

- **Bump [`bench/VERSION`](bench/VERSION)** when a change makes new numbers
  incomparable with stored ones; the next run re-benchmarks everything.
- **Prices and names** are read from `providers.json` at publish time, so
  fixing one needs no re-run.

## Adding a provider

Install its GitHub App on this repo's account, then add an entry to
`providers.json`:

```json
{
  "provider": "example",
  "name": "Example",
  "label": "example-4vcpu-ubuntu-2404",
  "arch": "x64",
  "price_per_minute": 0.008,
  "billing": {"increment_seconds": 60},
  "enabled": true,
  "pricing_source": "https://example.com/pricing"
}
```

- `label` is the `runs-on` value; `arch` is `x64` or `arm64`. Add
  `"os": "macos"` for Apple Silicon.
- `billing.increment_seconds` is `1` for per-second billing or `60` for
  per-minute rounded up. `minimum_seconds` and `grace_seconds` cover rules
  like Namespace's.
- `price_per_minute` may be `null`; `enabled: false` parks a runner.

<details>
<summary><strong>Buildkite setup</strong></summary>

Buildkite doesn't run GitHub Actions jobs, so entries with a `buildkite`
object are run by the `bench-buildkite` job through the Buildkite API
([`bench/buildkite.py`](bench/buildkite.py)), with queue time from Buildkite.

1. Create a cluster with a hosted Linux queue on the Medium AMD64 shape
   (4 vCPU, 16 GB), keyed to match `buildkite.queue` (`linux-medium`).
2. Create a pipeline named `runners` for this repo in that cluster with the
   step `buildkite-agent pipeline upload`, and turn off building on pushes and
   pull requests.
3. Save an API token with `read_builds`, `write_builds` and `read_artifacts`
   as the `BUILDKITE_API_TOKEN` Actions secret.

</details>

## Caveats

- Three runs at one moment show the spread, not changes over time.
- GitHub's `ubuntu-24.04` has 4 vCPUs only on public repos, where it's free;
  it's priced at the 4-core larger runner rate.
- Prices are list prices; check them against each provider's pricing page.
- A label no runner serves sits queued for up to 24 hours. Disable runners
  you lose access to.
