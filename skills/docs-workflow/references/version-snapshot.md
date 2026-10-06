# Outgoing version snapshot

After the migrated tree validates, prepare this short status block for the
outgoing version’s index. Write it during final activation immediately before
switching `active_version` in README. Capture the original index and restore it
if the snapshot write, README write, or final validation fails. This preserves
how the outgoing version was intended to be read without creating a second live
README contract or announcing a replacement that did not complete.

```markdown
## Stav verze

Tato verze byla nahrazena dne <YYYY-MM-DD>. Její obsah zůstává historickým
snímkem; aktivní nastavení je v [docs/README.md](../README.md).

| Nastavení při uzavření | Hodnota                                         |
| ---------------------- | ----------------------------------------------- |
| Životní cyklus         | `<discovery / implementation-ready / as-built>` |
| Typ výstupu            | `<documentation / offer>`                       |
| Sekce                  | `<hodnoty v pořadí kontraktu>`                  |
| Funkční pohledy        | `<hodnoty v pořadí kontraktu, nebo —>`          |
| Poslední úplná revize  | `<existující odkaz, nebo Nebyla provedena>`     |
```

Use the outgoing contract values verbatim. The review link must resolve to a
full review of that version; never substitute a partial review. “Nebyla
provedena” is more accurate than an invented freshness statement. After the
new contract is activated, do not update this snapshot except to repair a
broken link without changing its historical meaning.
