#!/usr/bin/env node
'use strict';

/**
 * Vyhodnocení kalibračního běhu úsudkové vrstvy.
 *
 *   node scripts/judge-aggregate.js <manifest.json> <docsDir> <outDir> [outDirRepeat]
 *
 * manifest: [{ id, cls: "human"|"ai", src, words }]
 * outDir:   <id bez přípony>.json s {"instances":[{category, quote}]} od soudců.
 *
 * Validace citátů je stejná jako v judge-score.js (doslovnost, min. délka,
 * překryv s mechanickým nálezem se vyřazuje), skóre přes scoreFromWeight.
 * Výstup: rozdělení skóre po třídách, AUC pro mechanickou / úsudkovou /
 * kombinovanou metriku, výpis lidských souborů s instancemi (kandidáti na
 * falešná obvinění, ke kontrole po jednom) a shoda mezi dvěma běhy na
 * opakovaných souborech.
 */

const fs = require('node:fs');
const path = require('node:path');
const { analyzeText, scoreFromWeight } = require(path.join(__dirname, '..', 'detector', 'cs-patterns.js'));

const CATEGORIES = new Set(['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8']);
const WEIGHT = 4; // presence-based: váha za kategorii, ne za instanci
const MIN_QUOTE = 12;

const [manifestArg, docsDir, outDir, outDirR] = process.argv.slice(2);
if (!manifestArg || !docsDir || !outDir) {
  process.stderr.write('použití: node scripts/judge-aggregate.js <manifest.json> <docsDir> <outDir> [outDirRepeat]\n');
  process.exit(2);
}

const norm = (s) =>
  s.replace(/[„“”"]/g, '"').replace(/[‚‘’']/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();

function judgeFile(mdPath, judgmentPath) {
  if (!fs.existsSync(judgmentPath)) return null;
  const raw = fs.readFileSync(mdPath, 'utf8');
  const text = norm(raw);
  const mech = analyzeText(raw, { file: mdPath });
  if (mech.score === null) return null;
  const mechMatches = mech.issues
    .filter((i) => !i.scoreExempt && typeof i.match === 'string')
    .map((i) => norm(i.match))
    .filter((m) => m.length >= MIN_QUOTE);
  let input;
  try {
    input = JSON.parse(fs.readFileSync(judgmentPath, 'utf8'));
  } catch {
    return { parseError: true };
  }
  const valid = [];
  let dropped = 0;
  for (const inst of input.instances || []) {
    const q = norm(String(inst.quote || ''));
    if (!CATEGORIES.has(inst.category) || q.length < MIN_QUOTE || !text.includes(q)) {
      dropped++;
    } else if (mechMatches.some((m) => q.includes(m) || m.includes(q))) {
      dropped++;
    } else {
      valid.push(inst);
    }
  }
  const counted = valid;
  const cats = new Set(valid.map((i) => i.category));
  const judgeWeight = cats.size * WEIGHT;
  return {
    words: mech.stats.words,
    mechScore: mech.score,
    mechWeight: mech.stats.weight,
    judgeWeight,
    judgeScore: scoreFromWeight(judgeWeight, mech.stats.words),
    combined: scoreFromWeight(mech.stats.weight + judgeWeight, mech.stats.words),
    instances: counted,
    dropped,
  };
}

const manifest = JSON.parse(fs.readFileSync(manifestArg, 'utf8'));
const rows = [];
let missing = 0;
let droppedTotal = 0;
for (const m of manifest) {
  const base = m.id.replace(/\.md$/, '');
  const r = judgeFile(path.join(docsDir, m.id), path.join(outDir, base + '.json'));
  if (!r) {
    missing++;
    continue;
  }
  if (r.parseError) {
    process.stdout.write(`POZOR: nevalidní JSON pro ${m.id}\n`);
    continue;
  }
  droppedTotal += r.dropped;
  rows.push({ ...m, ...r });
}

const human = rows.filter((r) => r.cls === 'human');
const ai = rows.filter((r) => r.cls === 'ai');
const q = (a, p) => {
  const s = [...a].sort((x, y) => x - y);
  return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : NaN;
};
const auc = (metric) => {
  let w = 0;
  for (const h of human) for (const a of ai) w += a[metric] > h[metric] ? 1 : a[metric] === h[metric] ? 0.5 : 0;
  return human.length && ai.length ? w / (human.length * ai.length) : NaN;
};

process.stdout.write(`souborů vyhodnoceno: ${rows.length} (human ${human.length}, ai ${ai.length})`);
process.stdout.write(missing ? ` · chybí posudek: ${missing}` : '');
process.stdout.write(` · zahozených instancí celkem: ${droppedTotal}\n\n`);

process.stdout.write('třída        metrika      medián   p90   max\n');
for (const [label, set] of [['human', human], ['ai', ai]]) {
  for (const metric of ['mechScore', 'judgeScore', 'combined']) {
    const v = set.map((r) => r[metric]);
    process.stdout.write(
      `${label.padEnd(12)} ${metric.padEnd(12)} ${String(q(v, 0.5)).padStart(5)} ${String(q(v, 0.9)).padStart(5)} ${String(Math.max(...v)).padStart(5)}\n`,
    );
  }
}

process.stdout.write(
  `\nAUC: mechanické ${auc('mechScore').toFixed(3)} · úsudkové ${auc('judgeScore').toFixed(3)} · kombinované ${auc('combined').toFixed(3)}\n`,
);

const accused = human.filter((r) => r.instances.length > 0).sort((a, b) => b.judgeScore - a.judgeScore);
process.stdout.write(`\nlidské soubory s instancemi (${accused.length} z ${human.length}), ke kontrole:\n`);
for (const r of accused) {
  process.stdout.write(
    `  ${r.id}  judge ${r.judgeScore}  ${r.instances.map((i) => i.category).join(',')}  src=${r.src.split('/').slice(-2).join('/')}\n`,
  );
  for (const i of r.instances.slice(0, 3)) process.stdout.write(`     [${i.category}] "${String(i.quote).slice(0, 70)}"\n`);
}

if (outDirR && fs.existsSync(outDirR)) {
  process.stdout.write('\nshoda mezi běhy (opakované soubory):\n');
  for (const m of manifest) {
    const base = m.id.replace(/\.md$/, '');
    const p2 = path.join(outDirR, base + '.json');
    if (!fs.existsSync(p2)) continue;
    const r1 = rows.find((r) => r.id === m.id);
    const r2 = judgeFile(path.join(docsDir, m.id), p2);
    if (!r1 || !r2) continue;
    process.stdout.write(
      `  ${m.id} (${m.cls})  běh1: ${r1.instances.length} inst / skóre ${r1.judgeScore}  ·  běh2: ${r2.instances.length} inst / skóre ${r2.judgeScore}  Δ${Math.abs(r1.judgeScore - r2.judgeScore)}\n`,
    );
  }
}
