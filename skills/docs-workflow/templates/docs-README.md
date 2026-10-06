---
title: Documentation setup
status: published
updated_at: YYYY-MM-DD
documentation:
  active_version: v2
  lifecycle_stage: discovery
  deliverable_type: documentation
  sections:
    - business
    - functional
    - technical
  functional_views:
    - scenario
---

# Documentation setup

Version **v2** is **discovery-stage explanatory documentation** for decision
support. Its primary functional view is **scenario**. Regenerate this sentence
whenever the contract changes.

All pages use a top-down structure: decision, outcome, or reader value first,
then context and detail. This universal rule is not an editable YAML switch.

## What the YAML means

The `documentation` object has at most five behavior fields. `title`, `status`,
and `updated_at` are portal page metadata.

### Page metadata

| Field/value         | Meaning and update rule                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `title`             | Names this setup page. Change it only when the page title should change.                                                             |
| `status: published` | Activates content generation. `docs-workflow` sets it only after the complete setup preview is confirmed and validates.              |
| `status: draft`     | Setup is incomplete. If set manually, setup/review may run but generation stays blocked until the corrected contract validates.      |
| `status: review`    | The setup itself is being checked. Review may run; restore `published` only after the contract decision and validation are complete. |
| `status: archived`  | The whole contract was deliberately retired. It is inactive and may be read only for an explicit historical audit or migration.      |
| `updated_at`        | The date this README itself changed, including a review-link refresh. It never means that documentation or code was fully verified.  |

### Documentation behavior

| Field              | Allowed values                                                    | Runtime effect and controlled update                                                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active_version`   | existing `vN`                                                     | Selects the working folder. Activate only after the target tree and links validate; update README last.                                                                                               |
| `lifecycle_stage`  | `discovery`, `implementation-ready`, `as-built`                   | Changes evidence, acceptable uncertainty, and review emphasis. A stage migration shows the latest full-review score/caps and records an explicit decision when proceeding below the recommended band. |
| `deliverable_type` | `documentation`, `offer`                                          | Changes audience, language, required high-level content, and review weights. Preview and review affected content before changing it.                                                                  |
| `sections`         | `business`, `functional`, `technical`, `tests`, `change-requests` | Activates persistent capabilities. Adding/removing a value migrates folders and links; removed content is archived or relocated, never silently deleted.                                              |
| `functional_views` | ordered `scenario`, `process`, `ui`                               | Selects functional structures; first is primary. Add/remove/reorder only through a migration that repairs ownership and reciprocal links. Required only with `functional`.                            |

`sections` is a set shown in canonical order; its YAML order never controls the
menu. Only the order of `functional_views` has runtime meaning.

There is no `owner` field until an authoritative TechFides team registry
exists, and no `schema_version` until a real contract-schema migration exists.
Verification dates, sources, scores, skill IDs, and exact menus stay with their
actual owners: review reports, runtime resolution, and the filesystem.

### Lifecycle values

- **discovery** — supports a decision; explicit alternatives and unknowns are
  allowed and it is not an implementation commitment.
- **implementation-ready** — describes the agreed, testable target; unresolved
  implementation blockers are defects.
- **as-built** — intends to describe implemented behavior; code/configuration
  wins for inspected scope. Full verification date and scope live only in a
  review report.

### Deliverable values

- **documentation** — neutral, explanatory specification/reference language.
- **offer** — executive, outcome-first language; decision summary, customer
  problem, value, scope/options, commercial assumptions, evidence, and next
  step must be easy to find. Existing portal structure remains authoritative.

### Section values

| Value             | What the reader learns and measurable effect                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `business`        | Business context, value, stakeholders, risks, and next steps are in scope; `docs-business` must cover them.                                             |
| `functional`      | User-visible behavior is in scope; `docs-functional` runs and a non-empty view list becomes mandatory.                                                  |
| `technical`       | An ANA technical section is in scope; `docs-technical` provides its evidence-backed catalogue. This does not make the portal a pure `tech-docs` portal. |
| `tests`           | Explicit strategy, coverage, or traceability is required; `docs-tests` owns it.                                                                         |
| `change-requests` | Structured implementation/change packages are maintained; `docs-change-requests` owns them.                                                             |

### Functional view values

- **scenario** — one bounded actor goal, prerequisites, main/alternative flow,
  and result. Example: “Submit a claim”.
- **process** — an end-to-end outcome across roles, screens, systems, or
  scenarios. Example: “Resolve a claim from submission through payment and
  closure”.
- **ui** — application module and screen behavior. Example: “Claims → Claim
  detail”, including fields, actions, validation, states, and permissions.

When several views are enabled, shared definitions have one home. Processes
link to scenarios and screens; they do not copy their steps or validations.

## What will be used

This table is generated from the contract and is not editable configuration.

| Declared need                        | Resolved capability                                |
| ------------------------------------ | -------------------------------------------------- |
| Business section                     | `docs-business`                                    |
| Functional section, scenario primary | `docs-functional` → scenario resources             |
| Technical section                    | `docs-technical`                                   |
| Review                               | `docs-review` with discovery/documentation weights |

## Expected topology

The active version contains a shared overview followed by the declared section
and view groups. The actual `docs/v2/` filesystem is the exact menu; navigation
is generated from its folders and files, and this README never duplicates it.

## How to change the setup

Ask in plain language, for example:

- “Move this portal to implementation-ready.”
- “Add a process view and keep scenario as supporting.”
- “Start v2 from the current v1 content.”

The workflow previews affected files and links, asks for approval, performs the
migration, validates it, and updates this README last.

## Reviews

- Latest full review: _not available_
- Latest partial review: _not available_
