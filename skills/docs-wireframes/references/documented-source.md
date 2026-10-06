# Layout from documented behavior

Load this reference when no supplied screenshot is the primary visual source.
The canonical owner determines what exists; implementation or agreed design
evidence may determine which UI primitive and arrangement realizes it.

## Build a closed inventory

Read the selected screen's canonical owner and linked evidence. Record:

| Property                  | Typical evidence                                                      |
| ------------------------- | --------------------------------------------------------------------- |
| Visible label             | UI page, localization resource, agreed screen/design text             |
| Field type/control        | UI page, form schema, route/component implementation, approved design |
| Required/optional         | UI validation rule or acceptance criterion                            |
| Editable/read-only/hidden | field ownership, permission rule, component state                     |
| Validation and feedback   | canonical UI state/error table or acceptance criterion                |
| User action               | screen action table, scenario step, or implemented handler            |
| Result/navigation         | scenario/process outcome and linked target screen                     |
| Role visibility           | UI permission section or verified guard                               |

When a scenario page owns the journey but an enabled UI view has a screen page,
take field and validation detail from the screen page and link the scenario for
entry/exit context. When no UI owner exists, derive only what the scenario,
process, specification, or inspected implementation confirms.

## Map field semantics to visual primitives

Use the project's actual component system where known. Without one, these are
neutral wireframe choices, not implementation decisions:

| Supported semantics         | Neutral primitive                                          |
| --------------------------- | ---------------------------------------------------------- |
| short text, email, password | labelled text field, with type annotation when useful      |
| long text                   | multiline field                                            |
| one of few options          | radio group or segmented choice when choices are evidenced |
| one of many options         | select/autocomplete placeholder                            |
| independent boolean         | checkbox or switch according to documented behavior        |
| date/time                   | labelled date/time field; do not invent picker behavior    |
| repeated values             | repeatable row pattern plus evidenced add/remove actions   |
| system-derived value        | read-only display, not a user-editable input               |
| backend-only value          | omit from the screen                                       |

Do not infer a select's options, a default value, placeholder, helper text, icon,
or destructive action from field type alone.

## Arrange by actual page need

- Form/task page: context, fields in supported task order, inline feedback, then
  actions.
- List/search page: filters actually supported, list/table columns, selection or
  row actions, and the relevant empty/loading/error state.
- Detail page: identity/status, readable groups, then evidenced actions.
- Dashboard: only supported metrics/cards and their units, freshness, empty and
  permission states.
- Process-supporting frame: show the one screen/state used at that step; do not
  turn the process page into a new UI catalogue.

## Gaps and contradictions

If the owner mentions an element but its label, control, state, or placement is
not supported, record a `wireframe-gap` on the host and keep the draft explicit.
If two sources describe the same element differently, record
`wireframe-text-contradiction` with both claims. Do not repair the canonical page
from this skill unless the user also requested that owning documentation change.
