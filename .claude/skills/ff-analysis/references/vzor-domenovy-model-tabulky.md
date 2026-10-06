# VZOR – Doménový model: tabulky ([CS] Doménový model)

Ukázka tabulkového přehledu entit a číselníků, který doplňuje PlantUML diagram (viz `vzor-domain-model-plantuml.txt`). Tabulková část je závazná a slouží jako zdroj pro backend, podklad pro validace a kontrolu konzistence s use casy.

## Person

| Atribut | Dátový typ | Povinný atribút | Poznámka |
| --- | --- | --- | --- |
| firstName | string |  | Meno |
| lastName | string |  | Priezvisko |
| middleName | string |  | Stredné meno |
| birthNumber | string | ✅ | Rodné číslo |
| phone | string |  | Tel. číslo |
| email | string |  | Email |
| sex | string |  | Pohlavie |
| residenceAddress | Address | ✅ | Adresa bydliska |
| mailingAddress | Address | ✅ | Doručovacia adresa |
| nationality | string | ✅ | Skratka krajiny z ktorej klient pochádza (ISO-3166 tříznakový) |
| bonusPrices | array of BonusPrice |  | Tabulka nabídky zvýhodněných cen |
| createdAt | datetime | ✅ | Dátum a čas uloženia |
| lastModifiedAt | datetime | ✅ | Dátum a čas poslednej úpravy |

## Address

| Atribut | Dátový typ | Povinný atribút | Poznámka |
| --- | --- | --- | --- |
| street | string | ✅ | Ulica |
| streetNumber | string | ✅ | Číslo ulice |
| houseNumber | string | ✅ | Číslo domu |
| city | string | ✅ | Mesto |
| country | string | ✅ | Štát |
| postalCode | string | ✅ | PSČ |

## PersonProduct

| Atribut | Dátový typ | Povinný atribút | Poznámka |
| --- | --- | --- | --- |
| caseId | uuid | ✅ | id prípadu |
| person | Person | ✅ | Vazba na osobu |
| tenant | string | ✅ | Názov tenanta |
| refNo | string | ✅ | Referenční číslo aktuálního případu |
| product | string | ✅ | Produkt |
| state | string | ✅ | Stav případu |
| createdAt | datetime | ✅ | Dátum a čas, kedy prípad vznikol |
| bonusPrice | BonusPrice |  | Vazba na použitou bonusovou sazbu |

## Transfer

| Atribut | Dátový typ | Povinný atribút | Poznámka |
| --- | --- | --- | --- |
| person | Person | ✅ | Vazba na osobu |
| sourceRefNo | string | ✅ | Referenčné číslo pôvodného prípadu |
| sourceProduct | PersonProduct | ✅ | Vazba na původní případ |
| sourceTenant | string | ✅ | Názov zdrojového tenanta |
| targetRefNo | string | ✅ | Referenčné číslo transférovaného prípadu |
| targetProduct | PersonProduct | ✅ | Vazba na transferovaný (cílový) případ |
| targetTenant | string | ✅ | Názov cieľového tenanta |
| transferredAt | datetime | ✅ | Dátum a čas presunu |
| createdAt | datetime | ✅ | Dátum a čas uloženia |
| lastModifiedAt | datetime | ✅ | Dátum a čas poslednej úpravy |

## BonusPrice

| Atribut | Dátový typ | Povinný atribút | Poznámka |
| --- | --- | --- | --- |
| person | Person | ✅ | Vazba na osobu |
| product | string | ✅ | Typ produktu |
| expirationTime | number | ✅ | Počet měsíců po kterých zvýhodněná cena expiruje |
| discount | number | ✅ | Procento ze sazby o kterou bude snížena sazba |
| used | boolean | ✅ | Informace, zda je bonusová sazba aplikovaná na případu |

## PersonDocument

| Název | Typ | Povinné | Poznámka |
| --- | --- | --- | --- |
| person | Person | ✅ | Vazba na osobu |
| type | DocumentType | ✅ | Typ dokladu (Trvalý pobyt / Občiansky preukaz) |
| number | string | ✅ | Číslo dokladu |
| expiration | date | ✅ | Dátum expirácie dokladu |
| filesRefNo | number | ✅ | refno prípadu na ktorom sú uložené súbory |
| photoId | string |  | ID súboru a rozmery fotografie, např. "200650429 381x381+29+249" |
| verificationSource | VerificationSource | ✅ | Ako došlo k overeniu dokladu |
| checkedAt | datetime | ✅ | Dátum a čas kontroly |
| checkedBy | string | ✅ | Jméno osoby, ktorá vykonala kontrolu alebo označenie AUTO, ak kontrolu vykonal systém |

## ArbitrationCase

Spory klientů s FF – interní i externí (řešené u fin. arbitra a/nebo ČNB).

| Atribut | Datový typ | Povinné | Poznámka |
| --- | --- | --- | --- |
| person | Person | ✅ | Vazba na osobu klienta |
| cases | array of PersonProduct | ✅ | Vazba na seznam referenčních čísel do sporu zahrnutých případů |
| referenceNumber | string | ✅ | Spisová značka případu |
| status | ArbitrationCaseStatus | ✅ | Stav sporu |
| startDate | date | ✅ | Datum začátku sporu |
| endDate | date |  | Datum ukončení sporu |
| subject | ArbitrationCaseSubject | ✅ | Předmět sporu |
| involvedParties | ArbitrationCaseInvolvedParties |  | Účastníci sporu |
| outcome | ArbitrationCaseOutcome |  | Výsledek sporu |
| ruledInFavorOf | ArbitrationCaseRuledInFavorOf |  | Ve prospěch koho byl spor rozhodnut |
| note | string |  | Poznámky ke sporu |

## Číselníky

### ArbitrationCaseStatus (Stav sporu)

| Kód | Popis | Poznámka |
| --- | --- | --- |
| ACTIVE | aktivní |  |
| RESOLVED | vyřešen |  |
| DISMISSED | zamítnut |  |
| DELETED | smazaný výsledek | soft-delete |

### ArbitrationCaseSubject (Předmět sporu)

| Kód | Popis |
| --- | --- |
| INTEREST_RATE_CHANGE | informace o změně úrokové sazby |
| LOAN_CONTRACT_INVALIDITY | neplatnost úvěrové smlouvy / posouzení úvěrové smlouvy |
| INSUFF_PRECONTRACT_INFO | nedostatek informací před uzavřením smlouvy |
| INTEREST_RATE | výše úrokové sazby |
| APR | výše RPSN |
| APR_NOT_SPECIFIED | neuvedení RPSN |
| UNJUSTIFIED_DEBT_COLLECTION | neoprávněné vymáhání dlužné částky, poplatku, sankce |
| UNREASONABLE_CONTACT | nepřiměřené kontaktování / obtěžování |

### ArbitrationCaseInvolvedParties (Účastníci sporu)

| Kód | Popis |
| --- | --- |
| CONSUMER | Pouze spotřebitel |
| CONSUMER_NB | Spotřebitel a ČNB |
| CONSUMER_FINARB | Spotřebitel a finanční arbitr |
| CONSUMER_NB_FINARB | Spotřebitel, ČNB a finanční arbitr |

### ArbitrationCaseOutcome (Výsledek sporu)

| Kód | Popis |
| --- | --- |
| SETTLEMENT_AGREEMENT | dohoda o narovnání |
| TERMINATED_INACTIVITY | zastaveno pro nesoučinnost navrhovatele |
| WITHDRAWAL_OF_PROPOSAL | zpětvzetí návrhu |
| TERMINATED_INSUFFICIENT_PROPOSAL | zastaveno pro nedostatečnost návrhu |
| CONCLUDED_ARBITRATION_AWARD | ukončeno nálezem arbitra |

### ArbitrationCaseRuledInFavorOf (Výsledek sporu rozhodnut ve prospěch)

| Kód | Popis |
| --- | --- |
| CONSUMER | ve prospěch spotřebitele |
| CREDITOR | ve prospěch věřitele (FF) |

### DocumentType (Typy dokumentov)

| Kód | Popis |
| --- | --- |
| ID_CARD | Občiansky preukaz |
| PERMANENT_RESIDENCE | Trvalý pobyt |

### VerificationSource (Ako došlo k overeniu dokladu)

| Kód | Popis |
| --- | --- |
| MANUAL | operátor overí doklad ručne |
| BANK_ID | overenie pomocou bankID |
| AUTOCHECK | nahraním dokladu systém z neho vyčítal všetky informácie bez zásahu operátora |

---

**Poznámka:** Tento vzor je pouze ukázka stylu a úrovně detailu tabulkového přehledu. Konkrétní entity, atributy a číselníky pro nový projekt nikdy nevymýšlej – vycházej výhradně z podkladů, které dodá uživatel.
