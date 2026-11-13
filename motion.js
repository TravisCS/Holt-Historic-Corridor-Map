/* motion.js: smooth changes for Leaflet 1.9 maps. Nothing on the map jumps.
   Three things, all starting on the click:
   1. Layers melt on and off. A marker or line added to the map fades in; one taken off leaves a
      copy behind that fades out, while the real layer is removed at once (so hasLayer, counts and
      clicks are right from the first moment).
   2. The view glides. map.glideTo(center, zoom) and map.glideToBounds(bounds, fitBoundsOptions)
      move the map in one eased flight (slow start, quick middle, slow stop) and land on a whole
      zoom level. A drag or a wheel turn during the flight takes over, as with any Leaflet move.
   3. Nothing here runs while a zoom is in progress, so it does not fight smoothzoom.js. During a
      glide the zoom is passed on as a continuous zoom, so smoothzoom.js keeps lines thin.

   Use: load after leaflet.js (and after smoothzoom.js when both are used), then
        L.map(el, {motion: true})            or with settings   L.map(el, {motion: {fadeIn: 400}})
        map.glideTo([lat, lng], 17, {then: function () { ... }})
        map.glideToBounds(bounds, {padding: [30, 30], maxZoom: 16})
   People who ask their device for less motion get the old instant changes.
   No dependencies besides Leaflet. MIT licence. */
(function () {
  'use strict';
  if (!window.L || !L.Map) return;

  var DEFAULTS = {
    fadeIn: 350,          // ms: a layer coming on
    fadeOut: 280,         // ms: a layer going off
    glideMin: 450,        // ms: shortest flight
    glideMax: 1100,       // ms: longest flight
    settleAfterLoad: 1500,// ms after the map is ready before views glide (the opening view is set at once)
    maxGhosts: 600        // most fading copies alive at one time
  };
  var now = function () { return window.performance && performance.now ? performance.now() : +new Date(); };
  var reduced = function () { return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); };
  var styled = false;

  function addStyle(o) {
    if (styled) return; styled = true;
    var s = document.createElement('style');
    s.setAttribute('data-motion', '');
    s.textContent =
      '@keyframes moIn{from{opacity:0}}@keyframes moOut{to{opacity:0}}' +
      '.mo-in{animation:moIn ' + o.fadeIn + 'ms cubic-bezier(.4,0,.2,1)}' +
      '.mo-ghost{animation:moOut ' + o.fadeOut + 'ms cubic-bezier(.4,0,1,1) forwards;pointer-events:none!important}';
    document.head.appendChild(s);
  }

  function setup(map) {
    var opt = map.options.motion;
    if (!opt) return;
    var o = L.extend({}, DEFAULTS, typeof opt === 'object' ? opt : {});
    var zooming = false, flying = false, ready = false, ghosts = [], fresh = [], freshTimer = null;
    addStyle(o);
    map.whenReady(function () { setTimeout(function () { ready = true; }, o.settleAfterLoad); });

    /* ---- layers coming on ---- */
    function els(layer) {
      if (!layer || layer instanceof L.LayerGroup || (L.DivOverlay && layer instanceof L.DivOverlay) || (L.GridLayer && layer instanceof L.GridLayer)) return [];
      var a = [];
      if (layer._icon) a.push(layer._icon);
      if (layer._shadow) a.push(layer._shadow);
      if (layer._path && layer._path.parentNode) a.push(layer._path);
      return a;
    }
    function clearFresh() {
      freshTimer = null;
      for (var i = 0; i < fresh.length; i++) if (fresh[i].classList) fresh[i].classList.remove('mo-in');
      fresh = [];
    }
    map.on('layeradd', function (e) {
      if (zooming || reduced()) return;
      var a = els(e.layer), i;
      for (i = 0; i < a.length; i++) { a[i].classList.add('mo-in'); fresh.push(a[i]); }
      // the class comes off again once the fade is over, so a picture of the page taken later never restarts it
      if (a.length && !freshTimer) freshTimer = setTimeout(clearFresh, o.fadeIn + 80);
    });

    /* ---- layers going off ---- */
    function killGhosts() {
      for (var i = 0; i < ghosts.length; i++) if (ghosts[i].parentNode) ghosts[i].parentNode.removeChild(ghosts[i]);
      ghosts = [];
    }
    function ghost(layer) {
      var a = els(layer), i, el, g;
      for (i = 0; i < a.length; i++) {
        el = a[i];
        if (!el.parentNode || ghosts.length >= o.maxGhosts) continue;
        g = el.cloneNode(true);
        g.removeAttribute('id'); g.removeAttribute('tabindex');
        g.setAttribute('aria-hidden', 'true');
        g.classList.remove('mo-in', 'leaflet-interactive');
        g.classList.add('mo-ghost');
        el.parentNode.insertBefore(g, el.nextSibling);
        ghosts.push(g);
        (function (node) {
          setTimeout(function () {
            if (node.parentNode) node.parentNode.removeChild(node);
            var k = ghosts.indexOf(node); if (k > -1) ghosts.splice(k, 1);
          }, o.fadeOut + 40);
        })(g);
      }
    }
    var removeLayer = map.removeLayer;
    map.removeLayer = function (layer) {
      // a copy is left only when the map is at rest: a copy does not follow a zoom
      if (!zooming && !reduced() && layer && this.hasLayer(layer)) { try { ghost(layer); } catch (err) { /* the fade is a nicety: never block the removal */ } }
      return removeLayer.call(this, layer);
    };
    map.on('zoomstart', function () { zooming = true; killGhosts(); });
    map.on('zoomend', function () { zooming = false; });
    map.on('unload', killGhosts);

    /* ---- the view ---- */
    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }   // slow, quick, slow
    function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
    function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
    function tanh(n) { return sinh(n) / cosh(n); }

    map.glideTo = function (center, zoom, opts) {
      opts = opts || {};
      var self = this, then = opts.then;
      var startZoom = this._zoom;
      center = L.latLng(center);
      zoom = zoom === undefined ? startZoom : Math.max(this.getMinZoom(), Math.min(this.getMaxZoom(), zoom));
      if (this.options.maxBounds) center = this._limitCenter(center, zoom, this.options.maxBounds);
      var done = function () { if (then) setTimeout(then, 0); };
      if (!ready || opts.animate === false || reduced() || !L.Browser.any3d) {
        this._stop(); flying = false;
        this.setView(center, zoom, { animate: false });
        done(); return this;
      }
      this._stop();
      if (this.smoothZoom && this.smoothZoom._drop) this.smoothZoom._drop();
      var from = this.project(this.getCenter(), startZoom), to = this.project(center, startZoom), size = this.getSize();
      var dist = to.distanceTo(from);
      if (dist < 1 && Math.abs(zoom - startZoom) < 0.005) { done(); return this; }

      // The path is the one Leaflet's flyTo uses (van Wijk and Nuij, "Smooth and efficient zooming and
      // panning"): pull back just far enough to keep both ends in sight, then come in. What differs here:
      // the timing (slow, quick, slow), a short fixed range of durations, a floor at the map's least zoom,
      // and every frame is sent as a continuous zoom so vector layers are redrawn on the way.
      var w0 = Math.max(size.x, size.y), w1 = w0 * this.getZoomScale(startZoom, zoom), u1 = dist || 1, rho = 1.42, rho2 = rho * rho;
      function r(i) {
        var s1 = i ? -1 : 1, s2 = i ? w1 : w0, t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1, b1 = 2 * s2 * rho2 * u1, b = t1 / b1,
          sq = Math.sqrt(b * b + 1) - b;
        return sq < 0.000000001 ? -18 : Math.log(sq);
      }
      var r0 = r(0), S = (r(1) - r0) / rho;
      function w(s) { return w0 * (cosh(r0) / cosh(r0 + rho * s)); }
      function u(s) { return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2; }
      var dur = opts.duration ? opts.duration * 1000 : Math.max(o.glideMin, Math.min(o.glideMax, 1000 * S * 0.8));
      var minZ = this.getMinZoom(), t0 = now();

      function frame() {
        var t = (now() - t0) / dur, s, c, z;
        if (t < 1) {
          s = ease(t) * S;
          c = self.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom);
          z = Math.max(minZ, self.getScaleZoom(w0 / w(s), startZoom));
          self._flyToFrame = L.Util.requestAnimFrame(frame, self);      // map._stop() (a drag, a wheel turn) cancels this
          self._move(c, z, { flyTo: true, pinch: true, round: false });
        } else {
          flying = false;
          self._move(center, zoom)._moveEnd(true);
          done();
        }
      }
      flying = true;
      this._moveStart(true, false);
      frame();
      return this;
    };

    map.glideToBounds = function (bounds, opts) {
      opts = opts || {};
      bounds = L.latLngBounds(bounds);
      if (!bounds.isValid()) return this;
      var t = this._getBoundsCenterZoom(bounds, opts);
      return this.glideTo(t.center, t.zoom, opts);
    };

    // A flight that was cut short by a drag can leave the zoom between two levels: ease on to the nearest one.
    map.on('moveend', function () {
      if (!flying) return;
      flying = false;
      var z = map.getZoom(), rz = Math.round(z);
      if (Math.abs(z - rz) > 0.001) setTimeout(function () { map.glideTo(map.getCenter(), rz, { duration: 0.25 }); }, 0);
    });

    map._motion = { options: o, ghosts: function () { return ghosts.length; }, flying: function () { return flying; }, ready: function () { return ready; } };
  }

  L.Map.mergeOptions({ motion: false });
  L.Map.addInitHook(function () { setup(this); });
})();
