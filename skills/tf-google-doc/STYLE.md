# Grafická úprava TechFides – specifikace

Převzato z Google dokumentu **TechFides Hlavičkový papír v2**
(ID `1lU7_173Th3RkMI0MKQII_ZqPyRb0qa0xmUB84jOvgXU`, vlastník vaclav.miculka@techfides.cz),
z jeho DOCX exportu ze 30. 9. 2026. Soubory v `template/` jsou z tohoto exportu převzaté
beze změny (kromě odstraněných vložených fontů a loga; logo je původní PNG 1340×305 px).

## Stránka
| Vlastnost | Hodnota |
|---|---|
| Formát | A4 na výšku (11906 × 16838 twips) |
| Okraje | 2,54 cm (1 in) ze všech stran |
| Vzdálenost hlavičky / patičky od okraje | 1,27 cm (0,5 in) |
| Hlavička a patička | stejná na všech stránkách (bez odlišné první strany) |
| Jazyk textu | čeština (`w:lang="cs"`) |

## Hlavička
Logo TechFides (`template/word/media/logo.png`, „Let's Develop The Future“) zarovnané vpravo,
šířka 1287788 EMU (3,41 cm), výška 295951 EMU (0,78 cm).

## Patička
1. Vodorovná linka barvy `#A0A0A0`, výška 1,5 pt.
2. Řádek zarovnaný vpravo, Open Sans Light 9 pt:
   `techfides.cz` • `info@techfides.cz` • `Titanium Business Complex, Nové sady 25, 602 00 Brno-střed`
   (odkazy v barvě `#365f91`, oddělovače • Open Sans Medium `#365f91`), za tabulátorem číslo stránky
   (pole PAGE, Open Sans Light 10 pt).

## Písmo a styly odstavců
| Styl | Písmo | Velikost | Barva | Mezery |
|---|---|---|---|---|
| Normální text | Open Sans | 11 pt | černá | před 10 pt, řádkování 1,15, do bloku |
| Title (název dokumentu) | Open Sans Medium | 36 pt | `#434343` | na střed |
| Subtitle | Arial (výchozí Google, ve zdroji neupraveno) | 15 pt | `#666666` | za 16 pt |
| Nadpis 1 | Open Sans Medium | 18 pt | `#365f91` | před 24 pt, drží se s dalším odstavcem |
| Nadpis 2 | Open Sans SemiBold | 14 pt | `#365f91` | před 20 pt, za 10 pt |
| Nadpis 3 | Open Sans Medium | 12 pt | `#434343` (dark gray 4) | před 18 pt |
| Nadpis 4 | Open Sans SemiBold | 11 pt | `#434343` | před 16 pt |
| Nadpis 5 | Open Sans | 11 pt | `#666666` | před 12 pt, za 4 pt |
| Nadpis 6 | Open Sans kurzíva | 11 pt | `#666666` | před 12 pt, za 4 pt |

Všechny nadpisy mají `keepNext` + `keepLines` (nadpis nezůstane sám na konci stránky).

## Tabulky
| Vlastnost | Hodnota |
|---|---|
| Rámeček | 1 pt bílý (`#ffffff`), vně i uvnitř |
| Hlavička | pozadí `#365f91`, text tučný bílý |
| Tělo | pozadí `#f3f3f3` („dull white“) |
| Odsazení buňky | 0,06 in (86 twips) ze všech stran |
| Svislé zarovnání | na střed |
| Odstavce v buňkách | mezera před 0, řádkování 1,0 |
| Zarovnání | první sloupec vlevo, ostatní na střed (lze přepsat řádkem `|:--|:-:|--:|`) |
| Šířka | celá šířka textu (9026 twips), pevné rozložení; hlavička se opakuje na další stránce, řádky se nedělí |

## Seznamy
- Nečíslované: kolečka ● ○ ■ (ne pomlčky), odsazení 720 twips na úroveň, předsazení 360.
- Číslované: 1. → a. → i.
- Mezery jako v Google Docs: mezera před první položkou a za poslední, mezi položkami žádná.

## Odkazy v textu
Barva `#365f91`, podtržené (patička odkazy nepodtrhává; v těle podtržení ponecháno pro čitelnost).
