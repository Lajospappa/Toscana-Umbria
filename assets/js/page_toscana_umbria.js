/* global L, getPos, haversineMeters, fmtMeters, measureToPoi, measureNearest */
/* Toszkána és Umbria oldal logika */

"use strict";

const DAY_ID = "toscana-umbria";
const MAX_SEL = 10;
const LS_KEY = "sel_" + DAY_ID;

const POIS = [
  { id: "p1",  name: "Firenze, történelmi központ (Duomo környéke)", lat: 43.769600, lon: 11.255800 },
  { id: "p2",  name: "Siena, történelmi központ", lat: 43.318800, lon: 11.330800 },
  { id: "p3",  name: "Pisa, Piazza del Duomo", lat: 43.723100, lon: 10.396600 },
  { id: "p4",  name: "San Gimignano, óváros és tornyok", lat: 43.467300, lon: 11.043100 },
  { id: "p5",  name: "Val d’Orcia, tájkép Pienza környékén", lat: 43.077700, lon: 11.679200 },
  { id: "p6",  name: "Lucca, városfal és óváros", lat: 43.842900, lon: 10.502700 },
  { id: "p7",  name: "Chianti Classico, Greve in Chianti környéke", lat: 43.585700, lon: 11.316900 },
  { id: "p8",  name: "Arezzo, óváros", lat: 43.463300, lon: 11.879600 },
  { id: "p9",  name: "Volterra, etruszk városmag", lat: 43.401800, lon: 10.860500 },
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

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/* ===== KIJELÖLÉS LOGIKA ===== */

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

function flashSelbar() {
  const bar = document.getElementById("selbar");
  if (!bar) return;
  bar.classList.remove("flash");
  void bar.offsetWidth;
  bar.classList.add("flash");
}

function setSelectedState(id, on) {
  const idx = selected.indexOf(id);

  if (on) {
    if (idx >= 0) return;
    if (selected.length >= MAX_SEL) {
      flashSelbar();
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

function toggleSelected(id) {
  setSelectedState(id, selected.indexOf(id) < 0);
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

function buildGmapsUrl() {
  if (selected.length === 0) return null;

  const pts = selected
    .map(id => POIS.find(p => p.id === id))
    .filter(Boolean)
    .map(p => `${p.lat},${p.lon}`);

  if (pts.length === 0) return null;

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

/* ===== KIJELÖLÉS UI BEKÖTÉS ===== */

function ensureMapFrame() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const parent = mapEl.parentElement;
  if (!parent) return;

  if (!parent.classList.contains("map-frame")) {
    const wrap = document.createElement("div");
    wrap.className = "map-frame";
    parent.insertBefore(wrap, mapEl);
    wrap.appendChild(mapEl);
  }
}

function removeLegacySelectionBars() {
  const legacyBtns = Array.from(document.querySelectorAll("button"))
    .filter(b => (b.textContent || "").trim() === "Navi (kijelöltek)");

  for (const b of legacyBtns) {
    let el = b;
    for (let i = 0; i < 7; i++) {
      if (!el) break;
      const t = el.textContent || "";
      if (t.includes("Kijelöltek:") && t.includes("Törlés") && t.includes("Navi (kijelöltek)")) {
        el.classList.add("legacy-selbar");
        el.remove();
        break;
      }
      el = el.parentElement;
    }
  }
}

function ensureSelbar() {
  removeLegacySelectionBars();

  let bar = document.getElementById("selbar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "selbar";
    bar.innerHTML = `
      <div class="selcount" id="selCount">Kijelöltek: 0/${MAX_SEL}</div>
      <button class="btn btn-gmaps" id="btnGmaps" type="button">🧭 Gmaps navigáció indítása</button>
      <button class="btn btn-clear" id="btnClear" type="button">Törlés</button>
    `;

    const topbar = document.querySelector(".topbar");
    if (topbar && typeof topbar.after === "function") {
      topbar.after(bar);
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }
  } else {
    const topbar = document.querySelector(".topbar");
    if (topbar && typeof topbar.after === "function") {
      topbar.after(bar);
    }
  }

  document.getElementById("btnGmaps")?.addEventListener("click", () => {
    const url = buildGmapsUrl();
    if (!url) return;
    window.open(url, "_blank", "noopener");
  });

  document.getElementById("btnClear")?.addEventListener("click", () => {
    selected = [];
    saveSelected();
    refreshSelectionUi();
  });
}

function findLegacyPickRow(card) {
  if (!card) return null;

  let row = card.querySelector(".pickrow, .selrow, .selectrow, .pickbar, .selctl");
  if (row) return row;

  const cb = card.querySelector('input[type="checkbox"]');
  if (cb) {
    const maybe = cb.closest("div");
    if (maybe && maybe !== card) return maybe;
  }

  const btns = Array.from(card.querySelectorAll("button"));
  const pickBtn = btns.find(b => ((b.textContent || "").toLowerCase().includes("kijelöl")));
  if (pickBtn) {
    const wrap = pickBtn.closest("div");
    if (wrap) return wrap;
  }

  return null;
}

function ensurePoiPickControls() {
  for (const p of POIS) {
    const card = document.getElementById(p.id);
    if (!card) continue;

    const head = card.querySelector(".poi-head");
    if (!head) continue;

    let ctl = head.querySelector(`.selctl[data-selwrap="${p.id}"]`);

    if (!ctl) {
      const legacy = findLegacyPickRow(card);

      ctl = document.createElement("div");
      ctl.className = "selctl";
      ctl.setAttribute("data-selwrap", p.id);

      const inner = document.createElement("div");
      inner.className = "selbox";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.className = "selcheck";
      cb.setAttribute("data-sel", p.id);

      const lbl = document.createElement("span");
      lbl.textContent = "kijelöl";

      inner.appendChild(cb);
      inner.appendChild(lbl);

      const pos = document.createElement("span");
      pos.className = "selpos";
      pos.setAttribute("data-selpos", p.id);
      pos.textContent = `—/${MAX_SEL}`;

      const up = document.createElement("button");
      up.type = "button";
      up.className = "btn-mini";
      up.setAttribute("data-move", "up");
      up.setAttribute("data-id", p.id);
      up.textContent = "↑";

      const down = document.createElement("button");
      down.type = "button";
      down.className = "btn-mini";
      down.setAttribute("data-move", "down");
      down.setAttribute("data-id", p.id);
      down.textContent = "↓";

      ctl.appendChild(inner);
      ctl.appendChild(pos);
      ctl.appendChild(up);
      ctl.appendChild(down);

      if (legacy && legacy !== ctl) {
        legacy.remove();
      }

      const measureBtn = head.querySelector(`[data-measure="${p.id}"]`);
      if (measureBtn && measureBtn.parentElement) {
        measureBtn.parentElement.insertBefore(ctl, measureBtn);
      } else {
        head.appendChild(ctl);
      }
    }
  }
}

function refreshSelectionUi() {
  const countEl = document.getElementById("selCount");
  if (countEl) countEl.textContent = `Kijelöltek: ${selected.length}/${MAX_SEL}`;

  const gbtn = document.getElementById("btnGmaps");
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

    const up = document.querySelector(`[data-move="up"][data-id="${p.id}"]`);
    const down = document.querySelector(`[data-move="down"][data-id="${p.id}"]`);
    if (up) up.disabled = (!on || idx === 0);
    if (down) down.disabled = (!on || idx === selected.length - 1);

    const m = poiMarkers.get(p.id);
    if (m) {
      if (on) {
      m.setIcon(numberedGreenIcon(idx + 1));
    } else {
      m.setIcon(poiIconBlue);
    }
      m.setZIndexOffset(on ? 800 : 0);
    }
  }
}

/* ===== TÁVOLSÁG MÉRÉS ===== */

async function measureAll(scrollToNearest) {
  try {
    const pos = await getPos();
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    let nearest = null;

    for (const p of POIS) {
      const dist = haversineMeters(lat, lon, p.lat, p.lon);
      setDist(p.id, fmtMeters(dist));
      setState(p.id, "mérés: frissítve");

      if (!nearest || dist < nearest.dist) {
        nearest = { id: p.id, dist };
      }
    }

    if (scrollToNearest && nearest) {
      scrollToPoi(nearest.id);
    }

    if (map) {
      if (!userMarker) {
        userMarker = L.marker([lat, lon], { icon: userIconRed })
          .addTo(map)
          .bindPopup("Itt vagyok");
      } else {
        userMarker.setLatLng([lat, lon]);
      }
    }
  } catch (e) {
    const n = document.getElementById("gpsNotice");
    if (n) n.style.display = "block";
  }
}

async function measureOne(id) {
  const poi = POIS.find(x => x.id === id);
  if (!poi) return;

  try {
    const r = await measureToPoi(DAY_ID, poi);
    setDist(id, fmtMeters(r.dist));
    setState(id, "mérés: " + r.ind.text);

    const btn = document.querySelector(`[data-measure="${id}"]`);
    if (btn) btn.classList.add("active");
  } catch (e) {
    const n = document.getElementById("gpsNotice");
    if (n) n.style.display = "block";
  }
}

/* ===== TÉRKÉP ===== */

let map = null;
let userMarker = null;

const userIconRed = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const poiIconBlue = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const poiIconGreen = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});



const __selIconCache = new Map();

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
      '</div>' +
    '</div>';

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
const poiMarkers = new Map();

function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl || !window.L) return;

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

    let clickTimer = null;
    let suppressClickUntil = 0;

    marker.on("click", () => {
      const now = Date.now();
      if (now < suppressClickUntil) return;

      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        marker.openPopup();
      }, 220);
    });

    marker.on("dblclick", (e) => {
      suppressClickUntil = Date.now() + 450;
      clearTimeout(clickTimer);

      if (e && e.originalEvent && typeof e.originalEvent.preventDefault === "function") {
        e.originalEvent.preventDefault();
      }
      scrollToPoi(p.id);
    });

    bounds.push([p.lat, p.lon]);
  }

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [30, 30] });
  }
}

function wireUi() {
  document.getElementById("btnNearest")?.addEventListener("click", async () => {
    try {
      const r = await measureNearest(DAY_ID, POIS);
      if (r && r.poi) {
        await measureAll(false);
        scrollToPoi(r.poi.id);
      }
    } catch (e) {
      const n = document.getElementById("gpsNotice");
      if (n) n.style.display = "block";
    }
  });

  document.getElementById("btnRandom")?.addEventListener("click", () => {
    const pick = POIS[Math.floor(Math.random() * POIS.length)];
    if (pick) scrollToPoi(pick.id);
  });

  document.querySelectorAll("[data-measure]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-measure");
      if (id) measureOne(id);
    });
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

    const mv = t.closest("[data-move][data-id]");
    if (mv) {
      const id = mv.getAttribute("data-id");
      const dir = mv.getAttribute("data-move") === "up" ? -1 : 1;
      if (id) moveSelected(id, dir);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  selected = loadSelected();

  ensureMapFrame();
  ensureSelbar();
  ensurePoiPickControls();

  wireUi();
  initMap();

  refreshSelectionUi();

  measureAll(false);
  setTimeout(() => measureAll(false), 5000);
});

