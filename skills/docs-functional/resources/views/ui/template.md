# Templates: UI module and screen

## Module index

```markdown
---
title: <Název modulu>
status: draft
updated_at: <YYYY-MM-DD>
---

<Dvě věty: jakou business oblast modul pokrývá, kdo jej používá a jaký výsledek podporuje.>

## Přehled modulu

| Oblast       | Popis                                 | Vstup                                       |
| ------------ | ------------------------------------- | ------------------------------------------- |
| Obrazovky    | <co zde uživatelé řeší>               | [Přehled obrazovek](existing-screens-index) |
| Role a práva | <jen pokud existuje modulový kontext> | <existující odkaz>                          |

## Obrazovky

| Obrazovka                                  | Účel                                            | Hlavní akce                                             |
| ------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------- |
| [Detail škody](existing-claim-detail-path) | Posoudit jeden případ a řídit jeho další postup | Doplnit podklady, navrhnout rozhodnutí, schválit platbu |
```

## Screen page

````markdown
---
title: <Název obrazovky>
status: draft
updated_at: <YYYY-MM-DD>
---

<Jedna věta: čeho uživatel na obrazovce dosáhne.>

## Obecný popis

<Jak se na stránku vstupuje, pro koho je určena a jaký je výchozí stav.>

## Wireframy

<!-- wireframe-anchor: <screen-slug> -->

## Validace stránky

- <pravidlo závislé na celé stránce, např. „Schválit nelze bez alespoň jednoho dokladu“.>

## Hlavní flow

1. <uživatel otevře stránku>
2. <provede hlavní akci>
3. <uvidí výsledek>

<!-- diagram-anchor: flow-<screen-slug> -->

## Detail a procesy

- **Zobrazit stav případu:** <co uživatel vidí a kdy>
- **Schválit platbu:** <co může spustit a jaký viditelný výsledek vznikne>

<!-- diagram-anchor: use-case-<screen-slug> -->

## Data

| Pole          | Typ      | Zdroj                 | Editovatelné         | Povinné | Validace a chybová hláška     | Poznámka                     |
| ------------- | -------- | --------------------- | -------------------- | ------- | ----------------------------- | ---------------------------- |
| Částka plnění | currency | Vypočteno z posouzení | Ano, před schválením | Ano     | „Zadejte částku vyšší než 0.“ | Po schválení pouze pro čtení |
| Stav          | badge    | Stav případu          | Ne                   | —       | —                             | Určuje dostupné akce         |

## Výpočty

```text
Částka k výplatě = uznaná škoda - spoluúčast
```

## Sekce stránky

Stránka je rozdělena do <N> oblastí: <názvy>.

### Schválení platby {#schvaleni-platby}

<!-- wireframe-anchor: <screen-slug>-schvaleni-platby -->
<!-- wireframe-status: missing | reason="Je nutné ověřit samostatný modal a jeho popisek." -->

**Validace sekce**

<pravidla oblasti>

**Detail sekce**

<chování a viditelný výsledek>

**Data sekce**

| Pole   | Typ   | Povinné  | Validace a chybová hláška    |
| ------ | ----- | -------- | ---------------------------- |
| <pole> | <typ> | <Ano/Ne> | <pravidlo + skutečná zpráva> |

## Alternativní toky

### Alt-1: <Název>

- **Odbočka:** <krok hlavního flow>
- **Podmínka:** <business nebo uživatelská podmínka>
- **Reakce:** <co uživatel uvidí a co může udělat>

## Oprávnění {#opravneni}

<Konkrétní čtení/zápis/akce a podmínky; nebo explicitně uveďte, že stránka nemá jemnější oprávnění. Odkaz na společného vlastníka.>

## Odkazy

- **Scénáře:** <existující bounded-goal stránky>
- **Procesy:** <existující end-to-end stránky>
- **Technický detail:** <existující API/data vlastník>
````

Remove `Výpočty`, screen sections or alternatives when they do not apply. For a read-only screen, say once that all displayed values are non-editable and simplify the data table.
