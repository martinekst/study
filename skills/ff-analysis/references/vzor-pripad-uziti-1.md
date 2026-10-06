# VZOR – Případ užití: [KZ-UC] Prihlásiť sa

| Pole | Obsah |
| --- | --- |
| **Případ užití** | Prihlásenie do klientskej zóny |
| **Hlavný aktér** | Žiadateľ (užívateľ) |
| **Vedľajší aktéri** | Mobilná aplikácia, SSO Provider, Loan Service |
| **Vstupné podmienky** | Užívateľ je registrovaný v systéme. |

## Základný scenár

1. Používateľ zvolí možnosť „Prihlásiť sa“.
2. Systém zobrazí možnosti prihlásenia používateľa.
3. KEĎ používateľ zvolí prihlásenie cez externého poskytovateľa identity:
   a. Proces pokračuje alternatívnym scenárom „Prihlásenie cez email“.
4. KEĎ používateľ zvolí prihlásenie pomocou mobilnej aplikácie:
   a. Proces pokračuje alternatívnym scenárom „Prihlásenie cez mobilnú aplikáciu“.
5. Používateľ zadá prihlasovacie údaje a potvrdí prihlásenie.
6. KEĎ prihlasovacie údaje nie sú správne:
   a. Systém zobrazí chybovú hlášku.
   b. Proces pokračuje krokom 5 základného scenára.
7. Systém prihlási používateľa do klientskej zóny v správnom tenantovi.
8. Systém spustí prípad užitia „Zobraziť prehľad úveru“.
9. Prípad užitia končí.

## Alternatívny scenár: Prihlásenie cez email

1. Systém presmeruje používateľa na externého poskytovateľa identity.
2. Používateľ potvrdí spracovanie údajov.
3. KEĎ v systéme neexistuje používateľ s daným emailom:
   a. Systém zobrazí chybovú hlášku.
   b. Proces pokračuje krokom 2 základného scenára.
4. Proces pokračuje krokom 7 základného scenára.

## Alternatívny scenár: Prihlásenie cez mobilnú aplikáciu

1. Používateľ naskenuje QR kód pomocou mobilného zariadenia obsahujúceho deeplink do mobilnej aplikácie.
2. Systém overí použitie overovacieho tokenu v Loan service.
3. KEĎ je klient overený:
   a. Proces pokračuje krokom 7 základného scenára.
4. INAK:
   a. Systém obnoví QR kód.
   b. Proces pokračuje krokom 2 základného scenára.

---

**Poznámky k vzoru:** krok "Systém spustí prípad užitia" ukazuje návaznost UC na jiný UC. Alternativní scénáře se vždy vážou na konkrétní krok základního scénáře a vždy definují návrat (např. "Proces pokračuje krokom X") nebo ukončení.
