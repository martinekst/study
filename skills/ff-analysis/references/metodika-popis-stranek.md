# FF – Metodika popisu stránek

## Účel

Popis stránky slouží k popisu:

- účelu obrazovky,
- funkcionality dostupné uživateli,
- validací,
- dostupných akcí,
- dat používaných stránkou,
- návaznosti na procesy systému.

## Popis stránky NENÍ

- Use Case,
- doménový model,
- technický návrh,
- backend specifikace,
- ani detailní UX wireflow.

## Struktura stránky

Používej pouze relevantní sekce podle složitosti stránky. Nevytvářej sekce mechanicky pouze proto, že existují ve vzoru.

Možné sekce:

1. Obecný popis
2. Wireframy
3. Validace
4. Detail a procesy
5. Use cases
6. Data
7. Sekce stránky
8. Validace sekcí
9. Detail sekcí

### 1. Obecný popis

Obsahuje: účel stránky, kdo stránku používá, kdy se zobrazuje, hlavní funkcionalitu stránky, stručný kontext použití.
Nepopisuj zde detailní procesní flow.

### 2. Wireframy

Obsahují: odkazy na wireframy, stručný popis variant obrazovky, případně rozdíly mezi variantami.
Nepopisuj detailně layout nebo vizuální design.

### 3. Validace

Validace popisuj tabulkou ve formátu:

| Kontext | Kdy | Chybová hláška |
| --- | --- | --- |

Validace popisují business pravidla, uživatelské chyby, chybové scénáře relevantní pro UX. Preferuj business popis validací.

Preferuj: „prázdné heslo“, „neplatná kombinace přihlašovacích údajů“, „neexistující telefonní číslo“.
Nepreferuj: technické validační názvy, regex validace, backend exception handling, databázová omezení, interní validační klíče.

Chybové hlášky piš stručně, uživatelsky, konzistentně, bez technické terminologie.

### 4. Detail a procesy

Sekce obsahuje pouze stručný popis procesů obsluhovaných stránkou. Popisuj: jaké hlavní akce může uživatel provést, jaké procesy stránka spouští, návaznost na další části systému.

Nevkládej: kompletní Use Case, alternativní scénáře, detailní workflow, technickou implementaci procesu.

Pokud existuje samostatný UC: uveď pouze stručné shrnutí procesu, případně odkaz na příslušný UC.

### 5. Use cases

Sekce obsahuje pouze seznam souvisejících UC nebo odkazy na UC. Nevkládej obsah UC přímo do stránky.

### 6. Data

Sekce „Data“ popisuje pouze: jaká business data stránka zobrazuje, jaká data uživatel zadává, jaká data stránka používá.

Nepopisuj: datové typy, entity, interní struktury, databázový model, API kontrakty, implementační detaily.

Preferuj business popis dat, např.: telefonní číslo uživatele, heslo, QR token, externí poskytovatel identity.
Nepreferuj: string, enum, boolean, object, interní názvy atributů.

### 7. Sekce stránky

Sekce stránky reprezentují funkční části obrazovky, samostatné uživatelské funkcionality, oddělené business oblasti obrazovky.

Preferované sekce (příklad): Standardní přihlášení, Přihlášení externím poskytovatelem, QR přihlášení, Obnovení hesla.
Nepreferované sekce: Header, Footer, Logo, Marketingový banner, Dekorativní části stránky – pokud nemají vlastní business chování.

### 8. Detail sekcí

Popisuj: účel sekce, dostupné akce, hlavní chování sekce, případné návaznosti na procesy.
Nepopisuj: pixel-level layout, detailní UX chování, technickou implementaci, backend logiku.

### 9. Validace sekcí

Validace sekcí popisuj pouze pokud: jsou specifické pro danou sekci, mají business význam, nebo ovlivňují chování uživatele.

## Open points

Open points vytvářej pouze pokud informace skutečně chybí a zároveň je důležitá pro návrh řešení. Nevytvářej technické open points bez opory ve vstupních podkladech.

## Zakázané obsahy

Do popisu stránky nevkládej: kompletní UC scénáře, alternativní scénáře UC, doménový model, detailní entity a vztahy, sekvenční diagramy, activity diagramy, backend implementaci, polling mechanismy, timeouty, interní tokeny, technické integrační detaily – pokud nejsou explicitně požadovány.

## Kontrola kvality před dokončením

- zda sekce reprezentují funkční části stránky,
- zda stránka neobsahuje UC,
- zda stránka nesupluje doménový model,
- zda nejsou použity datové typy,
- zda nejsou přidány technické implementační detaily,
- zda nejsou vytvořeny zbytečné open points,
- zda odpověď odpovídá analytické úrovni specifikace.
