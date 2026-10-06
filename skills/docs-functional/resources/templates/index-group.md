# Template: group and sub-group `index.md`

Functional group indexes are folder markers. The common overview group comes
first; enabled scenario, process and UI groups follow in the configured
`functional_views` order. Existing portals retain their established paths until
an approved structural migration changes them.

The scenario examples below preserve the mature scenario catalogue. When
scenarios are sub-grouped, each podskupina inside the scenario group gets the
same marker one level deeper. `scenario-grouping.md` decides whether and how to
sub-group.

Group and sub-group indexes have no body, menu or H1. Their job is to give the
folder a reader-facing label and, when applicable, a Confluence parent. Numeric
folder prefixes—not frontmatter—control menu order.

## Example — common overview group

```markdown
---
title: Základní přehled
status: draft
updated_at: <currentDate>
---

<!--
confluence:
  space: <space>
  title: Základní přehled
  parent: Funkční specifikace
-->
```

## Example — scenario group

The exact numeric prefix depends on view order. In a scenario-only portal the
established path is normally `002-scenarios/index.md`.

```markdown
---
title: Scénáře
status: draft
updated_at: <currentDate>
---

<!--
confluence:
  space: <space>
  title: Scénáře
  parent: Funkční specifikace
-->
```

## Example — scenario podskupina

Only after the reader-visible split is previewed and approved. The example path
is `002-scenarios/001-klient/index.md`; use the actual scenario-group prefix.

```markdown
---
title: Klient
status: draft
updated_at: <currentDate>
---

<!--
confluence:
  space: <space>
  title: Klient
  parent: Scénáře
-->
```

## Notes

- Nothing follows the frontmatter and optional Confluence comment. Content
  lives on pages inside the folder.
- Do not add an H1, menu, introductory paragraph, generation stamp or `order`
  field to a folder marker.
- The title contains only the reader-facing label, without the numeric prefix.
  Prefixes live only in folder/file names and are the navigation order.
- Scenario podskupina count and labels come from `scenario-grouping.md` Options
  A/B/C. Both the split itself and its axis require explicit approval because
  they change the visible tree.
- A podskupina slug is kebab-case ASCII without a repeated `scenarios-` prefix;
  for example `001-klient/` inside the scenario group. Its `module:` value is
  `klient`.
- Adding a group between existing groups, changing view order, or renaming a
  podskupina is a structural migration. Use `docs-workflow` to preview folder,
  link and contract impact; migrate and validate content before updating README.
- Removing a view or group archives/relocates content and never silently
  deletes it.
