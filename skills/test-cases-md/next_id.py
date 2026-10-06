#!/usr/bin/env python3
"""Vrátí další volné ID TC/PRE (např. TC-VOUCH-004) napříč celým repem.

Prochází MD soubory v pracovním stromu (i necommitnuté) a na origin/<default branch>,
takže ho jde volat opakovaně před commitem. O sesterských větvích neví - kolizi
s jinou rozdělanou větví odhalí až kontrola ID v CI, je-li v repu.

Příklad:
  next_id.py --prefix TC-VOUCH            # -> TC-VOUCH-004
  next_id.py --prefix PRE --count 2       # -> PRE-012, PRE-013
"""
import argparse
import pathlib
import re
import subprocess
import sys


def git(*args: str) -> str:
    return subprocess.run(["git", *args], capture_output=True, text=True, check=True).stdout


def default_branch() -> str | None:
    try:
        ref = git("symbolic-ref", "--quiet", "refs/remotes/origin/HEAD").strip()
        return ref.removeprefix("refs/remotes/")
    except subprocess.CalledProcessError:
        for name in ("origin/main", "origin/master", "origin/develop", "origin/dev"):
            if subprocess.run(["git", "rev-parse", "--verify", "-q", name], capture_output=True).returncode == 0:
                return name
    return None


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--prefix", required=True, help="např. TC-VOUCH nebo PRE")
    ap.add_argument("--count", type=int, default=1, help="kolik ID vrátit")
    ap.add_argument("--width", type=int, default=3, help="počet číslic (default 3)")
    args = ap.parse_args()

    try:
        root = pathlib.Path(git("rev-parse", "--show-toplevel").strip())
    except subprocess.CalledProcessError:
        sys.exit("Spusť skript uvnitř git repa projektu.")

    pattern = re.compile(rf"^id:\s*['\"]?{re.escape(args.prefix)}-(\d+)", re.MULTILINE)
    used: set[int] = set()

    for path in root.rglob("*.md"):
        if "node_modules" in path.parts:
            continue
        try:
            used.update(int(n) for n in pattern.findall(path.read_text(encoding="utf-8")))
        except (OSError, UnicodeDecodeError):
            pass

    branch = default_branch()
    if branch:
        out = subprocess.run(
            ["git", "-C", str(root), "grep", "-h", "-E", rf"^id:\s*['\"]?{args.prefix}-[0-9]+", branch, "--", "*.md"],
            capture_output=True, text=True,
        ).stdout
        used.update(int(n) for n in pattern.findall(out))
    else:
        print("⚠️ origin/<default> nenalezen, počítám jen pracovní strom.", file=sys.stderr)

    nxt = max(used, default=0) + 1
    for i in range(args.count):
        print(f"{args.prefix}-{nxt + i:0{args.width}d}")


if __name__ == "__main__":
    main()
