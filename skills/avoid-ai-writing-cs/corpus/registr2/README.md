# Druhý kontrolní korpus: lidsky psaný český markdown

Proč existuje: první korpus (`../texts`) je česká Wikipedie, tedy encyklopedický
a redigovaný registr. Emoji, tučné, markdownové odrážky ani nespárované uvozovky tam
nejsou ze své podstaty, takže každé formátovací pravidlo proti nim vycházelo jako
nekonečně silný signál, i kdyby šlo o normální lidský styl v README nebo na landing page.
Bez téhle druhé baseline byly prahy pro emoji, tučné a pomlčky nekalibrované.

Veškerý obsah je z revizí **před 1. 1. 2023**, doložených polem `revision` a
`revisionDate` v `manifest.json` (extrahováno přes `git rev-list -1 --before=2023-01-01`,
takže pre-2023 jsou i samotné bajty, ne jen vznik souboru). Autorství člověkem je tím
dané datem.

## Zdroje

| Zdroj | Registr | Slov | Licence |
| --- | --- | ---: | --- |
| [pyvec/naucse-python](https://github.com/pyvec/naucse-python) | tutoriál s kódem | 31 166 | CC BY-SA 4.0 (per-lekce `info.yml`) |
| [juniorguru/junior.guru](https://github.com/juniorguru/junior.guru) | marketing a how-to | 41 024 | CC BY-SA 4.0 pro obsah |
| [cesko-digital/derisking-handbook](https://github.com/cesko-digital/derisking-handbook) | metodická příručka | 18 248 | CC BY-SA 4.0 |
| [cesko-digital/blog](https://github.com/cesko-digital/blog) | firemní blog a novinky | 27 103 | MIT |

Texty zůstávají pod licencemi svých autorů; licence tohohle skillu se na ně nevztahuje.
U CC BY-SA zdrojů to znamená, že si share-alike nesou dál. Přesné znění licence a
permalink na použitou revizi jsou u každého dokumentu v `manifest.json`.

Vynecháno: `deprecated-packages/pehapkari.cz-old` (technický blog 2016–2018) nemá žádnou
licenci, takže se text nekopíruje. Jako referenci na starší styl jde použít přes URL.

## Co z tohohle korpusu vyplynulo pro kalibraci

Měření 18. 8. 2026 (`node scripts/bench.js`, hustoty na 1000 slov):

- **Emoji v nadpisu je signál, emoji v textu ne tolik.** Lidský markdown má
  0 z 480 nadpisů s emoji, zatímco doložitelně generovaný text 72 % a auditované
  nabídky 83 a 89 %. V těle textu jsou emoji u lidí vzácné (0,2/1000), ale existují.
  Proto se nadpisy hlásí agregovaně na dokument a statusové glyfy (RAG semafor) jsou
  z váhy vyňaté úplně.
- **Dlouhou pomlčku používá i český autor.** junior.guru má 1,04 em dashe na 1000 slov
  (nejhustší soubor 3,8) a systematicky jí nahrazuje českou pomlčku; ostatní tři zdroje
  mají 0 až 0,03. Generovaný text má 27,45 (nejhustší soubor 52,6). Signál tedy platí,
  ale jako hustota, ne jako binární nález: pod 4/1000 klesá na P2.
- **Tučné se řídí registrem.** Dokumentace s kódem má 0,7 na 1000 slov, marketing
  a blog 12 až 14. Jediný globální práh na všechno tučné proto měřil „používá dokument
  tučné vůbec“; do hustoty se teď počítá jen tučné uvnitř prózy.
- **Nespárované uvozovky lidský text nemá.** Oba korpusy párují `„ “` bezchybně
  (52 anglických `“ ”` v registru 2 je jiný jev: celé anglické citace).

Kalibrační brána: `node scripts/fp-measure.js`. Žádný soubor obou korpusů nesmí přelézt
`maxScore` z `../manifest.json`. Když ho nové pravidlo prolomí, je špatně pravidlo.
