# Build and test a prototype

Load this reference for implementation and verification after scope and
interaction mapping are stable.

## Build discipline

- Inspect and extend an existing prototype structure before scaffolding another.
- Match the project's target framework/component/theme system when the artifact
  is intended for implementation handoff. Record deliberate deviations.
- Reuse design tokens, patterns, and repeated compositions rather than restating
  values per screen.
- Keep fixtures and simulation adapters separate from view components. No live
  network request, credential, analytics, or production mutation belongs in a
  prototype unless the user explicitly authorizes a safe test environment.
- Mark prototype-only screen pickers, role switches, data toggles, and failure
  controls visibly and keep them out of the canonical journey.
- Unsupported routes/states remain explicit. Do not hide a broken link by routing
  every unknown action to the happy path.

## Verification matrix

For each selected journey, verify:

1. build/start succeeds using documented steps;
2. entry screen renders at target viewport with no console/runtime error;
3. keyboard can reach and operate every critical action in logical order;
4. each mapped action produces the specified state change or route;
5. primary success outcome completes from a clean fixture state;
6. selected validation, permission, integration, or business failure produces
   the specified feedback and recovery;
7. refresh/deep link behavior matches the selected delivery shape;
8. smallest and largest required viewport preserve content and action access;
9. accessible names, error associations, focus movement/restoration, live
   feedback, and reduced-motion behavior work at the agreed fidelity;
10. no real data, credential, unintended external request, or unsupported claim
    appears in source or rendered UI.

Use the repository's existing test framework where available. Prefer role/name
selectors for user behavior and stable test IDs only where semantics are
insufficient. Make fixtures deterministic; do not use arbitrary waits when an
observable state can be awaited.

## Results

Record pass, fail, or not tested—not optimistic blanks—for build, happy path,
each selected negative path, keyboard, responsive, accessibility, and console.
Include the exact artifact/revision and viewport. Fix in-scope failures, re-run
affected checks, and keep accepted limitations in the handoff.
