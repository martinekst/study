# Change state and evidence

The change section describes implementation state; it is not a replacement for
a ticket system. Use the existing portal's visible presentation and these
semantics:

| State         | Meaning                                                                                   | Minimum evidence                                                                   |
| ------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `proposed`    | target/change is described but implementation has not started or is unknown               | approved/proposed source and explicit uncertainty                                  |
| `in progress` | some required slices have implementation evidence, but group acceptance is incomplete     | evidence for completed slices plus named remaining acceptance                      |
| `implemented` | the end-to-end outcome and required rollout/migration are present for the inspected scope | implementation/configuration reference and acceptance/test or operational evidence |

Do not derive state from lifecycle stage, page metadata status, elapsed time, a
merged branch alone, or a person's optimistic statement. `as-built` strengthens
the evidence expectation; it does not make every group implemented.

State belongs on the group. A task may show its own progress when this helps the
reader, but task states never override the group acceptance result. When evidence
is contradictory, retain the last supported state and add an open finding.

Every transition records what was inspected and the relevant revision, test,
deployment, or approval reference. A partial check may update one group or task;
it must not imply the whole portal was verified.
