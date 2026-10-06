# Prototype handoff

Write for a reader opening the artifact cold. Record:

1. the decision/learning goal, audience, fidelity, target viewport, and whether
   the prototype is disposable or expected to evolve;
2. entry URL or artifact location plus exact prerequisites and build/run steps;
3. covered routes/screens/states and links to their canonical functional and
   design owners;
4. interaction-map and per-screen-spec locations;
5. stack and verified versions, component/theme sources, and any added
   dependencies;
6. fixture locations and a table mapping each mock/simulation to the real
   boundary it replaces;
7. prototype-only navigation or debugging controls and how evaluators recognize
   them;
8. known divergences from wireframes/design/functional pages, with reason,
   consequence, and intended implementation choice;
9. automated and manual test results, including viewport, keyboard, console,
   happy path, and selected failure/recovery paths;
10. omitted paths/states, known limitations, feedback method, and next steps.

Use concrete relative links and commands already verified in the repository.
Never include secrets, real credentials, or personal/customer fixtures. A missing
negative path is reported as not covered, not as a passing test.

Check each clickable action against documented behavior. A prototype mismatch
becomes an explicit finding, not a silent documentation change. A test failure on
the selected journey blocks a successful handoff unless the user explicitly
accepts it as a documented limitation.
