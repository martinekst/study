# Template: `001-overview.md` (Shrnutí)

Generated **first** in the functional phase — it anchors every later
page. The structure below is **fixed** — the order and the section
headings stay as listed; only the placeholder content is filled.
Consistent structure across engagements is what lets readers who
already know one project's docs jump straight to the section they
need on another.

The structure matches the example pattern used across the project
(TIP block → Přehled → ### Přidaná hodnota → Hlavní fakta → ###
Hlavní funkce → Typický scénář → Další čtení).

```markdown
---
title: Shrnutí
status: draft
updated_at: <currentDate>
---

<!--
confluence:
  space: <space>
  title: Shrnutí
  parent: Základní přehled
-->

<!-- generated: <currentDate> | source: <inspected evidence reference> -->

> [!TIP]
> Nemáte čas a chcete rychle pochopit, co aplikace dělá a jak vypadá?
> Přečtěte si tyto tři stránky:
>
> - [Shrnutí](./001-overview.md) — co aplikace řeší a pro koho (právě čtete)
> - [Struktura produktu](./002-product-structure.md) — z čeho se aplikace skládá
> - [Obrazovky](./005-screens.md) — jak aplikace vypadá

## Přehled

<2 odstavce. První odstavec: co aplikace / systém dělá, pro koho, na
jakých platformách. Druhý odstavec: jak se obsah systému spravuje
(kdo data plní, jaký je vztah end-userů a administrátorů). Bez
implementace — popisujte funkčnost, ne technologii.>

<!-- diagram-anchor: context-1-1 -->

### Přidaná hodnota pro uživatele

<1 odstavec — jednou větou, co uživatel z aplikace dostane navíc
proti dnešnímu stavu nebo proti konkurenci. Krátký rozvoj. Když
je v kontraktu zapnutá business sekce a hodnota už má kanonickou
stránku, odkažte na ni místo parafráze.>

## Hlavní fakta

| Oblast             | Detail                                               |
| ------------------ | ---------------------------------------------------- |
| Typ aplikace       | <Mobilní iOS+Android / Webová / Backend + admin / …> |
| Cílová skupina     | <Konkrétní uživatelská role nebo segment>            |
| Podporované jazyky | <CS, SK, EN — nebo `⚠️ TODO`>                        |
| Zdroje dat         | <Vlastní DB, externí integrace — jmenovitě>          |
| Aktualizace obsahu | <Automatická / ruční / interval>                     |
| Notifikace         | <Push / e-mail / SMS / žádné>                        |

### Hlavní funkce aplikace

<3–7 bulletů. Každý začíná tučným názvem funkce + pomlčka + krátký
popis v uživatelově řeči. Bez technologie. Funkce na úrovni produktu,
ne UI prvku — "Vyhledávání stanic" je funkce, "tlačítko Najít" je
UI prvek.>

- **<Funkce 1>** — <jedna věta popisující, co uživatel dělá / vidí>.
- **<Funkce 2>** — <…>.
- **<Funkce 3>** — <…>.

## Typický scénář použití

> <Jeden odstavec — narrativní popis typického uživatelského scénáře
> v každodenním použití. Čte se v jednom dechu, žádné odrážky, žádná
> technologie. Cílem je, aby si non-technický čtenář uměl představit,
> jak aplikace vypadá v denním provozu. Hard cap: 4–6 vět.>

## Další čtení

- [Struktura produktu](./002-product-structure.md)
- [Glosář](./003-glossary.md)
- [Aktéři a persóny](./004-actors-personas.md)
- [Obrazovky](./005-screens.md)
- [Business pravidla](./006-business-rules.md)
- [Seznam scénářů](./007-scenarios-list.md)
```

## Notes — fixed structure

The headings below are **mandatory and in this order**:

1. `> [!TIP]` block — 3 quick-link bullets. Third bullet marks the
   page being read ("právě čtete"). Pick the three pages most likely
   to give a new reader orientation: `001-overview.md` itself, plus
   two of `{002-product-structure.md, 006-screens.md, 007-scenarios-list.md}`.
2. `## Přehled` — 2 paragraphs framing the application.
3. `### Přidaná hodnota pro uživatele` (nested under Přehled).
4. `## Hlavní fakta` — table of 5–8 rows.
5. `### Hlavní funkce aplikace` (nested under Hlavní fakta) —
   bullets.
6. `## Typický scénář použití` — single blockquote paragraph.
7. `## Další čtení` — 4–6 links to other functional pages.

Why fixed:

- Readers who have read one project's `001-overview.md` instantly
  know where to find the same information on the next project.
- VitePress / Confluence auto-generate a stable table of contents
  from the headings — fixed headings produce a fixed TOC.

## Notes — fillable content

- `<diagram-anchor: context-2-1>` — optional. Place a context
  diagram or simple landscape here when the system interacts with
  named external systems. If the system is self-contained, drop the
  anchor.
- "Hlavní funkce aplikace" bullets are at **product capability**
  level, not the UI widget level. "Aktualizace cen v reálném čase"
  is product capability; "tlačítko Aktualizovat na detailu stanice"
  is UI widget (belongs in 2.1.6 / scenarios). When in doubt: would
  this bullet still make sense if the UI were completely redesigned?
- The third bullet in the TIP block has "(právě čtete)" appended —
  that is intentional, it tells the reader where in the trio they
  currently are.
- The source stamp names only the evidence actually inspected for the current
  run. It does not claim portal-wide verification; full scope belongs in a
  review report.
- During a targeted update or backfill, update the existing
  `001-overview.md` in place. Preserve customer-vetted prose that remains
  supported and change only the affected facts, links or capabilities.
