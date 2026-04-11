# HANDOFF

Updated: 2026-04-03 (Asia/Kuala_Lumpur)

## What was done

The compare site was expanded from a placeholder into a Git-backed static page that currently includes:

- break-even calculator for local hardware vs cloud API cost
- AUD display by default, USD→AUD FX conversion (calculator and heatmap share the same path)
- Apple Australia pricing for Mac mini and Mac Studio loaded from `apple-au-mac-mini.json`
- interactive hardware selectors with a 1–8 machine "stack" control
- heatmap / sweet-spot table (stack-aware)
- throughput estimates loaded from `throughput-benchmarks.json` (MLX Q4 bands, cited sources)
- cluster speedup curve (S = N^β, β fitted to published exo 2- and 4-node reports) from `cluster-scaling.json`, rendered as an SVG chart
- model profiles from 8B to frontier (Qwen3 235B, Llama 405B, DeepSeek V3, Kimi K2)
- model-fit warnings for configs that lack sufficient memory
- tabbed layout: Apple AU pricing (default) + Cloud vs local calculator
- info dialog consolidating methodology, sources, and data provenance
- SEO: OG image, Twitter card, JSON-LD, canonical, favicon, robots.txt, sitemap.xml

## Important caveat

Throughput numbers for Mac Studio M4 Max / M3 Ultra are aligned to published MLX Q4 ranges where available; Mac mini tiers are scaled heuristically. Frontier models (200B+, MoE, Kimi) use conservative placeholders. Multi-machine "combined tok/s" uses a power-law curve — not measured cluster throughput.

## Latest notable commits

- `b783601` Add Mac Studio configs and stronger model-fit warnings
- `70d6ac1` Add local model throughput estimator
- `f5c5f63` Add AUD display currency and FX conversion
- `69c610e` Add Apple AU Mac mini pricing and sweet-spot heatmap
- `f954e3d` Add initial compare calculator page

## Key files

- `index.html` — main UI + calculator + chart; hardware chip presets and fallback throughput profiles live inline
- `apple-au-mac-mini.json` — Apple AU desktop variants (Mac mini + Mac Studio), prices, options, power estimates
- `throughput-benchmarks.json` — per-variant tok/s for each model profile, methodology, and source citations
- `cluster-scaling.json` — RDMA / tensor-parallel speedup curve (β, anchors, sources)
- `og.jpg` — 1200×630 Open Graph social preview image
- `robots.txt` / `sitemap.xml` — basic crawl directives
- `.gitignore` — macOS / editor artifact exclusions

## Deployment shape

- Repo is source of truth
- VPS currently serves a static deployed copy
- Changes were pushed to GitHub and then copied to the VPS
- No Git private key was stored on the VPS

## Good next steps

1. ~~Move Apple desktop pricing out of `index.html`~~ — done
2. ~~Move throughput profiles to JSON~~ — done (`throughput-benchmarks.json`)
3. ~~Add benchmark-backed throughput data~~ — done for Studio-tier chips; Mac mini tiers are still scaled
4. Make compatibility warnings more obvious in the heatmap itself
5. Allow filtering the heatmap by selected model
6. Possibly add more Apple hardware later
7. Scope broad event listeners to specific form elements (minor perf)

## Reminder

If you use external carryover notes from another machine or agent, merge anything still relevant into this file or the repo so the next session does not depend on a local path.
