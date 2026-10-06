# Template: technical implementation-test overview

Use for `technical/011-testy/index.md`. This page maps real test implementation
and execution infrastructure. It links to, but does not replace, the separate
test-design section.

```markdown
---
title: Testy (přehled)
status: draft
updated_at: <YYYY-MM-DD HH:MM>
---

## Přehled

<Which test levels exist, what release decision they support, and where they
run. Distinguish implemented suites from observed run results.>

## Strategie napříč systémem

| Úroveň                                      | Účel      | Nástroj     | Spouštění / gate | Důkaz         |
| ------------------------------------------- | --------- | ----------- | ---------------- | ------------- |
| <unit/integration/contract/e2e/performance> | <purpose> | <real tool> | <real trigger>   | `<reference>` |

## Testovací stránky aplikací

| Aplikace        | Implementované testy                 | CI / výsledek                             |
| --------------- | ------------------------------------ | ----------------------------------------- |
| [<code>] <name> | [Testy](existing-relative-test-page) | <existing run/report link or "neuvedeno"> |

## Sdílené nástroje a data

<Only fixtures, harnesses, containers, contracts, and tools shared by multiple
applications. Keep application-local detail on its page.>

## Vazba na testovací návrh

<Link to the existing `tests/` section for business UAT, traceability, QA cases,
mocks, and release evidence. Explain the boundary in one sentence.>

## Otevřené body

- ⚠️ TODO: <material missing suite, evidence, owner, and consequence>
```

Generate this overview after application test pages so every link can be
checked. The presence of test source supports “implemented”; only an actual
report supports “executed”, “passed”, coverage, or trend claims.
