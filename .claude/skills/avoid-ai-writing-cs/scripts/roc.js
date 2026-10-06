#!/usr/bin/env node
'use strict';

/**
 * Klasifikační výkon detektoru na LABELOVANÝCH datech.
 *
 *   node scripts/roc.js human=<cesta> ai=<cesta> [ai=<cesta> ...] [--min-words N]
 *
 * Lidské korpusy v corpus/ se přidávají automaticky jako human. Pro každý práh
 * vypíše, kolik generovaných souborů detektor zachytí (sensitivita) a kolik lidských
 * falešně obviní (1 − specificita), plus Mann-Whitney U / AUC, která nezávisí na
 * volbě prahu.
 *
 * Proč to existuje: bez labelů se dá měřit jen hustota jevů (scripts/bench.js).
 * Jakmile je u textů doložený původ, dá se říct, jestli skóre jako klasifikátor
 * vůbec funguje a kde má být hranice. Krátké soubory (navigace, rozcestníky) skóre
 * ředí v obou skupinách, proto --min-words.
 */

const fs = require('node:fs');
const path = require('node:path');
const { analyzeText } = require('../detector/cs-patterns.js');

const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2);
const mwIdx = args.indexOf('--min-words');
const MIN_WORDS = mwIdx !== -1 ? Number(args[mwIdx + 1]) : 0;

function collect(p, acc = []) {
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    for (const e of fs.readdirSync(p)) {
      if (['node_modules', '.git', 'dist', '.vitepress'].includes(e)) continue;
      collect(path.join(p, e), acc);
    }
  } else if (/\.(md|txt)$/i.test(p) && path.basename(p) !== 'robots.txt') {
    acc.push(p);
  }
  return acc;
}

const groups = [];
for (const a of args) {
  const i = a.indexOf('=');
  if (i < 1) continue;
  groups.push({ label: a.slice(0, i), dir: a.slice(i + 1) });
}
// Lidské korpusy repa jsou vždycky součástí negativní třídy.
for (const d of ['texts', 'registr2']) {
  const p = path.join(ROOT, 'corpus', d);
  if (fs.existsSync(p)) groups.unshift({ label: `human:${d}`, dir: p });
}

const rows = [];
for (const g of groups) {
  const isHuman = g.label.startsWith('human');
  for (const f of collect(g.dir)) {
    const r = analyzeText(fs.readFileSync(f, 'utf8'), { file: f });
    if (r.score === null) continue;
    if (r.stats.words < MIN_WORDS) continue;
    rows.push({ group: g.label, isHuman, score: r.score, words: r.stats.words, file: f });
  }
}

const human = rows.filter((r) => r.isHuman);
const ai = rows.filter((r) => !r.isHuman);
if (!human.length || !ai.length) {
  process.stderr.write('chyba: potřebuju aspoň jednu lidskou a jednu generovanou sadu\n');
  process.exit(2);
}

const q = (arr, p) => {
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(p * s.length))];
};
process.stdout.write(`\nminimální délka souboru: ${MIN_WORDS} slov\n\n`);
process.stdout.write('sada'.padEnd(24) + 'soubory'.padStart(8) + 'medián'.padStart(8) + 'p90'.padStart(6) + 'max'.padStart(6) + '\n');
process.stdout.write('-'.repeat(52) + '\n');
for (const g of groups) {
  const s = rows.filter((r) => r.group === g.label).map((r) => r.score);
  if (!s.length) continue;
  process.stdout.write(
    g.label.padEnd(24) + String(s.length).padStart(8) + String(q(s, 0.5)).padStart(8) + String(q(s, 0.9)).padStart(6) + String(Math.max(...s)).padStart(6) + '\n',
  );
}

// AUC přes Mann-Whitney U: podíl párů (lidský, generovaný), kde generovaný skóruje výš.
let wins = 0;
for (const h of human) for (const a of ai) wins += a.score > h.score ? 1 : a.score === h.score ? 0.5 : 0;
const auc = wins / (human.length * ai.length);

process.stdout.write(`\nAUC = ${auc.toFixed(3)}  (0,5 = náhoda, 1,0 = perfektní oddělení)\n`);
process.stdout.write(`lidských souborů ${human.length}, generovaných ${ai.length}\n`);

process.stdout.write('\npráh   zachyceno z generovaných   falešně z lidských   přesnost\n');
process.stdout.write('-'.repeat(64) + '\n');
const thresholds = [8, 10, 12, 15, 18, 20, 22, 25, 30, 35];
let best = null;
for (const t of thresholds) {
  const tp = ai.filter((r) => r.score >= t).length;
  const fp = human.filter((r) => r.score >= t).length;
  const tpr = tp / ai.length;
  const fpr = fp / human.length;
  const prec = tp + fp ? tp / (tp + fp) : 0;
  // Youdenovo J: maximalizuje součet sensitivity a specificity.
  const j = tpr - fpr;
  if (!best || j > best.j) best = { t, j, tpr, fpr, prec };
  process.stdout.write(
    `${String(t).padStart(4)}   ${String(tp).padStart(3)}/${String(ai.length).padEnd(3)} = ${(tpr * 100).toFixed(0).padStart(3)}%` +
      `          ${String(fp).padStart(3)}/${String(human.length).padEnd(3)} = ${(fpr * 100).toFixed(0).padStart(3)}%` +
      `        ${(prec * 100).toFixed(0).padStart(3)}%\n`,
  );
}
process.stdout.write(
  `\nnejlepší práh podle Youdenova J: ${best.t} (zachytí ${(best.tpr * 100).toFixed(0)} % generovaných, ` +
    `falešně obviní ${(best.fpr * 100).toFixed(0)} % lidských)\n`,
);

// Generované soubory, které projdou pod nejlepším prahem: kde je detektor slepý.
const missed = ai.filter((r) => r.score < best.t).sort((a, b) => a.score - b.score);
if (missed.length) {
  process.stdout.write(`\nnezachycené generované soubory (${missed.length}), nejnižší skóre:\n`);
  for (const m of missed.slice(0, 8)) {
    process.stdout.write(`  ${String(m.score).padStart(3)}  ${String(m.words).padStart(5)} slov  ${m.file.split('/').slice(-2).join('/')}\n`);
  }
}
