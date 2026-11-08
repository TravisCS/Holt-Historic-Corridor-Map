"""A polished references PDF for a map: sources grouped by part, level and agency, APA entries
with hanging indents, a "Used for / On the map / Verified" block under each, a contents page,
PDF bookmarks, clickable links and "Page X of Y" footers. Times New Roman throughout.

    from references_pdf import render, a, tag, long_date, check_line, esc
    render(spec, "Map_Sources.pdf")

spec = {
  "kicker": "LA COUNTY EVACUATION ROUTES", "title": "Sources and References",
  "subtitle": "...", "byline": "<html>", "footer": "Map name  ·  Sources and References  ·  checked <date>",
  "stats": [["54", "data sources"], ...],            # up to 4 boxes
  "intro": ["<b>Checked on ...</b> ...", ...],         # paragraphs (reportlab markup: b, i, a href, font)
  "pdf_meta": {"title": "...", "author": "T. C. Smith", "subject": "..."},
  "parts": [{"title": "Part 1. Data sources", "note": "...",
             "levels": [{"title": "Federal government",
                         "groups": [{"name": "U.S. Department of Agriculture, Forest Service",
                                     "entries": [{"ref": "<APA html>", "meta": ["<b>Used for:</b> ...", check_line(c)]}]}]}],
             "entries": [...]}]                        # optional entries straight under the part
}
Needs reportlab (pip install reportlab). Lessons: never nest KeepTogether (it forces a page break each
time); build twice so the footer knows the page total; each multiBuild resolves the contents page numbers.
"""
import re, datetime
from xml.sax.saxutils import escape as esc
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle, KeepTogether, PageBreak
from reportlab.platypus.tableofcontents import TableOfContents

_F = "/System/Library/Fonts/Supplemental/Times New Roman"
for nm, f in [("TNR", ""), ("TNR-B", " Bold"), ("TNR-I", " Italic"), ("TNR-BI", " Bold Italic")]:
    pdfmetrics.registerFont(TTFont(nm, _F + f + ".ttf"))
addMapping("TNR", 0, 0, "TNR"); addMapping("TNR", 1, 0, "TNR-B"); addMapping("TNR", 0, 1, "TNR-I"); addMapping("TNR", 1, 1, "TNR-BI")
INK = colors.HexColor("#1d1c19"); MUTED = colors.HexColor("#5f5b50"); RULE = colors.HexColor("#d9d4c4")
ACCENT = colors.HexColor("#b8322f"); CHIP = colors.HexColor("#f3f0e7"); LINK = "#1f4e79"; OK = "#2e6b30"; NOTE = "#8a5a00"

def _S(name, **k):
    base = dict(fontName="TNR", fontSize=10.5, leading=13.6, textColor=INK, splitLongWords=1); base.update(k)
    return ParagraphStyle(name, **base)
ST = {
 "kicker": _S("kicker", fontName="TNR-B", fontSize=9.5, leading=12, textColor=ACCENT),
 "title": _S("title", fontName="TNR-B", fontSize=27, leading=31, spaceBefore=4, spaceAfter=6),
 "sub": _S("sub", fontName="TNR-I", fontSize=12.5, leading=16, textColor=MUTED, spaceAfter=10),
 "by": _S("by", fontSize=10.5, leading=14, textColor=MUTED),
 "body": _S("body", fontSize=10.5, leading=14.2, spaceAfter=6),
 "part": _S("part", fontName="TNR-B", fontSize=17, leading=21, spaceBefore=4, spaceAfter=2, textColor=ACCENT),
 "partnote": _S("partnote", fontName="TNR-I", fontSize=10.5, leading=14, textColor=MUTED, spaceAfter=10),
 "level": _S("level", fontName="TNR-B", fontSize=13.5, leading=17, spaceBefore=14, spaceAfter=4),
 "agency": _S("agency", fontName="TNR-B", fontSize=11.2, leading=14, spaceBefore=9, spaceAfter=3),
 "ref": _S("ref", fontSize=10.5, leading=13.8, leftIndent=0.34 * inch, firstLineIndent=-0.34 * inch, spaceAfter=1.5),
 "meta": _S("meta", fontSize=9, leading=11.6, leftIndent=0.34 * inch, textColor=MUTED, spaceAfter=7.5),
 "toc1": _S("toc1", fontName="TNR-B", fontSize=11, leading=15, spaceBefore=4),
 "toc2": _S("toc2", fontSize=10.3, leading=13.6, leftIndent=0.25 * inch),
 "stat_n": _S("stat_n", fontName="TNR-B", fontSize=20, leading=22, alignment=1),
 "stat_l": _S("stat_l", fontSize=8.6, leading=10.4, textColor=MUTED, alignment=1),
}

def a(url, text=None):
    return f'<a href="{esc(url)}" color="{LINK}">{esc(text or url)}</a>' if url else ""
def tag(text, color=OK): return f'<font name="TNR-B" color="{color}">{esc(text)}</font>'
def long_date(d):
    try:
        y, m, dd = map(int, str(d)[:10].split("-")); return datetime.date(y, m, dd).strftime("%B %-d, %Y")
    except Exception:
        return str(d or "")
def check_line(c):
    """One line for a certify_links.py result."""
    if not c: return ""
    if c["result"] == "local": return tag("In the project.") + " " + esc(c.get("detail", ""))
    if c["result"] == "verified":
        how = "Opened in a web browser on " if c.get("how") == "browser" else "Checked "
        extra = f" The publisher last edited it on {long_date(c['last_edit'])}." if c.get("last_edit") else ""
        return tag("Verified.") + f" {how}{long_date(c['checked'])}: {esc(c['detail'])}{extra}"
    return tag("Not verified.", NOTE) + f" Checked {long_date(c['checked'])}: {esc(c['detail'])}"

class _Doc(BaseDocTemplate):
    def __init__(self, fn, footer, meta, npages=0):
        super().__init__(fn, pagesize=letter, leftMargin=0.95 * inch, rightMargin=0.95 * inch, topMargin=0.85 * inch, bottomMargin=0.9 * inch,
                         title=meta.get("title", ""), author=meta.get("author", ""), subject=meta.get("subject", ""), creator=meta.get("creator", "references_pdf.py"))
        fr = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="f", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        self.addPageTemplates([PageTemplate(id="p", frames=[fr], onPage=self._deco)])
        self.footer = footer; self.npages = npages
    def _deco(self, c, doc):
        c.saveState(); y = 0.55 * inch
        c.setStrokeColor(RULE); c.setLineWidth(0.6); c.line(self.leftMargin, y + 12, letter[0] - self.rightMargin, y + 12)
        c.setFont("TNR", 8.6); c.setFillColor(MUTED); c.drawString(self.leftMargin, y, self.footer)
        c.drawRightString(letter[0] - self.rightMargin, y, f"Page {doc.page} of {self.npages or '?'}"); c.restoreState()
    def afterFlowable(self, f):
        if getattr(f, "toc", None):
            lvl, text, key = f.toc
            self.canv.bookmarkPage(key); self.canv.addOutlineEntry(text, key, level=lvl, closed=lvl > 0)
            self.notify("TOCEntry", (lvl, text, self.page, key))

def _H(text, style, lvl, key):
    p = Paragraph(text, ST[style]); p.toc = (lvl, re.sub("<[^>]+>", "", text), key); return p
def _entry(e): return [Paragraph(e["ref"], ST["ref"])] + ([Paragraph("<br/>".join(m for m in e.get("meta", []) if m), ST["meta"])] if e.get("meta") else [])

def _story(spec):
    s = [Paragraph(spec.get("kicker", ""), ST["kicker"]), Paragraph(spec.get("title", "Sources and References"), ST["title"])]
    if spec.get("subtitle"): s.append(Paragraph(spec["subtitle"], ST["sub"]))
    if spec.get("byline"): s.append(Paragraph(spec["byline"], ST["by"]))
    s.append(Spacer(1, 14))
    if spec.get("stats"):
        k = spec["stats"][:4]; w = 6.4 * inch / len(k)
        t = Table([[Paragraph(str(n), ST["stat_n"]) for n, _ in k], [Paragraph(l, ST["stat_l"]) for _, l in k]], colWidths=[w] * len(k), rowHeights=[26, 16])
        t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), CHIP), ("LINEAFTER", (0, 0), (len(k) - 2, -1), 0.6, RULE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                               ("TOPPADDING", (0, 0), (-1, 0), 8), ("BOTTOMPADDING", (0, 1), (-1, 1), 8)]))
        s += [t, Spacer(1, 12)]
    s += [Paragraph(p, ST["body"]) for p in spec.get("intro", [])]
    toc = TableOfContents(); toc.levelStyles = [ST["toc1"], ST["toc2"]]; toc.dotsMinLevel = 0
    s += [Spacer(1, 6), Paragraph("Contents", ST["level"]), toc]
    for pi, part in enumerate(spec["parts"]):
        s.append(PageBreak() if pi == 0 or part.get("new_page", True) else Spacer(1, 18))
        s.append(_H(part["title"], "part", 0, f"p{pi}"))
        if part.get("note"): s.append(Paragraph(part["note"], ST["partnote"]))
        for e in part.get("entries", []): s.append(KeepTogether(_entry(e)))
        for li, lv in enumerate(part.get("levels", [])):
            lead = [_H(lv["title"], "level", 1, f"p{pi}l{li}")]
            for g in lv["groups"]:
                ents = [_entry(e) for e in g["entries"]]
                head = Paragraph(f"{esc(g['name'])} <font color='#5f5b50' name='TNR'>({len(ents)})</font>", ST["agency"])
                s.append(KeepTogether(lead + [head] + (ents[0] if ents else [])))   # heading stays with its first entry
                s += [KeepTogether(e) for e in ents[1:]]; lead = []
    return s

def render(spec, out):
    d1 = _Doc(str(out), spec.get("footer", ""), spec.get("pdf_meta", {})); d1.multiBuild(_story(spec))
    d2 = _Doc(str(out), spec.get("footer", ""), spec.get("pdf_meta", {}), npages=d1.page); d2.multiBuild(_story(spec))
    return d2.page
