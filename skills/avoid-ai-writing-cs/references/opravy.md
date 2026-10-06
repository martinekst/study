# Opravy: triáž nálezů a postup po „oprav to“

Když uživatel po auditu řekne „oprav všechny nálezy“ (nebo „ať to není slop“),
neopravuje se všechno stejně. Nálezy se rozdělí do tří košů podle toho, kdo může
rozhodnout. Plná automatika neexistuje záměrně: opravy, které mažou nebo doplňují
obsah, jsou autorská rozhodnutí a pravidlo Never inject je modelu zakazuje obejít.

Změřený poměr na reálných dokumentech (nabídky TF, mechanická vrstva): koš A ~8 %
váhy, koš B ~92 %, koš C se koncentruje v úsudkové vrstvě a v placeholderech.

## Koš A: automatika (aplikovat bez ptaní)

| Typ | Oprava |
| --- | --- |
| `quotes`, `quotes-unpaired` | přepsat na české `„ “` |
| `percent-spacing` | mezera dle významu: `70 %` (kolik), `70%` jen jako přídavné jméno (`70% pokrytí`) |
| `hyphen-as-dash` | spojovník ve funkci pomlčky → skutečná pomlčka `–`, nebo rovnou náhrada dle koše B |
| `ai-citation-markup` | smazat token (`citeturn…`, `oai_citation`…) |
| `ai-utm-source` | odstranit parametr z URL, odkaz zachovat |
| `normalization-flag` | odstranit neviditelné znaky, homoglyfy přepsat latinkou |
| `literal-markdown` | v `.txt` odstranit `**`/`#`, nebo soubor převést na `.md` (zeptat se jen při nejasném určení souboru) |

## Koš B: redakční přepis (model opraví sám, obsah se nemění)

Náhrady slovníkových hesel jsou v `cestina.md` §4a (formát Tell → Náhrada → Proč →
Kontrapříklad); tady je pravidlo pro strukturní typy:

| Typ | Oprava |
| --- | --- |
| `dash-connector` | podle funkce: dvojtečka (uvození), závorky (vsuvka), středník, nebo rozdělit větu; NIKDY mechanicky všechno na čárku |
| `tier1`, `sales-filler`, `hedge` | náhrada dle hesel; často je nejlepší slovo prostě škrtnout |
| `lexical-overuse` | opakované lemma vystřídat nebo věty sloučit |
| `tricolon` | nechat nejsilnější prvek, nebo trojici rozvést do konkrétní věty |
| `contrast-negation` | „nejde jen o X, ale Y“ → napsat přímo, co platí |
| `qa-staccato` | řečnickou otázku + odpověď → oznamovací věta |
| `bold-overuse` | tučné jen pro termíny/čísla, ne celé fráze |
| `emoji-heading`, `emoji-body`, `emoji-bullets` | odstranit (ikony UI a semafory jsou výjimka, ty detektor neskóruje) |
| `summary-heading`, `question-headings`, `title-case-heading` | věcný nadpis větnou sazbou |
| `uniform-sentences`, `uniform-paragraphs` | variovat délku: krátkou větu vedle dlouhé, sloučit odstavce |
| `single-para-sections` | sekce sloučit nebo doplnit strukturu podle obsahu |
| J1 synonymové cyklení | sjednotit na jeden termín a držet ho |
| J3 sebevýklad | meta-věty („v této sekci popíšeme…“) škrtnout |
| J5 nafouknutá významnost | zcivilnit: tvrzení bez superlativ |
| J2 převyprávění bez posunu | duplicitní pasáže SLOUČIT (dovoleno: informace nemizí, jen se neříká dvakrát) |

Při každém přepisu platí Never inject: nesmí přibýt fakt, číslo, jméno, datum ani
tvrzení, které v textu nebylo. Ubírat a zostřovat ano, přidávat ne.

## Koš C: autorská rozhodnutí (otázky na uživatele)

| Typ | Proč to nejde bez autora |
| --- | --- |
| `cz-placeholder` | hodnotu (`[Vaše jméno]`, datum) zná jen autor |
| chybějící fakta | text tvrdí něco bez podkladu, doplnit smí jen autor (Never inject) |
| J4 šablonová symetrie sekcí | oprava = restrukturalizace; může být záměr šablony |
| J7 výčtová vata | oprava = mazání položek; jen autor ví, co je reálný závazek |
| J8 zaměnitelnost sekcí | sekce potřebují obsahové rozlišení, které model nemá odkud vzít |

Formát otázek: číslovaný seznam, každá položka nese (1) co a kde (sekce/řádek),
(2) navrhovaný default, (3) co se stane bez odpovědi (nález zůstává a drží známku
dole). Uživatel tak může odpovědět jen čísly („1 ano, 2 škrtni, 3 nech“).

## Postup

1. Audit (známka + nálezy obou vrstev), pokud už neproběhl.
2. Triáž podle tabulek výš; nezařazený nový typ patří do koše B.
3. Aplikovat koše A + B v edit režimu (minimální zásahy, lidské pasáže nechat).
4. `node detector/validate.js <původní> <upravený>`: nesmí se změnit kód,
   tabulky, citace, URL, struktura nadpisů (mimo záměrné opravy nadpisů).
5. Re-scan → nová známka. Výsledný text si PŘEČÍST: cílem je text, který zní
   česky a lidsky, ne známka; oprava, po které věta skřípe, je špatná oprava.
6. Report uživateli: známka před → po, co se změnilo (po koších), diff, a
   číslované otázky koše C s defaulty.
7. Po odpovědích druhé kolo (aplikace + validate + re-scan) a finální známka.

## Očekávání ke známce

Realistický cíl opravy generovaného textu je pásmo ✅ (7,1+), po důkladném druhém
kole 🌟. Neslibovat 10,0: nula nálezů na netriviálním textu nemá ani většina lidské
prózy. A neoptimalizovat na metriku; když se známka zvedá, ale text zní hůř,
je to prohra, ne výhra.
