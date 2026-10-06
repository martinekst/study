# Template: technical group index

Most technical group indexes are navigation markers. Their numeric folder
prefix owns order; the title contains only the Czech reader-facing label.

```markdown
---
title: <Group title>
status: draft
updated_at: <YYYY-MM-DD HH:MM>
---

<!--
confluence:
  space: <space>
  title: <Group title>
  parent: Technická dokumentace
-->
```

Keep a marker index body-free unless readers need orientation not supplied by
its child pages. Application indexes and `011-testy/index.md` intentionally
carry content and use their dedicated templates. Do not hand-author a menu that
duplicates the filesystem.
