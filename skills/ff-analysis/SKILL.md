---
name: ff-analysis
description: Tvorba, kontrola a úprava analytické dokumentace pro projekt FF (společnost TechFides) – use casy (UC), popisy stránek/obrazovek, doménové modely a diagramy v PlantUML, struktura funkčních specifikací a orientační odhady pracnosti.
metadata:
  author: "Kateřina Poruba Severová"
---

## Co tento skill umožňuje

- analyzovat existující dokumentaci,
- odhalovat nekonzistence, logické kolize a chybějící scénáře,
- kontrolovat správnost terminologie,
- vytvářet nové části specifikací,
- tvořit a upravovat UC,
- popisovat stránky a obrazovky,
- vytvářet doménové modely a diagramy v PlantUML,
- připravovat orientační odhady pracnosti,
- ukládat výstupy jako přehledně formátované .md soubory.

## Jazyk

Primárně odpovídej **česky**. Pokud uživatel požádá, odpovídej slovensky nebo anglicky.

## Styl výstupů a formát .md souborů

Výstupy piš věcně, přesně a stručně. Pokud je výstup standalone dokument (formalizovaná specifikace, UC, popis stránky, doménový model, odhad pracnosti), **vytvoř samostatný .md soubor** (nástrojem pro tvorbu souborů) místo pouhého vypsání textu do chatu. Výjimka: krátké odpovědi v režimu Analýza nebo dílčí Návrh řešení (viz níže) mohou zůstat jen v konverzaci, pokud si uživatel výslovně nevyžádá soubor.

Formátování .md souboru:

- jasná hierarchie nadpisů (`#`, `##`, `###`) odpovídající struktuře artefaktu (UC, popis stránky, doménový model, specifikace, odhad),
- tabulky v Markdown syntaxi (atributy, validace, odhady po rolích, číselníky),
- PlantUML kód doménového modelu jako blok ```plantuml,
- otevřené body a předpoklady vždy vizuálně odlišené (např. vlastní sekce "Otevřené body" / "Předpoklady"),
- název souboru výstižný a bez diakritiky/mezer (např. `uc-vyhledani-klienta.md`, `popis-stranky-prihlaseni.md`, `domenovy-model-cs.md`, `odhad-export-csv.md`).

Po vytvoření souboru ho uživateli zpřístupni k stažení.

## Zásadní pravidlo: nevymýšlet obsah

**Nevymýšlej** business pravidla, systémové stavy, integrace, entity, validace, názvy polí ani názvy tlačítek, pokud nejsou uvedeny ve vstupních podkladech od uživatele. Pokud informace chybí, **označ ji jako otevřený bod** nebo si vyžádej doplnění.

Nevytvářej falešně přesné technické informace pouze proto, aby byla dokumentace úplná. Pokud jde o návrh, hypotézu nebo předpoklad, **výslovně to označ** (např. "Návrh – k ověření", "Předpoklad:").

## Referenční metodiky a vzory

Před tvorbou výstupu vždy nahlédni do odpovídajícího referenčního souboru v `references/`:

| Téma | Soubor |
| --- | --- |
| Odhady pracnosti | `references/metodika-odhady-pracnosti.md` |
| Use casy (UC) | `references/metodika-uc.md` |
| Doménové modely a diagramy | `references/metodika-domenove-modely.md` + `references/vzor-jak-na-domenove-modely.md` |
| Popis stránek/obrazovek | `references/metodika-popis-stranek.md` |
| Vzorové UC | `references/vzor-pripad-uziti-1.md`, `references/vzor-pripad-uziti-2.md` |
| Vzor doménového modelu – diagram | `references/vzor-domain-model-plantuml.txt` |
| Vzor doménového modelu – tabulky | `references/vzor-domenovy-model-tabulky.md` |
| Struktura specifikace – kompletní | `references/vzor-struktura-specifikace-kompletni.md` |
| Struktura specifikace – zjednodušená | `references/vzor-struktura-specifikace-zjednodusena.md` |

Nahraj vždy alespoň ten referenční soubor, který odpovídá požadovanému typu výstupu, dřív než výstup napíšeš.

## Volba pracovního režimu

Před vytvořením výstupu vždy vyhodnoť, ve kterém režimu máš pracovat. Pokud uživatel výslovně nepožaduje finální specifikaci, formální dokumentaci nebo odhad, **preferuj režim Analýza nebo Návrh řešení**.

### 1. Analýza

- hledání problémů, nekonzistencí, chybějících scénářů, duplicit a otevřených bodů,
- kontrola správného zařazení obsahu mezi artefakty (UC vs. popis stránky vs. doménový model apod.).

### 2. Návrh řešení

- návrh funkcionality, obrazovek, workflow, funkčních sekcí, validací, stavů a variant,
- **nejde o finální specifikaci** – jde o analytický návrh, který preferuj před formální dokumentací, pokud uživatel nechce rovnou finální výstup.

### 3. Formalizace

- vytvoření finální části specifikace podle příslušné metodiky,
- výstup ulož jako **.md soubor** připravený k dalšímu použití (verzování, sdílení, případné ruční vložení kamkoliv je potřeba).

### 4. Odhad pracnosti

- orientační odhad pracnosti podle `references/metodika-odhady-pracnosti.md`,
- výstup vždy rozděl na **ANA, DEV, QA**,
- DEV chápej jako **full-stack roli**,
- **nevytvářej** časový plán ani paralelizaci prací,
- odhad vždy **označ jako orientační**.

## Rozlišení typu specifikace

Při kontrole nebo tvorbě specifikace nejprve rozliš, zda jde o:

- **kompletní specifikaci** (viz `references/vzor-struktura-specifikace-kompletni.md`) – striktně odděluj popis stránky, UC, doménový model, procesní diagramy, integrační logiku a datový model,
- **zjednodušenou specifikaci** (viz `references/vzor-struktura-specifikace-zjednodusena.md`) – popis stránky může být stručně propojený s procesem nebo UC, ale nevkládej do něj plnohodnotné UC, doménový model ani detailní workflow, pokud o to uživatel výslovně nepožádá.

## Wireframy a návrhy obrazovek

Slouží k analytickému návrhu funkcionality, identifikaci funkčních sekcí, stavů, validací a návazností na procesy. **Nejde o finální UX návrh, grafický design ani pixel-perfect specifikaci.**

## Kontrola dokumentace – na co se zaměřit

Při kontrole existující dokumentace hledej především:

- logické chyby,
- nekonzistence,
- duplicity,
- chybějící scénáře,
- konfliktní požadavky,
- nejasnou terminologii,
- špatné zařazení obsahu mezi artefakty (např. UC scénář vložený do popisu stránky).

## Odhad pracnosti v člověkodnech (MD)

Pozor na terminologii: zkratka **MD** v tomto skillu vždy znamená **člověkodny** (man-days), nikoliv příponu `.md`. Výsledný odhad ale i tak ulož jako `.md` soubor (např. `odhad-nazev-funkce.md`).

Pokud uživatel chce odhad pracnosti, postupuj striktně podle `references/metodika-odhady-pracnosti.md` (role ANA/DEV/QA, typ odhadu, formát výstupu se scope/předpoklady/riziky/open points/celkovým odhadem v MD a spolehlivostí).
