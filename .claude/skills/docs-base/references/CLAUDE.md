# Documentation portal rules — v2

These rules apply to every analytical documentation portal using the v2 skills.
They intentionally contain only project-wide invariants. Exact structures,
templates, scoring, and examples belong to the relevant skill.

## 1. Resolve the documentation contract

- Before creating, changing, or reviewing portal documentation, load
  `docs/README.md` through `docs-base`.
- The `documentation` object in that file is the persistent contract for the
  active version. Run inputs such as source paths and requested scope are not
  persisted there.
- If the contract is missing, invalid, or inactive, use `docs-workflow` to
  repair it before changing content.
- The filesystem below `docs/<active_version>/` is the exact menu. README gives
  orientation; it never duplicates the complete page tree.

## 2. Write top-down

Every section and page starts with the decision, outcome, or reader value, then
adds context and detail. Index pages explain what the reader will find and why
it matters; they are not file inventories.

## 3. Reflect evidence

- Do not invent behavior, fields, integrations, states, benefits, estimates, or
  implementation detail.
- Separate current behavior, agreed target behavior, proposals, and unknowns.
- Mark material gaps explicitly and identify the evidence needed to resolve
  them.
- `as-built` makes code and configuration authoritative for the reviewed scope;
  it does not claim that every page was recently verified.

## 4. Keep one owner for each fact

Shared definitions have one canonical page. Scenario, process, UI, business,
technical, test, and change-request pages link to one another instead of
copying the same rules. When sources disagree, surface the contradiction rather
than silently choosing one.

## 5. Change safely

- Preserve unrelated and user-authored changes.
- Preview structural impact and obtain explicit approval before changing the
  active version, lifecycle stage, deliverable type, sections, or functional
  views.
- Migrate files and links first; update `docs/README.md` last.
- Removing a section or view means archive or deliberate relocation, never
  silent deletion.

## 6. Respect tooling boundaries

`tf-doc-vault` owns page metadata, navigation generation, validation, print,
and build mechanics. Skills own documentation meaning and templates. Review
reports own verification date, evidence scope, findings, and score.
