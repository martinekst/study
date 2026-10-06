#!/usr/bin/env python3
"""
render_pdf.py – vykreslí stránky PDF do PNG pro vizuální kontrolu.

Vstup může být:
  * .pdf soubor,
  * .docx soubor (převede se přes LibreOffice `soffice --headless`),
  * JSON uložený z Google Drive `download_file_content` (klíč "content" = base64 PDF).

Použití:
  python3 render_pdf.py vstup.pdf|vstup.docx|tool-result.json vystupni_adresar [--dpi 80]

Vyžaduje PyMuPDF (`pip install pymupdf`).
"""
import argparse
import base64
import json
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    import pymupdf  # type: ignore
except ImportError:  # starší název balíčku
    try:
        import fitz as pymupdf  # type: ignore
    except ImportError:
        sys.exit("Chybí PyMuPDF: spusť `pip install pymupdf`.")


def to_pdf(path: Path, tmp: Path) -> Path:
    if path.suffix.lower() == ".pdf":
        return path
    if path.suffix.lower() == ".json":
        data = json.loads(path.read_text())
        out = tmp / "export.pdf"
        out.write_bytes(base64.b64decode(data["content"]))
        return out
    if path.suffix.lower() in (".docx", ".doc"):
        subprocess.run(["soffice", "--headless", "--convert-to", "pdf", "--outdir", str(tmp), str(path)],
                       check=True, capture_output=True, timeout=180)
        return tmp / (path.stem + ".pdf")
    sys.exit(f"Neznámý typ vstupu: {path}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("source")
    ap.add_argument("outdir")
    ap.add_argument("--dpi", type=int, default=80)
    args = ap.parse_args()

    outdir = Path(args.outdir)
    outdir.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        pdf = to_pdf(Path(args.source), Path(td))
        with pymupdf.open(pdf) as d:
            for n, page in enumerate(d, 1):
                png = outdir / f"page-{n:02d}.png"
                page.get_pixmap(dpi=args.dpi).save(png)
                print(png)


if __name__ == "__main__":
    main()
