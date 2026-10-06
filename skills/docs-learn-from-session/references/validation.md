# Maintainer validation

For every approved learning change:

- validate frontmatter, name, one-line description, and skill structure with the
  original skill-creator validator;
- resolve every added/changed relative link and confirm the target is actually
  read from the relevant `SKILL.md` path;
- search affected files for obsolete command routing, persistent source modes,
  profile language, numbered universal-rule references, or menu-order metadata;
- check the rule is stated once and callers link to the owner;
- update deterministic tests for contract, scoring, parsing, or calculation
  behavior when applicable;
- inspect bundle dependencies when one skill reads another skill's resource;
- forward-test a realistic success case and a boundary/failure case when the
  behavioral change is non-trivial;
- verify existing user changes and unrelated skill behavior remain intact.

Validation failure leaves the feedback item unprocessed. Report the failure and
the safe rollback/recovery action; never mark an edit successful because the
intended text was written.
