# Established ANA test-design menu

Preserve an existing coherent test tree. For a new section, use the established
ANA groups below and create only content justified by the declared scope.
Folder/file prefixes are the exact navigation order; titles are number-free and
frontmatter has no order field.

```text
tests/
|-- index.md
|-- 001-strategie/
|   `-- index.md
|-- 002-business-uat/
|   |-- index.md
|   `-- <NNN>-<business-area>.md
|-- 003-qa-testovaci-scenare/
|   |-- index.md
|   `-- <source-id>-<slug>-tests.md
`-- 004-mocky/
    |-- index.md
    |-- 001-wiremock-api.md
    |-- 002-db-fixtures.md
    `-- 003-vazby-testu-a-mocku.md
```

## Ownership

- `001-strategie/` owns risk, selected levels, environments, data strategy,
  automation approach, gates, status meanings, and the source-to-coverage map.
- `002-business-uat/` owns customer-readable acceptance by business area or
  end-to-end outcome. It does not repeat technical setup or raw API detail.
- `003-qa-testovaci-scenare/` owns structured technical cases traced to stable
  scenario, process, UI, requirement, change, or interface IDs.
- `004-mocky/` owns reusable external/API substitutes, database/input fixtures,
  and the case-to-substitute matrix. Create the group only when reusable
  substitutes are part of the test design.
- `tests/index.md` owns reader routing, aggregate coverage, release evidence,
  and unresolved blockers. It is not a second copy of every case.

Some existing portals contain `002-scenare/` as a separate mapping layer.
Preserve and update it when present; do not silently move or renumber it. For a
new tree, keep source mapping on the QA case and in the strategy traceability
table so a second group does not duplicate `003-qa-testovaci-scenare/`.

## Business UAT grouping

Group UAT pages by a stable reader-facing business area or process, not by the
technical application that implements it. Each acceptance item links to the
canonical source behavior and corresponding QA evidence when available.

## QA filenames and IDs

Prefer one QA page per bounded canonical source, for example
`sc-03-sprava-profilu-tests.md`. Preserve the source ID in the filename and all
case IDs. A case ID remains stable when its wording or implementation changes;
retire rather than recycle it.

## Structural changes

Adding, removing, moving, or renumbering a group is a controlled migration.
Preview affected paths and reciprocal links, migrate content, validate, and
update the README contract last only if a behavioral contract field actually
changes. Ordinary case additions inside an existing group are content updates.
