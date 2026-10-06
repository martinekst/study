# Template: `001-zakladni-prehled/007-scenarios-list.md` (Seznam scénářů)

The master scenario index. Groups scenarios using one of three
options (audience / module / axis) per
[`../scenario-grouping.md`](../scenario-grouping.md). Anchors the
use-case diagram(s) — one per group, plus optionally a global
anchor at the top.

The example below uses **Option A (audience)** because it is the
default for small to medium scenario counts. For Option B (module)
replace the section headings with module names; for Option C (axis)
use axis labels.

```markdown
---
title: Seznam scénářů
status: draft
updated_at: <currentDate>
---

<!--
confluence:
  space: <space>
  title: Seznam scénářů
  parent: Základní přehled
-->

<!-- generated: <currentDate> | source: <inspected evidence reference> -->

## Přehled

<1 odstavec: kolik scénářů celkem, jaké grouping bylo zvoleno
(audience / module / axis) a proč. Odkaz na `scenario-grouping.md`
v komentáři pro budoucí maintainery není potřeba — důvod patří
do prózy.>

<!-- diagram-anchor: use-case-all -->

> Globální use-case diagram doplní `docs-diagrams`. U malých sad
> scénářů (< 8) nebo u sad s více než ~3 skupinami tento anchor
> vymažte — globální diagram by byl buď zbytečný, nebo nečitelný;
> per-skupinové anchory níže stačí.

## Scénáře pro uživatele

<Stručný odstavec — co tato skupina pokrývá, kdo je hlavní aktér.>

<!-- diagram-anchor: use-case-uzivatel -->

| SC-ID | Scénář                                                                 | Aktéři | Spustí                                                           |
| ----- | ---------------------------------------------------------------------- | ------ | ---------------------------------------------------------------- |
| SC-01 | [Přihlášení uživatele](../002-scenarios/sc-01-prihlaseni-uzivatele.md) | `user` | [SC-02 Obnova session](../002-scenarios/sc-02-obnova-session.md) |
| SC-05 | [Vyhledání produktu](../002-scenarios/sc-05-vyhledani-produktu.md)     | `user` | —                                                                |

## Scénáře pro admina

<Stručný odstavec.>

<!-- diagram-anchor: use-case-admin -->

| SC-ID | Scénář                                                         | Aktéři  | Spustí |
| ----- | -------------------------------------------------------------- | ------- | ------ |
| SC-04 | [Schválení obsahu](../002-scenarios/sc-04-schvaleni-obsahu.md) | `admin` | —      |
| SC-07 | [Správa cen](../002-scenarios/sc-07-sprava-cen.md)             | `admin` | —      |

## Systémové scénáře

<Stručný odstavec — typicky background úlohy, retry, scheduled
joby, event consumers.>

<!-- diagram-anchor: use-case-system -->

| SC-ID | Scénář                                                                      | Aktéři   | Spustí |
| ----- | --------------------------------------------------------------------------- | -------- | ------ |
| SC-02 | [Obnova session](../002-scenarios/sc-02-obnova-session.md)                  | `system` | —      |
| SC-03 | [Periodická synchronizace cen](../002-scenarios/sc-03-synchronizace-cen.md) | `system` | —      |
| SC-06 | [Retry neúspěšného odeslání](../002-scenarios/sc-06-retry-odeslani.md)      | `system` | —      |

## Pokrytí

| Skupina               | Počet scénářů | Pokryto wireframem | Pokryto sequence diagramem | Pokryto flowchartem  |
| --------------------- | ------------- | ------------------ | -------------------------- | -------------------- |
| Scénáře pro uživatele | 2             | 2 / 2              | 2 / 2                      | 0 / 2 (volitelné)    |
| Scénáře pro admina    | 2             | 2 / 2              | 2 / 2                      | 1 / 2 (kde má smysl) |
| Systémové scénáře     | 3             | 0 / 3              | 3 / 3                      | 1 / 3 (kde má smysl) |
| **Celkem**            | <N>           | <X / Y>            | <X / Y>                    | <X / Y>              |

> Tabulka pokrytí se naplní po doběhnutí `docs-diagrams` a
> `docs-wireframes`. Sloupec "Pokryto flowchartem" reflektuje, kolik
> scénářů má volitelný flowchart / activity diagram (nahrazuje nebo
> doplňuje sequence diagram pro složitější business logiku) — viz
> [scenario.md](scenario.md) "Anchors emitted".
```

## Notes

- **Order of sections**: Option A — `Uživatel → Admin → Systém`
  is the typical reading order (most-frequent audience first).
  Option B — primary modules first (the ones the user encounters
  most). Option C — natural pair order (read before write, internal
  before external).
- **SC-ID stability**: once assigned, SC-IDs do not change. New
  scenarios get the next free ID; deleted scenarios leave a gap
  (do not renumber). The order on this list is by SC-ID within
  each group.
- **Aktéři column**: lower-case role identifiers from `2.1.4 Aktéři
a persóny`. Multiple actors separated by `+` when both act
  (`user + admin`); separated by `, ` when the scenario applies
  to any of several (`user, admin`).
- **Spustí column**: links to follow-up scenarios when one
  scenario triggers another. Use `—` for scenarios with no
  downstream effect. The link points into the `002-scenarios/`
  group via `../002-scenarios/sc-NN-<slug>.md` (or
  `../002-scenarios/<podskupina>/sc-NN-<slug>.md` when scenarios are
  sub-grouped).
- **Supporting views**: when `process` or `ui` is enabled, the catalogue may add
  compact `Procesy` and `Obrazovky` link columns. Add only relationships that
  exist, keep the detailed relationship on the artifact pages, and ensure the
  target links back where useful. Do not copy process stages or UI validation
  into this table.
- **Per-group section**: one short paragraph + use-case diagram
  anchor + scenario table. If a group has only one scenario, fold
  it into a neighbouring group (`scenario-grouping.md`
  "Anti-patterns").
- **`use-case-all`**: the global anchor at the top. Drop it when
  the system has more than ~3 groups — the global diagram becomes
  unreadable. Per-group anchors stay.
- **Pokrytí table**: includes the optional flowchart column so the
  reader sees at a glance which scenarios use the extra diagram
  for complex business logic.
