# Landscape templates

Adapt these blocks to the requested snapshot. Use the filesystem naming already
established by the workspace; no page-order metadata is required here.

## Executive overview

```markdown
# Portfolio landscape — <snapshot date>

<Purpose, included scope, exclusions, and confidence in one paragraph.>

## Decision summary

- <material architecture/ownership/operation observation>
- <material risk or evidence gap>
- <next decision or validation action>

## Products and systems

| Product/domain | Systems | Outcome/responsibility | Confidence |
| -------------- | ------- | ---------------------- | ---------- |

## Critical interactions

<Top-down explanation or diagram anchor, followed by links to detail.>

## Known gaps and boundaries

- <unknown/inaccessible/inferred item and consequence>
```

## Inventory card

```markdown
### <System/repository>

- **Purpose:** <evidence-backed summary>
- **Role(s):** <observed types>
- **Source/revision:** <reference>
- **Provides:** <interfaces with evidence>
- **Consumes:** <interfaces with evidence>
- **Data/operations:** <only evidenced responsibilities>
- **Ownership signals:** <source, or unknown>
- **Lifecycle/activity evidence:** <dated signal and confidence>
- **Unknowns:** <material gaps>
```

## Interaction or business flow

```markdown
## <Outcome/interaction>

- **Actor/trigger:** <evidence>
- **Result:** <evidence>

| Step | From | To  | Contract/data | Failure/recovery | Evidence/confidence |
| ---: | ---- | --- | ------------- | ---------------- | ------------------- |

<Do not bridge missing steps with invented behavior.>
```

## Impact analysis

```markdown
# Impact analysis — <change>

## Change surface and inspected scope

<Exact proposed change, entry systems, revisions, exclusions.>

| System | Classification                                                                | Traversal/evidence | Expected effect     | Validation/action |
| ------ | ----------------------------------------------------------------------------- | ------------------ | ------------------- | ----------------- |
| <name> | affected / possibly affected / not affected in inspected scope / not assessed | <references>       | <effect or unknown> | <next check>      |

## Material gaps

- <gap, consequence, decision/action owner only when known>
```
