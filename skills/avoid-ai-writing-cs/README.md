# avoid-ai-writing-cs

Samostatný skill na audit a redakci českého textu, aby nenesl otisky generovaného psaní:
česká typografie, slovníky, rétorické vzory a deterministický detektor kalibrovaný na
české próze, plus volitelná úsudková vrstva na strukturní telly. Metodika forknuta
z [conorbronsdon/avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing)
(MIT), ale kód i data jsou vlastní; žádná runtime závislost (viz Původ).

Proč vlastní nástroj: hotové AI detektory na češtině selhávají (Šigut & Foltýnek, RASLAN
2023: jediný z 22 nástrojů uměl češtinu, s přesností 56–61 %), a anglický pattern detektor
na českém textu nenajde skoro nic. Zároveň má čeština vlastní tells, které angličtina
nemá: dlouhá pomlčka —, anglické uvozovky, kalky, nominalizace.

## Instalace

Přes tf-skills-manager (nic dalšího, detektor potřebuje jen Node 18+):

```bash
npx @techfides/tf-skills-manager@latest install Shared/avoid-ai-writing-cs
```

## Použití

```bash
# scan souboru nebo adresáře (rekurzivně .md a .txt)
node detector/cs-scan.js docs/ --min P1

# strojově čitelný výstup
node detector/cs-scan.js nabidka.md --json

# testy a kalibrace
npm test
npm run fp

# které checky vůbec diskriminují (proti oběma lidským korpusům)
node scripts/bench.js gen=/cesta/ke/generovanemu nabidka=/cesta/k/docs
```

Hlavní výstup je **známka 0–10** (10 = bez AI, 0 = totální slop) s pásmem podle firemní
stupnice metrik (🏆 9,1–10 … 🚨 0–5,0); převod je ukotvený na kalibrovaných prazích
(interní 15 → 7,1; interní 25 → 5,0). Interní skóre 0–100 (saturující, nižší je lepší)
zůstává technickou metrikou v detailu. `cs-scan.js` vypisuje známku, **souhrnné skóre**
za celý scan (hustota vah na 1000 slov přes všechny soubory), skóre po souborech
a shrnutí největších problémů podle podílu na váze.
Průměrovat skóre po souborech nejde: je to saturující funkce hustoty, takže krátký
špinavý soubor by měl stejný hlas jako dlouhý čistý.

Naměřená souhrnná skóre (18. 8. 2026): lidská česká próza **6 až 7** na 100 tis. slovech
dvou registrů, generovaný text bez revize **29 až 59**, generovaný text po lidské revizi
**24**. Exit kód 1 při aspoň jednom nálezu P1 (použitelné v CI).

Jako skill: model na českém textu načte `SKILL.md` (vstupní bod) a z něj `references/cestina.md`.

## Struktura

| Cesta | Účel |
| --- | --- |
| `SKILL.md` | vstupní bod pro model: režimy, zásady, jak spustit detektor |
| `references/cestina.md` | jazyková vrstva: typografie, slovníky, struktura, rétorika, ne-signály |
| `detector/cs-patterns.js` | deterministický detektor, `analyzeText(text) -> {score, label, issues, stats}` |
| `detector/cs-scan.js` | CLI nad detektorem (souhrnné i per-soubor skóre) |
| `detector/cs-patterns.test.js` | testy checků včetně carve-outů (`npm test`) |
| `corpus/texts/` | lidský korpus, encyklopedický registr (Wikipedie, CC BY-SA 4.0) |
| `corpus/registr2/` | lidský korpus, markdownový registr: dokumentace, marketing, blog, vše z revizí před 2023 |
| `scripts/fp-measure.js` | kalibrační brána: lidská próza obou registrů musí zůstat pod prahem |
| `scripts/bench.js` | diskriminační poměr: pozná check, který na lidské próze pálí stejně jako na generované |
| `scripts/roc.js` | klasifikační výkon na labelovaných datech: AUC, sensitivita a falešná míra podle prahu |
| `references/rubrika.md` + `scripts/judge-score.js` | úsudková vrstva: model počítá strukturní telly (J1–J8), skript ověří citáty a spočítá druhé skóre |
| `references/opravy.md` | triáž oprav: koš A (automatika), B (redakční přepis), C (autorská rozhodnutí) a postup po „oprav to“ |
| `detector/validate.js` | preservation validátor pro edit režim (jazykově nezávislý, převzatý z upstreamu) |
| `examples/cs.json` | obecný český house-style config |
| `examples/test-corpus.md` | vykonatelný testovací korpus po kategoriích (`npm test` ho pouští) |


## Původ

Fork z [conorbronsdon/avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing)
(MIT), 19. 8. 2026. Skill je **samostatný**, bez runtime závislosti na upstreamu.
Z upstreamu převzato a zabudováno: 4 fingerprint checky (citační markup, `utm_source`,
zero-width, placeholdery) a `detector/validate.js`; z metodiky režimy, „Never inject“,
self-reference escape hatch a zásada „signál, ne důkaz“. Anglický slovník, hyphenation
a curly-quotes pravidla se nepřebíraly (v češtině neplatí nebo platí obráceně).
Detektor, korpusy, kalibrace a úsudková vrstva jsou původní.


## Kalibrace

Každá změna slovníků nebo vah se pouští proti oběma korpusům (`npm run fp`), celkem
108 tis. slov lidské češtiny. Dva registry tam jsou proto, že encyklopedie nepoužívá
emoji, tučné ani markdownové odrážky, takže proti ní vycházel každý formátovací check
jako nekonečně silný signál; druhý korpus (`corpus/registr2/`) je lidsky psaný markdown
z revizí doložitelně před rokem 2023. Když nové pravidlo prolomí práh na lidské próze,
je špatně pravidlo.

Před změnou severity nebo prahu spusť `scripts/bench.js`: check, jehož hustota na lidské
próze odpovídá hustotě na generovaném textu (poměr pod 1,5), o původu textu nic neříká
a nemá zvedat skóre. Naposledy tak vypadly `hedge`, `quotes`, `tier2` a `sales-filler`.

Když jsou u textů doložené labely, měř klasifikaci přímo: `scripts/roc.js` spočítá AUC
a pro každý práh sensitivitu i falešnou míru. Na 78 generovaných a 52 lidských souborech
prózy (18. 8. 2026) vychází **AUC 0,957**; doporučené prahy jsou **15** pro redakci
(94 % zachyceno, 8 % falešně) a **25** pro tvrzení o textu (71 % zachyceno, 0 % falešně).
Změnu severity si vždycky ověř ablací proti AUC, ne dojmem: ablace `tier1` zpět na P1
zvedla AUC o 0,003, ale falešnou míru při prahu 15 z 8 na 13 %.

Určeno do sdíleného interního TF repozitáře skillů. Jedna samostatná složka,
žádná externí závislost; stačí Node 18+.
