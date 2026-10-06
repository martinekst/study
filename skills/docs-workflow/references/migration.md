# Controlled contract migration

Use the migration operation when any persistent contract value changes.

1. Validate the current contract and inspect the actual active tree.
2. Build the proposed contract in memory.
3. Present an impact table: create, move, archive, relink, content rewrite,
   changed review emphasis, and unresolved conflicts.
4. Obtain explicit approval. For a lifecycle promotion, show the latest full
   review’s final/raw score and open cap IDs. If the user proceeds below the
   recommended band or with a cap, append the dated decision and rationale to
   that review lineage; the advisory score itself does not block migration.
5. For a new active version, prepare the outgoing contract/review snapshot in
   memory using [the outgoing-version snapshot](version-snapshot.md). Capture
   the original outgoing index and README so both can be restored; do not write
   the snapshot yet.
6. Apply content/tree changes without editing README or the outgoing snapshot.
7. Validate pages, links, the prepared snapshot, and the proposed contract
   against the migrated tree.
8. Finalize activation: write the outgoing snapshot, then write the complete
   README last. Regenerate its orientation sentence, capability table,
   functional ownership note, and high-level topology from the new contract;
   preserve valid review links and refresh `updated_at`. Validate both files
   immediately. If either write or final validation fails, restore the captured
   outgoing index and README before reporting the failure.
9. Run a targeted structural review.

On failure before finalization, leave README and the outgoing index unchanged.
Section/view removal archives or relocates content; it never deletes it
silently.
