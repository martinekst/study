# Template: architecture decision record

Use one file per decision under
`010-audit/002-decision-log/<NNNN>-<ascii-slug>.md`. The four-digit identifier is
permanent. Keep superseded decisions and link their successor.

```markdown
---
title: ADR <NNNN> — <Czech title>
status: draft
updated_at: <YYYY-MM-DD HH:MM>
adr_id: <NNNN>
decision_status: <proposed | accepted | superseded | deprecated>
---

## Stav rozhodnutí

<Decision status, date, decision-makers or responsible roles, and successor
when superseded.>

## Kontext

<Problem, constraints, evidence, and what remains outside this decision.>

## Zvažované varianty

### Varianta A — <name>

<Description, advantages, disadvantages, risks, and evidence.>

### Varianta B — <name>

<Description, advantages, disadvantages, risks, and evidence.>

## Rozhodnutí

<Chosen option and why its trade-offs fit the stated constraints. A proposal
must remain labelled as proposed.>

## Dopady

- Pozitivní: <...>
- Negativní / přijatý dluh: <...>
- Kód a data: <...>
- Infrastruktura a provoz: <...>
- Dokumentace a testy: <...>

## Ověření a sledování dopadu

<Evidence or metric, owner, time horizon, and review trigger.>

## Odkazy

- [Decision log](./index.md)
- [<affected existing page>](relative-path)
```

Do not infer acceptance from implementation or meeting notes. When no genuine
alternative was considered, state that evidence instead of inventing variants.
Update both sides of supersession links and never delete the historical record.
