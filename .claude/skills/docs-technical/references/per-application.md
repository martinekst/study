# Per-application documentation

Use this guide for folders under `004-backends/`, `005-frontends/`, and
`006-mobilni-aplikace/`.

## Stable identity and folder shape

```text
<group>/<NNN>-<code>-<ascii-slug>/
|-- index.md
|-- 001-architektura.md
`-- <evidenced detail pages>
```

- Preserve the existing code (`S1`, `FE1`, `MA1`) across renames and versions.
- Assign a new code only after checking every existing and retired code in the
  active portal. Do not fill a gap by recycling an identifier.
- Keep the code in the application index and page titles, for example
  `"[FE2] Klientský portál"`; keep structural numbers out of titles.
- The folder prefix and detail-page prefixes define navigation. Do not add an
  order field to frontmatter.

## Application index

Use [`templates/index-application.md`](templates/index-application.md). It gives
the reader the purpose, main consumers, runtime/framework, and links to actual
detail pages. Generate the page list after omissions are known so it has no dead
links.

## Detail selection

Always consider architecture. Add other catalogue pages from
[`structure.md`](structure.md) only when they have useful evidence or an agreed
implementation-ready decision.

Common split criteria:

- local setup deserves a page when prerequisites and verification are
  application-specific;
- migrations/seed data require an owned persistent schema;
- scheduled jobs require a schedule, ownership, concurrency/retry semantics,
  and observability;
- data protection requires actual sensitive/persistent data or an agreed
  control, not a generic policy statement;
- performance/cache/scaling requires a mechanism, measured constraint, or
  agreed target;
- feature toggles require real flags with defaults, environment behavior,
  rollout owner, and retirement intent;
- localization/accessibility/OS differences exist only when supported by the
  application or agreed target.

An existing portal may consolidate related subjects, such as contracts/data or
tests/security/operations. Preserve the consolidation if the page remains
scannable and has one clear owner. Do not split it merely to match the catalogue.

## Content expectations

For each page:

1. identify the application boundary and intended reader;
2. cite concrete source/spec/decision evidence;
3. record exact identifiers and values that matter operationally;
4. distinguish current, agreed target, proposal, and unknown;
5. link system-wide facts to their canonical group page;
6. link application-specific test implementation to `011-testy/` and link
   scenario/requirement-derived test design to the separate `tests/` section.

Cross-application conventions belong in the relevant system page or a final
`999-sdilene-postupy.md`, not duplicated across every application.

## Local and operational procedures

When documenting a procedure, include prerequisites, safe environment scope,
the verified invocation, expected output/health observation, likely failure,
and rollback or recovery. Never include live credentials. If the procedure was
not executed, label it as documented-but-unverified rather than presenting it
as proven.
