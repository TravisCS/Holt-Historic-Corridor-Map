/* smoothzoom.js: continuous zoom for Leaflet 1.9 maps.
   Leaflet's own wheel zoom collects wheel events for 40 ms, then plays one 250 ms jump to the
   next whole level, again and again: a swipe on a trackpad is a staircase of jumps. This file
   replaces it. The zoom follows the wheel, the trackpad swipe or the trackpad pinch on every
   animation frame, glides to a stop, and comes to rest on a whole level so tiles stay sharp.
   While the zoom is moving it also keeps the rest of the map in step: vector layers are redrawn
   (lines stay thin and are not cut off when zooming out), Leaflet.markercluster groups split and
   merge as each level is passed, and the map fires 'zoomstep' so the page can do the same for
   anything it changes by zoom level.

   Use: load after leaflet.js, then  L.map(el, {smoothZoom: true})
        or with settings              L.map(el, {smoothZoom: {speed: 1.3}})
        page code that reacts to the zoom level:  map.on('zoomend zoomstep', fn)
        and inside fn compare Math.round(map.getZoom()), since the zoom is a fraction on the way.
   Zoom buttons, double click, keyboard and finger pinch on phones stay Leaflet's own.
   No dependencies besides Leaflet. MIT licence. */
(function () {
  'use strict';
  if (!window.L || !L.Map || !L.Handler) return;

  var MAC_WHEEL = 4.000244140625;            // Chrome on a Mac reports mouse wheel clicks in multiples of this
  var WEBKIT = typeof window.GestureEvent === 'function';   // Safari's engine, on a Mac or an iPhone, whatever the browser calls itself
  var now = function () { return window.performance && performance.now ? performance.now() : +new Date(); };

  var SmoothZoom = L.Handler.extend({
    // Settings, all optional: L.map(el, {smoothZoom: {speed: 1.3}})
    defaults: {
      speed: 1,              // 1.5 zooms half as far again for the same swipe; 0.7 is calmer
      pxPerLevel: 140,       // two-finger swipe: scrolled pixels for one zoom level
      pinchPxPerLevel: 50,   // trackpad pinch (wheel events with ctrlKey): pixels for one level
      notch: 0.5,            // least zoom for one click of a mouse wheel, in levels
      ease: 80,              // ms: how quickly the picture catches up with the wheel
      settle: 180,           // ms without a wheel event before the gesture counts as over
      coast: 0.08,           // a swipe fading below this (levels per 0.1 s) is coasting: head for a whole level
      snapBias: 0.35,        // go on to the next level when this far past the last one, else back
      redrawBudget: 5,       // ms: redraw vector layers on every frame while it costs less than this
      flatTiles: true        // place tiles with left/top (see _flat below); false keeps Leaflet's own placing
    },

    addHooks: function () {
      var map = this._map, c = map._container, o = map.options.smoothZoom;
      this._o = L.extend({}, this.defaults, typeof o === 'object' ? o : {});
      this._wasWheel = !!(map.scrollWheelZoom && map.scrollWheelZoom.enabled());
      if (this._wasWheel) map.scrollWheelZoom.disable();
      L.DomEvent.on(c, 'wheel', this._onWheel, this);
      this._down = L.bind(this._onDown, this);
      c.addEventListener('mousedown', this._down, true);
      c.addEventListener('touchstart', this._down, { capture: true, passive: true });
      // Safari on a Mac sends gesture events for a trackpad pinch, not wheel events
      // (GestureEvent is the test: 'ongesturestart' in window is false in Safari on a Mac)
      this._gestures = WEBKIT && !('ontouchstart' in window);
      if (this._gestures) L.DomEvent.on(c, 'gesturestart', this._onGStart, this).on(c, 'gesturechange', this._onGChange, this).on(c, 'gestureend', this._onGEnd, this);
      map.on('zoom', this._onZoom, this).on('zoomend', this._onZoomEnd, this);
      this._flats = [];
      if (this._o.flatTiles) { map.on('layeradd', this._onLayer, this); map.eachLayer(this._flat, this); }
    },

    removeHooks: function () {
      var map = this._map, c = map._container;
      this._drop();
      L.DomEvent.off(c, 'wheel', this._onWheel, this);
      c.removeEventListener('mousedown', this._down, true);
      c.removeEventListener('touchstart', this._down, { capture: true });
      if (this._gestures) L.DomEvent.off(c, 'gesturestart', this._onGStart, this).off(c, 'gesturechange', this._onGChange, this).off(c, 'gestureend', this._onGEnd, this);
      map.off('zoom', this._onZoom, this).off('zoomend', this._onZoomEnd, this).off('layeradd', this._onLayer, this);
      for (var i = 0; i < this._flats.length; i++) { this._flats[i].off('tileloadstart', this._onTile, this); delete this._flats[i]._szFlat; }
      if (this._wasWheel && map.scrollWheelZoom) map.scrollWheelZoom.enable();
    },

    /* ---- input ---- */

    _onWheel: function (e) {
      var map = this._map, o = this._o, v = e.deltaY, d, k;
      L.DomEvent.stop(e);
      if (!v || map._animatingZoom || (map.touchZoom && map.touchZoom._zooming)) return;
      if (e.deltaMode === 1) v *= 40; else if (e.deltaMode === 2) v *= 300;      // lines, pages
      if (e.ctrlKey) d = -v / o.pinchPxPerLevel;
      else {
        d = -v / o.pxPerLevel;
        k = Math.abs(v) / MAC_WHEEL;
        // one click of a real mouse wheel is worth at least `notch`, however small its number
        if ((e.deltaMode !== 0 || (k >= 1 && Math.abs(k - Math.round(k)) < 1e-6)) && Math.abs(d) < o.notch) d = d < 0 ? -o.notch : o.notch;
      }
      d = Math.max(-1, Math.min(1, d * o.speed));
      this._begin();
      this._anchor(map.mouseEventToContainerPoint(e));
      this._pinch = !!e.ctrlKey;
      this._aim(this._raw + d);
    },

    _onGStart: function (e) {
      var map = this._map;
      L.DomEvent.preventDefault(e);
      if (map._animatingZoom) return;
      this._begin();
      this._gesturing = true;
      this._g0 = this._raw;
      this._anchor(map.mouseEventToContainerPoint(e));
    },
    _onGChange: function (e) {
      L.DomEvent.preventDefault(e);
      if (!this._gesturing || !this._active || !(e.scale > 0)) return;
      this._aim(this._g0 + Math.log(e.scale) / Math.LN2 * this._o.speed);
    },
    _onGEnd: function (e) {
      L.DomEvent.preventDefault(e);
      this._gesturing = false;
      this._last = -1e9;                       // settle at once
    },

    // a press on the map while the zoom is still gliding: stop steering by the pointer, so a drag is not fought
    _onDown: function () { if (this._active) { this._free = true; this._last = -1e9; } },

    /* ---- the gesture ---- */

    _begin: function () {
      var map = this._map, id, g;
      if (this._active) return;
      map._stop();
      this._active = true; this._moved = false; this._free = false; this._gesturing = false; this._pinch = false;
      this._z = this._raw = this._target = map.getZoom(); this._acc = 0; this._accT = now();
      this._lvl = Math.round(this._z);
      this._dir = 0; this._p = null; this._t = now(); this._heavy = false; this._gap = 0; this._evt = 0;
      this._reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
      // markercluster only closes a fanned-out group on Leaflet's own zoom animation, which never runs here
      for (id in map._layers) { g = map._layers[id]; if (g && g._topClusterLevel && g.unspiderfy) g.unspiderfy(); }
    },

    _anchor: function (p) {
      if (this._p && this._p.equals(p)) return;
      this._p = p; this._ll = this._map.containerPointToLatLng(p);
    },

    _aim: function (z) {
      var map = this._map;
      var t = now();
      z = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), z));
      if (z !== this._raw) this._dir = z > this._raw ? 1 : -1;
      this._acc = this._acc * Math.exp(-(t - this._accT) / 100) + Math.abs(z - this._raw); this._accT = t;
      this._raw = z; this._last = t;
      if (!this._frame) this._frame = L.Util.requestAnimFrame(this._step, this);
    },

    _snap: function (z) {
      var map = this._map, s = map.options.zoomSnap, f;
      if (!s) return z;
      f = z / s;
      f = this._dir > 0 ? Math.ceil(f - this._o.snapBias) : this._dir < 0 ? Math.floor(f + this._o.snapBias) : Math.round(f);
      return Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), f * s));
    },

    _step: function () {
      var map = this._map, o = this._o, t = now(), dt, quiet, live, tau, z;
      this._frame = null;
      if (!this._active) return;
      if (map._animatingZoom || map._zoom !== this._z) { this._drop(); return; }   // something else moved the zoom: let it
      dt = Math.min(100, t - this._t); this._t = t;
      quiet = !this._gesturing && t - this._last > o.settle;
      // live: the hand is still driving. Coasting (a swipe's fading tail) or over: head for a whole level,
      // forward if the swipe has carried far enough past the last one, so the tail does not creep on and then come back.
      live = !quiet && (this._gesturing || this._pinch || this._acc * Math.exp(-(t - this._accT) / 100) >= o.coast);
      this._target = live ? this._raw : this._snap(this._raw);
      tau = live ? o.ease : o.ease * 1.6;
      z = this._reduce ? this._target : this._z + (this._target - this._z) * (1 - Math.exp(-dt / tau));
      if (Math.abs(this._target - z) < 0.003) z = this._target;
      if (z !== this._z) {
        if (!this._moved) { this._moved = true; map._moveStart(true, false); }
        this._z = z;
        map._move(this._center(z), z, { pinch: true, round: false });
      }
      if (quiet && z === this._target) { this._finish(); return; }
      this._frame = L.Util.requestAnimFrame(this._step, this);
    },

    // the map center that keeps the place under the pointer under the pointer at zoom z
    _center: function (z) {
      var map = this._map, c;
      if (this._free || !this._p) c = map.getCenter();
      else c = map.unproject(map.project(this._ll, z)._subtract(this._p.subtract(map.getSize()._divideBy(2))), z);
      return map.options.maxBounds ? map._limitCenter(c, z, map.options.maxBounds) : c;
    },

    _finish: function () {
      var map = this._map;
      this._active = false;
      if (!this._moved) return;
      // the same ending Leaflet gives its own zoom animation: one plain 'zoom' so tile layers tidy up, then the end events
      map._move(this._center(this._target), this._target, undefined, true);
      map.fire('zoom'); map.fire('move'); map._moveEnd(true);
    },

    _drop: function () {
      if (this._frame) { L.Util.cancelAnimFrame(this._frame); this._frame = null; }
      this._active = false; this._gesturing = false;
    },

    /* ---- keeping the map in step while the zoom is a fraction ---- */

    _onZoom: function (e) {
      var t, r;
      if (!e || !e.pinch) return;              // only continuous zoom: this file's, or a finger pinch on a phone
      t = now();
      if (this._evt && t - this._evt < 100) this._gap = this._gap ? this._gap * 0.8 + (t - this._evt) * 0.2 : t - this._evt;
      this._evt = t;
      if (this._gap > 24) this._heavy = true;  // frames are coming late: redraw less often for the rest of this gesture
      this._redraw();
      if (!this._active) return;               // finger pinch: leave markers alone, removing one under a finger ends the touch
      r = Math.round(this._map._zoom);
      if (r !== this._lvl) { this._lvl = r; this._recluster(r); this._map.fire('zoomstep', { zoom: r }); }
    },

    _onZoomEnd: function () { this._heavy = false; this._gap = 0; this._evt = 0; },

    // Vector layers: Leaflet only stretches the old drawing during a continuous zoom (thick lines, cut off
    // at the old view's edge when zooming out). Redraw them, every frame when that is cheap.
    _redraw: function () {
      var map = this._map, z = map._zoom, slow = this._heavy || this._cost > this._o.redrawBudget, t0 = now(), did = false, id, r;
      for (id in map._layers) {
        r = map._layers[id];
        if (!(r instanceof L.Renderer) || !r._container || r._zoom === undefined) continue;
        if (slow && Math.abs(z - r._zoom) < 0.35) continue;
        r._reset(); did = true;
      }
      if (did) { t0 = now() - t0; this._cost = this._cost ? this._cost * 0.7 + t0 * 0.3 : t0; }
    },

    // Leaflet.markercluster regroups on 'zoomend' only. Regroup as each level is passed, without its
    // own 0.3 s marker animation (that animation would drag every marker behind the moving map).
    _recluster: function (r) {
      var map = this._map, id, g, anim;
      for (id in map._layers) {
        g = map._layers[id];
        if (!g || !g._topClusterLevel || !g._zoomEnd || !g._noAnimation || g._zoom === r) continue;
        anim = g._withAnimation && g._animationZoomIn === g._withAnimation._animationZoomIn;
        if (anim) L.extend(g, g._noAnimation);
        try { g._zoomEnd(); } finally { if (anim) L.extend(g, g._withAnimation); }
      }
    }
  });

  /* ---- tiles ----
     Leaflet places every tile with its own translate3d, which makes each tile its own graphics layer.
     Each time a zoom passes a whole level a new set of tiles is made, and making some 70 layers at once
     cost 50 to 80 ms in WebKit on the map this was written for: a visible hitch at every level, with
     Leaflet's own zoom too. Placed with left and top, the tiles of a level share their container's one
     layer (the container still moves and scales by transform). Measured on that map: 15 to 17 frames
     over 30 ms in four swipes before, 5 or 6 after. */
  SmoothZoom.include({
    _onLayer: function (e) { this._flat(e.layer); },
    _flat: function (l) {
      var k;
      if (!(l instanceof L.GridLayer) || l._szFlat) return;
      l._szFlat = true; this._flats.push(l);
      l.on('tileloadstart', this._onTile, this);
      for (k in l._tiles) this._place(l._tiles[k].el);          // tiles made before this layer was seen
    },
    _onTile: function (e) { this._place(e.tile); },
    _place: function (el) {
      var p = el && el._leaflet_pos;
      if (!p) return;
      el.style[L.DomUtil.TRANSFORM] = '';
      el.style.left = p.x + 'px'; el.style.top = p.y + 'px';
      // Leaflet 1.9 gives tile images mix-blend-mode: plus-lighter (it hides seams between tiles in Chrome).
      // In Safari's engine a tile placed flat then also adds the colour of whatever is behind the tile pane
      // (measured: a dark grey base came out lighter by exactly the map's background colour). Chrome keeps
      // the blend inside the tile container, flat or not. So in Safari only, flat tiles do not blend.
      if (WEBKIT) el.style.mixBlendMode = 'normal';
    }
  });

  L.Map.SmoothZoom = SmoothZoom;
  L.Map.mergeOptions({ smoothZoom: false });
  L.Map.addInitHook('addHandler', 'smoothZoom', SmoothZoom);
})();
