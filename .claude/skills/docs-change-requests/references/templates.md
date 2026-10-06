# Change-request templates

Adapt these blocks to the existing tree. Remove unsupported optional sections
and every placeholder.

## Section summary

```markdown
# Change requests

<Scope, why the package exists, and lifecycle/evidence context.>

## Decision and delivery overview

| Group                    | Outcome              | State   | Depends on      | Acceptance owner         |
| ------------------------ | -------------------- | ------- | --------------- | ------------------------ |
| [<group>](relative-path) | <observable outcome> | <state> | <links or none> | <known owner or unknown> |

## Dependency and rollout view

<Ordered explanation or diagram anchor; distinguish dependency from preferred sequence.>

## Aggregate risks and open decisions

- <item, consequence, evidence/decision needed>
```

## Outcome group

```markdown
# <Change outcome>

| State | <proposed / in progress / implemented> |
| ----- | -------------------------------------- |

<One paragraph: outcome, affected reader/user, and why it is separate.>

## Scope and boundaries

- **Included:** <behavior>
- **Excluded:** <behavior>
- **Dependencies:** <directional links and reason>

## Current and target behavior

<Concise delta; link to canonical pages rather than copying their detail.>

## End-to-end acceptance

1. <precondition and trigger>
2. <observable result across relevant roles/systems>
3. <failure/recovery and evidence>

## Implementation slices

- [<Task>](relative-path) — <responsibility and observable completion>

## Design detail

- [<Design page>](relative-path) — <owned target-state detail>

## Affected canonical documentation

- [<Scenario/process/screen/interface/test>](relative-path) — <relationship>

## Evidence and decisions

- <source/reference and what it supports>
```

## Implementation task

```markdown
# <Responsibility> — <task outcome>

> **Change group:** [<group>](./index.md) · **Primary responsibility:** <slice>

## Purpose and boundary

<What this slice delivers, why it is needed, and what it does not own.>

## Current constraint

<Existing behavior/evidence, or explicitly greenfield.>

## Implementation result

1. <chronological, independently meaningful step with design/canonical links>
2. <next step>

## Failure, migration, and rollback

<Only applicable behavior; otherwise state why none is required.>

## Acceptance evidence

- <specific test, artifact, configuration, or operational observation>

## Related documentation

- [<owned detail>](relative-path)
```

## Technical design page

```markdown
# Design — <responsibility>

> **Change group:** [<group>](./index.md) · **Used by:** [<tasks>](relative-path)

## Purpose and scope

<Exact design responsibility and exclusions.>

## Current constraints

<Evidence-backed existing mechanics that shape the target.>

## Target design

<Contracts, states, sequences, mappings, examples, or measurable targets.>

## Decisions and alternatives

| Decision | Chosen option/status | Reason/evidence | Consequence |
| -------- | -------------------- | --------------- | ----------- |

## Failure, migration, and rollback

<Observable behavior and operational recovery.>

## Acceptance and traceability

- [<task/test/canonical page>](relative-path) — <what it verifies or owns>
```
