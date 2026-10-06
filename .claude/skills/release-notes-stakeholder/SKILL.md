---
name: release-notes-stakeholder
description: Příprava a automatické odeslání stakeholder release notes z Jira release boardu před nasazením do produkce jako hotový Slack text. Použij tento skill vždy, když uživatel žádá o "release notes", "přehled releasu", "co jde do produkce", zmiňuje release board, fix version, nebo chce shrnutí ticketů z Jiry pro netechnické publikum / stakeholdery.
metadata:
  author: "Júlia Šatková"
---

# Stakeholder release notes z Jiry

Tento skill připravuje release notes pro netechnické publikum (stakeholdery) na základě Jira release boardu a Confluence dokumentace. Výstup je hotový Slack-ready text, který se po vygenerování automaticky odešle do privátního QA preview kanálu ve Slacku (viz sekce "Odeslání do Slacku").

Compatibility: Vyžaduje přístup k Atlassian nástrojům (Jira + Confluence) a ke Slack connectoru (odeslání zprávy do kanálu).

## Kdy skill použít

Použij tento postup vždy, když má vzniknout release notes zpráva pro stakeholdery — i když uživatel řekne jen "připrav release notes" nebo "co jde v tomto releasu". Necekej na explicitní zmínku Jiry nebo boardu.

## Základní princip: nikdy nehádej, vždy ověř

Než napíšeš jakýkoli bod, musíš mít reálně načtená data z Jiry a Confluence pro danou fix version. Pokud máš přístup k Atlassian nástrojům, nepoužívej formulace typu "nelze potvrdit" nebo obecné zástupné věty, dokud jsi skutečně neprošel board, fix version a konkrétní tickety.

Pokud se board, fix version nebo konkrétní tickety nepodaří načíst, napiš to uživateli výslovně a nevytvářej žádný obecný náhradní text místo toho.

## Výchozí zdroje

Pokud uživatel neurčí jinak, vycházej vždy z těchto zdrojů:

- Release notes board (Jira): https://flexifin.atlassian.net/jira/dashboards/10624
- Dokumentace k release notes procesu (Confluence): https://flexifin.atlassian.net/wiki/spaces/FLEX/pages/1461354505/Release+notes
- Nové funkce: https://flexifin.atlassian.net/issues/?filter=11838
- Opravené incidenty: https://flexifin.atlassian.net/issues/?filter=11840
- Opravené chyby: https://flexifin.atlassian.net/issues/?filter=11839
- Další implementace: https://flexifin.atlassian.net/issues/?filter=11841
- Vyžaduje testování na produkci: https://flexifin.atlassian.net/issues/?filter=11842

Pokud má uživatel ve Znalostech nahraný vzor předchozích release notes nebo screenshot boardu, ber ho jako doplňkový zdroj pro styl výstupu (ne pro obsah).

Datum nasazení vždy přebírej ze zadání uživatele, nikdy si ho nevymýšlej, a vždy ho uveď ve formátu DD.MM.YYYY.

## Pracovní postup

Projdi kroky v tomto pořadí:

1. **Otevři Confluence dokumentaci** k release notes procesu — slouží jako doplňkový zdroj pro pochopení business kontextu, ne jako primární zdroj ticketů.
2. **Otevři release board 10624** v Jiře a zjisti aktuální fix version.
3. **Načti všechny relevantní tickety** pro danou fix version ze všech pěti filtrů výše — celý seznam, ne jen prvních pár ticketů.
4. **Předběžně vyhodnoť kandidáty na finální release notes** — pro každý ticket posuď typ, prioritu a business/uživatelský/provozní dopad podle pravidel v sekci "Co do stakeholder release notes nepatří" a "Jaké chyby byly opraveny?". V tomto kroku ještě nedohledávej linked issues, Analysis ani FFR tickety — jen rozhodni, které tickety mají reálnou šanci skončit ve finálním výstupu.
5. **Až pro tyto kandidátní vývojové tickety** (Story / User Story / Feature) ověř linked issues a případnou návaznost Story → Analysis → FFR (Requirement). Tuto návaznost musíš aktivně dohledat přes propojené tickety, ne jen podle toho, co je přímo nalinkované na Story. Tickety, které v kroku 4 vypadly (nevhodné pro stakeholdery, jasně technické, zrušené apod.), takto nedohledávej — cílem je omezit počet zbytečných Jira dotazů.
6. **Vyhodnoť každou kandidátní Story/Feature nejdřív podle business dopadu**, teprve potom podle technické oblasti — business dopad rozhoduje, do které sekce bod patří.
7. **Interně roztřiď tickety** do kategorií: nové funkce / opravené chyby / technické či interní změny / feature flagy / nevhodné pro stakeholder release notes.
8. **Zkontroluj, že žádná stakeholdery relevantní Story, Feature nebo Requirement nezůstala schovaná** jen v technickém nebo agregovaném shrnutí. Pokud při této kontrole narazíš na ticket, který jsi v kroku 4 nezařadil mezi kandidáty, ale ukáže se jako relevantní, dohledej pro něj linked issues a FFR dodatečně — předběžné vyhodnocení z kroku 4 nesmí být důvodem, proč ticket nakonec zůstane bez správného odkazu.
9. **Zkontroluj duplicity** — žádný ticket nesmí skončit ve dvou sekcích zároveň (viz "Pravidlo proti duplicitám" níže).
10. Teprve po dokončení kroků 1–9 sestav finální release notes podle šablony.
11. **Automaticky odešli hotový text do Slacku** do kanálu `qa-release-notes-preview` pomocí Slack connectoru — bez čekání na potvrzení od uživatele. Postupuj podle pravidel v sekci "Odeslání do Slacku" níže.

## Co do stakeholder release notes nepatří

Následující kategorie standardně nezařazuj mezi hlavní novinky ani opravy, pokud uživatel výslovně neřekne jinak:

- čistě testovací endpointy
- CI/CD a build změny bez uživatelského dopadu
- interní maintenance, refactoring a technický dluh bez viditelného dopadu
- organizační, deploy a regresní tickety (regresní testování nezmiňuj, pokud o něj uživatel výslovně nepožádá)
- tasky bez jasného business, uživatelského nebo provozního přínosu
- opravy security chyb
- aktualizace balíčků
- healthchecky / uptime checky
- rozpracované, vrácené nebo zrušené položky

Technické a interní změny uváděj pouze tehdy, když mají dopad na release, provoz, stabilitu nebo vyžadují následné ověření — takové patří do sekce "Co dalšího je potřeba vědět?", nikam jinam.

V sekci "Jaké chyby byly opraveny?" uváděj bugy a incidenty s prioritou High, Critical, Medium i Low, pokud mají prokazatelný dopad na uživatele, business nebo provoz. O zařazení nerozhoduje priorita samotná, ale reálný dopad — bug s nízkou prioritou, který ovlivňuje uživatele nebo provoz, do sekce patří; bug bez takového dopadu (např. čistě kosmetický nebo interní) tam nepatří bez ohledu na prioritu.

## Pravidlo proti duplicitám

Každý bod nebo ticket smí být v release notes pouze jednou. Nejčastější past: pokud je funkcionalita nasazená pod feature flagem, patří výhradně do sekce o feature flagech a už se znovu neobjevuje mezi novými funkcemi.

## Jak vybrat správný link k bodu

Tento krok prováděj podle workflow výše pouze pro tickety, které už prošly předběžným výběrem kandidátů (krok 4) — ne pro celý board.

Ke každému bodu patří přesně jeden odkaz, a nikdy odkaz na analytický ticket (work type = Analysis) — bez ohledu na typ ticketu.

**Nevývojové tickety** (bug, incident, task a další, ne Story/Feature): vždy linkuj přímo na ticket z release boardu.

**Vývojové tickety** (Story / User Story / Feature) — postupuj podle tohoto rozhodovacího stromu:

1. Zkontroluj linked issues u Story a zjisti, jestli existuje návaznost Story → Analysis → FFR (Requirement). Nekonči hledání jen proto, že FFR není nalinkovaný přímo na Story — může být nalinkovaný až na navazujícím Analysis ticketu.
2. Pokud návaznost na FFR jednoznačně existuje a FFR tématicky odpovídá summary Story, linkuj na FFR ticket — nikdy v tom případě nelinkuj samotnou Story.
3. Pokud je navázaných FFR ticketů víc, vyber ten, jehož téma odpovídá summary Story.
4. Pokud návaznost Story → Analysis → FFR není jednoznačná, nebo FFR neexistuje, linkuj přímo na vývojový ticket (Story/Feature) z release boardu.

## Sekce a co do nich patří

Používej přesně tyto sekce, v tomto pořadí:

- **Nasazení do produkce** — datum nasazení dle zadání uživatele.
- **Jaké nové funkce přinese release?** — nové funkcionality, větší změny chování, změny s business dopadem.
- **Jaké chyby byly opraveny?** — bugy a incidenty (bez ohledu na prioritu) s prokazatelným dopadem na uživatele, business nebo provoz.
- **Co dalšího je potřeba vědět?** — známá omezení, nutnost ověření na produkci, technické změny s provozním dopadem.
- **Funkcionality, které půjdou na produkci vypnuté za feature flagem** — nasazené, ale vypnuté nebo skryté funkcionality.
- **Kompletní seznam všech ticketů** — odkaz na release board.
- **Dokumentace k release notes procesu** — odkaz na Confluence stránku.

Pokud release neobsahuje velké business novinky, vyber i menší, ale stále srozumitelné a relevantní změny — nepiš věty typu "V tomto releasu nejsou žádné významné nové funkce", pokud na boardu existují tickety, které lze převést do srozumitelné stakeholder formulace.

## Jazyk a formátování textu

- Piš vždy česky, stručně, jasně a srozumitelně pro netechnické publikum.
- Nevypisuj celý board ani celý seznam ticketů 1:1 do textu.
- Používej pouze obyčejný text — žádná kurzíva, tučné písmo, markdown nadpisy ani jiné markdown formátování.
- Názvy sekcí piš jako samostatný řádek s emoji (viz šablona), bez zvýraznění.
- Každý bod začíná znakem "-".
- Každý bod má formát: `<URL|Stručný název bodu>: stručný popis bodu`.
- Stručný název bodu je krátký, konkrétní a srozumitelný stakeholderovi (je to text odkazu, ne celá věta).
- Nikdy nevypisuj holý URL ani syrový Jira link bez popisku.

### Příklady dobrého stylu

- `<URL|Podpora denních cen doplňkových služeb>: přesnější výpočet bez zaokrouhlovacích rozdílů.`
- `<URL|Vypínání doplňkových služeb pro ACQ>: možnost vypnout doplňkové služby pro vybrané tenanty.`

## Šablona výstupu

Výstup vždy sestav jako hotový text do Slacku, přesně podle této šablony (doplň XX.X.X, datum a jednotlivé body):

```
Hezký den, @channel, před pravidelným releasem zasíláme přehled nejdůležitějších změn.

:rocket: Release notes XX.X.X

- Nasazení do produkce: DD.MM.YYYY

:new: Jaké nové funkce přinese release?
- <URL|Stručný název bodu>: stručný popis bodu

:zap: Jaké chyby byly opraveny?
- <URL|Stručný název bodu>: stručný popis bodu

:bulb: Co dalšího je potřeba vědět?
- <URL|Stručný název bodu>: stručný popis bodu

:gear: Funkcionality, které půjdou na produkci vypnuté za feature flagem
- <URL|Stručný název bodu>: stručný popis bodu

:page_with_curl: Kompletní seznam všech ticketů: <URL|Release notes XX.X.X>

:orange_book: Dokumentace k release notes procesu: <URL|Release notes>
```

Pokud je některá sekce prázdná (opravdu žádný vhodný ticket, ne jen chybějící velká novinka), sekci i tak ponech v textu jako nadpis, ale vynech ji pouze pokud v ní po pečlivém průchodu boardem skutečně není žádný vhodný bod.

## Odeslání do Slacku

Jakmile je finální text release notes hotový podle šablony výše, automaticky ho odešli pomocí Slack connectoru — bez ptaní se uživatele na potvrzení předem.

Bezpečnostní pravidla (platí vždy, bez výjimky):

- Release notes posílej výhradně do kanálu `qa-release-notes-preview`.
- Nikdy je neposílej přímo stakeholderům (DM, jiný kanál se stakeholdery apod.).
- Nikdy je neposílej do žádného jiného kanálu, pokud uživatel v daném zadání výslovně neurčí jiný kanál.
- Do Slack zprávy vlož pouze finální Slack-ready text release notes tak, jak vznikl podle šablony — žádné doplňující komentáře, vysvětlení, checklisty ani interní poznámky navíc.

### Pokud se odeslání nepodaří

Chybu nikdy neignoruj. Namísto toho vrať uživateli přesně tyto čtyři informace: že se odeslání nepodařilo, důvod selhání (pokud ho Slack connector vrátí), název cílového kanálu a celý hotový text release notes ke zkopírování. Použij tento formát:

```
Release notes se nepodařilo odeslat do Slack kanálu `qa-release-notes-preview`.
Důvod:
<konkrétní chyba ze Slack connectoru>

Níže je hotový text release notes ke zkopírování:
<release notes>
```

Pokud odeslání proběhne úspěšně, potvrď to uživateli krátce (např. že release notes byly odeslány do `qa-release-notes-preview`) — nemusíš znovu vypisovat celý text, protože ho už uživatel vidí ve Slacku.
