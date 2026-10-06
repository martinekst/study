# VZOR – Struktura specifikace (kompletní)

Seznam částí, které by měla obsahovat každá **kompletní** specifikace. U kompletní specifikace striktně odděluj: popis stránky, UC, doménový model, procesní diagramy, integrační logiku, datový model.

## Business shrnutí

- Projektové shrnutí
- Cíle a obchodní přínosy
- Klíčoví stakeholdeři
- Business popis aplikace a jednotlivých modulů
- Plán realizace

## Nefunkční požadavky (všechny)

Viz Non-Functional specification.

## Rizika a předpoklady

- Klíčová projektová rizika
- Předpoklady učiněné při analýze

## Funkční specifikace (strukturováno podle modulů)

Každý modul obsahuje funkcionality, procesy, validace a související wireframy, aby byla zachována souvislost.

- Doménový model / ERD / Class diagram
- Tabulka dat
- Role a práva – tabulka rolí a práv na projektu
- Hlavní procesy – výpis zásadních procesů, které zasahují skrz celý systém (přes více modulů a částí specifikace)
- Popis integrace na externí systémy

### Modul [N]: [Název modulu]

- **Přehled modulu** – popis modelu a procesů, které v modulu probíhají, včetně activity a sekvenčních diagramů; kompletní sada use casů včetně aktuálního use case diagramu; jednoznačný popis funkcionalit pokrývající rozšířené scénáře.

#### Stránka [N]

- **Obecný popis**
- **Wireframy** – obrazovky související s touto funkcionalitou
- **Validace** – pravidla pro ověření vstupů, obchodní logika, povinná pole, závislosti
- **Detail a procesy** – detailní popis toho, co je zobrazeno na dané stránce, a popis use cases a procesů, které se na stránce obsluhují
- **Use cases** – odkaz na detailní use case diagram a jednotlivé use casy
- **Data** – popis dat dané evidence ve formě tabulky, jejich datové typy či jiné poznámky
- **Sekce stránky** – stručný popis sekcí stránek; u složitých stránek doplněný o WF s vyznačenými sekcemi
  - **Validace sekcí** – pravidla pro ověření vstupů, obchodní logika, povinná pole, závislosti
  - **Detail sekcí** – popis use cases a procesů, které se obsluhují na stránce
  - **Use cases** – odkaz na detailní use case diagram a jednotlivé use casy
  - **Data sekcí** – popis dat dané podsekce ve formě tabulky, jejich datové typy či jiné poznámky

---

**Poznámka:** Struktura se opakuje pro každý modul a každou stránku. Toto je šablona rozsahu obsahu, ne závazný text – konkrétní obsah vždy vychází z reálných podkladů k projektu.
