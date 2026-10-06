# Process view guide

Use the process view for an end-to-end business outcome that crosses meaningful boundaries. A process can compose several scenarios and screens; changing perspective alone does not turn a scenario into a process.

## Qualification test

Document a process when all are true:

1. It has a clear business trigger and terminal outcome.
2. It contains more than one meaningful stage.
3. At least one boundary is crossed: role, team, system, screen, external party or bounded scenario.
4. The hand-off or state progression matters to a reader.

If one actor completes one bounded goal, use a scenario. If the content mainly explains one screen, use UI. A broad page that already covers an end-to-end outcome should be migrated into the process catalogue rather than duplicated under a new label.

## What a process owns

- start and end boundary;
- outcome and process owner;
- ordered stages and responsible party;
- hand-off inputs, outputs and receiving triggers;
- user-observable or business-relevant states;
- exceptions, rework and terminal alternatives;
- dependencies and controls;
- defined KPI or SLA;
- links to component scenarios and UI screens.

A process does not own field validation, screen layout, API payloads or the detailed steps of a component scenario.

## Discovery

Trace the outcome rather than one application path:

- follow the initiating request to its final business state;
- identify where responsibility changes;
- confirm that each receiving stage has a demonstrated trigger;
- distinguish synchronous continuation, queued work, manual assignment and external response;
- record waits and service targets only when defined;
- find rejection, cancellation, rework and partial-success paths;
- map each bounded user goal to an existing or planned scenario;
- map user interaction points to existing or planned screen pages.

Evidence of a sender action alone does not prove a hand-off. Confirm both the result produced and how the receiver consumes it.

## Page granularity

Use one page when stages share one trigger, owner and terminal outcome. Split when a branch has its own trigger/outcome, ownership or lifecycle and readers need to follow it independently. Keep a short parent process that routes to sub-processes rather than copying their steps.

Generate the process index last. Its rows include process ID, outcome, owner, trigger and terminal state.

## Lifecycle expectations

- `discovery`: show candidate stages, alternatives and unresolved ownership as proposals/questions.
- `implementation-ready`: every hand-off has an agreed owner, input/output and acceptance condition; blocking unknowns are explicit.
- `as-built`: every represented transition is supported by inspected implementation/configuration or observed behavior; exact inspection scope is recorded by review.

## Claim example

`PROC-01 Resolve a claim` begins when a claim is registered and ends when it is closed after payment or a final rejection. It crosses policyholder, claims, supervisor and finance responsibilities.

Its stages may link to:

- `SC-01 Submit a claim`;
- `SC-03 Assess a claim`;
- `SC-04 Approve payment`;
- the Claims list and Claim detail screens.

The process page states that an approved case is handed to finance with an amount and payment authorization. The `Approve payment` scenario owns the actor interaction; the Claim detail screen owns the button, permission and validation; technical documentation owns the event or API contract.
