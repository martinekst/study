# VZOR – Případ užití: [CS - UC] Vytvoř záznam o sporu

| Pole | Obsah |
| --- | --- |
| **Případ užití** | Vytvoř záznam o sporu |
| **Hlavní aktér** | Uživatel BO |
| **Vedlejší aktéři** | APNU |
| **Vstupní podmínky** | Zalogovaný uživatel v Konzoli |

## Základní scénář

1. Uživatel zahájí vytvoření nového záznamu o sporu pomocí tlačítka „Nový spor“.
2. V novém okně uživatel postupně zadává potřebné informace:
   a. Uživatel vyplní RČ klienta, který podal reklamaci u fin. arbitra/ČNB.
   b. Systém na jeho základě dotáhne klientovi jméno a příjmení.
   c. Systém do pole Reklamované úvěry (případy) předvyplní všechny klientovy případy ve stavech `Enjoying`, `EarlyLate`, `ExtCollection`, `Failed`, `Closed`.
   d. Uživatel pomocí checkboxu vybere, které případy jsou v rámci sporu reklamovány.
   e. Uživatel vyplní datum začátku sporu a předmět sporu.
3. POKUD jsou vyplněna všechna pole a je zaškrtnutý alespoň jeden reklamovaný úvěr (případ), uživatel vytvoří nový záznam o sporu tlačítkem „Uložit a reportovat“.
4. Systém automaticky vytvoří nový spor v DB a odreportuje jej do APNU (strategie registrace události).
5. Případ užití končí.

## Alternativní scénáře

–

---

**Poznámky k vzoru:** jde o jednoduchý UC bez alternativních scénářů. Ukazuje styl zápisu kroků s předvyplněním dat systémem, podmínkovou logikou ("POKUD...") a odkazem na konkrétní název tlačítka přímo v textu kroku.
