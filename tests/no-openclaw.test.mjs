import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('compare contains no OpenClaw UI, recommendation logic, styles, or copy', () => {
  assert.doesNotMatch(html, /openclaw/i);
  assert.doesNotMatch(html, /🦞/u);
  assert.doesNotMatch(html, /mtc-winner-openclaw|mt-col-openclaw|showOpenclawMaster/);
});
