# Agreement — the rename trap

A global find-and-replace of one Czech noun for another is **never** a
mechanical operation. Czech marks gender and number on adjectives,
pronouns, participles and past-tense verbs, so replacing the noun
leaves every one of those words agreeing with a word that is no longer
there. The result is text that no spellchecker flags and every native
reader trips over.

## Real defects this has already produced

| Rename                    | Co zůstalo                                      | Správně                               |
| ------------------------- | ----------------------------------------------- | ------------------------------------- |
| `iniciativa` → `opatření` | „Ke **každé** opatření"                         | „Ke **každému** opatření"             |
| `iniciativa` → `opatření` | „prioritní iniciativy **šly**" → „opatření šly" | „opatření **šla**"                    |
| `iniciativa` → `opatření` | „U iniciativ, **které** se rozhodnete"          | „U opatření, **která** se rozhodnete" |
| `iniciativa` → `opatření` | „stejně jako **ty** ostatní"                    | „stejně jako **ta** ostatní"          |
| (žádný rename)            | „Vlastní řešení nejsou **samy** o sobě"         | „nejsou **sama** o sobě"              |

## Procedure — run this after EVERY term rename

1. **Write down both words' gender and number** before touching
   anything. `iniciativa` = rod ženský, jednotné číslo, množné
   `iniciativy`. `opatření` = rod střední, tvar stejný v jednotném
   i množném čísle.

2. **If they differ, do NOT use a bare `sed s/old/new/g`.** Replace
   phrase by phrase, so the surrounding words come along:
   `s/u každé iniciativy/u každého opatření/`, not `s/iniciativy/opatření/`.

3. **After replacing, grep for the agreeing words** in the changed
   files. These are the ones that break:

   ```bash
   # ukazovací a vztažná zájmena
   grep -nE "\b(každá|každé|každou|které|která|kterou|ty|ta|ti|té|tou)\b <new-noun>" <files>
   grep -nE "<new-noun>,? (které|která|kteří|jež)" <files>

   # přídavná jména a příčestí těsně před/za novým slovem
   grep -nE "\b\w+(á|é|ý|í|ých|ými|ou) <new-noun>" <files>
   grep -nE "<new-noun> \w+(ly|la|lo|li)\b" <files>
   ```

4. **Read every hit.** The grep finds candidates, not errors — only a
   human (or a careful pass) decides.

5. **Check headings, table headers and diagram labels separately.**
   They are short, contain no full sentence, and are therefore skipped
   by any "read it aloud" review. Every rename defect found so far was
   in a table cell or a heading.

## Neutrum plural — the most treacherous pattern

Nouns like `opatření`, `řešení`, `oddělení`, `kritéria`, `data` are
neuter. In the plural they take endings that look wrong to an ear
trained on feminine plurals:

| Špatně                   | Správně                      |
| ------------------------ | ---------------------------- |
| řešení nejsou samy       | řešení nejsou **sama**       |
| opatření, které jsou     | opatření, **která** jsou     |
| opatření šly             | opatření **šla**             |
| tyto opatření            | **tato** opatření            |
| dvě opatření byly hotové | dvě opatření **byla hotová** |
| všechny oddělení         | **všechna** oddělení         |

`data` behaves the same way: „data **jsou** dostupná", NIKDY „data je".

## Numerals

- 2–4 + podstatné jméno v 1. pádě množného čísla: „dvě opatření",
  „tři dny", „čtyři oddělení".
- 5 a více + 2. pád množného čísla: „pět opatření", „dvacet rozhovorů",
  „sedm oblastí".
- Přísudek u „pět a více" je v jednotném čísle středního rodu:
  „Pět oblastí **vyhovuje**", NIKDY „pět oblastí vyhovují".
