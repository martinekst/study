---
name: logovani-tf
description: Navrhne a po schválení zapíše Martinovy worklogy do Jiry za dnešek nebo včerejšek podle stop v kalendáři, Plaudu, Slacku, odeslané poště, Claude Code relacích, repozitářích a Drive. Použij vždy, když Martin chce zalogovat nebo dologovat čas, ptá se, kolik má za den hodin v Jiře, nebo co mu chybí zalogovat, i když neřekne slovo worklog.
metadata:
  author: "Martin Studnička"
---

# Logování času (Martin, TechFides)

Osobní skill. Loguje jen Martin; jeho identita a zdroje jsou pevně
v `references/zdroje.md`, tikety, kam loguje, jsou v `logovani/tikety.md`
v kořeni tohoto repozitáře. Worklog má vždy datum dne, kdy práce
proběhla, a nesmí začínat víc než 24 hodin před okamžikem zápisu: interní
kontrola takový zápis hodnotí jako pozdní worklog. Včas proto jde zapsat
dnešek a včerejšek, ten nejpozději dnes do 23:30.

Výstup má tři části: co už je za den zalogované, co navrhuješ dopsat
a kolik to je dohromady. Podle toho Martin rychle pozná, jestli něco
nechybí. Do Jiry se zapisuje až po jeho schválení.

Běh má být úsporný. Čti jen metadata, každý zdroj jedním dotazem, žádné
opakované readbacky. Pravidla úspor jsou na konci.

## Postup pro jeden den

1. **Den.** `TZ=Europe/Prague date '+%Y-%m-%d %H:%M %Z'`. Výchozí je
   dnešek, jinak podle zadání. Den starší než včerejšek už včas zapsat
   nejde: řekni to hned a pokračuj, jen když Martin pozdní zápis výslovně
   chce. Více dní zpracuj po jednom, každý s vlastním návrhem.
2. **Tabulka tiketů.** Přečti `logovani/tikety.md`. Pevné řádky mají klíč.
   Periodické řádky (týdenní, měsíční) přelož na klíč pro daný ISO týden
   nebo měsíc jedním JQL dotazem, například
   `parent = FPR-84 AND summary ~ "2026-W41"`. Když tiket pro období
   neexistuje, patří to do otázek, ne do návrhu.
3. **Co už je zalogováno.** Jediný dotaz do Jiry na worklogy:
   `worklogAuthor = currentUser() AND worklogDate = "RRRR-MM-DD"`, pole
   `summary` a `worklog`. Výsledek obsahuje všechny worklogy vrácených
   tiketů, ne jen Martinovy a ne jen z toho dne. Když ho nástroj uloží do
   souboru, předej ho `scripts/soucet_worklogu.py`; jinak sečti jen
   záznamy s Martinovým accountId a datem dne.
4. **Stopy.** Podle `references/zdroje.md`, všechny dotazy paralelně
   v jednom kroku, jen metadata, šum vyřaď.
5. **Přiřazení a časová osa.** Každé stopě dej tiket podle části Kam
   logovat (nebo `null`), ulož stopy do JSON a spusť
   `python3 .claude/skills/logovani-tf/scripts/casova_osa.py stopy.json --markdown`.
   Skript převádí časová pásma (Plaud posílá UTC), slučuje nahrávku se
   schůzkou z kalendáře, skládá bloky a počítá odhad. Nepočítej z hlavy:
   dvojí započtení schůzky byla nejčastější chyba dřívějších běhů.
6. **Návrh.** Podle `references/vystup.md`: přehled dne, tabulka návrhu
   s odkazy na tikety, otázky s výchozí volbou, věta „Až odpovíš, zapíšu
   to.“ Tabulka má řádek na worklog (`worklogy` ze skriptu): tiket nad
   4 h má víc řádků, každý s popisem činností svých bloků. U včerejška
   řekni, že se začátky worklogů při zápisu posunou kvůli limitu 24 h.
   Skonči a čekej.
7. **Zápis.** Po schválení, těsně před zápisem (schválení může přijít
   o hodiny později), spusť
   `python3 .claude/skills/logovani-tf/scripts/started_pro_zapis.py RRRR-MM-DD TIKET=HH:MM …`
   se začátkem každého worklogu z návrhu (tiket s víc worklogy uveď
   víckrát). Jeho výstup je `started` pro zápis: začátek starší než limit
   24 h posune, ale nechá ho ve dni práce. Worklogy jednoho tiketu nemusí
   jít za sebou. Řádek POZDNÍ zapiš jen s výslovným souhlasem Martina
   v tomto vlákně, a to s původním začátkem; řádek BUDOUCNOST nezapisuj.
   Pak `addWorklogToJiraIssue` pro
   schválené řádky, paralelně. Odpověď nástroje vrací zapsaný záznam včetně
   `timeSpentSeconds`; finální součet spočítej z těchto odpovědí a z kroku
   3, bez dalšího dotazu do Jiry.
8. **Tabulka.** Do `logovani/tikety.md` zapiš datum posledního logu
   u dotčených tiketů, nový řádek pro tiket, který Martin založil nebo
   schválil, a řádek dne do tabulky Dny. Změnu commitni.

## Kam logovat

1. Klíč tiketu přímo ve stopě (commit, vlákno, název dokumentu) → ten
   tiket, pokud je to Task nebo Radar task.
2. Oblast nebo projekt z tabulky → jeho tiket; u periodických řádků klíč
   z kroku 2.
3. Stopa bez tiketu v tabulce (nový klient, nová oblast): navrhni kam,
   kolik, co a proč. Nejdřív hledej v Jiře podle jména
   (`summary ~ "<jméno>" AND statusCategory != Done`, případně projekt
   přes `getVisibleJiraProjects`). Když nic nenajdeš, navrhni založení
   podle konvence: v klientském projektu tiket „Projektové řízení – …“
   pod epicem etapy, v režimu Radar Radar task pod Projectem klienta,
   interně Task v TF. Sám nic nezakládej; po založení přibude řádek do
   tabulky.
4. Tiket, kam Martin ten den zapsal sám → žádný doplněk, v přehledu
   „(tvůj zápis)“. Výjimka: stopa 30 min a delší, kterou jeho komentář
   zjevně nepokrývá, jde do otázek.
5. Jeden blok, jeden tiket. Schůzku nerozděluj kvůli vedlejší stopě
   (dokument upravený během schůzky).
6. Blok do 15 min bez tiketu → navrhni vynechat.
7. Na Epic ani FPR Project neloguj (kazí součty za projekt). Na tiket
   zavřený déle než 14 dní jen po dotazu.

## Odhad času (počítá skript)

- Granularita 15 min nahoru, minimum 15 min na tiket a den, stopa bez
  délky váží 15 min.
- Schůzka podle kalendáře, delší nahrávka má přednost. Nahrávka
  a událost, které se překrývají, jsou jedna schůzka.
- Blok = stopy tiketu s mezerou do 30 min; počítá se sjednocení
  intervalů minus schůzky jiných tiketů.
- Jeden worklog má nejvýš 4 h. Delší čas na tiketu skript rozdělí na víc
  worklogů po celých blocích; blok delší než 4 h rozdělí uvnitř.
- Návrh má odpovídat tomu, co se ten den skutečně stalo. Stopy jsou
  důkaz, ne strop ani podlaha: navrhni, co doloží, a mezery v dni delší
  než hodinu (ze skriptu) vypiš, aby Martin mohl doplnit práci bez stopy
  (čtení, přemýšlení, cesta). Žádný cíl v hodinách; den má tolik, kolik
  měl. Rozpětí stop slouží jen k odhalení dvojího započtení.

## Hranice

- Zápis jen po schválení konkrétního návrhu v tomto vlákně. Tikety
  nezakládej. Zapsané worklogy neměň ani nemaž (žádné `worklogId`
  v `addWorklogToJiraIssue`): když je některý špatně, řekni Martinovi,
  co v Jiře opravit.
- Worklog nesmí začínat víc než 24 h před zápisem (interní kontrola
  pozdních worklogů) a nesmí být delší než 4 h. `started` počítá
  `started_pro_zapis.py`, rozdělení `casova_osa.py`, ne odhad z hlavy.
- Součet dne se k ničemu nedorovnává, nahoru ani dolů. Co stopy neukážou,
  může doplnit jen Martin; co ukážou, se neořezává.
- Metadata stačí. Obsah e-mailu, přepis nahrávky nebo dokument otevři jen
  tehdy, když bez něj nepoznáš tiket, a v návrhu to řekni.
- Chybějící zdroj běh neruší; řekni, který chyběl.

## Úspory

- Jeden readback worklogů na den, žádný po zápisu.
- Plaud: jen seznam nahrávek. Shrnutí (`get_note`) jen u nahrávky bez
  protějšku v kalendáři nebo s nic neříkajícím názvem. Přepis nikdy.
- Claude Code relace: `list_sessions` s `limit 10`, bez `get_session`
  a bez čtení událostí; stačí shrnutí, název a čas z výpisu.
- Drive `pageSize 10`, Slack `response_format concise`, Gmail `pageSize 20`.
- Velké výsledky nech uložit do souboru a zpracuj skriptem; do kontextu
  patří jen výsledek.
