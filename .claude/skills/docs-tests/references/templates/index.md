# Template: test section index

Use for `docs/<active_version>/tests/index.md`. Populate routing and coverage
from files that exist; never ship placeholder links.

```markdown
---
title: Testy
status: draft
updated_at: <YYYY-MM-DD HH:MM>
---

V této sekci najdete testovací strategii, Business UAT, technické QA případy,
potřebné mocky/fixtures a důkazy pro rozhodnutí o vydání.

## 🧭 Jak sekci číst {#jak-cist}

| Potřeba čtenáře                 | Začít zde                               | Pokračovat zde                  |
| ------------------------------- | --------------------------------------- | ------------------------------- |
| Chci vědět, co a proč testujeme | [Strategie](001-strategie/)             | [Pokrytí](#pokryti)             |
| Přebírám business výsledek      | [Business UAT](002-business-uat/)       | [Důkazy vydání](#dukazy-vydani) |
| Připravuji nebo provádím QA     | [QA scénáře](003-qa-testovaci-scenare/) | [Mocky](004-mocky/)             |

## Pokrytí {#pokryti}

| Zdroj / oblast | Riziko | Plánované    | Implementované | Provedené    | Výsledek / mezera |
| -------------- | ------ | ------------ | -------------- | ------------ | ----------------- |
| <source link>  | <risk> | <count/link> | <count/link>   | <count/link> | <state or gap>    |

## Důkazy vydání {#dukazy-vydani}

| Rozhodnutí / gate | Rozsah a verze | Důkaz                  | Stav    | Vlastník |
| ----------------- | -------------- | ---------------------- | ------- | -------- |
| <gate>            | <scope>        | <timestamped artifact> | <state> | <owner>  |

## Otevřené body

- ⚠️ TODO: <gap, release consequence, owner, next action>
```

Omit a routing row for an absent optional group. Counts must use a defined
denominator and may not treat planned or implemented cases as executed. Do not
add an order frontmatter field or a copied full menu.
