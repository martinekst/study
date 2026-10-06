</span> hide-when-compact ambox-text"}]]}'>Můžete Wikipedii pomoci tím, že ho vylepšíte. Jak by měly články vypadat, popisují stránky Vzhled a styl, Encyklopedický styl a Odkazy.

Návrhový vzor (anglicky design pattern) v softwarovém inženýrství představuje obecné řešení problému, které se využívá při návrhu počítačových programů. Návrhový vzor není knihovnou nebo částí zdrojového kódu, která by se dala přímo vložit do našeho programu, jedná se o popis řešení problému nebo šablonu, která může být použita v různých situacích. Objektově orientované návrhové vzory typicky ukazují vztahy a interakce mezi třídami a objekty, aniž by určovaly implementaci konkrétní třídy. Algoritmy nejsou považovány za návrhové vzory, protože řeší konkrétní problémy a nikoliv problémy návrhu.

Návrhové vzory nepocházejí ze softwarového inženýrství – jsou zcela běžné v každodenním životě. K asi nejznámějším a nejstarším příkladům patří architektura. Gotickou katedrálu je možné poznat už zdaleka právě proto, že tehdejší architekti a jejich stavební společnosti používali stejné návrhové vzory.

Vznik návrhových vzorů se datuje do šedesátých let dvacátého století, kdy pro vzory v architektuře použil tento termín Christopher Alexander s kolegy. Šlo o odpověď na různé moderní styly v architektuře, které ale byly nepraktické. V počítačových vědách se návrhové vzory prvně objevují na konferenci OOPSLA v roce 1987 v Orlandu, kde je použili pánové Ward Cunningham a Kent Beck, kteří vycházeli z několika návrhových vzorů připravených v jazyce Smalltalk. Tyto vzory byly určeny hlavně pro začátečníky v tomto programovacím jazyce.

Další důležitou věcí pro návrhové vzory bylo vytvoření skupiny GoF (Gang of Four) na začátku devadesátých let. Tuto skupinu tvořili Erich Gamma, Richard Helm, Ralph Johnson a John Vlissides. V roce 1991 na konferenci ECOOP představili prvních pár návrhových vzorů (Composite, Decider, Observer atd.).

V říjnu roku 1993 se uskutečnilo v horách nedaleko Colorada setkání, kde byly položeny základy pozdější Hillside group. Tato skupina je nevýdělečnou organizací kladoucí si za cíl zlepšit vývoj softwarových systémů. Je sponzorem konference PloP (Pattern Languages of Programming) a dalších podobných konferencí.

Nicméně základním kamenem pro návrhové vzory se stala kniha Design Patterns: Elements of Reusable Object-Oriented Software, jejímiž autory jsou Erich Gamma, Richard Helm, Ralph Johnson a John Vlissides také známí jako Gang of Four. V oblasti návrhových vzorů je nazývána knihou knih a i dnes je stále aktuální.

Mezi další důležité knihy týkající se návrhových vzoru patří:

Fowler, Martin (2002). Patterns of Enterprise Application Architecture. Addison Wesley. ISBN 978-0-321-12742-6.

Hohpe, Gregor; Bobby Woolf (2003). Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions. Addison-Wesley. ISBN 0-321-20068-3.

Creational Patterns řeší problémy související s vytvářením objektů v systému. Snahou těchto návrhových vzorů je popsat postup výběru třídy nového objektu a zajištění správného počtu těchto objektů. Většinou se jedná o dynamická rozhodnutí učiněná za běhu programu.

Structural Patterns představují skupinu návrhových vzorů zaměřujících se na možnosti uspořádání jednotlivých tříd nebo komponent v systému. Snahou je zpřehlednit systém a využít možností strukturalizace kódu.

Behavioral Patterns se zajímají o chování systému. Mohou být založeny na třídách nebo objektech. U tříd využívají při návrhu řešení především principu dědičnosti. V druhém přístupu je řešena spolupráce mezi objekty a skupinami objektů, která zajišťuje dosažení požadovaného výsledku.

Doporučená struktura záznamu v archivu návrhových vzorů

Název a klasifikace Vzoru: Unikátní jméno, které dostatečným způsobem popisuje vzor, pomáhá v jeho identifikaci a odkazování se na něj.

Cíl: Popis cíle, kvůli kterému vzor vznikl

Také znám jako: Jiné názvy pro stejný vzor.

Kontext: Architektonická či designová situace kde je popis vzoru užitečný (platný).

Motivace (protichůdné síly): Popis problému, který má daný vzor řešit

Použití: Situace, ve kterých lze daný vzor použít. Jde o kontext vzoru.

Struktura: Grafické znázornění vzoru. Pro tento účel mohou být použity class diagramy nebo interaction diagramy.

Účastníci: Výpis tříd a objektů, které tento vzor používá a jejich role v návrhu.

Spolupráce: Popis toho, jak spolu třídy použité v daném vzoru komunikují.

Důsledky: Popis výsledků, vedlejších efektů a problémů, které přináší použití daného vzoru.

Ukázkový kód: Ilustrace toho, jak může být daný vzor použit v nějakém programovacím jazyce.

Známá použití: Příklady praktického využití daného vzoru.

Související vzory: Jiné vzory, které jsou v nějakém vztahu s tímto vzorem. Diskuze rozdílů mezi tímto vzorem a vzory jemu podobnými.

Creational patterns (Vzory týkající se tvorby objektů)

Abstract Factory (Abstraktní továrna) – Definuje rozhraní pro vytváření rodin objektů, které jsou na sobě závislé nebo spolu nějak souvisí bez určení konkrétní třídy.

Factory Method (Tovární metoda) – Definuje rozhraní pro vytváření objektu, které nechává potomky rozhodnout o tom, jaký objekt bude fakticky vytvořen. *Tovární metoda nechává třídy přenést vytváření na potomky.

Builder (Stavitel) – Odděluje tvorbu komplexu objektů od jejich reprezentace tak, aby stejný proces tvorby mohl být použit i pro jiné reprezentace.

Lazy Initialization (Odložená inicializace) – Odkládá vytváření objektu, počítání hodnoty nebo provádění nějakého procesu, až do okamžiku, kdy je ho poprvé potřeba.

Object pool (Fond, lidově bazén) – Umožňuje vyhnout se drahému vytváření a uvolňování zdrojů recyklováním objektů, které už se nepoužívají.

Prototype (Prototyp, Klon) – Specifikuje druh objektů, které se mají vytvořit použitím prototypového objektu. Nové objekty se vytváří kopírováním tohoto prototypového objektu.

Singleton (Jedináček) – Potřebujete-li, aby měla třída maximálně jednu instanci.

Multiton – Potřebujete-li, aby měla třída maximálně jednu instanci ke každému klíči.

Resource aquisition is initialization – Zajišťuje, že zdroje budou správně uvolněny, tím, že je připoutá k životní době odpovídajících objektů.

Structural Patterns (Vzory týkající se struktury programu)

Adapter (Adaptér) – Potřebujete-li, aby spolu pracovaly dvě třídy, které nemají kompatibilní rozhraní. Adaptér převádí rozhraní jedné třídy na rozhraní druhé třídy.

Bridge (Most) – Oddělí abstrakci od implementace, tak aby se tyto dvě mohly libovolně lišit.

Composite (Strom, Složenina) – Komponuje objekty do stromové struktury a umožňuje klientovi pracovat s jednotlivými i se složenými objekty stejným způsobem.

Decorator (Dekorátor) – Použijeme jej v případě, že máme nějaké objekty, kterým potřebujeme přidávat další funkce za běhu. Nový objekt si zachovává původní rozhraní.

Facade (Fasáda) – Nabízí jednotné rozhraní k sadě rozhraní v podsystému. Definuje rozhraní vyšší úrovně, které zjednodušuje použití podsystému.

Flyweight (Muší váha) – Je vhodná pro použití v případě, že máte příliš mnoho malých objektů, které jsou si velmi podobné.

Proxy – Nabízí náhradu nebo zástupný objekt za nějaký jiný pro kontrolu přístupu k danému objektu.

Behavioral Patterns (Vzory týkající se chování)

Chain of responsibility (Zřetězení zodpovědnosti) – Vyhněte se závislosti odesílatele požadavku na příjemci tím, že dáte více než jednomu objektu možnost poradit si s tímto požadavkem. Zřetězte příjemce a přeposílejte požadavek po řetězu, dokud nebude vyřešen.

Command (Příkaz) – Zapouzdřete požadavek jako objekt, a tím umožněte parametrizovat klienty s různými požadavky, frontami nebo požadavky na log a podporujte operace, které jdou vzít zpět.

Interpreter (Interpret) - Vytváří jazyk, což znamená definování gramatických pravidel a určení způsobu, jak vzniklý jazyk interpretovat.

Inversion of control (Dependency Injection, Obrácení řízení) – Vztahuje se k poskytování externích závislostí softwarové komponentě.

Iterator (Iterátor) – Nabízí způsob, jak přistupovat k elementům skupinového objektu postupně bez toho, abyste vystavovali vnitřní reprezentaci tohoto objektu.

Mediator (Prostředník) – Umožňuje zajistit komunikaci mezi dvěma komponentami programu, aniž by byly v přímé interakci, a tím musely přesně znát poskytované metody.

Memento (Memento) – Bez porušování zapouzdření zachyťte a uložte do externího objektu interní stav objektu tak, aby ten objekt mohl být do tohoto stavu kdykoliv později vrácen.

Null Object (Prázdný objekt) – Jde o objekt, který má fungovat jako základní stav objektu a který je v podstatě náhradou stavu null.

Observer (Pozorovatel) – V případě, kdy je na jednom objektu závislých mnoho dalších objektů, poskytne vám tento vzor způsob, jak všem dát vědět, když se něco změní.

Servant (Služebník) – Definuje společnou funkcionalitu pro skupinu tříd, které většinou nemají společnou rodičovskou třídu.

State (Stav) – Umožňuje objektu měnit své chování, pokud se změní jeho vnitřní stav. Objekt se tváří, jako kdyby se stal instancí jiné třídy.

Strategy (Strategie) – Zapouzdřuje nějaký druh algoritmů nebo objektů, které se mají měnit tak, aby byly pro klienta zaměnitelné.

Specification (Specifikace) – Rekombinovatelná obchodní logika ve stylu booleanů.

Template method (Šablonová metoda) – Definuje kostru toho, jak nějaký algoritmus funguje, s tím, že některé kroky nechává na potomcích. Umožňuje tak potomkům upravit určité kroky algoritmu bez toho, aby mohli měnit strukturu algoritmu.

Visitor (Návštěvník) – Reprezentuje operaci, která by měla být provedena na elementech objektové struktury. Visitor vám umožní definovat nové operace beze změny tříd elementů, na kterých pracuje.

Concurrent patterns (Vzory řešící problémy vzniklé spouštěním programů ve vláknech a tudíž při souběžném řešení úlohy)

Active object – Tento návrhový vzor odděluje spouštění metod od provádění metod, přičemž spouštění metod může být ve svém vlastním vlákně. Cílem je přidat souběžnost použitím asynchronních volání metod a plánovače, který obsluhuje požadavky.

Event-based asynchronous – Na událostech založený asynchronní návrhový vzor řešící problémy s Asynchronním vzorem, které nastávají ve vícevláknových programech.

Balking – Tento vzor je softwarovým vzorem, který na objektu vykoná nějakou akci, pouze pokud je objekt v určitém stavu.

Double checked Locking – Tento vzor je také znám jako „optimalizace zamykání s dvojnásobnou kontrolou“. Návrh je vytvořen tak, aby zredukoval zbytečné náklady na získávání zamčení tím, že nejdříve otestuje kritérium pro zamčení nezabezpečeným způsobem ('lock hint'). Pouze pokud uspěje, pak se opravdu zamkne.

Tento vzor může být nebezpečný, pokud je implementován v některých kombinacích programovacích jazyků a hardwaru. Proto je někdy považován také za proti-vzor.

Guarded – Jde o vzor obstarávající operace, které požadují uzamčení a navíc mají nějakou podmínku, která musí být splněna předtím, než může být operace provedena.

Monitor object – Monitor je přístup k synchronizaci dvou nebo více počítačových úloh, které používají sdílené zdroje, zpravidla hardwarové zařízení nebo sadu proměnných.

Read write lock – Tento vzor, také známý jako RWL, je vzor, který umožňuje souběžný přístup k objektu pro čtení, ale vyžaduje exkluzivní přístup pro zápis.

Scheduler – Jde o souběžný vzor, který se používá pro explicitní kontrolu, kdy mohou vlákna vyvolávat jednovláknový kód.

Thread pool – V bazénku vláken je vytvořen nějaký počet vláken pro řešení nějakého množství úloh, které jsou organizovány ve frontě. Zpravidla je výrazně více úloh než vláken.

Thread-specific storage – Thread-local storage (TLS) je programovací metoda, která používá statickou nebo globální paměť lokálně pro vlákno.

Reactor – Jde o vzor používaný pro vyřizování požadavků na službu, které jsou z jednoho nebo více vstupů doručovány správci služeb. Správce služeb rozdělí příchozí požadavky a přidělí je synchronně přidruženým vyřizovačům požadavků.

Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides: Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley

Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides: Návrh programů pomocí vzorů: Stavební kameny objektově orientovaných programů. Grada

Eric Freeman, Elizabeth Freeman, Kathy Sierra, Bert Bate: Head First Design Patterns. O'Reillys

Steve Holzner: Design Patterns for Dummies

PECINOVSKÝ, Rudolf. Návrhové vzory – 33 vzorových postupů pro objektové programování. Brno: Computer Press, 2007. ISBN 978-80-251-1582-4.

Obrázky, zvuky či videa k tématu návrhový vzor na Wikimedia Commons

Návrhové vzory – studijní materiál v češtině

Citováno z „https://cs.wikipedia.org/w/index.php?title=Návrhový_vzor&oldid=23716847“