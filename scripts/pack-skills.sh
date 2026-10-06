#!/usr/bin/env bash
# Zabalí každý skill z .claude/skills/<name>/ do dist/<name>.zip
# (formát pro nahrání do claude.ai: Settings → Capabilities → Skills)
# a navíc vytvoří dist/tf-skills-all.zip se všemi zipy pohromadě.
#
# Použití:  scripts/pack-skills.sh            # všechny skilly
#           scripts/pack-skills.sh czech-style mam-adhd   # jen vybrané
set -euo pipefail

cd "$(dirname "$0")/.."
SKILLS_DIR=".claude/skills"
OUT_DIR="dist"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

if [ "$#" -gt 0 ]; then
  names=("$@")
else
  names=()
  for d in "$SKILLS_DIR"/*/; do
    names+=("$(basename "$d")")
  done
fi

for name in "${names[@]}"; do
  if [ ! -f "$SKILLS_DIR/$name/SKILL.md" ]; then
    echo "chybí $SKILLS_DIR/$name/SKILL.md" >&2
    exit 1
  fi
  # zip musí obsahovat složku <name>/ se SKILL.md v jejím kořeni
  (cd "$SKILLS_DIR" && zip -q -r "../../$OUT_DIR/$name.zip" "$name" \
      -x '*/node_modules/*' -x '*/.DS_Store' -x '*/__pycache__/*')
  echo "dist/$name.zip"
done

(cd "$OUT_DIR" && zip -q tf-skills-all.zip ./*.zip -x tf-skills-all.zip)
echo "dist/tf-skills-all.zip (${#names[@]} skillů)"
