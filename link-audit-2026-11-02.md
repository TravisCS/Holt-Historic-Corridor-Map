# Link audit, November 2, 2026

Every link in `map.html`, the data files and the README was inventoried (816 occurrences, 453 distinct addresses), requested by a script, then opened by AI research agents (Claude Sonnet, run by Claude Code) to confirm it answers and points at the place or source named. Links the script could not reach were opened in a browser. Lines are schematic positions; this audit checks links, not facts.

## Result

| Verdict | Count | Meaning |
|---|---|---|
| OK | 432 | Loads and is about the expected place or source |
| Fixed | 13 | Dead, wrong or moved; replaced, updated or removed (listed below) |
| Blocked | 6 | Site refuses automated readers; checked for correct form only |
| Not a link | 3 | Code templates the scan caught |

## Fixes applied

| Link | What was wrong and what changed |
|---|---|
| https://www.hoteldlinsontarioairport.com/ | Hotel d'Lins official site: HTTPS certificate is for another domain and expired; link changed to http, which serves the site. |
| https://lookup.hotels.com/ho3187729056/mayfair-inn-ontario-united-states-of-america | Mayfair Inn Hotels.com page: 404; source removed, GOCAL listing remains. |
| https://www.expressinnontario.com/ | Express Inn & Suites site: domain parked; link removed, GOCAL listing remains. |
| https://untitledartgallerydto.com/ | Untitled Art Gallery site: domain parked; replaced by the gallery's Instagram page. |
| https://www.flyontario.com/parking-transports/hotel-shuttles | ONT hotel shuttle page: moved; link updated to the new address. |
| https://www.metro.net/riding/guide/a-line/ | LA Metro A Line guide: now redirects to the line schedules hub; link and label updated. |
| https://feedam.org/resource/516201 | Superior Grocers (not shown on the map): source was a Stater Bros record; link removed. |
| https://wanderlog.com/place/details/2022095/taqueria-el-poblano-estilo-tijuana-3 | Taqueria El Poblano (not shown on the map): page was the Anaheim branch; link removed. |
| https://wp.sbcounty.gov/dph/programs/clinics/ontario/ | Ontario Health Center (not shown on the map): replaced by the clinic's current county page. |
| https://www.active.com/ontario-ca/classes/beginning-ice-skating-2025-107122821 | Ontario Ice Skating Center (not shown on the map): page redirects elsewhere; link removed. |
| https://www.habitat.org/local/restore?zip=92371 | Habitat ReStore, Montclair (not shown on the map): generic locator; replaced by the Pomona Valley ReStore page. |
| https://www.promptloop.com/directory/pomona-91766-auto-dealerships | Three Holt Avenue car lots (not shown on the map): generic dealer directory; links removed. |
| https://www.restaurantji.com/ca/montclair/japanese/ | Starbelly Asian Kitchen, Montclair (not shown on the map): directory page does not list it; link removed. |

## Still blocked to automated readers

These answered a human browser or are known publisher pages, but neither the script nor the agents could read them. They are kept as cited.

- https://www.foothilltransit.org/transit-center: WebFetch returned empty twice and curl got an Incapsula 'Request unsuccessful' block.
- https://www.homeypetusa.com: Three fetches returned HTTP 429; only the scripted title (online dog crate seller) is known, so it could not be matched to Homey Pet Station.
- https://www.railwayage.com/passenger/intercity/brightline-west-breaks-ground/: Cloudflare challenge in both script and browser; checked for correct form only.
- https://www.starbucks.com/store-locator/store/1015674/holt-ramona-4490-holt-blvd-suite-a-montclair-ca-917634197-us: Two fetches returned an empty page (JS-rendered); a direct curl attempt was denied and not pursued.
- https://www.staterbros.com/stores/108: Cloudflare challenge in both script and browser; checked for correct form only.
- https://www.t-mobile.com/stores/bd/t-mobile-ontario-ca-91762-9704: Two fetches returned HTTP 403 Forbidden.

## Every link

| Link | Used by | Script | Verdict | Note |
|---|---|---|---|---|
| http://fgrr.org/ | fairplex.js: Fairplex Garden Railroad | 200 | OK | Fairplex Garden Railroad site; loads over plain http (WebFetch https upgrade was refused, curl http returned 200 with the expected title). |
| http://www.insidesocal.com/davidallen/2008/06/15/v-is-for-vietnamese/ | businesses.js: Hoa Binh Supermarket | 200 | OK | 'Pomona A to Z: V is for Vietnamese' by David Allen mentions Hoa Binh market. |
| http://www.strumbrewing.com | businesses.js: Strum Brewing | 200 | OK | Home - Strum Brewing, craft brewery in Downtown Ontario. |
| http://www.tierramiacoffee.com/ | businesses.js: Tierra Mia Coffee | 200 | OK | Tierra Mia Coffee Company; plain http loads with expected title, but WebFetch got a certificate mismatch on the https upgrade. |
| https://211la.org/agencies/HxBb3woQQuDrD8LlTb8r2QwIGED43L/pomona-valley-habitat-humanity-restore-montclair | businesses.js: Pomona Valley Habitat for Humanity ReStore | 200 | OK | Pomona Valley Habitat for Humanity ReStore - Montclair, 4737 Holt Blvd. |
| https://abc30.com/logans-candies-candy-shop-canes-ontario/14389335/ | businesses.js: Logan's Candies | 200 | OK | Redirects to video clip 'Art of handmade candy draws crowds at old fashioned shop Logan's Candies'. |
| https://africa.espn.com/cricket/story/_/id/49092013/mlc-2026-faqs-where-whos-including-r-ashwin | pomona.js: Knight Riders Cricket Ground | 200 | OK | ESPN MLC 2026 FAQs mentions the Knight Riders cricket field in Pomona. |
| https://amoca.org/?p=4689 | pomona.js: American Museum of Ceramic Art (AMOCA) | 200 | OK | Redirects to AMOCA History & Mission page. |
| https://cache.marriott.com/content/dam/marriott-renditions/ONTRV/ontrv-exterior-5677-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:* | hotels.js: SpringHill Suites Ontario Airport | 200 | OK | Image shows a SpringHill Suites Marriott building (address 3595). |
| https://cache.marriott.com/content/dam/marriott-renditions/ONTVY/ontvy-exterior-0049-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:* | hotels.js: Residence Inn by Marriott Ontario Airport | 200 | OK | Image shows a Residence Inn by Marriott building (address 2025). |
| https://cache.marriott.com/is/image/marriotts7prod/de-ontde-outdoor-pool-30627:Wide-Hor?wid=1336&fit=constrain | hotels.js: Delta Hotels by Marriott Ontario Airport | 200 | OK | Image shows a hotel outdoor pool; Delta Ontario asset code, no signage visible. |
| https://cache.marriott.com/is/image/marriotts7prod/si-ontoa-lobby-69637:Wide-Hor?wid=1336&fit=constrain | hotels.js: Sheraton Ontario Airport Hotel | 200 | OK | Image shows a hotel lobby with Marriott Bonvoy signage at the desk; Sheraton Ontario asset code. |
| https://carf.org/provider/pomona-community-services-center-404038/ | businesses.js: Catholic Charities Pomona Community Services Center | 200 | OK | CARF listing for Pomona Community Services Center, 1460 E Holt Ave, parent Catholic Charities of Los Angeles. |
| https://carnitasalestilomichoacan.us/ | pomona.js: Carnitas Al Estilo Michoacan | 200 | OK | Carnitas Al Estilo Michoacan site listing Ontario, Moreno Valley and Downtown Pomona branches. |
| https://ceqanet.lci.ca.gov/2022070039 | map.html: (page text); transit.js: Ontario East (Metrolink) | 200 | OK | CEQAnet SCH 2022070039, Tunnel to Ontario International Airport Project (SBCTA). |
| https://comtiresco.com | businesses.js: Comtires | 200 | OK | 301 redirects to comtires.com, Comtires tires/wheels/auto repair at 1113 W Holt Blvd, Ontario (domain redirect; consider updating to https:/ |
| https://content.govdelivery.com/accounts/CAONTARIO/bulletins/41e441e | businesses.js: Bottle Shop; businesses.js: El Balcon Roof Top; businesses.js: Mule Car Smokehouse | 200 | OK | City of Ontario bulletin mentions Mule Car Smokehouse, El Balcon and Bottle Shop in Bank of Italy section. |
| https://content.ontarioca.gov/sites/default/files/2024-05/ONE-PAGER%20CONVENTION%20CENTER%20EXPANSION_0.pdf | hotels.js: Convention Center hotel (planned); map.html: (page text); ontario.js: Ontario Convention Center | 200 | OK | PDF titled 'ONE-PAGER: CONVENTION CENTER EXPANSION' (May 2024) on the City of Ontario content host. |
| https://content.ontarioca.gov/sites/default/files/2024-05/ONE-PAGER%20HOLT%20BLVD.pdf | map.html: (page text); ontario.js: Holt Boulevard corridor (City of Ontario); ontario.js: Ontario Convention Center | 200 | OK | PDF titled 'ONE-PAGER: HOLT BLVD' (May 2024) on the City of Ontario content host. |
| https://content.ontarioca.gov/sites/default/files/2024-05/ONE-PAGER%20HOSPITALITY%20%26%20TOURISM_0.pdf | hotels.js: Convention Center hotel (planned); map.html: (page text) | 200 | OK | PDF titled 'ONE-PAGER: HOSPITALITY & TOURISM' (May 2024) on the City of Ontario content host. |
| https://cosmopomona.com/ | pomona.js: Cosmo Sports + Restobar | 200 | OK | Cosmo Pomona, four-floor restaurant/bar/venue in Downtown Pomona (restobar; page does not use 'Sports' wording). |
| https://cvent.com/venues/-/hotel/hilton-garden-inn-pomona/venue-ac6ddb39-c31f-446f-8a48-f21aca860705 | hotels.js: Hilton Garden Inn Pomona | 200 | OK | Hilton Garden Inn Pomona / Cvent, 2027 Rancho Valley Dr. |
| https://d2kbkoa27fdvtw.cloudfront.net/ontarioca/581e00bd526db055fb35fc373cb683200.pdf | ontario.js: Arts District North (Emporia Street arts blocks) | 200 | OK | City PDF: ordinance for Arts District West PUD (PUD22-001), 125 W Emporia St. |
| https://d2kbkoa27fdvtw.cloudfront.net/ontarioca/fa70daadd939a3ad03186a55e092f3a40.pdf | ontario.js: Arts District North (Emporia Street arts blocks) | 200 | OK | City PDF: ordinance approving PUD21-002 at 413 W Emporia St, created Feb 2024. |
| https://deliciousfreedomusa.com/ | pomona.js: Delicious Freedom USA | 200 | OK | Delicious Freedom USA, ice cream/funnel cake shop with Pomona delivery. |
| https://developers.google.com/maps/documentation/places/web-service/text-search | map.html: (page text) | 200 | OK | Text Search (New) / Places API documentation. |
| https://digital.ihg.com/is/image/ihg/holiday-inn-express-and-suites-ontario-6332985211-2x1 | hotels.js: Holiday Inn Express & Suites Ontario Airport | 200 | OK | Loads as image/jpeg (~784 KB); filename names Holiday Inn Express & Suites Ontario (subject not visually verified). |
| https://digital.ihg.com/is/image/ihg/holiday-inn-ontario-4026469916-2x1 | hotels.js: Holiday Inn Ontario Airport | 200 | OK | Loads as image/jpeg (~783 KB); filename names Holiday Inn Ontario (subject not visually verified). |
| https://downtownontario.org/ | ontario.js: Downtown Ontario Improvement Association (DOIA); ontario.js: Euclid Avenue historic downtown | 200 | OK | Home Page - DOIA, Downtown Ontario Improvement Association. |
| https://downtownontario.org/business-category/culture/ | ontario.js: Emporia Arts District lofts | 200 | OK | DOIA Culture listings include Emporia Arts District - Art Walk. |
| https://downtownontario.org/business-category/restaurants/ | businesses.js: Birrieria Xolos; businesses.js: Gloria's Cocina Mexicana; businesses.js: Mule Car Smokehouse | 200 | OK | DOIA Restaurants lists Gloria's Cocina Mexicana and Birrieria Xolos. |
| https://downtownontario.org/directory/ | businesses.js: Bottle Shop; businesses.js: CASA Pitzer; businesses.js: Carco; businesses.js: Dova Cafe; businesses.js: E | 200 | OK | DOIA business directory (page 1 lists A-B names; the three named businesses are on later pages). |
| https://downtownontario.org/directory/page/11 | businesses.js: Ontario Hispanic Chamber of Commerce | 200 | OK | Directory page 11 lists Ontario Hispanic Chamber of Commerce. |
| https://downtownontario.org/directory/page/15 | businesses.js: United States Post Office, Ontario | 200 | OK | Directory page 15 lists United States Postal Service, 123 W Holt Ave. |
| https://downtownontario.org/directory/page/6 | businesses.js: Fiesta Motors | 200 | OK | Directory page 6 lists Fiesta Motors. |
| https://downtownontario.org/venue/downtown-ontario-arts-district/ | ontario.js: Arts District North (Emporia Street arts blocks) | 200 | OK | Downtown Ontario Arts District venue page, 208 W Emporia St, 3rd Saturdays exhibitions. |
| https://engine.com/hotels/ontario-ca/conference | hotels.js: DoubleTree by Hilton Ontario Airport; hotels.js: Embassy Suites by Hilton Ontario Airport; hotels.js: Holiday | 200 | OK | Engine Conference Hotels in Ontario, CA lists DoubleTree, Embassy Suites and Holiday Inn Express & Suites Ontario Airport. |
| https://fairplex.com/ | map.html: (page text); pomona.js: Fairplex; transit.js: Ontario East (Metrolink) | 200 | OK | Fairplex official homepage, Pomona. |
| https://fairplex.com/aboutus/faqs/ | fairplex.js: Fairplex grounds | 200 | OK | Fairplex Frequently Asked Questions page. |
| https://fairplex.com/aboutus/who-we-are/ | fairplex.js: Fairplex grounds; pomona.js: Fairplex | 200 | OK | Who We Are - Fairplex: about the nonprofit that runs the LA County Fair and grounds. |
| https://fairplex.com/business/accommodations/ | fairplex.js: Fairplex RV Park; fairplex.js: Sheraton Fairplex Suites and Conference Center | 200 | OK | Fairplex Accommodations page covering Sheraton Fairplex suites and the RV Park. |
| https://fairplex.com/business/conference-center/ | fairplex.js: Expo Hall 8 and the Fairplex Conference Center | 200 | OK | Sheraton Fairplex Conference Center page (meeting spaces); Expo Hall 8 not named but it is the conference center page. |
| https://fairplex.com/business/event-planning/ | fairplex.js: Millard Sheets Art Center (Expo Hall 3) | 200 | OK | Event Planning page with Expo Hall floor plan PDFs and campus map links. |
| https://fairplex.com/business/venues/ | fairplex.js: Expo Hall 10; fairplex.js: Expo Hall 4; fairplex.js: Expo Hall 5; fairplex.js: Expo Hall 6; fairplex.js: Ex | 200 | OK | Venues page listing Expo Halls 4-10 and the Sheraton Fairplex Conference Center. |
| https://fairplex.com/dining/mckinleys-grille-at-fairplex/ | fairplex.js: Sheraton Fairplex Suites and Conference Center | 200 | OK | McKinley's Grille at Fairplex restaurant page. |
| https://fairplex.com/fall-in-the-farm/parking-and-entry/ | fairplex.js: Gate 12 (White Avenue, north) | 200 | OK | Fall in the Farm parking and entry page; mentions Gate 12. |
| https://fairplex.com/fldc/farm/ | fairplex.js: The Farm at Fairplex | 200 | OK | The Farm at Fairplex page (FLDC). |
| https://fairplex.com/fldc/msac/ | fairplex.js: Millard Sheets Art Center (Expo Hall 3); pomona.js: Millard Sheets Art Center | 200 | OK | Millard Sheets Art Center page (FLDC). |
| https://fairplex.com/press-release/01-27-24-fairplex-landmark-grandstand-to-undergo-renovations/ | fairplex.js: Fairplex Grandstand | 200 | OK | PDF press release: Fairplex Landmark Grandstand to Undergo Renovations, dated Jan. 27, 2025. |
| https://fairplex.com/press-release/07-01-26-knight-riders-create-history-with-world-class-cricket-ground-in-los-angeles/ | fairplex.js: Knight Riders Cricket Ground, in the former Fairplex Park infield; pomona.js: Knight Riders Cricket Ground | 200 | OK | PDF press release July 1, 2026: Knight Riders Cricket Ground, LA hosts first Major League Cricket match. |
| https://fairplex.com/press-release/3-19-26-lakr-announce-field-at-fairplex/ | fairplex.js: Knight Riders Cricket Ground, in the former Fairplex Park infield | 200 | OK | PDF press release March 19, 2026: LA Knight Riders unveil Cricket Field at Fairplex. |
| https://fairplex.com/stay/fairplex-rv-park/ | fairplex.js: Fairplex RV Park | 200 | OK | Fairplex RV Park & Storage page. |
| https://fairplex.com/wp-content/uploads/2022/10/fairplex-10.pdf | fairplex.js: Expo Hall 10 | 200 | OK | PDF rendered: Fairplex Building 10 (30,800 sq ft) floor plan. |
| https://fairplex.com/wp-content/uploads/2022/10/fairplex-4.pdf | fairplex.js: Expo Hall 4 | 200 | OK | PDF rendered: Fairplex Building 4 (105,500 sq ft) floor plan. |
| https://fairplex.com/wp-content/uploads/2022/10/fairplex-5.pdf | fairplex.js: Expo Hall 5 | 200 | OK | PDF rendered: Fairplex Building 5 (33,600 sq ft) floor plan. |
| https://fairplex.com/wp-content/uploads/2022/10/fairplex-7.pdf | fairplex.js: Expo Hall 7 | 200 | OK | PDF rendered: Fairplex Building 7 (33,600 sq ft) floor plan. |
| https://fairplex.com/wp-content/uploads/2022/10/fairplex-8.pdf | fairplex.js: Expo Hall 8 and the Fairplex Conference Center | 200 | OK | PDF rendered: Fairplex Building 8 (33,600 sq ft) floor plan. |
| https://fairplex.com/wp-content/uploads/2022/10/fairplex-9.pdf | fairplex.js: Expo Hall 9 | 200 | OK | PDF rendered: Fairplex Building 9 (42,120 sq ft) floor plan. |
| https://fairplex.com/wp-content/uploads/2022/10/revised-fairplex-master-grounds-map-with-parking-lot-sections.pdf | fairplex.js: Administration building; fairplex.js: Blue Gate (pedestrian, White Avenue); fairplex.js: Blue Lot (sections | 200 | OK | PDF rendered: Fairplex Grounds With Parking Lot Sections, 2017 Revision. |
| https://fairplex.com/wp-content/uploads/2025/07/ExpoHall6_Floorplan.pdf | fairplex.js: Expo Hall 6 | 200 | OK | PDF rendered: Fairplex Building 6 (33,600 sq ft) floor plan. |
| https://feedam.org/resource/516201 | businesses.js: Superior Grocers | 200 | WRONG | Page is Stater Bros. Markets #108, 646 W Holt Blvd, Ontario, not Superior Grocers; a Superior Grocers #120 at 815 W Holt Blvd appears only i |
| https://galeriayasmin.com/ | pomona.js: Galeria Yasmin | 200 | OK | GALERIA YASMIN artist site; page text says based in Pomona / San Gabriel Valley, CA. |
| https://geocoding.geo.census.gov/geocoder/ | map.html: (page text) | 200 | OK | Census Geocoder page (U.S. Census Bureau address geocoding tool). |
| https://gis.conservation.ca.gov/server/rest/services/Base/Base_BOECities/FeatureServer/0 | map.html: (page text) | 200 | OK | Layer: BOECities, California city boundary polygon feature layer (CA Dept of Conservation). |
| https://gis.conservation.ca.gov/server/rest/services/Base/Base_BOECities/FeatureServer/0/query?where=CITY%20IN%20( | map.html: (page text) | 200 | SKIP | Not a link: a code template or query fragment caught by the URL scan. |
| https://go-cal.org/dining/p/mestiza-coffeehouse-66bb505e5a02e0043e0559cd/ | businesses.js: Mestiza Cakehouse and Cafe | 200 | OK | GOCAL listing is Mestiza Coffeehouse, 200 S Euclid Ave Ontario; name differs from 'Mestiza Cakehouse and Cafe' but same downtown Ontario bus |
| https://go-cal.org/ontario-convention-center/ | ontario.js: Ontario Convention Center | 200 | OK | GOCAL Ontario Convention Center page. |
| https://go-cal.org/ontario-convention-center/event-services/floor-plans/ | ontario.js: Ontario Convention Center | 200 | OK | GOCAL Ontario Convention Center floor plans and space specs. |
| https://go-cal.org/stay-here/ | map.html: (page text) | 200 | OK | GOCAL 'Stay Here' lodging directory. |
| https://go-cal.org/stay-here/p/azure-hotel-suites-trademark-collection-by-wyndham-66bb5a525a02e0043e065f22 | hotels.js: Azure Hotel & Suites Ontario Airport | 200 | OK | GOCAL hotel page: Azure Hotel & Suites, Trademark Collection by Wyndham, Ontario CA. |
| https://go-cal.org/stay-here/p/baymont-by-wyndham-ontario-66bb5a535a02e0043e0664f8 | hotels.js: Baymont by Wyndham Ontario | 200 | OK | GOCAL hotel page: Baymont by Wyndham Ontario, Ontario CA. |
| https://go-cal.org/stay-here/p/best-western-plus-ontario-airport-convention-center-66bb5a525a02e0043e065e92 | hotels.js: Best Western Plus Ontario Airport & Convention Center | 200 | OK | GOCAL hotel page: Best Western Plus Ontario Airport & Convention Center, Ontario CA. |
| https://go-cal.org/stay-here/p/capri-motel-66bb5a525a02e0043e065fb8 | hotels.js: Capri Motel | 200 | OK | GOCAL hotel page: Capri Motel, Ontario CA. |
| https://go-cal.org/stay-here/p/comfort-inn-suites-near-ontario-airport-66bb55695a02e0043e05f26d | hotels.js: Comfort Inn & Suites Near Ontario Airport | 200 | OK | GOCAL hotel page: Comfort Inn & Suites Near Ontario Airport, Ontario CA. |
| https://go-cal.org/stay-here/p/comfort-suites-ontario-airport-convention-center-66bb5a525a02e0043e065ea4 | hotels.js: Comfort Suites Ontario Airport Convention Center | 200 | OK | GOCAL hotel page: Comfort Suites Ontario Airport Convention Center, Ontario CA. |
| https://go-cal.org/stay-here/p/days-inn-by-wyndham-ontario-airport-66bb5a535a02e0043e0664e7 | hotels.js: Days Inn by Wyndham Ontario Airport | 200 | OK | GOCAL hotel page: Days Inn by Wyndham Ontario Airport, Ontario CA. |
| https://go-cal.org/stay-here/p/delta-hotels-ontario-airport-66bb5a525a02e0043e0660f6 | hotels.js: Delta Hotels by Marriott Ontario Airport | 200 | OK | GOCAL hotel page: Delta Hotels Ontario Airport, Ontario CA. |
| https://go-cal.org/stay-here/p/doubletree-by-hilton-hotel-ontario-airport-66bb5a525a02e0043e065e7f | hotels.js: DoubleTree by Hilton Ontario Airport | 200 | OK | GOCAL hotel page: DoubleTree by Hilton Hotel Ontario Airport, Ontario CA. |
| https://go-cal.org/stay-here/p/embassy-suites-by-hilton-ontario-airport-66bb55695a02e0043e05f052 | hotels.js: Embassy Suites by Hilton Ontario Airport | 200 | OK | GOCAL hotel page: Embassy Suites by Hilton Ontario Airport, Ontario CA. |
| https://go-cal.org/stay-here/p/everhome-suites-ontario-6a0b5afbd7c38a83e8d65d5b | hotels.js: Everhome Suites Ontario Airport | 200 | OK | Everhome Suites Ontario Airport, 1820 E G St, Ontario CA. |
| https://go-cal.org/stay-here/p/extended-studio-hotel-ontario-67f5828082a0986ebb21fad6 | hotels.js: Extended Studio Hotel Ontario (TownePlace Suites) | 200 | OK | go-cal page for Extended Studio Hotel Ontario at 1818 E Holt Blvd, listed as open. |
| https://go-cal.org/stay-here/p/hampton-inn-by-hilton-ontario-airport-69c317d45834aea166d0923b | hotels.js: Hampton Inn Ontario Airport | 200 | OK | Hampton Inn by Hilton Ontario Airport, 535 N Turner Ave, Ontario CA. |
| https://go-cal.org/stay-here/p/holiday-inn-express-suites-ontario-airport-by-ihg-66bb55695a02e0043e05eaaa | hotels.js: Holiday Inn Express & Suites Ontario Airport | 200 | OK | Holiday Inn Express & Suites Ontario Airport, 2280 S Haven Ave, Ontario CA. |
| https://go-cal.org/stay-here/p/holiday-inn-ontario-airport-66bb5a535a02e0043e066c96 | hotels.js: Holiday Inn Ontario Airport | 200 | OK | go-cal page for Holiday Inn Ontario Airport, 2155 E Convention Center Way, open. |
| https://go-cal.org/stay-here/p/home2-suites-by-hilton-ontario-airport-69c318755834aea166d093a1 | hotels.js: Home2 Suites by Hilton Ontario Airport | 200 | OK | Home2 Suites by Hilton Ontario Airport, 535 N Turner Ave, Ontario CA. |
| https://go-cal.org/stay-here/p/hotel-dlins-ontario-airport-66bb55695a02e0043e05f03f | hotels.js: Hotel d'Lins Ontario Airport | 200 | OK | go-cal page for Hotel d'Lins Ontario Airport, 3400 Shelby St, open. |
| https://go-cal.org/stay-here/p/hotel-hacienda-at-ontario-ranch-66bb55695a02e0043e05eabc | hotels.js: Hotel Hacienda at Ontario Ranch | 200 | OK | go-cal page for Hotel Hacienda at Ontario Ranch, 2425 S Archibald Ave, open. |
| https://go-cal.org/stay-here/p/hotel-seville---ontario-airportchino-66bb505e5a02e0043e056ef8 | hotels.js: Hotel Seville Ontario Airport/Chino | 200 | OK | Hotel Seville - Ontario Airport/Chino, 2441 S Euclid Ave, Ontario CA. |
| https://go-cal.org/stay-here/p/la-quinta-inn-suites-by-wyndham-ontario-airport-66bb55695a02e0043e05f091 | hotels.js: La Quinta Inn & Suites Ontario Airport | 200 | OK | La Quinta Inn & Suites by Wyndham Ontario Airport, 3555 Inland Empire Blvd, Ontario CA. |
| https://go-cal.org/stay-here/p/mayfair-inn-ontario-airport-66bb505e5a02e0043e0565ba | hotels.js: Mayfair Inn Ontario Airport | 200 | OK | Mayfair Inn Ontario Airport, 1120 E Holt Blvd, Ontario CA. |
| https://go-cal.org/stay-here/p/motel-6-ontario-ca---airport-66bb5a535a02e0043e06651c | hotels.js: Motel 6 Ontario Airport | 200 | OK | go-cal page for Motel 6 Ontario Airport, 1560 E 4th St, open. |
| https://go-cal.org/stay-here/p/motel-6-ontario-ca-convention-center-airport-66bb5a525a02e0043e065efe | hotels.js: Motel 6 Ontario Convention Center-Airport | 200 | OK | Motel 6 Ontario Convention Center-Airport, 231 N Vineyard Ave, Ontario CA. |
| https://go-cal.org/stay-here/p/ontario-airport-hotel-and-conference-center-66bb55695a02e0043e05f02c | hotels.js: Ontario Airport Hotel & Conference Center | 200 | OK | Ontario Airport Hotel and Conference Center, 700 N Haven Ave, Ontario CA. |
| https://go-cal.org/stay-here/p/ontario-airport-inn-66bb5a525a02e0043e065ec8 | hotels.js: Ontario Airport Inn | 200 | OK | Ontario Airport Inn, 1801 E G St, Ontario CA. |
| https://go-cal.org/stay-here/p/quality-inn-ontario-airport-convention-center-66bb5a525a02e0043e065f10 | hotels.js: Quality Inn Ontario Airport Convention Center | 200 | OK | go-cal page for Quality Inn Ontario Airport Convention Center, 514 N Vineyard Ave. |
| https://go-cal.org/stay-here/p/ramada-by-wyndham-ontario-66bb5a525a02e0043e065eec | hotels.js: Ramada by Wyndham Ontario Airport | 200 | OK | Ramada by Wyndham Ontario Airport & Convention Center, 1841 E G St, Ontario CA. |
| https://go-cal.org/stay-here/p/residence-inn-by-marriott-ontario-airport-66bb5a525a02e0043e065eda | hotels.js: Residence Inn by Marriott Ontario Airport | 200 | OK | go-cal page for Residence Inn Ontario Airport, 2025 E Convention Center Way. |
| https://go-cal.org/stay-here/p/sheraton-ontario-airport-hotel-66bb5a525a02e0043e065eb6 | hotels.js: Sheraton Ontario Airport Hotel | 200 | OK | go-cal page for Sheraton Ontario Airport Hotel, 429 N Vineyard Ave. |
| https://go-cal.org/stay-here/p/springhill-suites-by-marriott-ontario-airportrancho-cucamonga-66bb55695a02e0043e05f1fe | hotels.js: SpringHill Suites Ontario Airport | 200 | OK | go-cal page for SpringHill Suites Ontario Airport/Rancho Cucamonga, 3595 E Guasti Rd. |
| https://go-cal.org/stay-here/p/surestay-by-best-western-ontario-airport-66bb55695a02e0043e05f25a | hotels.js: SureStay Hotel by Best Western Ontario Airport | 200 | OK | go-cal page for SureStay by Best Western Ontario Airport, 3201 N Centre Lake Dr. |
| https://gotpupusas.my.canva.site/ | businesses.js: Got Pupusas El Buen Gusto N 2 | 200 | OK | Canva site for Got Pupusas, Salvadoran restaurant at 990 E Holt Ave, Pomona. |
| https://guide.michelin.com/ca/en/california/pomona/restaurant/mariscos-jalisco | businesses.js: Mariscos Jalisco | 200 | OK | Michelin Guide page for Mariscos Jalisco, 753 E Holt Ave, Pomona, no closure. |
| https://hcai.ca.gov/facility/pomona-community-health-center-2/ | businesses.js: Parktree Community Health Center | 200 | OK | HCAI facility page for Parktree Community Health Center, E Holt Ave Pomona, status Open. |
| https://hotelguides.com/california/pomona-ca-hotels.html | hotels.js: Comfort Inn Pomona; hotels.js: Hilton Garden Inn Pomona | 200 | OK | Lists both Hilton Garden Inn Pomona and Comfort Inn Pomona. |
| https://hotels.com/ho129559/days-inn-by-wyndham-ontario-airport-ontario-united-states-of-america | hotels.js: Days Inn by Wyndham Ontario Airport | 429 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://images.oyoroomscdn.com/uploads/hotel_image/293897/motel_6_ontario_ca_exterior_2_1759846186081.jpg | hotels.js: Motel 6 Ontario Airport | 200 | OK | Image shows a Motel 6 building (address 1560) with sign. |
| https://images.oyoroomscdn.com/uploads/hotel_image/294559/motel_6_ontario_ca_exterior_2_1759237357202.jpg | hotels.js: Motel 6 Ontario Convention Center-Airport | 200 | OK | Image shows a Motel 6 motel + studio sign and building. |
| https://instituteoflatinoart.org/ | pomona.js: Institute of Latino Art | 200 | OK | Institute of Latino Art site, 281 S Thomas St Pomona, active with 2026 events. |
| https://la-tia-mexican-restaurant.cafe-inspector.com/ | businesses.js: La Tia Restaurante y Taqueria | 200 | OK | Unofficial listing for La Tia Restaurante y Taqueria, 1175 E Holt Ave Pomona, recent review. |
| https://lacatholics.org/venue/pomona-catholic-high-school/ | businesses.js: Pomona Catholic High School | 200 | OK | LA Catholics venue page for Pomona Catholic High School, 533 W Holt Ave Pomona. |
| https://lamag.com/style/this-candy-shop-has-been-crafting-holiday-sweets-since-1933/ | businesses.js: Logan's Candies | 200 | OK | LAmag article about Logan's Candies (Ontario, since 1933). |
| https://locations.cardenasmarkets.com/ll/us/ca/montclair/5281-holt-blvd/ | businesses.js: Cardenas Markets | 200 | OK | Cardenas Markets Montclair store page, 5281 Holt Blvd, no closure notice. |
| https://locations.cardenasmarkets.com/ll/us/ca/pomona/690-e-holt-blvd/ | businesses.js: Cardenas Markets | 200 | OK | Cardenas Markets Pomona store page, 690 E Holt Blvd, no closure notice. |
| https://locations.carlsjr.com/ca/montclair/5295-holt-blvd | businesses.js: Carl's Jr. | 200 | OK | Carl's Jr. store page, 5295 Holt Blvd Montclair, open. |
| https://locations.jackinthebox.com/us/ca/montclair/4565-holt-blvd | businesses.js: Jack in the Box | 200 | OK | Jack in the Box store page, 4565 Holt Blvd Montclair, open. |
| https://locations.jackinthebox.com/us/ca/pomona/100-e-holt-ave | businesses.js: Jack in the Box | 200 | OK | Jack in the Box store page, 100 E Holt Ave Pomona, open. |
| https://locations.wendys.com/united-states/ca/montclair/5291-holt-blvd,-bldg-3 | businesses.js: Wendy's | 200 | OK | Wendy's store page, 5291 Holt Blvd Montclair, open. |
| https://locations.wendys.com/united-states/ca/ontario/590-e-holt-blvd | businesses.js: Wendy's | 200 | OK | Wendy's store page, 590 E Holt Blvd Ontario, open. |
| https://loganscandies.com/ | businesses.js: Logan's Candies | 200 | OK | Logan's Candies official site, 125 W B St Ontario, active. |
| https://lookup.hotels.com/ho3187729056/mayfair-inn-ontario-united-states-of-america | hotels.js: Mayfair Inn Ontario Airport | 404 | DEAD | Hotels.com returns 404 Page Not Found (confirmed by curl); WebFetch timed out. |
| https://luchadorbarandkitchen.com/ | pomona.js: Luchador Bar + Kitchen | 200 | OK | Luchador Bar & Kitchen, 184 W 3rd St, Pomona. |
| https://luckyfarms.org/discover-why-catalyst-pomona-customer-are-making-the-move-to-lucky-farms/ | businesses.js: Catalyst Cannabis Pomona | 200 | OK | Lucky Farms landing page about Catalyst Pomona dispensary customers. |
| https://mcsmokehouse.com/ | businesses.js: Mule Car Smokehouse | 200 | OK | Mule Car Smokehouse, 200 N Euclid Ave, Ontario (redirects to www; WebFetch got 429, curl 200 and title matched). |
| https://meetingstoday.com/articles/145048/ontario-california-convention-center-expansion | ontario.js: Ontario Convention Center | 200 | OK | Meetings Today article on Ontario convention center expansion, Feb 4, 2025. |
| https://metrolinktrains.com/ | map.html: (page text) | 200 | OK | Metrolink homepage, with stations and lines info. |
| https://metrolinktrains.com/explore/los-angeles-county/garden-railroad | fairplex.js: Fairplex Garden Railroad | 200 | OK | Metrolink Garden Railroad page at Pomona Fairplex. |
| https://metrolinktrains.com/rider-info/general-info/stations/claremont/ | transit.js: Claremont (Metrolink) | 200 | OK | Claremont Train Station / Metrolink. |
| https://metrolinktrains.com/rider-info/general-info/stations/montclair/ | transit.js: Inland Empire Blvd / Porsche Way; transit.js: Montclair Transit Center (Montclair Transcenter) | 200 | OK | Montclair Train Station / Metrolink. |
| https://metrolinktrains.com/rider-info/general-info/stations/pomona---downtown/ | pomona.js: Pomona Transit Center; transit.js: Ontario East (Metrolink); transit.js: Pomona Downtown (Pomona Transit Cent | 200 | OK | Pomona - Downtown Train Station / Metrolink. |
| https://metrolinktrains.com/rider-info/general-info/stations/pomona---north/ | transit.js: Inland Empire Blvd / Porsche Way; transit.js: Ontario East (Metrolink); transit.js: Pomona North (Metrolink  | 200 | OK | Pomona - North Train Station / Metrolink, 205 Santa Fe St. |
| https://metrolinktrains.com/rider-info/general-info/stations/upland/ | transit.js: Upland (Metrolink) | 200 | OK | Upland Train Station / Metrolink. |
| https://metrolinktrains.com/rider-info/pomona-north-connection/ | transit.js: Inland Empire Blvd / Porsche Way; transit.js: Pomona North (Metrolink and Metro A Line) | 200 | OK | Pomona-North Metrolink and Metro A Line connection page. |
| https://metrolinktrains.com/schedules/?type=line&lineName=Riverside+Line | transit.js: Inland Empire Blvd / Porsche Way; transit.js: Ontario East (Metrolink) | 200 | OK | Metrolink schedules page showing Riverside Line timetable. |
| https://montclairplace.com/guest-services/ | pomona.js: Montclair Place | 200 | OK | Montclair Place Guest Services page. |
| https://newsboybooks.wixsite.com/newsboy-books | businesses.js: Newsboy Books | 200 | OK | Newsboy Books, 215 N Euclid Ave, Ontario. |
| https://nhramuseum.org/ | fairplex.js: Wally Parks NHRA Motorsports Museum | 200 | OK | Wally Parks NHRA Motorsports Museum, 1101 W McKinley Ave, Pomona. |
| https://oac.cdlib.org/findaid/ark:/13030/c88g8tkd | fairplex.js: Millard Sheets Art Center (Expo Hall 3) | 406 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://ohp.parks.ca.gov/ListedResources/Detail/N2304 | ontario.js: Euclid Avenue historic downtown | 200 | OK | OHP listing for Euclid Avenue, Upland to Ontario. |
| https://omnitrans.org/50-2/ | map.html: (page text); transit.js: Inland Empire Blvd / Porsche Way | 200 | OK | Omnitrans 50 Years in Motion timeline, mentions sbX Purple Line. |
| https://omnitrans.org/shoponholt/ | businesses.js: Birreria Guadalajara; businesses.js: Dova Cafe; businesses.js: Firewater Bar; businesses.js: Gina's Chick | 200 | OK | Omnitrans Shop on Holt page listing Today Dental Practice and Gina's Chicken and Pizza. |
| https://omnitrans.org/small-tweaks-smoother-trips-january-service-updates/ | transit.js: Inland Empire Blvd / Porsche Way | 200 | OK | Omnitrans Dec 30, 2025 January service updates post. |
| https://ontarioairporthotel.com/ | hotels.js: Ontario Airport Hotel & Conference Center | 403 | OK | Official domain redirects to the property page on hyatt.com, which rendered blank to the automated browser; treated as a working redirect. |
| https://ontarioheritage.org/mule-car-smokehouse/ | businesses.js: Mule Car Smokehouse | 200 | OK | Ontario Heritage page on Mule Car Smokehouse. |
| https://ontariothinksbusiness.com/develop-ontario/district-information/holt-corridor | map.html: (page text); ontario.js: Holt Boulevard corridor (City of Ontario); transit.js: Inland Empire Blvd / Porsche W | 200 | OK | City of Ontario Holt Corridor district page. |
| https://ontariotownsquare.org/ | ontario.js: Ontario Town Square | 200 | OK | Ontario Town Square, 224 N Euclid Ave. |
| https://parktreechc.org/ | businesses.js: Parktree Community Health Center | 200 | OK | ParkTree Community Health Center serving Pomona and Ontario. |
| https://pomona-mercantile1888.square.site/ | pomona.js: Pomona Mercantile 1888 Gallery | 200 | OK | Loads as Home / Pomona Mercantile (page text minimal). |
| https://pomonachamber.org/about/the-pomona-chamber-of-commerce/ | pomona.js: Pomona Chamber of Commerce | 200 | OK | Pomona Chamber of Commerce about page. |
| https://railgiants.org/ | fairplex.js: RailGiants Train Museum | 200 | OK | RailGiants Train Museum at LA County Fairgrounds, Pomona. |
| https://railgiants.org/directions/ | fairplex.js: Gate 1 (McKinley Avenue, main entrance); fairplex.js: RailGiants Train Museum | 200 | OK | RailGiants directions page naming Gate 1 and Gate 17. |
| https://rebusinessonline.com/pomona-shopping-center-sells-for-14m/ | businesses.js: El Super | 200 | OK | 2013 article on Shops at Indian Hill, Pomona, lists El Super as tenant. |
| https://roadtrippers.com/us/ontario-ca/food-drink/vinces-spaghetti | businesses.js: Vince's Spaghetti | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://sasseartmuseum.org/ | pomona.js: Sasse Museum of Art | 200 | OK | Sasse Museum of Art, 300 S Thomas St, Pomona. |
| https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x} | map.html: (page text) | 200 | OK | Tile service returns a JPEG tile for real z/y/x (10/396/177). |
| https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x} | map.html: (page text) | 200 | OK | Tile service returns a PNG tile for real z/y/x. |
| https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x} | map.html: (page text) | 200 | OK | Tile service returns a PNG tile for real z/y/x. |
| https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x} | map.html: (page text) | 200 | OK | Tile service returns a JPEG tile for real z/y/x. |
| https://socalpawn.com/ | businesses.js: So Cal Jewelry & Loan | 200 | OK | So Cal Jewelry & Loan, 124 W Holt Blvd, Ontario. |
| https://takeurseatcafe.com/ | pomona.js: Gud2Go Cafe | 429 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://thederbyroom.com/pomona | fairplex.js: The Derby Room (formerly the Finish Line) | 200 | OK | Pomona at Fairplex / The Derby Room, formerly The Finish Line. |
| https://theglasshouse.us/ | pomona.js: The Glass House Concert Hall | 200 | OK | The Glass House Pomona CA, music venue at 200 W. Second St. |
| https://thekickincrab.com/montclair-ca | businesses.js: The Kickin' Crab | 200 | OK | Montclair, CA location page for The Kickin' Crab. |
| https://thepolypost.com/arts-and-culture/2024/04/23/iconic-music-venues-shine-in-the-arts-colony-of-pomona/ | pomona.js: Fox Theater Pomona; pomona.js: The Glass House Concert Hall | 200 | OK | Poly Post article covers Fox Theater (capacity 2,000) and The Glass House. |
| https://thesae.org/about-us/ | pomona.js: The School of Arts and Enterprise | 200 | OK | About Us - The SAE, charter school in Pomona. |
| https://traviscs.github.io/California-GigaBit-Schools-Draft/ | README.md: (readme) | 200 | OK | California BEAD Plan: Providers and Projects (project's own page). |
| https://traviscs.github.io/Ontario-Hotel-Map/ | README.md: (readme); map.html: (page text) | 200 | OK | Ontario Hotel Map (title confirmed by load check; fetch text was empty). |
| https://untitledartgallerydto.com/ | businesses.js: Untitled Art Gallery | 200 | WRONG | Domain redirects to /lander, a GoDaddy parking page, not the gallery; downtownontario.org still lists this URL. |
| https://wanderlog.com/place/details/2022095/taqueria-el-poblano-estilo-tijuana-3 | businesses.js: Taqueria El Poblano Estilo Tijuana | 200 | WRONG | Page is Taqueria El Poblano Estilo Tijuana #3 at 1210 S State College Blvd, Anaheim (permanently closed), not the Pomona Holt Ave branch. |
| https://widgets.hotels.com/ho110988/motel-6-ontario-ca-convention-center-airport-ontario-united-states-of-america | hotels.js: Motel 6 Ontario Convention Center-Airport | 429 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://wp.sbcounty.gov/dph/programs/clinics/ontario/ | businesses.js: Ontario Health Center (San Bernardino County Public Health) | 200 | WRONG | 301-redirects to the generic Public Health homepage, not the Ontario clinic page. |
| https://www.7-eleven.com/locations/ca/montclair/4500-holt-blvd-22849 | businesses.js: 7-Eleven | 200 | OK | 7-Eleven at 4500 Holt Blvd, Montclair. |
| https://www.aaa.com/tripcanvas/hotel/comfort-inn-near-fairplex-AA135239 | hotels.js: Comfort Inn Pomona | 200 | OK | Comfort Inn Near FairPlex, 1421 S Garey Ave, Pomona. |
| https://www.active.com/ontario-ca/classes/beginning-ice-skating-2025-107122821 | businesses.js: Ontario Ice Skating Center | 200 | WRONG | Redirects to Rancho Cucamonga Community Services organizer page, not the Ontario Ice Skating Center class; no official site found. |
| https://www.amoca.org/ | pomona.js: American Museum of Ceramic Art (AMOCA) | 200 | OK | American Museum of Ceramic Art / AMOCA, Pomona. |
| https://www.arrowheadcu.org/findus | businesses.js: Arrowhead Credit Union | 200 | OK | Arrowhead Credit Union branch locations page. |
| https://www.autozone.com/locations/ca/montclair/5183-holt-blvd.html | businesses.js: AutoZone | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.autozone.com/locations/ca/ontario/570-e-holt-blvd.html | businesses.js: AutoZone | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.bestwestern.com/en_US/book/hotels-in-ontario/best-western-plus-ontario-airport-convention-center/propertyCode.05343.html | hotels.js: Best Western Plus Ontario Airport & Convention Center | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.bestwestern.com/en_US/book/hotels-in-ontario/surestay-by-best-western-ontario-airport/propertyCode.52112.html | hotels.js: SureStay Hotel by Best Western Ontario Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.bppe.ca.gov/webapplications/annualReports/2018/details/3600371 | businesses.js: Rosston School of Hair Design | 200 | OK | Rosston School of Hair Design 2018 Annual Report, Ontario CA. |
| https://www.brightlinewest.com/about-us/faq | map.html: (page text); transit.js: Ontario East (Metrolink) | 200 | OK | FAQ / Brightline West; station next to Metrolink in Rancho Cucamonga. |
| https://www.brightlinewest.com/overview/project | map.html: (page text); transit.js: Ontario East (Metrolink) | 200 | OK | Project Overview / Brightline West. |
| https://www.ca.kayak.com/Claremont-Hotels-Knights-Inn-Claremont.60877.ksp | hotels.js: Residence Inn by Marriott Claremont | 200 | OK | Kayak page for Residence Inn by Marriott Claremont, 721 S Indian Hill Blvd (URL slug says Knights Inn but content is the Residence Inn). |
| https://www.cananicoffee.com/ | pomona.js: Canani Coffee | 200 | OK | Square Online site titled Canani Coffee Corp with menu; raw HTML read (WebFetch returned empty). |
| https://www.chaffeymuseum.org/ | ontario.js: Chaffey Community Museum of Art | 200 | OK | Chaffey Community Museum of Art site. |
| https://www.chickncow.com/ | pomona.js: Hen & Heifer | 200 | OK | Hen & Heifer Pomona, 296 W. 2nd St. |
| https://www.choicehotels.com/california/ontario/comfort-inn-hotels/cag03 | hotels.js: Comfort Inn & Suites Near Ontario Airport | 000 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.choicehotels.com/california/ontario/comfort-suites-hotels/caa15 | hotels.js: Comfort Suites Ontario Airport Convention Center | 000 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.choicehotels.com/california/ontario/everhome-suites-hotels/caj38 | hotels.js: Everhome Suites Ontario Airport | 000 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.choicehotels.com/california/ontario/quality-inn-hotels/ca653 | hotels.js: Quality Inn Ontario Airport Convention Center | 000 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.cityofmontclair.org/local-transportation | transit.js: Montclair Transit Center (Montclair Transcenter) | 200 | OK | Local Transportation - Montclair, CA (city transportation page). |
| https://www.cpp.edu/news/content/2009/11/cal_poly_pomona_ends_daily_operations_at_downtown_center/index.shtml | pomona.js: The School of Arts and Enterprise | 200 | OK | Cal Poly Pomona Ends Daily Operations at Downtown Center (2009), mentions SAE. |
| https://www.cvent.com/venues/pomona/hotel/hilton-garden-inn-pomona/venue-ac6ddb39-c31f-446f-8a48-f21aca860705 | hotels.js: Hilton Garden Inn Pomona | 200 | OK | Hilton Garden Inn Pomona venue listing on Cvent. |
| https://www.cvs.com/store-locator/montclair-ca-pharmacies/4535-holt-blvd-montclair-ca-91763/storeid=9745 | businesses.js: CVS Pharmacy | 200 | OK | CVS Pharmacy at 4535 Holt Blvd, Montclair. |
| https://www.dacenter.org/ | pomona.js: The dA Center for the Arts | 200 | OK | dA Center for the Arts, Pomona. |
| https://www.dacenter.org/our-history | pomona.js: The dA Center for the Arts | 200 | OK | Our History page of dA Center for the Arts. |
| https://www.downtownpomona.org/ | map.html: (page text); pomona.js: Pomona Arts Colony (Downtown Pomona District) | 200 | OK | Downtown Pomona District / Arts Colony homepage. |
| https://www.downtownpomona.org/aboutus | pomona.js: Pomona Arts Colony (Downtown Pomona District) | 200 | OK | About Us for Downtown Pomona Owners Association (Downtown Pomona District). |
| https://www.downtownpomona.org/artwalk | pomona.js: Pomona Arts Colony (Downtown Pomona District) | 200 | OK | Downtown Pomona ArtWalk page. |
| https://www.downtownpomona.org/eat-drink | pomona.js: Bar Homage (Homage Brewing); pomona.js: Canani Coffee; pomona.js: Carnitas Al Estilo Michoacan; pomona.js: Co | 200 | OK | EAT & DRINK / Downtown Pomona; lists Bar Homage, The Rookery Alehouse and Hen & Heifer with addresses. |
| https://www.downtownpomona.org/entertainment | pomona.js: Bazaar Lounge; pomona.js: Characters Sports Bar; pomona.js: Flyway at the Fox; pomona.js: The Cathedral; pomo | 200 | OK | ENTERTAINMENT / Downtown Pomona directory; lists The Paradox Arcade + Bar and Flyway (345 S Garey Ave); Vlounge not listed by name. |
| https://www.downtownpomona.org/galleries-museums | pomona.js: Galeria Yasmin; pomona.js: Institute of Latino Art; pomona.js: Overspray Art Supply & Gallery; pomona.js: Pom | 200 | OK | GALLERIES & MUSEUMS / Downtown Pomona; lists Institute of Latino Art and The Alley Gallery; Pomona Arts Colony not listed by name. |
| https://www.downtownpomona.org/metro-art-gallery | pomona.js: Metro Art Gallery | 200 | OK | Metro Art Gallery / Downtown Pomona; describes the gallery at the DPOA offices on W 2nd St. |
| https://www.emporiaartsdistrict.com/ | ontario.js: Arts District North (Emporia Street arts blocks); ontario.js: Emporia Arts District lofts | 200 | OK | Emporia Arts District, Ontario CA; live-work art lofts and Ontario Art Walk in historic downtown Ontario. |
| https://www.euclidloanandjewelry.com/ | businesses.js: Euclid Loan & Jewelry | 200 | OK | Euclid Loan & Jewelry, 108 S Euclid Ave, Ontario CA 91762; buy, sell and loans. |
| https://www.expressinnontario.com/ | hotels.js: Express Inn & Suites Ontario | 200 | WRONG | Domain redirects to /lander, a GoDaddy parking page, not a hotel site; no official site found in search (hotel listed at 1150 N Grove Ave). |
| https://www.flyontario.com/ | ontario.js: Ontario International Airport (ONT) | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.flyontario.com/at-airport/terminal-maps | ontario.js: ONT Terminal 2; ontario.js: ONT Terminal 4; ontario.js: Ontario International Airport (ONT) | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.flyontario.com/parking-transports/hotel-shuttles | map.html: (page text) | 403 | OK | Browser: redirects to the renamed shuttles page; link updated to the new address. |
| https://www.flyontario.com/press/surge-international-travel-propelled-ontario-international-airport-record-year-2025 | ontario.js: Ontario International Airport (ONT) | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.flyontario.com/to-from-airport/airport-directions | ontario.js: ONT Terminal 2; ontario.js: ONT Terminal 4; ontario.js: Ontario International Airport (ONT) | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.flyontario.com/to-from-airport/parking-transport/rental-cars | ontario.js: ONT Terminal 4 | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.flywayatfox.com/ | pomona.js: Flyway at the Fox | 200 | OK | Flyway Bar + Nightclub, 345 S Garey Ave, Pomona (Fox Rooftops brand). |
| https://www.foothilltransit.org/transit-center | pomona.js: Pomona Transit Center; transit.js: Ontario East (Metrolink); transit.js: Pomona Downtown (Pomona Transit Cent | 200 | BLOCKED | WebFetch returned empty twice and curl got an Incapsula 'Request unsuccessful' block. |
| https://www.foxpomona.com/ | pomona.js: Fox Theater Pomona | 200 | OK | Homepage of Fox Theater Pomona, 301 S Garey Ave. |
| https://www.foxpomona.com/venue-info | pomona.js: Fox Theater Pomona | 200 | OK | Venue Info page for Fox Theater Pomona. |
| https://www.gayot.com/restaurants/photos/vinces-spaghetti-ontario-ca-91762_2la051003.html | businesses.js: Vince's Spaghetti | 200 | OK | Gayot photo page for Vince's Spaghetti, Ontario; no closure noted. |
| https://www.gocalevents.org/p/christmas-on-euclid | ontario.js: Euclid Avenue historic downtown | 200 | OK | Christmas on Euclid event page, Euclid Avenue / Town Square, Ontario. |
| https://www.google.com/travel/hotels?q=${encodeURIComponent(h.n+ | map.html: (page text) | 000 | SKIP | Not a link: a code template or query fragment caught by the URL scan. |
| https://www.gorgansons.com/ | pomona.js: Gorgansons | 200 | OK | WebFetch returned empty (Square Online JS site); page source embeds Gorganson's, 224 E 2nd St, Pomona CA 91766. |
| https://www.gosbcta.com/project/rancho-cucamonga-to-pomona-north-rail-connector-project/ | map.html: (page text); transit.js: Ontario East (Metrolink) | 200 | OK | SBCTA Enhanced Metrolink Rail Service project for the Rancho Cucamonga to Pomona-North segment; does not name Ontario East station specifica |
| https://www.gosbcta.com/project/west-valley-connector-brt/ | map.html: (page text); transit.js: Inland Empire Blvd / Porsche Way | 200 | OK | SBCTA West Valley Connector BRT page covering Holt Blvd in Ontario; does not name Inland Empire Blvd stops. |
| https://www.gosbcta.com/wp-content/uploads/2026/10/West-Valley-Connector-FS_100726.pdf | pomona.js: Pomona Transit Center; transit.js: Holt Ave / Clark Ave; transit.js: Holt Ave / Garey Ave; transit.js: Holt A | 200 | OK | Oct 2026 WVC fact sheet PDF lists Pomona RTC, Holt Ave/Blvd stops, ONT, and Inland Empire stops (text extracted locally); no 'Ontario East'  |
| https://www.greatamericanstations.com/stations/POS | pomona.js: Pomona Transit Center; transit.js: Pomona Downtown (Pomona Transit Center) | 200 | OK | Redirects to Pomona, CA (POS) Amtrak station page, 100 W Commercial St. |
| https://www.guidestar.org/profile/95-3985286 | businesses.js: Vietnamese Community of Pomona Valley | 200 | OK | GuideStar profile for Vietnamese Community of Pomona Valley, 1182 E Holt Ave, Pomona. |
| https://www.habitat.org/local/restore?zip=92371 | businesses.js: Pomona Valley Habitat for Humanity ReStore | 200 | WRONG | Generic ReStore search-results page (zip 92371) listing many stores; Pomona Valley ReStore (4737 Holt Blvd, Montclair) is only one entry. |
| https://www.hilton.com/en/hotels/ontapes-embassy-suites-ontario-airport/ | hotels.js: Embassy Suites by Hilton Ontario Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.hilton.com/en/hotels/onthehx-hampton-ontario-airport/ | hotels.js: Hampton Inn Ontario Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.hilton.com/en/hotels/onto-dt-doubletree-ontario-airport/ | hotels.js: DoubleTree by Hilton Ontario Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.hilton.com/en/hotels/ontooht-home2-suites-ontario-airport/ | hotels.js: Home2 Suites by Hilton Ontario Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.hilton.com/im/en/MultiHotel/376135/onto-dt-courtyard-view.jpg?impolicy=crop&cw=2265&ch=1268&gravity=NorthWest&xposition=0&yposition=115&rw=768&rh=430 | hotels.js: DoubleTree by Hilton Ontario Airport | 200 | OK | Loads as a JPEG of a courtyard pool with mountains; path code 'onto-dt' fits DoubleTree Ontario (property not visually verifiable). |
| https://www.hilton.com/im/en/ONTAPES/3826768/ontario-exterior.jpg?impolicy=crop&cw=3264&ch=1827&gravity=NorthWest&xposition=0&yposition=310&rw=768&rh=430 | hotels.js: Embassy Suites by Hilton Ontario Airport | 200 | OK | JPEG shows an Embassy Suites-signed building exterior. |
| https://www.hilton.com/im/en/ONTHEHX/27378172/10-print-hampton-4.jpg?impolicy=crop&cw=5000&ch=2799&gravity=NorthWest&xposition=0&yposition=266&rw=768&rh=430 | hotels.js: Home2 Suites by Hilton Ontario Airport | 200 | OK | JPEG of the dual-brand Hampton Inn / Home2 Suites building entrance (shared building; file named 'hampton'). |
| https://www.hilton.com/im/en/ONTHEHX/27378175/8-print-hampton-2.jpg?impolicy=crop&cw=5000&ch=2799&gravity=NorthWest&xposition=0&yposition=266&rw=768&rh=430 | hotels.js: Hampton Inn Ontario Airport | 200 | OK | JPEG of the same dual-brand Hampton Inn / Home2 building entrance, shown unsigned. |
| https://www.homagebrewing.com/ | pomona.js: Bar Homage (Homage Brewing) | 200 | OK | Homage Brewing site; its locations page lists Bar Homage at 281 S Thomas St, Pomona. |
| https://www.homeypetusa.com | businesses.js: Homey Pet Station | 200 | BLOCKED | Three fetches returned HTTP 429; only the scripted title (online dog crate seller) is known, so it could not be matched to Homey Pet Station |
| https://www.hoteldlinsontarioairport.com/ | hotels.js: Hotel d'Lins Ontario Airport | 000 | WRONG | HTTPS certificate is issued to another domain and expired June 2025, so browsers warn; plain HTTP serves the hotel site. Link changed to htt |
| https://www.hotelhaciendaontario.com/ | hotels.js: Hotel Hacienda at Ontario Ranch | 200 | OK | Hotel Hacienda at Ontario Ranch, 2425 S Archibald Ave, Ontario. |
| https://www.hotelhaciendaontario.com/site/assets/files/10657/best_hotel_ontario_ca.1200x0.jpg | hotels.js: Hotel Hacienda at Ontario Ranch | 200 | OK | JPEG of a two-story motel-style hotel exterior on the hotel's own site. |
| https://www.hotelplanner.com/Hotels/135046/Reservations-Motel-6-Pomona-Ca-Los-Angeles-Pomona-2470-Soth-Garey-Ave-91766?gencall=1 | hotels.js: Motel 6 Pomona | 200 | OK | HotelPlanner page for Motel 6 Pomona, 2470 S Garey Ave, no closure notice. |
| https://www.hotelplanner.com/Hotels/44918-NEAR-LA-County-Fairplex | hotels.js: Motel 6 Claremont; hotels.js: Residence Inn by Marriott Claremont | 200 | OK | Hotels near LA County Fairplex list includes Motel 6 Claremont and Residence Inn Claremont. |
| https://www.hotelplanner.com/Hotels/53154-in-Montclair-CA.html | hotels.js: Ontario Inn & Suites (Montclair) | 200 | OK | Montclair hotel list page; fetched text was truncated and did not show Ontario Inn & Suites, but a search snippet shows this page lists it ( |
| https://www.hotelplanner.com/Hotels/8478-in-Pomona-CA | hotels.js: Motel 6 Pomona; hotels.js: Passport Inn Pomona | 200 | OK | Pomona hotel list page; fetched text mentions Motel 6 Pomona but not Passport Inn (page truncated; a search snippet places Passport Inn on H |
| https://www.hotelplanner.com/Hotels/9523/Reservations-Motel-6-Claremont-Claremont-840-South-Indian-Hill-Blvd-91711 | hotels.js: Motel 6 Claremont | 200 | OK | HotelPlanner page for Motel 6 Claremont, 840 S Indian Hill Blvd, no closure notice. |
| https://www.hotels.com/ho115749/doubletree-by-hilton-ontario-airport-ontario-united-states-of-america/ | hotels.js: DoubleTree by Hilton Ontario Airport | 429 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.hotels.com/ho201807/hotel-seville-ontario-united-states-of-america/ | hotels.js: Hotel Seville Ontario Airport/Chino | 429 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.hotels.com/ho3901283936/ | hotels.js: Home2 Suites by Hilton Ontario Airport | 429 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.hotels.com/ho3920895008/ | hotels.js: Hampton Inn Ontario Airport | 429 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.hotelsevilleontario.com/ | hotels.js: Hotel Seville Ontario Airport/Chino | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.hotelsevilleontario.com/gallery-images/properties/1/1/3/Rm_225-Final-2.jpg | hotels.js: Hotel Seville Ontario Airport/Chino | 200 | OK | Loads as a 1.5MB JPEG on the Hotel Seville site (room image); content not visually verified. |
| https://www.ihg.com/holidayinn/hotels/us/en/ontario/ontha/hoteldetail | hotels.js: Holiday Inn Ontario Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.ihg.com/holidayinnexpress/hotels/us/en/ontario/ontex/hoteldetail | hotels.js: Holiday Inn Express & Suites Ontario Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.instagram.com/bazaar_la | pomona.js: Bazaar Lounge | 200 | OK | Instagram @bazaar_la, nightlife/patio venue with flyer address 135 E 2nd St Pomona; name 'Bazaar Lounge' not stated. |
| https://www.instagram.com/bottleshophifi/ | businesses.js: Bottle Shop | 200 | OK | Instagram @bottleshophifi, bio '200 N Euclid, Ontario CA' (bio also says 'Closed', likely a status/hours note). |
| https://www.instagram.com/characterspomonaofficial | pomona.js: Characters Sports Bar | 200 | OK | Instagram Characters Sports Bar Pomona, 276 E 1st St, open 7 days. |
| https://www.instagram.com/dovacafe/ | businesses.js: Dova Cafe | 200 | OK | Instagram Dova Cafe, 108 W Holt Blvd, Ontario. |
| https://www.instagram.com/elbalconrooftop/ | businesses.js: El Balcon Roof Top | 200 | OK | Instagram El Balcon Rooftop, 200 N Euclid Ave, Ontario. |
| https://www.instagram.com/fuego_pomona | pomona.js: Fuego Cocina and Cantina | 200 | OK | Instagram 'Fuego Night Club' at 205 E 2nd St Pomona, same address a listing gives for Fuego Cocina; name differs slightly. |
| https://www.instagram.com/thirstygirlcoffee | pomona.js: Thirsty Girl Coffee | 200 | OK | Instagram Thirsty Girl Coffee, 170 E First St Pomona. |
| https://www.jerkedoutjerky.com/ | businesses.js: Jerked Out Jerky | 200 | OK | Jerked Out Jerky LLC site, lists 1600 E Holt Ave Pomona and 110 W Holt Blvd Ontario; footer (c) 2023. |
| https://www.kayak.com/Ontario-Hotels-Americas-Best-Value-Inn-Suites-Ontario.45159.ksp | hotels.js: Hotel Hacienda at Ontario Ranch | 200 | OK | Kayak page titled Hotel Hacienda at Ontario Ranch, 2425 S Archibald, Ontario. |
| https://www.kayak.com/Ontario-Hotels-Azure-Hotel-Suites-Trademark-Collection-by-Wyndham.37895.ksp | hotels.js: Azure Hotel & Suites Ontario Airport | 200 | OK | Kayak page for Azure Hotel & Suites, 1945 E Holt Blvd, Ontario. |
| https://www.kayak.com/Ontario-Hotels-Baymont-by-Wyndham-Ontario.6017093.ksp | hotels.js: Baymont by Wyndham Ontario | 200 | OK | Kayak page for Baymont by Wyndham Ontario, 1655 E 4th St. |
| https://www.kayak.com/Ontario-Hotels-Best-Western-Plus-Ontario-Airport-Convention-Center.4639029.ksp | hotels.js: Best Western Plus Ontario Airport & Convention Center | 200 | OK | Kayak page for Best Western Plus Ontario Airport & Convention Center. |
| https://www.kayak.com/Ontario-Hotels-Capri-Inn.2071813.ksp | hotels.js: Capri Motel | 200 | OK | Kayak page for Capri Inn, 1217 E Holt Blvd, Ontario. |
| https://www.kayak.com/Ontario-Hotels-Comfort-Inn-and-Suites-Near-Ontario-Airport.190997.ksp | hotels.js: Comfort Inn & Suites Near Ontario Airport | 200 | OK | Kayak page for Comfort Inn and Suites Near Ontario Airport, 3333 Shelby St. |
| https://www.kayak.com/Ontario-Hotels-Comfort-Suites-Ontario-Convention-Center.207812.ksp | hotels.js: Comfort Suites Ontario Airport Convention Center | 200 | OK | Kayak page for Comfort Suites Ontario Airport Convention Center, 1811 E Holt Blvd. |
| https://www.kayak.com/Ontario-Hotels-Days-Inn-by-Wyndham-Ontario-Airport.15723.ksp | hotels.js: Days Inn by Wyndham Ontario Airport | 200 | OK | Kayak page for Days Inn by Wyndham Ontario Airport; notes remodeling. |
| https://www.kayak.com/Ontario-Hotels-DoubleTree-by-Hilton-Ontario-Airport.17480.ksp | hotels.js: DoubleTree by Hilton Ontario Airport | 200 | OK | Kayak page for DoubleTree by Hilton Ontario Airport, 222 N Vineyard Ave. |
| https://www.kayak.com/Ontario-Hotels-Embassy-Suites-by-Hilton-Ontario-Airport.366804.ksp | hotels.js: Embassy Suites by Hilton Ontario Airport | 200 | OK | Kayak page for Embassy Suites by Hilton Ontario Airport. |
| https://www.kayak.com/Ontario-Hotels-Everhome-Suites-Ontario-Airport.1071801000.ksp | hotels.js: Everhome Suites Ontario Airport | 200 | OK | Kayak page for Everhome Suites Ontario Airport, 1820 E G St. |
| https://www.kayak.com/Ontario-Hotels-Extended-Studio-Hotel-Ontario.1073012644.ksp | hotels.js: Extended Studio Hotel Ontario (TownePlace Suites) | 200 | OK | Kayak page for Extended Studio Hotel Ontario, 1818 E Holt Blvd. |
| https://www.kayak.com/Ontario-Hotels-Holiday-Inn-Express-Suites-Ontario-Airport.185371.ksp | hotels.js: Holiday Inn Express & Suites Ontario Airport | 200 | OK | Kayak page for Holiday Inn Express & Suites Ontario Airport, 2280 S Haven Ave. |
| https://www.kayak.com/Ontario-Hotels-Holiday-Inn-Ontario-Airport.177397.ksp | hotels.js: Holiday Inn Ontario Airport | 200 | OK | Kayak page for Holiday Inn Ontario Airport, 2155 E Convention Center Way. |
| https://www.kayak.com/Ontario-Hotels-Hotel-Seville.24523.ksp | hotels.js: Hotel Seville Ontario Airport/Chino | 200 | OK | Kayak page for Hotel Seville - Ontario Airport/Chino, 2441 S Euclid Ave. |
| https://www.kayak.com/Ontario-Hotels-Hotel-dLins-Ontario-Airport.3840919.ksp | hotels.js: Hotel d'Lins Ontario Airport | 200 | OK | Kayak page for Hotel d'Lins Ontario Airport, 3400 Shelby St. |
| https://www.kayak.com/Ontario-Hotels-La-Quinta-Inn-Suites-by-Wyndham-Ontario-Airport.34665.ksp | hotels.js: La Quinta Inn & Suites Ontario Airport | 200 | OK | Kayak page for La Quinta Inn & Suites Ontario Airport, 3555 Inland Empire Blvd. |
| https://www.kayak.com/Ontario-Hotels-Mayfair-Inn-Ontario-Airport.17019.ksp | hotels.js: Mayfair Inn Ontario Airport | 200 | OK | Kayak page for Mayfair Inn Ontario Airport, 1120 E Holt Blvd. |
| https://www.kayak.com/Ontario-Hotels-Motel-6-Ontario-Airport.151071.ksp | hotels.js: Motel 6 Ontario Airport | 200 | OK | Kayak page for Motel 6 Ontario Airport, 1560 E 4th St. |
| https://www.kayak.com/Ontario-Hotels-Motel-6-Ontario-Ca-Convention-Center-Airport.1070819952.ksp | hotels.js: Motel 6 Ontario Convention Center-Airport | 200 | OK | Kayak page for Motel 6 Ontario Ca Convention Center-Airport, 231 N Vineyard Ave. |
| https://www.kayak.com/Ontario-Hotels-Ontario-Airport-Hotel-Conference-Center.7981816.ksp | hotels.js: Ontario Airport Hotel & Conference Center | 200 | OK | Kayak page for Ontario Airport Hotel & Conference Center, 700 N Haven Ave. |
| https://www.kayak.com/Ontario-Hotels-Ontario-Airport-Inn.17126.ksp | hotels.js: Ontario Airport Inn | 200 | OK | Kayak page for Ontario Airport Inn, 1801 E G St. |
| https://www.kayak.com/Ontario-Hotels-Ontario-Gateway-Hotel.367060.ksp | hotels.js: Delta Hotels by Marriott Ontario Airport | 200 | OK | Kayak page for Delta Hotels by Marriott Ontario Airport, 2200 E Holt Blvd (old Gateway slug redirects). |
| https://www.kayak.com/Ontario-Hotels-Quality-Inn-Ontario-Airport-Convention-Center.15624.ksp | hotels.js: Quality Inn Ontario Airport Convention Center | 200 | OK | Kayak page for Quality Inn Ontario Airport Convention Center. |
| https://www.kayak.com/Ontario-Hotels-Ramada-by-Wyndham-Ontario.36911.ksp | hotels.js: Ramada by Wyndham Ontario Airport | 200 | OK | Kayak page for Ramada by Wyndham Ontario, 1841 E G St. |
| https://www.kayak.com/Ontario-Hotels-Residence-Inn-by-Marriott-Ontario-Airport.8176.ksp | hotels.js: Residence Inn by Marriott Ontario Airport | 200 | OK | Kayak page for Residence Inn by Marriott Ontario Airport. |
| https://www.kayak.com/Ontario-Hotels-Sheraton-Ontario-Airport-Hotel.35032.ksp | hotels.js: Sheraton Ontario Airport Hotel | 200 | OK | Kayak page for Sheraton Ontario Airport Hotel, 429 N Vineyard Ave. |
| https://www.kayak.com/Ontario-Hotels-SpringHill-Suites-by-Marriott-Ontario-Airport-Rancho-Cucamonga.3781580.ksp | hotels.js: SpringHill Suites Ontario Airport | 200 | OK | Kayak page for SpringHill Suites Ontario Airport/Rancho Cucamonga. |
| https://www.kayak.com/Ontario-Hotels-SureStay-Hotel-by-Best-Western-Ontario-Airport.1070292083.ksp | hotels.js: SureStay Hotel by Best Western Ontario Airport | 200 | OK | Kayak page for SureStay by Best Western Ontario Airport. |
| https://www.kayak.com/Ontario-Hotels-Travelodge-by-Wyndham-Ontario.175461.ksp | hotels.js: Express Inn & Suites Ontario | 200 | OK | Kayak page titled Express Inn & Suites, 1150 N Grove Ave (URL slug says Travelodge but content is Express Inn & Suites). |
| https://www.laconservancy.org/locations/fox-theatre-pomona/ | pomona.js: Fox Theater Pomona | 200 | OK | Redirects to LA Conservancy Fox Theatre Pomona page (301 S Garey Ave). |
| https://www.lacountyfair.com/ | pomona.js: Fairplex | 200 | OK | LA County Fair official site, May 6-31, 2027, 1101 W McKinley Ave Pomona (Fairplex). |
| https://www.lacountyfair.com/attractions/ | fairplex.js: Blue Gate (pedestrian, White Avenue); fairplex.js: Fairplex Garden Railroad; fairplex.js: Plaza de las Amer | 200 | OK | LA County Fair attractions page listing Fairplex Garden Railroad and Plaza de las Americas Plaza Stage. |
| https://www.lakriders.us/news/la-knight-riders-unveil-the-knight-riders-cricket-field-at-fairplex-in-pomona-ca | pomona.js: Knight Riders Cricket Ground | 200 | OK | LAKR article announcing Knight Riders Cricket Field at Fairplex (March 19, 2026). |
| https://www.lakriders.us/news/lakr | pomona.js: Knight Riders Cricket Ground | 200 | OK | LAKR article on groundbreaking of Knight Riders Cricket Ground, dateline April 22, 2026. |
| https://www.landtekgroup.com/2026/07/06/landtek-group-completes-construction-of-knight-riders-cricket-ground-at-the-fairplex-in-pomona-la/ | fairplex.js: Knight Riders Cricket Ground, in the former Fairplex Park infield | 200 | OK | LandTek article on completing construction of Knight Riders Cricket Ground at Fairplex. |
| https://www.mapquest.com/us/california/el-angel-meat-market-402348035 | businesses.js: El Angel Meat Market | 200 | OK | WebFetch returned empty (JS page); scripted check title matched: El Angel Meat Market, 5002 Holt Blvd, Montclair. |
| https://www.mapquest.com/us/california/got-pupusas-el-buen-gusto-n-2-378419386 | businesses.js: Got Pupusas El Buen Gusto N 2 | 200 | OK | WebFetch returned empty (JS page); scripted check title matched: Got Pupusas El Buen Gusto N 2, 990 E Holt Ave, Pomona. |
| https://www.mapquest.com/us/california/mamas-pupusas-428928413 | businesses.js: Mamas Pupusas | 200 | OK | WebFetch returned empty (JS page); scripted check title matched: Mamas Pupusas, 1038 E Holt Ave, Pomona. |
| https://www.marriott.com/en-us/hotels/ontcl-residence-inn-claremont/overview | hotels.js: Residence Inn by Marriott Claremont | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.marriott.com/en-us/hotels/ontct-towneplace-suites-ontario-convention-center/overview/ | hotels.js: Extended Studio Hotel Ontario (TownePlace Suites) | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.marriott.com/en-us/hotels/ontde-delta-hotels-ontario-airport/overview/ | hotels.js: Delta Hotels by Marriott Ontario Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.marriott.com/en-us/hotels/ontoa-sheraton-ontario-airport-hotel/overview/ | hotels.js: Sheraton Ontario Airport Hotel | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.marriott.com/en-us/hotels/ontrv-springhill-suites-ontario-airport-rancho-cucamonga/overview/ | hotels.js: SpringHill Suites Ontario Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.marriott.com/en-us/hotels/ontsi-sheraton-fairplex-suites-and-conference-center/overview/ | hotels.js: Sheraton Fairplex Suites & Conference Center | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.marriott.com/en-us/hotels/ontvy-residence-inn-ontario-airport/overview/ | hotels.js: Residence Inn by Marriott Ontario Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.mcdonalds.com/us/en-us/location/28717.html | businesses.js: McDonald's | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.meetings-conventions.com/Meeting-Event-Venues/Claremont-CA/Convention-Hotel/Residence-Inn-Claremont-p60984804 | hotels.js: Residence Inn by Marriott Claremont | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.meetings-conventions.com/Meeting-Event-Venues/Pomona-CA/Convention-Hotel/Sheraton-Fairplex-Hotel-Conference-Ctr-p51087111 | hotels.js: Sheraton Fairplex Suites & Conference Center | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.metro.net/about/media-relations/possibility-travels-with-you-metro-a-line-extension-between-azusa-pomona-officially-opens-providing-more-connections-from-san-gabriel-valley-to-destinations-throughout-la-county/ | transit.js: Inland Empire Blvd / Porsche Way; transit.js: Ontario East (Metrolink); transit.js: Pomona North (Metrolink  | 200 | OK | Metro press release (Sept 30, 2025) on A Line extension Azusa to Pomona opening. |
| https://www.metro.net/riding/guide/a-line/ | map.html: (page text); transit.js: La Verne / Fairplex (Metro A Line) | 200 | WRONG | Redirects to generic Line Schedules and Maps hub; A Line only one entry, no dedicated A Line page found (A Line entry links to timetable PDF |
| https://www.metro.net/riding/parking/lotsbyline/ | transit.js: Pomona North (Metrolink and Metro A Line) | 200 | OK | Metro Parking Lots by Line page lists Pomona North (A Line), 207 Santa Fe St. |
| https://www.metrolinktrains.com/rider-info/general-info/stations/ontario---east/ | transit.js: Inland Empire Blvd / Porsche Way; transit.js: Ontario East (Metrolink) | 200 | OK | Metrolink Ontario - East station page, 3330 E Francis St. |
| https://www.metrolinktrains.com/rider-info/general-info/stations/rancho-cucamonga/ | transit.js: Ontario East (Metrolink) | 200 | OK | Metrolink Rancho Cucamonga station page, 11208 Azusa Ct. |
| https://www.micafecitocoffee.com/ | pomona.js: Mi Cafecito Coffee | 200 | OK | Square Online site titled Mi Cafecito Coffee (fetch empty, source read); web search places it at 101 S Main St, Pomona. |
| https://www.montclairplace.com/ | pomona.js: Montclair Place | 200 | OK | Montclair Place shopping center official site (Montclair, CA). |
| https://www.motel6.com/property/motel-claremont-california-us-293441/ | hotels.js: Motel 6 Claremont | 000 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.motel6.com/property/motel-ontario-california-us-293897/ | hotels.js: Motel 6 Ontario Airport | 000 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.motel6.com/property/motel-ontario-california-us-294559/ | hotels.js: Motel 6 Ontario Convention Center-Airport | 000 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.motel6.com/us/california/los-angeles/motels-near-pomona-fairplex/ | hotels.js: Motel 6 Pomona | 000 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.mycarco.org/ | businesses.js: Carco | 200 | OK | Carco used car dealer at 201 W Holt Blvd, Ontario. |
| https://www.nbclosangeles.com/news/sports/la-knight-riders-pomona-cricket-ground/3911746/ | fairplex.js: Knight Riders Cricket Ground, in the former Fairplex Park infield; pomona.js: Knight Riders Cricket Ground | 200 | OK | NBC LA article on Knight Riders opening their new cricket ground at Fairplex, Pomona (July 1, 2026). |
| https://www.nhradiv7.com/in-n-outdragstripatpomona | fairplex.js: In-N-Out Burger Pomona Dragstrip and the Yellow Lot | 200 | OK | NHRA Division 7 page for the In-N-Out Burger Pomona Dragstrip. |
| https://www.ocweekly.com/?p=206685 | businesses.js: Taqueria El Poblano Estilo Tijuana | 200 | OK | Redirects to OC Weekly 2012 article on Tacos El Poblano history, covering the Tijuana chain. |
| https://www.ontarioairportinn.com/ | hotels.js: Ontario Airport Inn | 200 | OK | Ontario Airport Inn, 1801 E G St, Ontario. |
| https://www.ontarioairportinn.com/site/assets/files/14667/hotel_near_ontario_airport.1200x0.jpg | hotels.js: Ontario Airport Inn | 200 | OK | Loads as a JPEG (166 KB) hosted on the Ontario Airport Inn site. |
| https://www.ontarioartwalk.org/text-only-guide | ontario.js: Emporia Arts District lofts | 200 | OK | Ontario Art Walk text guide with an Emporia Arts District section listing the lofts. |
| https://www.ontarioca.gov/contact-city-ontario | ontario.js: Ontario City Hall | 200 | OK | City of Ontario contact page listing City Hall, 303 E B St. |
| https://www.ontarioca.gov/government/communitylife/recreation-community-services/parks/euclid-avenue | ontario.js: Euclid Avenue historic downtown | 200 | OK | City park page for Euclid Avenue (mule car display, bandstand, WCTU fountain). |
| https://www.ontarioca.gov/government/communitylife/recreation-community-services/parks/ontario-town-square | ontario.js: Ontario Town Square | 200 | OK | City page for Ontario Town Square, 224 N. Euclid Ave. |
| https://www.ontarioca.gov/library | ontario.js: Ovitt Family Community Library | 200 | OK | City Library page listing Ovitt Family Community Library, 215 E C St. |
| https://www.ontarioca.gov/news/downtown-ontario-improvement-association-and-city-ontario-museum-arts-culture-department | ontario.js: Downtown Ontario Improvement Association (DOIA) | 200 | OK | June 2, 2026 release launching The People's Storefront with DOIA. |
| https://www.ontarioca.gov/news/ontario-acquires-euclid-avenue-downtown-renaissance-continues-take-shape | businesses.js: Mule Car Smokehouse; ontario.js: Euclid Avenue historic downtown; ontario.js: Ontario City Hall | 200 | OK | June 24, 2024 release on Euclid Avenue acquisition, Mule Car Smokehouse and Civic Center plans. |
| https://www.ontarioca.gov/news/ontario-arts-festival-returns-saturday-october-18-its-seventh-year | ontario.js: Chaffey Community Museum of Art; ontario.js: Euclid Avenue historic downtown | 200 | OK | 2025 Ontario Arts Festival release mentioning Euclid Avenue museum and Chaffey Community Museum of Art. |
| https://www.ontarioca.gov/news/ontario-expands-its-pop-retail-program-help-entrepreneurs-get-started-part-citys-downtown | ontario.js: Craft Collective (Downtown Retail Pop-Up Program) | 200 | OK | June 2024 release on Pop-Up Retail program expansion; mentions Craft Collective. |
| https://www.ontarioca.gov/residents/museum-arts-culture | ontario.js: Ontario Museum of History & Art | 200 | OK | City Museum, Arts & Culture page covering Ontario Museum of History & Art. |
| https://www.ontarioinnsuitesmontclair.us | hotels.js: Ontario Inn & Suites (Montclair) | 200 | OK | Booking-style site for Ontario Inn & Suites, 5361 Holt Blvd, Montclair (states it is not affiliated with the hotel). |
| https://www.ontariomuseum.org/ | ontario.js: Ontario Museum of History & Art | 200 | OK | Loads City of Ontario Museum, Arts & Culture page about the Ontario Museum of History & Art. |
| https://www.ontariomuseum.org/visit/ | ontario.js: Ontario Museum of History & Art | 200 | OK | Visit page for Ontario Museum of History & Art, 225 S. Euclid Ave. |
| https://www.ontariothinksbusiness.com/DowntownRetailPopUp | ontario.js: Craft Collective (Downtown Retail Pop-Up Program) | 200 | OK | Downtown Retail Pop-Up Program page (does not name Craft Collective, but is the program page). |
| https://www.ontariothinksbusiness.com/develop-ontario/district-information/downtown-ontario | ontario.js: Euclid Avenue historic downtown | 200 | OK | Downtown Ontario district page along Euclid Avenue corridor. |
| https://www.ontariothinksbusiness.com/why-ontario/strategic-advantages/convention-center | ontario.js: Ontario Convention Center | 200 | OK | Ontario Convention Center page. |
| https://www.openstreetmap.org/${esc(b.osm | map.html: (page text) | 000 | SKIP | Not a link: a code template or query fragment caught by the URL scan. |
| https://www.openstreetmap.org/copyright | fairplex.js: Blue Lot (sections 1 to 4); fairplex.js: Expo Hall 10; fairplex.js: Expo Hall 4; fairplex.js: Expo Hall 5;  | 200 | OK | OpenStreetMap Copyright and License page (ODbL). |
| https://www.openstreetmap.org/node/10905828129 | fairplex.js: Fairplex Metrolink platform (fair time only) | 200 | OK | OSM node Fairplex, Metrolink halt, special event service only. |
| https://www.openstreetmap.org/node/10918218166 | businesses.js: Global Transporters Inc | 200 | OK | OSM node Global Transporters Inc, Pomona. |
| https://www.openstreetmap.org/node/11290778832 | businesses.js: Roadhaus Automotive & Diesel Specialist | 200 | OK | OSM node Roadhaus Automotive & Diesel Specialist, Montclair. |
| https://www.openstreetmap.org/node/11798906781 | businesses.js: Arrowhead Credit Union | 200 | OK | OSM node Arrowhead Credit Union, Holt Blvd, Montclair. |
| https://www.openstreetmap.org/node/11809317210 | businesses.js: Stater Bros. Markets | 200 | OK | OSM node Stater Bros. Markets, 646 W Holt Blvd, Ontario. |
| https://www.openstreetmap.org/node/11846089162 | businesses.js: Euclid Family Dentistry | 200 | OK | OSM node Euclid Family Dentistry. |
| https://www.openstreetmap.org/node/11846089163 | businesses.js: Newsboy Books | 200 | OK | OSM node Newsboy Books. |
| https://www.openstreetmap.org/node/11846089164 | businesses.js: Unique Cafe | 200 | OK | OSM node Unique Cafe. |
| https://www.openstreetmap.org/node/11846089166 | businesses.js: The Golden Web Boutique Shoppe | 200 | OK | OSM node The Golden Web Boutique Shoppe. |
| https://www.openstreetmap.org/node/11846161070 | businesses.js: Cancha Verde | 200 | OK | OSM node Cancha Verde. |
| https://www.openstreetmap.org/node/11846161071 | businesses.js: Strum Brewing | 200 | OK | OSM node Strum Brewing Co. |
| https://www.openstreetmap.org/node/11846161073 | businesses.js: U.S. Bank | 200 | OK | OSM node U.S. Bank. |
| https://www.openstreetmap.org/node/11892419377 | businesses.js: Catalyst Cannabis Pomona | 200 | OK | OSM node Catalyst Cannabis Pomona. |
| https://www.openstreetmap.org/node/11980577195 | businesses.js: Jack in the Box | 200 | OK | OSM node Jack in the Box, Holt Blvd, Montclair. |
| https://www.openstreetmap.org/node/11980577233 | businesses.js: Church's Chicken | 200 | OK | OSM node Church's Chicken, 700 E Holt Blvd, Ontario. |
| https://www.openstreetmap.org/node/12007821399 | businesses.js: Logan's Candies | 200 | OK | OSM element page loads and is named for Logan's Candies. |
| https://www.openstreetmap.org/node/12472227648 | businesses.js: Pawnshop Skate Shop | 200 | OK | OSM element page loads and is named for Pawnshop Skate Shop. |
| https://www.openstreetmap.org/node/12472227649 | businesses.js: The Financial Architects | 200 | OK | OSM element page loads and is named for The Financial Architects. |
| https://www.openstreetmap.org/node/12472227650 | businesses.js: Elegencias Floral Design | 200 | OK | OSM element page loads and is named for Elegencias Floral Design. |
| https://www.openstreetmap.org/node/12472227652 | businesses.js: Next Level Cuts | 200 | OK | OSM element page loads and is named for Next Level Cuts. |
| https://www.openstreetmap.org/node/13012340334 | businesses.js: Pacific Tire Service | 200 | OK | OSM element page loads and is named for Pacific Tire Service. |
| https://www.openstreetmap.org/node/13156927201 | transit.js: La Verne / Fairplex (Metro A Line) | 200 | OK | OSM element page loads and is named for La Verne / Fairplex (Metro A Line). |
| https://www.openstreetmap.org/node/13396657001 | businesses.js: Tacos Mexico | 200 | OK | OSM element page loads and is named for Tacos Mexico. |
| https://www.openstreetmap.org/node/13399448601 | businesses.js: Tierra Mia Coffee | 200 | OK | OSM element page loads and is named for Tierra Mia Coffee. |
| https://www.openstreetmap.org/node/14106645790 | businesses.js: VP Racing Fuels | 200 | OK | OSM element page loads and is named for VP Racing Fuels. |
| https://www.openstreetmap.org/node/358852707 | businesses.js: Pomona Post Office | 200 | OK | OSM element page loads and is named for Pomona Post Office. |
| https://www.openstreetmap.org/node/394945681 | fairplex.js: Gate 15 (Arrow Highway) | 200 | OK | OSM element page loads and is named for Gate 15 (Arrow Highway). |
| https://www.openstreetmap.org/node/4590602601 | businesses.js: Titas Multiservices | 200 | OK | OSM element page loads and is named for Titas Multiservices. |
| https://www.openstreetmap.org/node/4759037562 | businesses.js: T-Mobile | 200 | OK | OSM element page loads and is named for T-Mobile. |
| https://www.openstreetmap.org/node/7064863019 | businesses.js: Starbucks | 200 | OK | OSM element page loads and is named for Starbucks. |
| https://www.openstreetmap.org/node/7064863020 | businesses.js: Wingstop | 200 | OK | OSM element page loads and is named for Wingstop. |
| https://www.openstreetmap.org/node/7064863021 | businesses.js: Dollar Tree | 200 | OK | OSM element page loads and is named for Dollar Tree. |
| https://www.openstreetmap.org/node/7064863022 | businesses.js: Rent-A-Center | 200 | OK | OSM element page loads and is named for Rent-A-Center. |
| https://www.openstreetmap.org/node/9410088251 | fairplex.js: Yellow Gate (pedestrian) | 200 | OK | OSM element page loads and is named for Yellow Gate (pedestrian). |
| https://www.openstreetmap.org/node/9712076587 | businesses.js: Wendy's | 200 | OK | OSM element page loads and is named for Wendy's. |
| https://www.openstreetmap.org/node/9712076590 | businesses.js: Taqueria 2 Portillos | 200 | OK | OSM element page loads and is named for Taqueria 2 Portillos. |
| https://www.openstreetmap.org/node/9727696792 | businesses.js: Christy's Donuts | 200 | OK | OSM element page loads and is named for Christy's Donuts. |
| https://www.openstreetmap.org/node/9843300223 | businesses.js: Homey Pet Station | 200 | OK | OSM element page loads and is named for Homey Pet Station. |
| https://www.openstreetmap.org/relation/15511540 | ontario.js: ONT Terminal 2 | 200 | OK | OSM element page loads and is named for ONT Terminal 2. |
| https://www.openstreetmap.org/way/1056955103 | businesses.js: Cardenas Markets | 200 | OK | OSM element page loads and is named for Cardenas Markets. |
| https://www.openstreetmap.org/way/1060157981 | businesses.js: Comtires | 200 | OK | OSM element page loads and is named for Comtires. |
| https://www.openstreetmap.org/way/1060157982 | businesses.js: California Transmission | 200 | OK | OSM element page loads and is named for California Transmission. |
| https://www.openstreetmap.org/way/1273996551 | businesses.js: Wendy's | 200 | OK | OSM element page loads and is named for Wendy's. |
| https://www.openstreetmap.org/way/1275181502 | businesses.js: Valvoline | 200 | OK | OSM element page loads and is named for Valvoline. |
| https://www.openstreetmap.org/way/1275450063 | businesses.js: Chevron | 200 | OK | OSM element page loads and is named for Chevron. |
| https://www.openstreetmap.org/way/1277747538 | businesses.js: O'Reilly Auto Parts | 200 | OK | OSM element page loads and is named for O'Reilly Auto Parts. |
| https://www.openstreetmap.org/way/1308666392 | businesses.js: Cricket Wireless | 200 | OK | OSM element page loads and is named for Cricket Wireless. |
| https://www.openstreetmap.org/way/1508617241 | businesses.js: El Pollo Loco | 200 | OK | OSM element page loads and is named for El Pollo Loco. |
| https://www.openstreetmap.org/way/1508617246 | businesses.js: Habit Burger & Grill | 200 | OK | OSM element page loads and is named for Habit Burger & Grill. |
| https://www.openstreetmap.org/way/25421022 | ontario.js: ONT Terminal 4 | 200 | OK | OSM element page loads and is named for ONT Terminal 4. |
| https://www.openstreetmap.org/way/438365438 | businesses.js: Jack in the Box | 200 | OK | OSM element page loads and is named for Jack in the Box. |
| https://www.openstreetmap.org/way/438737513 | businesses.js: CVS Pharmacy | 200 | OK | OSM element page loads and is named for CVS Pharmacy. |
| https://www.openstreetmap.org/way/438737962 | businesses.js: 7-Eleven | 200 | OK | OSM element page loads and is named for 7-Eleven. |
| https://www.openstreetmap.org/way/470330000 | businesses.js: Church's Chicken | 200 | OK | Page is a JS shell; OSM API shows way 470330000 is Church's Chicken, 500 E Holt Ave, Pomona. |
| https://www.openstreetmap.org/way/470335596 | businesses.js: McDonald's | 200 | OK | OSM element page loads and is named for McDonald's. |
| https://www.openstreetmap.org/way/480149573 | businesses.js: Carl's Jr. | 200 | OK | OSM way loads: Carl's Jr. fast food, 5295 Holt Blvd Montclair. |
| https://www.openstreetmap.org/way/480149580 | businesses.js: AutoZone | 200 | OK | OSM way loads: AutoZone car parts shop, 5183 Holt Blvd Montclair. |
| https://www.openstreetmap.org/way/733418605 | businesses.js: University of La Verne - Law Library | 200 | OK | OSM way loads: University of La Verne - Law Library (amenity=library). |
| https://www.openstreetmap.org/way/734119315 | ontario.js: Ovitt Family Community Library | 200 | OK | OSM way loads: Ontario Ovitt Family Community Library, 215 E C St. |
| https://www.openstreetmap.org/way/734119316 | businesses.js: Page One Cafe | 200 | OK | OSM way loads: Page One Cafe (amenity=cafe). |
| https://www.openstreetmap.org/way/736700884 | businesses.js: Wells Fargo | 200 | OK | OSM way loads: Wells Fargo bank, downtown Ontario. |
| https://www.openstreetmap.org/way/740844675 | businesses.js: Andy's Burgers | 200 | OK | OSM way loads: Andy's Burgers fast food. |
| https://www.openstreetmap.org/way/740844688 | businesses.js: AutoZone | 200 | OK | OSM way loads: AutoZone car parts shop, East Holt Blvd Ontario. |
| https://www.openstreetmap.org/way/740844721 | businesses.js: Carco | 200 | OK | OSM way loads: CarCo car dealership (shop=car). |
| https://www.openstreetmap.org/way/740853731 | businesses.js: Valley Department Store Big & Tall | 200 | OK | OSM way loads: Valley Department Store Big & Tall (department store). |
| https://www.openstreetmap.org/way/740853734 | businesses.js: Herradura De Oro | 200 | OK | OSM way loads: Herradura De Oro clothing shop. |
| https://www.openstreetmap.org/way/740853766 | businesses.js: Fiesta Motors | 200 | OK | OSM way loads: Fiesta Motors car shop. |
| https://www.overspraysupply.com/ | pomona.js: Overspray Art Supply & Gallery | 200 | OK | Overspray Art Supply & Gallery, 161 E 2nd St, Pomona; open. |
| https://www.pacifictireservicecenters.com/ | businesses.js: Pacific Tire Service | 200 | OK | Pacific Tire Service; lists Pomona and Holt Blvd locations (Pomona, Ontario). |
| https://www.pitzer.edu/casa-pitzer/ | businesses.js: CASA Pitzer | 200 | OK | Redirects to CASA Pitzer (Critical Action & Social Advocacy) page, which mentions its downtown Ontario community center. |
| https://www.pomona.edu/news/2023/10/10-pomona-college-opens-community-center-downtown-pomona-arts-colony | pomona.js: Pomona College Community Engagement Center | 200 | OK | Pomona College news on opening its Community Engagement Center in downtown Pomona Arts Colony. |
| https://www.pomonaca.gov/ | pomona.js: Pomona City Hall | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.pomonaca.gov/Home/Components/FacilityDirectory/FacilityDirectory/81 | pomona.js: Pomona City Hall | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.pomonaca.gov/government/departments/library | pomona.js: Pomona Public Library | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.pomonacatholic.org/ | businesses.js: Pomona Catholic High School | 200 | OK | Pomona Catholic School, 533 W Holt Ave; includes Pomona Catholic High School. |
| https://www.pomonaswapmeet.com/general-admission.php | fairplex.js: Gate 17 (Fairplex Drive at McKinley Avenue) | 200 | OK | Redirects to Swap Meet directions page with 'General Admission - Gate 17' at 1801 W McKinley Ave. |
| https://www.pomonavalleyauto.com/ | businesses.js: Pomona Valley Auto Sales | 200 | OK | Pomona Valley Auto Sales, 1144 E Holt Ave, Pomona. |
| https://www.promptloop.com/directory/pomona-91766-auto-dealerships | businesses.js: SSS Auto Sales; businesses.js: Seven Seven Motors; businesses.js: We Care Auto | 200 | WRONG | Generic Pomona auto-dealer directory (40 listings): lists We Care Auto and SSS Auto Sales but not Seven Seven Motors; no confirmable single  |
| https://www.railwayage.com/passenger/intercity/brightline-west-breaks-ground/ | transit.js: Ontario East (Metrolink) | 403 | BLOCKED | Cloudflare challenge in both script and browser; checked for correct form only. |
| https://www.reservationdesk.com/hotel/600deb2/passport-inn-pomona | hotels.js: Passport Inn Pomona | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.restaurantji.com/ca/montclair/japanese/ | businesses.js: Starbelly Asian Kitchen & Ramen | 200 | WRONG | Generic Montclair Japanese restaurant list; Starbelly does not appear in its 50 entries, and no dedicated Starbelly page was found. |
| https://www.rookeryalehouse.com/ | pomona.js: The Rookery Alehouse and Grill | 200 | OK | The Rookery Alehouse and Grill, 171 W Second St, Pomona. |
| https://www.royalautodealer.com/ | businesses.js: Royal Auto Dealer | 200 | OK | Royal Auto Dealer Montclair, 5391 Holt Blvd. |
| https://www.spectrumlocalnews.com/ca/california/entertainment/2025/09/22/los-angeles-county-fair-2026-dates | pomona.js: Fairplex | 200 | OK | Article on 2026 LA County Fair dates (May 7-31) quoting Fairplex CEO; fair is held at Fairplex, though venue is not named. |
| https://www.starbucks.com/store-locator/store/1015674/holt-ramona-4490-holt-blvd-suite-a-montclair-ca-917634197-us | businesses.js: Starbucks | 200 | BLOCKED | Two fetches returned an empty page (JS-rendered); a direct curl attempt was denied and not pursued. |
| https://www.staterbros.com/stores/108 | businesses.js: Stater Bros. Markets | 403 | BLOCKED | Cloudflare challenge in both script and browser; checked for correct form only. |
| https://www.successfulmeetings.com/Meeting-Event-Venues/Ontario-CA/Convention-Hotel/Embassy-Suites-Ontario-Airport-p5563539 | hotels.js: Embassy Suites by Hilton Ontario Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.successfulmeetings.com/Meeting-Event-Venues/Ontario-CA/Hotels | hotels.js: Azure Hotel & Suites Ontario Airport; hotels.js: Comfort Suites Ontario Airport Convention Center; hotels.js: | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.t-mobile.com/stores/bd/t-mobile-ontario-ca-91762-9704 | businesses.js: T-Mobile | 200 | BLOCKED | Two fetches returned HTTP 403 Forbidden. |
| https://www.tenantbase.com/us/building/60890 | businesses.js: Habachihana Grill (Orchard Plaza) | 200 | OK | TenantBase page for 4432 Holt Blvd, Montclair, naming Orchard Plaza and Habachihana Grill. |
| https://www.thealleygallerypomona.com/ | pomona.js: The Alley Gallery | 200 | OK | Only the title 'Home / The Alley Gallery' was readable; domain and web search match The Alley Gallery in downtown Pomona (low detail). |
| https://www.thecathedralpomona.com/ | pomona.js: The Cathedral | 200 | OK | The Cathedral concert venue, 350 N Garey Ave, Pomona. |
| https://www.thehavenpomona.com/ | pomona.js: The Haven | 200 | OK | The Haven Pomona live music venue with upcoming shows listed. |
| https://www.theparadoxpomona.com/ | pomona.js: The Paradox Arcade + Bar | 200 | OK | The Paradox Arcade + Bar, 396 S Thomas St, Pomona. |
| https://www.travelagewest.com/Hotels/Ontario-CA/La-Quinta-Inn-Suites-Ontario-Airport-p51281001,Nearby-Hotels?v=D | hotels.js: Comfort Inn & Suites Near Ontario Airport; hotels.js: Embassy Suites by Hilton Ontario Airport; hotels.js: Ho | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.travelagewest.com/Hotels/Ontario-CA/Motel-6-Ontario-Airport-p6355816,Nearby-Hotels?v=D | hotels.js: Azure Hotel & Suites Ontario Airport; hotels.js: Baymont by Wyndham Ontario; hotels.js: Days Inn by Wyndham O | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.travelweekly-asia.com/Hotels/Montclair-CA/Ontario-Inn-Suites-p59835918 | hotels.js: Ontario Inn & Suites (Montclair) | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.travelweekly-asia.com/Hotels/Ontario-CA/Motel-6-Ontario/Local-p53948724 | hotels.js: Motel 6 Ontario Convention Center-Airport | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.travelweekly.com/Hotels/Ontario-CA/Hotel-Hacienda-at-Ontario-Ranch-p61240257 | hotels.js: Hotel Hacienda at Ontario Ranch | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.travelweekly.com/Hotels/Ontario-CA/Ontario-Airport-Hotel-Conference-Ctr-p6229479 | hotels.js: Ontario Airport Hotel & Conference Center | 403 | OK | Opened in a browser on November 2, 2026; page names the expected place or source. |
| https://www.vloungefox.com/ | pomona.js: Vlounge at the Fox | 200 | OK | V Lounge, 150 W 3rd St, Pomona, next to the Fox Theater. |
| https://www.westernu.edu/ | pomona.js: Western University of Health Sciences | 200 | OK | Western University of Health Sciences homepage, California campus at 309 E. Second St., Pomona. |
| https://www.westernu.edu/university/ | pomona.js: Western University of Health Sciences | 200 | OK | About WesternU page for Western University of Health Sciences, Pomona. |
| https://www.wyndhamhotels.com/baymont/ontario-california/baymont-ontario/overview | hotels.js: Baymont by Wyndham Ontario | 200 | OK | Baymont by Wyndham Ontario, 1655 E 4th St, Ontario (fetched without /overview; the /overview path returned 404 to WebFetch but the property  |
| https://www.wyndhamhotels.com/days-inn/ontario-california/days-inn-ontario-airport/overview | hotels.js: Days Inn by Wyndham Ontario Airport | 404 | OK | WebFetch loaded Days Inn by Wyndham Ontario Airport, 1405 E 4th St; scripted check saw a 404 on the redirected URL, so this one is inconsist |
| https://www.wyndhamhotels.com/laquinta/ontario-california/la-quinta-ontario-airport/overview | hotels.js: La Quinta Inn & Suites Ontario Airport | 404 | OK | WebFetch loaded La Quinta Inn & Suites by Wyndham Ontario Airport, 3555 Inland Empire Blvd; scripted check saw a 404 on the redirected URL,  |
| https://www.wyndhamhotels.com/ramada/ontario-california/ramada-ontario-airport/overview | hotels.js: Ramada by Wyndham Ontario Airport | 200 | OK | Ramada by Wyndham Ontario, 1841 East G Street, Ontario. |
| https://www.wyndhamhotels.com/trademark/ontario-california/azure-hotel-suites-ontario-ca/overview | hotels.js: Azure Hotel & Suites Ontario Airport | 200 | OK | Azure Hotel & Suites, Trademark Collection by Wyndham, 1945 E Holt Blvd, Ontario (confirmed on the non-overview URL; the /overview URL gave  |
