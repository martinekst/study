# Archiv přepisů z Plaudu pro Claude Code: porovnání řešení

Stav: návrh k rozhodnutí, nic není naprogramováno. Datum: 9. 10. 2026.
Zadání od Martina: plný přepis plus index; čte jen Martinovo Claude Code;
firemní úložiště je v pořádku; první vlna jen Plaud, architektura pro další
zdroje; bez PC a bez vlastního serveru; kritéria v pořadí spolehlivost,
tokeny, pracnost údržby, bezpečnost (hlavně vkládání pokynů), pracnost
zavedení.

## 1. Doporučení v pěti větách

1. Založit jeden privátní repozitář na GitHubu (pracovně `tf-meetings`)
   s přepisy jako markdown soubory a s indexem; to je zároveň to, co
   Anthropic doporučuje pro znalosti agentů: soubory, které si agent
   prohledá a načte jen to, co potřebuje.
2. Plnit ho jednou denně rutinou Claude Code v cloudu Anthropicu (stejný
   mechanismus, jakým dnes běží „ISDG daily-collection“), přičemž přepis
   se kopíruje skriptem bez průchodu modelem a model píše jen shrnutí
   a řádek indexu.
3. Projekty (ISDG, GRIT, další) Plaud přestanou číst; čtou index archivu
   a kompaktní přepis, který má poloviční velikost oproti tomu, co dnes
   vrací konektor Plaudu.
4. GRIT, který běží v GPT, může číst stejný repozitář přes GitHub
   konektor; archiv je tak nezávislý na tom, která AI ho čte.
5. Zpětný přenos od 1. 9. 2026 zvládne jedna až dvě rutinní dávky; celá
   historie od května je také zvládnutelná, viz odhad níže.

Google Drive a Confluence vycházejí hůř hlavně proto, že do nich obsah
musí „vyprodukovat“ model (konektor nemá skript, který by soubor zkopíroval),
takže každý přepis stojí výstupní tokeny. Externí znalostní služby
(vektorová databáze, Notion AI apod.) jsou pro tento objem zbytečné
a znamenají data u třetí strany.

## 2. Co jsem změřil

Tempo za 30 dní (9. 9. až 9. 10. 2026):

| Ukazatel | Hodnota |
| --- | --- |
| Nahrávek | 95 (asi 22 týdně, 4 až 5 za pracovní den) |
| Hodin záznamu | 44 (asi 10 týdně) |
| Průměrná délka | 28 min |
| Historie v Plaudu | od 18. 5. 2026, celkem zhruba 250 nahrávek, odhad 130 h |

Velikost přepisu (měřeno na nahrávce 87 min, 312 replik, 10 mluvčích):

| Podoba | Znaků | Odhad tokenů | Tokenů na minutu schůzky |
| --- | --- | --- | --- |
| JSON, jak ho vrací konektor Plaudu | 115 558 | 33 000 | 377 |
| Kompaktní markdown `[mm:ss] mluvčí: text` | 53 646 | 16 300 | 186 |

JSON z konektoru nese ke každé replice identifikátory a časy, proto je
dvojnásobný. Odhad tokenů je z počtu znaků (3,3 až 3,5 znaku na token
u češtiny), přesnost zhruba ±25 %.

Chování Claude Code s velkými výsledky nástrojů (ověřeno v této relaci):
přepis 25minutové schůzky (asi 10 tisíc tokenů) přišel celý do kontextu
modelu; přepis 87minutové schůzky (33 tisíc tokenů) do kontextu nepřišel,
Claude Code ho uložil do souboru na disk a modelu dal jen cestu. Soubor
lze dál zpracovat skriptem, aniž by jeho obsah prošel modelem. Na tomto
chování stojí úsporná varianta plnění (viz 4.2).

Jak to dnes dělá ISDG (playbook `daily-collection` v repozitáři
ISDG---deGama): rutina každý pracovní den vylistuje Plaud za 14 dní
s filtrem „isdg“ v názvu, nové nahrávky pozná podle `id`, přečte osnovu
a jen relevantní části přepisu, doslovné citace zapíše do `raw/`.
Nahrávka bez značky v názvu je pro projekt neviditelná. Složky z Plaudu
konektor nevrací (v datech nahrávky není žádné pole složky), značka
v názvu je tedy jediný dostupný způsob třídění přímo v Plaudu.

## 3. Co k tomu říká Anthropic

Zdroje jsou oficiální dokumentace a inženýrský blog Anthropicu, ověřeno
9. 10. 2026. Principy, na kterých návrh stojí:

- **Kontext „právě včas“.** Agent má držet lehké identifikátory (cesty
  k souborům, uložené dotazy, odkazy) a obsah načítat až za běhu nástroji,
  ne dostat všechno dopředu. Claude Code si soubory hledá přes glob a grep,
  což podle Anthropicu obchází problém zastaralého indexu; vektorové
  hledání má smysl jako doplněk a platí „udělej nejjednodušší věc, která
  funguje“.
  https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- **Malý korpus bez vektorů.** Znalostní báze do 200 tisíc tokenů se má
  dát do promptu celá (s cachováním), nad tím Anthropic měří přínos
  kontextového vyhledávání. Měsíční index archivu má asi 8 tisíc tokenů,
  kompaktní přepisy za měsíc asi 0,5 M; proto index do kontextu, přepisy
  jen na vyžádání. https://www.anthropic.com/news/contextual-retrieval
- **Postupné odkrývání.** Skill má v kontextu jen název a popis, SKILL.md
  se načte, když je potřeba, a odkazované soubory „jen podle potřeby“;
  SKILL.md je rozcestník do 500 řádků, reference jedna úroveň hluboko,
  delší soubory s obsahem, hledání typu `grep -i "revenue" reference/finance.md`.
  Stejně má fungovat index archivu a skill pro jeho čtení.
  https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
  https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
- **Paměť Claude Code jsou soubory, ale ne pro přepisy.** CLAUDE.md
  a importy `@cesta` se načítají při startu celé, takže přepisy do nich
  nepatří. Automatická paměť Claude Code je vázaná na stroj a v cloudových
  prostředích se nesdílí; pro sdílení napříč repozitáři Anthropic nenabízí
  nic lepšího než další repozitář nebo soubory, které si relace naklonuje.
  https://code.claude.com/docs/en/memory
- **Rutiny Claude Code** (výzkumný náhled, plány Pro, Max, Team,
  Enterprise): prompt, jeden nebo více repozitářů (každý se při běhu
  naklonuje) a konektory; nejkratší interval hodina; běží v cloudovém
  prostředí Anthropicu a čerpají předplatné stejně jako interaktivní
  relace. Konektory jsou ve výchozím stavu všechny připojené, ve formuláři
  rutiny se nepotřebné odeberou; rutina může bez ptaní i zapisovat, proto
  se rutině plnění přidělí jen Plaud. Proměnné prostředí vidí každý, kdo
  prostředí používá; klíče k API patří do síťových tajemství. Po vyčerpání
  limitu předplatného se běhy odmítají, pokud nejsou zapnuté platby za
  využití navíc.
  https://code.claude.com/docs/en/routines
- **Velké výsledky nástrojů.** Výsledek nástroje MCP nad 25 000 tokenů
  (proměnná `MAX_MCP_OUTPUT_TOKENS`) nebo nad 50 000 znaků Claude Code
  uloží do souboru a modelu předá jen cestu. Odtud plyne úsporná varianta
  plnění: soubor převede skript, model ho nečte.
  https://code.claude.com/docs/en/mcp
- **GitHub Action Claude Code** umí běžet na cron, ale v neinteraktivním
  běhu nezvládne přihlášení OAuth ke vzdálenému MCP a konektory claude.ai
  (Plaud, Drive) se načítají jen při přihlášení předplatným. Pro Actions
  je tedy nutný vlastní klíč k API Plaudu, konektor použít nejde.
  https://code.claude.com/docs/en/github-actions
  https://code.claude.com/docs/en/mcp
- **Cache a limity.** Claude Code cachuje prompt automaticky; na
  předplatném drží cache hodinu. Čtení z cache stojí u Opus 5.5 dvacetinu
  vstupní ceny, ale dokumentace neříká, zda se do limitů plánu Max počítá
  s nižší vahou. Plán Max má pětihodinový a týdenní limit společný pro
  Claude i Claude Code; rutiny a cloudové relace čerpají tytéž limity.
  https://code.claude.com/docs/en/prompt-caching
  https://support.claude.com/en/articles/11145838-using-claude-code-with-your-max-plan
- **Vkládání pokynů.** Dokumentace bezpečnosti Claude Code doporučuje
  nelít nedůvěryhodný obsah přímo do modelu, kontrolovat navržené příkazy
  a držet nejmenší potřebná oprávnění; pro vývojáře nad API: obsah třetích
  stran držet v blocích výsledků nástrojů, označit zdroj a v systémovém
  promptu říct, že jde o data, ne pokyny. V této relaci přišly výsledky
  konektoru Plaud obalené jako nedůvěryhodná data; dokumentace to
  výslovně neslibuje, soubor na disku takové označení nemá.
  https://code.claude.com/docs/en/security
  https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks

## 4. Možnosti

### 4.1 Kde data leží

| Úložiště | Pro | Proti |
| --- | --- | --- |
| Privátní repozitář GitHub (markdown) | Skript může soubory zapsat bez modelu; git = historie, deduplikace, grep; čitelné přímo na GitHubu; čte ho Claude Code i GPT | Práce s gitem v rutině (klon, push); lidská čitelnost jen přes GitHub nebo lokální nástroj |
| Google Drive (dokumenty nebo .md) | Lidsky čitelné hned; fulltextové hledání konektorem | Obsah zapisuje model (výstupní tokeny za každý přepis); žádná deduplikace mimo vlastní evidenci; výsledky hledání drahé na tokeny |
| Confluence | Týmová čitelnost, prostor na projekt | Obsah zapisuje model; formát stránek je upovídaný (více tokenů); hledání přes CQL vrací celé stránky |
| Bez kopie (sdílený skill, přepisy zůstávají v Plaudu) | Nulová pracnost zavedení | Nic neřeší: každý projekt dál čte JSON z Plaudu; nelze hledat napříč schůzkami jinak než čtením přepisů; závislost na značce v názvu |
| Externí znalostní služba (vektorová DB, Notion AI, Mem0 a podobné) | Sémantické hledání | Data u třetí strany; další účet a údržba; pro 1 M tokenů měsíčně zbytečné |

### 4.2 Kdo archiv plní

| Způsob | Jak to funguje | Tokeny | Podmínka |
| --- | --- | --- | --- |
| Rutina Claude Code, vše přes model | Rutina zavolá konektor, přepis přijde do kontextu, model ho zapíše do souboru a napíše shrnutí | Vstup i výstup za celý přepis | Žádná, funguje dnes |
| Rutina Claude Code, kopie skriptem | Rutina zavolá konektor tak, aby výsledek skončil v souboru; skript ho převede na markdown; model čte jen kompaktní přepis kvůli shrnutí | Vstup za kompaktní přepis, výstup jen shrnutí | Dnes se do souboru odkládá výsledek nad 25 000 tokenů nebo 50 000 znaků, tedy nahrávka delší než asi 38 min; pro kratší je třeba v prostředí rutiny snížit `MAX_MCP_OUTPUT_TOKENS`, což je nutné ověřit v pilotu (dokumentace popisuje jen zvyšování) |
| GitHub Actions + API Plaudu | Naplánovaný workflow stáhne přepisy přímo z Plaudu a commitne; shrnutí dopíše rutina nebo Claude Code Action | Kopie bez modelu | Konektor Plaud v Actions použít nejde (bez přihlášení claude.ai), nutný klíč k veřejnému API Plaudu [DOPLNIT z rešerše, zda existuje] |
| Skript v Google Workspace | Totéž co Actions, ale do Drive | Kopie bez modelu | Stejná podmínka; navíc nevýhody Drive |

### 4.3 Jak projekty z archivu čtou

- Archiv jako druhý repozitář projektové rutiny (rutina může mít víc
  repozitářů, každý se při běhu naklonuje) nebo přidaný do relace (v této
  relaci jsem tak přidal repozitář ISDG), potom grep indexu a čtení
  souborů. Nejlevnější a nejspolehlivější.
- GitHub konektor (čtení souboru, hledání v kódu) bez klonu. Hodí se
  pro GPT a pro občasné dotazy; hledání má zpoždění indexace.
- Sdílený skill „meetings-lookup“ v knihovně skillů: popíše projektu, jak
  hledat levně (index → shrnutí → přepis), aby to každý projekt nedělal
  po svém.

## 5. Porovnání variant

Varianty kombinují úložiště a plnění. Hodnocení: nízká, střední, vysoká;
u tokenů měsíční objem, který projde modelem při dnešním tempu (odhad
skriptem `odhad_tokenu.py`, viz část 6).

| Kritérium | V1 Repozitář + rutina, kopie skriptem (doporučeno) | V2 Repozitář + rutina, vše přes model | V3 Repozitář + Actions s API Plaudu | V4 Google Drive + rutina | V5 Confluence + rutina | V6 Bez kopie, jen skill |
| --- | --- | --- | --- | --- | --- | --- |
| Spolehlivost | vysoká: deduplikace podle `id`, stav v repozitáři, běh se dá zopakovat | střední: dlouhé přepisy zahlcují kontext, hrozí zkrácení nebo přeskočení | vysoká, pokud API existuje a je stabilní | střední: žádná evidence stavu mimo soubory, snadno vzniknou duplicity | střední: totéž, navíc formátování | nízká: závislost na značce v názvu, žádné hledání |
| Tokeny za měsíc | 0,9 M vstup, 0,06 M výstup | 1,4 M vstup, 0,55 M výstup | 0,7 M vstup, 0,06 M výstup | 1,4 M vstup, 0,55 M výstup | vyšší než Drive (formát stránek) | 0,5 M vstup (2 projekty), bez možnosti dotazů napříč |
| Pracnost údržby | nízká: jeden playbook, jeden skript, jedna rutina | nízká | střední: workflow, tajný klíč, změny API | střední: ruční evidence zpracovaných nahrávek | střední | nízká |
| Bezpečnost | vysoká: data v privátním repozitáři TechFides, rutina jen s konektorem Plaud + GitHub, přepisy označené jako data | stejná | vysoká; klíč k Plaudu v tajemstvích GitHubu | střední: sdílení Drive se snadno rozšíří; obsah prochází dalším konektorem | střední: široká viditelnost v Confluence | vysoká (nic nového nevzniká) |
| Pracnost zavedení | střední: repozitář, skript, playbook rutiny, úprava dvou projektů | nízká až střední | střední až vysoká | nízká až střední | střední | nízká |
| Lidská čitelnost | dobrá na GitHubu; lokálně Obsidian nebo VitePress | stejná | stejná | výborná | výborná | jen v Plaudu |
| Použitelnost pro GRIT v GPT | ano, GitHub konektor | ano | ano | ano, Drive konektor | ano | ne (GPT čte Plaud zvlášť) |
| Rozšíření na Slack, Gmail, Drive | stejný vzor: zdroj → skript → markdown → index | stejný | obtížnější (každý zdroj = jiné API) | stejný vzor | stejný vzor | ne |

## 6. Odhad tokenů při Martinově tempu

Výpočet je ve skriptu `odhad_tokenu.py` (ve scratchpadu relace, kopie
níže v příloze). Vstupy: 95 nahrávek a 2 650 minut za měsíc, 22 pracovních
dnů, sazby z části 2, 600 tokenů výstupu na shrnutí a řádek indexu,
20 tisíc tokenů režie na jeden běh rutiny (předpoklad).

| Varianta | Vstup za měsíc | Výstup za měsíc | Pro představu v USD (Opus 5.5, 4/20 USD za 1 M) |
| --- | --- | --- | --- |
| A rutina, vše přes model (V2, V4, V5) | 1,44 M | 0,55 M | 17 |
| B rutina, kopie skriptem (V1) | 0,93 M | 0,06 M | 5 |
| C Actions + API Plaudu (V3) | 0,71 M | 0,06 M | 4 |
| E dnes: 2 projekty čtou Plaud přímo (jen část Plaud) | 0,47 M | 0 | 2 |
| F po zavedení: 2 projekty čtou archiv (jen část Plaud) | 0,30 M | 0 | 1 |

Co z toho plyne:

- Plaud dnes není hlavní žrout tokenů. Část Plaud v denních rutinách
  dělá zhruba 0,5 M tokenů měsíčně; zbytek rutiny (Slack, Gmail, Jira,
  zápisy) je pravděpodobně několikanásobně víc. Archiv ušetří projektům
  asi třetinu této části, tedy řádově 0,2 M měsíčně; to je přínos malý.
- Hlavní přínos archivu je jinde: dotaz napříč schůzkami stojí asi 17
  tisíc tokenů (grep indexu plus 2 až 3 kompaktní přepisy) místo 35 tisíc
  (výpis plus 3 JSON přepisy) a hlavně je vůbec možný; dnes projekt vidí
  jen nahrávky se značkou v názvu.
- Varianta B stojí měsíčně asi 1 M tokenů navíc oproti dnešku; to je
  méně než jedna delší pracovní relace v Claude Code. Na plánu Max jde
  o čerpání limitů, ne o peníze; částky v USD jsou jen měřítko.
- Zpětný přenos: od 1. 9. 2026 (asi 110 nahrávek, 50 h) stojí ve variantě
  B 0,56 M vstup a 0,07 M výstup; celá historie od 18. 5. (asi 250
  nahrávek, 130 h) 1,45 M vstup a 0,15 M výstup. Oboje je zvládnutelné
  v několika dávkách po 10 až 20 nahrávkách; ve variantě A by celá
  historie stála navíc 1,6 M výstupních tokenů.

## 7. Doporučené řešení v obrysech

Struktura archivu (návrh, názvy jsou pracovní):

```
tf-meetings/                      privátní repozitář (org TechFides)
  README.md                       co to je, pravidla, jak hledat
  index/2026-10.md                jeden řádek na nahrávku: datum, čas, délka, projekty, název, mluvčí, cesta
  index/projekty/isdg.md          pohled projektu (generovaný z front matter)
  meetings/2026/10/2026-10-09_0759_isdg-standup_db465ad2.md
      front matter: plaud_id, start (UTC i Praha), délka, mluvčí, projekty, stav značky, ingest
      Shrnutí (Claude, 5 až 10 řádků, bez interpretace: co zaznělo, ne co „bylo rozhodnuto“)
      Témata s časy
      Přepis (kompaktní)
  state/plaud.json                zpracovaná id, poslední běh, přejmenování
  scripts/plaud_json_to_md.py     převod výsledku konektoru na markdown
  .claude/skills/meetings-lookup/ jak hledat levně (index → shrnutí → přepis)
```

Denní rutina (pracovní dny ráno, před projektovými rutinami; konektor
jen Plaud, repozitář jen archiv, push do hlavní větve jako u ISDG):

1. Vylistovat Plaud za posledních 7 dní (nahrávky se objevují i se
   zpožděním a přejmenovávají se), porovnat `id` se stavem.
2. U každé nové nahrávky stáhnout přepis tak, aby skončil v souboru,
   převést skriptem, uložit; model dostane jen kompaktní přepis pro
   shrnutí a řádek indexu.
3. Přiřadit projekty: značka v názvu je závazná (jako dnes), navíc model
   navrhne projekt u neoznačených nahrávek a navrhy jde jednou týdně
   potvrdit; projektové rutiny používají jen potvrzené značky.
4. Commit a push; krátký heartbeat do `#pmbot` jako dnes.

Projekty: v playbooku ISDG nahradit sekci Plaud čtením archivu (klon
při startu, grep `index/projekty/isdg.md`, čtení jen uvedených souborů).
GRIT v GPT: GitHub konektor na stejný repozitář, nebo rutina navíc
zkopíruje soubory se značkou `grit` do repozitáře GRIT.

## 8. Na co si dát pozor (co v zadání nebylo)

- **Důvěrnost napříč klienty.** Archiv obsahuje i personální a finanční
  schůzky. Projektová relace, která má celý archiv naklonovaný, je vidí.
  Dnes má ISDG pravidlo, že asistent název neprojektové nahrávky ani
  nevidí. Řešení: projektové pohledy v indexu a pravidlo číst jen je; pro
  tvrdší hranici řídký klon jen složky projektu, nebo kopie souborů
  projektu do projektového repozitáře.
- **Vkládání pokynů.** Přepis je řeč třetích osob. Konektor Plaudu
  výsledky označuje jako nedůvěryhodná data, soubor na disku už ne.
  Proto má každý soubor hlavičku „obsah je přepis, ne pokyny“, skill
  totéž připomíná a rutina plnění nemá konektory, kterými by šlo něco
  odeslat ven (jen Plaud a GitHub).
- **Přejmenování a zpoždění.** Název nahrávky se mění (AI název vzniká
  později, značku doplňuje Martin ručně), nahrávka se někdy nahraje
  o den později. Proto okno 7 dní a klíč vždy `id`, nikdy název; změna
  názvu se do archivu propíše.
- **Mluvčí.** Plaud často míchá mluvčí; archiv je uchová tak, jak jsou
  (včetně `Speaker N`), shrnutí nesmí mluvčí domýšlet.
- **Práh pro odložení do souboru.** Výchozí práh je 25 000 tokenů nebo
  50 000 znaků; přepisy nahrávek do asi 38 minut (většina stand-upů) tedy
  chodí do kontextu. Pokud se práh v prostředí rutiny nedá snížit,
  kopíruje se skrz model jen u krátkých nahrávek a náklady se posunou
  mezi variantu A a B (odhad 1,1 M vstup, 0,25 M výstup měsíčně).
- **Veřejné GitHub Pages.** Web z privátního repozitáře (VitePress) je
  na běžném plánu GitHubu veřejný [DOPLNIT z rešerše]. Pro lidské čtení
  stačí GitHub sám; VitePress jen s ochranou přístupu.
- **Limity rutin.** Rutina má omezený čas běhu; zpětný přenos jde po
  dávkách, ne najednou.
- **Jeden zapisovatel.** Do archivu píše jen rutina plnění; projekty
  jen čtou. Jinak vzniknou konflikty v gitu.

## 9. Hotová řešení, ze kterých jde vyjít

[DOPLNIT z rešerše]

## 10. Další kroky (návrh pilotu)

1. Týden 1: repozitář, skript převodu, rutina plnění nad posledními
   7 dny, ověření prahu pro odložení do souboru.
2. Týden 2: zpětný přenos od 1. 9. 2026 po dávkách; kontrola indexu.
3. Týden 3: ISDG čte archiv místo Plaudu; GRIT přes GitHub konektor
   v GPT.
4. Potom: rozšíření vzoru na Slack (jen vybrané kanály) a Gmail podle
   stejné šablony zdroj → skript → markdown → index.

## 11. Otevřené otázky

- Celá historie, nebo jen od 1. 9. 2026? Oboje je tokenově zvládnutelné.
- Potvrzování návrhů projektu u neoznačených nahrávek: týdně v chatu,
  nebo rovnou v Plaudu přejmenováním?
- Umístění repozitáře: organizace TechFides, nebo Martinův účet?

## Příloha: skript odhadu

Spuštění `python3 odhad_tokenu.py` vypíše tabulku z části 6. Sazby pocházejí
z měření v části 2, ostatní vstupy jsou v hlavičce skriptu.

```python
# Odhad tokenu pro varianty archivu prepisu z Plaudu (Martin, tempo 9.9.-9.10.2026)
# Zmerene sazby (soubor 87 min, 115 558 znaku JSON, 53 646 znaku kompaktni MD):
JSON_T_MIN = 377      # tokenu na minutu schuzky, JSON z MCP (odhad 3.5 znaku/token)
MD_T_MIN   = 186      # tokenu na minutu, kompaktni markdown "[mm:ss] mluvci: text" (3.3 znaku/token)
REC_M      = 95       # nahravek za 30 dni
MIN_M      = 2650     # minut zaznamu za 30 dni (44.2 h)
DAYS       = 22       # pracovnich dni v mesici
SUM_OUT    = 600      # tokenu vystupu na shrnuti + hlavicku + radek indexu jedne nahravky
RUN_OVH    = 20_000   # rezie jednoho behu rutiny (CLAUDE.md, skill, list_files, git, stav) - predpoklad
PRICE_IN, PRICE_OUT = 4.0, 20.0   # USD za 1M tokenu, Claude Opus 5.5 (jen pro predstavu; Max plan uctuje limity, ne dolary)

def usd(i,o): return i/1e6*PRICE_IN + o/1e6*PRICE_OUT
rows=[]
# A: rutina, prepis prochazi modelem tam i zpet (cte JSON v kontextu, zapisuje MD nastrojem Write)
A_in  = MIN_M*JSON_T_MIN + DAYS*RUN_OVH
A_out = MIN_M*MD_T_MIN + REC_M*SUM_OUT
rows.append(("A rutina, vse pres model", A_in, A_out))
# B: rutina, JSON se odlozi do souboru a prevede skriptem; model cte jen kompaktni MD kvuli shrnuti
B_in  = MIN_M*MD_T_MIN + DAYS*RUN_OVH
B_out = REC_M*SUM_OUT
rows.append(("B rutina, kopie skriptem, model jen indexuje", B_in, B_out))
# B2: jako B, shrnuti dela levnejsi subagent (Sonnet 5.5: 2/10 USD) - tokeny stejne, cena nizsi
# C: GitHub Actions + API Plaudu (pokud existuje): kopie bez modelu, index jako B bez rezie MCP
C_in  = MIN_M*MD_T_MIN + DAYS*10_000
C_out = REC_M*SUM_OUT
rows.append(("C Actions + API Plaudu, index rutinou", C_in, C_out))
# D: Drive / Confluence: obsah souboru musi vyprodukovat model (konektor nema skript), tedy jako A
rows.append(("D Drive nebo Confluence pres konektor", A_in, A_out))
# E: stav dnes: 2 projekty, kazdy denne list_files(14 dni ~50 polozek) + osnova + cast prepisu 1 nahravky
E_day = 3_500 + 1_500 + 300 + 0.5*28*JSON_T_MIN
E_in  = 2*DAYS*E_day
rows.append(("E dnes: 2 projekty ctou Plaud primo (jen cast Plaud)", E_in, 0))
# F: spotreba projektu po zavedeni archivu: index projektu (~1.5k) + kompaktni prepis 1 nahravky
F_day = 1_500 + 28*MD_T_MIN
F_in  = 2*DAYS*F_day
rows.append(("F po zavedeni: 2 projekty ctou archiv (jen cast Plaud)", F_in, 0))

print(f"{'varianta':58} {'vstup M':>8} {'vystup M':>9} {'USD/mes':>8}")
for n,i,o in rows:
    print(f"{n:58} {i/1e6:8.2f} {o/1e6:9.2f} {usd(i,o):8.1f}")

# jedna nahravka (prumer 28 min)
print()
print(f"prumerna nahravka 28 min: JSON {28*JSON_T_MIN:,.0f} t, MD {28*MD_T_MIN:,.0f} t, shrnuti {SUM_OUT} t vystupu")
# zpetny prenos
for label, rec, mins in (("od 1.9.2026", 110, 3000), ("cela historie od 18.5.2026", 250, 7800)):
    bi = mins*MD_T_MIN; bo = rec*SUM_OUT
    ai = mins*JSON_T_MIN; ao = mins*MD_T_MIN + rec*SUM_OUT
    print(f"zpetny prenos {label}: varianta B vstup {bi/1e6:.2f} M, vystup {bo/1e6:.2f} M (~{usd(bi,bo):.0f} USD); varianta A vstup {ai/1e6:.2f} M, vystup {ao/1e6:.2f} M (~{usd(ai,ao):.0f} USD)")
# ad hoc dotaz "co jsme rikali o X" napric schuzkami
idx_month = REC_M*80
print(f"index mesice: ~{idx_month/1e3:.0f} k tokenu; ad hoc dotaz = grep indexu (~1 k) + 2-3 kompaktni prepisy (~{3*28*MD_T_MIN/1e3:.0f} k); dnes bez archivu: list + 3 JSON prepisy (~{(3500+3*28*JSON_T_MIN)/1e3:.0f} k)")
```
