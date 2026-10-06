# FF – Metodika UC (Use Case)

Pro tvorbu a kontrolu UC používej vzor „VZOR-Případ užití.pdf“ (viz `vzor-pripad-uziti-1.md` a `vzor-pripad-uziti-2.md` v tomto adresáři).

## Co UC je a co není

UC:

- popisuje business proces,
- zachycuje průchod procesem uživatelem a systémem,
- **není** test case,
- **není** detailní UX wireflow.

## UC obsahuje

1. Název
2. Hlavní aktér
3. Vedlejší aktéři
4. Vstupní podmínky
5. Základní scénář
6. Alternativní scénáře
7. Výstupní podmínky
8. Výjimky
9. Poznámky, pokud jsou potřeba

## Zásady psaní kroků

Jeden krok UC reprezentuje **jednu významovou operaci procesu**. Slučuj související akce do logických celků a neatomizuj UI mikroakce.

Pokud je akce provedena tlačítkem, uveď název tlačítka přímo v kroku, ale nevytvářej samostatný krok pouze pro kliknutí.

**Preferovaný styl:**

- „Uživatel zahájí vytvoření záznamu pomocí tlačítka ‚Nový spor‘.“
- „Uživatel zadá údaje klienta a pomocí tlačítka ‚Vyhledat‘ načte klienta.“

**Nepreferovaný styl:**

- „Uživatel klikne na tlačítko.“
- „Systém otevře nové okno.“
- „Uživatel zkontroluje údaje.“

Používej zanoření kroků, pokud více akcí patří do jedné logické operace. Preferuj maximálně jednu úroveň zanoření.

## Alternativní scénáře

Alternativní scénář musí:

- odkazovat na konkrétní krok,
- popsat odchylku od hlavního flow,
- definovat návrat do flow nebo ukončení procesu.

Běžné validační chyby můžeš uvádět inline v základním scénáři.

## Kontrola před dokončením UC

- zda každý krok přináší procesní hodnotu,
- zda flow tvoří průchodný proces,
- zda alternativní scénáře obsahují návrat nebo ukončení,
- zda nejsou vymyšlené informace.
