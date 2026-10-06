# Čísla a grafy

Stránku jsem vytvořil po vzoru [jiných otevřených projektů](https://openstartuplist.com/), především [NomadListu](https://nomadlist.com/open). Tyto grafy a čísla stejně potřebuji pro svou vlastní potřebu, takže proč je v rámci transparentnosti nemít rovnou na webu, že?

Finanční data se každý den stahují přímo z mého podnikatelského účtu u Fio banky. Používám [svou vlastní Python knihovnu](https://pypi.org/project/fiobank/), kterou jsem kdysi vytvořil.

## Čistý zisk

Zisk jsou výnosy mínus náklady včetně daní, tedy částka, která už jde z mého podnikání přímo do rodinného rozpočtu. Aktuální čistý zisk junior.guru je ** Kč měsíčně**. Spočítáno jako zisk za posledních 12 měsíců (TTM, _trailing twelve months_) vydělený 12.

### Cíl

Cílem není zbohatnout, ale dlouhodobě pomáhat juniorům, pohodlně živit rodinu a žít při tom šťastný život. Vlevo vidíte měsíční čistý zisk junior.guru a vpravo jak se na to tvářím.

    
         Kč čistého
        
            
                😱
            
                😰
            
                🤨
            
                😀
            
                🤩
            
        
    

Seniorní programátor s mými zkušenostmi, který pracuje pro pražskou nebo zahraniční firmu, vydělává 100.000 Kč měsíčně čistého a víc. Dohodli jsme se doma, že když mě JG tolik baví, zkusím to provozovat a i když to vydělá méně, stojí nám to za větší domácí pohodu. Ze svých předchozích angažmá jsem měl úspory, díky nimž jsem mohl v začátcích JG držet při životě, i když zatím moc nevydělávalo.

Na JG pracuji na plný úvazek, mám malé dítě, ženu na rodičovské, nemáme auto, bydlíme v nájmu uprostřed Prahy. Jako podnikatel potřebuji velkou rezervu, abych se nemusel strachovat s každou změnou rodinných nákladů, jestli mohu pokračovat. Také mi nikdo neplatí dovolenou, nemocenskou, nespoří na důchod.

    
    
    
    
        40.000 Kč
        60.000 Kč
        80.000 Kč
    
    
        🤨
        😀
        🤩
    
    
        
            
                 %
            
        
        
            
                 %
            
        
        
            
                 %
            
        
    

## Výnosy a náklady

Následující graf zobrazuje vývoj mých výnosů a nákladů v každém konkrétním měsíci. Tenké linky zobrazují totéž, ale vždy za posledních 12 měsíců (TTM, _trailing twelve months_), vyděleno 12. Výnosy ani náklady totiž nejsou vždy pravidelného, měsíčního charakteru, jeden měsíc vydělám víc, jiný méně, stejné je to s výdaji. Zároveň nemám s nikým delší kontrakt než roční, ať už jsou to jednotlivci nebo firmy. Číslo za rok tedy stírá tyto skoky nahoru a dolů, ale protože můj byznys roste rychleji než ročním tempem, tak zase ukazuje možná menší číslo, než je realitou za poslední půlrok, čtvrtrok.

Čísla z konkrétních mesíců tedy pomáhají odtušit aktuální trendy. Čistý zisk je rozdíl mezi modrou a červenou čárou.

## Výnosy

Původně jsem se snažil JG živit z inzerce nabídek práce, ale byznys na tomto modelu jsem nedokázal dostatečně rozpohybovat tak, abych věřil, že má smysl v tom dál pokračovat. Mezitím jsem se pokusil zpeněžit [příručku](handbook/index.md) skrze loga firem a prosil jsem návštěvníky webu o dobrovolné příspěvky.

Ke konci roku 2020 jsem se rozhodl změnit byznys model a vytvořit kolem JG placenou komunitu na Discordu. Toto detailně popisuji ve svém [článku na blogu](https://honzajavorek.cz/blog/spoustim-klub/). [Klub](club.md) se veřejnosti otevřel v únoru 2021.

V ideálním případě by mě živilo individuální členství lidí v klubu, protože je to pravidelný, předvídatelný příjem, který mi navíc zajišťuje největší nezávislost.

Individuální členství ale nevystačí, takže si domlouvám [spolupráce s firmami](pricing.md) vždy formou nějakého ročního firemního členství v klubu. Spolupráce s firmami jsou jednorázové větší příjmy, které lze obtížně předvídat a mohou ovlivňovat mou kritičnost k firmám, se kterými spolupracuji.

Inzerci nabídek práce nechci zrušit, ale aktuálně není na vrcholu mých priorit. Pokud, tak spíše v podobě dlouhodobé spolupráce s firmou, než formou jednorázových inzerátů.

Dobrovolné příspěvky stále hrají významnou roli v mých příjmech a velkou měrou právě díky nim JG ve svých počátcích neskončilo. Teď je ale čas postavit se na vlastní nohy! Možnost přispět zřejmě nezruším, ale přestal jsem ji propagovat. Chtěl bych, aby dobrovolné příspěvky jednou plně nahradilo individuální členství v klubu.

### Proč tu není MRR

MRR znamená _monthly recurring revenue_ a je základní metrikou většiny online byznysů, které jsou vedeny jako pravidelně placená služba. Je to součet výnosů, které mi pravidelně měsíčně chodí na účet skrze předplatné, tedy pravidelný příjem, na který se dá spolehnout. I když junior.guru je služba s členstvím na měsíční bázi a MRR by spočítat šlo, nakonec jsem se rozhodl jej zatím neřešit a dívám se spíš na ono TTM vydělené 12.

Jedním důvodem je složitost výpočtu. Data beru z bankovního účtu, kam mi ale nechodí částky za jednotlivé lidi. Stripe mi vždy posílá úhrnné částky za několik týdnů zpětně. Musel bych brát data zvlášť z Memberful. Navíc prodávám i roční členství, které bych musel rozpočítávat.

Druhým důvodem je malá vypovídající hodnota. Velkou část výnosů tvoří kontrakty s firmami, jež jsou nárazovým, ale ve svém množství poměrně stabilním příjmem. Pravidelné příjmy mám zase i z dobrovolných příspěvků, jež bych do MRR započítával jen velice složitě. Aby bylo číslo přesné, musel bych mít data o tom, jak přesně kdo přispívá přes Patreon nebo GitHub Sponsors, což se mi nevyplatí řešit.

## Náklady

Zahrnuji pouze náklady na byznys, ale zase i s daněmi a odvody na zdravotní a sociální pojištění. V roce 2020 je v nich díra, protože kvůli covidu-19 nebyla povinnost je platit. Občas jdou do mínusu (stává se z nich příjem), protože mi úřady něco vrátily.

Neplatím si žádnou reklamu. Výdaje na marketing jsou předplatné nástrojů jako Buffer nebo MailChimp, tisk samolepek, [konzultace](http://janadolejsova.cz/), apod.

## Členství v klubu

[Placený klub](https://junior.guru/club/) jsem [spustil](https://honzajavorek.cz/blog/spoustim-klub/) v únoru 2021. Aktuálně je na Discordu ** členů**, ale platících členů může být i víc. Někteří si platí členství pouze aby mě podpořili, bez toho aby se vůbec na Discord přihlásili.

Tenká modrá čára představuje počet členů, kteří si členství platí ze svého. Tenká zelená čára ukazuje ty z nich, kteří preferují roční platbu před měsíční.

### Typy členství

Každý příchozí člen má v klubu dva týdny zdarma, bez ohledu na to, jakým způsobem za členství následně platí. Některým lidem dávám vstup do klubu zcela zdarma, ať už na základě vlastního uvážení, jako poděkování např. za přednášku v klubu, jako stipendium, nebo ze strategických důvodů. Jde o různé spolupráce s komunitami, podcasty, nebo třeba zvaní mentorů na specifické technologie, jejichž zastoupení na straně seniorů je v klubu slabé, ale od juniorů je po tématu poptávka.

Část lidí má členství zdarma na základě toho, že mě v podpořili dobrovolnými příspěvky. V důsledku to tedy zdarma není, jen mi peníze poslali jinudy. Mnohdy poslali víc, než by je stálo standardní členství v klubu.

S mentory z [CoreSkill](https://coreskill.tech/) máme symbiózu. Nic si navzájem neplatíme. Oni využívají platformu klubu pro svůj mentoring a své studenty. Všichni mají automaticky vstup zdarma. Klub má díky tomu experty na frontend a moderátora Dana Srba, který může zaskakovat, kdyby bylo potřeba.

S některými vzdělávacími agenturami mám dohodu, že do klubu pošlou studenty svých kurzů a proplatí jim členství na první tři měsíce. Agentura z toho má službu pro studenty navíc a já z toho mám to, že pokud se lidem v klubu zalíbí, budou si jej dál platit ze svého.

### Příchody

Graf s registracemi obsahuje všechny typy členství. Ať už nový člen přišel přes firmu, stipendium, nebo individuálně, tak se započte. Tenká modrá čára představuje počet členů, kteří v daném měsíci poprvé v historii svého členství přešli na individuální placení. Jsou to především noví členové, kteří se po dvou týdnech na zkoušku rozhodli, že si klub začnou platit. Mohou to ale být i firemní členové nebo studenti ze vzdělávacích agentur, kterým skončilo členství zaplacené někým jiným a rozhodli se pokračovat za svoje.

### Odchody

Procento členů, kteří z klubu odcházejí, neboli _churn_. Tlustá čára zahrnuje i ty, kteří klub na dva týdny zdarma vyzkoušeli a poté za něj nezačali platit. Tam se očekává celkem velký odpad, ale i tak graf napovídá, jak se daří držet nově příchozí členy v klubu. Tenká čára sleduje pouze ty, kdo zrušili už existující individuálně placené členství. Naznačuje tedy odchody členů, kteří se za klub rozhodli platit, ale následně změnili názor. Očekává se, že juniorům, kteří si nakonec práci v IT našli, pokryjí většinu hodnoty klubu kolegové ve firmě, kde pracují. Také se v prvních měsících intenzivně zaučují a na klub tak často už nemají čas, i když je to tam baví.

### Délka setrvání v klubu

Není pro mě úplně zajímavé sledovat jak dlouho v klubu zůstávají ti, kterým členství platí firma, nebo jej mají zadarmo. Graf průměrné délky členství v klubu tedy počítá pouze s těmi, kdo si platí sami.

### Podíl žen v klubu

Podíl žen na počtu členů sleduji z vlastní zvědavosti a není to žádná přesná metrika. Nikdo nikde nevyplňuje, zda je žena nebo muž. Pro účely statistiky se to určuje jen odhadem podle křestního jména a tvaru příjmení.

Pro srovnání, podle [analýzy ČSÚ z roku 2020](https://www.czso.cz/csu/czso/cri/lidske-zdroje-v-informacnich-technologiich-2020) je v českém IT pouze 10 % žen a tento podíl se od jejich poslední analýzy před několika lety nezlepšil, naopak nás definitivně předběhly už všechny ostatní státy v Evropě.

## Počet zpráv v klubu

V grafu není celá historie, uchovávám data jen za rok zpětně. Některé kanály se nezapočítávají, např. „volná zábava“. Nejde o kompletní _engagement_, protože lidi se mohou v klubu projevovat různě, např. reagováním pomocí emoji.

Pouze orientační metrika. Nechci sledovat a glorifikovat _engagement_, protože lidi mají z klubu úplně v pohodě hodnotu i pokud si jej pouze čtou a já jsem s tím v pohodě (viz [Stop Measuring Community Engagement](https://rosie.land/posts/stop-measuring-community-engagement/)).

## Návštěvnost

Čísla návštěvnosti webu jsou na [simpleanalytics.com/junior.guru](https://simpleanalytics.com/junior.guru).

## Kód

Práci na kódu lze sledovat [na GitHubu](https://github.com/honzajavorek/junior.guru/graphs/contributors).
