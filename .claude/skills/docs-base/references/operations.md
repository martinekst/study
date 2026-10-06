# Operations and structural migrations

Operations are temporary run context. They never become README values.

- `create`: create declared content that does not exist.
- `update`: change content within the current contract.
- `backfill`: find and fill missing declared coverage without changing intent.
- `extend-from-spec`: add an agreed change from specification evidence.
- `extend-from-code`: add implemented behavior found in code/configuration.
- `migrate-contract`: change version, stage, deliverable, sections, or views.
- `review`: inspect and report; do not silently repair.
- `apply-report`: apply explicitly selected findings and rescore them.

## Structural migration sequence

1. Compare the current contract, requested contract, and actual tree.
2. Show added, moved, archived, and relinked content plus review impact.
3. Obtain explicit approval.
4. When activating a version, prepare the outgoing contract/final-review
   snapshot in memory and capture the original outgoing index and README for
   rollback.
5. Create, move, or archive content and repair links while README and the
   outgoing index still describe the old valid state.
6. Validate the proposed tree, content, and prepared snapshot.
7. Finalize by writing the outgoing snapshot and then updating the complete
   generated README last, including its contract-derived body. If either write
   or final validation fails, restore both captured originals.
8. Run targeted review.

Before finalization, a failure leaves the contract and outgoing index unchanged.
Never delete content merely because its section or view is being removed.
