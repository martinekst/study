# Template: repeated domain composition

Use only for a composition reused by multiple actual screens or explicitly
adopted as part of the project's component system. It is a design arrangement,
not automatically an implemented component or a new source of business logic.

````markdown
## <CompositionName>

**Purpose:** <what recognizable domain content it presents>  
**Consumers:** <links to at least two screens, or explicit system decision>  
**Status/source:** <current/agreed target/proposal and evidence>

### Anatomy

| Slot/region | Primitive            | Required?          | Content/type constraints | Token/pattern refs |
| ----------- | -------------------- | ------------------ | ------------------------ | ------------------ |
| <slot>      | <verified component> | <yes/no/condition> | <constraint>             | <refs>             |

### Variants and states

| Variant/state | When used          | Visual difference | Accessibility behavior |
| ------------- | ------------------ | ----------------- | ---------------------- |
| <variant>     | <consumer/trigger> | <detail>          | <detail>               |

### Layout and responsive rules

- <stable order/alignment/spacing rule>.
- <small versus large viewport behavior>.
- <content overflow/localization behavior>.

### Illustrative structure

```text
<Concise component tree or pseudo-markup using actual primitive names.>
```

### Invariants and exceptions

- <what every consumer must preserve>.
- <documented exception and reason>.
````

Do not place data fetching, authorization decisions, derived business status,
or state-management logic here. Link those owners and describe only the visual
inputs/outputs the composition consumes.
