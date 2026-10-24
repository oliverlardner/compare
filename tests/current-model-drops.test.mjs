import assert from 'node:assert/strict';
import fs from 'node:fs';

const benchmarks = JSON.parse(fs.readFileSync(new URL('../throughput-benchmarks.json', import.meta.url), 'utf8'));
const hardware = JSON.parse(fs.readFileSync(new URL('../apple-au-mac-mini.json', import.meta.url), 'utf8'));
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

const expected = {
  'qwen38-flash-next-q4': { memoryRequiredGb: 118, source: 'https://huggingface.co/Qwen/Qwen3.8-Flash-Next' },
  'deepseek-v41-flash-q4': { memoryRequiredGb: 530, source: 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash' },
  'kimi-k3-q4': { memoryRequiredGb: 1520, source: 'https://huggingface.co/moonshotai/Kimi-K3' },
  'glm53-flash-q4': { memoryRequiredGb: 210, source: 'https://huggingface.co/zai-org/GLM-5.3-Flash' },
  'glm53-q4': { memoryRequiredGb: 480, source: 'https://huggingface.co/zai-org/GLM-5.3' },
};

const rows = new Map(benchmarks.localModelProfiles.map((row) => [row.key, row]));
const sourceUrls = new Set(benchmarks.sources.map((source) => source.url));
const variants = hardware.variants.map((row) => row.variant);

assert.equal(benchmarks.modelCatalogCheckedAt, '2026-10-15');
assert.equal(new Set(benchmarks.localModelProfiles.map((row) => row.key)).size, benchmarks.localModelProfiles.length, 'model keys must be unique');
assert.equal(benchmarks.localModelProfiles.length, 47, 'the current comparison should contain 47 model/quant profiles');

for (const [key, expectation] of Object.entries(expected)) {
  const row = rows.get(key);
  assert.ok(row, `${key} must be present`);
  assert.equal(row.memoryRequiredGb, expectation.memoryRequiredGb, `${key} RAM gate must include runtime headroom`);
  assert.ok(sourceUrls.has(expectation.source), `${key} canonical source must be listed`);
  assert.match(row.benchmarkNote, /estimate|estimated|not measured|community|card|quant/i, `${key} must disclose its evidence boundary`);
  for (const variant of variants) {
    assert.equal(Number.isFinite(row.throughput[variant]), true, `${key} is missing ${variant} throughput`);
  }
}

assert.doesNotMatch(JSON.stringify(benchmarks), /No public Kimi K3|until public Kimi K3 specs are citable/i);
assert.match(html, /throughput values are estimates/i);

console.log('current open-model drops contract: ok');
