# CFO praxe: skupinový manažerský P&L pro malou servisní skupinu

Shrnutí ověřené praxe pro model výsledku skupiny TF, TIO, DBG a RTSG na Q1 2027. Jde o manažerský pohled,
ne statutární konsolidaci, takže si můžeme dovolit zjednodušení. Eliminace vnitroskupinových toků ale musí
být důsledná.

## 1. Manažerská konsolidace a eliminace intercompany toků

Statutární konsolidace sleduje právní vlastnictví a účetní standardy, manažerská sleduje, jak se byznys
skutečně řídí, a může běžet jako samostatný proces vedle statutární uzávěrky (Prophix). V obou platí, že
skupina nemůže mít výnos sama od sebe: vnitroskupinový výnos se spáruje s vnitroskupinovým nákladem a oba se
odstraní, takže skupinový výsledek obsahuje jen externí výnosy a náklady (acadifi). V manažerském reportingu
to řeší sloupec Eliminace vedle sloupců entit, který intercompany položky vynuluje; součet řádku dává skupinu
(Fathom). Náklad, který vzniká v jedné firmě a slouží jiné (nájem placený DBG třetí straně, užívaný TF),
zůstává u firmy, která ho platí; přefakturace se eliminuje a ve skupině se objeví přesně jednou. Protože
interní ceny určuje management a lze jimi přesouvat zisk mezi entitami, vypovídá výsledek entity před
eliminací méně než výsledek skupiny (acadifi).

## 2. Fixní, variabilní a polo-fixní náklady v servisní firmě

Variabilní náklad roste přímo s aktivitou: subdodavatelé, provize, nepřefakturované cestovné, spotřebovaný
cloud. Mzdy billable lidí jsou variabilní jen tehdy, pokud jsou lidé placeni pouze za fakturované hodiny;
zaměstnanec s pevnou mzdou je fixní náklad (AccountingTools). Učebnicově jde o stupňovitý (step) náklad:
v daném pásmu aktivity je konstantní a skokem roste s každým dalším člověkem (CIMA P1). Contribution margin
je výnos minus variabilní náklady, tedy částka na pokrytí fixních nákladů a zisk, a základ break-even úvahy (CFI).

## 3. Driver-based plánování: headcount × utilization × sazba

Standardní model výnosů profesionálních služeb je billable headcount × dostupné hodiny × billable utilization
× realizovaná sazba (Jirav). Každý driver se chová jinak: headcount je rozvrh s náběhem nováčků, dostupné
hodiny jsou kalendář minus dovolené a interní práce, utilization je ventil, kde se první projeví neprodaná
kapacita, realizovaná sazba je ceník minus slevy a nevyfakturovaný rozsah (Jirav). Pro kalibraci: průměrná
billable utilization podle SPI benchmarku klesla v roce 2025 na 66,4 %, cíl je 75 %, nejvyspělejší firmy drží
přes 80 % (Deltek/SPI). Fixní režie se k výnosovému modelu přidávají jako samostatné řádky plánované na měsíc,
ne jako procento výnosu.

## 4. Rolling forecast místo jednoho ročního rozpočtu

Rolling budget se pravidelně doplňuje o další období, takže horizont zůstává stejně dlouhý; ACCA uvádí jako
výhodu aktuálnost a vyšší závazek managementu, jako nevýhodu pracnost (ACCA PM). Běžná praxe je hybrid: roční
rozpočet zůstává pevnou základnou pro odpovědnost, vedle něj běží kvartální re-forecast pro rozhodování (AFP).
Pro malé firmy je zásadní jednoduchost: každé P&L shrnout na jednu stranu, protože vedení nečte víc než hlavní
čísla, a u více P&L dodat krátký konsolidovaný pack s individuálními výkazy a komentářem odchylek (AccountingWEB).

## 5. Alokace sdílených režií a management fee

ACCA rozlišuje controllable profit (hodnotí manažera), traceable profit (hodnotí divizi) a divizní zisk po
přiřazení centrálních nákladů (srovnání s externím konkurentem); centrálně vzniklé a přerozdělené režie se
mají z traceable profit vyloučit, protože slouží více divizím a manažer je neovlivní (ACCA APM). Alokace
náklady jen přesouvá a často vede k debatám o klíči místo o nákladu samotném. Pro malou skupinu z toho plyne:
náklad nechat tam, kde vzniká a kde je kontrolovatelný, a případnou alokaci udělat jednou, jedním klíčem
a viditelně v samostatném řádku, nikdy skrytě v intercompany fakturaci, která se stejně eliminuje.

## Doporučení pro nás

Pro Q1 2027 doporučuji jednotnou strukturu řádků pro všechny čtyři firmy: externí výnosy, variabilní náklady
(subdodavatelé, outsource dodavatelé, provize, cloud účtovaný klientům), contribution margin, osobní náklady
interního týmu jako polo-fixní v samostatném bloku, fixní režie (nájem Titanium, administrativa, licence,
účetní), **výsledek před odměnami boardu**, odměny boardu (fixní a variabilní část zvlášť) a výsledek po
odměnách. Board jako samostatný blok proto, že jeho variabilní část závisí na výsledku a vzniká cyklus, který
je lepší vidět než skrývat. Vnitroskupinové výnosy a náklady vést v každé firmě odděleně od externích
a eliminovat je na úrovni skupiny ve sloupci Eliminace (model B); model A, kde je IC očištěno už uvnitř firem,
je pro čtení jednodušší, ale skryje marže DBG na nájmu a paušálech, které dnes drží výsledek DBG. Externí
výnosy TF plánovat driver-based (lidé × MD × fakturovatelnost × sazba), TIO přes pipeline a provizní sazbu,
DBG a RTSG mají externí výnosy nula. Náklady plánovat po měsících, ne procentem výnosu. Sdílené režie nechat
v DBG, kde vznikají, a nealokovat je: eliminace nájmu a paušálů ukáže skutečný náklad skupiny bez alokačních
klíčů. Model stavět jako kvartální re-forecast s měsíční granularitou, jedna strana P&L na entitu plus jedna
za skupinu.

## Zdroje

Poznámka: plné texty stránek nebyly z tohoto prostředí dostupné (egress proxy), obsah vychází z atribuovaných
výňatků ve výsledcích vyhledávání. Odkazy jsou skutečné URL z vyhledávání.

- [Prophix: Statutory consolidation and management reporting](https://www.prophix.com/blog/statutory-consolidation-and-management-reporting-weighing-the-pros-and-cons)
- [acadifi: How are intercompany management fees eliminated in consolidation](https://acadifi.com/community/intercompany-management-fees-elimination-consolidation-entries)
- [Fathom Help: Eliminations in a consolidated group](https://support.fathomhq.com/consolidations/eliminations-in-a-consolidated-group)
- [AccountingTools: Examples of variable costs](https://www.accountingtools.com/articles/what-are-examples-of-variable-costs.html)
- [CIMA P1 (acowtancy): Types of cost behaviour](https://www.acowtancy.com/textbook/cima-p1/costing-concepts-1/a3g-types-of-cost-behaviour/notes)
- [Corporate Finance Institute: Contribution margin](https://corporatefinanceinstitute.com/resources/accounting/contribution-margin-overview)
- [Jirav Help: Forecast professional services revenue from headcount, utilization and billable rate](https://help.jirav.com/professional-services-revenue)
- [Jirav: FP&A for professional services firms](https://www.jirav.com/blog/fpa-for-professional-services-firms-planning-kpis-and-forecasting)
- [Deltek: 5 KPIs from the SPI Professional Services Maturity Benchmark](https://www.deltek.com/en/resources/articles/5-kpis-from-the-spi-professional-services-maturity-benchmark-report-every-pso-must-track-for-sustainable-growth)
- [ACCA PM: Budgeting (rolling budgets)](https://www.accaglobal.com/uk/en/student/exam-support-resources/fundamentals-exams-study-resources/f5/technical-articles/budgeting5.html)
- [AFP: 8 steps for creating a rolling forecast](https://www.financialprofessionals.org/training-resources/resources/articles/details/8-steps-for-creating-a-rolling-forecast)
- [AccountingWEB: Monthly management accounts](https://www.accountingweb.co.uk/node/105517)
- [ACCA APM: Divisional performance management](https://www.accaglobal.com/gb/en/student/exam-support-resources/professional-exams-study-resources/p5/technical-articles/divisional-performance-management.html)
