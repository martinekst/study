# Pricing output templates

Use only the outputs the user needs. The calculation artifact remains the source
of truth; summaries link to it.

## Scope breakdown

```markdown
# Estimate scope and breakdown

## Decision baseline

- **Deliverable/version:** <anchor>
- **Included outcome:** <outcome>
- **Excluded outcome:** <outcome>
- **Acceptance boundary:** <evidence>

## Proposed work

| ID   | Milestone/outcome | Work item | Scope anchor     | Dependency | Uncertainty         |
| ---- | ----------------- | --------- | ---------------- | ---------- | ------------------- |
| <ID> | <usable result>   | <work>    | <link/reference> | <basis>    | <known/range/spike> |

## Questions that change the estimate

- <question, affected IDs, decision needed>
```

## Research log

```markdown
# Estimate research

## <Question>

- **Affects:** <estimate IDs and decision>
- **Sources:** <versioned/retrieval-dated references>
- **Verified facts:** <facts>
- **Inference:** <clearly labelled inference>
- **Unknowns:** <remaining uncertainty>
- **Estimate effect:** <range/change/spike>
```

## Detailed estimate

```markdown
# Effort and price estimate

## Basis

<Currency, tax, rate date, effort unit, contingency, rounding, validity.>

| ID   | Scope item | Role   |   Effort/range |    Rate |       Base price | Contingency/other |            Total | Assumption |
| ---- | ---------- | ------ | -------------: | ------: | ---------------: | ----------------: | ---------------: | ---------- |
| <ID> | <item>     | <role> | <value + unit> | <value> | <formula result> |     <value/basis> | <formula result> | <text>     |

## Totals and variants

| Option | Included IDs | Effort | Price excl. tax | Tax | Price incl. tax | Duration basis |
| ------ | ------------ | -----: | --------------: | --: | --------------: | -------------- |

## Assumptions, exclusions, and re-estimation triggers

- <item>
```

## Offer summary

```markdown
## Investment and timing

| Option | Customer outcome | Price basis | Timing | Key difference |
| ------ | ---------------- | ----------: | ------ | -------------- |

<Validity, tax/currency, assumptions, exclusions, and next decision. Link to the
detailed estimate rather than reproducing its rows.>
```
