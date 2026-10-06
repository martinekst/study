#!/usr/bin/env node
'use strict';

/**
 * CLI nad cs-patterns.js.
 *
 *   node detector/cs-scan.js <soubor|adresář> [...] [--json] [--min P1|P2|P3]
 *
 * Adresář se prochází rekurzivně, berou se .md a .txt. Exit 1, když se najde
 * aspoň jeden nález P1 (aby to šlo zapojit do CI), exit 2 při chybě.
 *
 * Fingerprinty AI nástrojů (citační artefakty chatů, utm_source, zero-width
 * znaky) jsou od forku součástí cs-patterns.js, žádná externí závislost.
 */

const fs = require('node:fs');
const path = require('node:path');
const { analyzeText, pooledScore, crossFileRepeats, gradeFromScore, formatGrade } = require('./cs-patterns.js');

const args = process.argv.slice(2);
const json = args.includes('--json');
const minIdx = args.indexOf('--min');
const min = minIdx !== -1 ? args[minIdx + 1] : 'P3';
const targets = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--min');

if (targets.length === 0) {
  process.stderr.write('použití: node detector/cs-scan.js <soubor|adresář> [...] [--json] [--min P1|P2|P3]\n');
  process.exit(2);
}

const RANK = { P1: 3, P2: 2, P3: 1 };
const files = [];

// Technické .txt soubory, které do korpusu prózy nepatří. Bez nich by robots.txt
// v public/ figuroval jako skenovaný dokument.
const SKIP_NAMES = new Set(['robots.txt', 'llms.txt', 'sitemap.txt', 'CHANGELOG.txt', 'LICENSE.txt']);

function collect(p) {
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    for (const e of fs.readdirSync(p)) {
      if (e === 'node_modules' || e === '.git' || e === 'dist' || e === '.vitepress') continue;
      collect(path.join(p, e));
    }
  } else if (/\.(md|txt)$/i.test(p) && !SKIP_NAMES.has(path.basename(p))) {
    files.push(p);
  }
}

try {
  targets.forEach(collect);
} catch (e) {
  process.stderr.write(`chyba: ${e.message}\n`);
  process.exit(2);
}

const docs = files.map((f) => ({ file: f, text: fs.readFileSync(f, 'utf8') }));
const scanned = docs
  .map((d) => analyzeText(d.text, { file: d.file }))
  .map((r) => ({ ...r, issues: r.issues.filter((i) => RANK[i.severity] >= RANK[min]) }));

// Neskórovatelné soubory se drží mimo agregaci, aby nezkreslovaly součty a medián.
const tooShort = scanned.filter((r) => r.score === null);
const results = scanned.filter((r) => r.score !== null).sort((a, b) => b.score - a.score);

const repeats = crossFileRepeats(docs, { n: 6, minFiles: 3 });

// Shrnutí největších problémů: typy nálezů podle celkové váhy přes celý scan.
// Váhy drží krok s cs-patterns.js (P1 6, P2 2,5, P3 0,8; scoreExempt se nepočítá).
const SEV_WEIGHT = { P1: 6, P2: 2.5, P3: 0.8 };

// Koše opravitelnosti (references/opravy.md): auto = bez ptaní, ask = jen autor,
// všechno ostatní je redakční přepis (koš B). Mechanická vrstva; úsudkové J4/J7/J8
// z koše C tady nejsou, ty do scanu nevstupují.
const FIX_AUTO = new Set(['quotes', 'quotes-unpaired', 'percent-spacing', 'hyphen-as-dash', 'ai-citation-markup', 'ai-utm-source', 'normalization-flag', 'literal-markdown']);
const FIX_ASK = new Set(['cz-placeholder']);

function fixBreakdown(rs) {
  const agg = { auto: 0, rewrite: 0, ask: 0 };
  for (const r of rs) {
    for (const i of r.issues) {
      if (i.scoreExempt) continue;
      const w = SEV_WEIGHT[i.severity] || 1;
      agg[FIX_AUTO.has(i.type) ? 'auto' : FIX_ASK.has(i.type) ? 'ask' : 'rewrite'] += w;
    }
  }
  const tot = agg.auto + agg.rewrite + agg.ask;
  return tot ? { auto: Math.round((100 * agg.auto) / tot), rewrite: Math.round((100 * agg.rewrite) / tot), ask: Math.round((100 * agg.ask) / tot) } : null;
}
function topProblems(rs, limit = 5) {
  const byType = new Map();
  for (const r of rs) {
    for (const i of r.issues) {
      if (i.scoreExempt) continue;
      const t = byType.get(i.type) || { type: i.type, severity: i.severity, count: 0, weight: 0, sample: i.match };
      t.count++;
      t.weight += SEV_WEIGHT[i.severity] || 1;
      byType.set(i.type, t);
    }
  }
  const totalW = [...byType.values()].reduce((a, t) => a + t.weight, 0) || 1;
  return [...byType.values()]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit)
    .map((t) => ({ ...t, weight: Number(t.weight.toFixed(1)), share: Math.round((100 * t.weight) / totalW) }));
}

if (json) {
  const pooled = pooledScore(results);
  process.stdout.write(
    JSON.stringify(
      {
        grade: gradeFromScore(pooled.score),
        pooled,
        topProblems: topProblems(results),
        fixBreakdown: fixBreakdown(results),
        results: results.map((r) => ({ ...r, grade: gradeFromScore(r.score) })),
        tooShort: tooShort.map((r) => r.file),
        repeats: repeats.slice(0, 40),
      },
      null,
      2,
    ),
  );
} else {
  const total = { words: 0, P1: 0, P2: 0, P3: 0 };
  for (const r of results) {
    total.words += r.stats.words;
    for (const i of r.issues) total[i.severity]++;
    process.stdout.write(
      `\n${r.file}\n  známka ${formatGrade(gradeFromScore(r.score))} · interní skóre ${r.score} (${r.label}) · ${r.stats.words} slov · ` +
        `pomlčka-spojka ${r.stats.dashConnectors} (${r.stats.dashPer1000}/1000 slov, z toho — ${r.stats.emDashes}) · ` +
        `tučné ${r.stats.boldPer100Words}/100 slov · emoji v nadpisech ${r.stats.emojiHeadings}/${r.stats.headings} · ` +
        `věty ⌀${r.stats.meanSentenceWords} slov, cv ${r.stats.sentenceCV}\n`,
    );
    const byType = new Map();
    for (const i of r.issues) {
      if (!byType.has(i.type)) byType.set(i.type, []);
      byType.get(i.type).push(i);
    }
    for (const [type, list] of [...byType.entries()].sort(
      (a, b) => RANK[b[1][0].severity] - RANK[a[1][0].severity] || b[1].length - a[1].length,
    )) {
      const sample = list
        .slice(0, 6)
        .map((i) => `${i.line}:${i.match}`)
        .join(' · ');
      process.stdout.write(`    [${list[0].severity}] ${type} ×${list.length} — ${sample}\n`);
    }
  }
  const pooled = pooledScore(results);
  process.stdout.write(
    `\nZNÁMKA: ${formatGrade(gradeFromScore(pooled.score))}\n` +
      `  interní skóre ${pooled.score} (${pooled.label}) · ${results.length} souborů, ${pooled.words} slov\n` +
      `  celkem nálezů: P1 ${total.P1} · P2 ${total.P2} · P3 ${total.P3}\n`,
  );
  const probs = topProblems(results);
  if (probs.length) {
    process.stdout.write(`\nnejvětší problémy (podíl na váze):\n`);
    for (const p of probs) {
      process.stdout.write(`  ${String(p.share).padStart(3)} %  [${p.severity}] ${p.type} ×${p.count} — např. „${String(p.sample).slice(0, 50)}“\n`);
    }
  }
  const fix = fixBreakdown(results);
  if (fix) {
    process.stdout.write(
      `opravitelnost (mechanická vrstva, viz references/opravy.md): automatika ${fix.auto} % · redakční přepis ${fix.rewrite} % · autorská rozhodnutí ${fix.ask} %\n`,
    );
  }
  if (tooShort.length) {
    process.stdout.write(
      `neskórováno (pod 10 slov): ${tooShort.length} × ${tooShort.map((r) => path.basename(r.file)).join(', ')}\n`,
    );
  }
  if (repeats.length) {
    process.stdout.write(`\nopakované 6-gramy napříč soubory (šablonovitost):\n`);
    for (const r of repeats.slice(0, 12)) {
      process.stdout.write(`  ×${r.count}  „${r.gram}“\n`);
    }
  }
}

// exitCode, ne process.exit(): při přesměrování do pipe by exit ukončil proces
// dřív, než se dopíše stdout, a JSON by přišel odseknutý.
process.exitCode = results.some((r) => r.issues.some((i) => i.severity === 'P1')) ? 1 : 0;
