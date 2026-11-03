# Holt Historic Corridor Map: Ontario to Pomona

A single-page Leaflet map of the Holt Boulevard corridor in California, from Ontario International Airport and downtown Ontario on Euclid Avenue west through Montclair to downtown Pomona, the Pomona Transit Center, the Pomona Arts Colony and Fairplex. The view is locked to that corridor so the map can be used to explore and define it for a City of Ontario proposal built on one idea: Pomona draws, Ontario hosts, and transit connects them.

Data and cards carry over from the [Ontario Hotel Map](https://traviscs.github.io/Ontario-Hotel-Map/); the page is styled like the [California BEAD map](https://traviscs.github.io/California-GigaBit-Schools-Draft/): dark panels, a title card beside the zoom buttons, a Legend card with Layers, Lists and More tabs, a night-styled Google basemap with an Esri dark fallback, and light popup cards.

## Files

- `index.html`: the tab bar, in the same shape as West Coast Broadband Maps. One tab per place (whole corridor, the hotel district at ONT and the Convention Center, downtown Ontario, downtown Pomona, Fairplex, Rail). The road between the downtowns is connective tissue: it keeps the spine, transit and city limits but no tab of its own. Each tab loads `map.html` in its own frame, started on that section, and frames stay loaded while you switch, so every tab keeps its own view, layers and open cards. The last tab is remembered.
- `map.html`: the map itself (markup, styles, scripts). Loads Leaflet 1.9.4, Leaflet.markercluster 1.5.3 and Leaflet.GoogleMutant from unpkg, and the Google Maps JavaScript API with a key that is referrer-locked to the GitHub Pages site.
- `data/`: one JavaScript list per layer, so a GeoJSON export is a simple transform.
  - `hotels.js`: `HOTELS`, hotels inside the corridor box carried over from the Ontario Hotel Map (Ontario, Pomona, Montclair, Claremont).
  - `businesses.js`: `BIZ`, businesses along Holt within about a quarter mile of the road between Euclid Avenue and the Pomona Transit Center, merged from OpenStreetMap and from official, press and directory sources. The page shows only the visitor-facing part of it inside the downtown Ontario box (restaurants, cafes, bars, markets, retail, civic or cultural); the rest stays in the file.
  - `pomona.js`: `POMONA`, Pomona-side assets (Fairplex, the cricket ground, the art center, the Transit Center, the Arts Colony and its galleries, downtown dining, civic anchors, Montclair Place).
  - `ontario.js`: `ONTARIO`, Ontario-side assets (ONT, the Convention Center and expansion, the Holt corridor program, Euclid Avenue, Town Square, the museums, City Hall, Arts District North, the pop-up program).
  - `transit.js`: `TRANSIT`, the West Valley Connector route and stations, Metrolink and Metro A Line track geometry and stations, and the two Pomona-side gaps. Also `HSR`, the high-speed rail layer: the Rancho Cucamonga hub, a schematic Brightline West stub toward Las Vegas, the proposed ONT Connector, the planned Cucamonga to Pomona North shuttle, and the ordered stop list behind the Rail tab, with sources in the file header.
  - `holt.js`: `HOLT`, the Holt Boulevard / Holt Avenue centerline.
  - `city_limits.js`: `CITY_LIMITS`, a saved copy of the Board of Equalization city limits for Ontario, Montclair and Pomona; the page loads the live service first and falls back to this copy.
  - `fairplex.js`: `FAIRPLEX`, the Fairplex campus detail (Expo Halls, grandstand, infield and cricket ground, dragstrip, RV park, museums, lots, gates) drawn only from zoom 15; footprints from OpenStreetMap, facts from Fairplex's pages and its 2017 campus map, hall numbers and gate positions marked approximate.
- `.github/workflows/pages.yml`: publishes the site files to GitHub Pages on each push to `main` (copied from the hotel map).

## Sources and data notes

Every card cites the page it was read from, and the Legend's "About the data and sources" section lists the sources. Google ratings, review counts and photos are fetched live from Google Places when a card opens and are never stored here. Links were checked by script and by AI research agents on November 1, 2026; sites that block scripted requests (flyontario.com, pomonaca.gov, staterbros.com and a few chain store pages) were read in a browser instead.

Things that could not be verified and are labeled as such on the cards: the Knight Riders Cricket Ground's capacity and exact position on the Fairplex grounds, whether Craft Collective still operates at 137 N Euclid, the convention hotel's room count (650 in the Holt sources, 600-plus in the Convention Center sheet) and any 2026 update on its timing, the boundaries of the Arts District North zoning area, whether a weekly farmers market still runs at Ontario Town Square, the exact numbering of the Expo Halls and the positions of the Fairplex gates (placed from the 2017 campus map), and every Fairplex parking lot capacity (none is published).

## Local testing

Serve the folder with any static server, for example:

```
python3 -m http.server 8765
```

The Google basemap and Places lookups fail on localhost because the key is referrer-locked; the page falls back to Esri tiles and says so under "Check Google connection" in the Legend.

Map data: OpenStreetMap contributors (ODbL) for the Holt centerline, rail geometry, tagged businesses, and the streets the two Pomona-side gaps follow (with the card distances measured on those lines); California Board of Equalization for city limits; US Census Bureau geocoder for addresses placed by address.
