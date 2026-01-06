/* global L, getPos, haversineMeters, fmtMeters, measureToPoi, measureNearest */
"use strict";

/* Toszkána és Umbria oldal logika */

const DAY_ID = "toscana-umbria";
const MAX_SEL = 10;
const LS_KEY = "sel_" + DAY_ID;

const POIS = [
  { id: "p1", name: "Firenze, történelmi központ (Duomo környéke)", lat: 43.769600, lon: 11.255800 },
  { id: "p2", name: "Siena, történelmi központ", lat: 43.318800, lon: 11.330800 },
  { id: "p3", name: "Pisa, Piazza del Duomo", lat: 43.723100, lon: 10.396600 },
  { id: "p4", name: "San Gimignano, óváros és tornyok", lat: 43.467300, lon: 11.043100 },
  { id: "p5", name: "Val d’Orcia, tájkép Pienza környékén", lat: 43.077700, lon: 11.679200 },
  { id: "p6", name: "Lucca, városfal és óváros", lat: 43.842900, lon: 10.502700 },
  { id: "p7", name: "Chianti Classico, Greve in Chianti környéke", lat: 43.585700, lon: 11.316900 },
  { id: "p8", name: "Arezzo, óváros", lat: 43.463300, lon: 11.879600 },
  { id: "p9", name: "Volterra, etruszk városmag", lat: 43.401800, lon: 10.860500 },
  { id: "p10", name: "Montepulciano, dombtető és borváros", lat: 43.098700, lon: 11.787200 },
  { id: "p11", name: "Pienza, reneszánsz ideális város", lat: 43.077700, lon: 11.679200 },
  { id: "p12", name: "Montalcino, erőd és borvidék", lat: 43.057600, lon: 11.489000 },
  { id: "p13", name: "Cortona, etruszk falak és panoráma", lat: 43.274900, lon: 11.986100 },
  { id: "p14", name: "Abbazia di San Galgano, tető nélküli apátság", lat: 43.149400, lon: 11.155400 },
  { id: "p15", name: "Pitigliano, tufasziklára épült város", lat: 42.633900, lon: 11.674300 },
  { id: "p16", name: "Sovana, román kori székesegyház és etruszk környezet", lat: 42.656800, lon: 11.644700 },
  { id: "p17", name: "Saturnia, termálvidék", lat: 42.666400, lon: 11.504200 },
  { id: "p18", name: "Cascate del Mulino, Saturnia természetes vízesései", lat: 42.648300, lon: 11.512700 },
  { id: "p19", name: "Bagni San Filippo, Fehér bálna termálképződmény", lat: 42.926700, lon: 11.700700 },
  { id: "p20", name: "Isola d’Elba, Portoferraio", lat: 42.813500, lon: 10.312900 },
  { id: "p21", name: "Parco della Maremma, Alberese", lat: 42.672000, lon: 11.105000 },
  { id: "p22", name: "Carrara, márványbányák környéke (Torano térség)", lat: 44.111000, lon: 10.133000 },
  { id: "p23", name: "Monteriggioni, falakkal körbezárt település", lat: 43.389800, lon: 11.223500 },
  { id: "p24", name: "Fiesole, római színház és firenzei panoráma", lat: 43.805400, lon: 11.293700 },
  { id: "p25", name: "Populonia, etruszk örökség és tenger közeli hegyfok", lat: 42.989400, lon: 10.491400 },
  { id: "p26", name: "Monte Argentario, Porto Santo Stefano", lat: 42.438600, lon: 11.119800 },
  { id: "p27", name: "Larderello, geotermikus vidék", lat: 43.235700, lon: 10.861300 },
  { id: "p28", name: "Abbazia di Monte Oliveto Maggiore, bencés apátság", lat: 43.175000, lon: 11.541900 },
  { id: "p29", name: "Santuario della Verna, zarándokhely a hegyen", lat: 43.707300, lon: 11.931300 },
  { id: "p30", name: "Grotta del Vento, barlang a Garfagnanában", lat: 44.033700, lon: 10.357900 },
  { id: "p31", name: "Assisi, Basilica di San Francesco", lat: 43.071500, lon: 12.603300 },
  { id: "p32", name: "Perugia, történelmi központ", lat: 43.110700, lon: 12.390800 },
  { id: "p33", name: "Orvieto, dóm és tufaszikla város", lat: 42.718500, lon: 12.111600 },
  { id: "p34", name: "Spoleto, óváros és erődvárosi látkép", lat: 42.740300, lon: 12.738800 },
  { id: "p35", name: "Gubbio, középkori kőváros", lat: 43.352000, lon: 12.579600 },
  { id: "p36", name: "Cascata delle Marmore, vízesés", lat: 42.553300, lon: 12.718300 },
  { id: "p37", name: "Lago Trasimeno, Passignano sul Trasimeno", lat: 43.188200, lon: 12.132700 },
  { id: "p38", name: "Norcia, hegyvidéki város", lat: 42.793900, lon: 13.094900 },
  { id: "p39", name: "Castelluccio di Norcia, Pian Grande", lat: 42.813700, lon: 13.190600 },
  { id: "p40", name: "Montefalco, bor és panoráma", lat: 42.892500, lon: 12.648200 },
  { id: "p41", name: "Spello, virágos kőváros", lat: 42.991300, lon: 12.671200 },
  { id: "p42", name: "Todi, történelmi központ", lat: 42.780700, lon: 12.409800 },
  { id: "p43", name: "Narni, sziklaváros hangulat", lat: 42.517800, lon: 12.515000 },
  { id: "p44", name: "Bevagna, kisvárosi középkor", lat: 42.932200, lon: 12.607500 },
  { id: "p45", name: "Trevi, dombtető és olajligetek", lat: 42.877100, lon: 12.748600 },
  { id: "p46", name: "Cascia, Santa Rita kegyhelye", lat: 42.719700, lon: 13.014600 },
  { id: "p47", name: "Carsulae, régészeti park", lat: 42.637200, lon: 12.554300 },
  { id: "p48", name: "Tempietto del Clitunno, kis templom", lat: 42.842200, lon: 12.756900 },
  { id: "p49", name: "Fonti del Clitunno, forrásvidék", lat: 42.822100, lon: 12.783300 },
  { id: "p50", name: "Abbazia di Sassovivo, apátság Foligno mellett", lat: 42.956700, lon: 12.761900 },
  { id: "p51", name: "La Scarzuola, különleges építészeti és szimbolikus hely", lat: 42.898800, lon: 12.153300 },
  { id: "p52", name: "Città della Pieve, umbriai határváros", lat: 42.953100, lon: 12.005200 },
  { id: "p53", name: "Panicale, kilátós kisváros a tó közelében", lat: 43.028000, lon: 12.100500 },
  { id: "p54", name: "Lago di Piediluco, tó Terni közelében", lat: 42.533600, lon: 12.747600 },
  { id: "p55", name: "Abbazia di San Pietro in Valle, Ferentillo", lat: 42.645400, lon: 12.811500 },
  { id: "p56", name: "Rocca Albornoziana, Spoleto vára", lat: 42.734300, lon: 12.741900 },
  { id: "p57", name: "Ponte delle Torri, Spoleto híres hídja", lat: 42.733100, lon: 12.743600 },
  { id: "p58", name: "Basilica di Santa Maria degli Angeli, Assisi alatt", lat: 43.055000, lon: 12.575000 },
  { id: "p59", name: "Eremo delle Carceri, Assisi felett", lat: 43.063100, lon: 12.652100 },
  { id: "p60", name: "Pozzo di San Patrizio, Orvieto kútja", lat: 42.722500, lon: 12.120300 }
];

/* ===== segédek ===== */

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setState(id, txt) {
  const el = document.querySelector(`[data-state="${id}"]`);
  if (el) el.textContent = txt;
}

function setDist(id, txt) {
  const el = document.querySelector(`[data-dist="${id}"]`);
  if (el) el.textContent = "távolság: " + txt;
}

function scrollToPoi(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ===== kijelölés ===== */

let selected = [];

function loadSelected() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    const ok = arr.filter(id => POIS.some(p => p.id === id));
    return ok.slice(0, MAX_SEL);
  } catch {
    return [];
  }
}

function saveSelected() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(selected));
  } catch {
    /* ignore */
  }
}

function buildGmapsUrl(originLatLon) {
  if (selected.length === 0) return null;

  const pts = selected
    .map(id => POIS.find(p => p.id === id))
    .filter(Boolean)
    .map(p => `${p.lat},${p.lon}`);

  if (pts.length === 0) return null;

  /* ha nincs aktuális hely, marad a régi logika */
  if (!originLatLon) {
    if (pts.length === 1) {
      return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(pts[0]) + "&travelmode=driving";
    }

    const origin = pts[0];
    const destination = pts[pts.length - 1];
    const middle = pts.slice(1, -1);

    let url = "https://www.google.com/maps/dir/?api=1"
      + "&origin=" + encodeURIComponent(origin)
      + "&destination=" + encodeURIComponent(destination)
      + "&travelmode=driving";

    if (middle.length) {
      url += "&waypoints=" + encodeURIComponent(middle.join("|"));
    }

    return url;
  }

  /* új: origin legyen az aktuális hely */
  const origin = originLatLon;

  if (pts.length === 1) {
    return "https://www.google.com/maps/dir/?api=1"
      + "&origin=" + encodeURIComponent(origin)
      + "&destination=" + encodeURIComponent(pts[0])
      + "&travelmode=driving";
  }

  const destination = pts[pts.length - 1];
  const middle = pts.slice(0, -1);

  let url = "https://www.google.com/maps/dir/?api=1"
    + "&origin=" + encodeURIComponent(origin)
    + "&destination=" + encodeURIComponent(destination)
    + "&travelmode=driving";

  if (middle.length) {
    url += "&waypoints=" + encodeURIComponent(middle.join("|"));
  }

  return url;
}

async function openSelectedRoute() {
  if (selected.length === 0) {
    alert("Pipálj ki legalább 1 POI pontot.");
    return;
  }

  let originLatLon = null;

  try {
    if (typeof getPos === "function") {
      const pos = await getPos();
      originLatLon = `${pos.coords.latitude},${pos.coords.longitude}`;
    }
  } catch {
    /* ignore */
  }

  const url = buildGmapsUrl(originLatLon);
  if (!url) {
    alert("Pipálj ki legalább 1 POI pontot.");
    return;
  }
  window.open(url, "_blank", "noopener");
}

function setSelectedState(id, on) {
  const idx = selected.indexOf(id);

  if (on) {
    if (idx >= 0) return;
    if (selected.length >= MAX_SEL) {
      alert("Maximum 10 POI választható ki a navira.");
      refreshSelectionUi();
      return;
    }
    selected.push(id);
  } else {
    if (idx < 0) return;
    selected.splice(idx, 1);
  }

  saveSelected();
  refreshSelectionUi();
}

function moveSelected(id, dir) {
  const idx = selected.indexOf(id);
  if (idx < 0) return;
  const ni = idx + dir;
  if (ni < 0 || ni >= selected.length) return;
  const tmp = selected[idx];
  selected[idx] = selected[ni];
  selected[ni] = tmp;
  saveSelected();
  refreshSelectionUi();
}

/* ===== pick UI injektálás ===== */

function ensurePoiPickControls() {
  for (const p of POIS) {
    const card = document.getElementById(p.id);
    if (!card) continue;

    const head = card.querySelector(".poi-head");
    if (!head) continue;

    const left = head.firstElementChild;
    if (!left) continue;

    if (left.querySelector(`.pick-ui[data-pick="${p.id}"]`)) continue;

    const ui = document.createElement("div");
    ui.className = "pick-ui";
    ui.setAttribute("data-pick", p.id);

    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "poi-check";
    check.setAttribute("data-sel", p.id);

    const badge = document.createElement("div");
    badge.className = "pick-badge";
    badge.setAttribute("data-selpos", p.id);
    badge.textContent = `—/${MAX_SEL}`;

    const arrows = document.createElement("div");
    arrows.className = "pick-arrows";

    const up = document.createElement("button");
    up.type = "button";
    up.className = "pick-arrow";
    up.textContent = "▲";
    up.setAttribute("data-move", "up");
    up.setAttribute("data-id", p.id);

    const down = document.createElement("button");
    down.type = "button";
    down.className = "pick-arrow";
    down.textContent = "▼";
    down.setAttribute("data-move", "down");
    down.setAttribute("data-id", p.id);

    arrows.appendChild(up);
    arrows.appendChild(down);

    ui.appendChild(check);
    ui.appendChild(badge);
    ui.appendChild(arrows);

    left.appendChild(ui);
  }
}

/* ===== térkép ===== */

let map = null;
let userMarker = null;

const poiMarkers = new Map();
const __selIconCache = new Map();

let userIconRed = null;
let poiIconBlue = null;

let __invalidateTimer = null;
function invalidateMapBurst() {
  if (!map) return;

  const fire = (ms) => setTimeout(() => { try { map.invalidateSize(); } catch { /* ignore */ } }, ms);

  fire(0);
  fire(120);
  fire(260);
  fire(520);

  if (__invalidateTimer) clearTimeout(__invalidateTimer);
  __invalidateTimer = setTimeout(() => { try { map.invalidateSize(); } catch { /* ignore */ } }, 900);
}

function initIcons() {
  if (!window.L) return;

  userIconRed = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  poiIconBlue = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

function numberedGreenIcon(n) {
  const key = String(n);
  if (__selIconCache.has(key)) return __selIconCache.get(key);

  const greenUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png";

  const html =
    '<div style="position:relative;width:25px;height:41px;">' +
    '<img src="' + greenUrl + '" style="width:25px;height:41px;display:block;" />' +
    '<div style="position:absolute;left:0;top:3px;width:25px;height:26px;display:flex;align-items:center;justify-content:center;">' +
    '<span style="display:inline-block;min-width:18px;padding:1px 5px;border-radius:999px;' +
    'background:rgba(255,255,255,0.88);color:#111;font-weight:900;font-size:12px;' +
    'line-height:16px;text-align:center;border:1px solid rgba(0,0,0,0.18);' +
    'box-shadow:0 1px 2px rgba(0,0,0,0.25);">' + key + '</span>' +
    "</div>" +
    "</div>";

  const icon = L.divIcon({
    className: "",
    html: html,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  __selIconCache.set(key, icon);
  return icon;
}

function wireMarkerTap(marker, poiId) {
  let lastTap = 0;
  let singleTimer = null;

  marker.on("click", () => {
    const now = Date.now();

    if (now - lastTap < 360) {
      lastTap = 0;
      if (singleTimer) clearTimeout(singleTimer);
      scrollToPoi(poiId);
      return;
    }

    lastTap = now;

    if (singleTimer) clearTimeout(singleTimer);
    singleTimer = setTimeout(() => {
      marker.openPopup();
    }, 380);
  });

  marker.on("dblclick", (e) => {
    if (e && e.originalEvent && typeof e.originalEvent.preventDefault === "function") {
      e.originalEvent.preventDefault();
    }
    scrollToPoi(poiId);
  });
}

function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl || !window.L) return;

  if (map) {
    invalidateMapBurst();
    return;
  }

  initIcons();

  map = L.map("map", { doubleClickZoom: false });
  map.doubleClickZoom.disable();

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap"
  }).addTo(map);

  const bounds = [];

  for (const p of POIS) {
    const num = parseInt(String(p.id).replace(/^p/i, ""), 10);
    const title = `${num}. ${p.name}`;

    const marker = L.marker([p.lat, p.lon], { icon: poiIconBlue }).addTo(map);
    marker.bindPopup(`<b>${escapeHtml(title)}</b>`);
    poiMarkers.set(p.id, marker);

    wireMarkerTap(marker, p.id);
    bounds.push([p.lat, p.lon]);
  }

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [30, 30] });
  }

  window.map = map;

  /* Desktop MapDock + CSS transform esetén ez a legstabilabb */
  if (typeof ResizeObserver !== "undefined") {
    try {
      const ro = new ResizeObserver(() => invalidateMapBurst());
      ro.observe(mapEl);
    } catch {
      /* ignore */
    }
  }

  window.addEventListener("load", () => invalidateMapBurst());
  invalidateMapBurst();
}

/* ===== UI frissítés ===== */

function refreshSelectionUi() {
  const countEl = document.getElementById("selCounter");
  if (countEl) countEl.textContent = `Kijelöltek: ${selected.length}/${MAX_SEL}`;

  const gbtn = document.getElementById("btnNaviSelected");
  if (gbtn) gbtn.disabled = (selected.length === 0);

  for (const p of POIS) {
    const idx = selected.indexOf(p.id);
    const on = idx >= 0;

    const card = document.getElementById(p.id);
    if (card) card.classList.toggle("selected", on);

    const pos = document.querySelector(`[data-selpos="${p.id}"]`);
    if (pos) pos.textContent = on ? `${idx + 1}/${MAX_SEL}` : `—/${MAX_SEL}`;

    const cb = document.querySelector(`input[type="checkbox"][data-sel="${p.id}"]`);
    if (cb) cb.checked = on;

    const up = document.querySelector(`button[data-move="up"][data-id="${p.id}"]`);
    const down = document.querySelector(`button[data-move="down"][data-id="${p.id}"]`);
    if (up) up.disabled = (!on || idx === 0);
    if (down) down.disabled = (!on || idx === selected.length - 1);

    const m = poiMarkers.get(p.id);
    if (m && window.L) {
      if (on) m.setIcon(numberedGreenIcon(idx + 1));
      else m.setIcon(poiIconBlue);
      m.setZIndexOffset(on ? 800 : 0);
    }
  }

  invalidateMapBurst();
}

/* ===== távolság mérés ===== */

async function measureAll(scrollToNearest) {
  try {
    if (typeof getPos !== "function") return;

    const pos = await getPos();
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    let nearest = null;

    for (const p of POIS) {
      if (typeof haversineMeters !== "function" || typeof fmtMeters !== "function") break;

      const dist = haversineMeters(lat, lon, p.lat, p.lon);
      setDist(p.id, fmtMeters(dist));
      setState(p.id, "mérés: frissítve");

      if (!nearest || dist < nearest.dist) nearest = { id: p.id, dist };
    }

    if (scrollToNearest && nearest) scrollToPoi(nearest.id);

    if (map && window.L && userIconRed) {
      if (!userMarker) {
        userMarker = L.marker([lat, lon], { icon: userIconRed })
          .addTo(map)
          .bindPopup("Itt vagyok");
      } else {
        userMarker.setLatLng([lat, lon]);
      }
      invalidateMapBurst();
    }
  } catch {
    const n = document.getElementById("gpsNotice");
    if (n) n.style.display = "block";
  }
}

/* ===== MapDock ===== */

function initMapDock() {
  const dock = document.getElementById("mapDock") || document.querySelector(".map-dock");
  const handle = document.getElementById("mapDockHandle") || dock?.querySelector(".map-dock-handle");
  const btn = document.getElementById("mapDockToggle") || dock?.querySelector(".map-dock-toggle");
  if (!dock || !handle) return;

  const KEY = "mapDockOpen_" + DAY_ID;

  const wantOpenDefault = window.matchMedia("(min-width: 900px)").matches;
  let isOpen = wantOpenDefault;

  try {
    const raw = localStorage.getItem(KEY);
    if (raw === "1") isOpen = true;
    if (raw === "0") isOpen = false;
  } catch { /* ignore */ }

  function apply(open) {
    dock.classList.toggle("open", open);

    if (btn) {
      btn.textContent = open ? "▼" : "▲";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    try { localStorage.setItem(KEY, open ? "1" : "0"); } catch { /* ignore */ }

    invalidateMapBurst();
  }

  apply(isOpen);

  const toggle = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    isOpen = !dock.classList.contains("open");
    apply(isOpen);
  };

  handle.addEventListener("click", toggle, { passive: false });

  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle(e);
    }, { passive: false });
  }

  dock.addEventListener("transitionend", () => invalidateMapBurst());
}

/* ===== események ===== */

function wireUi() {
  document.getElementById("btnNaviSelected")?.addEventListener("click", openSelectedRoute);

  document.getElementById("btnClearSelected")?.addEventListener("click", () => {
    selected = [];
    saveSelected();
    refreshSelectionUi();
  });

  document.getElementById("btnNearest")?.addEventListener("click", async () => {
    try {
      if (typeof measureNearest !== "function") return;
      const r = await measureNearest(DAY_ID, POIS);
      if (r && r.poi) {
        await measureAll(false);
        scrollToPoi(r.poi.id);
      }
    } catch {
      const n = document.getElementById("gpsNotice");
      if (n) n.style.display = "block";
    }
  });

  document.addEventListener("change", (ev) => {
    const t = ev.target;
    if (!(t instanceof Element)) return;

    if (t.matches('input[type="checkbox"][data-sel]')) {
      const id = t.getAttribute("data-sel");
      if (!id) return;
      setSelectedState(id, t.checked);
    }
  });

  document.addEventListener("click", (ev) => {
    const t = ev.target;
    if (!(t instanceof Element)) return;

    const mv = t.closest("button[data-move][data-id]");
    if (mv) {
      const id = mv.getAttribute("data-id");
      const dir = mv.getAttribute("data-move") === "up" ? -1 : 1;
      if (id) moveSelected(id, dir);
      return;
    }

    const selNavMini = t.closest("[data-nav-selected]");
    if (selNavMini) {
      openSelectedRoute();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  selected = loadSelected();

  ensurePoiPickControls();
  wireUi();
  initMapDock();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initMap();
      refreshSelectionUi();
      invalidateMapBurst();
    });
  });

  measureAll(false);
  setTimeout(() => measureAll(false), 5000);

  window.addEventListener("resize", () => invalidateMapBurst());
});
