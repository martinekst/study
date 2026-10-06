# Lidský český kontrolní korpus

Účel: měření falešně pozitivních. Detektor musí na těchhle textech zůstat pod prahem
`maxScore` z `manifest.json`; když ho nové pravidlo prolomí, je špatně pravidlo, ne korpus.
Spouští se přes `node scripts/fp-measure.js` (`--update` po vědomé změně textů přepočítá
hashe a baseline).

Texty jsou z české Wikipedie (výběr softwarové inženýrství a management, staženo
14. 8. 2026, drobně očištěno od artefaktů extrakce: mezery před interpunkcí, značky
poznámek ↑). Licence CC BY-SA 4.0 dovoluje plné texty commitnout, atribuce je v poli
`source` manifestu; upstream commituje jen hashe, protože jeho zdroje volnou licenci
nemají.

Omezení, se kterým se počítá: jde o jediný registr (encyklopedický). Pro skórování
mikro-signálů typu nominalizace nebo poměr nebo/či je potřeba korpus rozšířit o další
registry (blogy, dokumentace, e-maily) s doložitelně lidským autorstvím před rokem 2023.
