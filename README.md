# TechFides skilly

Kopie všech skillů z firemní knihovny
[TechFides/tf-skills-manager-library](https://github.com/TechFides/tf-skills-manager-library),
zabalená tak, aby šla použít v **Claude Code**, **Cowork** i **claude.ai** (chat).

Aktuální stav: 32 skillů, knihovna na commitu `94f2429` (2026-10-06).

## Co je kde

| Cesta | K čemu |
| --- | --- |
| `skills/<název>/` | Samotné skilly, jeden adresář na skill (`SKILL.md` + podpůrné soubory). Nainstalované přes tf-skills CLI, ručně se needitují. |
| `.claude/skills` | Symlink na `skills/`. Díky němu Claude Code načte skilly jako projektové, když pracuješ přímo v tomto repu. |
| `.claude-plugin/plugin.json` | Repo je zároveň plugin `tf-skills` (výchozí layout: skilly ve `skills/`). |
| `.claude-plugin/marketplace.json` | Repo je zároveň marketplace `techfides-skills`, ze kterého se plugin instaluje. |
| `scripts/pack-skills.sh` | Zabalí každý skill do `dist/<název>.zip` pro ruční nahrání do claude.ai. `dist/` není v gitu. |

## Jak skilly používat

### Všude najednou (doporučeno): plugin přes claude.ai

Plugin přidaný na účet claude.ai se automaticky objeví v chatu, v Cowork i v Claude Code.

1. V claude.ai nebo v desktopové aplikaci otevři **Customize → Plugins → Add → Add marketplace**.
2. Zadej `martinekst/study` (nebo `https://github.com/martinekst/study`). Repo je soukromé,
   takže dialog požádá o připojení GitHub účtu a o přístup Claude GitHub App k repozitáři.
3. V seznamu vyber **TechFides skills** a dej **Add**.
4. Hotovo. Chat skilly používá hned, Cowork od příští úlohy, Claude Code je stáhne jako
   *synced plugin* při příštím startu (nebo v běžící session napiš `/reload-plugins`).

Aktualizace: **Customize → Plugins** → marketplace `techfides-skills` → **Check for updates**,
případně zapni **Sync automatically**.

### Jen Claude Code (CLI, desktop, IDE), bez účtu claude.ai

```bash
claude plugin marketplace add martinekst/study
claude plugin install tf-skills@techfides-skills
```

Skilly se pak spouštějí jako `/tf-skills:<název>`, např. `/tf-skills:czech-style`, a Claude je
používá i sám podle popisu. Aktualizace: `claude plugin update tf-skills@techfides-skills`.

Když pracuješ přímo v tomto repu, skilly se načtou jako projektové přes `.claude/skills`
a plugin není potřeba (jinak je uvidíš dvakrát).

### Ručně do claude.ai po jednotlivých skillech

```bash
scripts/pack-skills.sh              # všechny → dist/<název>.zip + dist/tf-skills-all.zip
scripts/pack-skills.sh czech-style  # jen vybrané
```

Pak **Customize → Skills → Upload skill** a nahrát zip (jeden zip = jeden skill, uvnitř složka
`<název>/SKILL.md`). Takto nahrané skilly se projeví v chatu, v Cowork i v Claude Code.

### Pro celou firmu

Na plánu Team/Enterprise může Owner plugin nebo jednotlivé skilly publikovat do organizace
(**Publish to org**, případně synchronizace pluginů z repozitáře v nastavení organizace).
Členové pak nic neinstalují.

## Aktualizace skillů z knihovny

Skilly sem přibývají výhradně přes tf-skills CLI, aby se daly porovnat s knihovnou.
CLI chce Node 24+ a GitHub token s přístupem ke knihovně (`gh auth login` nebo `GITHUB_TOKEN`).

```bash
npx @techfides/tf-skills-manager@latest check  --target ./skills   # co je pozadu
npx @techfides/tf-skills-manager@latest update --target ./skills   # stáhnout novější
npx @techfides/tf-skills-manager@latest install --all --target ./skills   # nové skilly z knihovny
```

Po čerstvém klonu CLI skilly nezná (záznam o instalaci má v domovském adresáři, ne v repu),
takže napoprvé použij `install --all --target ./skills --force`.

Po aktualizaci zvedni `version` v `.claude-plugin/plugin.json`, commitni a pushni.
Kdo má plugin z marketplace, dostane novou verzi při **Check for updates** nebo
`claude plugin update`.

Změny v samotných skillech sem nepatří. Jdou pull requestem do knihovny; na to je
skill `tf-skills-add` („přidej tenhle skill do knihovny").

## Seznam skillů

| Sekce | Skill | K čemu | Autor |
| --- | --- | --- | --- |
| QA | `release-notes-stakeholder` | Příprava a automatické odeslání stakeholder release notes z Jira release boardu před nasazením do produkce… | Júlia Šatková |
| QA | `test-cases-md` | Použij, když uživatel chce napsat testovací případy (TC) do MD souborů na libovolném projektu, i neznámém… | Zuzana Soldánová |
| PM | `evaluate-retrospective` | Evaluates and scores TechFides project retrospective records from Slack, Google Docs, Confluence, Jira,… | Martin Studnička |
| PM | `evaluate-weekly-client-report` | Evaluates weekly client report emails against TechFides PM reporting rules, project-specific checklist… | Martin Studnička |
| Dev | `mam-adhd` | Piš výstup tak, aby podle něj mozek s ADHD dokázal jednat: začni další akcí, čísluj vícekrokové úkoly,… | Jiří Čechák |
| Dev | `review-ticket-branch` | Review the branch implementing one defined ticket against its spec and the project conventions, and… | Dalibor Šimon |
| Dev | `sonar-fix-pr` | List and fix all open SonarQube quality gate issues on a given pull request. | Filip Koukal |
| Analysis | `czech-style` | Write or revise professional Czech for analytical documentation and offers, adapting register,… | Dávid Šilon |
| Analysis | `docs-apply-report` | Process open findings from a documentation review or delta report, route approved repairs to their owning… | Dávid Šilon |
| Analysis | `docs-base` | Resolve and validate the v2 documentation contract in docs/README.md, then provide lifecycle, section,… | Dávid Šilon |
| Analysis | `docs-business` | Create or update the declared business section of an analytical portal, including evidence-backed… | Dávid Šilon |
| Analysis | `docs-change-requests` | Create or update declared change-request documentation with outcome-oriented change groups, implementation… | Dávid Šilon |
| Analysis | `docs-delta` | Compare declared documentation with code, specifications, or existing content to identify coverage gaps,… | Dávid Šilon |
| Analysis | `docs-design` | Turn stable functional behavior and wireframes into an evidence-backed UI design specification with… | Dávid Šilon |
| Analysis | `docs-diagrams` | Create or update evidence-backed diagrams for stable documentation, choosing the smallest useful diagram… | Dávid Šilon |
| Analysis | `docs-functional` | Create or update ANA functional documentation when the active README contract enables the functional… | Dávid Šilon |
| Analysis | `docs-landscape` | Produce a standalone, evidence-backed landscape of repositories, systems, ownership signals, dependencies,… | Dávid Šilon |
| Analysis | `docs-learn-from-session` | Analyze a completed documentation session for reusable skill improvements and prepare a narrowly scoped,… | Dávid Šilon |
| Analysis | `docs-pricing` | Build traceable effort and price estimates from documented scope, assumptions, rates, risks, and… | Dávid Šilon |
| Analysis | `docs-prototype` | Define or build a scoped clickable prototype from stable functional flows, UI documentation, wireframes,… | Dávid Šilon |
| Analysis | `docs-review` | Review an ANA documentation portal or a selected part of it against its README contract and evidence, then… | Dávid Šilon |
| Analysis | `docs-technical` | Create or update the technical section inside an analytical portal, preserving the established ANA… | Dávid Šilon |
| Analysis | `docs-tests` | Create or update the declared ANA test-design section, preserving its strategy, business UAT,… | Dávid Šilon |
| Analysis | `docs-wireframes` | Create or update low-fidelity wireframes from documented scenarios, processes, UI states, or supplied… | Dávid Šilon |
| Analysis | `docs-workflow` | Set up, create, update, backfill, extend, migrate, review, or repair an analytical documentation portal… | Dávid Šilon |
| Analysis | `ff-analysis` | Tvorba, kontrola a úprava analytické dokumentace pro projekt FF (společnost TechFides) – use casy (UC),… | Kateřina Poruba Severová |
| Shared | `avoid-ai-writing-cs` | Detekce a redakce AI tellů v ČESKÉM textu. Use for Czech text when asked to "odstranit AI telly",… | Filip Koukal |
| Shared | `confluence-writing` | Use whenever editing an existing Confluence page via the Atlassian MCP tools — fetch fresh in storage… | Tomáš Pokorný |
| Shared | `release-notes-generator` | Generate a Confluence release notes page from Jira tickets grouped by epic/area, then export it to a… | Tomáš Pokorný |
| Shared | `tf-google-doc` | Použij, když má vzniknout Google dokument v grafické úpravě TechFides (hlavičkový papír v2) a uložit se na… | Martin Studnička |
| Shared | `tf-skills-add` | Use when the user wants to add a new skill to the TechFides skills library, or change an existing one —… | Tomáš Pokorný |
| Shared | `tf-skills-install` | Use when the user wants to install, update, or list TechFides AI skills from the company skills library,… | Tomáš Pokorný |
