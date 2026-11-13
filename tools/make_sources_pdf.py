"""Build the Holt Historic Corridor Map's source list as a polished PDF: every source in the map's
one source list (SOURCES in map.html, which also feeds About, the legend + panels and the card
Sources blocks), grouped by level of government and agency, in the APA form the map shows, each
with what it was used for, the legend rows and cards that draw on it, and its check.

Inputs (all in this repository):
  map.html                    the SOURCES list (read here, not copied)
  sources-verified.json       the certify output: one check per source and per link
  tools/legend_sources.json   legend rows and card links per source, dumped from the live page
                              with tools/dump_legend_sources.js in the WebKit harness
Output: Holt_Corridor_Sources.pdf beside map.html.
Run:  /Users/blackbox/Documents/LA_Emergency_Plans/_tools/.venv/bin/python tools/make_sources_pdf.py
The layout is references_pdf.py in this folder, a byte-identical copy from the leaflet-layer-sources skill;
certify_links.py (also copied) made the link checks in sources-verified.json.
"""
import json, re, sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))  # references_pdf.py is kept beside this script
from references_pdf import render, a, tag, long_date, check_line, esc, NOTE  # noqa: E402

OUT = ROOT / "Holt_Corridor_Sources.pdf"
SITE = "https://traviscs.github.io/Holt-Historic-Corridor-Map/"
CERT = json.loads((ROOT / "sources-verified.json").read_text())
LEG = json.loads((ROOT / "tools/legend_sources.json").read_text())
def _days(ds):  # ["2026-11-03", "2026-11-07"] -> "November 3 and 7, 2026"
    if len(ds) == 1: return long_date(ds[0])
    if len({d[:7] for d in ds}) == 1:
        month = long_date(ds[0]).split(" ")[0]
        return f"{month} {' and '.join(str(int(d[8:])) for d in ds)}, {ds[0][:4]}"
    return " and ".join(long_date(d) for d in ds)
CHECKED = _days(CERT.get("checked_dates") or [CERT["checked"]])
UPD = CERT.get("carried_2026_11_12")  # corrections carried over from the Holt Corridor Simple map
UPD2 = CERT.get("basemap_2026_11_12")  # the basemap change: National Geographic, building shapes, Google drawn maps

# ---- the map's one source list, read from map.html (JS object literals with single-quoted values)
html = (ROOT / "map.html").read_text()
block = html[html.index("const SOURCES=["): html.index("];", html.index("const SOURCES=["))]
SRC = []
for obj in re.findall(r"\{id:'ref\d+'.*?\}(?=,\n|\n)", block, re.S):
    d = {k: v.replace("\\'", "'") for k, v in re.findall(r"(\w+):'((?:[^'\\]|\\.)*)'", obj)}
    SRC.append(d)
BY = {s["name"]: s for s in SRC}
CHK = {s["key"]: s for s in CERT["sources"]}
LINKS = {x["url"]: x for x in CERT["links"]}

# ---- where each source shows: legend rows (the + panels) and card links
ON_MAP = defaultdict(list)
for r in LEG["rows"]:
    for k in r["src"]:
        if r["label"] not in ON_MAP[k]:
            ON_MAP[k].append(r["label"])
# the basemap has no legend row since November 6, 2026: it is the Dark streets / Imagery / Nat Geo switch at the top right
for k in ("google", "esri", "ofm"):
    ON_MAP[k].append("Basemap switch (Dark streets, Imagery, Nat Geo)")
CARDS = LEG.get("cards", {})

# ---- levels and agencies
LEVELS = ["Federal government", "State of California", "Counties and regional agencies", "Cities and their downtown districts",
          "Nonprofit and private organizations", "Open and commercial data", "Maps by T. C. Smith"]
AGENCY = {
 "census": (0, "U.S. Department of Commerce, Census Bureau"),
 "boe": (1, "California State Board of Equalization (layer served by the California Department of Conservation)"),
 "ceqanet": (1, "State Clearinghouse (CEQAnet), Governor's Office of Land Use and Climate Innovation"),
 "sbcta_wvc": (2, "San Bernardino County Transportation Authority (SBCTA)"), "sbcta_rcpn": (2, "San Bernardino County Transportation Authority (SBCTA)"),
 "omnitrans": (2, "Omnitrans"), "shoponholt": (2, "Omnitrans"),
 "metrolink": (2, "Southern California Regional Rail Authority (Metrolink)"),
 "metro": (2, "Los Angeles County Metropolitan Transportation Authority (LA Metro)"),
 "foothill": (2, "Foothill Transit"), "ont_airport": (2, "Ontario International Airport Authority"),
 "ont_holt_otb": (3, "City of Ontario"), "ont_city": (3, "City of Ontario"), "pomona_city": (3, "City of Pomona"),
 "doia": (3, "Downtown Ontario Improvement Association"), "dtpomona": (3, "Downtown Pomona Owners Association (Downtown Pomona District)"),
 "gocal": (3, "Greater Ontario California (GOCAL)"),
 "fairplex": (4, "Fairplex"), "fp_venues": (4, "Fairplex"), "brightline": (4, "Brightline West"),
 "osm": (5, "OpenStreetMap contributors"), "ofm": (5, "OpenFreeMap"), "google": (5, "Google"), "esri": (5, "Esri"), "kayak": (5, "Kayak"), "hotelscom": (5, "Hotels.com"),
 "hotelmap": (6, "Smith, T. C."),
}
REPORTS = {"ont_hosp": (0, "City of Ontario"), "ont_holt_sheet": (0, "City of Ontario"), "ont_cc_sheet": (0, "City of Ontario"),
           "fp_map2017": (1, "Fairplex"), "railwayage": (2, "Railway Age")}
RLEVELS = ["Cities", "Nonprofit organizations", "Press"]
SOFTWARE = ["html2canvas"]
LIBS = [  # loaded by the page from unpkg; not in the About list
 ("Agafonkin, V., and contributors (2023). <i>Leaflet</i> (Version 1.9.4) [Computer software, BSD 2-Clause License]. ", "https://leafletjs.com", "The map itself: panning, zooming, markers, lines and cards.", "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"),
 ("Leaflet contributors (2021). <i>Leaflet.markercluster</i> (Version 1.5.3) [Computer software, MIT License]. ", "https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js", "The numbered circles that group nearby markers.", None),
 ("Sánchez Ortega, I. (2024). <i>Leaflet.GridLayer.GoogleMutant</i> (Version 0.14.1) [Computer software]. ", "https://unpkg.com/leaflet.gridlayer.googlemutant@0.14.1/dist/Leaflet.GoogleMutant.js", "Shows Google picture tiles inside Leaflet, the backup when the drawn Google map cannot run.", None),
 ("MapLibre contributors (2026). <i>MapLibre GL JS</i> (Version 5.24.1) [Computer software, BSD 3-Clause License]. ", "https://unpkg.com/maplibre-gl@5.24.1/dist/maplibre-gl.js", "Draws the building shapes over the National Geographic basemap. Fetched only when a reader zooms in on that basemap.", "https://unpkg.com/maplibre-gl@5.24.1/dist/maplibre-gl.css"),
 ("MapLibre contributors (2026). <i>maplibre-gl-leaflet</i> (Version 0.1.4) [Computer software, ISC License]. ", "https://unpkg.com/@maplibre/maplibre-gl-leaflet@0.1.4/leaflet-maplibre-gl.js", "Places the MapLibre drawing inside the Leaflet map.", None),
]

def apa(s):
    """The entry exactly as the About sheet renders it: owner (year). <i>title</i>after. url"""
    shown = re.sub(r"^https?://", "", s["url"])
    return f"{esc(s['owner'])} ({esc(s['year'])}). <i>{esc(s['title'])}</i>{esc(s.get('after', ''))}. {a(s['url'], shown)}"

def check(c):
    lc = dict(c["link_check"])
    if lc.get("result") == "verified":
        return check_line(lc)
    return tag("Live page not reachable.", NOTE) + f" Checked {long_date(lc.get('checked'))}: {esc(lc.get('detail', ''))}"

def entry(name):
    s, c = BY[name], CHK[name]
    meta = []
    if s.get("use"): meta.append(f"<b>Used for:</b> {esc(s['use'].rstrip('.'))}.")
    if ON_MAP.get(name): meta.append(f"<b>On the map:</b> {esc('; '.join(ON_MAP[name]))}.")
    if CARDS.get(name):
        meta.append("<b>Card links:</b> " + esc(", ".join(f"{n} on {k}" for k, n in sorted(CARDS[name].items(), key=lambda kv: -kv[1]))) + ".")
    meta.append(f"<b>What was compared:</b> {esc(c['checked_what'])}")
    if c.get("fixed"): meta.append(tag("Corrected.", NOTE) + " " + esc(c["fixed"]))
    if c.get("note"): meta.append(f"<b>Note:</b> {esc(c['note'])}")
    meta.append(check(c))
    return {"ref": apa(s), "meta": meta}

def grouped(names, table, levels):
    g = defaultdict(lambda: defaultdict(list))
    for n in names:
        lv, ag = table[n]; g[lv][ag].append(n)
    out = []
    for lv in range(len(levels)):
        if lv not in g: continue
        out.append({"title": levels[lv], "groups": [{"name": ag, "entries": [entry(n) for n in sorted(g[lv][ag], key=lambda n: BY[n]["title"])]}
                                                    for ag in sorted(g[lv])]})
    return out

def spec():
    names = [s["name"] for s in SRC]
    missing = [n for n in names if n not in AGENCY and n not in REPORTS and n not in SOFTWARE]
    assert not missing, f"sources without an agency: {missing}"
    data = [n for n in names if n in AGENCY]; reps = [n for n in names if n in REPORTS]
    agencies = {AGENCY[n][1] for n in data} | {REPORTS[n][1] for n in reps} | {BY[n]["owner"] for n in SOFTWARE}
    sm = CERT["summary"]; rl = CERT["record_links"]
    fixed = [c for c in CERT["sources"] if c.get("fixed")]
    parts = [
     {"title": "Part 1. Data sources", "levels": grouped(data, AGENCY, LEVELS),
      "note": "The services, web pages and records the layers and cards are built from, by the agency or organization that publishes each."},
     {"title": "Part 2. Reports, documents and articles", "levels": grouped(reps, REPORTS, RLEVELS),
      "note": "Information sheets, the Fairplex campus map and the press report the map quotes or places features from."}]
    sw = [entry(n) for n in SOFTWARE]
    for ref, url, use, extra in LIBS:
        c = LINKS.get(url) or {}
        meta = [f"<b>Used for:</b> {esc(use)}", "<b>Note:</b> loaded by the page, not listed in About."]
        if extra and LINKS.get(extra): meta.append(f"<b>Copy loaded:</b> {a(extra)}")
        meta.append(check_line(c) if c else "")
        sw.append({"ref": ref + a(url), "meta": meta})
    sw.append({"ref": f"Smith, T. C. (2026). <i>Holt Historic Corridor Map: Ontario to Pomona</i> [Interactive map]. {a(SITE)}",
               "meta": ["Cite the map this way. Code, layout and data pipeline generated with Claude (Anthropic); data, placement and accuracy reviewed by the author.",
                        check_line(LINKS[SITE]) if SITE in LINKS else ""]})
    parts.append({"title": "Part 3. Software", "new_page": False, "note": "Programs the map runs on, and the map itself.", "entries": sw})
    # card links that could not be opened, and card links corrected
    cl = []
    for f in rl["failed"]:
        cl.append({"ref": a(f["url"]), "meta": [f"<b>On:</b> {esc(f['card'])}.", tag("Live page not reachable.", NOTE) + f" Checked {long_date((LINKS.get(f['url']) or {}).get('checked') or CERT['checked'])}: " + esc(f["browser"]), f"<b>Action:</b> {esc(f['action'])}."]})
    for f in rl["fixed"]:
        cl.append({"ref": a(f["url"]), "meta": [f"<b>On:</b> {esc(f['card'])}.", tag("Corrected.", NOTE) + " " + esc(f["browser"] or "Checked by script."), f"<b>Action:</b> {esc(f['action'])}."]})
    parts.append({"title": "Part 4. Card links that could not be opened or were corrected", "new_page": False,
                  "note": f"The other {rl['ok']} of the {rl['total']} card and page links opened and point at the record named; sources-verified.json beside the map lists every one with its check.",
                  "entries": cl})
    return {
     "kicker": "HOLT HISTORIC CORRIDOR MAP: ONTARIO TO POMONA", "title": "Sources and References",
     "subtitle": f"Every source behind the interactive map, grouped by level of government and agency, with each source and card link checked on {CHECKED}.",
     "byline": f"Map and source list by T. C. Smith. Interactive map: {a(SITE)}",
     "footer": f"Holt Historic Corridor Map  ·  Sources and References  ·  checked {CHECKED}",
     "stats": [[len(SRC), "sources in the map's list"], [len(agencies), "agencies and publishers"], [sm["links_checked"], "links checked"], [sm["verified"], "links verified"]],
     "intro": [
      f"<b>Checked on {CHECKED}.</b> Every link in the map page, its data files and its README was requested by script ({sm['links_checked']} distinct addresses: the {len(SRC)} sources, "
      f"{rl['total']} card and page links, and the OpenStreetMap objects the cards link by id). {sm['needed_browser']} were opened in a web browser because the site refuses scripts, "
      f"each from the site's own page; all {sm['osm_api']} OpenStreetMap objects were also read through the OpenStreetMap API. Each page that answered was read for the name of the record that cites it, "
      f"and the ones that did not show it were opened and read in a browser. {sm['verified']} links were verified; {sm['unverifiable']} could not be opened because the site turns automated browsers away "
      f"with a security check (never completed) or a blank page; {sm['sources_unverifiable_live']} of those are sources, for which the Internet Archive copy was read instead.",
      f"<b>Corrected.</b> {len(fixed)} source entries were changed so the publisher, title, date or address match what the source itself says, "
      f"and {len(rl['fixed'])} card links were fixed. Each correction is marked under its entry. The November 2, 2026 link audit (453 links) is kept in the repository; "
      f"{len(CERT['compared_with_2026_11_02_audit']['ok_then_not_verified_now'])} links it passed now refuse automated readers in a browser too, and one hotel site it had repaired has since gone offline.",
      *([f"<b>Updated on {long_date(UPD['checked'])}.</b> " + esc(UPD["pdf_note"])] if UPD else []),
      *([f"<b>Basemap changed on {long_date(UPD2['checked'])}.</b> " + esc(UPD2["pdf_note"])] if UPD2 else []),
      "<b>How to read an entry.</b> The first line is the reference exactly as the map's About sheet shows it, in APA style, with its link. Below it: what the map used the source for, "
      "the legend layers and cards that draw on it, what the source was compared with, any correction, and the check. Dates are the publisher's own; n.d. means the source gives none, "
      "and an information sheet without a printed date is dated by its posting.",
      "<b>AI use.</b> The map, this list and the checks were produced with Claude (Anthropic) under the direction of T. C. Smith, who reviewed the results and is "
      "responsible for the content. The map is independent and not a City of Ontario or Fairplex product."],
     "pdf_meta": {"title": "Sources and References: Holt Historic Corridor Map", "author": "T. C. Smith",
                  "subject": "Every source behind the Holt Historic Corridor Map, grouped by agency, with each link checked",
                  "creator": "make_sources_pdf.py and references_pdf.py (code by Claude, reviewed by T. C. Smith)"},
     "parts": parts}

if __name__ == "__main__":
    n = render(spec(), OUT)
    print(f"wrote {OUT} ({n} pages)")
