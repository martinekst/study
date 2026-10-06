# Review perspectives

Use every perspective for a normal review. Omit one only when the user explicitly narrows the audience, and record that omission in the report. Omission does not alter scoring weights.

## CEO

Check whether the reader can quickly understand the problem, intended outcome, value, major choices, risks, and requested decision. For an offer, also check commercial completeness, credible differentiation, and unsupported claims.

## PM

Check scope boundaries, dependencies, ownership of decisions, hand-offs, delivery risks, open questions, acceptance conditions, and consistency between overview and detail.

## Developer

Check technical and behavioral correctness against the inspected evidence, traceability, implementability, state transitions, interfaces, constraints, and current-versus-proposed separation. Do not require implementation detail outside the declared sections or lifecycle stage.

## QA

Check whether behavior is verifiable: prerequisites, observable results, alternatives, negative paths, permissions, validation, acceptance criteria, and scenario-to-test traceability where tests are enabled.

## Deduplication

If several perspectives identify the same underlying problem, create one finding at the highest justified severity and list all contributing perspectives. Keep separate findings when their repairs or canonical owners differ.
