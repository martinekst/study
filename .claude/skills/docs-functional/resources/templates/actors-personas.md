# Template: actors-personas (2.1.4)

Dedicated template for `docs/<vN>/functional/001-zakladni-prehled/004-actors-personas.md`.

This page now carries the **detailed role × permissions matrix** —
previously the matrix lived in the technical section
(`3.7.1 Matice rolí a oprávnění`), but the new technical structure
no longer has a roles-matrix page. The functional section is now
the single source of truth for "who is allowed to do what".

The technical per-service A&A pages
(`004-backends/<svc>/005-aa.md`) document HOW the matrix is
enforced for that service (which endpoint requires which scope /
role); this page defines WHAT each role is allowed to do
conceptually.

The page has three top-level sections:

1. **Aktéři** — role list (table of role → purpose → cross-link to scenarios).
2. **Matice rolí a oprávnění** — detailed permissions matrix.
3. **Persóny** — user archetypes (optional, kept only when evidence exists).

---

```markdown
---
title: Aktéři a persóny
status: draft
updated_at: <currentDate>
---

<!--
confluence:
  space: <space>
  title: Aktéři a persóny
  parent: Základní přehled
-->

<!-- generated: <currentDate> | source: <source_version | spec_version> -->

# Aktéři a persóny

## Přehled

<1–2 odstavce: kdo se systémem interaguje (lidé i automatizované
aktéři), jakou roli každá skupina hraje, kde najít detailní
permissions.>

Zdroj: <spec section / interview anchor / `path/to/code/auth.ts:LL`>.

## Aktéři

| Role             | Identifikátor | Co dělá                                          | Hlavní scénáře                                                                                  |
| ---------------- | ------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Zákazník         | `customer`    | Konzumuje produkt / službu                       | [sc-01](../002-scenarios/sc-01-prihlaseni.md), [sc-04](../002-scenarios/sc-04-objednavka.md), … |
| Administrátor    | `admin`       | Spravuje back-office a uživatele                 | [sc-10](../002-scenarios/sc-10-sprava-uzivatelu.md), …                                          |
| Operátor podpory | `support`     | Pomáhá zákazníkům, vidí jejich data jen ke čtení | [sc-12](../002-scenarios/sc-12-podpora-uzivatele.md)                                            |
| Systém           | `system`      | Automatizované úlohy (CRONy, scheduled jobs)     | [sc-08](../002-scenarios/sc-08-automaticke-fakturovani.md)                                      |
| Externí partner  | `partner`     | Třetí strana volá API                            | [sc-15](../002-scenarios/sc-15-partnerska-integrace.md)                                         |

Identifikátor (`customer`, `admin`, …) je **stable** — používá se
napříč kódem (role / scope), funkční dokumentací, a technickou
dokumentací. Lokalizovaný název v UI může být jiný ("Zákazník"
vs. `customer`); identifikátor je technický termín a zůstává v
původní angličtině.

<!-- diagram-anchor: actors-overview -->

> Volitelný diagram aktérů — use-case přehled, kdo s čím
> interaguje. Anchor ponechat jen pokud diagram skutečně pomáhá.

## Matice rolí a oprávnění

> [!IMPORTANT]
> Tato matice je **funkční** truth source — definuje, **co**
> každá role smí. Technická vrstva (per-service A&A v
> `3.4.N.5 [Sx] A&A`) popisuje **jak** je to vynuceno
> (které endpointy / scope / guards).

### Konvence v matici

| Symbol | Význam                                                 |
| ------ | ------------------------------------------------------ |
| ✅     | Plné oprávnění — včetně mazání                         |
| ✏️     | Upravit — CREATE / UPDATE bez oprávnění mazat          |
| 👁     | Read-only — vidí, ale nemůže měnit                     |
| 🔒     | Vlastník — vidí / mění pouze vlastní záznamy           |
| 🛠     | Podmíněně — vyžaduje další ověření (např. 2FA, podpis) |
| ❌     | Žádný přístup                                          |

**Legenda** patří **bezprostředně pod tabulku** konvencí i pod matici
samotnou — NIKDY před tabulku a NIKDY oddělená dalším headlinem,
diagramem nebo odstavcem. Vysvětluje jen symboly, které matice
skutečně používá.

Když buňka vyžaduje vysvětlení, označí se postupným Unicode horním
indexem `¹`, `²`, `³`, `⁴`, `⁵`, … a vysvětlivka se stejným indexem
jde do sekce „Poznámky k matici" pod tabulkou. Poznámky se číslují
podle prvního výskytu v matici; opakovaná podmínka používá stejné
číslo a nevytváří novou poznámku.

NIKDY řetězce hvězdiček (`*`, `**`, `***`) — při více poznámkách
zhoršují čitelnost a kolidují s Markdown syntaxí. NIKDY HTML `<sup>`;
Unicode horní indexy zachovají čistý Markdown. Pravidlo platí pro
každou matici rolí a oprávnění, i když nejde o formální RACI tabulku.

### Matice — entity a operace

| Entita                 | Operace                       | `customer` | `admin` | `support` | `system` | `partner` |
| ---------------------- | ----------------------------- | ---------- | ------- | --------- | -------- | --------- |
| **Objednávka**         | Vytvořit                      | 🔒         | ✅      | ❌        | ✅       | ❌        |
|                        | Číst                          | 🔒         | ✅      | 👁        | ✅       | ❌        |
|                        | Upravit                       | 🔒 ¹       | ✅      | ❌        | ❌       | ❌        |
|                        | Stornovat                     | 🔒 ²       | ✅      | 🛠        | ❌       | ❌        |
|                        | Smazat                        | ❌         | ✅      | ❌        | ❌       | ❌        |
| **Faktura**            | Vytvořit                      | ❌         | ✅      | ❌        | ✅       | ❌        |
|                        | Číst                          | 🔒         | ✅      | 👁        | ✅       | ❌        |
|                        | Vystavit dobropis             | ❌         | ✅      | 🛠        | ❌       | ❌        |
| **Uživatelský profil** | Vytvořit                      | ✅         | ✅      | ❌        | ❌       | ❌        |
|                        | Číst — vlastní                | ✅         | ✅      | 👁        | ❌       | ❌        |
|                        | Číst — cizí                   | ❌         | ✅      | 👁        | ❌       | ❌        |
|                        | Smazat účet                   | 🔒         | ✅      | ❌        | ❌       | ❌        |
| **Platby**             | Vytvořit                      | 🔒         | ❌      | ❌        | ✅       | ❌        |
|                        | Refundovat                    | ❌         | ✅      | 🛠        | ❌       | ❌        |
|                        | Číst                          | 🔒         | ✅      | 👁        | ✅       | ❌        |
| **Reporty**            | Generovat                     | ❌         | ✅      | ✅        | ✅       | ❌        |
|                        | Exportovat                    | ❌         | ✅      | 👁        | ❌       | ❌        |
| **Notifikace**         | Přijímat                      | ✅         | ✅      | ✅        | ❌       | ❌        |
|                        | Nastavovat templates          | ❌         | ✅      | ❌        | ❌       | ❌        |
| **API klíče**          | Vytvořit / rotovat            | ❌         | ✅      | ❌        | ❌       | ❌        |
|                        | Použít (volat partnerské API) | ❌         | ❌      | ❌        | ❌       | ✅        |
| **Audit log**          | Číst                          | ❌         | ✅      | 👁        | ❌       | ❌        |

### Poznámky k matici

- ¹ Objednávku lze upravit jen ve stavu `draft` / `new`. Po
  potvrzení (`confirmed`) je pole zamknuté.
- ² Storno objednávky `customer` je dovoleno pouze do 24 h
  po vytvoření a pouze pokud objednávka není ve stavu `shipped`.

### Hlavní permissions per role (textový shrn)

- **`customer`** — vlastní data (objednávky, profil, platby).
  Vidí pouze sebe. Může se odhlásit a smazat účet (s rate-limit).
- **`admin`** — plné CRUD nad business entitami; jediná role,
  která může vytvářet API klíče, rotovat secrety, generovat
  reporty, vystavovat dobropisy.
- **`support`** — read-only přístup ke všem business datům
  zákazníků; podmíněně může pomáhat se stornem a refunds
  (vyžaduje 2FA).
- **`system`** — automatizovaný aktér; vytváří faktury, posílá
  notifikace, spouští refund pipeline. Nemá UI — pouze API /
  scheduled jobs.
- **`partner`** — externí integrátor; přístup pouze přes
  partnerské API klíče, s vyhrazenými endpointy a rate-limity.

## Persóny

> [!TIP]
> Sekce **Persóny** je **volitelná**. Vynechte ji úplně, pokud
> projekt nemá research data / interview notes opravňující
> popis arketypů. Persóny vyžadují customer research nebo jiný
> konkrétní podklad; z implementace samotné je neodvozujte.

### <Persona 1 — Jméno + role + krátký pitch>

**Příklad:** Lucie, 34 let, `customer`. Pracující matka, nakupuje
mobilně, ve spěchu.

**Cíle:**

- Rychle objednat oblíbený produkt bez znovu-zadávání údajů
- Mít přehled o stavu objednávek během dne

**Problémy (frustrations):**

- Pomalé formuláře vyžadující dlouhý input
- Notifikace, které nepřijdou v relevantní chvíli

**Behaviorální vzorce:**

- 85 % objednávek mobilně
- Čte e-maily ve špičkách (ranní káva, večerní pauza)
- Reaguje na push notifikace více než na e-mail

**Typické scénáře:**

- [sc-04 Rychlá objednávka](../002-scenarios/sc-04-objednavka.md)
- [sc-12 Sledování zásilky](../002-scenarios/sc-12-sledovani-zasilky.md)

### <Persona 2 — …>

…

## Odkazy

- [Shrnutí](./001-overview.md)
- [Obrazovky](./005-screens.md) — kde role vidí různé části UI
- [Seznam scénářů](./007-scenarios-list.md) — všechny scénáře seskupené dle aktéra
- [Per-service A&A v technické dokumentaci](../../technical/) —
  jak je matice vynucena na úrovni jednotlivých backend služeb
```

## Notes

### Why the matrix lives here

The new technical structure (per-service backends/frontends/mobile
folders) does not have a single "roles matrix" page. The
system-wide role × permissions definition therefore lives in the
functional section — closer to scenarios, which is where roles
are most often referenced.

Per-service A&A pages document the enforcement details
(which endpoints check which scope, which guards exist) — they
**implement** the matrix; they do not **define** it.

For an implementation-ready target, this matrix is the agreed business
contract and technical pages explain how it will be enforced. For as-built
documentation, inspected implementation/configuration takes precedence: update
the matrix or record the discrepancy rather than preserving an unsupported
permission. A deliberate exception belongs in the project’s canonical decision
log, with reciprocal links.

### Matrix granularity

The matrix granularity should match the **business** decision
level, not the endpoint level. Examples:

- **Good:** "Customer can edit their own order" (matrix cell:
  `🔒` with note explaining state-based restriction).
- **Too fine:** "Customer can call `PATCH /v1/orders/:id`" (this
  is endpoint-level — belongs to the per-service A&A page, not
  here).
- **Too coarse:** "Customer can manage orders" (no detail on
  read vs. write vs. cancel).

A useful default: rows = entities, columns = roles, cells =
the symbol + a short note if the rule is conditional.

### When the project has many entities

If the matrix grows beyond ~15 entities × 5 roles, split into
**multiple matrices** by domain:

- "Matice rolí — orders / payments"
- "Matice rolí — uživatelské účty"
- "Matice rolí — admin a operations"

Each matrix gets its own H3 sub-section. Don't fragment by role
(one matrix per role) — that loses the cross-role comparison
which is the matrix's main value.

### Diagram

The optional `<!-- diagram-anchor: actors-overview -->` produces
a use-case overview (actor circles + use-case ovals). Useful
when there are ≥ 4 actors and ≥ 5 core use-cases. Skip the
anchor for trivial actor sets (one customer + one admin).

A separate "permissions heatmap" diagram is overkill — the
matrix table is already the visual; rendering it again as a
diagram is duplication.

### Evidence and lifecycle

| Situation                                         | Matrix treatment                                                                                                                                      |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Implementation evidence for `as-built`            | Reverse-engineer role enums, guards/decorators and RBAC configuration. Mark ambiguous cells as an evidence gap; do not infer permission.              |
| Discovery evidence                                | Present supported roles and permissions as proposed. Use `🛠` for unresolved cells and identify the decision owner/input needed.                      |
| Approved `implementation-ready` target            | Treat the agreed matrix as prescriptive and testable; technical A&A pages must explain its enforcement.                                               |
| Existing matrix plus newer authoritative evidence | Preserve stable role IDs and links, but report and resolve conflicts. Add newly supported entities/roles without silently changing prior permissions. |
| Targeted module addition                          | Preserve the current matrix, add evidence-backed rows, and add a new role column only after its semantic impact is reviewed.                          |

### Anti-patterns

- **Documenting role names in Czech only** ("Zákazník",
  "Administrátor"). Always include the **stable technical
  identifier** (`customer`, `admin`) — it's what code uses.
- **Defining the matrix at endpoint level**. That's the
  per-service A&A page's job. This page is conceptual.
- **Omitting `system` and `partner` actors**. Even when they
  don't directly use the UI, they are first-class actors with
  permissions. The matrix is incomplete without them.
- **Leaving the Persóny section as an empty heading**. If no
  persona evidence exists, delete the whole `## Persóny`
  section, not just the body.
- **Treating the matrix as static**. Any approved feature that changes access
  control must update the affected cells, rows or roles and their reciprocal
  technical/test links.
- **Používání `✅` pro role bez oprávnění mazat.** Pokud role smí
  entity vytvářet, číst a upravovat, ale ne mazat, buňka „Upravit"
  dostane `✏️`, ne `✅`. Buňka „Smazat" dostane `❌`.
