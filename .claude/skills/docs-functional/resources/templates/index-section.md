# Template: `functional/index.md`

Section index for `docs/<vN>/functional/`. Use a reader-facing title without a
numeric prefix and no body H1; the page title comes from frontmatter. Build the
routing table from the files and enabled views that actually exist.

```markdown
---
title: Funkční specifikace
status: draft
updated_at: <currentDate>
---

<!--
confluence:
  space: <space>
  title: Funkční specifikace
  parent: Dokumentace <vN>
-->

V této sekci najdete funkční chování systému popsané z pohledu
uživatele. Společný přehled vysvětluje kontext; další skupiny ukazují
zapnuté funkční pohledy v pořadí z nastavení dokumentace.

## 🧭 Jak sekci číst {#jak-cist}

| Potřeba čtenáře                       | Začít zde                                                       | Pokračovat zde                                                      |
| ------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Chci rychlý přehled**               | [Shrnutí](001-zakladni-prehled/001-overview.md)                 | [Struktura produktu](001-zakladni-prehled/002-product-structure.md) |
| **Chci projít hlavní funkční pohled** | [<název primárního pohledu>](<existing-primary-view-path>/)     | [<nejdůležitější existující položka>](existing-target)              |
| **Zajímá mě moje role**               | [Aktéři a persóny](001-zakladni-prehled/004-actors-personas.md) | [<existující scénář, proces nebo obrazovka>](existing-target)       |

## Funkční pohledy

<Jedna krátká odrážka pro každý zapnutý pohled v pořadí
`functional_views`. Popište, jakou otázku pohled zodpovídá, a odkažte
na jeho existující skupinový index. Společný obsah zde nekopírujte.>
```

## Notes

- Follow the common ownership and view-order rules in
  [`cross-view/ownership-menu-linking.md`](../cross-view/ownership-menu-linking.md).
- Keep the top-down shape: one-sentence orientation, “Jak sekci číst”, then a
  concise list of enabled views. Do not turn this page into a second menu.
- Every table link must resolve to a real file. Omit a row or use a plain-text
  TODO when its target does not exist; never ship placeholder/broken links.
- The filesystem and numeric folder/file prefixes are the exact navigation
  source. Do not add an `order` frontmatter field.
- In a multi-view portal, the common overview comes first and view groups follow
  in configured order. The first view is the primary reader path, not the sole
  owner of shared information.
- Add a business-section link only when `business` is enabled and its target
  exists.
- When the index already exists, update it in place and preserve supported
  customer wording. Adding, removing or reordering a group is a structural
  migration through `docs-workflow`; update the README contract last.
