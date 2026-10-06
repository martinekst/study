# Report parsing and integrity

Use the report's `report_type` to select exactly one authoritative contract:

- `review` -> `../../docs-review/resources/report-contract.md`;
- `delta` -> `../../docs-delta/references/report-contract.md`.

Reject an absent/unknown type, unsupported model, missing `consumed_by`, duplicate
ID, missing end marker, invalid status/severity, impossible counts, or a report
whose stored contract does not match the active portal without an explicit
historical/migration explanation.

## Parse finding blocks

Review findings use `F-NNN`; delta findings use `D-NNN`. Match a heading and its
exact `<!-- <ID>:end -->` marker, then parse fields only inside that block. Do not
infer fields from prose elsewhere or stop at the next heading without confirming
the marker.

Allowed statuses are `open`, `fixed`, `accepted-risk`, and `rejected-invalid`.
Allowed severities are `blocker`, `major`, and `minor`. Preserve unknown extra
fields but do not let them replace required contract fields.

Recompute body counts before any change and compare them with frontmatter. The
body is authoritative, but a mismatch is a malformed-report error that must be
repaired visibly before processing; do not silently normalize it.

## Select scope

Default to all open findings. A user filter may narrow by severity, dimension,
target skill, path, or explicit IDs. Keep original report order unless the user
asks to reprioritize. Never guess between equally recent reports or combine two
reports into one work queue without explicit instruction.

After every transition, preserve the entire block and stable ID, append the
resolution/rationale required by its contract, recount all statuses, and verify
every end marker again.
