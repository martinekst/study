---
name: docs-workflow
description: Set up, create, update, backfill, extend, migrate, review, or repair an analytical documentation portal through natural-language requests and the docs/README.md contract.
metadata:
  author: "Dávid Šilon"
---

# Documentation workflow

Use this skill when the user asks for a portal-level documentation outcome or a
change that may involve several documentation skills. Users describe what they
need; never ask them to select skill names.

## Start every run

1. Inspect the portal and the user's requested outcome. If the repository is a
   pure tf-doc-vault `tech-docs` scaffold (documentation rooted at
   `tech-docs/docs` and service scripts target that root), do not install or
   initialize ANA v2; route the request to the separate technical-documentation
   skills.
2. Load `docs-base` and validate `docs/README.md` for an ANA portal.
3. If the contract is missing or invalid, follow
   [references/setup.md](references/setup.md). Collect all answers before
   writing a complete contract.
4. Resolve temporary run inputs: operation, requested scope, source references,
   and whether the user requested text, visuals, review, or fixes.
5. Show a short resolved summary before creating content.

## Route work

Read [references/routing.md](references/routing.md) for the phase order and
section-to-skill mapping. The contract chooses persistent capabilities; the
request chooses the current operation and scope.

- Create and update only declared sections/views.
- Backfill and extension are temporary operations and normally leave the
  contract unchanged.
- A direct request for review or report application routes to the owning skill
  without regenerating documentation.
- Visual skills run only for actual visual needs, after their source text is
  stable.

## Structural changes

For a new active version, lifecycle change, deliverable change, section change,
or functional-view change, read
[references/migration.md](references/migration.md). Preview impact and obtain
approval; update README only after content and links validate.

## Finish

Report created/changed files, unresolved evidence gaps, validation results, and
the review report or next recommended review scope. Do not silently broaden the
requested scope.
