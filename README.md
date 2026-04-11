# compare

Compare local Apple hardware cost to current cloud token cost.

## Live site

- https://compare.openmoss.cloud

## What this repo contains

A lightweight static calculator page that estimates when buying local Apple hardware
starts to make economic sense versus paying for cloud model APIs such as OpenAI and Claude.

Apple AU store pricing for the desktop selector is loaded from `apple-au-mac-mini.json` (same origin as `index.html`).

Local LLM throughput presets and citation links load from `throughput-benchmarks.json` (with an inline fallback if the fetch fails).

Cluster speedup (RDMA / tensor-parallel–style curve vs linear N×) loads from `cluster-scaling.json`.

## Local preview

Opening `index.html` directly (`file://`) will not load the JSON file in most browsers. Serve the project directory over HTTP, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy shape

The VPS serves this repo as a static site through nginx inside Docker, routed by Traefik.
