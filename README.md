# Holt Historic Corridor Map: Ontario to Pomona

A single-page Leaflet map of the Holt Boulevard corridor in California, from Ontario International Airport and downtown Ontario on Euclid Avenue west through Montclair to downtown Pomona, the Pomona Transit Center, the Pomona Arts Colony and Fairplex. The view is locked to that corridor so the map can be used to explore and define it for a City of Ontario proposal built on one idea: Pomona draws, Ontario hosts, and transit connects them.

Data and cards carry over from the [Ontario Hotel Map](https://traviscs.github.io/Ontario-Hotel-Map/); the page is styled like the [California BEAD map](https://traviscs.github.io/California-GigaBit-Schools-Draft/): dark panels, a title card beside the zoom buttons, a Legend card with Layers, Lists and More tabs, three basemaps (Esri's National Geographic map, which the map opens on, and Google's Dark streets and Imagery, each with an Esri fallback), and light popup cards.

## Files

- `index.html`: the tab bar, in the same shape as West Coast Broadband Maps. One tab per place (whole corridor, the hotel district at ONT and the Convention Center, downtown Ontario, downtown Pomona, Fairplex, Rail). The Euclid tab is different: it loads the [Euclid Avenue Photo Walk](https://traviscs.github.io/Euclid-Avenue/) (its own repo, TravisCS/Euclid-Avenue) in its frame instead of `map.html`. The road between the downtowns is connective tissue: it keeps the spine, transit and city limits but no tab of its own. Each tab loads `map.html` in its own frame, started on that section, and frames stay loaded while you switch, so every tab keeps its own view, layers and open cards. The last tab is remembered.
- `map.html`: the map itself (markup, styles, scripts). Loads Leaflet 1.9.4, Leaflet.markercluster 1.5.3 and Leaflet.GoogleMutant from unpkg, and the Google Maps JavaScript API with a key that is referrer-locked to the GitHub Pages site. Close in on the National Geographic view it also loads MapLibre GL JS 5.24.1 and maplibre-gl-leaflet 0.1.4 from unpkg, to draw OpenStreetMap building shapes from OpenFreeMap's tiles and, past zoom 18, the streets and their names. `smoothzoom.js` and `motion.js` in this repository give the continuous zoom and the fades and glides.
- `data/photos.js` and `photos/`: card photos that are not Google's (the map owner's own from the Euclid Avenue photo walk, and open-licence photos from Wikimedia Commons, resized to 640 px wide), each with its author, licence and page. Where a card has one, Google's photo is not asked for.
- `data/`: one JavaScript list per layer, so a GeoJSON export is a simple transform.
  - `hotels.js`: `HOTELS`, hotels inside the corridor box carried over from the Ontario Hotel Map (Ontario, Pomona, Montclair, Claremont).
  - `businesses.js`: `BIZ`, businesses along Holt within about a quarter mile of the road between Euclid Avenue and the Pomona Transit Center, merged from OpenStreetMap and from official, press and directory sources. The page shows only the visitor-facing part of it inside the downtown Ontario box (restaurants, cafes, bars, markets, retail, civic or cultural); the rest stays in the file.
  - `pomona.js`: `POMONA`, Pomona-side assets (Fairplex, the cricket ground, the art center, the Transit Center, the Arts Colony and its galleries, downtown dining, civic anchors, Montclair Place).
  - `ontario.js`: `ONTARIO`, Ontario-side assets (ONT, the Convention Center and expansion, the Holt corridor program, Euclid Avenue, Town Square, the museums, City Hall, Arts District North, the pop-up program).
  - `transit.js`: `TRANSIT`, the West Valley Connector route and stations, Metrolink and Metro A Line track geometry and stations, and the two Pomona-side gaps. Also `HSR`, the high-speed rail layer: the Rancho Cucamonga hub, a schematic Brightline West stub toward Las Vegas, the proposed ONT Connector, the planned Cucamonga to Pomona North shuttle, and the ordered stop list behind the Rail tab, with sources in the file header.
  - `holt.js`: `HOLT`, the Holt Boulevard / Holt Avenue centerline.
  - `city_limits.js`: `CITY_LIMITS`, a saved copy of the Board of Equalization city limits for Ontario, Montclair and Pomona; the page loads the live service first and falls back to this copy.
  - `fairplex.js`: `FAIRPLEX`, the Fairplex campus detail (Expo Halls, grandstand, infield and cricket ground, dragstrip, RV park, museums, lots, gates) drawn only from zoom 15; footprints from OpenStreetMap, facts from Fairplex's pages and its 2017 campus map, hall numbers and gate positions marked approximate.
- `Holt_Corridor_Sources.pdf`: the source list, every source grouped by level of government and agency with today's check under each; linked from About, every legend + panel and every card's Sources note. Rebuilt by `tools/make_sources_pdf.py`.
- `sources-verified.json`: the November 3 and 7, 2026 certification: each source's check (what was compared, any correction) and every link with its result, plus a November 12, 2026 block for the corrections carried over from the Holt Corridor Simple map.
- `tools/`: `make_sources_pdf.py` (builds the PDF from `map.html`, `sources-verified.json` and `legend_sources.json`), `certify_links.py` and `references_pdf.py` (byte-identical copies from the shared leaflet-layer-sources skill), and `dump_legend_sources.js` (a WebKit harness test that writes `legend_sources.json` from the live page). Not published.
- `.github/workflows/pages.yml`: publishes the site files to GitHub Pages on each push to `main` (copied from the hotel map).

## Sources and data notes

Every card cites the page it was read from, and the Legend's "About the data and sources" section lists the sources. Google ratings, review counts and photos are fetched live from Google Places when a card opens on the Dark streets or Imagery view and are never stored here; on the National Geographic view they are not asked for or shown. Links were checked by script and by AI research agents on November 1, 2026; sites that block scripted requests (flyontario.com, pomonaca.gov, staterbros.com and a few chain store pages) were read in a browser instead. On November 3, 2026 every source and link was certified again (see `sources-verified.json` and the source list PDF): 451 of 458 links verified, the other 7 behind security checks that were not completed, and 8 source entries corrected to match what the source itself says. On November 12, 2026 the corrections checked for the Holt Corridor Simple map on November 11 and 12 were carried into the cards this map shares with it; the 70 links new to this map were checked that day (all opened, 21 of them in a web browser) and are listed in `sources-verified.json` under `carried_2026_11_12`.

Things that could not be verified and are labeled as such on the cards: the Knight Riders Cricket Ground's capacity and exact position on the Fairplex grounds, whether Craft Collective still operates at 137 N Euclid, the convention hotel's room count (650 in the Holt sources, 600-plus in the Convention Center sheet) and any 2026 update on its timing, the boundaries of the Arts District North zoning area, whether a weekly farmers market still runs at Ontario Town Square, the exact numbering of the Expo Halls and the positions of the Fairplex gates (placed from the 2017 campus map), and every Fairplex parking lot capacity (none is published).

## Local testing

Serve the folder with any static server, for example:

```
python3 -m http.server 8765
```

On localhost the map opens on National Geographic as usual. Google's maps and Places lookups fail there because the key is referrer-locked; Dark streets and Imagery fall back to Esri tiles, and "Check Google connection" in the Legend says so.

Map data: OpenStreetMap contributors (ODbL) for the Holt centerline, rail geometry, tagged businesses, and the streets the two Pomona-side gaps follow (with the card distances measured on those lines); California Board of Equalization for city limits; US Census Bureau geocoder for addresses placed by address.
