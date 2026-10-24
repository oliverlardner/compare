import assert from 'node:assert/strict';
import fs from 'node:fs';

const hardware = JSON.parse(fs.readFileSync(new URL('../apple-au-mac-mini.json', import.meta.url), 'utf8'));
const benchmarks = JSON.parse(fs.readFileSync(new URL('../throughput-benchmarks.json', import.meta.url), 'utf8'));
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

const desktopRows = hardware.variants.filter((row) => /^(Mac mini|Mac Studio) ·/.test(row.label));
const expected = {
  'macmini-m6-12-12': 1449,
  'macmini-m5pro-15-16': 2699,
  'macmini-m5pro-18-20': 2999,
  'macstudio-m5max-18-32': 4299,
  'macstudio-m5max-18-40': 5199,
  'macstudio-m5ultra-30-64': 9499,
  'macstudio-m5ultra-36-80': 11449,
};

assert.equal(hardware.fetchedAt, '2026-08-25');
assert.deepEqual(Object.fromEntries(desktopRows.map((row) => [row.variant, row.basePriceAud])), expected);
assert.equal(desktopRows.some((row) => /M3|M4/.test(row.chip)), false, 'retired M3/M4 desktops must not remain in the current lineup');
assert.equal(new Set(hardware.variants.map((row) => row.variant)).size, hardware.variants.length, 'variant IDs must be unique across desktops and laptops');

const byVariant = Object.fromEntries(desktopRows.map((row) => [row.variant, row]));
assert.deepEqual(byVariant['macmini-m6-12-12'].memoryOptions.map((x) => [x.label, x.delta]), [['16GB', 0], ['24GB', 300], ['32GB', 600]]);
assert.deepEqual(byVariant['macmini-m6-12-12'].storageOptions.map((x) => [x.label, x.delta]), [['256GB', 0], ['512GB', 300], ['1TB', 750], ['2TB', 1500]]);
assert.deepEqual(byVariant['macmini-m5pro-15-16'].memoryOptions.map((x) => [x.label, x.delta]), [['24GB', 0], ['48GB', 900], ['64GB', 1500]]);
assert.deepEqual(byVariant['macstudio-m5max-18-40'].memoryOptions.map((x) => [x.label, x.delta]), [['48GB', 0], ['64GB', 600], ['128GB', 3000]]);
assert.deepEqual(byVariant['macstudio-m5ultra-30-64'].memoryOptions.map((x) => [x.label, x.delta]), [['96GB', 0]], '256GB requires the 36-core CPU / 80-core GPU M5 Ultra');
assert.deepEqual(byVariant['macstudio-m5ultra-36-80'].memoryOptions.map((x) => [x.label, x.delta]), [['96GB', 0], ['256GB', 6000]]);
assert.deepEqual(byVariant['macstudio-m5ultra-30-64'].storageOptions.map((x) => [x.label, x.delta]), [['1TB', 0], ['2TB', 750], ['4TB', 2250], ['8TB', 5250], ['16TB', 11250]]);
assert.match(byVariant['macstudio-m5ultra-36-80'].realWorldNote, /512GB.+late October/i);

for (const profile of benchmarks.localModelProfiles) {
  for (const variant of Object.keys(expected)) {
    assert.equal(Number.isFinite(profile.throughput[variant]), true, `${profile.key} is missing ${variant} throughput`);
  }
}

assert.match(html, /data-hw="m5max"[^>]*>Mac Studio M5 Max/);
assert.match(html, /data-hw="m5ultra"[^>]*>Mac Studio M5 Ultra/);
assert.doesNotMatch(html, /data-hw="m4max"|data-hw="m3ultra"/);

console.log('current Apple desktop lineup contract: ok');
