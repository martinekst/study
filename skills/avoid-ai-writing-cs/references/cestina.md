# Čeština: jazyková vrstva

Původní anglická metodika (z níž tenhle skill forkuje) řeší angličtinu; principy platí
i pro češtinu, slovníky ne: `delve`, `leverage`, `robust` v českém textu prostě nejsou,
a naopak česká generovaná próza má vlastní otisky, které anglický detektor nevidí.
Tahle stránka je jazyková vrstva k `SKILL.md`: pravidla o režimech (rewrite / detect /
edit), o tom, co se nesmí přidávat („Never inject these“), a o tom, že jde o signál a ne
o důkaz, platí beze změny.

Mechanická část je v `detector/cs-patterns.js`, spouští se přes:

```bash
node detector/cs-scan.js <soubor|adresář> [--json] [--min P1|P2|P3]
```

Detektor pokrývá lexikum, pomlčky, uvozovky, emoji, tučné, trikolony, konverzační tiky,
rétorické vzory, strukturu sekcí, stylometrii a opakované n-gramy napříč soubory. K tomu
si půjčuje jazykově neutrální fingerprinty z upstream enginu (placeholdery, citační
artefakty chatů, `utm_source` AI nástrojů, zero-width znaky). Zbytek téhle stránky je to,
co musí posoudit člověk nebo model.

Pozn.: tenhle soubor sám v detektoru skóruje vysoko a to je v pořádku: je to katalog
příkladů. Citace v uvozovkách `„ “` detektor přeskakuje, tabulku hesel ale maskovat
neumí. Na vlastní dokumentaci se proto scan pouští bez `references/`.

## 1 Typografie: v češtině je to zároveň jazyková chyba

Základní znak je v češtině **pomlčka `–` (U+2013)**, oddělená z obou stran mezerami; bez
mezer se sází jen u rozsahů a vztahů s jednoslovnými členy (8–16 h, Praha–Brno).
**Spojovník - (U+002D)** je krátká čárka bez mezer ve složeninách. Zdroj: Internetová
jazyková příručka ÚJČ AV ČR, hesla [Pomlčka](https://prirucka.ujc.cas.cz/?id=165)
a [Spojovník](https://prirucka.ujc.cas.cz/?id=164).

Pozor na příliš silné tvrzení, které se o tomhle často opakuje (např. Živě.cz: „jediný
znak zaručeně prozradí, že text psala AI“): **dlouhá pomlčka `—` není v češtině zakázaná
a existují čeští autoři, kteří ji používají systematicky.** IJP ji výslovně připouští
a sama ji používá, jen požaduje jednotnost.

Měření na dvou lidských korpusech (celkem 108 tis. slov, hustoty na 1000 slov):

| sada | `—` | `–` |
| --- | ---: | ---: |
| encyklopedie (Wikipedie) | 0,00 | 10,45 |
| markdown: naucse | 0,03 | 6,26 |
| markdown: blog Česko.Digital | 0,00 | 4,71 |
| markdown: derisking-handbook | 0,00 | 5,35 |
| **markdown: junior.guru** | **1,04** | 0,13 |
| doložitelně generovaný text | **27,45** | 1,68 |

Tři ze čtyř lidských markdownových zdrojů `—` nepoužívají vůbec, ale junior.guru jí
**nahrazuje českou pomlčku** („Klíčový je souhrn — co umíš za technologie?“), takže tam
vychází 1,04/1000 a nejhustší soubor 3,8. Generovaný text má 27,45/1000 a nejhustší
soubor 52,6. Nález se proto staví na hustotě, ne na prvním výskytu: pod 4/1000 to může
být autorský styl (detektor dává P2), nad tím je to vzorec (P1). Dlouhá pomlčka rozliší
**autora**, ne stroj; co ho rozliší, je její hustota.

Korektní česká pomlčka `–` do skóre nevstupuje vůbec: je to znak, který čeština
předepisuje, a lidské korpusy ho mají 3,7 až 10,5/1000, jednotlivé soubory až 13.

Další body, na kterých se pozná redigovaný text od neredigovaného:

- **Uvozovky**: česky „takto“ (U+201E dole, U+201C nahoře). Anglické “ ” nebo rovné " "
  v české próze jsou chyba. Pozor: u kódu, cest a identifikátorů rovné uvozovky zůstávají.
- **Nezlomitelná mezera** patří mezi číslo a jednotku (79 000 Kč, 39 kontrol, 12 let),
  za jednopísmenné předložky (v, k, s, z, o, u, a) a mezi číslo a %.
- **Rozsahy** se sázejí pomlčkou bez mezer: 1–3, 2024–2026, 70–90 %. Ne spojovníkem.
- **Procenta**: „70 %“ s mezerou znamená sedmdesát procent, „70%“ bez mezery je přídavné
  jméno (sedmdesátiprocentní). Který význam autor chtěl, regex nepozná, proto detektor
  jen upozorňuje (P3); rozhodnout musí čtenář.
- **Tři tečky** jsou znak … (U+2026), ne tři samostatné tečky.
- **Velká písmena v nadpisech**: čeština píše nadpisy větnou sazbou. Title Case
  („Strategické Partnerství A Klíčové Výhody“) je v češtině ještě silnější signál než
  v angličtině, protože ho nepodporuje žádná česká typografická norma.

## 2 Lexikum: české ekvivalenty Tier 1

Slova, u kterých v odborném nebo prodejním textu stojí za to sáhnout po náhradě vždycky.
Nejde o zákaz slova, jde o to, že skoro pokaždé zastupují chybějící konkrétnost.

| Místo                                    | Napiš                                            |
| ---------------------------------------- | ------------------------------------------------ |
| klíčový                                  | důvod, proč je to podstatné                       |
| robustní                                 | spolehlivý, odolný (a čím to je doložené)         |
| komplexní řešení                         | z čeho se to skládá                               |
| bezproblémový                            | vypustit                                          |
| na míru                                  | co se čemu přizpůsobuje                           |
| přelomový, průlomový, revoluční, inovativní | co se konkrétně změnilo                        |
| transformační                            | co se mění a v čem                                |
| špičkový, prémiový                       | doložit, nebo vypustit                            |
| synergie                                 | jaká vazba mezi čím                               |
| posunout na další úroveň                 | o kolik se co zlepší                              |
| široká škála                             | výčet                                             |
| nedílná součást                          | vypustit, nebo říct proč                          |
| přináší řadu výhod                       | vyjmenovat je                                     |
| v dnešní (uspěchané) době, v dnešním světě | vypustit, nebo datum                            |
| ve světě, kde …                          | začít věcí samotnou                               |
| je důležité poznamenat, stojí za zmínku  | vypustit a tvrdit rovnou                          |
| hraje klíčovou roli                      | co konkrétně dělá                                 |
| v neposlední řadě                        | vypustit                                          |
| dynamicky se rozvíjející                 | vypustit                                          |
| vytěžit maximum                          | kolik a z čeho                                    |
| na konci dne                             | kalk „at the end of the day“: vypustit            |
| „X je nová ropa / nové zlato“            | aforismová formule: napsat konkrétní tvrzení      |

Anglické kalky, které v česky psaném IT textu prozrazují strojový překlad myšlenky:
`adresovat` problém (řešit, pojmenovat), `dedikovaný` (vyhrazený, samostatný),
`implementovat` (zavést, nasadit, naprogramovat), `alokovat`, `deliverable` bez překladu,
`v rámci` jako univerzální spojka, `robustnost` jako vlastnost čehokoli.

Tier 2 (samo o sobě v pořádku, ve shluku signál): efektivně, proaktivně, průběžně,
výrazně, podstatně, umožňuje, zajišťuje, představuje, realizovat, přístup, možnost,
transparentní, měřitelný, předvídatelný, fascinující, přidaná hodnota, může být užitečné,
ekosystém (jako metafora). Dvě a víc v jednom odstavci znamená, že odstavec neříká nic,
co by šlo ověřit.

Tier 3 (hlídat hustotu, ne jednotlivý výskyt): nominalizace obecně. Čeština generovaná
modelem tíhne k podstatným jménům slovesným („zajištění dodržování“, „provedení
vyhodnocení“, „za účelem zvýšení“) tam, kde lidský autor napíše sloveso. Když v odstavci
připadá víc než jedno takové na větu, je to strojová syntax bez ohledu na slovník.

## 3 Stavba věty, odstavce a stránky

- **Kontrastní negace** je v češtině stejně silný signál jako v angličtině a má víc podob:
  „není to X, ale Y“, „nejde jen o X, ale o Y“, „ne X, nýbrž Y“, „měříme X, ne Y“,
  a rozdělená varianta ve dvou větách („Nerozhoduje nasazený nástroj. Rozhoduje zralost.“).
  Rozdělenou variantu regulární výraz nechytí, hledá ji člověk. Pravidlo: nejvýš jedna
  na celý text, a jen když nese argument.
- **Trikolon**: tři členy ve výčtu, tři karty, tři pilíře, tři otázky. Jednou je to rytmus,
  potřetí na jedné stránce je to generátor. Zkus dva nebo čtyři členy. Kontrolní korpus:
  1,0 trikolonu na 1000 slov; generovaný marketing mívá trojnásobek.
- **Staccato otázka–odpověď**: „Výsledek? Rychlost.“ Infomercial rytmus, který má
  simulovat švih. Jednou za text snesitelné, opakovaně je to vzorec.
- **Vsuvka mezi pomlčkami** jako univerzální nástroj rozvíjení věty. Česká věta má
  vedlejší věty, dvojtečku a středník; když se v odstavci objeví tři pomlčkové vsuvky,
  autor jen lepil myšlenky za sebe.
- **Symetrie bloků**: každá karta má nadpis a přesně jednu větu, každá sekce má stejný
  počet položek, každá stránka končí stejnou pobídkou. Lidský text je nepravidelný.
- **Mezititulek + jeden odstavec**: když má většina sekcí právě jeden odstavec, text
  nepsal nikdo, kdo by měl co říct; jen se plnila šablona (zdroj: skolstvikhk.cz, potvrzuje
  se na generovaných webech).
- **Otázka jako nadpis** s okamžitou odpovědí pod ní („Proč to řešit teď?“) je zvyk
  generovaných landing pages. Jednou budiž, třikrát na webu je vzorec.
- **Shrnutí, které nic nepřidává**: sekce „Závěrem“, „Shrnutí“, „V kostce“, která zopakuje
  předchozí odstavce jinými slovy. Generátory je sázejí automaticky (zdroj: energozrouti.cz,
  skolstvikhk.cz). Buď nese nové info, nebo pryč.
- **Emoji odrážky** ✅ 🚀 💡 místo textových odrážek, markdownové hvězdičky v prostředí,
  které markdown nerenderuje, a bloky hashtagů: otisky výstupu z chatu.

## 4 Rétorika, kterou pozná i netextař

- **Umělá naléhavost**: „Zbývá jediný krok“, „už teď“, „nezvratný trend“, „probíhající
  posun“. V B2B nabídce působí levně a snižuje důvěru.
- **Falešné prozření**: „A pak jsem si uvědomil jednu nepříjemnou pravdu“, „potvrdilo mi
  to jednu věc“, „otevřelo mi to oči“. Ohlášená emoce místo doložené (zdroj: aibility.org).
- **Vágní autority**: „odborníci se shodují“, „studie ukazují“, „je všeobecně známo“.
  Bez jména a odkazu je to tvrzení opřené o nikoho. Buď konkrétní zdroj, nebo tvrdit rovnou.
- **Hedge-stack**: „by mohlo potenciálně přinést“, „může v konečném důsledku znamenat“.
  Dva zajišťovací prostředky na jednom slovese: věta pak netvrdí nic.
- **Falešná šíře**: „Ať už jste startup, nebo korporace…“ znamená „píšeme všem“, tedy
  nikomu. Vybrat publikum, nebo škrtnout.
- **Budoucí narativ bez obsahu**: „čas ukáže“, „jedno je jisté“, „to je teprve začátek“,
  „budoucnost patří…“. Gramaticky předpověď, obsahově nic ověřitelného.
- **Chatbot artefakty**: „Doufám, že vám tento přehled pomohl“, „Skvělá otázka“,
  „V tomto článku se podíváme…“, „Pojďme se podívat / Ponořme se“ (kalk „let's dive in“).
- **Sebereferenční důkaz**: text tvrdí, že něco dokazuje tím, že je to popsané o kus výš
  na tomtéž webu. Důkaz je něco vnějšího: číslo, klient, zdroj, ukázka výstupu.
- **Předpokládané pořadí čtení**: „jak jste viděli“, „právě jste prošli“. Na webu lidé
  vstupují z vyhledávače doprostřed a tenhle obrat je usvědčí.
- **Cizí sláva**: čísla velkých firem (Anthropic, Stripe, Google) použitá jako důkaz
  vlastní kompetence. Bez odkazu na primární zdroj je to navíc napadnutelné.
- **Předstíraná otevřenost**: „ruku na srdce“, „buďme upřímní“, „přiznejme si“.

## 4a Formát hesel: Tell → Náhrada → Proč → Kontrapříklad

Formát převzatý z německé portace upstreamu (gardenbaum/avoid-ai-writing,
`docs/superpowers/research/de-tells.md`): každé sporné heslo nese kromě náhrady
i doklad, PROČ je to tell, a **kontrapříklad z lidské prózy, který flag spustit
nesmí**. Kontrapříklad je to, co drží falešnou míru nízko; bez něj se pravidla
zpřísňují donekonečna. Nová a sporná hesla se zapisují takhle:

> **Tell:** na míru
> **Náhrada:** říct, co konkrétně se čemu přizpůsobuje
> **Proč:** v prodejním textu skoro vždy zastupuje chybějící konkrétnost
> **Kontrapříklad (nesmí flagovat):** „Oblek šitý na míru mu padl perfektně.“
> Lidský korpus má 4 výskyty na 9 tis. slov, proto jen slabý nález (P3).

> **Tell:** klíčový
> **Náhrada:** důvod, proč je to podstatné
> **Proč:** lidský auditní text 0,24/1000, generované nabídky 2,5 až 3,1/1000
> **Kontrapříklad:** „Klíčové slovo dotazu se indexuje zvlášť.“ (kolokace
> „klíčové slovo“ je termín) · jednotlivý výskyt je běžná čeština, tell je až
> hustota (řeší check `lexical-overuse`)

## 4b Emoji: rozhoduje role znaku, ne znak sám

Měření na lidských korpusech (18. 8. 2026) rozdělilo jeden „emoji check“ na tři jevy,
které se nesmí míchat:

- **Dekorativní emoji v nadpisu je tell.** Lidský markdown má 0 z 480 nadpisů s emoji,
  doložitelně generovaný text 72 %, auditované nabídky 83 a 89 %. Detektor to hlásí
  agregovaně na dokument („X z Y nadpisů“), protože 176 nálezů z jednoho redakčního
  zvyku dělalo polovinu celého skóre.
- **Barevný status (RAG semafor 🟢🟠🔴) je notace, ne dekorace.** Když má dokument
  legendu a barva není jediný nositel informace, je to legitimní konvence auditních
  a projektových reportů. Detektor takové glyfy vypisuje, ale do skóre nepočítá.
- **Emoji v HTML komponentě je věc šablony.** Redakce textu s ním nic nenadělá,
  patří do designu. Taky mimo skóre.
- **Emoji v běžném textu** jsou u lidí vzácné (0,2/1000), ale existují: 32 % postů
  Česko.Digital, 19 % lekcí naucse a 17 % stránek junior.guru nějaké emoji obsahuje
  („Za to vám moc děkujeme! 💙“). Samotná přítomnost emoji tedy AI signál není,
  hlídá se hustota.

## 4c Kategorie převzaté z forků upstreamu (18. 8. 2026)

Z průzkumu 15 aktivních forků upstreamu (jen tyhle mají vlastní commity z 282
forků celkem):

- **Literální markdown mimo markdown médium** (fork lolvut, původně Wikipedia:
  Signs of AI writing): `**tučné**` a `## nadpisy` vložené do Jiry, Slacku,
  e-mailu nebo prostého textu jsou otisk kopírování z chatu. Detektor to hlásí
  u `.txt` souborů (`literal-markdown`, P2); v Jiře a Confluence to posuzuje
  člověk.
- **Integrita citací** (fork lolvut): vygenerovaná reference má perfektní formát
  a špatný referent: DOI, které vede jinam, kniha bez čísla stránky, autor plus
  časopis plus rok bez existujícího článku. Zásada: **jen flagovat, nikdy
  „opravovat“**; vymyšlené opravené DOI je horší než nahlášené rozbité. Čistě
  úsudkové pravidlo, regex nemá co měřit.
- **Falešný rozsah** („od Velkého třesku po temnou hmotu“, „od startupů po
  korporace“): dvojice extrémů, která zní obsáhle a neříká nic. Úsudkové
  pravidlo; obecný regex na „od X po Y“ by flagoval běžné rozsahy.
- **Souhlasnost** („Přesně tak!“, „Máte naprostou pravdu.“, „Skvělý postřeh.“):
  konverzační odměna z chatu, kterou obě nezávislé ruské vrstvy vedou jako
  kategorii. Na našich registrech se neskóruje: měření našlo 2 výskyty v lidském
  korpusu a 0 v generovaných nabídkách; relevantní je pro transkripty a zápisy,
  ne pro web.
- **Kancelárit a řetězce genitivů** (obě ruské vrstvy: kimsanbaev-karim,
  mkapyrin): „zajištění provedení vyhodnocení výsledků“. Jako redakční pravidlo
  platí; jako skórovací metrika ne (viz §5: nominalizace jsou v lidské
  encyklopedii hustší než v generovaném textu, a řetězec 3+ nominalizací za
  sebou má na všech měřených sadách 0 výskytů).

## 5 Mikro-signály: měříme, ale neskórujeme

`stats.experimental` v detektoru počítá kandidáty z českých diskuzí, které zatím nemají
ověřený práh, takže do skóre nevstupují. Hodnoty lidské prózy z kontrolního korpusu
(na 1000 slov, rozpětí přes 5 textů):

Všech pět kandidátů, které jsem převzal z českých populárních článků, na měřených datech
neobstálo. Zůstávají v `stats.experimental` jako doložený negativní nález, aby je nikdo
nezkoušel podruhé.

| Metrika | lidská encyklopedie | lidský markdown | generovaný text | verdikt |
| --- | ---: | ---: | ---: | --- |
| nominalizace (-ání/-ení) | 45,2 | – | 27,0 | **vyvráceno** (RR 0,53, p < 10⁻¹⁶); rozptyl v jednom registru 27–47 |
| `který` | 10,8 | – | 8,8 | diskvalifikováno: lidský korpus má nejvyšší hodnotu ze všech sad |
| `bude/budou` | 0,4 | – | 0,3 | neprůkazné (4 vs. 3 výskyty, p = 0,42) |
| `nebo` / `či` | 4,5 / 1,2 | – | 2,5 / 0,3 | neprůkazné: n(či) = 3, na průkaznost by bylo potřeba ~66 tis. slov na skupinu |
| řetězec 3+ nominalizací | 0,0 | 0,0 | 0,0 | 0 výskytů na všech sadách (128 tis. slov), není co skórovat |
| `---` oddělovače sekcí | 0,0 | 0,62 | 0,0 | **anti-signál**: používá je lidský markdown (naucse), generované sady vůbec |
| přeskočená úroveň nadpisu | 0,0 | 0,04 | 0,0 | prakticky se nevyskytuje |
| souhlasné fráze („máte pravdu“) | 0 | 2 | 0 | v našich registrech jen v lidském textu; relevantní pro transkripty |

Dvě poznámky ke zdrojům, které tvrzení nesou. Za prvé: fakticky.cz i skolstvikhk.cz je
uvádějí **bez jakéhokoli měření**, jednou vedlejší větou, a formulují je **relativně**
(„dává který tam, kde by šlo jenž“), zatímco metriky měří absolutní hustotu, tedy něco
jiného. Za druhé: mé první měření „nebo/či“ vyšlo obráceně jen kvůli bugu v detektoru
(vzor `\bci\b` nad odháčkovaným textem počítal zkratku CI z CI/CD, v tech-auditu 53×
proti jedinému „či“). Po opravě jde poměr směrem, který zdroj tvrdí, jen je vzorek
příliš malý na závěr.

Kdyby některá metrika měla jednou skórovat, potřebuje aspoň 15 až 20 nezávislých
dokumentů na skupinu, shodný registr na obou stranách a **doložený původ** obou vzorků.
Porovnávat se má per dokument, ne poolovaným součtem, protože poolování schová rozdíly
mezi dokumenty.

## 5b Ověřený klasifikační výkon

Od 18. 8. 2026 existuje labelovaná sada: čtyři obchodní nabídky TechFides jsou podle
zadavatele **generované** (u jedné z nich proběhla lidská revize), lidská strana je
`corpus/texts` a `corpus/registr2`. Na prozaických souborech (od 200 slov) vychází:

| sada | souborů | medián skóre |
| --- | ---: | ---: |
| lidská próza (oba registry) | 52 | 6 |
| generovaný text bez revize | 61 | 30 až 57 podle nabídky |
| generovaný text po revizi | 17 | 28 |

**AUC = 0,957** (Mann-Whitney, nezávisí na volbě prahu). Prahy podle měření:

| práh | zachytí generovaných | falešně obviní lidských | k čemu |
| ---: | ---: | ---: | --- |
| 15 | 94 % | 8 % | redakce vlastního textu: chci vidět i hraniční věci |
| 20 | 85 % | 4 % | kompromis |
| 25 | 71 % | 0 % | tvrzení o cizím textu: žádné falešné obvinění |

Nad práh 25 nevystoupil ani jeden z 52 lidských prozaických souborů, takže skóre 25 a víc
je zatím bez falešného nálezu. Pod prahem propadají krátké a tabulkové stránky
(rozcestníky, checklisty): tam próza chybí a měřit se nedá.

**Co revize dokázala a co ne.** Lidská revize jedné nabídky snížila medián ze 57 na 28
a odstranila nejsilnější jednotlivý signál (dlouhé pomlčky, 77 % veškeré váhy). Podíl
souborů nad prahem 15 ale klesl jen z 95 na 88 %: revize odstranila jeden jev, ne
strojový charakter textu. Zbylé signály jsou emoji v nadpisech, kontrastní negace,
nespárované uvozovky a trikolon.

Kdo mění severitu nebo práh, ověří to ablací proti AUC (`scripts/roc.js`), ne dojmem.
Příklad měřeného kompromisu: `tier1` zpět na P1 zvedne AUC o 0,003, ale falešnou míru
při prahu 15 z 8 na 13 %. Proto zůstává slabým nálezem a nadužití řeší `lexical-overuse`.

## 6 Co v češtině NENÍ signál AI (aby nevznikaly falešné nálezy)

- **Formálnější rejstřík.** Česká B2B komunikace je formálnější než americká. Vykání,
  trpný rod v technickém popisu a delší souvětí nejsou tell. Nepřepisuj český odborný
  text do americké konverzační polohy: vznikne jiný, ještě nápadnější otisk.
- **Diakritika a bezchybný pravopis.** V češtině je normální i u rychle psaného textu.
- **České uvozovky „ “** jsou správné, ne signál. Automatické opravy je doplňují
  v Office i na macOS. (Upstreamové pravidlo o „curly quotes“ se na češtinu nepřenáší;
  signál je tady obráceně: rovné " a anglické “ ” v próze.)
- **Správná pomlčka –** v lidské hustotě (korpus: 10 na 1000 slov). Detektor ji proto
  do skóre počítá až nad 12/1000.
- **Odborná terminologie a anglicismy v IT** (merge request, pipeline, guardrail) jsou
  v oboru běžné. Signál je až jejich nadměrná hustota nebo kalkovaný překlad.
- **„Krok za krokem“ v návodu** je legitimní instrukční jazyk; tell je až „Pojďme si to
  rozebrat krok za krokem“ v prodejním nebo publicistickém textu.
- **Druhý jazyk.** Autor, který píše česky jako cizinec, produkuje podobné vzorce
  (nominalizace, kalky, opatrné formulace). Platí varování z nadřazeného skillu: signál,
  ne důkaz. U posuzování autorství cizího textu to platí dvojnásob.

## 7 Postup při redakci českého textu

1. Spusť `node detector/cs-scan.js <cesta> --min P1`. Dostaneš mechanické nálezy
   a skóre. Skóre je saturující: lidsky psaná česká odborná próza vychází zhruba
   pod 25, silně generovaný marketing nad 60 (kalibrace: `corpus/manifest.json`,
   ověřuje `scripts/fp-measure.js`).
2. Nejdřív hromadné opravy: pomlčky, uvozovky, emoji v nadpisech, tučné. Jsou to
   mechanické záměny a spraví největší část dojmu.
3. Pak strukturní vrstva z odstavců 3 a 4, kterou detektor vidí jen zčásti. Ta je
   pracnější a rozhoduje o tom, jestli text vypadá psaný člověkem.
4. Nakonec kontrola, že po redakci nezůstal bezbarvý dokument. Platí zákaz z nadřazeného
   skillu: nesmíš do textu přidat osobní hlas, který v něm nebyl, ani vymyslet konkrétní
   údaj. Když konkrétnost chybí, označ díru a nech ji autorovi.
5. V edit režimu pusť po zásahu preservation validátor
   (`node detector/validate.js <před> <po>`): je jazykově nezávislý
   a ohlídá, že se nesáhlo do kódu, tabulek, citací a odkazů.
6. Znovu spusť detektor a porovnej skóre před a po.

## Zdroje české vrstvy

[IJP ÚJČ: Pomlčka](https://prirucka.ujc.cas.cz/?id=165) ·
[IJP ÚJČ: Spojovník](https://prirucka.ujc.cas.cz/?id=164) ·
[Aibility: Jak poznat AI-slop](https://aibility.org/blog/jak-nepsat-ai-slop) ·
[Fakticky.cz: test detektorů](https://fakticky.cz/test-lze-odhalit-ai-text/) ·
[Školství KHK: jak poznat vygenerovaný úkol](https://skolstvikhk.cz/jak-poznat-ze-ukol-byl-vygenerovan-umelou-inteligenci/) ·
[EnergoŽrouti: jak poznat AI text](https://energozrouti.cz/clanek/text-generovany-ai-jak-poznat) ·
[Živě.cz: dlouhá pomlčka](https://www.zive.cz/clanky/jediny-znak-zarucene-prozradi-ze-text-psala-ai-dlouha-pomlcka/sc-3-a-240369/default.aspx) ·
[Šigut & Foltýnek, RASLAN 2023: detekce ChatGPT textů v češtině a slovenštině](https://nlp.fi.muni.cz/raslan/2023/paper10.pdf) ·
[Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
