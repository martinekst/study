'use strict';

// Vykonatelný testovací korpus: parsuje examples/test-corpus.md a každý case
// pustí detektorem. Drží kategorie pokryté realistickými ukázkami, ne jen
// minimálními fixtures z cs-patterns.test.js.

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { analyzeText } = require('./cs-patterns.js');

const src = fs.readFileSync(path.join(__dirname, '..', 'examples', 'test-corpus.md'), 'utf8');
const cases = [];
for (const block of src.split(/^## case: /m).slice(1)) {
  const name = block.split('\n', 1)[0].trim();
  const text = (block.match(/```text\n([\s\S]*?)```/) || [])[1];
  assert.ok(text, `case ${name}: chybí blok \`\`\`text`);
  const expect = ((block.match(/^- očekává: (.+)$/m) || [])[1] || '').split(',').map((s) => s.trim()).filter(Boolean);
  const forbid = ((block.match(/^- nesmí: (.+)$/m) || [])[1] || '').split(',').map((s) => s.trim()).filter(Boolean);
  const noP1 = /^- nesmí-P1: ano$/m.test(block);
  cases.push({ name, text, expect, forbid, noP1 });
}
assert.ok(cases.length >= 8, `očekávám aspoň 8 cases, našel jsem ${cases.length}`);

let checks = 0;
for (const c of cases) {
  const r = analyzeText(c.text, { file: `${c.name}.md`, minWords: 0 });
  const types = new Set(r.issues.map((i) => i.type));
  for (const t of c.expect) {
    assert.ok(types.has(t), `case ${c.name}: chybí očekávaný nález ${t} (nalezeno: ${[...types].join(', ') || 'nic'})`);
    checks++;
  }
  for (const t of c.forbid) {
    assert.ok(!types.has(t), `case ${c.name}: zakázaný nález ${t}`);
    checks++;
  }
  if (c.noP1) {
    const p1 = r.issues.filter((i) => i.severity === 'P1' && !i.scoreExempt);
    assert.ok(p1.length === 0, `case ${c.name}: nečekané P1 nálezy: ${p1.map((i) => i.type + ':' + i.match).join(' · ')}`);
    checks++;
  }
}

process.stdout.write(`OK: test-corpus, ${cases.length} cases, ${checks} kontrol prošlo\n`);
