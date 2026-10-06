# Business page templates

Use these blocks selectively inside the existing portal structure. Replace every
placeholder or remove the unsupported row/section.

## Decision overview

```markdown
# <Decision-oriented title>

<What the reader needs to understand or decide, in one paragraph.>

## Decision at a glance

| Question            | Evidence-backed answer                           |
| ------------------- | ------------------------------------------------ |
| Problem/opportunity | <current consequence and source>                 |
| Desired outcome     | <target outcome; agreed, proposed, or unknown>   |
| Scope boundary      | <included and excluded>                          |
| Success measure     | <baseline/target or measurement decision needed> |
| Next decision       | <decision, owner when known, and timing>         |

## Material assumptions and risks

<Only items that change the decision; link to the canonical register.>

## Related documentation

- [<Current and target state>](relative-path)
- [<Functional or process detail>](relative-path)
```

## Current and target state

```markdown
# <Outcome/process> — current and target state

<Scope and why the comparison matters.>

## Comparison

| Dimension       | Current                  | Target                  | Evidence/status                       |
| --------------- | ------------------------ | ----------------------- | ------------------------------------- |
| Outcome/process | <today>                  | <target>                | <references; agreed/proposed/unknown> |
| Roles           | <today>                  | <target>                | <references>                          |
| Systems         | <today>                  | <retained/replaced/new> | <references>                          |
| Measure         | <baseline + unit/period> | <target on same basis>  | <references>                          |

## Decisions and gaps

- <open decision or missing evidence, consequence, next evidence needed>
```

## Value case

```markdown
# Value and outcomes

## Supported benefits

| Beneficiary  | Current evidence   | Target change | Observable result               | Confidence/source |
| ------------ | ------------------ | ------------- | ------------------------------- | ----------------- |
| <role/group> | <baseline or pain> | <change>      | <measure or observable outcome> | <reference>       |

## Calculation, when inputs exist

| Input         |                     Value | Basis/source                     |
| ------------- | ------------------------: | -------------------------------- |
| Baseline      |     <value, unit, period> | <reference>                      |
| Target        | <value, same unit/period> | <reference>                      |
| Unit value    |           <currency/unit> | <reference or labelled estimate> |
| Annual volume |                   <value> | <reference>                      |

<Formula, result, currency/tax basis, horizon, adoption, and overlap caveat.>

## Trade-offs and decisions needed

- <cost, dependency, excluded benefit, or missing input>
```

## Stakeholder, risk, or roadmap page

```markdown
# <Stakeholders | Risks and assumptions | Roadmap>

<Decision relevance and scope.>

## <Primary table>

<Use the fields from `stakeholders-risks-roadmap.md`; omit unsupported fields.>

## Open decisions

- <decision, consequence, evidence needed, owner only when known>

## Related documentation

- [<canonical related page>](relative-path)
```
