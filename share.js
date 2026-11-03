/* Share a spot on a Leaflet map.
   Right-click (computer) or press and hold (phone) on the map to open a small menu:
   share this spot, copy a link, copy coordinates, open in Google Maps.
   A shared link reopens the same map (and the same tab, when the map sits inside the tab bar)
   zoomed to the spot with a pin.
   Use: <script src="share.js?v=..."></script> then MapShare.attach(map, {tab: "tribal", title: "Tribal lands"}).
   Copied from the West Coast Broadband Maps (TravisCS/West-Coast-Broadband-Maps, share.js) for the LA County
   Evacuation Routes map, with one addition: opt.extra(latlng, zoom) may return more menu items as [label, fn]. */
(function () {
  "use strict";
  var CSS = ".msh-menu{position:absolute;z-index:1200;min-width:210px;background:var(--panel,#1f2522);color:var(--ink,#ebeee9);border:1px solid var(--rule,#38403b);border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.5);font:14px var(--serif,'Times New Roman',Times,serif);padding:4px 0}" +
    ".msh-menu .msh-hd{padding:5px 12px 6px;color:var(--muted,#a8b0ab);font-size:12px;border-bottom:1px solid var(--rule,#38403b)}" +
    ".msh-menu button{display:block;width:100%;text-align:left;background:none;border:0;border-radius:0;color:inherit;font:inherit;padding:8px 12px;cursor:pointer}" +
    ".msh-menu button:hover,.msh-menu button:focus{background:var(--chip,#2a312d);outline:none}" +
    ".msh-toast{position:absolute;z-index:1300;left:50%;bottom:60px;transform:translateX(-50%);background:var(--panel,#1f2522);color:var(--ink,#ebeee9);border:1px solid var(--rule,#38403b);border-radius:8px;padding:6px 12px;font:14px var(--serif,'Times New Roman',Times,serif);box-shadow:0 2px 8px rgba(0,0,0,.5)}" +
    ".msh-pin{width:18px;height:18px;border-radius:50% 50% 50% 0;background:#e8412c;border:2px solid #fff;transform:rotate(-45deg);box-shadow:0 1px 4px rgba(0,0,0,.6)}" +
    ".leaflet-container{-webkit-touch-callout:none}";
  function fmt(n) { return (Math.round(n * 1e5) / 1e5).toFixed(5); }

  // Read "pin=lat,lng,zoom" from the page's query or hash
  function readPin() {
    var m = /[?&#]pin=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)(?:,(\d+))?/.exec(location.search + "&" + location.hash);
    if (!m) return null;
    var lat = +m[1], lng = +m[2], z = m[3] ? +m[3] : 13;
    if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
    return { lat: lat, lng: lng, z: Math.min(Math.max(z, 4), 16) };
  }

  function attach(map, opt) {
    opt = opt || {};
    var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    var box = map.getContainer(), menu = null, pinLayer = null, lastOpen = 0;

    // The link points at the tab bar when this map is shown inside it, otherwise at this page
    function linkFor(ll, z) {
      var pin = "pin=" + fmt(ll.lat) + "," + fmt(ll.lng) + "," + z;
      try {
        if (window.top !== window && opt.tab && window.top.location.origin === location.origin && window.top.document.getElementById("frames")) {
          var t = window.top.location;
          return t.origin + t.pathname + "#" + opt.tab + "&" + pin;
        }
      } catch (e) {}
      return location.origin + location.pathname + "?" + pin;
    }
    function toast(msg) {
      var t = document.createElement("div"); t.className = "msh-toast"; t.setAttribute("role", "status"); t.textContent = msg;
      box.appendChild(t); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2200);
    }
    function copy(text, done) {
      function fallback() {
        var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        toast(ok ? done : "Copy did not work here: " + text);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { toast(done); }, fallback);
      else fallback();
    }
    function isOpen() { return !!(menu && menu.parentNode); }
    function close() { if (menu && menu.parentNode) menu.parentNode.removeChild(menu); menu = null; }
    function open(pt, ll) {
      close(); lastOpen = Date.now();
      var z = Math.max(map.getZoom(), 12), url = linkFor(ll, z), coords = fmt(ll.lat) + ", " + fmt(ll.lng);
      menu = document.createElement("div"); menu.className = "msh-menu"; menu.setAttribute("role", "menu");
      var items = [];
      if (navigator.share) items.push(["Share this spot...", function () {
        navigator.share({ title: opt.title || document.title, text: "Location " + coords, url: url }).catch(function () {});
      }]);
      items.push(["Copy link to this spot", function () { copy(url, "Link copied"); }]);
      items.push(["Copy coordinates", function () { copy(coords, "Coordinates copied"); }]);
      items.push(["Open in Google Maps", function () { window.open("https://www.google.com/maps/search/?api=1&query=" + fmt(ll.lat) + "," + fmt(ll.lng), "_blank", "noopener"); }]);
      if (opt.extra) (opt.extra(ll, z) || []).forEach(function (it) { items.push(it); });
      menu.innerHTML = '<div class="msh-hd">' + coords + "</div>";
      items.forEach(function (it) {
        var b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "menuitem"); b.textContent = it[0];
        b.onclick = function (e) { e.stopPropagation(); close(); it[1](); };
        menu.appendChild(b);
      });
      L.DomEvent.disableClickPropagation(menu); L.DomEvent.disableScrollPropagation(menu);
      box.appendChild(menu);
      var w = menu.offsetWidth, h = menu.offsetHeight, W = box.clientWidth, H = box.clientHeight;
      menu.style.left = Math.max(6, Math.min(pt.x, W - w - 6)) + "px";
      menu.style.top = Math.max(6, Math.min(pt.y, H - h - 6)) + "px";
      var first = menu.querySelector("button"); if (first) first.focus({ preventScroll: true });
    }

    // Computer: right-click. Some phones also send this on a long press.
    map.on("contextmenu", function (e) { if (Date.now() - lastOpen > 600) open(e.containerPoint, e.latlng); });
    // Phones: press and hold with one finger
    var timer = null, start = null;
    box.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1 || (menu && menu.contains(e.target))) { clearTimeout(timer); return; }
      var t = e.touches[0]; start = { x: t.clientX, y: t.clientY };
      clearTimeout(timer);
      timer = setTimeout(function () {
        var pt = map.mouseEventToContainerPoint({ clientX: start.x, clientY: start.y });
        open(pt, map.containerPointToLatLng(pt));
      }, 600);
    }, { passive: true });
    box.addEventListener("touchmove", function (e) {
      if (!start) return; var t = e.touches[0];
      if (Math.abs(t.clientX - start.x) > 10 || Math.abs(t.clientY - start.y) > 10) clearTimeout(timer);
    }, { passive: true });
    box.addEventListener("touchend", function () { clearTimeout(timer); }, { passive: true });
    map.on("click movestart zoomstart", function () { if (Date.now() - lastOpen > 400) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    // Show a shared pin
    function goPin(p) {
      if (!p) return;
      if (pinLayer) map.removeLayer(pinLayer);
      var ll = L.latLng(p.lat, p.lng);
      pinLayer = L.marker(ll, { icon: L.divIcon({ className: "", html: '<div class="msh-pin"></div>', iconSize: [18, 18], iconAnchor: [9, 22], popupAnchor: [0, -20] }), keyboard: false, zIndexOffset: 1000 }).addTo(map);
      pinLayer.bindPopup('<b>Shared location</b><br>' + fmt(p.lat) + ", " + fmt(p.lng) + '<br><a href="#" class="msh-rm">Remove pin</a>');
      pinLayer.on("popupopen", function (e) {
        var a = e.popup.getElement().querySelector(".msh-rm");
        if (a) a.onclick = function (ev) { ev.preventDefault(); map.removeLayer(pinLayer); pinLayer = null; };
      });
      map.setView(ll, p.z);
    }
    var p = readPin();
    if (p) setTimeout(function () { map.invalidateSize({ pan: false }); goPin(p); }, 400);
    return { goPin: goPin, open: open, isOpen: isOpen, close: close };
  }
  window.MapShare = { attach: function (map, opt) { var api = attach(map, opt); window.MapShare.goPin = api.goPin; window.MapShare.open = api.open; window.MapShare.isOpen = api.isOpen; window.MapShare.close = api.close; return api; }, readPin: readPin };
})();
