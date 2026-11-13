/* snapshot.js: a picture of a Leaflet map exactly as it looks (basemap, layers, open cards, legend and
   panels), opened in a new tab with its title, time, a link back to the view and any info the page adds.
   Use: <script src="snapshot.js"></script>, then MapSnapshot.take(map, {
     title: "Map title", file: "file-name-prefix", credit: "Map by ... Sources ...",
     link: function () { return "https://...#view"; },          // optional: link back to this view
     info: function () { return [{h: "Layers shown", items: ["..."]}, {h: "Card", text: "..."}]; },
     hide: ["#status"],                                          // optional: selectors left out of the picture
     busy: function (on) {}, done: function (how) {}            // optional: progress hooks
   });
   Needs: basemap tiles that allow cross-origin use (tile layer option crossOrigin: "anonymous", and a server
   that sends Access-Control-Allow-Origin; USGS, Esri and OpenStreetMap tiles do), or the browser refuses to
   export the picture. Pop-up blockers allow the new tab because it opens inside the click; if a browser still
   blocks it, the picture downloads instead. html2canvas 1.4.1 (MIT) draws the HTML panels; it loads from html2canvas-1.4.1.min.js
   beside the page, else from cdnjs. Written for the LA County Evacuation Routes map (T. C. Smith, 2026). */
(function () {
  "use strict";
  var H2C_LOCAL = "html2canvas-1.4.1.min.js",
      H2C_CDN = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
      H2C_SRI = "sha384-ZZ1pncU3bQe8y31yfZdMFdSpttDoPmOZg2wguVK9almUodir1PghgT0eY7Mrty8H";
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function script(src, sri) {
    return new Promise(function (res, rej) {
      var s = document.createElement("script"); s.src = src;
      if (sri) { s.integrity = sri; s.crossOrigin = "anonymous"; }
      s.onload = res; s.onerror = function () { s.remove(); rej(new Error("could not load " + src)); };
      document.head.appendChild(s);
    });
  }
  function loadH2C() {
    if (window.html2canvas) return Promise.resolve();
    return script(H2C_LOCAL).catch(function () { return script(H2C_CDN, H2C_SRI); });
  }
  // stacking order: the Leaflet pane's z-index, then document order
  function paneZ(el) { var p = el.closest(".leaflet-pane"); return p ? (parseInt(getComputedStyle(p).zIndex, 10) || 0) : 0; }
  function alpha(el, stop) { var a = 1; for (var e = el; e && e !== stop; e = e.parentElement) { var o = parseFloat(getComputedStyle(e).opacity); if (!isNaN(o)) a *= o; } return a; }
  // basemap tiles and every canvas (canvas tile layers, canvas renderers) drawn where they are on screen
  function drawMap(ctx, map) {
    var C = map.getContainer(), r = C.getBoundingClientRect();
    ctx.fillStyle = getComputedStyle(C).backgroundColor || "#dddddd"; ctx.fillRect(r.left, r.top, r.width, r.height);
    var els = [].slice.call(C.querySelectorAll("img.leaflet-tile, canvas"));
    els = els.filter(function (e) { return !e.closest(".leaflet-popup-pane, .leaflet-marker-pane, .leaflet-tooltip-pane, .leaflet-control-container"); });
    els.forEach(function (e, i) { e._snapOrd = i; });
    els.sort(function (a, b) { return paneZ(a) - paneZ(b) || a._snapOrd - b._snapOrd; });
    ctx.save(); ctx.beginPath(); ctx.rect(r.left, r.top, r.width, r.height); ctx.clip();
    els.forEach(function (e) {
      if (e.tagName === "IMG" && (!e.complete || !e.naturalWidth)) return;
      var b = e.getBoundingClientRect(); if (!b.width || !b.height) return;
      if (b.right < r.left || b.left > r.right || b.bottom < r.top || b.top > r.bottom) return;
      ctx.globalAlpha = alpha(e, C);
      try { ctx.drawImage(e, b.left, b.top, b.width, b.height); } catch (x) {}
    });
    ctx.restore(); ctx.globalAlpha = 1;
  }
  function lines(ctx, text, w) {
    var out = [], words = String(text).split(/\s+/), cur = "";
    words.forEach(function (wd) { var t = cur ? cur + " " + wd : wd; if (ctx.measureText(t).width > w && cur) { out.push(cur); cur = wd; } else cur = t; });
    if (cur) out.push(cur); return out;
  }
  function stamp(d) { function p(n) { return (n < 10 ? "0" : "") + n; } return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "-" + p(d.getHours()) + p(d.getMinutes()); }
  // a caption band under the picture: title, time, credit and the link back, so the image stands on its own
  function band(W, s, opt, when, link) {
    var c = document.createElement("canvas"), ctx = c.getContext("2d"), pad = 12, font = '"Times New Roman", Times, serif';
    ctx.font = "12.5px " + font;
    var cred = lines(ctx, opt.credit || "", W - 2 * pad), lk = link ? lines(ctx, link, W - 2 * pad) : [];
    var h = pad + 20 + (cred.length + lk.length) * 16 + pad;
    c.width = Math.round(W * s); c.height = Math.round(h * s); ctx = c.getContext("2d"); ctx.scale(s, s);
    ctx.fillStyle = "#f4f1e8"; ctx.fillRect(0, 0, W, h); ctx.fillStyle = "#d9d4c4"; ctx.fillRect(0, 0, W, 1);
    ctx.fillStyle = "#1d1c19"; ctx.textBaseline = "top";
    ctx.font = "bold 16px " + font; ctx.fillText(opt.title || document.title, pad, pad);
    ctx.font = "12.5px " + font; var t = when.toLocaleString(); ctx.fillText(t, W - pad - ctx.measureText(t).width, pad + 3);
    var y = pad + 22; ctx.fillStyle = "#3d3a33"; cred.forEach(function (l) { ctx.fillText(l, pad, y); y += 16; });
    ctx.fillStyle = "#1f4e79"; lk.forEach(function (l) { ctx.fillText(l, pad, y); y += 16; });
    return c;
  }
  function compose(map, opt) {
    opt = opt || {};
    var W = window.innerWidth, H = window.innerHeight, s = Math.min(2, window.devicePixelRatio || 1), C = map.getContainer();
    return loadH2C().then(function () {
      var base = document.createElement("canvas"); base.width = Math.round(W * s); base.height = Math.round(H * s);
      var ctx = base.getContext("2d"); ctx.scale(s, s);
      ctx.fillStyle = getComputedStyle(document.body).backgroundColor || "#ffffff"; ctx.fillRect(0, 0, W, H);
      drawMap(ctx, map);
      C.setAttribute("data-snap-map", "1");
      return window.html2canvas(document.body, {
        backgroundColor: null, useCORS: true, logging: false, scale: s,
        ignoreElements: function (e) { return e.tagName === "SCRIPT"; },
        x: window.scrollX, y: window.scrollY, width: W, height: H, windowWidth: W, windowHeight: H,
        onclone: function (doc) {
          doc.documentElement.style.background = "transparent"; doc.body.style.background = "transparent";
          var M = doc.querySelector("[data-snap-map]");
          if (M) {
            M.style.background = "transparent";
            [].forEach.call(M.querySelectorAll("img.leaflet-tile, canvas"), function (e) { if (!e.closest(".leaflet-popup-pane, .leaflet-marker-pane, .leaflet-control-container")) e.style.visibility = "hidden"; });
            [].forEach.call(M.querySelectorAll(".leaflet-tooltip-pane"), function (e) { e.style.visibility = "hidden"; });
          }
          (opt.hide || []).forEach(function (q) { [].forEach.call(doc.querySelectorAll(q), function (e) { e.style.visibility = "hidden"; }); });
          // html2canvas draws the contents of closed <details> and no disclosure arrows: fold them by hand
          [].forEach.call(doc.querySelectorAll("details"), function (d) {
            var sum = d.querySelector(":scope > summary");
            [].forEach.call(d.children, function (c) { if (c !== sum && !d.open) c.style.display = "none"; });
            if (sum && doc.defaultView.getComputedStyle(sum).display === "list-item") { sum.style.listStyle = "none"; sum.insertBefore(doc.createTextNode(d.open ? "\u25BE " : "\u25B8 "), sum.firstChild); }
          });
        }
      }).then(function (over) {
        C.removeAttribute("data-snap-map");
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(over, 0, 0, base.width, base.height);
        var when = new Date(), link = opt.link ? opt.link() : "", b = band(W, s, opt, when, link);
        var out = document.createElement("canvas"); out.width = base.width; out.height = base.height + b.height;
        var o = out.getContext("2d"); o.drawImage(base, 0, 0); o.drawImage(b, 0, base.height);
        return { canvas: out, when: when, link: link };
      }, function (e) { C.removeAttribute("data-snap-map"); throw e; });
    });
  }
  function page(opt, url, file, r, info) {
    var t = esc(opt.title || document.title), sec = (info || []).map(function (x) {
      var body = x.items ? "<ul>" + x.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>" : '<p class="pre">' + esc(x.text || "") + "</p>";
      return '<section class="box"><h2>' + esc(x.h) + "</h2>" + body + "</section>";
    }).join("");
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      "<title>" + t + ", screenshot</title><style>" +
      ':root{color-scheme:light dark}body{margin:0;background:#efece2;color:#1d1c19;font:16px "Times New Roman",Times,serif}' +
      "@media (prefers-color-scheme:dark){body{background:#15140f;color:#f1ede2}.box{background:#23221f!important;border-color:#4a463d!important}a{color:#8fb8e8!important}.meta,.note{color:#b4ad9c!important}}" +
      ".wrap{max-width:1500px;margin:0 auto;padding:16px max(16px,env(safe-area-inset-left)) 32px}h1{font-size:22px;margin:0 0 4px}.meta{color:#5f5b50;margin:0 0 12px;font-size:14px}" +
      ".row{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin:0 0 14px}.btn{background:#b8322f;color:#fff!important;padding:8px 14px;border-radius:6px;text-decoration:none;font-weight:700}" +
      "a{color:#1f4e79}img{display:block;max-width:100%;height:auto;border:1px solid #d9d4c4;border-radius:6px;box-shadow:0 2px 10px rgba(0,0,0,.25)}" +
      ".info{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-top:16px}.box{background:#fbf9f3;border:1px solid #d9d4c4;border-radius:8px;padding:10px 14px}" +
      ".box h2{font-size:16px;margin:0 0 6px}.box ul{margin:0;padding-left:18px;font-size:14.5px}.pre{white-space:pre-wrap;margin:0;font-size:14.5px;line-height:1.4}.note{color:#5f5b50;font-size:13.5px;margin-top:14px}" +
      "</style></head><body><div class=\"wrap\"><h1>" + t + "</h1><p class=\"meta\">Screenshot taken " + esc(r.when.toLocaleString()) + "</p>" +
      '<div class="row"><a class="btn" id="dl" href="#" download="' + esc(file) + '">Download the image</a>' + (r.link ? '<a href="' + esc(r.link) + '" target="_blank" rel="noopener">Open this view on the map</a>' : "") + "</div>" +
      '<img id="shot" src="' + url + '" alt="Screenshot of ' + t + ' as it looked on screen">' +
      '<script>document.getElementById("dl").href=document.getElementById("shot").src<\/script>' +
      '<div class="info">' + sec + "</div>" +
      '<p class="note">Right-click the image (or press and hold it on a phone) to copy, save or share it.</p></div></body></html>';
  }
  function take(map, opt) {
    opt = opt || {};
    var w = null;
    try { w = window.open("", "_blank"); } catch (e) {}
    if (w) { try { w.document.open(); w.document.write('<!doctype html><meta charset="utf-8"><title>Making the screenshot</title><body style="font:18px Times New Roman,serif;padding:24px">Making the screenshot of ' + esc(opt.title || document.title) + "..."); w.document.close(); } catch (e) {} }
    if (opt.busy) opt.busy(true);
    // opt.before (may return a promise) runs first and opt.after last, for a page that has to get its map ready for the picture
    var after = function () { if (opt.after) { try { opt.after(); } catch (x) {} } };
    return Promise.resolve().then(function () { return opt.before ? opt.before() : null; }).then(function () { return compose(map, opt); }).then(function (r) {
      var url; try { url = r.canvas.toDataURL("image/png"); } catch (e) { throw new Error("The basemap did not allow its tiles to be copied, so the picture could not be saved. Try another basemap."); }
      var file = (opt.file || "map") + "-" + stamp(r.when) + ".png";
      var info = opt.info ? opt.info() : [];
      if (w && !w.closed) { w.document.open(); w.document.write(page(opt, url, file, r, info)); w.document.close(); if (opt.done) opt.done("tab"); }
      else { var a = document.createElement("a"); a.href = url; a.download = file; document.body.appendChild(a); a.click(); a.remove(); if (opt.done) opt.done("download"); }
      if (opt.busy) opt.busy(false);
      after();
      return r;
    }).catch(function (e) {
      if (opt.busy) opt.busy(false);
      after();
      if (w && !w.closed) { try { w.document.body.textContent = String(e && e.message || e); } catch (x) {} }
      if (opt.done) opt.done("error", e);
      throw e;
    });
  }
  window.MapSnapshot = { take: take, compose: compose };
})();
