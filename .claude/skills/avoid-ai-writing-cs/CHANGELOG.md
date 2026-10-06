# Changelog

## 0.8.0 – 2026-08-20

### Pre-release audit (před sdílením)

- **Vyčištěny interní citáty**: ukázka výstupu v rubrika.md citovala záhlaví
  z interní Confluence stránky; nahrazeno syntetickým příkladem. Zároveň ukázka
  ukazovala 2 citáty téže kategorie, což odporovalo presence pravidlu; a J8
  neslo zastaralý „max 2 instance“ z éry počítání instancí.
- **Fingerprinty ignorují kód**: `oai_citation` v inline backticks pálil jako
  únik z chatu; fingerprint pass teď maskuje fenced bloky i inline kód
  (zero-width kontrola dál běží nad plným raw). Dokumentace o fingerprintech
  už není falešně pozitivní.
- **Dogfooding vlastní dokumentace**: SKILL.md a opravy.md měly rozbité české
  uvozovky („text" s ASCII koncem), což rozbíjelo self-reference maskování a
  citované příklady tellů pálily jako skutečné; plus em dash spojky. Po opravě
  SKILL.md 5,7 → 7,9 ✅, opravy.md 4,9 → 9,6 🏆. Zbylé nálezy jsou povahou
  dokumentace (výčty právě tří metrik, jednoodstavcové referenční sekce).
- Git historie čistá (0 commitů), žádné osobní cesty ani session artefakty,
  korpus nese licence a atribuci (CC BY-SA 4.0 / MIT, viz corpus/*/README).

### Fix flow: triáž oprav po „oprav to“

Nová `references/opravy.md`: nálezy se po auditu dělí do košů **A** (automatika:
typografie, fingerprinty), **B** (redakční přepis modelem: slovník, rétorika,
formátování, úsudkové J1/J3/J5 a slučování duplicit J2) a **C** (autorská
rozhodnutí: placeholdery, chybějící fakta, restrukturalizace J4/J8, mazání
výčtů J7). Postup: A+B rovnou v edit režimu → validate.js → re-scan → report
známky před/po + číslované otázky koše C s navrhovanými defaulty → druhé kolo.
Plná automatika záměrně neexistuje (Never inject: doplňovat a mazat obsah smí
jen autor).

- Změřeno na nabídkách: koš A ~8 % mechanické váhy, B ~92 %, C ~0 % (koncentruje
  se v úsudkové vrstvě). `cs-scan.js` nově vypisuje řádek „opravitelnost“
  (podíl košů na váze) a nese ho i v JSON (`fixBreakdown`).
- End-to-end ověření na reálném souboru z ai-audit v1 (169 slov): známka
  1,9 → 10,0 mechanicky, validate PASS (jen očekávané varování za přepsané
  nadpisy). Na plných dokumentech drží strop úsudková vrstva.

## 0.7.0 – 2026-08-20

### Známka 0–10 jako hlavní výstup

Interní skóre 0–100 (méně = lepší) je hustota nálezů, ne známka; pro komunikaci
se otáčí na **0–10, kde 10 = bez AI**. Převod není lineární inverze (ta by text
na prahu redakce vydávala za 85 % kvality), ale po částech lineární mapování
ukotvené na kalibrovaných prazích, s pásmy podle TFR stránky „Metriky oddělení“:

- interní 0 → 10,0 · 5 → 9,1 (🏆) · 10 → 8,1 (🌟) · 15 (práh redakce) → 7,1 (✅)
  · 20 → 6,1 (⚠️) · 25 (práh tvrzení) → 5,0 (❗/🚨 hranice) · 100 → 0,0.
- 10,0 = nula nálezů; na netriviálním textu prakticky nedosažitelné bez umělého
  stropu (lidské korpusy pooled interní 6–7 → známka 8,7–8,9 🌟).
- `gradeFromScore()`/`formatGrade()` v cs-patterns.js; jedno desetinné místo.

Výstupy: `cs-scan.js` vede známkou (`ZNÁMKA: 8,9/10 🌟 Nad očekávání`), pod ní
interní čísla a nová sekce „největší problémy“ (top typy nálezů podle podílu na
váze, s příkladem). `judge-score.js` vede známkou z kombinovaného skóre (±0,5).
JSON nese `grade` u pooled i per-file. SKILL.md: úsudková vrstva je standardní
součást hodnocení (známka se bere z kombinovaného skóre); formát odpovědi je
známka → detail → shrnutí problémů. Interní škála, prahy a kalibrace beze změny.

## 0.6.0 – 2026-08-19

### Fork: samostatný skill bez runtime závislosti na upstreamu

Skill bude žít ve sdíleném interním TF repu vedle dalších skillů, kde sibling-adresář
s upstreamem nedává smysl. Runtime závislosti byly malé, tak jsme je zabudovali.

- **4 fingerprint checky nativně v `cs-patterns.js`** (dřív se půjčovaly z upstream
  enginu za běhu): `ai-citation-markup`, `ai-utm-source`, `normalization-flag`
  (zero-width/homoglyf) a anglické placeholdery ve `cz-placeholder`. Regexy převzaté
  z upstreamu, teď vlastní. Běží nad surovým textem (utm_source je v cíli odkazu).
- **`detector/validate.js` zkopírován** do skillu (edit režim, jazykově nezávislý).
- **`cs-scan.js` zjednodušen**: pryč načítání upstreamu, `--no-upstream`,
  `AAW_UPSTREAM_DIR`, degradační režim. Volá jen vlastní detektor.
- **Zrušeno** `scripts/check-upstream.sh` a `UPSTREAM.lock`; SKILL.md už neodkazuje
  na `../avoid-ai-writing/`, metodika (režimy, „Never inject“, escape hatch, „signál
  ne důkaz") je vepsaná přímo. README/SKILL přepsané na samostatný skill, sekce Původ
  přiznává, co je forknuté.

### Opraveno při forku

- **Zero-width U+200D (ZWJ) v emoji se nepočítá jako bypass.** Emoji jako 🤷‍♂️ obsahují
  ZWJ; jeden lidský soubor (junior.guru) kvůli tomu vyskočil na 69. Nově: ZWJ obklopený
  piktogramy se ignoruje a práh je ≥2 neviditelné znaky (jeden z kopírování není trik).
- Testy 68 → 74 (přidány fingerprinty), kalibrace obou korpusů zůstává zelená.

## 0.5.2 – 2026-08-19

### Měření na reálném TFR registru + oprava trikolonu

Labelovaný vzorek z Confluence prostoru TFR (20 lidských stránek vytvořených
i needitovaných před 2025, 13 AI/smíšených z 2026). Mechanická vrstva na této
skutečné distribuci: **AUC 0,79 → 0,81** po opravě níže, tedy níž než 0,88 na
kurátorovaných korpusech. Důvod není chyba, ale povaha registru:
- AI úniky jsou výčtové wiki stránky (PC role, sebehodnocení: mech skóre 3-8) —
  přesně to, na co je úsudková vrstva; potvrzuje její smysl na reálných datech.
- Falešné poplachy jsou hlavně krátké poznámkové stránky a management-próza.

**Opraveno (čistá chyba v definici):** „X, Y a další / atd. / apod. / jiné“
není trikolon (otevřený výčet, ne rétorická trojice). Nález z reálné lidské
stránky „warehouse, databáze a další“. Odstranilo jeden falešný poplach.

### Kalibrační zjištění NEzaladěná (čekají na širší labelovaný vzorek)

Nebudu je měnit na pár stránkách; zapsáno jako cíl:
- Krátké dokumenty (<200 slov) přeskórují na jednotlivých P2 nálezech
  (spojovník-pomlčka, trikolon): 188slovní poznámka dostala 25 jen za 3 spojovníky.
  Per-instance checky by pod ~150 slov měly nést příznak nízké spolehlivosti,
  ne plné skóre.
- „klíčové“ a kontrastní negace pálí i na lidské management-próze (jedna lidská
  stránka měla „klíčové“ 9,6/1000, výš než dřívější lidský odhad). Práh
  lexical-overuse možná nízký pro tenhle registr; jeden doklad na změnu nestačí.

## 0.5.1 – 2026-08-19

### Úsudková vrstva: presence-based skórování (nižší rozptyl mezi běhy)

Test opakovatelnosti (5 nezávislých běhů LLM nad stejnými 4 texty) ukázal, že
původní počítání instancí dávalo rozptyl kombinovaného skóre až **±10** (počet
instancí téže kategorie je mezi běhy LLM nestabilní). Řešení: skóruje se
**přítomnost kategorie** (ano/ne), ne počet instancí. Váha 4 za kategorii.

- Rozptyl mezi běhy klesl z ±10 na **±5**, AUC drží (0,977 → 0,969 na 48
  labelovaných souborech), práh 25 zůstává bez falešného obvinění (human max 20).
- `judge-score.js` a `judge-aggregate.js` počítají různé kategorie, ne instance;
  zrušen speciální J8-limit (bezpředmětný při presence).
- Rubrika: soudce má u každé kategorie uvést **nejvýš jeden** citát (ten
  nejjasnější), ne hledat všechny výskyty. Míň práce, stabilnější výstup.
- Výstup skriptu ukazuje počet kategorií a u kterých bylo v textu víc výskytů,
  ať je vidět evidence; skóre se ale řídí jen přítomností.
- Deterministické to není a být nemůže (je to LLM); rozptyl ±5 je jedna
  kategorie navíc. Mechanická vrstva zůstává jediná plně deterministická,
  úsudkové číslo se reportuje jako pásmo.

## 0.5.0 – 2026-08-18

### Kalibrace úsudkové vrstvy

Slepý běh na 48 souborech (24 lidských, 24 doložených AI včetně šesti Confluence
stránek), 9 nezávislých soudců (Sonnet), citáty validované skriptem (zahozeno 10
z ~56 instancí). AUC: mechanická 0,878, úsudková sama 0,813, **kombinovaná 0,977**.
Kombinace zvedá záchyt na slepém místě mechaniky (Confluence medián 15 → 22)
a lidským textům nehýbe (2 z 24 s instancemi, max +5; práh 25 zůstává bez
falešného obvinění, lidské maximum 20). Stabilita: 7 z 8 opakovaných souborů
shodných, jeden Δ7. Nový `scripts/judge-aggregate.js` pro opakování kalibrace.
Omezení zapsaná v rubrice: jeden soudcovský model, n = 48, obsah se zaslepení
vzpírá.

## 0.4.1 – 2026-08-18

### Kombinované skóre

- Nový export `scoreFromWeight(weight, words)`: jediné místo, kde se z váhy
  nálezů stává skóre (analyzeText, pooledScore i judge-score ho sdílejí).
- `judge-score.js` počítá vedle mechanického a úsudkového i **kombinované
  skóre**: váhy obou vrstev se sčítají (aditivní evidence) nad společným
  počtem slov a strop 100 drží tatáž saturující křivka. Skóre samotná se
  nesčítají, protože saturace není lineární.
- Dvojí započtení: úsudková instance s citátem překrývajícím mechanický nález
  se vyřazuje.
- Kombinované číslo je nekalibrované, dokud úsudková vrstva neprojde měřením
  na korpusu; sonda: „Dobrý PC výstup“ 3 + 21 → 22, „Odpovědnosti a hranice
  PC“ 15 + 13 → 25, lidská kontrola 4 + 0 → 4.

## 0.4.0 – 2026-08-18

### Úsudková vrstva (druhé skóre)

Podnět: šest interních Confluence stránek s doloženým AI původem prošlo mechanickým
detektorem se souhrnem 14 (dvě stránky 3 a 5). Jejich strojovost sedí v kategoriích,
které upstream vede jako „LLM judgment only“ a regex je neumí.

- `references/rubrika.md`: kategorie J1–J8 (synonymové cyklení, převyprávění bez
  posunu, sebevýklad, šablonová symetrie sekcí, nafouknutá významnost, falešná
  koncese, výčtová vata, zaměnitelnost sekcí), každá s kontrapříkladem.
- `scripts/judge-score.js`: model instance jen navrhuje; skript každý citát ověří
  proti textu (normalizace bílých znaků a uvozovek), halucinované zahodí a skóre
  spočítá stejnou saturující křivkou. Každý bod skóre má doložitelný citát.
- Úsudkové skóre se reportuje VEDLE mechanického, nikdy se nesčítají. Je zatím
  nekalibrované (bez lidské baseline a měření rozptylu mezi běhy); do kalibrace
  ho brát jako strukturovaný nález s citáty, ne jako klasifikátor.
- První sonda: „Dobrý PC výstup“ mechanicky 3 → úsudkově 21 (6 instancí);
  „Odpovědnosti a hranice PC“ 15 → 13 (7 instancí); lidská kontrola
  (junior.guru CV handbook, 4200 slov) 0 instancí.

## 0.3.0 – 2026-08-18

Převzetí ověřených nápadů z 15 aktivních forků upstreamu (z 282 forků má vlastní
commity jen 17; průzkum + spot-check dokladů). Každý kandidát na skórování prošel
měřením na labelovaných sadách; většina skončila jako judgment pravidlo nebo
doložený negativní nález, přesně podle zásady „bench před severitou“.

### Přidáno

- **Check `literal-markdown`** (P2): `**` a `#` v `.txt` souborech je otisk vložení
  z chatu (Wikipedia: Signs of AI writing přes fork lolvut). V `.md` neplatí.
- **`examples/test-corpus.md` + `detector/test-corpus.test.js`**: vykonatelný
  testovací korpus po kategoriích, 10 realistických cases s očekávanými nálezy
  (formát z forku navyapdh11, tady strojově kontrolovaný, součást `npm test`).
- **Formát hesel Tell → Náhrada → Proč → Kontrapříklad** v `cestina.md` §4a
  (z německé portace gardenbaum): sporná hesla nesou povinný kontrapříklad
  z lidské prózy, který flag spustit nesmí.
- **Nové judgment kategorie** v `cestina.md` §4c: integrita citací (jen flagovat,
  nikdy „opravovat“ DOI), falešný rozsah, souhlasnost, kancelárit a řetězce
  genitivů (obojí z nezávislých ruských vrstev kimsanbaev-karim a mkapyrin).
- **Test fixtures pro density gate** (lekce z forku wilu222): `bold-overuse`
  a `lexical-overuse` neměly po zavedení 200slovního gate žádnou fixture, která
  by je mohla spustit; testy by prošly i s rozbitým checkem.

### Změřeno a zamítnuto (neskóruje se)

- Řetězec 3+ nominalizací: 0 výskytů na všech sadách (128 tis. slov).
- `---` oddělovače sekcí: anti-signál (lidský markdown 0,62/1000, generované 0).
- Přeskočená úroveň nadpisů: ~0 všude.
- Souhlasné fráze: 2× v lidském korpusu, 0× v generovaných nabídkách.

## 0.2.0 – 2026-08-18

Druhý ladicí průchod, tentokrát na nabídkách tech-audit a it-analysis (19 tis. slov).
Hlavní zjištění: prahy formátovacích pravidel nebyly kalibrované, protože jediný korpus
byl encyklopedický. Přidána druhá baseline a metrika, která nekalibrovaný check pozná.

### Přidáno

- **`corpus/registr2/`: druhý kontrolní korpus, 99 550 slov lidsky psaného českého
  markdownu** ze čtyř zdrojů (naucse-python, junior.guru, derisking-handbook,
  cesko-digital/blog), všechno z revizí před 1. 1. 2023 doložených git historií.
  Bez něj se emoji, tučné ani pomlčky kalibrovat nedaly: Wikipedie je nemá ze své
  podstaty. Kalibrační brána teď hlídá oba registry (108 641 slov).
- **`scripts/bench.js`: diskriminační poměr.** Pro každý check spočítá hustotu nálezů
  proti vyšší z lidských baseline. Poměr ~1 znamená, že check o původu textu nic neříká.
  Odhalil, že `hedge` (×0,5 až ×0,7), `quotes` (×0), `tier2` (×1,1) a `sales-filler`
  (×1,0) nediskriminují.
- **Check `lexical-overuse`:** nadužití jednoho tier1 lemmatu (≥3 výskyty a >1,5/1000
  na dokumentu od 200 slov). Nahrazuje bývalou P1 severitu za každý výskyt „klíčový“.
- **Checky `emoji-status` a `emoji-ui-icon`** (oba mimo skóre): barevný RAG semafor
  v hodnotící tabulce je deklarovaná notace, emoji v HTML komponentě je věc šablony.
- **Délkový gate podle upstreamu** (`patterns.js:1162`, README §Length gates): text pod
  10 slov vrací `score: null` a label „Příliš krátké“ místo skóre 0. `public/robots.txt`
  s devíti slovy dřív figuroval jako skenovaný dokument.

### Změněno

- **Emoji se hlásí agregovaně na dokument, ne na řádek.** Per-řádkové hlášení dávalo
  176 nálezů v tech-auditu z jednoho redakčního zvyku a emoji tak tvořila 52 % veškeré
  váhy skóre a 73 % všech P1. Nový práh: ≥2 nadpisy nebo ≥30 % nadpisů souboru.
- **Dlouhá pomlčka má hustotní severitu.** Pod 4 výskyty na 1000 slov je P2, ne P1:
  junior.guru (lidský text z 2021) má 1,04/1000 a nejhustší soubor 3,8, protože jí autor
  nahrazuje českou pomlčku. Generovaný text má 27,45/1000.
- **Česká pomlčka `–` do skóre nevstupuje vůbec.** Dřívější práh 12/1000 trestal správnou
  sazbu: lidské korpusy mají 10,5 a 3,7/1000, jednotlivé soubory až 13.
- **`bold-overuse` počítá jen tučné uvnitř prózy** (mimo tabulky, nadpisy a vedoucí
  hlavičky odrážek). V původní podobě měřil „používá dokument tučné“ a pálil i na lidské
  dokumentaci (4,72/100 → 0,18/100 po rozdělení).
- **`tricolon` vyžaduje uzavřený tříčlenný výčet.** Dřív matchoval tříslovné okno uvnitř
  delšího výčtu, což je opak měřeného jevu (10 z 34 a 28 z 62 nálezů byly části pěti-
  a sedmičlenných výčtů). Výčet v tabulce nebo odrážce dostává P3.
- **Prahy stylometrie:** `uniform-sentences` cv 0,38 → 0,45 a minimum 8 → 12 vět,
  `uniform-paragraphs` cv 0,35 → 0,45.
- **Hustotní checky mají minimum 200 slov.** Tři tučné úseky na 22 slovech dávaly
  13,6/100 a skóre 69 lidskému textu.
- **Strop na mechanické typografické chyby:** první tři výskyty `quotes-unpaired`,
  `hyphen-as-dash` a `percent-spacing` v souboru se počítají plnou vahou, další jsou
  jen vypsané. Jedna sed-opravitelná záměna opakovaná 46× není 46 signálů.

### Opraveno

- **`ciPer1000` měřila zkratku CI, ne spojku „či“.** Vzor `/\bci\b/gi` běžel nad
  odháčkovaným textem, takže v tech-auditu matchoval „CI“ 53× a „ci“ 9×, ale „či“ jen 1×.
  Experimentální čítače teď běží nad `visible` s diakritikou. Kvůli tomuhle bugu jsem
  původně vyhodnotil tvrzení zdroje o „nebo/či“ jako obrácené, což neplatilo.
- **`emoji-bullets` střílel na HTML komponenty.** Check běžel nad textem po `stripHtml`,
  který značku nahradí mezerami, takže `<span class="tf-card__icon">🔍</span>` vypadal
  jako odrážka začínající emoji. Role glyfu se teď určuje na surovém řádku.
- `emoji-body` už nepočítá technické šipky (→, ↑) ani statusové glyfy.
- `hyphen-as-dash` vypisuje skutečný kontext nálezu místo natvrdo vloženého `'  -  '`.

### Kalibrace po zásazích

| sada | soubory | slov | skóre min/med/max |
| --- | ---: | ---: | --- |
| lidská encyklopedie | 5 | 9 091 | 0 / 6 / 8 |
| lidský markdown | 52 | 99 550 | 0 / 6 / 22 |
| doložitelně generovaný text | 21 | 11 083 | 12 / 57 / 75 |
| tech-audit | 32 | 11 375 | 0 / 30 / 43 |
| it-analysis | 22 | 7 528 | 0 / 24 / 43 |

Před zásahy měly nabídky medián 62 a 56, ale skoro celou váhu jim dělala emoji
v nadpisech. Lidský markdown měl max 28 a po přechodném zavedení hustotních checků
bez minima na délku dokonce 69.

### Ověření na labelovaných datech

Zadavatel potvrdil, že všechny čtyři auditované nabídky jsou generované a u jedné
proběhla lidská revize. Tím vznikla první labelovaná sada a klasifikaci šlo změřit
přímo (`scripts/roc.js`, nový): na prozaických souborech od 200 slov je **AUC 0,957**
(78 generovaných proti 52 lidským). Práh 15 zachytí 94 % generovaných při 8 % falešných,
práh 25 zachytí 71 % při nulové falešné míře.

Dva nálezy z toho:

- **Revize odstranila jeden jev, ne strojový charakter.** Medián revidované nabídky
  spadl ze 57 na 28, ale podíl souborů nad prahem 15 jen z 95 na 88 %. Ablace to
  potvrdila tvrdě: mechanická výměna znaku `—` za `–` ve staré verzi dá medián 28,
  tedy přesně stejné skóre jako celý přepis. Dlouhá pomlčka tvořila 77 % veškeré váhy
  staré verze; ostatní checky mají v obou verzích skoro identickou váhu
  (emoji-heading 103 a 103).
- **Ztišení `tier1` je měřený kompromis, ne vítězství.** Ablace zpět na P1 zvedá AUC
  o 0,003 (v šumu) a při prahu 25 zachytí 79 % místo 71 %, ale při prahu 15 zvedá
  falešnou míru z 8 na 13 %. Zůstává slabým nálezem, protože nižší falešná míra je
  u nástroje na redakci vlastního textu důležitější; nadužití pokrývá `lexical-overuse`.

### Experimentální metriky: doložený negativní nález

Všech pět (`nebo`, `či`, `bude`, nominalizace, `který`) zůstává mimo skóre a nově
s čísly, proč tam nemají co dělat. Nejsilnější doklad: nominalizace mají v lidské
encyklopedii 45,2/1000 proti 27,0 v generovaném textu (RR 0,53, p < 10⁻¹⁶), a rozptyl
uvnitř jednoho registru je 27 až 47. Metrika „který“ má nejvyšší hodnotu z celé sady
právě u lidského korpusu (10,8), takže pravidlo „hodně který = AI“ by flagovalo
nejdřív lidskou prózu. Zdroje obou tvrzení (fakticky.cz, skolstvikhk.cz) je uvádějí
bez měření a jako relativní poměr, ne jako absolutní hustotu.

## 0.1.0 – 2026-08-18

Vznik samostatné nadstavby. Česká vrstva do té doby žila uvnitř upstream adresáře
a patchovala jeho `SKILL.md`; každý upgrade upstreamu ji přepsal.

### Přidáno

- Samostatný `SKILL.md` (vstupní bod pro češtinu) a vazba na upstream přes
  `scripts/check-upstream.sh` + `UPSTREAM.lock` místo patchování.
- Nové checky z rešerše českých zdrojů (aibility.org, fakticky.cz, skolstvikhk.cz,
  energozrouti.cz): chatbot artefakty, „Pojďme“ otvíráky, falešné prozření, vágní
  autority, hedge-stack, falešná šíře („ať už jste X, nebo Y“), budoucí narativ,
  staccato otázka–odpověď, aforismové formule, sumární sekce, otázkové nadpisy,
  Title Case v nadpisech, emoji odrážky, mezititulek + jeden odstavec, uniformita
  odstavců, české placeholdery.
- Slovníky: „transformační“, „průlomový“, „nedílná součást“, „přináší řadu výhod“,
  „na konci dne“, „ve světě, kde“, „fascinující“, „přidaná hodnota“, „může být
  užitečné“, „ekosystém“.
- Experimentální metriky mimo skóre (`stats.experimental`): nebo/či, bude,
  nominalizace, který.
- `cs-scan.js` přibaluje jazykově neutrální fingerprinty z upstream enginu
  (placeholdery, citační artefakty, `utm_source`, zero-width znaky) s degradací
  bez upstreamu.
- Testy (`detector/cs-patterns.test.js`, 55 kontrol) a kalibrační brána
  (`scripts/fp-measure.js`) nad commitnutým lidským korpusem (česká Wikipedie,
  CC BY-SA 4.0, 9 100 slov).
- Obecný český house-style config `examples/cs.json` pro upstreamové `--style`.

### Opraveno

- JS `\b` je ASCII: vzory končící diakritikou („dob[ěe]\b“) na správně napsané
  češtině tiše selhávaly. Slovníky teď běží nad odháčkovanou kopií textu
  (mapování 1:1, indexy platí) a odháčkovává se i zdroj vzoru.
- `emoji-body` už nepočítá technické šipky (→, ↑); v těle textu jen piktogramy.
- `percent-spacing` degradováno na P3 upozornění: „70% pokrytí“ je správné
  přídavné jméno a regex ho od chybějící mezery nerozliší.
- `stats.emDashes` nepočítá carve-outy (oddělovače v seznamech a tabulkách).

### Kalibrace

- Na lidském korpusu: „na míru“, „nikoli(v)“ a intenzifikátory skutečně/opravdu/
  reálně/prakticky degradovány na slabé nálezy (P3); korektní pomlčka – se do
  skóre počítá až nad lidskou hustotou 12/1000 slov (korpus: 10,3/1000).
- Výsledek: lidská próza 9–22 (práh 25), známý generovaný text 70–78.
