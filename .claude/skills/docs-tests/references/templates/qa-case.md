# Template: structured technical QA case

Use this shape unless the user or existing portal requires a different syntax.
Keep one case under one stable anchored heading.

```markdown
## TC-<SOURCE>-<FAMILY>-<NN>: <short criterion> {#tc-<source>-<family>-<nn>}

| Pole               | Obsah                                                                |
| ------------------ | -------------------------------------------------------------------- |
| Kritérium          | <one observable claim this case proves>                              |
| Zdroj              | [<canonical source ID/title>](<relative-path>#<anchor>)              |
| Předpoklady / data | <identity, starting state, concrete safe inputs>                     |
| Mocky / fixtures   | [<exact reusable item>](../004-mocky/<file>.md#<anchor>) or `—`      |
| Úroveň             | <unit/component/integration/contract/e2e/manual/...>                 |
| Automatizace       | <planned/implemented/manual/not-applicable/unknown>                  |
| Provedení          | <not-run/executed-passed/executed-failed/blocked/unknown + evidence> |

### Kroky nebo metoda ověření

1. <reproducible action>
2. <reproducible action>

### Očekávané pozorování

- <response/event/UI result>
- <data or state transition, including forbidden side effects>
- <relevant log/metric/trace when part of the criterion>

### Poznámky a otevřené body

- ⚠️ TODO: <missing detail, consequence, owner or next action>
```

Use concrete safe data and identifiers. Remove the mock row link when no
substitute is needed, and omit the open-points section when empty. A test source
or automation label does not prove execution or success.
