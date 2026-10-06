# Úsudková rubrika: co regex nevidí

Druhá vrstva hodnocení vedle deterministického detektoru. Pokrývá kategorie, které
upstream vede jako „LLM judgment only“ (`CATEGORIES.md` §C) a které podle měření
z 18. 8. 2026 tvoří slepé místo mechanického skóre (interní wiki stránky psané
výčtovým stylem: mechanické skóre 3 až 20 u doložitelně generovaného textu).

## Pravidla hodnocení

1. **Skóruje se PŘÍTOMNOST kategorie, ne počet výskytů.** Za každou kategorii
   uveď **nejvýš jeden** citát: ten nejjasnější důkaz, že jev v textu je. Skóre
   pak roste s počtem RŮZNÝCH kategorií (J1 až J8), ne s počtem instancí. Důvod:
   „kolik jich je“ je mezi běhy nestabilní (rozptyl skóre ±10), „je tu ta
   kategorie?“ je stabilní (±5). Neztrácej čas hledáním všech výskytů; stačí
   rozhodnout ano/ne a doložit to jedním citátem.
2. **Citát musí být doslovný** (4 až 15 slov). Ověřuje ho `scripts/judge-score.js`
   proti souboru; co v textu není, se zahodí. Bez citátu kategorie neplatí.
3. Rozhoduj **podle důkazu, ne podle dojmu**. Kategorie bez jasného citátu = 0,
   žádné „působí to strojově“.
4. U každé kategorie si přečti kontrapříklad. Když si nejsi jistý, kategorii
   nezapočítávej (stejný FN-bias jako u detektoru).
5. Výstup je JSON (formát dole), skóre počítá skript, ne model.
6. Citované ukázky a bloky kódu se nehodnotí (self-reference escape hatch platí).

## Kategorie

### J1 Synonymové cyklení

Rotace označení téže věci, aby se neopakovalo slovo („vývojáři… inženýři…
tvůrci… tým“). Lidský autor opakuje nejjasnější slovo.
Kontrapříklad: střídání zájmena a podstatného jména je normální anafora.

### J2 Převyprávění bez posunu

Odstavec nebo odrážka říká jinými slovy to, co už zaznělo, bez nové informace.
Test: kdyby se škrtla, čtenář nepřijde o nic.
Kontrapříklad: legitimní shrnutí na konci dlouhého dokumentu, které zhušťuje
(ne parafrázuje) argument.

### J3 Sebevýklad (meaning-telling)

Věta vykládá význam právě řečeného místo obsahu: „což podtrhuje důležitost…“,
„to ukazuje, že…“, „tím se potvrzuje…“. Významnost se tvrdí, ne dokládá.
Kontrapříklad: závěr, který z konkrétních čísel vyvozuje konkrétní důsledek.

### J4 Šablonová symetrie sekcí

Sekce dokumentu mají stejnou vnitřní strukturu a stejnou litanii (každá sekce
končí stejným výčtem; párové bloky „Silný X / Slabý X“; každá kapitola má
přesně tolik odrážek co ostatní). Instance = citát začátku dvou symetrických
bloků. Lidský text je nepravidelný, protože témata nejsou stejně velká.
Kontrapříklad: tabulka nebo číselník, kde je symetrie nosič dat.

### J5 Nafouknutá významnost

Běžná věc podaná jako zásadní: „hraje zásadní roli“, „je naprosto klíčové“,
superlativ bez podkladu. Počítej jen tam, kde text významnost ničím nedokládá.
Kontrapříklad: tvrzení o důležitosti s číslem, příkladem nebo důsledkem hned vedle.

### J6 Falešná koncese

„I když X, zůstává Y“ / „není jen A, ale i B“, kde obě poloviny jsou vágní
a nic se skutečně nepřipouští ani neváží.
Kontrapříklad: koncese s konkrétním obsahem na obou stranách.

### J7 Výčtová vata

Odrážky, které nejsou samostatné informace, ale parafráze sousedních odrážek
nebo rozepsání samozřejmosti. Test: sloučením tří odrážek do jedné se nic
neztratí. Instance = citát jedné nadbytečné odrážky.
Kontrapříklad: výčty konkrét (systémy, částky, jména, kroky s termíny).

### J8 Zaměnitelnost sekcí (reshuffle test)

Dokumentová kategorie. Když jde dvě sekce prohodit bez újmy
na návaznosti, protože na sebe nijak neodkazují a nic nebuduje na předchozím,
uveď citáty nadpisů obou sekcí jako jednu instanci.
Kontrapříklad: referenční dokumenty (číselníky, API reference), kde je
nezávislost sekcí správně; tam J8 nepočítej vůbec.

## Výstupní formát

```json
{
  "file": "cesta/k/souboru.md",
  "instances": [
    { "category": "J3", "quote": "což podtrhuje důležitost celého procesu" },
    { "category": "J4", "quote": "Přínosy řešení: Rychlost. Rizika řešení: Pomalost." }
  ]
}
```

Skóre pak spočítá `node scripts/judge-score.js <soubor.md> <nalezy.json>`:
ověří citáty, neplatné zahodí, a z platných spočítá hustotu na 1000 slov
stejnou saturující křivkou jako mechanický detektor.

## Zásady interpretace

- **Kombinuje se váha, ne skóre.** Skóre je saturující funkce a sčítat dvě
  skóre nejde (dvě šedesátky by přelezly strop). `judge-score.js` proto sečte
  váhy nálezů obou vrstev nad společným počtem slov a na součet aplikuje touž
  křivku `100·d/(d+120)`: evidence je aditivní, strop 100 drží saturace.
  Skript vypisuje všechna tři čísla: mechanické, úsudkové a kombinované.
- **Dvojí započtení hlídá skript**: úsudková instance, jejíž citát se překrývá
  s mechanickým nálezem, se zahodí.
- Interpretace vrstev: mechanická říká „kolik formálních tellů“, úsudková
  „kolik strukturní strojovosti“. Text může být čistý v jednom a špinavý
  v druhém (interní wiki: mechanicky 3, úsudkově 21, kombinovaně 22).

## Kalibrace úsudkové vrstvy (19. 8. 2026, presence-based)

Slepý běh: 48 souborů (24 lidských z obou korpusů, 24 doložených AI včetně
šesti Confluence stránek, tedy slepého místa mechaniky), neutrální názvy
souborů, 9 nezávislých soudců (Sonnet), citáty validované skriptem
(zahozeno 10 z ~56 navržených instancí). Skóruje se přítomnost kategorie
(W = 4 za kategorii), ne počet instancí. Výsledky:

| metrika | AUC | human medián / max | AI medián |
| --- | ---: | --- | ---: |
| mechanická | 0,878 | 6 / 20 | 30 |
| úsudková sama | 0,804 | 0 / 8 | 7 |
| **kombinovaná** | **0,969** | 6 / 20 | 32 |

- Kombinace zvedá záchyt přesně na slepém místě (Confluence stránky:
  mechanicky medián 15 → kombinovaně přes 20) a lidským textům skóre prakticky
  nemění. Práh 25 zůstal i pro kombinované skóre bez falešného obvinění
  (lidské maximum 20).

### Proč presence, ne počet instancí

Původní pravidlo počítalo každou instanci (W = 2,5 za instanci). Test
opakovatelnosti (5 nezávislých běhů LLM nad stejnými 4 texty, 19. 8. 2026)
ukázal, že počet instancí téže kategorie je mezi běhy nestabilní: rozptyl
kombinovaného skóre **±10** (jeden text vyšel 10 až 20 podle toho, jestli LLM
napočítal 2 nebo 5 instancí J4). Přechod na přítomnost kategorie rozptyl
**půlí na ±5** a AUC drží (0,977 → 0,969). Naměřeno na týchž datech:

| pravidlo | max rozptyl 5 běhů | AUC | human max |
| --- | ---: | ---: | ---: |
| instance, W=2,5 | ±10 | 0,977 | 20 |
| **presence, W=4** | **±5** | **0,969** | **20** |

Zbytkový rozptyl ±5 je jedna kategorie, kterou LLM občas navíc uvidí; je to
jeden krok, ne pět. Deterministické to není a být nemůže (je to LLM), ale
kvalitativní verdikt (nad/pod prahem) je napříč běhy stabilní.

- Stabilita mezi běhy kalibrace: 8 souborů soudily dvě nezávislé instance,
  všech 8 se po přechodu na presence shodlo (Δ 0).
- Omezení: jeden soudcovský model, 48 souborů, a obsah se zaslepení vzpírá
  (soudci poznali Wikipedii nebo junior.guru z textu samotného). Mechanická
  vrstva zůstává jediná plně deterministická; při tvrzeních o cizím textu
  reportuj obě čísla a citáty. Úsudkové/kombinované číslo ber jako pásmo (±5),
  ne bod.
