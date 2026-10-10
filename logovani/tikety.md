# Tikety pro logování času

Používá skill `logovani-tf`. Pevný řádek má klíč tiketu, periodický řádek
má vzor a klíč se dohledá pro daný týden nebo měsíc. Když vznikne nová
oblast nebo projekt, přibude řádek po založení tiketu. Sloupec „Poslední
můj log“ aktualizuje skill po každém zápisu.

## Tikety

| Oblast / projekt | Tiket | Typ | Poslední můj log | Poznámka |
| --- | --- | --- | --- | --- |
| Řízení PM, provoz firmy, povinnosti COO | TF-849 | pevný | 2026-10-09 | sitdowny, 1:1, management meetingy (PM meets se Š. Koskovou je support a PM meet, ne 1:1), kapacity, nástroje, síť, drobné úkoly COO; epic TF-847 platí do 12/2026 |
| Finance skupiny | TF-848 | pevný | 2026-10-09 | reporting, rozpočty, predikce, účetní firma, meeting Finance, ISO 9001 a 27001 (M-Vision, od 9. 10. 2026; samostatný tiket zatím není); epic TF-847 |
| Audit Zeus EMS (IJS) | TF-846 | pevný | týden W41 | řízení auditu a komunikace s klientem; rodič TF-841 je epic, na něj už nelogovat |
| WinFAS – školení Flutter | TF-840 | pevný, dodávka | 2026-10-06 | koordinace školení s J. Čechákem |
| GRiT – platební brána (GPB) | GPB-69 | pevný, PM tiket etapy | 2026-10-09 | „Projektové řízení – opakované platby, přehled plateb a vracení peněz“ pod epicem GPB-20; při nové etapě nový tiket „Projektové řízení – …“ (další je GPB-70 zátěžové testy). Dřívější: GPB-39 (platební karta, Done 6. 10. 2026, logováno do 7. 10.), GPB-38 (W40), GPB-15 a GPB-14 (W38, W39) |
| Elvoris – deGama (ISDG) | ISDG-8 | pevný, PM tiket | 2026-10-09 | „Projektové řízení - nastavení projektu“; ISDG-2 kick off hotový (W40) |
| Simplematics (FPR-84) | podle týdne | týdenní Radar task | 2026-10-06 (FPR-95) | „Týdenní řízení a report Simplematics – RRRR-Wxx“ pod FPR-84; fakturace a měsíční metriky do fakturačního tiketu pod FPR-84 |
| Giacom (FPR-1) | podle měsíce | měsíční fakturace | 2026-10-06 (FPR-5) | „Fakturace MM/RR“ pod FPR-1 |
| Algotech (FPR-96) | podle měsíce | měsíční fakturace | 2026-10-06 (FPR-97) | „Fakturace Algotech MM/RR“; FPR-98 (10/26), FPR-99 (11/26), FPR-100 (12/26) už existují. Koordinace mimo fakturaci nemá vlastní tiket; 6. 10. 2026 se jednorázově nezalogovala, pravidlo to není |

## Dny

| Den | Zalogováno | Navrženo skillem | Schváleno | Poznámka |
| --- | --- | --- | --- | --- |
| 2026-10-06 | 8 h 50 min | 6 h 45 min (relace 6. 10.) | ano | podezření na dvojí započtení Sitdownu v2 a meetingu Finance (Plaud v UTC), ke kontrole |
| 2026-10-07 | 6 h 45 min | 8 h 00 min | ano, s úpravami | ISDG-8 na 1 h (relace „DBeaver dev DB…“ nesla v názvu obsah zprávy z Teams, ne Martinovu práci), TF-849 o 1 h méně a bez Plaudu, TF-848 o 1 h víc; v kalendáři „HOLIDAY (8h)“ a „Nejsem v práci“ 11:00–17:20 |
| 2026-10-08 | 7 h 15 min | 7 h 15 min (skript 7 h 30 min, polední souběh srovnán) | ano, s úpravami | TF-849 o 1 h méně, TF-848 o 1 h víc; GRIT nově na GPB-69; ISDG-8 bez poledního bloku (tři krátké stopy 12:00–12:08 by daly 45 min); obchod s M. Kutypou (ISS) a „Volat“ 14:45–15:25 vynechány; relace 0:10–0:23 v TF-849 se začátkem worklogu 8:30; pokryto do 15:45 |
| 2026-10-09 | 8 h 30 min | 8 h 00 min | ano, s úpravami | ISDG-3 (relace „ISDG-3 shrnutí a odhad pracnosti“, 30 min) nezalogováno; ISO 9001 a 27001 (e-mail M-Vision) z TF-849 do TF-848 a TF-848 o 45 min víc (1 h 15 min); GRIT na GPB-69 (návrh omylem GPB-39, v main chyběl řádek z 8. 10.); všechny začátky 13:30 kvůli limitu 24 h (zápis 10. 10. ve 13:02); repozitář ISDG---deGama neprojit (připojení zamítnuto) |
