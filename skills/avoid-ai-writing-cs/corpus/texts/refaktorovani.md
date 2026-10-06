Refaktorování je disciplinovaný proces provádění změn v softwarovém systému takovým způsobem, že nemají vliv na vnější chování kódu, ale vylepšují jeho vnitřní strukturu s minimálním rizikem vnášení chyb. Při refaktorování se provádí malé až primitivní změny, ale celkový efekt je velký, a to v podobě čistšího, průhlednějšího a čitelnějšího kódu, kód se také lépe udržuje a rozšiřuje. Zlepšuje se také celková kvalita kódu a architektura, snižuje se počet chyb a tím i zvyšuje rychlost vývoje programu. Refaktorování pomáhá pochopit a více si ujasnit kód, což je vhodné zejména upravování zdrojového kódu po někom jiném.

Refaktorování se začalo používat mezi programátory ve Smalltalku, což je čistě objektový programovací jazyk, kde existoval první na tuto činnost vhodný nástroj. Později, když již bylo refaktorování v povědomí některých programátorů a metody refaktorování jimi byly dostatečně prověřeny, napsal Martin Fowler za velké pomoci těchto zkušených programátorů knihu Refactoring: Improving the Design of Existing Code, která je dodnes využívána jako základní příručka k poznání a naučení se správného refaktorování. Refaktorování je dnes již neodmyslitelnou součástí moderního programování.

Při nedostatečné znalosti může být refaktorování velice riskantní, jelikož se upravuje funkční kód a touto úpravou mohou být do kódu zavedeny velice záludné chyby a program již nemusí být funkční. Proto mezi hlavní zásadu patří mít před samotným refaktorováním připravenou dobrou sadu testů, které se spustí po každé změně.

Další důležitá zásada je refaktorovat po malých krocích a to neustále a ihned testovat, zda někde nevznikla chyba. Většina programátorů provádí refaktorování, aniž by o něm věděla, jelikož jedna z nejdůležitějších zásad programátora je, aby ve svém kódu neměl duplicity. Když nějakou duplicitu objeví, snaží se jí zbavit, a to většinou nevědomky refaktorováním, a to konkrétně postupem vyjmout metodu.

Martin Fowler ve své knize Refaktorování uvádí 22 „pachů v kódu“, které jsou známkou toho, že by kód měl být refaktorován a zároveň uvádí, jaké techniky jsou pro ten který pach třeba. To ale neznamená, že to tak musí vždy být, vždy závisí na konkrétní situaci. Zde jsou nastíněny pouze některé pachy v kódu, ty nejzákladnější a většinou i nejčastější:

Duplicitní kód – pokud je v kódu na více místech stejná struktura

Dlouhá metoda – záleží na každém, kolik řádků už je pro něj dlouhá metoda, pokud se taková objeví, většinou se v takové metodě řeší více problémů najednou a měla by být rozdělena na metody menší, které řeší právě jeden problém. Pak je kód i čitelnější.

Velká třída – pokud se třída snaží dělat více věcí najednou, není to z pohledu objektově orientovaného programování dobře, jelikož každá třída by správně měla řešit právě jeden problém, tudíž řešením je rozdělit třídu na více tříd

Dlouhý seznam parametrů – metody s dlouhým počtem parametrů jsou většinou nesrozumitelné, pokud tyto předávané parametry obsahuje nějaký objekt, je řešením předat jako parametr tento objekt

Příkaz switch – měl by být řešen pomocí polymorfismu a vyčleněn do samostatné metody

Komentáře – pokud má programátor tendenci komentovat uvnitř metody svůj kód, je většinou lepší tento kód vyčlenit do samostatné metody, a pomocí vhodného názvu této metody odpadne nutnost komentáře

Další důvody proč a kdy začít s refaktorováním:

nedaří se najít chybu v kódu, opět pro čitelnost a sebepopisnost kódu.

A v neposlední řadě je tu „kritérium tří“: refaktorovat místo třetího opakovaní – pravidlo Dona Robertse.

Při refaktorování nelze zapomenout na metaforu dvou klobouků od Kenta Becka: v jednom klobouku se přidává funkcionalita a nemění struktura, v druhém klobouku se mění struktura a nepřidává funkcionalita. Lze je měnit klidně každých 5 minut, ale vždy je třeba vědět, co je prováděno, tedy jaký klobouk je na hlavě a nemíchat přidávání funkcionality s refaktorováním.

Obecně refaktorování nemají rádi vedoucí projektů, protože může trvat velice dlouho, projekt zbrzdit a nepřinést na první pohled žádný viditelný výsledek. Pokud je vedoucí projektu proti refaktorování, je třeba vyzdvihnout především jeho pozitiva mimo jiné i to, že náklady na budoucí provoz se sníží, stejně tak jako doba potřebná k přidání nové funkčnosti a těmito argumenty se ho snažit přesvědčit.

</span> hide-when-compact ambox-text"}]]}'>Můžete Wikipedii pomoci tím, že ji vylepšíte. Jak by měly články vypadat, popisují stránky Vzhled a styl, Encyklopedický styl a Odkazy.

Zde se uvádí výčet technik refaktorování, které jsou detailně popsané v knize Refaktorování.

nahradit dočasnou proměnnou dotazem (metodou, která spočítá její hodnotu)

přejmenovat metodu a přejmenovat položku – změna názvu na lepší a výstižnější

vyjmout metodu – z dlouhé metody se vyjme část kódu, který je vložen do nové metody

přesunout metodu a přesunout položku – přesun do vhodné třídy

vyjmout třídu – vyjme se část kódu třídy a vloží do třídy nové

zapouzdřit soukromou položku – k přístupu k proměnné použít gettery a settery

přesunout metodu výš, přesunout položku výš – přesun do předka

přesunout metodu níž, přesunout položku níž – přesun do potomka

přesunout tělo konstruktoru výš – přesun do předka

vyjmout rodičovskou třídu – vyjmutí předka

přejmenovat metodu a přejmenovat položku – změna názvu na lepší a výstižnější

nahradit magické číslo symbolickou konstantou

nahradit vnořenou podmínku varovnými klausulemi

Existuje vazba mezi refaktorováním a návrhovými vzory, a to taková, že vzory popisují definovaný cíl a naopak refaktorování popisuje způsob, jak se k tomuto cíli dostat.

Některé postupy při refaktorování je možné přesně definovat a zcela automatizovat a dnes je již v moderních vývojových prostředích nabízena podpora při refaktorování. Technika vyjmout metodu z dlouhé metody již tedy není složitá a prakticky u něj není ani potřeba více přemýšlet, udělá jej program. Někteří si při psaní kódu ani neuvědomují, že například změna názvu proměnné je také refaktorování, které provede program, avšak dříve tato změna byla velmi náročná.

FOWLER, Martin. Refaktoring: Zlepšení existujícího kódu (původním názvem: Refactoring: Improving the Design of Existing Code). Překlad Vladimír Lahoda. Praha: Grada, 2003. ISBN 80-247-0299-1.

Slovníkové heslo refaktorování ve Wikislovníku

(anglicky) Stránka Martina Fowlera o refaktoringu

Citováno z „https://cs.wikipedia.org/w/index.php?title=Refaktorování&oldid=24761393“

Skryté kategorie: Údržba:Články k částečné úpravě