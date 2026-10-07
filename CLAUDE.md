# Pravidla pro práci v této relaci

Repozitář slouží Martinu Studničkovi (COO TechFides) jako pracovní prostor pro
projektové řízení s AI. Pravidla níže platí pro každou relaci, která zde běží.

## Klientské e-maily a reporty

- Každý e-mail klientovi (týdenní report, faktura, zápis ze schůzky, odpověď)
  končí před podpisem jednou závěrečnou větou podle kontextu: poděkování za
  objednávku, za součinnost nebo za zpětnou vazbu, gratulace k milníku, nebo
  „Těšíme se na další spolupráci.“ Věta se volí podle obsahu a neopakuje se
  stejná dva týdny po sobě. Bez ní koncept není hotový.
- Týdenní klientský report sestavuj podle skillu `PM/weekly-client-report`
  z knihovny `TechFides/tf-skills-manager-library` a podle firemního standardu
  v `TechFides/tf-realization-docs`, soubor
  `docs/v1/pm/pracovni-postupy-pro-pm/reporty-a-fakturace/tydenni-klientske-reporty-standard/struktura-reportu.md`.
  Standard se čte před každým sestavením, do skillu ani sem se nekopíruje.
- Report i jiný e-mail klientovi je vždy jen koncept v Gmailu. Nikdy
  neodesílej, odesílá Martin.
- Předlohou formátu, adresátů a podpisu je poslední skutečně odeslaný e-mail
  stejného typu v Gmailu, ne dřívější návrh.
- Chybějící nebo neověřený údaj označ `[DOPLNIT PM]`, nikdy ho nedomýšlej.
- Česky, srozumitelně, bez anglicismů tam, kde existuje běžné české slovo.

## Čísla a výkazy

- Součty hodin a jiná čísla pro klienta ověřuj výpočtem (Python), ne z hlavy,
  a výsledek kontroly uveď.
- Výkazy hodin generuj z ověřených zdrojů (Jira worklogy, changelog), šablona
  výkazu je ve scratchpadu relace jako `vykaz_gen.py`; při změně dat ji
  přegeneruj, ručně PDF neupravuj.
