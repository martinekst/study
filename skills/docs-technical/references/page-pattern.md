# Technical page pattern

Use this fallback for a technical page without a dedicated architecture, API,
application, ADR, or index template. Keep only sections that materially help
the reader; do not leave empty headings.

```markdown
---
title: <Czech reader-facing title without structural number>
status: draft
updated_at: <YYYY-MM-DD HH:MM>
---

<!--
confluence:
  space: <space>
  title: <same title>
  parent: <actual group title>
-->

<!-- generated: <date> | source: <inspected evidence reference> -->

## Přehled

<Purpose, boundary, and the conclusion a reader needs first.>

## Kontext a odpovědnosti

<What owns what; link to canonical functional or business context.>

## Současný nebo cílový návrh

<Label implemented current state, agreed target, proposal, and unknowns.>

## Rozhraní, data a chybové chování

<Only applicable evidenced detail, with concrete identifiers and examples.>

## Bezpečnostní a provozní dopady

<Applicable controls, observability, capacity, recovery, or explicit gaps.>

## Otevřené body

- ⚠️ TODO: <missing evidence or decision, its consequence, and next action>

## Odkazy a zdroje

- [<existing related page>](relative-path)
- Zdroj: `<file-or-spec-reference>`
```

## Adaptation rules

- Start with the result and system boundary. Do not use the page as a raw file
  inventory.
- Use real versions, environment names, endpoints, queue/topic names, metrics,
  limits, retry counts, and owners only when evidenced. An unsupported value is
  an open point, not a plausible default.
- In discovery, compare supported alternatives. In implementation-ready,
  identify the agreed target and blockers. In as-built, separate inspected
  current behavior from planned change.
- Include `## Související rozhodnutí` only when relevant ADRs exist. Link each
  decision rather than embedding its rationale again.
- Add a diagram anchor only for a diagram that clarifies boundaries, sequence,
  topology, state, or data relationships. Do not leave speculative anchors.
- Omit `## Otevřené body` when no actionable gap remains.
- Keep frontmatter compatible with the portal, but never add an order field.
  Prefixes in folder and file names determine the menu.
