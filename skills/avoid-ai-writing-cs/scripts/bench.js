#!/usr/bin/env node
'use strict';

/**
 * Diskriminační měření checků: která pravidla oddělují generovaný text od lidského
 * a která jen šumí.
 *
 *   node scripts/bench.js <label>=<cesta> [...]
 *   node scripts/bench.js gen=/tmp/ai-text nabidka=/tmp/offer/docs
 *
 * Lidský korpus (corpus/texts) je vždy baseline. Pro každý typ nálezu se vypíše
 * hustota na 1000 slov v každé sadě a **diskriminační poměr** proti baseline:
 *
 *   ratio ≈ 1  → check pálí na lidské próze stejně jako na cílové sadě, takže
 *                o původu textu nic neříká a nemá zvedat skóre,
 *   ratio > 3  → check odděluje,
 *   ratio = ∞  → jev se v lidské próze nevyskytuje vůbec (nejsilnější signál).
 *
 * Účel je zabránit tomu, aby se práh nebo severita ladily podle dojmu. Čísla z tohohle
 * skriptu patří do commit message u každé změny slovníků nebo vah.
 *
 * POZOR NA REGISTR BASELINE. corpus/texts je encyklopedická, redigovaná próza
 * (česká Wikipedie). Jevy, které do toho registru nepatří ze své podstaty (emoji,
 * tučné, markdownové odrážky, nespárované uvozovky), proti ní vycházejí ×∞ vždycky,
 * i když je člověk v jiném registru běžně píše. U formátovacích checků proto ×∞
 * NENÍ důkaz o původu textu; potřebuje druhou baseline ve srovnatelném registru
 * (lidsky psaná česká dokumentace nebo obchodní materiál v markdownu, s doložitelným
 * datem vzniku před rozšířením LLM). Diskriminační poměr je průkazný jen mezi sadami
 * stejného registru.
 */

const fs = require('node:fs');
const path = require('node:path');
const { analyzeText } = require('../detector/cs-patterns.js');

const ROOT = path.join(__dirname, '..');

function collect(p, acc = []) {
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    for (const e of fs.readdirSync(p)) {
      if (['node_modules', '.git', 'dist', '.vitepress'].includes(e)) continue;
      collect(path.join(p, e), acc);
    }
  } else if (/\.(md|txt)$/i.test(p)) {
    acc.push(p);
  }
  return acc;
}

function measure(label, dir) {
  const files = collect(dir);
  if (!files.length) throw new Error(`${label}: v ${dir} nejsou žádné .md/.txt soubory`);
  const perType = new Map();
  const scores = [];
  let words = 0;
  let skipped = 0;
  for (const f of files) {
    const r = analyzeText(fs.readFileSync(f, 'utf8'), { file: f });
    if (r.score === null) {
      skipped++; // pod 10 slov, neskórovatelné
      continue;
    }
    words += r.stats.words;
    scores.push(r.score);
    for (const i of r.issues) perType.set(i.type, (perType.get(i.type) || 0) + 1);
  }
  if (!scores.length) throw new Error(`${label}: všechny soubory v ${dir} jsou pod 10 slov`);
  scores.sort((a, b) => a - b);
  return {
    label,
    files: scores.length,
    skipped,
    words,
    min: scores[0],
    median: scores[Math.floor(scores.length / 2)],
    max: scores[scores.length - 1],
    density: new Map([...perType].map(([t, n]) => [t, (n * 1000) / words])),
    counts: perType,
  };
}

const targets = process.argv.slice(2).map((a) => {
  const i = a.indexOf('=');
  if (i < 1) {
    process.stderr.write(`použití: node scripts/bench.js <label>=<cesta> [...]\n`);
    process.exit(2);
  }
  return { label: a.slice(0, i), dir: a.slice(i + 1) };
});

// Dvě lidské baseline dvou různých registrů. Poměr se počítá proti VYŠŠÍ z nich:
// check je signál teprve tehdy, když pálí víc než jakýkoli doložitelně lidský text.
// Kdyby se poměřoval jen s encyklopedií, formátovací pravidla by vycházela jako
// nekonečně silný signál i tam, kde jde o normální styl v markdownu.
const BASELINES = [
  { label: 'human:encyklopedie', dir: path.join(ROOT, 'corpus', 'texts') },
  { label: 'human:markdown', dir: path.join(ROOT, 'corpus', 'registr2') },
];

const humans = [];
const sets = [];
try {
  for (const b of BASELINES) {
    if (!fs.existsSync(b.dir)) continue;
    const m = measure(b.label, b.dir);
    humans.push(m);
    sets.push(m);
  }
  if (!humans.length) throw new Error('žádná lidská baseline: chybí corpus/texts i corpus/registr2');
  for (const t of targets) sets.push(measure(t.label, t.dir));
} catch (e) {
  process.stderr.write(`chyba: ${e.message}\n`);
  process.exit(2);
}
// Konzervativní baseline: per typ maximum přes lidské registry.
const base = {
  label: 'human(max)',
  density: new Map(
    [...new Set(humans.flatMap((h) => [...h.density.keys()]))].map((t) => [
      t,
      Math.max(...humans.map((h) => h.density.get(t) || 0)),
    ]),
  ),
};

const W = 24;
process.stdout.write('\nsada'.padEnd(W) + 'soubory  slov   skóre min/med/max\n');
process.stdout.write('-'.repeat(W + 34) + '\n');
for (const s of sets) {
  process.stdout.write(
    s.label.padEnd(W) +
      String(s.files).padStart(7) +
      String(s.words).padStart(7) +
      `   ${s.min}/${s.median}/${s.max}`.padStart(18) +
      (s.label.startsWith('human') ? '   (baseline)' : '') +
      '\n',
  );
}

if (!targets.length) {
  process.stdout.write('\nbez cílové sady nelze počítat diskriminační poměr; předej <label>=<cesta>\n');
  process.exit(0);
}

const allTypes = [...new Set(sets.flatMap((s) => [...s.density.keys()]))];
const ratioOf = (s, t) => {
  const b = base.density.get(t) || 0;
  const d = s.density.get(t) || 0;
  if (!b) return d ? Infinity : 0;
  return d / b;
};
// Řadí se podle nejlepšího poměru přes všechny cílové sady: nahoře checky, které
// odlišují nejvíc, dole ty, které na lidské próze pálí stejně (kandidáti na revizi).
const targetSets = sets.filter((s) => !humans.includes(s));
allTypes.sort((a, b) => {
  const ra = Math.max(...targetSets.map((s) => ratioOf(s, a)));
  const rb = Math.max(...targetSets.map((s) => ratioOf(s, b)));
  return rb - ra;
});

const fmt = (n) => (n === Infinity ? '∞' : n === 0 ? '0' : n < 10 ? n.toFixed(1) : String(Math.round(n)));
process.stdout.write(
  '\nhustota nálezů na 1000 slov; ×poměr je proti VYŠŠÍ z lidských baseline\n\n',
);
process.stdout.write(
  'typ'.padEnd(W) +
    humans.map((h) => h.label.replace('human:', 'h:').padStart(13)).join('') +
    targetSets.map((s) => `${s.label}`.padStart(16)).join('') +
    '\n',
);
process.stdout.write('-'.repeat(W + 13 * humans.length + 16 * targetSets.length) + '\n');
for (const t of allTypes) {
  const humanCols = humans.map((h) => (h.density.get(t) || 0).toFixed(1).padStart(13)).join('');
  const row = targetSets
    .map((s) => {
      const d = s.density.get(t) || 0;
      const r = ratioOf(s, t);
      return `${d.toFixed(1)} (×${fmt(r)})`.padStart(16);
    })
    .join('');
  process.stdout.write(t.padEnd(W) + humanCols + row + '\n');
}

const weak = allTypes.filter(
  (t) => (base.density.get(t) || 0) > 0.5 && targetSets.every((s) => ratioOf(s, t) < 1.5),
);
if (weak.length) {
  process.stdout.write(
    `\nnediskriminující checky (na lidské próze pálí podobně jako na cíli, poměr < 1,5):\n  ${weak.join(', ')}\n` +
      '  Tyhle by neměly zvedat skóre. Buď je zúžit, nebo z váhy vyřadit.\n',
  );
}
