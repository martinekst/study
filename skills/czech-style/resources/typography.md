# Czech typography

Invisible on screen, obvious in print and in a PDF export. These are
the rules that make a document look like it came from a professional
rather than from a text editor's defaults.

## Uvozovky

- **VŽDY** české: `„text"` (dolní otevírací, horní zavírací).
- **NIKDY** `"text"` (rovné) ani `"text"` (anglické).
- Vnořené uvozovky: `„vnější ‚vnitřní' text"`.
- V Markdownu pozor na automatické nahrazování — ověřit ve výstupu.

## Pomlčky a spojovník

| Znak | Název          | Použití                                                                |
| ---- | -------------- | ---------------------------------------------------------------------- |
| `-`  | spojovník      | jen uvnitř slova: `česko-polský`, `e-mail`, `Brno-Tuřany`              |
| `–`  | pomlčka        | rozsahy bez mezer: `20–30 MD`, `Q1–Q2`, `2027–2029`; vsuvka s mezerami |
| `—`  | dlouhá pomlčka | vsuvka uprostřed věty — takto — s mezerami po obou stranách            |

NIKDY nepsat rozsah jako `20-30` se spojovníkem.

## Nezlomitelné mezery

Nezlomitelná mezera (`U+00A0`) brání tomu, aby na konci řádku zůstal
osamocený znak. **VŽDY** ji vkládat:

- Po jednopísmenných předložkách a spojkách: `k`, `s`, `v`, `z`, `o`,
  `u`, `i`, `a` — např. `v­ Praze`, `s­ klientem`, `a­ proto`.
- Mezi číslem a jednotkou: `20 MD`, `3 dny`, `200 zaměstnanců`,
  `10 %`.
- Mezi zkratkou a jménem: `Ing. Novák`, `č. 5`.
- V rozsazích s mezerami: `Q1 – Q2`.

Pozn.: v Markdownu je nezlomitelná mezera běžný znak, prettier ji
zachová. Vkládá se přímo do textu, ne jako `&nbsp;` — HTML entita by se
v exportu do PDF nebo Wordu mohla zobrazit doslova.

## Čísla, procenta, měna

- Tisíce oddělovat nezlomitelnou mezerou: `1 260 000 Kč`, ne `1260000`
  ani `1,260,000`.
- Desetinná čárka, ne tečka: `3,5 MD`.
- Procenta s mezerou, když jde o podstatné jméno: `sleva 20 %`.
  Bez mezery, když jde o přídavné jméno: `20% sleva`.
- Měna za číslem: `1 000 Kč`, `2,5 mil. €`.
- Rozsah částky: `1 000–2 000 Kč`.

## Datum a čas

- `8. srpna 2026` nebo `8. 8. 2026` (s mezerami po tečkách).
- NIKDY `8.8.2026` ani americké `08/08/2026`.
- Čas: `14:30`.
- Čtvrtletí: `Q1`, `Q1/2027` nebo `1. čtvrtletí 2027`.

## Výčty a interpunkce

- Odrážky tvořící větné části: malé písmeno, čárka na konci, poslední
  tečka.
- Odrážky tvořící samostatné věty: velké písmeno, tečka na konci.
- **Nemíchat oba styly v jednom seznamu.**
- Za dvojtečkou uvozující výčet malé písmeno, pokud položky nejsou věty.

## Zkratky

- `atd.`, `apod.`, `např.`, `tj.`, `tzv.` — vždy s tečkou.
- `cca` bez tečky.
- `MD` (člověkoden) — bez teček, s nezlomitelnou mezerou po čísle.
- Zkratky ve výčtu radši rozepsat: `například` místo `např.` na začátku
  věty.

## Kontrola před odevzdáním

```bash
# rovné uvozovky
grep -n '"' <files>

# spojovník v rozsahu čísel
grep -nE "[0-9]-[0-9]" <files>

# datum bez mezer
grep -nE "[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}" <files>

# jednopísmenné předložky s obyčejnou mezerou (kandidáti na nbsp)
grep -noE " [ksvzouai] [A-Za-zÁ-ž]" <files> | wc -l
```
