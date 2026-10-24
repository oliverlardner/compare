# compare

Compare local hardware cost and model fit with cloud API token costs.

## Live site

**[compare.openmoss.cloud](https://compare.openmoss.cloud)**

## What this repo contains

A dependency-free static comparison tool with:

- a hardware/model matrix, memory-fit and swap-risk warnings;
- Apple AU hardware selectors, MacBook Pro configurations and an NVIDIA DGX Spark comparison;
- configurable local-versus-cloud break-even calculations, electricity costs and AUD/USD display;
- illustrative multi-machine scaling, with MacBook Pro stacks capped at three devices;
- comparison highlights for value, throughput per dollar, coding and model quality;
- URL-based calculator state for sharing assumptions;
- source links and evidence notes for hardware and model data.

The synced snapshot contains 12 hardware variants and 47 model/quantization profiles. Hardware data records a check date of **2026-08-25**; the model catalog records **2026-10-15**. These are stored snapshot dates, not a claim that every source was checked during this repository sync. The previous OpenClaw recommendation UI and logic have been removed.

## Data and limitations

- `apple-au-mac-mini.json` — hardware prices, memory/storage options and power estimates. The filename is historical; it includes more than Mac mini.
- `throughput-benchmarks.json` — model memory requirements, throughput profiles, evidence notes and citations.
- `cluster-scaling.json` — illustrative cluster-speedup assumptions and sources.
- `index.html` — interface, calculations and inline fallback profiles.

**Not every number is a measured benchmark.** Throughput includes community measurements, scaled estimates and conservative placeholders. Derived quantization rows, pooled-memory efficiency, electricity use and cluster speedups are assumptions, not performance guarantees. Inspect each row's notes and validate your intended model, runtime, context size and hardware before buying. Quality scores are comparison heuristics, not a standardized independent evaluation.

## Local preview

Serve the directory over HTTP so the JSON files can load:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`. No dependency installation or build step is required.

## Tests

With a modern Node.js installation:

```bash
node --test tests/*.test.mjs
```

The regression contracts cover the recorded hardware snapshot, model-profile coverage and removal of OpenClaw recommendations. Passing them does not independently verify source accuracy or measured performance.

## Deployment

Production serves these static files through nginx, routed by Traefik. This repository sync does not change the running deployment. Keep deployment credentials, local configuration, backups and private operational data outside the public repository.
