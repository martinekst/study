#!/usr/bin/env python3
"""
build_docx.py – Markdown -> .docx v grafické úpravě TechFides (hlavičkový papír v2).

Výstupní .docx je jen přenosový formát: po nahrání přes Google Drive `create_file`
(contentMimeType = DOCX, base64Content = obsah souboru .b64) ho Drive převede na nativní
Google dokument se zachovanou hlavičkou (logo), patičkou (kontakty, číslo stránky),
styly nadpisů, seznamy a formátováním tabulek.

Podporovaná podmnožina Markdownu:
  ---                       front matter: title, subtitle (volitelné)
  # / ## / ### / ####       Nadpis 1–4 (styly Heading 1–4 ze šablony)
  odstavce                  prázdný řádek odděluje odstavce
  - položka / * položka     nečíslovaný seznam (● ○ ■), odsazení = vnoření
  1. položka                číslovaný seznam (1. a. i.)
  | a | b |                 tabulka; první řádek je hlavička, řádek |:--|:-:|--:| určuje zarovnání,
                            počet pomlček v něm (|:----|:------------|) volitelně poměr šířek sloupců
  > text                    odsazený citát / poznámka
  **tučné** *kurzíva* `kód` [text](url)
  \pagebreak                zalomení stránky

Použití:
  python3 build_docx.py obsah.md -o vystup.docx [--base64 vystup.b64]
"""
import argparse
import base64
import re
import sys
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

HERE = Path(__file__).resolve().parent
TEMPLATE = HERE.parent / "template"

# --- konstanty převzaté z hlavičkového papíru -------------------------------------------
TEXT_WIDTH = 9026          # twips: A4 (11906) minus okraje 2 x 1440
BRAND = "365f91"           # modrá nadpisů a hlavičky tabulek
TABLE_BODY_FILL = "f3f3f3" # "dull white" tělo tabulky
TABLE_BORDER = "ffffff"    # 1pt bílý rámeček
CELL_MARGIN = 86           # twips ≈ 0.06 in
LIST_INDENT = 720          # twips na úroveň, předsazení 360
LINK_COLOR = BRAND
CODE_FONT = "Roboto Mono"

W_NS = (
    'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
    'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
    'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" '
    'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
    'xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" '
    'xmlns:v="urn:schemas-microsoft-com:vml" '
    'xmlns:o="urn:schemas-microsoft-com:office:office" '
    'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" '
    'xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" '
    'mc:Ignorable="w14"'
)

REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
FIXED_RELS = [
    ("rId1", "styles", "styles.xml"),
    ("rId2", "settings", "settings.xml"),
    ("rId3", "fontTable", "fontTable.xml"),
    ("rId4", "numbering", "numbering.xml"),
    ("rId5", "header", "header1.xml"),
    ("rId6", "footer", "footer1.xml"),
]
HEADER_RID, FOOTER_RID = "rId5", "rId6"

SECT_PR = (
    "<w:sectPr>"
    f'<w:headerReference r:id="{HEADER_RID}" w:type="default"/>'
    f'<w:footerReference r:id="{FOOTER_RID}" w:type="default"/>'
    '<w:pgSz w:h="16838" w:w="11906" w:orient="portrait"/>'
    '<w:pgMar w:bottom="1440" w:top="1440" w:left="1440" w:right="1440" w:header="720" w:footer="720" w:gutter="0"/>'
    '<w:pgNumType w:start="1"/>'
    "</w:sectPr>"
)


# --- inline formátování ------------------------------------------------------------------
INLINE_RE = re.compile(
    r"\*\*(?P<b>.+?)\*\*"
    r"|(?<!\w)__(?P<b2>.+?)__(?!\w)"
    r"|(?<!\*)\*(?P<i>[^*\s](?:[^*]*?[^*\s])?)\*(?!\*)"
    r"|(?<!\w)_(?P<i2>[^_\s](?:[^_]*?[^_\s])?)_(?!\w)"
    r"|`(?P<code>[^`]+)`"
    r"|\[(?P<ltext>[^\]]+)\]\((?P<lurl>[^)\s]+)\)"
)


class Doc:
    def __init__(self):
        self.body = []
        self.hyperlinks = []   # (rId, url)
        self.nums = []         # (numId, abstractId)

    # -- pomocné -----------------------------------------------------------------------
    def new_hyperlink(self, url):
        rid = f"rId{len(FIXED_RELS) + len(self.hyperlinks) + 1}"
        self.hyperlinks.append((rid, url))
        return rid

    def new_num(self, ordered):
        num_id = len(self.nums) + 1
        self.nums.append((num_id, 2 if ordered else 1))
        return num_id

    @staticmethod
    def text_run(text, rpr=""):
        text = text.replace("\\*", "*").replace("\\_", "_").replace("\\|", "|").replace("\\#", "#")
        return f'<w:r><w:rPr>{rpr}</w:rPr><w:t xml:space="preserve">{escape(text)}</w:t></w:r>'

    def inline(self, text, base_rpr=""):
        out, pos = [], 0
        for m in INLINE_RE.finditer(text):
            if m.start() > pos:
                out.append(self.text_run(text[pos:m.start()], base_rpr))
            if m.group("b") is not None or m.group("b2") is not None:
                out.append(self.text_run(m.group("b") or m.group("b2"), base_rpr + '<w:b w:val="1"/><w:bCs w:val="1"/>'))
            elif m.group("i") is not None or m.group("i2") is not None:
                out.append(self.text_run(m.group("i") or m.group("i2"), base_rpr + '<w:i w:val="1"/><w:iCs w:val="1"/>'))
            elif m.group("code") is not None:
                out.append(self.text_run(m.group("code"), base_rpr + f'<w:rFonts w:ascii="{CODE_FONT}" w:hAnsi="{CODE_FONT}" w:cs="{CODE_FONT}"/>'))
            else:
                rid = self.new_hyperlink(m.group("lurl"))
                run = self.text_run(m.group("ltext"), base_rpr + f'<w:color w:val="{LINK_COLOR}"/><w:u w:val="single"/>')
                out.append(f'<w:hyperlink r:id="{rid}">{run}</w:hyperlink>')
            pos = m.end()
        if pos < len(text):
            out.append(self.text_run(text[pos:], base_rpr))
        return "".join(out)

    # -- bloky -------------------------------------------------------------------------
    def paragraph(self, text, ppr="", rpr=""):
        self.body.append(f"<w:p><w:pPr>{ppr}</w:pPr>{self.inline(text, rpr)}</w:p>")

    def styled(self, style, text):
        self.paragraph(text, f'<w:pStyle w:val="{style}"/>')

    def heading(self, level, text):
        self.styled(f"Heading{min(level, 6)}", text)

    def page_break(self):
        self.body.append('<w:p><w:r><w:br w:type="page"/></w:r></w:p>')

    def quote(self, text):
        self.paragraph(text, f'<w:ind w:left="{LIST_INDENT}"/>', '<w:i w:val="1"/><w:iCs w:val="1"/><w:color w:val="434343"/>')

    def list_block(self, items):
        """items: [(level, ordered, text)] – mezery mezi položkami jako v Google Docs
        (první položka má mezeru před sebou, poslední za sebou, mezi položkami nic)."""
        num_ids = {}
        for idx, (level, ordered, text) in enumerate(items):
            if ordered not in num_ids:
                num_ids[ordered] = self.new_num(ordered)
            spacing = []
            if idx > 0:
                spacing.append('w:before="0"')
            if idx < len(items) - 1:
                spacing.append('w:after="0"')
            sp = f'<w:spacing {" ".join(spacing)}/>' if spacing else ""
            ppr = (
                f'<w:numPr><w:ilvl w:val="{level}"/><w:numId w:val="{num_ids[ordered]}"/></w:numPr>'
                f"{sp}"
                f'<w:ind w:left="{LIST_INDENT * (level + 1)}" w:hanging="360"/>'
            )
            self.paragraph(text, ppr)

    def table(self, header, rows, aligns, weights=None):
        ncols = len(header)
        # šířky sloupců: z počtu pomlček v řádku zarovnání (|:----|:--------|), jinak úměrné
        # nejdelšímu obsahu; minimálně ~1.7 cm
        if not weights:
            weights = []
            for c in range(ncols):
                longest = max([len(header[c])] + [len(r[c]) for r in rows]) if rows else len(header[c])
                weights.append(max(6, min(longest, 60)))
        total = sum(weights)
        widths = [max(1000, int(TEXT_WIDTH * w / total)) for w in weights]
        widths[-1] += TEXT_WIDTH - sum(widths)

        def cell(text, width, fill, align, header_row):
            rpr = '<w:b w:val="1"/><w:bCs w:val="1"/><w:color w:val="ffffff"/>' if header_row else ""
            tcpr = (
                f'<w:tcW w:w="{width}" w:type="dxa"/>'
                f'<w:shd w:fill="{fill}" w:val="clear"/>'
                f'<w:tcMar><w:top w:w="{CELL_MARGIN}" w:type="dxa"/><w:left w:w="{CELL_MARGIN}" w:type="dxa"/>'
                f'<w:bottom w:w="{CELL_MARGIN}" w:type="dxa"/><w:right w:w="{CELL_MARGIN}" w:type="dxa"/></w:tcMar>'
                '<w:vAlign w:val="center"/>'
            )
            ppr = f'<w:spacing w:before="0" w:after="0" w:line="240" w:lineRule="auto"/><w:jc w:val="{align}"/><w:rPr>{rpr}</w:rPr>'
            return f"<w:tc><w:tcPr>{tcpr}</w:tcPr><w:p><w:pPr>{ppr}</w:pPr>{self.inline(text, rpr)}</w:p></w:tc>"

        def row(cells, header_row):
            fill = BRAND if header_row else TABLE_BODY_FILL
            trpr = '<w:cantSplit w:val="1"/>' + ('<w:tblHeader w:val="1"/>' if header_row else "")
            tcs = "".join(cell(cells[c] if c < len(cells) else "", widths[c], fill, aligns[c], header_row) for c in range(ncols))
            return f"<w:tr><w:trPr>{trpr}</w:trPr>{tcs}</w:tr>"

        border = "".join(
            f'<w:{side} w:color="{TABLE_BORDER}" w:space="0" w:sz="8" w:val="single"/>'
            for side in ("top", "left", "bottom", "right", "insideH", "insideV")
        )
        tblpr = (
            f'<w:tblStyle w:val="Table1"/><w:tblW w:w="{TEXT_WIDTH}" w:type="dxa"/><w:jc w:val="left"/>'
            f"<w:tblBorders>{border}</w:tblBorders><w:tblLayout w:type=\"fixed\"/><w:tblLook w:val=\"0600\"/>"
        )
        grid = "".join(f'<w:gridCol w:w="{w}"/>' for w in widths)
        self.body.append(
            f"<w:tbl><w:tblPr>{tblpr}</w:tblPr><w:tblGrid>{grid}</w:tblGrid>"
            + row(header, True)
            + "".join(row(r, False) for r in rows)
            + "</w:tbl>"
        )
        # Google Docs i Word chtějí za tabulkou odstavec
        self.body.append('<w:p><w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr></w:p>')

    # -- serializace -------------------------------------------------------------------
    def document_xml(self):
        return (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            f"<w:document {W_NS}><w:body>{''.join(self.body)}{SECT_PR}</w:body></w:document>"
        )

    def rels_xml(self):
        rels = [
            f'<Relationship Id="{rid}" Type="{REL_NS}/{kind}" Target="{target}"/>'
            for rid, kind, target in FIXED_RELS
        ] + [
            f'<Relationship Id="{rid}" Type="{REL_NS}/hyperlink" Target="{escape(url, {chr(34): "&quot;"})}" TargetMode="External"/>'
            for rid, url in self.hyperlinks
        ]
        return (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            + "".join(rels) + "</Relationships>"
        )

    def numbering_xml(self):
        def lvl(i, fmt, text):
            return (
                f'<w:lvl w:ilvl="{i}"><w:start w:val="1"/><w:numFmt w:val="{fmt}"/><w:lvlText w:val="{text}"/>'
                f'<w:lvlJc w:val="left"/><w:pPr><w:ind w:left="{LIST_INDENT * (i + 1)}" w:hanging="360"/></w:pPr>'
                '<w:rPr><w:u w:val="none"/></w:rPr></w:lvl>'
            )
        bullets = "".join(lvl(i, "bullet", "●○■"[i % 3]) for i in range(9))
        numbered = "".join(
            lvl(i, ("decimal", "lowerLetter", "lowerRoman")[i % 3], f"%{i + 1}.") for i in range(9)
        )
        nums = "".join(
            f'<w:num w:numId="{nid}"><w:abstractNumId w:val="{aid}"/>'
            '<w:lvlOverride w:ilvl="0"><w:startOverride w:val="1"/></w:lvlOverride></w:num>'
            for nid, aid in self.nums
        )
        return (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            f"<w:numbering {W_NS}>"
            f'<w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="hybridMultilevel"/>{bullets}</w:abstractNum>'
            f'<w:abstractNum w:abstractNumId="2"><w:multiLevelType w:val="hybridMultilevel"/>{numbered}</w:abstractNum>'
            f"{nums}</w:numbering>"
        )


# --- parser Markdownu --------------------------------------------------------------------
LIST_RE = re.compile(r"^(\s*)([-*+]|\d+[.)])\s+(.*)$")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*?)\s*#*\s*$")


def parse_front_matter(lines):
    meta = {}
    if lines and lines[0].strip() == "---":
        for j in range(1, len(lines)):
            if lines[j].strip() == "---":
                for kv in lines[1:j]:
                    if ":" in kv:
                        k, v = kv.split(":", 1)
                        meta[k.strip().lower()] = v.strip().strip('"').strip("'")
                return meta, lines[j + 1:]
    return meta, lines


def split_row(row):
    row = row.strip()
    if row.startswith("|"):
        row = row[1:]
    if row.endswith("|") and not row.endswith("\\|"):
        row = row[:-1]
    return [c.strip() for c in re.split(r"(?<!\\)\|", row)]


def is_block_start(line):
    s = line.strip()
    return bool(HEADING_RE.match(line) or LIST_RE.match(line) or s.startswith("|") or s.startswith(">") or s == r"\pagebreak")


def build(md_text):
    doc = Doc()
    meta, lines = parse_front_matter(md_text.splitlines())
    if meta.get("title"):
        doc.styled("Title", meta["title"])
    if meta.get("subtitle"):
        doc.styled("Subtitle", meta["subtitle"])

    i = 0
    while i < len(lines):
        line = lines[i]
        s = line.strip()
        if not s:
            i += 1
            continue
        if s == r"\pagebreak":
            doc.page_break()
            i += 1
            continue
        m = HEADING_RE.match(line)
        if m:
            doc.heading(len(m.group(1)), m.group(2))
            i += 1
            continue
        if s.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append(split_row(lines[i]))
                i += 1
            header, body = rows[0], rows[1:]
            aligns = None
            weights = None
            if body and all(re.fullmatch(r":?-+:?", c) for c in body[0] if c):
                dashes = [c.count("-") for c in body[0]]
                if max(dashes) > 3:
                    weights = [max(1, d) for d in dashes]
                aligns = []
                for c in body[0]:
                    aligns.append("center" if c.startswith(":") and c.endswith(":") else "right" if c.endswith(":") else "left" if c.startswith(":") else None)
                body = body[1:]
            ncols = len(header)
            default = ["left"] + ["center"] * (ncols - 1)
            aligns = [(aligns[c] if aligns and c < len(aligns) and aligns[c] else default[c]) for c in range(ncols)]
            body = [r + [""] * (ncols - len(r)) for r in body]
            if weights and len(weights) != ncols:
                weights = None
            doc.table(header, body, aligns, weights)
            continue
        if LIST_RE.match(line):
            items, indents = [], [0]
            while i < len(lines):
                l = lines[i]
                m2 = LIST_RE.match(l)
                if m2:
                    indent = len(m2.group(1).replace("\t", "    "))
                    if indent > indents[-1]:
                        indents.append(indent)
                    else:
                        while len(indents) > 1 and indent < indents[-1]:
                            indents.pop()
                    items.append((min(len(indents) - 1, 8), m2.group(2)[0].isdigit(), m2.group(3).strip()))
                    i += 1
                elif not l.strip():
                    j = i
                    while j < len(lines) and not lines[j].strip():
                        j += 1
                    if j < len(lines) and LIST_RE.match(lines[j]):
                        i = j
                        continue
                    break
                elif l.startswith(("  ", "\t")) and not is_block_start(l):
                    lvl, o, t = items[-1]
                    items[-1] = (lvl, o, t + " " + l.strip())
                    i += 1
                else:
                    break
            doc.list_block(items)
            continue
        if s.startswith(">"):
            q = []
            while i < len(lines) and lines[i].strip().startswith(">"):
                q.append(lines[i].strip()[1:].strip())
                i += 1
            doc.quote(" ".join(x for x in q if x))
            continue
        para = [s]
        i += 1
        while i < len(lines) and lines[i].strip() and not is_block_start(lines[i]):
            para.append(lines[i].strip())
            i += 1
        doc.paragraph(" ".join(para))
    return doc


def write_docx(doc, out_path):
    out_path = Path(out_path)
    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as z:
        z.write(TEMPLATE / "[Content_Types].xml", "[Content_Types].xml")
        for p in sorted(TEMPLATE.rglob("*")):
            if p.is_file() and p.name != "[Content_Types].xml":
                z.write(p, p.relative_to(TEMPLATE).as_posix())
        z.writestr("word/document.xml", doc.document_xml())
        z.writestr("word/_rels/document.xml.rels", doc.rels_xml())
        z.writestr("word/numbering.xml", doc.numbering_xml())
    return out_path


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("markdown", help="vstupní .md soubor")
    ap.add_argument("-o", "--out", required=True, help="výstupní .docx")
    ap.add_argument("--base64", help="zapsat i base64 obsah (pro Google Drive create_file.base64Content)")
    args = ap.parse_args()

    md = Path(args.markdown).read_text(encoding="utf-8")
    doc = build(md)
    out = write_docx(doc, args.out)
    size = out.stat().st_size
    print(f"OK  {out}  ({size:,} B, {len(doc.body)} bloků, {len(doc.hyperlinks)} odkazů, {len(doc.nums)} seznamů)")
    if args.base64:
        b64 = base64.b64encode(out.read_bytes()).decode("ascii")
        Path(args.base64).write_text(b64)
        print(f"OK  {args.base64}  ({len(b64):,} znaků base64)")


if __name__ == "__main__":
    main()
