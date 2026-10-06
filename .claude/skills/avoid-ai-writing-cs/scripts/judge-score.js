#!/usr/bin/env node
'use strict';

/**
 * Převod úsudkových nálezů (references/rubrika.md) na skóre a KOMBINOVANÉ skóre.
 *
 *   node scripts/judge-score.js <soubor.md> <nalezy.json>
 *
 * Vstupní JSON: { "instances": [{ "category": "J1".."J8", "quote": "..." }] }
 *
 * Smysl skriptu: model nálezy NAVRHUJE, ale skóre nepočítá. Ochrany:
 *  1. každý citát se ověří proti textu (normalizované bílé znaky a uvozovky);
 *     co v textu není, se zahodí a vypíše — halucinace se do skóre nedostane,
 *  2. citát, který se překrývá s mechanickým nálezem detektoru, se zahodí,
 *     aby se tentýž jev nezapočítal dvakrát,
 *  3. skóruje se PŘÍTOMNOST kategorie (ano/ne), ne počet instancí. Počet instancí
 *     téže kategorie je mezi běhy LLM nejnestabilnější veličina (rozptyl skóre
 *     ±10); přítomnost kategorie je stabilní (±5). Váha = počet různých kategorií
 *     × WEIGHT. Skript proto počítá kategorie, ne instance.
 *
 * Kombinace: váhy obou vrstev se SČÍTAJÍ (aditivní evidence) a na součet se
 * aplikuje tatáž saturující křivka se stropem 100 (scoreFromWeight). Skóre
 * samotná se tedy nesčítají; sčítá se váha nálezů na společný počet slov.
 * Výstup vždy nese všechna tři čísla: mechanické, úsudkové a kombinované.
 * Kalibrace 18. 8. 2026 (48 labelovaných souborů, 9 slepých soudců): kombinované
 * AUC 0,977 proti 0,878 mechanického; detaily a omezení v references/rubrika.md.
 */

const fs = require('node:fs');
const path = require('node:path');
const { analyzeText, scoreFromWeight, getLabel, gradeFromScore, formatGrade } = require(path.join(__dirname, '..', 'detector', 'cs-patterns.js'));

const CATEGORIES = new Set(['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8']);
const WEIGHT = 4; // váha za PŘÍTOMNOU kategorii (ne za instanci); kalibrace 19. 8. 2026
const MIN_QUOTE = 12; // znaků; kratší citát by matchoval náhodně

const [fileArg, jsonArg] = process.argv.slice(2);
if (!fileArg || !jsonArg) {
  process.stderr.write('použití: node scripts/judge-score.js <soubor.md> <nalezy.json>\n');
  process.exit(2);
}

const norm = (s) =>
  s
    .replace(/[„“”"]/g, '"')
    .replace(/[‚‘’']/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const raw = fs.readFileSync(fileArg, 'utf8');
const text = norm(raw);
const input = JSON.parse(fs.readFileSync(jsonArg, 'utf8'));

const mech = analyzeText(raw, { file: fileArg });
if (mech.score === null) {
  process.stderr.write('soubor je pod 10 slov, neskórovatelný\n');
  process.exit(2);
}
const words = mech.stats.words;
const mechMatches = mech.issues
  .filter((i) => !i.scoreExempt && typeof i.match === 'string')
  .map((i) => norm(i.match))
  .filter((m) => m.length >= MIN_QUOTE);

const valid = [];
const invalid = [];
for (const inst of input.instances || []) {
  const q = norm(String(inst.quote || ''));
  if (!CATEGORIES.has(inst.category)) {
    invalid.push({ ...inst, reason: 'neznámá kategorie' });
  } else if (q.length < MIN_QUOTE) {
    invalid.push({ ...inst, reason: `citát kratší než ${MIN_QUOTE} znaků` });
  } else if (!text.includes(q)) {
    invalid.push({ ...inst, reason: 'citát v textu není' });
  } else if (mechMatches.some((m) => q.includes(m) || m.includes(q))) {
    invalid.push({ ...inst, reason: 'překryv s mechanickým nálezem (nezapočítává se dvakrát)' });
  } else {
    valid.push(inst);
  }
}

// Skóruje se počet RŮZNÝCH kategorií, ne instancí (viz hlavička, bod 3).
const cats = new Set(valid.map((i) => i.category));
const counted = valid;
const judgeWeight = cats.size * WEIGHT;
const judgeScore = scoreFromWeight(judgeWeight, words);
const combined = scoreFromWeight(mech.stats.weight + judgeWeight, words);

const perCat = {};
for (const i of counted) perCat[i.category] = (perCat[i.category] || 0) + 1;

process.stdout.write(`soubor: ${fileArg} (${words} slov)\n`);
process.stdout.write(`ZNÁMKA: ${formatGrade(gradeFromScore(combined))} · z kombinovaného skóre, ber jako pásmo ±0,5 (rozptyl úsudkové vrstvy)\n`);
process.stdout.write(`  mechanické skóre:  ${String(mech.score).padStart(3)} (kalibrované, váha ${mech.stats.weight})\n`);
process.stdout.write(
  `  úsudkové skóre:    ${String(judgeScore).padStart(3)} (${cats.size} kategorií × ${WEIGHT}) · ${Object.entries(perCat)
    .sort()
    .map(([k, v]) => `${k}${v > 1 ? ' (' + v + '× v textu)' : ''}`)
    .join(' · ') || 'žádné kategorie'}\n`,
);
process.stdout.write(
  `  kombinované skóre: ${String(combined).padStart(3)} (${getLabel(combined)}) · aditivní váhy, strop 100 saturací; kalibrace 19. 8. 2026: presence-based, AUC 0,969 a rozptyl ±5 mezi běhy (viz references/rubrika.md)\n`,
);
if (invalid.length) {
  process.stdout.write(`zahozeno ${invalid.length}:\n`);
  for (const i of invalid) process.stdout.write(`  [${i.category}] "${String(i.quote).slice(0, 50)}" — ${i.reason}\n`);
}
process.exitCode = 0;
