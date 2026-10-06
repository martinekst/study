# Template: application index

Use at the root of a backend, frontend, or mobile application folder. Replace
the sample list with links to files that actually exist.

```markdown
---
title: "[<S1|FE1|MA1>] <Application name>"
status: draft
updated_at: <YYYY-MM-DD HH:MM>
---

<!--
confluence:
  space: <space>
  title: "[<code>] <Application name>"
  parent: <Backends | Frontends | Mobilní aplikace>
-->

## Účel a hranice

<Jedna až dvě věty: odpovědnost, hlavní konzumenti a co aplikace nevlastní.>

## Stack a běhová jednotka

| Vrstva    | Volba   | Verze / varianta | Zdroj        |
| --------- | ------- | ---------------- | ------------ |
| Runtime   | <value> | <value>          | `<evidence>` |
| Framework | <value> | <value>          | `<evidence>` |
| Nasazení  | <value> | <value>          | `<evidence>` |

## Stránky

- [[<code>] Architektura](./001-architektura.md)
- [<other existing detail page>](./<existing-file>.md)

## Související dokumentace

- [Highlevel architektura](../../001-highlevel/001-highlevel-architektura.md)
- [<actual sibling/system owner>](existing-relative-path)
```

Keep the stable code in every application page title, but never put the
structural number in the title. Omit unknown stack rows and absent child pages;
do not ship placeholder links.
