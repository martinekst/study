# Template: fallback functional page

Used for pages without a dedicated template — typically inside
`001-zakladni-prehled/`:
`002-product-structure.md`, `003-glossary.md`,
`004-actors-personas.md`, `005-screens.md`, `006-business-rules.md`,
and any user-added page.

The minimum structure below is intentionally light — specific pages
add their own sections on top. Keep the spine (Přehled → table /
list → Zdroje → Odkazy) so cross-engagement readers can navigate.

```markdown
---
title: <Czech name>
status: draft
updated_at: <currentDate>
---

<!--
confluence:
  space: <space>
  title: <Czech name>
  parent: Základní přehled
-->

<!-- generated: <currentDate> | source: <inspected evidence reference> -->

## Přehled

<1–2 odstavce: čeho se stránka týká, proč v této sekci existuje, jak
souvisí s ostatními funkčními stránkami (link na konkrétní stránky
v Odkazech níže).>

Zdroj: <spec section / interview anchor / `path/to/file:LL`>.

## <Hlavní oddíl 1>

<Stručný odstavec + případně tabulka nebo seznam. Konkrétní příklady,
ne abstraktní popis. Pro stránky typu „Seznam X" —
`004-actors-personas.md`, `005-screens.md`, `006-business-rules.md`
— je obvyklou strukturou tabulka s jedním řádkem na položku.>

Zdroj: <…>.

<!-- diagram-anchor: <name> -->

> Pokud diagram pomůže (např. matice rolí pro `004-actors-personas.md`,
> mapa navigace pro `005-screens.md`), ponechte anchor. Pokud ne,
> anchor vymazat — `docs-diagrams` generuje diagramy jen tam, kde
> anchor existuje.

## <Hlavní oddíl 2>

<…>

Zdroj: <…>.

## Otevřené body

> ⚠️ TODO: <co se zatím nepodařilo dohodnout nebo doložit. V discovery
> uveďte podložené varianty; v implementation-ready pojmenujte blokující
> rozhodnutí a akceptační dopad; v as-built uveďte chybějící důkaz.>

## Odkazy

- [Shrnutí](./001-overview.md)
- [<další funkční stránky relevantní k této>](...)
- Technické detaily: [technical/<existing-path>](../technical/...)
  <— řádek přidat jen když konkrétní cíl existuje; jinak použít
  `⚠️ TODO: missing technical owner <expected-path>` bez nefunkčního odkazu>
```

## Notes

- "Přehled" je krátký a vysvětluje, **proč** stránka existuje a jak
  zapadá do okolí. Bez tohoto rámce stránka působí izolovaně.
- "Hlavní oddíl 1 / 2" se přejmenuje podle obsahu — `## Aktéři`,
  `## Obrazovky`, `## Business pravidla`, atd. Generic template
  nediktuje pojmenování; respektujte zavedené názvy v projektu.
- `<!-- diagram-anchor: <name> -->` zůstává jen tam, kde diagram
  reálně pomáhá. Žádné prázdné kotvy „pro jistotu" — `docs-diagrams`
  čte všechny vložené kotvy a očekává, že každá je smysluplná.
- "Otevřené body" je volitelná. V discovery obsahuje podložené varianty
  a potřebné rozhodnutí; v implementation-ready blokující otevřené body;
  v as-built pouze konkrétní mezery nebo rozpory v důkazech. Prázdnou sekci
  odstraňte.
- "Odkazy" minimálně cesta zpět na 2.1 Shrnutí. Další odkazy podle
  toho, co stránka referuje.

## Specific page hints

Když je generic template použit pro konkrétní stránku v
`001-zakladni-prehled/`, často existuje typická struktura:

- `002-product-structure.md` (2.1.2): modulový diagram
  (`<!-- diagram-anchor: product-structure -->`) + seznam modulů
  s krátkým popisem.
- `003-glossary.md` (2.1.3): alphabetická tabulka termínů
  (Term → Definice → Cross-link).
- `004-actors-personas.md` (2.1.4) — **NEPOUŽÍVAT generic
  template**. Použijte dedikovanou šablonu
  [`templates/actors-personas.md`](actors-personas.md), která
  obsahuje **detailnu matici rolí a oprávnění** (entity ×
  operace × role). Matice je nově v rámci funkční sekce (dříve
  byla v `3.7.1 Matice rolí a oprávnění` technické dokumentace,
  ale nová struktura technické sekce ji nemá).
- `005-screens.md` (2.1.5): seznam obrazovek (Název → Účel →
  Hlavní akce → Wireframe link). `<!-- diagram-anchor: screen-map -->`
  volitelně, když má smysl mapa navigace mezi obrazovkami.
- `006-business-rules.md` (2.1.6): jedna sekce na pravidlo
  (ID → Popis → Dotčené scénáře → Zdroj). Pouze cross-scénářová
  pravidla — pravidla specifická pro jeden scénář žijí v jeho
  „Popis business logiky" sekci.

Notifikace, komunikace, a reporty **nemají vlastní stránku** —
patří do konkrétního scénáře, který je emituje (do sekce **Popis
business logiky** jako side-effect bullety v `scenario.md`). Pouze
pokud je notifikace nebo report sdílen napříč více scénáři, vstupuje
jako řádek do `006-business-rules.md`.

Sekce **Návaznosti scénářů** (podsekce **Navazující scénáře**)
uvnitř scénáře je vyhrazena **výhradně** pro spouštěcí a navazující
scénáře — ne pro vedlejší efekty.
