# Guided contract setup

Ask no more than five questions, and only those not already answered by the
repository or request. Never ask for skill names.

1. **Active version** — discover existing `docs/vN` folders and ask only if the
   intended version is ambiguous.
2. **Lifecycle** — decision/discovery, agreed build target, or implemented
   reality. Map to `discovery`, `implementation-ready`, or `as-built`.
3. **Deliverable** — explanatory documentation or a commercial offer.
4. **Sections** — business, functional, ANA technical, tests, change requests.
5. **Functional navigation** — if functional is enabled, let the user order
   scenario, process, and UI in reader priority.

Generate a preview containing:

- the complete contract YAML, including `functional_views` only when
  `functional` is enabled;
- one plain-language summary;
- resolved capabilities;
- expected high-level topology;
- any existing-tree mismatch.

After confirmation:

1. Capture an existing README before repair, if present.
2. Ensure the selected `docs/vN` exists and has a valid index; this is part of
   the approved setup, not a derived README menu.
3. Render the complete README from the
   [v2 README template](../templates/docs-README.md) with `status: published`
   and the current edit date into a uniquely named non-`.md` staging file beside
   the final README. Never overwrite an unrelated staging file.
4. Validate that staged contract against the target tree. Approved setup may
   continue with declared-section/view warnings while content is still being
   created, but the active version folder and contract syntax must be valid.
5. Replace `docs/README.md` only with the fully rendered staged file, then
   validate the final path. If replacement or final validation fails, restore
   the captured README (or leave it absent for a new portal) and report the
   exact mismatch.
6. Check for `CLAUDE.md` at the portal root, beside `docs/`. It carries the
   portal-wide invariants the v2 skills assume but never restate. If it is
   absent, report that the portal is running without them and ask the user to
   copy `.claude/skills/docs-base/references/CLAUDE.md` (or
   `~/.claude/skills/docs-base/references/CLAUDE.md` after a user-level
   install) — it arrives with the `docs-base` skill — to the portal root. Do
   not write or template it here: one canonical copy lives in the library, and
   a second would drift from it. A portal scaffolded by a `tf-doc-vault`
   release that installs the library skills already carries these rules
   (possibly in `AGENTS.md`, with `CLAUDE.md` pointing at it), so absence
   there means the scaffold fell back to its bundled skills. Never treat a
   missing `CLAUDE.md` as a setup failure — report it and continue.

Do not persist source paths, operations, skill IDs, weights, dates of review,
or exact menus. Do not leave a staging file behind after success or rollback.
