# Template: process detail

```markdown
---
title: <Název procesu>
status: draft
updated_at: <YYYY-MM-DD>
---

<Jedna až dvě věty: jaký end-to-end výsledek proces zajišťuje a pro koho.>

## Základní informace

| Pole             | Hodnota                                          |
| ---------------- | ------------------------------------------------ |
| ID               | `PROC-NN`                                        |
| Cíl a výsledek   | <měřitelný nebo pozorovatelný business výsledek> |
| Spouštěč         | <událost, která proces zahájí>                   |
| Začátek          | <první stav zahrnutý do procesu>                 |
| Konec            | <terminální úspěšný stav>                        |
| Vlastník procesu | <odpovědná role nebo funkce>                     |
| Účastníci        | <další role, systémy nebo externí strany>        |

<!-- evidence: <precizni odkazy na skutecne otevrene zdroje> -->

## Rozsah a hranice

- **Součástí je:** <co tento proces vlastní>
- **Před procesem:** <co musí nastat mimo jeho rozsah>
- **Po procesu:** <co navazuje mimo jeho rozsah>

## End-to-end průběh

| Fáze                  | Odpovědnost          | Akce a výsledek                         | Vstup → výstup                         | Scénář  | Obrazovka nebo systém        | Stav po fázi |
| --------------------- | -------------------- | --------------------------------------- | -------------------------------------- | ------- | ---------------------------- | ------------ |
| 1. Registrace         | Pojistník            | Nahlásí škodu a obdrží referenční číslo | Údaje o události → registrovaný případ | `SC-01` | Claim form                   | Registered   |
| 2. Posouzení          | Likvidátor           | Ověří podklady a navrhne rozhodnutí     | Případ + důkazy → návrh rozhodnutí     | `SC-03` | Claim detail                 | Assessed     |
| 3. Schválení a platba | Supervisor → Finance | Schválí částku a předá platbu           | Schválení → provedená platba           | `SC-04` | Claim detail; finance system | Paid         |
| <N>                   | <role>               | <akce a výsledek>                       | <vstup → výstup>                       | <odkaz> | <odkaz>                      | <stav>       |

<!-- diagram-anchor: process-PROC-NN -->

## Předávky odpovědnosti

| Z → Do           | Spouštěč převzetí           | Předávaný výsledek  | Potvrzení převzetí         | Co se stane při neúspěchu                               |
| ---------------- | --------------------------- | ------------------- | -------------------------- | ------------------------------------------------------- |
| Claims → Finance | Případ je schválen k platbě | Částka a autorizace | Platba získá identifikátor | Případ zůstane Ready for payment a je viditelně označen |

## Výjimky a návraty

| Situace      | Odbočení z fáze | Odpovědnost            | Výsledek nebo návrat          |
| ------------ | --------------- | ---------------------- | ----------------------------- |
| Chybí doklad | Posouzení       | Likvidátor → Pojistník | Návrat k doplnění podkladů    |
| <výjimka>    | <fáze>          | <role>                 | <terminální stav nebo návrat> |

## Stavy procesu

| Stav       | Co znamená pro business               | Kdo může posunout proces | Následující stav |
| ---------- | ------------------------------------- | ------------------------ | ---------------- |
| Registered | Případ byl přijat a čeká na posouzení | Claims                   | Assessing        |

## Měření a řízení

| Ukazatel nebo SLA | Definice             | Začátek měření | Konec měření | Vlastník |
| ----------------- | -------------------- | -------------- | ------------ | -------- |
| <název>           | <schválená definice> | <událost>      | <událost>    | <role>   |

## Odkazy

- **Scénáře:** <existující komponentní scénáře>
- **Obrazovky:** <existující UI stránky>
- **Business pravidla:** <sdílené pravidlo>
- **Technický detail:** <existující integrační nebo stavový vlastník>
```

Remove KPI/SLA when none is defined; never invent a target. Keep exception outcomes distinct from technical incident handling. Each linked scenario or screen should link back to the process when that view is enabled.
