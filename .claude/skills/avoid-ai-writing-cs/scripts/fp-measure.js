#!/usr/bin/env node
'use strict';

/**
 * Měření falešně pozitivních na lidském českém korpusu (corpus/).
 *
 *   node scripts/fp-measure.js            # tabulka + kontrola prahů, exit 1 při průšvihu
 *   node scripts/fp-measure.js --update   # přepočítá sha256/words/baseline v manifestu
 *
 * Stejná role jako upstream scripts/fp-measure.js: každá změna slovníků nebo
 * vah se pouští proti korpusu, aby lidská próza zůstala pod prahem. Texty
 * jsou commitnuté přímo (česká Wikipedie, CC BY-SA 4.0, atribuce v manifestu);
 * upstream commituje jen hashe, protože jeho zdroje volnou licenci nemají.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { analyzeText } = require('../detector/cs-patterns.js');

const ROOT = path.join(__dirname, '..');
const MANIFEST = path.join(ROOT, 'corpus', 'manifest.json');
const update = process.argv.includes('--update');

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
let fail = 0;
const typeTotals = new Map();
let totalWords = 0;

// Druhý registr (corpus/registr2) se měří jako celek: je to 51 souborů se svým
// manifestem, kde nejde o baseline per dokument, ale o to, že žádný lidsky psaný
// markdown nemá přelézt práh. Formátovací checky se dají kalibrovat jen tady,
// encyklopedie emoji ani tučné nepoužívá.
function measureRegistr2(max) {
  const dir = path.join(ROOT, 'corpus', 'registr2');
  if (!fs.existsSync(dir)) return null;
  const m2 = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
  const over = [];
  let words = 0;
  let scored = 0;
  for (const doc of m2.documents) {
    const res = analyzeText(fs.readFileSync(path.join(dir, doc.file), 'utf8'), { file: doc.file });
    if (res.score === null) continue;
    scored++;
    words += res.stats.words;
    for (const i of res.issues) typeTotals.set(i.type, (typeTotals.get(i.type) || 0) + 1);
    if (res.score > max) over.push(`${doc.file} (${res.score})`);
  }
  return { files: scored, words, over, sources: m2.sources };
}

for (const doc of manifest.documents) {
  const p = path.join(ROOT, 'corpus', 'texts', doc.file);
  const text = fs.readFileSync(p, 'utf8');
  const sha = crypto.createHash('sha256').update(text).digest('hex');

  if (update) {
    doc.sha256 = sha;
  } else if (doc.sha256 && doc.sha256 !== sha) {
    process.stdout.write(`CHYBA: ${doc.file}: sha256 nesedí s manifestem (text se změnil bez --update)\n`);
    fail = 1;
    continue;
  }

  const res = analyzeText(text, { file: doc.file });
  totalWords += res.stats.words;
  for (const i of res.issues) typeTotals.set(i.type, (typeTotals.get(i.type) || 0) + 1);

  const p1 = res.issues.filter((i) => i.severity === 'P1').length;
  const p2 = res.issues.filter((i) => i.severity === 'P2').length;
  const p3 = res.issues.filter((i) => i.severity === 'P3').length;
  const max = doc.maxScore ?? manifest.maxScore;
  const okMark = res.score <= max ? 'ok' : 'PŘES PRÁH';
  if (res.score > max) fail = 1;

  if (update) {
    doc.words = res.stats.words;
    doc.baselineScore = res.score;
  }

  process.stdout.write(
    `${doc.file.padEnd(28)} ${String(res.stats.words).padStart(6)} slov  skóre ${String(res.score).padStart(3)}/${max}  ` +
      `P1 ${p1} · P2 ${p2} · P3 ${p3}  ${okMark}` +
      (doc.baselineScore != null && !update && res.score !== doc.baselineScore
        ? `  (baseline ${doc.baselineScore})`
        : '') +
      '\n',
  );
}

const r2 = measureRegistr2(manifest.maxScore);
if (r2) {
  totalWords += r2.words;
  process.stdout.write(
    `\nregistr2 (lidský markdown, ${Object.keys(r2.sources).length} zdroje): ` +
      `${r2.files} souborů, ${r2.words} slov, práh ${manifest.maxScore}  ` +
      (r2.over.length ? `PŘES PRÁH: ${r2.over.join(', ')}` : 'ok') +
      '\n',
  );
  if (r2.over.length) fail = 1;
}

// Nejčastější typy na lidském textu = kandidáti na zjemnění pravidla.
const sorted = [...typeTotals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
process.stdout.write(`\nnálezy na lidské próze (${totalWords} slov), nejčastější typy:\n`);
for (const [type, n] of sorted) {
  process.stdout.write(`  ${type.padEnd(22)} ${String(n).padStart(4)}×  (${((n * 1000) / totalWords).toFixed(1)}/1000 slov)\n`);
}

if (update) {
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  process.stdout.write('\nmanifest aktualizován\n');
}

process.exitCode = fail;
