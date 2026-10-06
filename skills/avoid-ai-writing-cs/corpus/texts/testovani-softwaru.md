Tento článek potřebuje doplnit či upravit literaturu.

</span> hide-when-compact ambox-text"}]]}'>Můžete Wikipedii pomoci tím, že na konec článku přidáte (resp. upravíte) kapitolu Literatura a uvedete vhodné knihy, ze kterých lze o daném tématu čerpat více informací. Knihy by měly být uváděny standardní formou citace.

Testování softwaru je empirický technický výzkum kvality testovaného produktu nebo služby prováděný za účelem poskytnout získané informace všem zainteresovaným (= stakeholdrům). Testování tedy představuje zejména hledání určitých informací o daném produktu zkoumáním daného produktu.

Proces testování je podmnožinou procesu ověřování a plánování kvality. Proto mohou být úkoly testovacího týmu dosti široké a na modelech životního cyklu pozorujeme, že testovací disciplína se nejen protahuje do celého vývoje, ale často nahrazuje zajišťování kvality.

Součástí zjišťování informací o kvalitě je reportování nalezených problémů – softwarových chyb.

Proces testování začíná stanovením vize a cílů testování. Dále se určí záběr testování, tedy co vše je třeba testovat, vybírají se testy, sbírají data a připravují nástroje, které tým k testování potřebuje. Navíc se kontroluje, zda všechny požadavky na produkt jsou ve formě, aby bylo možno jednoznačně zkontrolovat jejich splnění.

Samotné testování probíhá zkoumáním produktu na několika úrovních a reportováním nalezených skutečností.

Proces testování se často provádí ve více iteracích, přičemž každá iterace začíná předáním nové verze produktu testům.

Každý test optimálně dává ve výsledku (po provedení testu) dvě hodnoty: v pořádku, v souladu s Softwarová_specifikace_požadavků</span>"}]]}'>funkční specifikací (dále FS) / špatně, není v souladu s FS (anglicky Passed / Failed, též zkráceně pass / fail). Toto ohodnocení vychází z porovnání pozorovaného chování s požadavky ve FS, která je přímo navázána na obchodní smlouvu.

V ideální situaci by testování dávalo dvě ohodnocení pro dvě možnosti jevu, kartézským součinem tedy dostaneme čtyři možné situace jednoho případu užití:

Prvotním, ale ne posledním úkolem testera tedy je navštívit všechny požadované výchozí situace, zjistit zda jsou vůbec dosažitelné, a z nich dále ověřit, že popsané požadované chování skutečně pozoruje: To je minimální, ale ne postačující požadavek, aby se výsledná aplikace dala prohlásit za „správnou“ a funkční a dala se nabídnout zadavateli k převzetí (release candidate).

Chybný test je takový provedený test, který dal opačný výsledek, než by fakticky měl.

false positive – falešné potvrzení správné funkce: Ačkoli fakticky dochází k selhání, toto není detekováno/hlášeno, test selhává neodmítnutím špatného. Může být projevem nadměrné důvěřivosti. [ 1 ]

false negative, též falešný poplach (anglicky false alarm) – falešné hlášení chybné funkce: Ačkoli fakticky dochází ke splnění testovaného akceptačního kritéria, toto není detekováno/hlášeno, test selhává nepřijetím správného. Může být, lidově řečeno, „sýčkováním“ bez hrozby na dohled, projevem nadměrného skepticismu. [ 1 ]

Související informace naleznete také v článku Chyby typu I a II.

Softwarovým testováním není možno zajistit naprostou bezchybnost systému z toho důvodu, že nelze reálně nasimulovat nekonečné množství vstupních hodnot a následně zkontrolovat nekonečné množství výstupních hodnot. Ani otestování všech možných cest programem není většinou reálné. Testování je tak velmi efektivní způsob, jak ukázat přítomnost chyb, není ale možné tak dokazovat jejich nepřítomnost.

Absenci chyb může ukázat jen formální důkaz, což ale kvůli náročnosti není v praxi použitelná metoda.

Mezi další problémy, se kterými je třeba počítat a vypořádat se s nimi, patří:

Není možné otestovat kompletně všechny možné případy zadání.

Je velmi složité odhalit, že bylo ve specifikaci na něco zapomenuto.

Specifikace není vždy jednoznačná nebo dokonce chybí.

Testování bývá podceňováno nebo špatně pochopeno.

Výsledky testování mohou být ovlivněny špatnou komunikací v týmu nebo se zákazníkem.

Testování musí být přizpůsobeno testovanému produktu, není možné stejným způsobem otestovat různý software.

V průběhu testování se mohou stát některé testy neefektivními. Testy je nutné neustále přizpůsobovat měnícím se okolnostem.

Dvě různé chyby se mohou navenek projevovat stejně, nebo jedna chyba se může navenek projevovat různě.

Testování je citlivé na vstupní data, ta by měla být realistická. Vygenerování jednotvárných dat není optimální.

Zadavatel definuje bod svého zájmu, od něj se odvíjející oblast se pak dále rozšiřuje: Pro ni se pak říká, jak se aplikace má nebo nemá chovat. Ale protože je prostor případů definován jen takto zevnitř, může se prostor všech potenciálních případů, a tedy i množství případů k otestování, zvětšovat donekonečna. FS může pokrývat jen hlavní funkcionalitu a její případy, liší se jen míra, do jaké hloubky je rozebírá: Vždy lze nalézt případ, který FS nepokrývá, stačí jen zajít dostatečně daleko v kombinování různých možných vlivů.

Je tedy nutno určit práh, které komplikovanější případy už aplikace nemá pokrývat. Toto „omezení shora“ neurčuje klient, pro toho je žádoucí co nejkomplexnější řešení, pokrývající maximum případů (za stejnou cenu). Omezení oblasti vývoje (scope) má určit obchodník při vyjednávání, nebo alespoň následně projektový tým při rozpracovávání zakázky, a toto své rozhodnutí poskytnout všem zainteresovaným: Především programátorům a testerům. To však v praxi nebývá zvykem, je tedy na zodpovědnosti každého, aby si hloubku své práce určil sám: Tester si tedy určuje, které z možných, a ačkoli nepožadovaných, stále potenciálně hrozících scénářů vůbec nenavštíví a nebude prakticky testovat.

Kromě explicitně určených případů užití však mohou existovat i další případy, které jsou nutné pro funkčnost systému a tester je musí také navštívit a ověřit. Nejprve je však třeba je vůbec nalézt: I to je na zodpovědnosti testera. Všechny takovéto další nutné případy se pak také stávají nutnými pro samotné prohlášení aplikace za „funkční“.

Toto hledání, ač implicitních, stále nutných případů sice často dělá analytický tým projektu, nakonec si je ale tester často nachází znovu a ještě podrobněji (třeba i proto, že k analytikům nemá přístup). Rozsah, jak daleká zákoutí vzájemného ovlivňování se jednotlivých funkcionalit chce tester pokrýt si určuje sám, podle svých zkušeností a schopností: Lze si určit příliš mělký záběr, kdy se prakticky ověřují jen hlavní případy užití aplikace, nebo i příliš hluboké případné kolize vlivu tří a více funkcionalit na jediném případu. Hloubku záběru je třeba řídit podle zbývajícího času přiděleného dané etapě projektu.

Pro určení plánu postupného testování nepotřebuje funkční SW, jde jen o práci nad dokumentací, proto lze testovací scénáře připravit i ještě dříve, než vůbec začne implementace. Současná detailní znalost problému a dva různé pohledy se dobře projeví při prohlídkách dílčích řešení (Feature falk through) v developerském oddělení: Některé potenciální defekty lze podchytit ještě než nastanou nebo v samém jejich zárodku, což šetří náklady na jejich dodatečné opravy. Řešení případů, na kterých se takto programátor a tester dohodnou, se opět stávají závaznými požadavky na výsledný produkt.

Klienti zpravidla popisují své požadavky pomocí pravidel:

Na jedné straně se takový způsob jeví intuitivní, na druhé ho lze dobře formalizovat pomocí produkčních pravidel, teorie množin a predikátové logiky. V praxi ani klienti ani obchodníci svá zadání neformalizují, výsledné požadavky pak předpokládají nevyřčená chování, nebo hůře pro některé možné vstupy neurčují výstupy nebo ani vstupy neurčují všechny, ačkoli jsou možné.

Praktickým důsledkem pak mohou být případy, kdy:

je sice řečeno chování pro vybrané možnosti vstupů, ale zůstávají i možné vstupy, pro které chování popsáno není,

nebo popis vstupů třeba i pokrývá všechny možné hodnoty, ale už ne situaci, kdy vstup není dán vůbec.

Jde o případ, kdy FS určuje chování jen pro část ze všech teoreticky možných situací (kartézsky, podstrom). V příkladě níže je tedy explicitně dán požadavek na situace A a D. Další možnosti však přímo neurčuje. V takovém případě lze analýzou (testováním dokumentace) dojít k několika výsledkům:

Příklad ukazuje, že se z dalšího kontextu FS dospělo k závěru, že možnost E+F je díky jiným souvislostem vyloučena. To byl pravděpodobně také důvod, proč si FS dovolil tento případ explicitně neuvést. Protože tohoto stavu nelze dosáhnout a pozorovat výsledek, tento případ tím pádem odpadá z testování.

Náročnější je případ G, který opět může vyplývat z kontextu funkcionality. Ač ve FS nemusí být přímo vyslovený, je nutným požadavkem na funkčnost systému, a jako takový by měl být samostatně otestován. Někdy u těchto požadavků může z dalšího kontextu také vyplynout, že nejsou nezávislé, ale tautologicky přebírají (kopírují) hodnotu z jiného, už otestovaného případu: Pak se na opětovném přetestování nemusí trvat, ale v seznamu testů by měl být případ ponechán: Teď je sice tato apriorní informace známa (white box), ale s dalším vývojem v budoucnu se mohou souvislosti změnit.

Nejhorší možnost by se mohla týkat opět situace G z příkladu: Pokud se povede identifikovat takový případ za dosažitelný, je ho nutno otestovat, tedy pozorovat a pak vyhodnotit. Ale pokud FS tuto situaci nijak nespecifikuje (neříká, co je správně), jde o chybu FS. Nalezení takové chyby ještě před začátkem implementace je vždy levnější než její nalezení např. během testu funkcionality (feature testu). Řešení pak podá buď projektový manažer, klientský konzultant, nebo v nejhorším případě sám klient, například dodatkem smlouvy.

FS určuje chování jen pro část ze všech teoreticky možných situací

nedefinován, ale z kontextu: nedosažitelný

nedefinován, ale z kontextu: implicitně předpokládán

Podrobnější informace naleznete v článku Ternární logika.

I když třeba FS pokrývá kompletní množinu vstupních hodnot a definuje k nim výstupy, stále ještě může nastat situace, kdy od funkcionality požadujeme výsledek, a není k dispozici žádný vstup. Triviálním příkladem může být dotaz do databáze: Podívej se na klienta XYZ a zjisti mi, zda je to muž. Ačkoli u takového zadání FS může předpokládat jen dvě hodnoty (když ne explicitně muž, pak implicitně žena), prakticky však ještě přichází v úvahu odpověď nevím (NULL), pokud dotazovaná hodnota v DB není výslovně vyplněna. Pak však záleží na aplikaci a jejím FS, aby se zamlčené předpoklady určily, jaké chování je „správné“, tedy jaké si přeje klient.

Související informace naleznete také v článku falešné dilema.

Z hlediska postupných aktivit SW projektu lze mluvit o třech fázích, které každá vyžadují jiná testování, co do formy, předmětu i účelu testování:

Zahajovací fáze: testování dokumentace, bez funkčního kódu, ověřování případů užití,

produkční fáze: testování nových funkcionalit, testování celého řešení podle FS k odevzdání,

dokončovací fáze a předávání: testování celého produktu, testování instalačního balíku produktu a upgradů.

Situace bývá znepřehledněná i tím, že firma musí své (nejen lidské) zdroje využívat efektivně, tedy nelze čekat, až nastane taková etapa, aby se ten který specializovaný tester uplatnil: Jednotlivé fáze se mohou překrývat přes různé verze produktu, navíc se souběžně mohou testovat i různé produkty.

Na základě toho, v jakém stadiu vývoje se testování provádí, v jakém časovém horizontu od napsání kódu, se testování dělí na pět stupňů:

testování programátorem (Developer's Unit testing), sám si testuje metody svých objektů nebo funkce skriptů,

testování funkcionalit (Feature testing), ověřování úzce zaměřených scénářů, tedy již z pohledu uživatele, bez znalosti kódu,

integrační testování (Integration testing) [ 2 ], ověřování, že nově přidané funkcionality spolu nekolidují a pracují stejně jako během feature testů i po zaintegrování z jednotlivých vývojových větví do hlavního projektu. Na konec produkční fáze lze zařadit také „solution set testing, SST“, testování celého nově přidaného řešení.

systémové testování (System testing), zpětné ověření (pravidelné a zpravidla automatizované), že nové funkcionality integrované do projektu neporušily jeho původní funkce. Jde o testování během předávací fáze projektu. Buď je cílem jen zběžné ujištění, např. že nová verze (build) není vysloveně rozbitá, než se začne intenzivněji používat, a pak stačí projít jen několik základních scénářů (smoke test), nástřel naslepo. Anebo je třeba se v závěru vývojové etapy ohlédnout (regresní testování) a prověřit širokou škálu testů, i u méně často používaných funkcí.

akceptační testování (Acceptance testing) prováděné klientem, který si sám ověří, že jím zadaný úkol byl splněn podle jeho představ, což stvrdí podpisem, je podstatným momentem v procesu předávání/přebírání projektu,

a navíc také pilotní testování (Pilot testing), zkušební provoz v reálném provozu (často nákladná instalace), tedy ověření správné funkce i při napojení na reálné okolí, na rozdíl od simulovaného prostředí v laboratoři.

Po úspěšném pilotu (konec vývojového projektu) je již fungování systému plně pod správou oddělení podpory.

Jednotlivé etapy testů provádějí různí lidé (ani ne tak úmyslně, jako spíše kvůli jejich různému zaměření) a systém je na každém stupni testován vždy z jiného úhlu pohledu, s jiným cílem, jiným způsobem a s jinými vyplývajícími důsledky.

Toto rozdělení vychází z toho, zda je k provedení testu třeba software spustit.

Statické testování nevyžaduje běh softwaru, proto je možné s ním začít ještě před vytvořením prvního prototypu: I dokumentace je předmětem testování. Testování lze s výhodou provádět ještě před začátkem psaní kódu, výsledkem pak může být například zpřesnění odhadů náročnosti na čas (člověkohodiny, estimates) a zdroje (strojohodiny a počet strojů) pro samotný nadcházející vývoj.

Dynamické testování vyžaduje existenci spustitelné verze softwaru a probíhá hlavně na základě poskytování různých vstupů (anebo i neposkytování žádných) a posuzování výstupů (i jejich samé existence) testovaného programu.

Při testování černé skříňky (black box) se zaměřujeme na vstupy a výstupy programu bez znalosti, jak je implementován. Produkt je černou skříňkou, do které se nelze podívat, vidíme jen, jak vypadá a jak se chová navenek. Smyslem je analyzovat chování softwaru vzhledem k očekávaným vlastnostem tak, jak ho vidí uživatel.

Při testování bílé skříňky, v angličtině se jí říká taky skleněná (glass box [ zdroj? ], white box) nebo průhledná (clear/transparent box) [ zdroj? ], má tester přístup ke zdrojovému kódu a testuje produkt na základě něj. Vidí nejen, co se děje na povrchu skříňky, ale i vnitřní reakce systému. Tím poněkud ztrácí pohled uživatele, ale může lépe odhadnout, kde hledat chyby a kde ne.

Mezi těmito kategoriemi vznikla ještě třetí, testování šedé skříňky (gray box), kdy sice máme apriorní informaci o vnitřních algoritmech produktu, ale ne tolik, aby to bylo považováno za testování bílé skříňky. Například nemáme k dispozici celý zdrojový kód, ale jen informace o matematických principech použitých v aplikaci.

Na začátku vývoje aplikace, např. při první předávce verze k testování, je zřejmé, že funkcionality ještě nejsou kompletní. Ovšem už nyní je třeba mít představu o aktuálním stavu, nakolik je naplněno zadání klienta. Programátoři začínají hlavními případy užití, právě ty jsou předmětem optimistického testování funkcionality, kdy stačí nalézt alespoň nějakou úspěšnou cestu k cíli a test průchodu (test-to-pass) je považován za úspěšný. Dosažení úspěšného test-to-pass testu bývá milníkem (milestone) pro přípravy k procesu integrace.

Naopak na konci vývoje už se funkcionality považují za stabilizované, úspěšný průchod scénářem od začátku do konce (e2e) se považuje za samozřejmost. Tehdy se naopak hledají takové případy, kdy testování selže: Stačí nalézt jediný příklad selhání a celý test k selhání (test-to-fail) je považován za neúspěšný. Dosažení úspěšného test-to-fail testu bývá přelomem (trigger) pro ukončení funkcionálních testů a přesun k regresi.

Hledání selhávajícího testu je na celém procesu testování zpravidla ta nejzábavnější část, kdy se může projevit intuice a kreativita testera. Jde z velké míry o ad-hoc testování podle momentální inspirace. Na druhou stranu je to přesně ona situace, kdy se může hledat i neexistující defekt. Testování pro selhání tedy musí mít předem stanovený časový rámec, jinak by trvalo věčně.

Procházka po okraji útesu je jednou z metod test-to-fail. Jak vyplývá i z názvu, jde o testování hraničních hodnot. Známe-li byť i jen přibližnou hodnotu přelomové hranice, postupným přibližováním se k hranici z oblasti funkcionální specifikací přijímané (a i z druhé strany odmítané) se předpokládá, že až do dosažení zlomu budou všechny vstupy přijaty, aby byl test úspěšný. Vice versa při přibližování z oblastí specifikací odmítaných hodnot se testuje, že až do zlomu budou všechny vstupy skutečně odmítnuty.

Podle toho, zda jsou testy prováděny člověkem, nebo softwarem, se rozlišuje manuální a automatické testování. Pokud test vyžaduje lidské ohodnocení a úsudek nebo rozličné přístupy, které není třeba zaznamenat a pravidelně opakovat, je vhodnější manuální testování. Pro opakované spouštění velkého množství testů nebo testu s velkým množstvím generovaných dat, stejně jako pro zátěžové testování je dobré použít automatické testy.

Při vývoji nových aplikací se ovšem neustále řeší nové případy, proto jsou tyto testovány především ručně: Ještě na ně dříve nedošlo, proto je také ani nikdo ještě nemohl automatizovat. Automatizované testování se dostává ke slovu zpravidla ve dvou situacích:

Při opakovaném navštěvování stejného scénáře, např. při pokusech o verifikaci údajně opraveného defektu. Jde o situace, kdy je třeba čerstvý systém rychle uvést do požadovaného stavu pro začátek ručního testu.

Místo automatizované sekvence kroků nad aplikací však lze výchozího bodu dosáhnout i opačným přístupem, jakým je např. obnovení kompletního obrazu systému pomocí Ghost Image.

Pro automatizaci samotného testování je potřeba splnit sadu předpokladů, tedy mít:

testovaný program, který už automatizaci podporuje skrze svá rozhraní.

V každém případě však někdo nejprve musí testovací skript (testskript) vytvořit: Kompletní automatický test se tedy skládá z jednotlivých testovaných případů (testcases) vytvořených během vývoje nových funkcionalit (feature test). Opětovně se pak spouštějí během regresí a zběžných smoke testů, např. pro ověření alespoň základní funkčnosti nového sestavení (buildu).

Cílem automatizovaného testu není zkoumat, zda momentální stav odpovídá stavu funkční specifikace softwaru (aplikace), ale zda bylo zjištěno nestandardní chování od předešlého průběhu testu (pokud se změnilo či nezměnilo). Automatizované testování tedy nedetekuje „správnost“, ale změnu chování. Samotné konečné vyhodnocení je opět na člověku. Ani detekování změny chování stále nemusí znamenat defekt, ale naopak specifikovanou a chtěnou změnu chování systému, která však ještě nebyla zahrnuta do samotných testovacích skriptů.

Samotné testované scénáře k projití jsou obsaženy v programu na míru konkrétnímu danému problému, který je schopný se připojit na rozhraní (interface) testovaného softwaru. Jde buď o specializovaný program, nebo testscript interpretovaný obecnějším testovacím nástrojem.

Obecným testovacím nástrojem může být například Selenium, které se umí připojit na browser, a prováděné kroky jsou brány s testscriptu přizpůsobeného na míru použitému nástroji, zde právě Seleniu. Použitím Selenia tedy již je vyřešeno jak připojení na API, tak interpretter scriptu. Na testerovi zbývá vytvoření scriptu, tedy postupu jednotlivých kroků pro vzdálené ovládání SW, a dále formulování assertů k vyhodnocování momentálních stavů.

Nezaměňovat testovací nástroje s debuggovacími nástroji pro programátory.

Princip automatizovaného testování spočívá v apriorní znalosti výsledků pro známé vstupy. Sady dat (např. dvojice vstup-výstup) je však třeba nejprve nasbírat nebo v lepším případě nagenerovat dalším nástrojem pro podporu automatizace testů.

Pro automatizaci testů malého modulu často není třeba v aplikaci vytvářet žádná další rozhraní, protože ta pro běžnou funkci postačují. U větších systémů však vzniká potřeba přistupovat na „vnitřní stavy systému“: Požadavkem automatizace testování může vzniknout potřeba dalšího vývoje, doprogramování zadních vrátek do systému, což ovšem také zpochybňuje kvalitu prvotní analýzy, která v takovém případě nepředepsala dostatečnou úroveň granularity.

Zavádění možnosti automatizovaného testování sice může přinést další vícenáklady na dodatečný vývoj, vnáší ale do systému další vnitřní kvalitu zvýšením modularity, přenositelnosti a znovupoužitelnosti (reusability). Následným refaktoringem se pak kód také dále pročistí a zesystematičtí, čímž se zvýší stabilita systému a i nevědomky se odstraní potenciální zdroje chyb, stejně jako ještě ani nedetekované reálně existující defekty.

Už samo závádění podpory pro automatizované testování zvyšuje kvalitu produktu.

Další dělení testů vychází z něčeho, čemu se říká dimenze kvality. Jsou to různé aspekty vyvíjeného produktu, ke kterým se vztahují požadavky a očekávání uživatelů. Jejich seznam je důležitý hlavně proto, aby nebylo opomenuto sesbírat požadavky a připravit testy pro žádnou z těchto dimenzí.

Funkčnost (Functionality) – správné chování funkcí systému, jak je definováno Softwarová_specifikace_požadavků</span>"}]]}'>funkční specifikací (funcspec, FS).

Použitelnost (Usability) – zda vůbec a jak lze dosáhnout požadovaného cíle, zda je systém uživatelsky přívětivý, zda se s ním dobře pracuje: i když se SW chová podle uživatele „špatně“, může stále jít o „správné chování“ podle FS, pak jde ovšem o chybu samotného FS a smlouvy, kterou je vázán.

Spolehlivost (Reliability) – zda se chová stejně za všech okolností, zvláště po přetížení, po výpadku či chybě, zda tyto stavy umí detekovat a hlásit.

Výkon (Performance) – zda systém není pomalý a zvládne větší množství současně pracujících uživatelů, anebo naopak zda si i při naplnění všech požadavků na obsluhu uživatelů nebere příliš systémových zdrojů.

Podporovatelnost (Supportability) – zda se systém dobře instaluje, nemá problémy s cílovými hardwarovými a softwarovými konfiguracemi a další vlastnosti související s údržbou systému a upgradovatelností.

Tyto dimenze bývají někdy označovány zkratkou FURPS, kterou tvoří začáteční písmena anglických názvů jednotlivých dimenzí.

Také ISO 9126, mezinárodní standard pro vyhodnocování kvality SW, popisuje tato kritéria.

lokalizovatelnost – snadný převod do jiných jazyků,

kompatibilita – možnost kombinace s jiným softwarem nebo hardwarem,

bezpečnost – uživatelsky autorizace a autentizace, technicky odolnost proti chybným vstupům a jejich zneužitím, např. k cíleným útokům,

přenositelnost – nakolik je aplikace schopná fungovat na jiném HW, v jiných OS,

integrovatelnost – nakolik je aplikace schopná se začlenit do jiných řešení, nebo opačně, nakolik je závislá na kterém konkrétním modulu, nebo zda je funkční i při použití s jinou DB

…a všechny další požadavky, které se nehodí do předchozích kategorií.

Pro ohodnocení úspěšnosti naplňování těchto kritérií je vhodné mít kritéria nejen se dvěma hodnotami „splněno / nesplněno“, ale používat více hodnot, optimálně spojitou škálu ohodnocení. Pro tyto účely se z metodik managementu přejímá Vyvážené ukazatele výkonnosti(BSC, balanced score card): Cílem je nejen ohodnotit, že projekt naplňuje zadání na 183 % funkčnosti a 45 % podporovatelnosti, ale také na tato hodnocení navázat sledování nákladů, např. člověkohodin.

Softwarové testování musí být odlišováno od disciplíny Software Quality Assurance, která zahrnuje všechny business procesy vývoje software, ne pouze testování. Samo testování je tedy nedílnou součástí QA.

Řízení testování vs. dohled a správa testování

Za řízení (management) procesu testování je v rámci určitého vývojového projektu odpovědný manažer/vedoucí testování (angl. test manager, test lead). Jeho zodpovědnost zahrnuje mj. kontrolní aktivity ve fázích plánování, analýzy a návrhu, implementace a exekuce, vyhodnocování a reportování testování. [ 3 ]

Od projektově orientované odpovědnosti se dále odlišuje zodpovědnost za dohled a správu testování (angl. test governance). Ta nezahrnuje vlastní výkon koordinačních a kontrolních činností na úrovni projektu, ale činnosti strategického a kontrolního charakteru napříč projekty. Procesy dohledu a správy testování jsou klíčové zejm. v případě zapojení různých dodavatelů formou outsourcingu. Důvodem je, že každý dodavatel může mít zcela jiný přístup k testování softwaru, avšak klientská organizace má obvykle zájem na co nejjednotnějším přístupu. [ 4 ]

1 2 SHERMER, Michael. The Skeptic Encyclopedia of Pseudoscience 2 volume set. [s.l.]: ABC-CLIO, 2002. Dostupné online. ISBN 1576076539. S. 903. Je zde použita šablona { { Cite book }} označená jako k „pouze dočasnému použití“.

SHAH, Hardik. What is Integration Testing? Definition, Tools, and Examples [online]. 2022-01-31 [cit. 2023-05-10]. Dostupné online. (anglicky)

GRAHAM, Dorothy; VAN VEENENDAAL, Erik; EVANS, Isabel. Foundations of software testing: ISTQB certification. Cengage Learning EMEA, 2008.

DOLEŽEL, Michal; BUCHALCEVOVÁ, Alena. Test Governance Framework for contracted IS development: Ethnographically informed action research. Information and Software Technology, 2015, 65: 69-94.

testování statistických hypotéz – nulová hypotéza

Uživatelské testování – testování softwaru na budoucích uživatelích

Uživatelské akceptační testování (UAT) – testování softwaru klientem

Obrázky, zvuky či videa k tématu testování softwaru na Wikimedia Commons

Testování webových aplikací, Část II: Základy testování, Mgr. Anna Borovcová zveřejnila skrze svůj blog Základy testování, testovanisoftwaru.blogspot.com

Odborné články [ nedostupný zdroj ], TestQA.cz, Vše o testování softwaru a Quality Assurance

Proces vývoje softwaru a softwarové inženýrství

produkt owner • analýza požadavků • FURPS • funkční specifikace • architektura • design • implementace • testování • akceptace • nasazení • podpora • údržba

agilní • cleanroom development • iterativní • Rapid Application Development • Rational Unified Process (RUP) • spirální • vodopádové • extrémní programování (XP) • lean • scrum • V-Model • programování řízené testy (TDD)

konfigurační management • dokumentace • quality assurance (QA) • projektový management • user experience design

profiler • verzování • překladač • debugger • GUI designer • editor zdrojového kódu • vývojové prostředí (IDE)

Testování grafického uživatelského rozhraní

Citováno z „https://cs.wikipedia.org/w/index.php?title=Testování_softwaru&oldid=25560402“

Skryté kategorie: Údržba:Články bez bibliografie

Údržba:Články s dočasně použitou šablonou

Údržba:Články obsahující nedoložená tvrzení

Údržba:Články obsahující odkazy na nedostupné zdroje