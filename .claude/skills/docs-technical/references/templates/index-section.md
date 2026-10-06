# Template: technical section index

Use for `docs/<active_version>/technical/index.md`. The title is number-free;
the section's placement comes from the real documentation tree. Build the
routing table from targets that exist.

```markdown
---
title: Technická dokumentace
status: draft
updated_at: <YYYY-MM-DD HH:MM>
---

<!--
confluence:
  space: <space>
  title: Technická dokumentace
  parent: Dokumentace <active_version>
-->

V této sekci najdete technickou podobu systému: jeho hranice, aplikace,
rozhraní, infrastrukturu, provozní chování a implementační ověření.

## 🧭 Jak sekci číst {#jak-cist}

| Potřeba čtenáře            | Začít zde                                         | Pokračovat zde                              |
| -------------------------- | ------------------------------------------------- | ------------------------------------------- |
| Chci pochopit celek        | [Highlevel architektura](001-highlevel/)          | [Technický přehled](002-technicky-prehled/) |
| Nastupuji do týmu          | [Návody](003-navody/)                             | [<existující skupina aplikací>](<path>/)    |
| Řeším provoz nebo incident | [Monitoring a alerting](008-monitoring-alerting/) | [Infrastruktura](007-infrastruktura/)       |

## Hranice technické pravdy

<Co je na základě lifecycle popsáno jako současný stav, dohodnutý cíl,
varianta nebo otevřená otázka. Odkázat na change-requests/tests jen pokud
jejich sekce a konkrétní cíl existují.>
```

Omit or replace any routing row whose target is absent. Do not add a manual H1,
a copied full menu, an order frontmatter field, or a portal-wide verification
claim unsupported by a scoped review.
