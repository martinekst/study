---
name: docs-prototype
description: Define or build a scoped clickable prototype from stable functional flows, UI documentation, wireframes, and design decisions without treating the prototype as source-of-truth behavior.
metadata:
  author: "Dávid Šilon"
---

# Documentation prototype

Load `docs-base` first. Prototype only the user journeys needed to answer a
decision, validate an interaction, or demonstrate an offer. Read
[references/scope.md](references/scope.md) before starting.

1. State the decision or learning goal, audience, target device, selected
   journeys/states, fidelity, and expected lifetime. Choose the smallest useful
   delivery shape from [references/scope.md](references/scope.md); do not force a
   build choice before inspecting the actual need and repository.
2. Link every selected journey to its functional owner. UI pages own screen
   behavior, fields, validation, and permissions; design owns visual rules.
3. Extract transitions, state changes, failure/recovery behavior, and mock
   boundaries with [references/interaction-mapping.md](references/interaction-mapping.md).
   Write an interaction spec only for screens that will be built.
4. Reuse the project's existing stack and component/theme system when the
   prototype is intended to inform implementation. For a disposable concept,
   select the lightest compatible delivery without claiming stack equivalence.
5. Build and verify with [references/build-test.md](references/build-test.md).
   Mock data, prototype-only navigation, and simulated integrations must be
   visibly identifiable; no credentials or real customer data enter fixtures.
6. Document covered and omitted paths, interactions, assumptions, artifact
   location, run/build steps, tests, and divergences using
   [references/handoff.md](references/handoff.md).
7. Apply [references/review-criteria.md](references/review-criteria.md) before
   presenting the result.

Load [references/templates/flow-spec.md](references/templates/flow-spec.md) only
when the prototype spans multiple screens or states. Load
[references/templates/interaction-spec.md](references/templates/interaction-spec.md)
only for an interactive screen being implemented.

A prototype never changes the README contract, silently edits canonical design
or functional documentation, or proves production implementation. Unsupported
branches remain explicit rather than being simulated as complete.
