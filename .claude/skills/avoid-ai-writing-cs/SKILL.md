---
name: avoid-ai-writing-cs
description: Detekce a redakce AI tellů v ČESKÉM textu. Use for Czech text when asked to "odstranit AI telly", "vyčistit text po AI", "aby to neznělo jako AI", "audit AI vzorců", "zkontrolovat, jestli to psala AI", or "remove AI-isms from Czech text". Má tři režimy (detect / rewrite / edit); hlavní výstup je známka 0–10 (10 = bez AI) z kombinace deterministického detektoru a úsudkové vrstvy na strukturní telly, které regex nevidí.
metadata:
  author: "Filip Koukal"
---

# avoid-ai-writing-cs

Samostatný skill na češtinu. Metodika vychází z [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing)
(MIT), ale kód i data jsou vlastní a kalibrované na českých korpusech; žádná
runtime závislost na upstreamu.

## Režimy

- **detect** (výchozí u „zkontroluj“): najdi telly, nic nepřepisuj. Použij, když
  chceš vidět nálezy, když můžou být záměrné, nebo když auditovaný text nemáš měnit.
- **rewrite**: telly najdi a text přepiš do čisté verze; ukaž diff.
- **edit**: uprav soubor na místě minimálními zásahy, lidské pasáže nech být.
  Po zásahu ověř `node detector/validate.js <původní> <upravený>` (kontrola, že
  přepis nesáhl na kód, tabulky, citace, URL a strukturu nadpisů).

## Oprava po auditu („oprav to, ať to není slop“)

Řídí se triáží v `references/opravy.md`. Zkráceně: nálezy se dělí do košů
**A** (automatika: typografie, fingerprinty), **B** (redakční přepis: slovník,
rétorika, formátování, úsudkové J1/J3/J5 + slučování duplicit J2) a **C**
(autorská rozhodnutí: placeholdery, chybějící fakta, restrukturalizace J4/J8,
mazání výčtů J7). Postup: aplikuj A+B rovnou v edit režimu → `validate.js` →
re-scan → reportuj známku před/po, diff a **číslované otázky koše C
s navrhovanými defaulty**; po odpovědích druhé kolo. Koše A+B nesou na
generovaných textech typicky ~100 % mechanické váhy, takže první kolo znatelně
zvedne známku i bez uživatele; plná automatika ale záměrně neexistuje, protože
doplňování a mazání obsahu je autorské rozhodnutí (Never inject).

## Známka 0–10: hlavní výstup

Každé hodnocení textu komunikuj primárně jako **známku 0–10, kde 10 = bez AI**
a 0 = totální slop. Známka vzniká z kombinovaného skóre (mechanika + úsudková
vrstva) převodem ukotveným na kalibrovaných prazích; pásma odpovídají firemní
stupnici metrik (TFR „Metriky oddělení“):

| Známka | Pásmo | Interní skóre |
| --- | --- | --- |
| 9,1–10 | 🏆 Excelentní | 0–5 (10,0 = nula nálezů, na netriviálním textu vzácné) |
| 8,1–9,0 | 🌟 Nad očekávání | 5–10 (pásmo běžné lidské prózy) |
| 7,1–8,0 | ✅ Solidní základ | 10–15 (pod prahem redakce) |
| 6,1–7,0 | ⚠️ Zlepšení nutné | 15–20 (nad prahem redakce) |
| 5,1–6,0 | ❗ Nestabilní | 20–25 |
| 0–5,0 | 🚨 Kritický | 25+ (pásmo, kde by se text označil za AI) |

Formát odpovědi uživateli:

1. **Známka**: jedno číslo s pásmem, např. `7,4/10 ✅ Solidní základ`.
2. **Detail**: interní skóre (mechanické, úsudkové, kombinované), počet slov,
   u víc souborů rozpad per soubor (známka + interní skóre).
3. **Shrnutí největších problémů**: top telly podle podílu na váze (cs-scan je
   vypisuje v sekci „největší problémy“) + úsudkové nálezy s citáty; u každého
   jedna věta, co s tím.

Interní skóre 0–100 (méně = lepší) zůstává technickou metrikou pro kalibraci a
detail; nikdy ho nevydávej jako hlavní číslo bez známky.

## Jak postupovat

1. Přečti `references/cestina.md`: typografie (pomlčky, uvozovky, procenta), české
   slovníky Tier 1/2, stavba věty a stránky, rétorika, mikro-signály a hlavně seznam
   toho, co v češtině signál NENÍ (formální rejstřík, vykání, diakritika, správné `„ “`).
2. Spusť deterministický detektor:

   ```bash
   node detector/cs-scan.js <soubor|adresář> [--json] [--min P1|P2|P3]
   ```

   Interní skóre 0–100, méně je lepší. Lidsky psaná česká próza má medián 6 a maximum
   souboru 22 (měřeno na 108 tis. slovech dvou registrů), doložitelně generovaný text
   medián 57. `cs-scan` vypisuje známku, souhrnné skóre, skóre po souborech i sekci
   „největší problémy“; fingerprinty AI nástrojů (citační artefakty chatů, `utm_source`,
   zero-width znaky, nevyplněné placeholdery) jsou součástí detektoru.
3. Pusť úsudkovou vrstvu (viz níž) a známku vezmi z kombinovaného skóre, které
   vypíše `judge-score.js`. Bez úsudkové vrstvy se obejde jen rychlý orientační
   scan; i pak u známky napiš, že je jen mechanická.

## Zásady, které platí vždy (přejaté z upstreamu, jazykově nezávislé)

- **Signál, ne důkaz.** Skóre neříká „tohle psala AI“, říká „tohle nese víc znaků
  strojového psaní než lidská referenční próza“. Nikdy z něj nedělej obvinění člověka;
  druhý jazyk, spěch a odborný registr dávají podobné vzorce.
- **Never inject.** Při přepisu se do textu NESMÍ přidat nic, co v něm nebylo:
  falešná první osoba, vymyšlené konkrétní číslo/jméno/datum, hraná upřímnost,
  manufakturované napětí, staccato rytmus. Smíš ubírat a zostřovat, ne přidávat.
- **Self-reference escape hatch.** Když text sám o AI tellech pojednává, citované
  ukázky v uvozovkách / kódu se neflagují. Detektor to řeší maskováním `„ “`.
- **Prahy.** 15 pro redakci vlastního textu (zachytí 94 % generovaných, 8 % falešných),
  25 pro tvrzení o cizím textu (71 % / 0 % falešných na 130 labelovaných souborech).

## Úsudková vrstva (standardní součást hodnocení)

Mechanický detektor vidí jen regexovatelné telly; strukturní strojovost (synonymové
cyklení, převyprávění bez posunu, šablonová symetrie sekcí) je úsudková. Postup:

1. Přečti `references/rubrika.md` (kategorie J1 až J8, každá s kontrapříkladem).
2. Projdi text a u každé PŘÍTOMNÉ kategorie vypiš do JSON nejvýš jeden citát, ten
   nejjasnější; skóruje se přítomnost kategorie, ne počet výskytů. Citát musí být
   doslovný, jinak ho skript zahodí.
3. Nech skóre spočítat skriptem (ověří citáty, halucinované a překryvy s mechanikou
   vyřadí):

   ```bash
   node scripts/judge-score.js <soubor.md> <nalezy.json>
   ```

4. Skript vypíše **známku z kombinovaného skóre** (hlavní výstup) a pod ní tři
   interní čísla: mechanické, úsudkové a kombinované (aditivní váhy obou vrstev nad
   společným počtem slov, strop 100 saturací). Kalibrace 19. 8. 2026 na 48 labelovaných
   souborech: kombinované AUC 0,969 proti 0,878 mechanického. Známku ber jako pásmo
   (±0,5 kvůli rozptylu úsudkové vrstvy); při tvrzení o textu se opírej o mechanické
   skóre, které je deterministické. Detaily a omezení v references/rubrika.md.

## House-style

`examples/cs.json` je obecný český house-style config (věcný styl, česká typografie,
nadpisy větnou sazbou), který českou interpunkci vynucuje přes `cs-scan.js`.

## Kalibrace a údržba

Každá změna slovníků nebo vah se pouští proti oběma lidským korpusům
(`node scripts/fp-measure.js`, 108 tis. slov); žádný lidský soubor nesmí přelézt práh.
Před změnou severity spusť `node scripts/bench.js` (diskriminační poměr) a při
labelovaných datech `node scripts/roc.js` (AUC). Postup a čísla v README.md.

## Původ

Fork z conorbronsdon/avoid-ai-writing (MIT), 19. 8. 2026. Převzato a poté vlastní:
4 fingerprint checky (citační markup, utm_source, zero-width, placeholdery) a
`detector/validate.js`; z metodiky režimy, „Never inject“, escape hatch a zásada
„signál, ne důkaz“. Anglický slovník, hyphenation a curly-quotes pravidla se
nepřebíraly (v češtině neplatí nebo platí obráceně). Vše ostatní (detektor, korpusy,
kalibrace, úsudková vrstva) je původní.
