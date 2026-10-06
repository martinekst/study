# UI view guide

Use the UI view when readers navigate by application module and screen. This branch adapts the proven TFPL screen approach while keeping only reusable decisions.

## What a screen page owns

- the screen’s user goal and entry point;
- visible initial, empty, loading, error and restricted states;
- actions and their actual effects;
- fields, data origin, editability and requiredness;
- field-level validation and exact visible messages;
- user-visible calculations;
- screen sections, panels and modal dialogs;
- page/action permissions;
- links to scenarios, processes and technical owners.

Do not create a technical page for every screen. Link an existing API, data or integration owner when useful.

## Recommended module shape

```text
ui/
├── index.md
└── <module>/
    ├── index.md
    ├── roles-and-permissions.md       # only when module-specific context is needed
    └── screens/
        ├── index.md
        ├── <screen>.md
        └── <screen>/                  # only for substantial independent areas
            └── <section>.md
```

Reuse an existing portal’s established module folders and names. Adding or regrouping modules is structural.

In a UI-only portal, the common overview may contain a short orientation list
of the main business journeys. Do not create detailed end-to-end process pages,
process IDs, or a process group unless `process` is enabled.

## Screen rules

- `Hlavní flow` answers “what sequence does the user follow?” and stays a short sunny path.
- `Detail a procesy` answers “what is on this screen and what can be done here?” It is not replaced by the main flow.
- Page-level validation describes conditions involving the page as a whole. Field-level validation stays in the data table.
- A data table always answers whether a value is editable. If every row shares the answer, state it once above the table instead of keeping a repetitive column.
- Quote an actual visible validation message. If only a rule is known, record the missing-message gap.
- Describe the effect behind a label. A button named _Delete_ may cancel or deactivate; the handler/state change decides the documented behavior.
- State explicitly when a screen has no separate page/action gate. Absence of granular authorization is a reader-relevant fact.

## Splitting screen sections

Keep a small panel or confirmation dialog inline. Create a subpage only when the area has substantial independent flow, data/rules, or a separate navigation need. The parent page then owns orientation and a routing table; the subpage owns its detail.

Every documented visual area must be locatable:

- an inline area is visibly delineated and labelled on the main screen wireframe;
- a modal dialog gets its own board;
- use `wireframe-anchor: <screen-slug>-<section-slug>` and mark it missing/stale until checked.

Never claim that a board matches when it has not been inspected.

## Claim example

The **Claim detail** page owns:

- the visible status `Ready for payment`;
- the _Approve payment_ action and the role/state conditions that enable it;
- the amount field’s editability and exact validation message;
- the evidence-upload modal and its wireframe anchor.

`SC-04 Approve payment` owns the bounded actor flow. `PROC-01 Resolve a claim` owns the Claims-to-Finance hand-off. The UI page links to both and does not copy their complete steps.
