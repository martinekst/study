'use strict';

// Testy českého detektoru. Bez závislostí, spouští se:
//   node detector/cs-patterns.test.js
// Zrcadlí přístup upstreamu (patterns.test.js): každý check má pozitivní
// a negativní případ, aby rozšíření slovníku nerozbilo carve-outy.

const assert = require('node:assert');
const { analyzeText, crossFileRepeats, splitSentences, gradeFromScore } = require('./cs-patterns.js');

let checks = 0;
function ok(cond, msg) {
  assert.ok(cond, msg);
  checks++;
}
function has(res, type) {
  return res.issues.some((i) => i.type === type);
}
function sev(res, type) {
  return res.issues.filter((i) => i.type === type).map((i) => i.severity);
}
// minWords: 0 vypíná délkový gate: fixtury jsou jednotlivé věty a testují vzory,
// ne skórovatelnost dokumentu. Gate sám má vlastní test na konci souboru.
function scan(text) {
  return analyzeText(text, { file: 'test.md', minWords: 0 });
}

// ---------------------------------------------------------------- pomlčky
{
  const em = scan('Nabídka je připravena — stačí ji podepsat a začneme.');
  ok(sev(em, 'dash-connector').includes('P1'), 'em dash jako spojka je P1');

  const dbl = scan('Nabídka je připravena -- stačí ji podepsat a začneme.');
  ok(sev(dbl, 'dash-connector').includes('P1'), 'dvojitý spojovník je P1');

  const en = scan('Nabídka je připravena – stačí ji podepsat a začneme.');
  ok(sev(en, 'dash-connector').every((s) => s === 'P3'), 'česká pomlčka – je jen P3 (hustota)');

  const list = scan('- **Termín** — popis položky v seznamu s bold lead-inem');
  ok(sev(list, 'dash-connector').every((s) => s === 'P3'), 'list-lead carve-out drží');
}

// ---------------------------------------------------------------- uvozovky
{
  const good = scan('Řekl „přesně takhle“ a odešel.');
  ok(!has(good, 'quotes') && !has(good, 'quotes-unpaired'), 'správné české uvozovky nejsou nález');

  const bad = scan('Řekl ”přesně takhle” a odešel.');
  ok(has(bad, 'quotes'), 'anglická ” je nález');

  const mixed = scan('Řekl „přesně takhle" a odešel.');
  ok(has(mixed, 'quotes-unpaired'), 'česká „ zavřená rovnou " je nález');
}

// ---------------------------------------------------------------- procenta
{
  ok(
    sev(scan('Máme 70% pokrytí testy.'), 'percent-spacing').every((s) => s === 'P3'),
    '70% + slovo je jen P3 upozornění (přídavné jméno vs. chybějící mezera regex nerozliší)',
  );
  ok(!has(scan('Pokrytí je 70 % u všech modulů.'), 'percent-spacing'), '70 % s mezerou projde');
}

// ---------------------------------------------------------------- maskování
{
  const fenced = scan('Text bez problémů.\n\n```\nklíčový robustní — synergie\n```\n');
  ok(!has(fenced, 'tier1') && !has(fenced, 'dash-connector'), 'obsah code fence se neskenuje');

  const inline = scan('Proměnná `klíčový` je jen identifikátor.');
  ok(!has(inline, 'tier1'), 'inline kód se neskenuje');

  const quoted = scan('Článek varuje před frází „posunout na další úroveň“ v nabídkách.');
  ok(!has(quoted, 'tier1'), 'citace v českých uvozovkách se neskenuje (escape hatch)');
  ok(has(scan('Pomůžeme vám posunout firmu na další úroveň.'), 'tier1'), 'stejná fráze mimo citaci se hlásí');
}

// ---------------------------------------------------------------- slovníky
{
  ok(has(scan('Naše klíčové řešení je robustní.'), 'tier1'), 'tier1 slova se hlásí');
  ok(has(scan('Je to nedílnou součástí našich životů.'), 'tier1'), 'nedílná součást se hlásí');
  ok(has(scan('Na konci dne jde o lidi.'), 'tier1'), 'kalk „na konci dne“ se hlásí');
  ok(has(scan('Platforma přináší řadu výhod pro každého.'), 'tier1'), '„přináší řadu výhod“ se hlásí');
  ok(has(scan('V dnešní uspěchané době je třeba jednat.'), 'tier1'), '„v dnešní uspěchané době“ se hlásí');
  ok(has(scan('Data jsou nová ropa.'), 'aphorism'), 'aforismová formule se hlásí');
  ok(has(scan('Je to fascinující posun s přidanou hodnotou.'), 'tier2'), 'tier2 doplňky se hlásí');
  ok(
    sev(scan('Nikoliv každý dokument je smlouva.'), 'contrast-negation').every((s) => s === 'P3'),
    'samotné „nikoliv“ je jen P3',
  );
}

// ------------------------------------------------------- konverzační tiky
{
  ok(has(scan('Doufám, že vám tento přehled pomohl.'), 'chatbot'), 'chatbot závěr se hlásí');
  ok(has(scan('Skvělá otázka! Odpověď je jednoduchá.'), 'chatbot'), 'sykofantický tik se hlásí');
  ok(has(scan('V tomto článku se podíváme na tři přístupy.'), 'chatbot'), 'meta-narace se hlásí');
  ok(has(scan('Pojďme se podívat na čísla.'), 'lets-opener'), '„pojďme se podívat“ se hlásí');
  ok(has(scan('Ponořme se do detailů architektury.'), 'lets-opener'), '„ponořme se“ se hlásí');
  ok(!has(scan('Podívejte se na čísla ve třetí tabulce.'), 'lets-opener'), 'obyčejná výzva projde');
}

// ------------------------------------------------------- rétorické vzory
{
  ok(has(scan('Potvrdilo mi to jednu věc. Bez procesu to nejde.'), 'false-epiphany'), 'falešné prozření se hlásí');
  ok(has(scan('Studie ukazují, že AI zdvojnásobuje produktivitu.'), 'vague-authority'), 'vágní autorita se hlásí');
  ok(
    !has(scan('Podle studie MIT z ledna 2024 vzrostla produktivita o 14 %.'), 'vague-authority'),
    'konkrétní citace projde',
  );
  ok(has(scan('Nasazení by mohlo potenciálně zrychlit vývoj.'), 'hedge-stack'), 'hedge-stack se hlásí');
  ok(!has(scan('Nasazení může zrychlit vývoj o pětinu.'), 'hedge-stack'), 'jeden modál projde');
  ok(
    has(scan('Ať už jste vývojář, nebo manažer, tahle nabídka je pro vás.'), 'false-breadth'),
    'falešná šíře se hlásí',
  );
  ok(has(scan('Jedno je jisté. Změna přijde.'), 'future-narrative'), 'generický závěr se hlásí');
  ok(has(scan('Výsledek? Trojnásobná rychlost.'), 'qa-staccato'), 'staccato otázka–odpověď se hlásí');
  ok(!has(scan('Jaký je výsledek měření popsán v kapitole 3?'), 'qa-staccato'), 'běžná otázka projde');
}

// ---------------------------------------------------------- placeholdery
{
  ok(has(scan('S pozdravem, [Doplňte název firmy].'), 'cz-placeholder'), 'český placeholder se hlásí');
  ok(has(scan('Smlouva nabývá účinnosti 12. XX. 2026.'), 'cz-placeholder'), 'nevyplněné datum se hlásí');
  ok(!has(scan('Sloupec [id] odkazuje na tabulku uživatelů.'), 'cz-placeholder'), 'technická závorka projde');
}

// -------------------------------------------------------------- nadpisy
{
  const summary = scan('# Nabídka\n\nText o produktu, který má aspoň pár slov.\n\n## Shrnutí\n\nTotéž znovu jinými slovy a bez nové informace.\n');
  ok(has(summary, 'summary-heading'), 'sumární sekce se hlásí');

  const tc = scan('## Strategické Partnerství A Klíčové Výhody\n\nOdstavec pod nadpisem.');
  ok(has(tc, 'title-case-heading'), 'Title Case v nadpisu se hlásí');

  const okHeading = scan('## Strategické partnerství s Deutsche Bank\n\nOdstavec pod nadpisem.');
  ok(!has(okHeading, 'title-case-heading'), 'vlastní jména v nadpisu projdou');

  // Delší fixture: single-para-sections má gate 600 slov, aby nestřílel na
  // krátké instrukční dokumenty (README, skill), kde je to správná forma.
  const pad = 'Odstavec nese obecný obsah, který se opakuje jen proto, aby sekce splnila minimální délku dokumentu pro strukturní kontrolu. ';
  const section = (t) => `## ${t}\n\n${pad.repeat(9)}\n\n`;
  const q = scan(section('Proč to řešit?') + section('Co získáte?') + section('Kolik to stojí?') + section('Reference'));
  ok(has(q, 'question-headings'), 'tři otázkové nadpisy se hlásí');
  ok(has(q, 'single-para-sections'), 'mezititulek + jeden odstavec se hlásí');
  const short = scan(section('Proč to řešit?').replace(pad.repeat(9), pad) + section('Co dál?').replace(pad.repeat(9), pad));
  ok(!has(short, 'single-para-sections'), 'krátký instrukční dokument neflaguje');
}

// ---------------------------------------------------------- emoji odrážky
{
  const eb = scan('✅ Rychlé nasazení\n✅ Nízké náklady\n✅ Špičková podpora\n');
  ok(has(eb, 'emoji-bullets'), 'emoji odrážky se hlásí');
  ok(!has(scan('✅ Hotovo, nasazeno.'), 'emoji-bullets'), 'jedno emoji není vzorec');
}

// ------------------------------------------------------------ stylometrie
{
  const para = 'Věta má rytmus a délku, která se drží pořád stejného rozsahu i stavby, takže odstavce vycházejí skoro navlas stejně dlouhé pokaždé.';
  const uniform = scan(Array(7).fill(para).join('\n\n'));
  ok(has(uniform, 'uniform-paragraphs'), 'uniformní odstavce se hlásí');

  const stats = scan('Krátká věta. ' + 'Tohle je podstatně delší souvětí, které se rozbíhá do stran a nese víc obsahu, než je zdrávo. '.repeat(4)).stats;
  ok(typeof stats.experimental.neboPer1000 === 'number', 'experimentální metriky jsou ve stats');
  ok(typeof stats.experimental.nominalizacePer1000 === 'number', 'nominalizace se měří');
}

// ------------------------------------------------------ skóre a kalibrace
{
  const slop = scan(
    '# 🚀 Klíčové Řešení Pro Vaši Firmu\n\n' +
      'V dnešní uspěchané době je klíčové mít robustní a komplexní řešení — ať už jste startup, nebo korporace. ' +
      'Pojďme se podívat, proč je naše platforma game-changer. Studie ukazují, že nasazení by mohlo potenciálně ' +
      'zvýšit produktivitu, efektivitu a spokojenost. Výsledek? Synergie. Data jsou nová ropa a my vám pomůžeme ' +
      'ji vytěžit — rychle, levně a spolehlivě. Jedno je jisté. Doufám, že vám tento přehled pomohl.\n',
  );
  ok(slop.score >= 40, `slop fixture má skóre ≥ 40 (je ${slop.score})`);
  ok(slop.issues.filter((i) => i.severity === 'P1').length >= 6, 'slop fixture má ≥ 6 P1 nálezů');

  const human = scan(
    'Refaktoring jsme rozdělili do tří kroků podle rizika. Nejdřív testy: doplnili jsme chybějící případy ' +
      'pro výpočet úroků, hlavně záporné zůstatky a přestupné roky. Pak samotný přesun logiky do služby ' +
      '`InterestCalculator`. Trvalo to dva dny, z toho den zabralo ladění migrace, protože stará tabulka měla ' +
      'duplicitní záznamy z roku 2019. Nakonec jsme smazali původní kód (asi 800 řádků) a nasadili na dev. ' +
      'Produkce počká na pondělí, ať přes víkend nikdo nevolá.',
  );
  ok(human.score < 20, `lidský fixture má skóre < 20 (je ${human.score})`);
  ok(!human.issues.some((i) => i.severity === 'P1'), 'lidský fixture nemá P1');
}

// ------------------------------------------------------------- pomocné fce
{
  ok(splitSentences('Např. takhle to funguje bez rozdělení.').length === 1, 'zkratka nerozdělí větu');
  ok(splitSentences('První věta. Druhá věta.').length === 2, 'běžné věty se rozdělí');

  const docs = [
    { file: 'a.md', text: 'Chceme dodat řešení připravené na budoucí růst firmy dnes.' },
    { file: 'b.md', text: 'Chceme dodat řešení připravené na budoucí růst firmy zítra.' },
    { file: 'c.md', text: 'Chceme dodat řešení připravené na budoucí růst firmy pozítří.' },
  ];
  const reps = crossFileRepeats(docs, { n: 6, minFiles: 3 });
  ok(reps.length > 0, 'opakovaný 6-gram napříč 3 soubory se najde');
  ok(crossFileRepeats(docs.slice(0, 2), { n: 6, minFiles: 3 }).length === 0, 'dva soubory práh nesplní');
}

// ---------------------------------------------- hustotní checky s gate 200 slov
// Lekce z forku wilu222 upstreamu: fixture kratší než gate projde testem, i když
// je check rozbitý. Tyhle fixtures proto MUSÍ mít přes 200 slov.
{
  const filler = 'Popisujeme chování systému při zpracování požadavku a návazných kroků fronty. ';
  const longBold = (filler.repeat(3) + 'Vyžaduje to **zvláštní pozornost** správce. ').repeat(8);
  const rb = analyzeText(longBold, { file: 'b.md' });
  ok(rb.stats.words >= 200, `bold fixture má ${rb.stats.words} slov, gate je 200`);
  ok(has(rb, 'bold-overuse'), 'bold-overuse se na dlouhém textu spustí');

  const longLex = (filler.repeat(3) + 'Nasadili jsme robustní řešení pro celý tým. ').repeat(8);
  const rl = analyzeText(longLex, { file: 'l.md' });
  ok(rl.stats.words >= 200, `lexical fixture má ${rl.stats.words} slov, gate je 200`);
  ok(has(rl, 'lexical-overuse'), 'lexical-overuse se na opakovaném tier1 lemmatu spustí');
}

// ------------------------------------------- fingerprinty AI nástrojů (nativní po forku)
{
  const base = 'Delší odstavec, který má dost slov na skórování a popisuje nějaké téma podrobně a věcně dál. ';
  ok(has(scan(base + 'Zdroj: https://x.cz/a?utm_source=chatgpt.com tady.'), 'ai-utm-source'), 'utm_source=chatgpt se hlásí');
  ok(has(scan(base + 'Zůstala tu citeturn0search0 z chatu.'), 'ai-citation-markup'), 'citační artefakt se hlásí');
  ok(!has(scan(base + 'Běžný odkaz https://x.cz/a?page=2 v textu.'), 'ai-utm-source'), 'běžný query parametr neflaguje');
  ok(has(scan(base + 'ob​fus​kace znaku.'), 'normalization-flag'), '2+ zero-width je bypass');
  ok(!has(scan(base + 'emoji \u{1F937}‍♂️ tady.'), 'normalization-flag'), 'ZWJ v emoji se nepočítá');
  ok(has(scan(base + 'S pozdravem [Your Name] a datum.'), 'cz-placeholder'), 'anglický placeholder [Your Name] se hlásí');
  ok(!has(scan(base + 'Smaž token `oai_citation` z textu.'), 'ai-citation-markup'), 'fingerprint v inline kódu je citace, ne únik');
}

// ---------------------------------------------------- literální markdown v .txt
{
  const pasted = 'Poznámka z jednání o rozpočtu na příští kvartál.\n## Shrnutí\nRozpočet je **schválený** a platí od ledna.';
  ok(has(analyzeText(pasted, { file: 'zapis.txt', minWords: 0 }), 'literal-markdown'), 'markdown syntaxe v .txt se hlásí');
  ok(!has(analyzeText(pasted, { file: 'zapis.md', minWords: 0 }), 'literal-markdown'), 'v .md je to syntax, ne nález');
}

// ------------------------------------------------------------ délkový gate
{
  const short = analyzeText('User-agent: *\nAllow: /\n', { file: 'robots.txt' });
  ok(short.score === null, 'text pod 10 slov je neskórovatelný (score null), ne čistý');
  ok(short.label === 'Příliš krátké', 'krátký text má vlastní label');
  ok(short.stats.tooShort === true, 'stats nesou příznak tooShort');

  const long = analyzeText(
    'Refaktoring jsme rozdělili do tří kroků podle rizika a začali jsme testy pro výpočet úroků.',
    { file: 'a.md' },
  );
  ok(typeof long.score === 'number', 'text nad 10 slov se skóruje normálně');
}

// ------------------------------------------------------ známka 0–10 (gradeFromScore)
{
  const g = (s) => gradeFromScore(s);
  ok(g(0).grade === 10 && g(0).band === 'Excelentní', 'interní 0 → 10,0 Excelentní');
  ok(g(5).grade === 9.1, 'kotva: 5 → 9,1');
  ok(g(15).grade === 7.1, 'kotva: práh redakce 15 → 7,1');
  ok(g(25).grade === 5.0 && g(25).band === 'Kritický', 'kotva: práh tvrzení 25 → 5,0 Kritický');
  ok(g(6).band === 'Nad očekávání' && g(7).band === 'Nad očekávání', 'lidská próza (6–7) → Nad očekávání');
  ok(g(100).grade === 0, 'interní 100 → 0');
  ok(g(120).grade === 0, 'skóre nad 100 se ořízne');
  ok(g(null) === null, 'null skóre → null známka');
}

process.stdout.write(`OK: ${checks} kontrol prošlo\n`);
