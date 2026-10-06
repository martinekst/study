# Výchozí formát TC (výtah z firemního standardu)

Použij, **jen když projekt vlastní formát nemá a `gh` na `TechFides/tf-qa-examples` nejde**.
Zdroj pravdy je `docs/qa-specifikace/04-standardy-konvence-a-procesy/psani-testovacich-pripadu.md`
v tom repu; tenhle výtah může být starší.

## Umístění

- TC v sekci TC, **složka = oblast** (`area`), jeden TC = jeden soubor `tc-<oblast>-<tema>.md`.
- Prerekvizity ve vlastní podsložce (`00-prerekvizity/`), `id: PRE-<pořadí>`, název `[PRE] Stav`.
- Nemá-li projekt sekci TC, cestu **navrhni v náhledu**, nezakládej ji bez schválení.

## Název

`[Oblast] Stručný popis scénáře` - jeden prefix odvozený z `area`, česky, ≤ ~80 znaků.
Rozlišuje-li projekt produkt nebo tenant, přidej za pomlčku: `[Oblast] Popis – produkt`.

## Frontmatter

```yaml
---
title: '[Oblast] Popis scénáře'
status: draft # draft | review | published | archived
updated_at: YYYY-MM-DD
id: TC-<AREA>-001 # trvalé, nikdy neměnit
area: <slug-oblasti> # projektový číselník
subarea: <slug> # jen má-li oblast podčásti
type: functional # functional | e2e | technical | exploratory | nonfunctional (právě 1)
priority: medium # critical | high | medium
suites: [] # smoke | regression | acceptance (0..N; regression přidává QA vědomě)
preconditions: [] # [PRE-001, …]
feature: [] # projektový číselník
environment: [stage] # dev | stage | prod
estimate: 10m # 5m | 10m | 15m | 20m
automation:
  state: manual # manual | forAutomation | automated
  test: null
  framework: null
spec: null
tickets: []
code: null
owner: <login>
labels: []
---
```

## Tělo

```markdown
> **Účel:** 1-2 věty, co a proč ověřujeme.

## Prerekvizity

- Sdílené: **PRE-001** - [PRE] …
- TC-specifické: co musí platit navíc jen pro tento TC.

## Kroky

| #   | Akce                        | Data | Očekávaný výsledek                                        |
| --- | --------------------------- | ---- | --------------------------------------------------------- |
| 1   | Klikněte na „…".            | –    | Zobrazí se …                                              |
| 2   | Odešlete formulář.          | –    | <ul><li>Zobrazí se potvrzení.</li><li>Stav je „…".</li></ul> |

## Odkazy

- Specifikace / Tikety / Kód / Automatizovaný test
```

- Používá-li projekt VitePress s `$frontmatter`, vlož pod frontmatter přehledovou tabulku
  z firemní šablony (`00-sablona-tc.md`). Jinak ji vynech - mimo VitePress se nevykreslí.
- Exploratory: místo `## Kroky` sekce `## Oblasti k ověření` se zaškrtávacím seznamem.
- Blokovaný TC: `status: draft` + `> ⚠️ Blokováno:` s odkazem na ticket.
