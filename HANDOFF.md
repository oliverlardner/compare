# Maintainer handoff

Updated: 2026-10-24

## Repository synchronization

This update brings the public repository into line with the deployed static source after changes accumulated outside GitHub. It starts from the existing remote `main` history and copies only the approved public application files and regression tests. It does not replace or redeploy the live site.

Included changes:

- recorded Apple desktop refresh, laptop configurations and DGX Spark comparison;
- expanded model catalog, memory gates, throughput profiles and evidence notes;
- revised comparison highlights, shareable calculator state and laptop cluster cap;
- removal of the former OpenClaw recommendation UI and logic;
- regression tests for hardware data, model-profile coverage and that removal.

## Files

- `index.html`: interface, calculations and inline fallback model profiles.
- `apple-au-mac-mini.json`: hardware catalog; historical filename retained for compatibility.
- `throughput-benchmarks.json`: model/quantization catalog, assumptions and citations.
- `cluster-scaling.json`: illustrative scaling curve.
- `tests/*.test.mjs`: dependency-free Node regression contracts.
- `og.jpg`, `robots.txt`, `sitemap.xml`: existing public metadata assets.

No runtime credentials, deployment directories, backups, conversation history or private application state belong in this public repository.

## Verify before publishing changes

```bash
node --test tests/*.test.mjs
git diff --check
python3 -m http.server 8080
```

Check the hardware/model matrix, hardware selector, calculator, shared URL restoration and the browser console. JSON files must be served over HTTP, not opened through `file://`.

## Evidence boundary

Hardware snapshot date: 2026-08-25. Model catalog check date: 2026-10-15. Synchronizing source on 2026-10-24 does not refresh these dates or independently validate every external claim.

Keep measured/community results distinct from estimated throughput, quality heuristics, derived quantization rows and cluster placeholders. Tests enforce the stored snapshot and behavior contracts; they are not independent benchmark validation. Any future data refresh should review source URLs, availability, prices, quantization sizes, runtime overhead and context requirements rather than merely changing the dates.

## Deployment boundary

The live site is a static nginx deployment behind Traefik. Updating GitHub and updating production are separate operations. Do not pull, reset, clean or overwrite a live working tree to resolve repository drift; prepare and review changes in a separate checkout first.
