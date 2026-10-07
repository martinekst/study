# Zdroje stop (Martin)

## Konstanty

| Co | Hodnota |
| --- | --- |
| Jira site | `techfides.atlassian.net`, cloudId `d85a35df-112f-414d-a9e0-aec64c9a66a9` |
| Jira accountId | `5d9308110c2a5d0dd87aed69` |
| Slack ID | `UNKLE7A0K` |
| Kalendář | `martin.studnicka@techfides.cz` (ostatní kalendáře v seznamu jsou kolegů a místností) |
| GitHub | `martinekst`; commity z Claude Code relací mají autora „Claude“ |
| Repozitáře | `martinekst/ISDG---deGama` (Elvoris), `martinekst/study` (interní), plus repozitáře z relací dne |
| Časové pásmo | Europe/Prague |
| Oběd | 12:00 až 13:00, odečítá se, pokud ho nevyplnila schůzka |

## Dotazy

| Zdroj | Dotaz | Stopa | Čas ve výstupu |
| --- | --- | --- | --- |
| Kalendář | `list_events`, `startTime` 00:00 a `endTime` 24:00 dne s offsetem, `timeZone Europe/Prague`, `orderBy startTime`, `pageSize 50` | schůzky: název, účastníci, délka | s offsetem |
| Plaud | `list_files` s `date_from` a `date_to` rovno dni; z výsledku jen název, `start_at`, `duration` | potvrzení schůzky a skutečná délka; nahrávka bez události je schůzka navíc | **UTC bez offsetu** |
| Slack | `slack_search_public_and_private`, `filters: "from:<@UNKLE7A0K> on:RRRR-MM-DD"`, `natural_language_query: ""`, `sort timestamp`, `sort_dir asc`, `response_format concise`, `limit 20`, stránkuj `cursor` až do konce | vlastní zprávy: kanál, čas, s kým | lokální |
| Gmail | `search_threads`, `query "in:sent after:RRRR/MM/DD before:následující den"`, `pageSize 20` | odeslané e-maily: předmět, adresát, čas | UTC `Z` |
| Claude Code relace | `list_sessions` (`mine: true`, `limit 10`); vezmi relace s `created_at` nebo `updated_at` v dni: název, čas, repozitář; relace z rutin vyřaď | téma práce s AI, repozitář | UTC `Z` |
| Repozitáře | lokálně `git log --all --since="RRRR-MM-DD 00:00" --until="RRRR-MM-DD 23:59" --format='%aI %an | %s'` v repozitářích z konstant a z relací; jinak `list_commits` (GitHub MCP) | commity: zpráva, čas | s offsetem |
| Drive | `list_recent_files`, `orderBy lastModifiedByMe`, `pageSize 10`, `excludeContentSnippets true`; jen soubory s `modifiedTime` v dni | upravené dokumenty | UTC `Z` |
| Jira worklogy | viz postup, krok 3 | co už je zapsané | s offsetem |

Chaty na claude.ai mimo Claude Code nástroje nevidí; v návrhu se na ně
jednou větou zeptej.

## Časová pásma

Do JSON pro `casova_osa.py` piš časy tak, jak je zdroj vrátil. Skript čas
s offsetem nebo `Z` bere, jak je; čas bez pásma od Plaudu, Gmailu, Drive
a relací vykládá jako UTC, od Slacku a kalendáře jako Europe/Prague.
Kontrola: název nahrávky Plaudu nese lokální čas („2026-10-06 15:30“),
`start_at` je o 2 hodiny (v zimě o 1) dřív.

## Šum (není Martinova práce)

- Slack: `#pmbot`, kanály `*-ai-reports` (`#isdg-ai-reports`,
  `#grit-ai-reports`), zprávy „PM bot vyhodnotil …“ v `#projektove-rizeni`
  a jiné posty automatizací pod jeho účtem.
- Drive: soubory `daily-collection-*`, `decisions-log-*`, `overview-*`,
  `operativa-*`, `CHANGELOG-*`.
- Git: commity `daily-collection <datum>: …`. Commity `chat <datum>: …`
  jsou stopa interaktivní práce.
- Kalendář: rezervace místností („Room for …“, Titanium …), „Oběd“,
  „Neplánovat meetingy“, odmítnuté události.
- Claude Code: relace spuštěné rutinami.

## Vstup pro `casova_osa.py`

```json
[
  {"zdroj": "kalendar", "start": "2026-10-06T13:00:00+02:00", "konec": "2026-10-06T13:50:00+02:00", "popis": "Sitdown v2", "tiket": "TF-849"},
  {"zdroj": "plaud", "start": "2026-10-06T11:01:54", "trvani_min": 52, "popis": "Přehled projektů", "tiket": "TF-849"},
  {"zdroj": "slack", "start": "2026-10-06 16:59:00", "popis": "#dbg-management post", "tiket": "TF-848"},
  {"zdroj": "gmail", "start": "2026-10-06T08:31:00Z", "popis": "faktura Giacom 09/26", "tiket": null}
]
```

`zdroj`: `kalendar`, `plaud`, `slack`, `gmail`, `drive`, `git`, `relace`,
`jira`. `konec` nebo `trvani_min` jen u stop s délkou. `tiket` je klíč,
nebo `null`, když přiřazení není jednoznačné.
