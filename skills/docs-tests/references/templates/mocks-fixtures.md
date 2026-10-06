# Template: mocks, stubs, and fixtures

Store reusable substitutes and datasets in `004-mocky/`, not in generic public
artifact folders or copied into every QA page. Use non-sensitive synthetic data.

## API or event substitute

```markdown
## <Stub name> {#stub-<slug>}

**Simuluje:** <dependency and behavior>  
**Používají:** [<case ID>](../003-qa-testovaci-scenare/<file>.md#<anchor>)  
**Omezení:** <what this substitute cannot prove>

::: details Request/event and response

<importable, sanitized mapping in the appropriate fenced format>

:::
```

Cover only behaviors cases need: success, stable business error, timeout,
malformed payload, rate limit, retryable/non-retryable failure, or ordering when
applicable. Do not invent a production contract; trace each mapping to an
interface or approved test decision.

## Data fixture

```markdown
## <Dataset name> {#fixture-<slug>}

**Výchozí stav:** <purpose and entities>  
**Reset/cleanup:** <reproducible behavior>  
**Používají:** [<case ID>](../003-qa-testovaci-scenare/<file>.md#<anchor>)

::: details Importable synthetic data

<sanitized fixture in the appropriate fenced format>

:::
```

## Case-to-substitute matrix

```markdown
| Case                                                        | API/event substitute                          | Data fixture                                    | Environment | Notes    |
| ----------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------- | ----------- | -------- |
| [<case ID>](../003-qa-testovaci-scenare/<file>.md#<anchor>) | [<stub>](001-wiremock-api.md#<anchor>) or `—` | [<fixture>](002-db-fixtures.md#<anchor>) or `—` | <env>       | <limits> |
```

Direct case links and the matrix complement each other. Update both when an
anchor changes; never use the matrix as a substitute for case-level setup.
