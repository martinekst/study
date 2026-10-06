# FF – Metodika přípravy odhadů pracnosti

## Účel metodiky

Metodika slouží pro přípravu orientačních odhadů pracnosti v MD pro:

- analytické aktivity,
- vývoj,
- testování.

Odhad pracnosti slouží jako podklad pro:

- sizing řešení,
- plánování kapacit,
- porovnání variant,
- identifikaci rizik a otevřených bodů.

Každý odhad musí být označen jako orientační, pokud není potvrzen delivery týmem.

## Role v odhadu

Pracnost rozděluj pouze podle těchto rolí: **ANA, DEV, QA**.

### ANA

Zahrnuje: analýzu požadavku, návrh řešení, tvorbu UC, popisy stránek, validace, návrh doménového modelu, doplnění dokumentace, identifikaci dopadů a otevřených bodů.

### DEV

Developer je chápán jako **full-stack role** a zahrnuje: frontend, backend, integrace, databázové změny, workflow logiku, technické úpravy.

### QA

Zahrnuje: test analýzu, přípravu testovacích scénářů, manuální testování, regresní testování, ověření workflow a validací.

## Vstupy pro odhad

Před přípravou odhadu ověř, zda jsou známé alespoň tyto informace:

- stručný popis požadavku,
- očekávaný rozsah řešení,
- dotčené části systému,
- dostupné analytické podklady,
- známé integrace,
- známé závislosti nebo omezení,
- očekávaný rozsah testování.

Pokud některé informace chybí: uveď je jako otevřené body, případně navrhni otázky pro doplnění.
Pokud chybí zásadní informace: **označ odhad jako nízkospolehlivý.**

## Typy odhadů

### 1. Orientační sizing

Použij, pokud je požadavek známý pouze rámcově.
Výstup: hrubý interval pracnosti, hlavní předpoklady, hlavní rizika, spolehlivost odhadu.

### 2. Detailní odhad

Použij, pokud jsou dostupné: UC, popisy stránek, workflow, doménový model, integrační návaznosti.
Výstup: rozpad podle rolí, rizika, otevřené body, celkový interval odhadu.

### 3. Impact analýza změny

Použij, pokud jde o změnový požadavek v existujícím systému.
Výstup: dotčené části systému, dopady do analýzy, dopady do vývoje, dopady do testování, rizika regresí, odhad pracnosti.

### 4. Porovnání variant řešení

Použij, pokud existuje více variant řešení.
Výstup: odhad pro jednotlivé varianty, rozdíly v komplexitě, rozdíly v rizicích, doporučení.

## Doporučený postup

1. Shrň pochopení zadání.
2. Identifikuj rozsah řešení.
3. Identifikuj dotčené části systému.
4. Identifikuj předpoklady.
5. Identifikuj otevřené body.
6. Identifikuj rizika a závislosti.
7. Připrav odhad po rolích.
8. Uveď celkový interval a spolehlivost odhadu.

## Formát odhadu

Preferovaný formát (tabulka, pouze relevantní oblasti, nepoužívat mechanický rozpad):

| Role | Oblast | Odhad MD | Poznámka |
| --- | --- | --- | --- |

Příklad:

- ANA → UC a návrh workflow
- DEV → implementace workflow a validací
- QA → regresní scénáře a integrační testy

## Výstup odhadu

Preferovaný formát výstupu:

**Scope** – Stručný popis toho, co je součástí odhadu.

**Předpoklady** – Seznam předpokladů, ze kterých odhad vychází.

**Rozpad pracnosti** – tabulka Role/Oblast/Odhad MD/Poznámka.

**Rizika** – Seznam rizik, která mohou odhad ovlivnit.

**Open points** – Informace potřebné pro zpřesnění odhadu.

**Celkový odhad** – Preferuj: optimistický odhad, realistický odhad, pesimistický odhad. Nevracej pouze jedno číslo bez kontextu.

**Spolehlivost odhadu** – Nízká / Střední / Vysoká + stručné zdůvodnění.

## Pravidla pro odhady

- Neposkytuj falešně přesné odhady bez dostatečných podkladů.
- Preferuj: intervaly, rozpad podle rolí, identifikaci rizik, identifikaci otevřených bodů, explicitní předpoklady.
- Pokud nejsou známé klíčové informace: upozorni na nízkou spolehlivost, uveď, co je potřeba doplnit, neprezentuj odhad jako finální commitment.

## Faktory zvyšující komplexitu

Externí integrace, změny autentizace/autorizace, více tenantů, workflow logika, stavové procesy, asynchronní zpracování, notifikace, batch processing, migrace dat, reporting, auditní požadavky, paralelní zpracování, schvalovací procesy, dopady do více aplikací, změny existujících dat, legislativní nebo smluvní logika. Tyto faktory vždy zvaž při rizicích a spolehlivosti odhadu.

## Co nezahrnovat bez explicitního zadání

Dlouhodobý support, produkční hypercare, provozní monitoring, školení uživatelů, bezpečnostní audit, penetrační testy, rozsáhlé migrace historických dat. Pokud mohou být relevantní: uveď je jako doplňkové položky nebo open points.

## Doporučené shrnutí

Na konci odhadu vždy stručně uveď: hlavní driver pracnosti, hlavní rizika, oblasti s nejnižší jistotou, co je potřeba doplnit pro zpřesnění, zda je odhad vhodný pouze pro sizing nebo i pro detailnější plánování.
