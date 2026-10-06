# Applying structural findings

A structural finding includes any contract value change, version activation,
section/view addition or removal, or content move/split/merge/renumber that changes
paths or canonical ownership.

Before applying it:

1. inventory the current contract, filesystem, inbound/outbound links, generated
   artifacts, and affected report scope;
2. show old -> proposed paths, ownership changes, redirects/archives when used,
   and validation/review impact;
3. obtain explicit approval for that structural finding;
4. route contract changes and cross-owner migrations to `docs-workflow`;
5. preserve content and history; removal archives or relocates rather than
   silently deleting;
6. repair every reference and validate the proposed tree;
7. update README last only when its five-field contract actually changes;
8. recheck the finding and affected review dimensions before setting `fixed`.

If migration fails before README is updated, keep the old contract and report the
partial filesystem state that needs recovery. If validation fails afterward,
leave the finding open and do not claim the structure is complete.

For a split or merge, name the new canonical owner for every moved fact and
replace duplicate prose with links. Path ordering follows the actual filesystem,
not page-order metadata.
