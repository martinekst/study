# Template: Business UAT

Business UAT is customer-readable acceptance. Group items by outcome or
business area and link each item to its canonical behavior and technical QA
coverage when available.

```markdown
---
title: <Business area or outcome>
status: draft
updated_at: <YYYY-MM-DD HH:MM>
---

## Účel a rozsah

<What business outcome is being accepted, by whom, and what is outside scope.>

## UAT-<AREA>-<NN>: <business outcome> {#uat-<area>-<nn>}

| Pole                | Obsah                                                           |
| ------------------- | --------------------------------------------------------------- |
| Business kritérium  | <observable customer outcome>                                   |
| Zdroj               | [<scenario/process/requirement/change>](existing-relative-path) |
| Role                | <accepting business role>                                       |
| Výchozí stav a data | <safe business-readable setup>                                  |
| Důkaz               | <what is recorded: result, screenshot, report, approval>        |
| Stav                | <planned/passed/failed/blocked/unknown>                         |

### Postup

1. <customer-readable action>
2. <customer-readable action>

### Očekávaný business výsledek

<Outcome without internal implementation detail.>

### Vazba na QA

- [<stable QA case>](../003-qa-testovaci-scenare/<file>.md#<case-anchor>)
```

Do not use a customer sign-off to imply that unit, integration, security, or
operational checks passed. Omit the QA link until the exact case exists.
