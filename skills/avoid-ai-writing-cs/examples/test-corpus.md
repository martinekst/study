# Testovací korpus po kategoriích

Realistické české ukázky s očekávanými nálezy, strojově kontrolované přes
`detector/test-corpus.test.js` (`npm test`). Formát převzatý z forku
navyapdh11/avoid-ai-writing (`examples/test-corpus.md`), tady navíc vykonatelný:
každý case se skutečně pustí detektorem a očekávání se asertují.

Formát case:

- nadpis `## case: <název>`
- blok ```text s ukázkou
- `- očekává: typ1, typ2` (typy nálezů, které MUSÍ být přítomné)
- `- nesmí: typ1` (volitelně: typy, které být nesmí)
- `- nesmí-P1: ano` (volitelně: žádný nález P1)

## case: pomlcky-jako-spojky

```text
Nabídka je připravena — stačí ji podepsat. Cena — bez překvapení — platí do
konce roku. Detaily — viz příloha. Ozvěte se — rádi vše projdeme.
```

- očekává: dash-connector

## case: uvozovky

```text
Klient řekl „tohle chceme" a dodal, že ”termín” je pevný. Zápis se nikdy
neredigoval a je vidět, že uvozovky psaly minimálně dvě různé ruce.
```

- očekává: quotes-unpaired, quotes

## case: chatbot-artefakty

```text
Skvělá otázka! V tomto článku se podíváme na tři přístupy k migraci. Doufám,
že vám tento přehled pomohl a ušetřil čas při rozhodování.
```

- očekává: chatbot

## case: pojdme-otviraky

```text
Pojďme se podívat na výsledky za třetí kvartál. Ponořme se do detailů
architektury a projděme si hlavní změny.
```

- očekává: lets-opener

## case: retorika-bez-obsahu

```text
Studie ukazují, že nasazení by mohlo potenciálně zdvojnásobit výkon týmu.
Ať už jste vývojář, nebo manažer, přínos ucítíte okamžitě. Jedno je jisté.
```

- očekává: vague-authority, hedge-stack, false-breadth, future-narrative

## case: staccato-a-prozreni

```text
Výsledek? Trojnásobná rychlost. Potvrdilo mi to jednu věc. Bez pořádného
procesu se žádný nástroj neuživí.
```

- očekává: qa-staccato, false-epiphany

## case: slovnik-a-aforismy

```text
Data jsou nová ropa. Naše robustní a komplexní řešení je nedílnou součástí
digitální transformace a přináší řadu výhod od prvního dne.
```

- očekává: aphorism, tier1

## case: emoji-nadpisy

```text
## 🚀 Vize produktu

Odstavec, který popisuje směřování produktu v následujícím roce.

## 📊 Čísla a metriky

Druhý odstavec s výsledky za poslední kvartál a plánem na další.
```

- očekává: emoji-heading

## case: placeholdery

```text
Smlouvu za objednatele podepíše [Doplňte jméno] a nabývá účinnosti dne
12. XX. 2026 v sídle společnosti.
```

- očekává: cz-placeholder

## case: lidsky-kontrolni

```text
Refaktoring jsme rozdělili do tří kroků podle rizika. Nejdřív testy: doplnili
jsme chybějící případy pro výpočet úroků, hlavně záporné zůstatky a přestupné
roky. Přesun logiky do služby trval dva dny, z toho den zabralo ladění migrace,
protože stará tabulka měla duplicitní záznamy z roku 2019. Produkce počká na
pondělí, ať přes víkend nikdo nevolá.
```

- nesmí-P1: ano
- nesmí: chatbot, lets-opener, vague-authority
