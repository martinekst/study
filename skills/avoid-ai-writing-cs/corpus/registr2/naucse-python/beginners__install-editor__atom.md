Atomu 

V Atomu se nemusí nic nastavovat, funguje „od výroby“ tak, jak má.

Odsazování a obarvování bude fungovat správně jen v souborech s koncovkou `.py`
(jako Python).
V jiných programovacích jazycích se totiž odsazuje i obarvuje jinak.

Proto jakmile v tomhle editoru vytvoříš nový soubor,
měl bys ho co nejdřív uložit pod správným jménem.

## Kontrola stylu zdrojového kódu

Jedna věc nám v Atomu přeci jen chybí: plugin pro kontrolu správného
stylu zdrojového kódu.

Tak jako čeština má Python typografická pravidla.
Například za čárkou se píše mezera, ale před ní ne.
Jsou nepovinná, program bude fungovat i při jejich nedodržení,
ale pomáhají psát přehledný kód, tak je dobré je dodržovat už od začátku.
Pravidla pro Python jsou popsána v dokumentu
[PEP8](https://www.python.org/dev/peps/pep-0008/).

Aby sis je nemusel všechny pamatovat, nainstaluj si plugin,
který tě na jejich porušení upozorní.

Nejprve je potřeba si nainstalovat speciální knihovnu, která se o kontrolu
dokáže postarat. Do příkazové řádky zadej následující:

```console
$ python -m pip install flake8
```

A nyní si nainstaluj plugin do samotného editoru. V hlavní nabídce vyber
„Soubor > Nastavení/File > Settings“ a v nabídce
uprostřed okna vyber poslední položku
„Instalovat/Install“. Do vyhledávacího pole zadej
„linter-flake8“ a v seznamu nalezených pluginů klikni u položky stejného jména
na tlačítko „Instalovat/Install“. Bude ještě potřeba
schválit instalaci všech závislostí, na které se Atom postupně zeptá.
