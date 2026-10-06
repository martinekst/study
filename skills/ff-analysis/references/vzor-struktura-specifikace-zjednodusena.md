# VZOR – Struktura specifikace (zjednodušená)

Seznam částí, které by měla obsahovat každá **zjednodušená** specifikace. U zjednodušené specifikace může být popis stránky stručně propojený s procesem nebo UC, ale nevkládej do něj plnohodnotné UC, doménový model ani detailní workflow, pokud o to uživatel výslovně nepožádá.

## Business shrnutí

- Projektové shrnutí
- Cíle a obchodní přínosy
- Klíčoví stakeholdeři

## Nefunkční požadavky (základní)

- Výkonnostní požadavky
- Bezpečnostní a legislativní požadavky
- Požadavky na integraci

## Rizika a předpoklady

- Klíčová projektová rizika
- Předpoklady učiněné při analýze

## Funkční specifikace (strukturováno podle modulů)

Každý modul obsahuje funkcionality, procesy, validace a související wireframy, aby byla zachována souvislost.

- Doménový model / ERD / Class diagram
- Tabulka dat
- Role a práva – tabulka rolí a práv na projektu
- Hlavní procesy – výpis zásadních procesů, které zasahují skrz celý systém (přes více modulů a částí specifikace)

### Modul [N]: [Název modulu]

- **Přehled modulu**

#### Stránka [N]

- **Obecný popis**
- **Wireframy** – obrazovky související s touto funkcionalitou
- **Validace** – pravidla pro ověření vstupů, obchodní logika, povinná pole, závislosti
- **Detail a procesy** – detailní popis toho, co je zobrazeno na dané stránce, a popis use cases a procesů, které se na stránce obsluhují
- **Data** – popis dat dané evidence ve formě tabulky, jejich datové typy či jiné poznámky
- **Sekce stránky** – stručný popis sekcí stránek; u složitých stránek doplněný o WF s vyznačenými sekcemi
  - **Validace sekcí** – pravidla pro ověření vstupů, obchodní logika, povinná pole, závislosti
  - **Detail sekcí** – popis use cases a procesů, které se obsluhují na stránce
  - **Data sekcí** – popis dat dané podsekce ve formě tabulky, jejich datové typy či jiné poznámky

---

**Rozdíl oproti kompletní specifikaci:** chybí samostatná sekce "Use cases" u modulu/stránky (UC nejsou plnohodnotně rozpracované), chybí sekce "Popis integrace na externí systémy" a rozsah nefunkčních požadavků je omezen na základní kategorie.
