/* =========================================================
   ✏️  EDIT YOUR LETTER HERE
   ========================================================= */
const LETTER = {
  meta: ["To: Nica Jane Albaran", "From: Sabrina Bakiao"],
  to: "Dear my love,",
  body: [
    "I'm really sorry for my behavior over the past few days. I'm sorry for the times I made you feel like I didn't trust you.",
    "I know that my actions and words may have hurt you, and it breaks my heart to know that I made you feel that way. You mean so much to me, and I never want you to feel like you have to prove your love to me.",
    "I know that trust is important in our relationship, and I'm sorry for making you feel like I didn't believe in you. I know that my jealousy has been too much because of what happened a few months ago, but please know that my love for you has never changed. I never want my fears or doubts to hurt the person who means the world to me.",
    "No matter what happens, I will always love you, and I hope you never forget how much you mean to me. I love you always, my love, and I hope you never leave me.",
  ],
  from: "Always yours, Sabrina",
};

/* =========================================================
   The question shown before the envelope.
   "No" runs away and changes its words each time; only "Yes" works.
   ========================================================= */
const ASK = {
  question: "I'm really sorry, my love. Please forgive me.",
  note: "There's a letter waiting for you mylove.",
  yes: "Yes",
  no: ["No", "Sure naka ana?", "Hunahunaa og maayo love", "Please?", "Mag binuotan nako promise love",
       "Sakita sad ana love oi", "Oi ayaw ni pindota", "Tarong ara love", "Pindot nalang gud yes"],
};

/* =========================================================
   The name shown on the envelope and under the bouquet
   ========================================================= */
const BOUQUET = {
  envelope: "For Nica Jane",
  label: "A bouquet for",
  name: "My Love",
  hint: "Drag to turn it around",
};

/* =========================================================
   Photos beside the letter. Put the files in the "photos"
   folder and list them here. Add or remove lines freely.
   A missing file shows a neutral placeholder.
   ========================================================= */
const PHOTOS = [
  { src: "photos/4.jpg", caption: "My favorite person", big: true, pos: "50% 35%" },
  { src: "photos/1.jpg", caption: "us" },
  { src: "photos/2.jpg", caption: "my favorite day" },
  { src: "photos/3.jpg", caption: "loml" },
];
/* ========================================================= */

const $ = (s) => document.querySelector(s);
const rnd = (a, b) => a + Math.random() * (b - a);
const deg = (r) => r * 180 / Math.PI;

/* =========================================================
   The bouquet, drawn as one SVG illustration
   ========================================================= */
const NS = 'http://www.w3.org/2000/svg';
function S(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function mulberry(a) {                       // seeded random: the bouquet looks the same every time
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rand = mulberry(11);
const rr = (a, b) => a + rand() * (b - a);

const svg = $('#bq');
const defs = S('defs', {}, svg);
function grad(id, stops, o, radial) {
  const g = S(radial ? 'radialGradient' : 'linearGradient', Object.assign(radial ? {} : { x1: 0, y1: 0, x2: 0, y2: 1 }, o || {}, { id }), defs);
  stops.forEach(([off, col, op]) => S('stop', { offset: off, 'stop-color': col, 'stop-opacity': op == null ? 1 : op }, g));
}
function filt(id, inner) {
  const f = S('filter', { id, x: '-30%', y: '-30%', width: '160%', height: '160%' }, defs);
  f.innerHTML = inner;
}

/* gradients */
grad('sheetBack',  [[0, '#eef6ff', .85], [.5, '#c9ddf5', .86], [1, '#9bbfe8', .92]]);
grad('sheetFront', [[0, '#fcfeff', .96], [.45, '#deecfb', .95], [1, '#b2d0f1', .97]]);
grad('sheetHi',    [[0, '#ffffff', .6], [1, '#ffffff', 0]]);
const TP = [
  ['#d3e3ff', '#7ba5ee', '#3f69cf'], ['#dde9ff', '#8fb5f2', '#4a78d8'],
  ['#c0d8ff', '#6c9aeb', '#2f58c0'], ['#e4eeff', '#9dbdf3', '#557fdc'],
];
TP.forEach(([hi, mid, lo], i) => {
  grad('tF' + i, [[0, hi], [.5, mid], [1, lo]]);
  grad('tS' + i, [[0, mid], [1, '#2a4ba6']]);
  grad('tB' + i, [[0, lo], [1, '#1d3880']]);
});
grad('petalA', [[0, '#ffe05a'], [.6, '#ffb820'], [1, '#e8870c']]);
grad('petalB', [[0, '#ffea85'], [1, '#f5a50f']]);
grad('disc', [[0, '#2d1806'], [.55, '#4d2b0e'], [1, '#85561e']], { cx: .45, cy: .4, r: .65 }, true);
grad('leaf', [[0, '#96e394'], [1, '#237a3a']], { x1: 0, y1: 1, x2: 1, y2: 0 });
grad('rib', [[0, '#4a72d4'], [.5, '#1d409c'], [1, '#0b2266']], { x1: 0, y1: 0, x2: 1, y2: 1 });
grad('ribTail', [[0, '#2e56b8'], [1, '#0a1f5e']], { x1: 0, y1: 0, x2: 1, y2: 0 });
grad('heartG', [[0, '#ffa8c8'], [1, '#e0457f']], { x1: 0, y1: 0, x2: 1, y2: 1 });
grad('floorG', [[0, '#ffffff', .95], [.6, '#e1edfb', .6], [1, '#e1edfb', 0]], { cx: .5, cy: .5, r: .5 }, true);
grad('stemG', [[0, '#2f8a45'], [.5, '#62c777'], [1, '#2f8a45']], { x1: 0, y1: 0, x2: 1, y2: 0 });
filt('blur6', '<feGaussianBlur stdDeviation="6"/>');
filt('ds', '<feDropShadow dx="0" dy="2" stdDeviation="2.4" flood-color="#1b3a78" flood-opacity=".26"/>');
filt('dsSoft', '<feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#2a4a80" flood-opacity=".22"/>');

const root = S('g', { transform: 'translate(40,60)' }, svg);   // everything below is drawn in a -40..440 x -60..580 space
const TX = 200, TY = 430;                                       // where the ribbon ties the stems
let TH = 0, PITCH = 0.38;                                       // turn angle and camera tilt (changed by dragging)
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const D2R = Math.PI / 180;

/* ground */
S('ellipse', { cx: 200, cy: 548, rx: 190, ry: 42, fill: 'url(#floorG)' }, root);
S('ellipse', { cx: 200, cy: 530, rx: 70, ry: 9, fill: '#2f5ca8', 'fill-opacity': .28, filter: 'url(#blur6)' }, root);

/* layers, back to front */
const backLayer = S('g', {}, root);
const stemLayer = S('g', { fill: 'none', 'stroke-linecap': 'round' }, root);
const tailLayer = S('g', {}, root);
const frontLayer = S('g', {}, root);
const bowLayer = S('g', {}, root);

/* a point on the bouquet (radius, angle round the stem, height) -> where it lands on screen */
function pos(r, phi, h) {
  const a = phi + TH, x = r * Math.sin(a), z = r * Math.cos(a);
  const cp = Math.cos(PITCH), sp = Math.sin(PITCH), s = 1 + z * .0011;
  return { x: TX + x * s, y: TY - (h * cp - z * sp) * s, s, d: z * cp + h * sp };
}

/* ---- smooth closed curve through points ---- */
function smooth(pts) {
  const n = pts.length, f = (v) => v.toFixed(1);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
  }
  return d + 'Z';
}
/* a soft, ruffled sheet of paper: pointed at the tie, wide and wavy at the top */
function sheetPts(L, W, seed, amp) {
  const r = mulberry(seed), f1 = r() * 6.28, f2 = r() * 6.28, pts = [];
  for (let i = 0; i < 52; i++) {
    const a = i / 52 * Math.PI * 2, s = (1 - Math.cos(a)) / 2;
    const ruff = 1 + amp * (Math.sin(7 * a + f1) * .6 + Math.sin(13 * a + f2) * .4) * (.3 + .7 * s);
    const x = W * Math.sin(a) * (.25 + .75 * Math.pow(s, .45)) * ruff;
    const y = -L * s * (1 + (a > 2.1 && a < 4.2 ? amp * .7 * Math.sin(9 * a + f2) : 0));
    pts.push([x, y]);
  }
  return pts;
}
const HEART = 'M0,2.6C-6,-2 -6,-6.2 -3,-6.2C-1.5,-6.2 0,-4.6 0,-3.5C0,-4.6 1.5,-6.2 3,-6.2C6,-6.2 6,-2 0,2.6Z';
function sheetNode(L, W, seed, fill, amp, hearts) {
  const g = S('g', {});
  const pts = sheetPts(L, W, seed, amp);
  S('path', { d: smooth(pts), fill: `url(#${fill})`, stroke: '#fff', 'stroke-opacity': .7, 'stroke-width': 1.2 }, g);
  S('path', { d: smooth(pts.map(([x, y]) => [x * .78, y * .88])), fill: 'url(#sheetHi)' }, g);
  for (let k = -1; k <= 1; k++) {
    const d = `M0,-8C${k * 9},${-L * .35} ${k * W * .22},${-L * .6} ${k * W * .26},${-L * .88}`;
    S('path', { d, fill: 'none', stroke: '#7ea6d6', 'stroke-opacity': .12, 'stroke-width': 2.2, transform: 'translate(2,1)' }, g);
    S('path', { d, fill: 'none', stroke: '#fff', 'stroke-opacity': .5, 'stroke-width': 1 }, g);
  }
  if (hearts) {
    for (let i = 0; i < 6; i++) {
      const y = -L * rr(.3, .82), x = rr(-.4, .4) * W * Math.sin(Math.acos(1 - 2 * (-y / L)));
      S('path', { d: HEART, fill: '#fff', 'fill-opacity': .85, transform: `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${rr(.8, 1.2).toFixed(2)})` }, g);
    }
  }
  return g;
}

/* ---- the wrap: three rings of sheets around the stems ---- */
const wraps = [];
function wrapRing(kind, n, off, L, W, alpha, fill, amp, hearts, seed0) {
  for (let i = 0; i < n; i++) {
    const l = kind === 'tall' ? L * (i % 2 ? .88 : 1.02) : L;
    wraps.push({ kind, L: l, al: alpha * D2R, phi: off * D2R + i * Math.PI * 2 / n, g: sheetNode(l, W, seed0 + i, fill, amp, hearts) });
  }
}
wrapRing('tall', 9, 0, 372, 104, 24, 'sheetBack', .05, false, 30);
wrapRing('flare', 8, 20, 235, 95, 46, 'sheetBack', .07, false, 50);
wrapRing('cone', 7, 10, 150, 66, 27, 'sheetFront', .06, true, 70);
wraps.forEach((w) => { backLayer.appendChild(w.g); });

/* ---- stems ---- */
function stemPaths(w) {
  const arr = [];
  if (w > 2) {
    arr.push(S('path', { stroke: '#1f6f36', 'stroke-width': w + 1.2, 'stroke-opacity': .55 }, stemLayer));
    arr.push(S('path', { stroke: '#4fb866', 'stroke-width': w }, stemLayer));
    arr.push(S('path', { stroke: '#a6ecb4', 'stroke-width': w * .3, 'stroke-opacity': .7, transform: 'translate(-.7,0)' }, stemLayer));
  } else {
    arr.push(S('path', { stroke: '#4fb866', 'stroke-width': w, 'stroke-opacity': .95 }, stemLayer));
  }
  return arr;
}
function setStem(paths, bx, by, ux, uy, jx) {
  const d = `M${bx.toFixed(1)},${by.toFixed(1)}C${(bx - ux * 55).toFixed(1)},${(by + uy * 55).toFixed(1)} ${(TX + jx).toFixed(1)},${TY - 70} ${(TX + jx).toFixed(1)},${TY}`;
  paths.forEach((p) => p.setAttribute('d', d));
}

/* ---- tulips ---- */
const TULIP = {
  back:  'M-12,-2C-17,-28 -8,-52 0,-66C8,-52 17,-28 12,-2Z',
  left:  'M3,2C-22,0 -29,-30 -15,-60C-5,-46 7,-28 3,2Z',
  right: 'M-3,2C22,0 29,-30 15,-60C5,-46 -7,-28 -3,2Z',
  front: 'M-15,2C-22,-26 -9,-52 0,-64C9,-52 22,-26 15,2C7,7 -7,7 -15,2Z',
};
function tulipNode(pi) {
  const g = S('g', {});
  S('path', { d: TULIP.back, fill: `url(#tB${pi})`, stroke: '#1d3880', 'stroke-opacity': .35, 'stroke-width': .8 }, g);
  S('path', { d: TULIP.left, fill: `url(#tS${pi})`, stroke: '#fff', 'stroke-opacity': .28, 'stroke-width': .7 }, g);
  S('path', { d: TULIP.right, fill: `url(#tS${pi})`, stroke: '#fff', 'stroke-opacity': .28, 'stroke-width': .7 }, g);
  S('path', { d: TULIP.front, fill: `url(#tF${pi})`, stroke: '#fff', 'stroke-opacity': .5, 'stroke-width': .8 }, g);
  [[-6, -50], [0, -56], [6, -50]].forEach(([x, y]) =>
    S('path', { d: `M0,-2C${x * .3},-22 ${x * .6},-38 ${x},${y}`, fill: 'none', stroke: '#26479f', 'stroke-opacity': .22, 'stroke-width': .9 }, g));
  S('path', { d: 'M-8,-8C-12,-26 -6,-44 -2,-54C-1,-40 -3,-24 -3,-8Z', fill: '#fff', 'fill-opacity': .3 }, g);
  S('path', { d: 'M9,-6C13,-22 10,-38 5,-50C4,-36 6,-22 6,-6Z', fill: '#1d3880', 'fill-opacity': .16 }, g);
  return g;
}
const tulips = [];
function addTulip(r, phi, h, tilt, pi, sc) {
  const g = tulipNode(pi);
  tulips.push({ g, r, phi: phi * D2R, h, t: tilt, sc, jx: rr(-5, 5), stem: stemPaths(3.2) });
}
for (let i = 0; i < 5; i++) addTulip(74, 10 + i * 72, 206, .5, [1, 3, 0, 2, 1][i], 1.0);              // inner ring, 5 tulips
for (let i = 0; i < 7; i++) addTulip(116, 25 + i * 51.43, 176, .85, [0, 2, 3, 1, 2, 0, 3][i], .98);    // outer ring, 7 tulips   = 12

/* ---- leaves ---- */
const leaves = [];
for (let i = 0; i < 8; i++) {
  const g = S('g', {});
  S('path', { d: 'M0,0C11,-14 9,-40 0,-60C-9,-40 -11,-14 0,0Z', fill: 'url(#leaf)', stroke: '#1d6a32', 'stroke-width': .6, 'stroke-opacity': .5 }, g);
  S('path', { d: 'M0,-2C1,-22 1,-38 0,-54', fill: 'none', stroke: '#c8f0c4', 'stroke-opacity': .6, 'stroke-width': .8 }, g);
  leaves.push({ g, r: 92, phi: (i * 45 + 8) * D2R, h: 128 + (i % 2) * 16, t: 1.15, sc: 1.05 });
}

/* ---- sunflower ---- */
const sunG = S('g', {});
(function () {
  const g = sunG;
  const ring = (n, off, len, wid, fill, op) => {
    for (let i = 0; i < n; i++) {
      const a = i * 360 / n + off + rr(-3, 3), l = len * rr(.92, 1.06);
      S('path', { d: `M0,-16C${wid},-24 ${wid * 1.05},${-l * .72} 0,${-l}C${-wid * 1.05},${-l * .72} ${-wid},-24 0,-16Z`, fill: `url(#${fill})`,
        stroke: '#c9740a', 'stroke-opacity': op, 'stroke-width': .6, transform: `rotate(${a.toFixed(1)})` }, g);
    }
  };
  ring(20, 9, 54, 9.5, 'petalA', .6);
  ring(20, 0, 50, 9, 'petalB', .45);
  S('circle', { r: 25, fill: '#8a5a1f' }, g);
  S('circle', { r: 23, fill: 'url(#disc)', stroke: '#6b4116', 'stroke-width': .8 }, g);
  for (let i = 1; i <= 120; i++) {
    const r = 1.95 * Math.sqrt(i), a = i * 2.39996;
    S('circle', { cx: (r * Math.cos(a)).toFixed(1), cy: (r * Math.sin(a)).toFixed(1), r: (.6 + r / 26).toFixed(2), fill: i % 3 ? '#b97a2e' : '#d79a45', 'fill-opacity': .85 }, g);
  }
  S('ellipse', { cx: -7, cy: -9, rx: 8, ry: 4.5, fill: '#fff', 'fill-opacity': .13, transform: 'rotate(-30 -7 -9)' }, g);
})();
const sunStem = stemPaths(6);

/* ---- little white flowers ---- */
function gypNode() {                              // baby's-breath sprig
  const g = S('g', {});
  const n = 7 + Math.floor(rand() * 4);
  for (let i = 0; i < n; i++) {
    const a = rr(-Math.PI, Math.PI), r = rr(6, 19), px = Math.cos(a) * r, py = Math.sin(a) * r * .85;
    S('path', { d: `M0,0L${px.toFixed(1)},${py.toFixed(1)}`, stroke: '#5aa86b', 'stroke-width': .7, 'stroke-opacity': .8 }, g);
    S('circle', { cx: px.toFixed(1), cy: py.toFixed(1), r: rr(1.7, 3.1).toFixed(1), fill: '#fff', stroke: '#cfdcf0', 'stroke-width': .5 }, g);
  }
  S('circle', { r: 2.6, fill: '#fff', stroke: '#cfdcf0', 'stroke-width': .5 }, g);
  return g;
}
function daisyNode() {                            // small five-petal white flower with a yellow centre
  const g = S('g', {});
  const inner = S('g', { transform: `rotate(${rr(0, 72).toFixed(0)}) scale(${rr(.85, 1.15).toFixed(2)})` }, g);
  for (let i = 0; i < 5; i++)
    S('ellipse', { cx: 0, cy: -6.2, rx: 4.3, ry: 6.4, fill: '#fff', stroke: '#c9d9ef', 'stroke-width': .6, transform: `rotate(${i * 72})` }, inner);
  S('circle', { r: 3, fill: '#f6c640' }, inner);
  S('circle', { cx: -.7, cy: -.7, r: 1.2, fill: '#ffe487' }, inner);
  return g;
}
const whites = [];
const domeH = (r) => 275 - .8 * r;
for (let i = 0; i < 16; i++) {
  const r = rr(70, 160);
  whites.push({ g: gypNode(), r, phi: rr(0, 6.283), h: domeH(r) + rr(14, 55), stem: stemPaths(1.1), jx: rr(-4, 4) });
}
for (let i = 0; i < 8; i++) {
  const r = rr(95, 150);
  whites.push({ g: daisyNode(), r, phi: rr(0, 6.283), h: domeH(r) + rr(18, 50), stem: stemPaths(1.4), jx: rr(-4, 4) });
}

/* ---- stem ends below the ribbon ---- */
for (let i = 0; i < 9; i++) {
  const x1 = TX + (i - 4) * 1.6, x2 = TX + (i - 4) * 4.4 + rr(-1.5, 1.5), y2 = 494 + rr(-6, 10);
  const d = `M${x1},${TY + 6}L${x2.toFixed(1)},${y2.toFixed(1)}`;
  S('path', { d, stroke: '#1f6f36', 'stroke-width': 5.4, 'stroke-linecap': 'round' }, tailLayer);
  S('path', { d, stroke: '#58bf6f', 'stroke-width': 4, 'stroke-linecap': 'round' }, tailLayer);
  S('ellipse', { cx: x2.toFixed(1), cy: y2.toFixed(1), rx: 2.5, ry: 1.4, fill: '#d3f2b8', stroke: '#6fb36b', 'stroke-width': .6 }, tailLayer);
}

/* ---- navy ribbon bow ---- */
const bowG = S('g', {}, bowLayer);
(function () {
  const g = S('g', { filter: 'url(#ds)' }, bowG);
  const loop = (flip) => {
    const l = S('g', { transform: flip ? 'translate(400,0) scale(-1,1)' : '' }, g);
    S('path', { d: 'M199,432C170,396 126,402 129,432C132,456 176,446 199,434Z', fill: 'url(#rib)', stroke: '#0a1f5e', 'stroke-width': .6 }, l);
    S('path', { d: 'M192,430C172,410 146,412 143,428C150,440 172,438 192,432Z', fill: '#0a1f5e', 'fill-opacity': .35 }, l);
    S('path', { d: 'M184,424C168,408 148,408 140,418', fill: 'none', stroke: '#9bb8f2', 'stroke-opacity': .55, 'stroke-width': 1.4, 'stroke-linecap': 'round' }, l);
    S('path', { d: 'M198,436C184,462 172,484 160,514L177,507L183,521C192,490 204,462 207,438Z', fill: 'url(#ribTail)', stroke: '#0a1f5e', 'stroke-width': .6 }, l);
    S('path', { d: 'M194,442C184,462 176,480 168,500', fill: 'none', stroke: '#8fb0ee', 'stroke-opacity': .45, 'stroke-width': 1.2, 'stroke-linecap': 'round' }, l);
  };
  loop(false); loop(true);
  S('rect', { x: 188, y: 419, width: 24, height: 22, rx: 9, fill: 'url(#rib)', stroke: '#0a1f5e', 'stroke-width': .6 }, g);
  S('path', { d: 'M192,424C197,421 203,421 208,424', fill: 'none', stroke: '#a9c3f5', 'stroke-opacity': .6, 'stroke-width': 1.3, 'stroke-linecap': 'round' }, g);
})();

/* ---- draw one frame: place everything for the current turn + tilt, then sort by depth ---- */
function headAxis(t, phi) {                       // where a flower head points on screen
  const cp = Math.cos(PITCH), sp = Math.sin(PITCH), a = phi + TH;
  const dx = Math.sin(t) * Math.sin(a), dy = Math.cos(t) * cp - Math.sin(t) * Math.cos(a) * sp;
  return { dx, dy, f: Math.hypot(dx, dy), rot: Math.atan2(dx, dy) / D2R };
}
function render() {
  const cp = Math.cos(PITCH), sp = Math.sin(PITCH);
  const back = [], front = [];

  wraps.forEach((w) => {
    const a = w.phi + TH, ca = Math.cos(a), sa = Math.sin(a);
    const tipX = w.L * Math.sin(w.al) * sa, hh = w.L * Math.cos(w.al), zz = w.L * Math.sin(w.al) * ca;
    const tipY = hh * cp - zz * sp;
    const nv = -Math.sin(w.al) * sp + Math.cos(w.al) * ca * cp;
    const ws = .3 + .7 * Math.min(1, Math.abs(nv) * 1.1);
    w.g.setAttribute('transform', `translate(${TX},${TY}) rotate(${(Math.atan2(tipX, tipY) / D2R).toFixed(1)}) scale(${ws.toFixed(3)},${(Math.hypot(tipX, tipY) / w.L).toFixed(3)})`);
    w.d = zz * cp + hh * sp;
    if (w.kind === 'tall') {                      // the tall backdrop sheets fade out as they swing round to the front
      const o = clamp((.3 - ca) / .4, 0, 1);
      w.g.setAttribute('opacity', o.toFixed(2));
      w.g.setAttribute('display', o > 0 ? 'inline' : 'none');
      if (o > 0) back.push(w);
    } else if (ca < 0) back.push(w);
    else front.push(w);
  });
  back.sort((p, q) => p.d - q.d).forEach((w) => backLayer.appendChild(w.g));

  tulips.forEach((t) => {
    const b = pos(t.r, t.phi, t.h), ax = headAxis(t.t, t.phi), k = t.sc * 1.5 * b.s;
    t.g.setAttribute('transform', `translate(${b.x.toFixed(1)},${b.y.toFixed(1)}) rotate(${ax.rot.toFixed(1)}) scale(${k.toFixed(3)},${(k * clamp(ax.f / .95, .8, 1.05)).toFixed(3)})`);
    setStem(t.stem, b.x, b.y, ax.dx / ax.f, ax.dy / ax.f, t.jx);
    t.d = b.d + 45 * (Math.cos(t.t) * sp + Math.sin(t.t) * Math.cos(t.phi + TH) * cp);
    front.push(t);
  });
  leaves.forEach((l) => {
    const b = pos(l.r, l.phi, l.h), ax = headAxis(l.t, l.phi), k = l.sc * b.s;
    l.g.setAttribute('transform', `translate(${b.x.toFixed(1)},${b.y.toFixed(1)}) rotate(${ax.rot.toFixed(1)}) scale(${k.toFixed(3)},${(k * clamp(ax.f / .95, .8, 1.05)).toFixed(3)})`);
    l.d = b.d - 6;
    front.push(l);
  });
  whites.forEach((w) => {
    const b = pos(w.r, w.phi, w.h);
    w.g.setAttribute('transform', `translate(${b.x.toFixed(1)},${b.y.toFixed(1)}) scale(${b.s.toFixed(3)})`);
    setStem(w.stem, b.x, b.y, (b.x - TX) / 160, .9, w.jx);
    w.d = b.d + 8;
    front.push(w);
  });
  const sb = pos(0, 0, 262);
  sunG.setAttribute('transform', `translate(${sb.x.toFixed(1)},${sb.y.toFixed(1)}) rotate(${(-TH / D2R).toFixed(1)}) scale(1.32)`);
  setStem(sunStem, sb.x, sb.y + 8, 0, 1, 0);
  sunG.d = sb.d;
  front.push(sunG ? { g: sunG, d: sb.d } : null);

  front.sort((p, q) => p.d - q.d).forEach((o) => frontLayer.appendChild(o.g));
  bowG.setAttribute('transform', `translate(${TX},${TY}) scale(${(.5 + .5 * Math.abs(Math.cos(TH))).toFixed(3)},1) translate(${-TX},${-TY})`);
}

/* ---- drag to turn the bouquet (spins slowly when left alone) ---- */
(function () {
  const pane = $('#flowerPane');
  let dragging = false, lx = 0, ly = 0, vth = 0, idle = 0;
  pane.addEventListener('pointerdown', (e) => {
    dragging = true; lx = e.clientX; ly = e.clientY; vth = 0; idle = 0;
    pane.setPointerCapture(e.pointerId); pane.classList.add('grab');
  });
  pane.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lx, dy = e.clientY - ly;
    lx = e.clientX; ly = e.clientY;
    TH += dx * .012; vth = dx * .012; idle = 0;
    PITCH = clamp(PITCH + dy * .004, .1, .75);
  });
  const stop = () => { dragging = false; pane.classList.remove('grab'); };
  pane.addEventListener('pointerup', stop);
  pane.addEventListener('pointercancel', stop);
  (function frame() {
    if (!dragging) { TH += vth; vth *= .94; idle++; if (idle > 150) TH += .004; }
    render();
    requestAnimationFrame(frame);
  })();
})();

/* 11. butterflies */
let bfN = 0;
function butterfly(parent, c1, c2) {
  const id = 'bw' + (bfN++);
  grad(id, [[0, c1], [1, c2]], { x1: 0, y1: 0, x2: 1, y2: 1 });
  const g = S('g', {}, parent), wings = S('g', {}, g);
  [1, -1].forEach((sx) => {
    const h = S('g', { transform: `scale(${sx},1)` }, wings);
    S('path', { d: 'M0,-3C6,-20 28,-23 30,-8C31,2 12,5 0,1Z', fill: `url(#${id})`, stroke: c2, 'stroke-width': .9, 'stroke-linejoin': 'round' }, h);
    S('path', { d: 'M0,2C12,4 24,8 20,19C16,27 3,17 0,7Z', fill: `url(#${id})`, stroke: c2, 'stroke-width': .9, 'stroke-linejoin': 'round' }, h);
    S('circle', { cx: 18, cy: -11, r: 3.2, fill: '#fff', 'fill-opacity': .8 }, h);
    S('circle', { cx: 11, cy: 14, r: 2.3, fill: '#fff', 'fill-opacity': .7 }, h);
  });
  S('ellipse', { cx: 0, cy: 0, rx: 2.2, ry: 11, fill: '#1d2540' }, g);
  S('circle', { cx: 0, cy: -12, r: 2.3, fill: '#1d2540' }, g);
  S('path', { d: 'M-.8,-13C-3,-19 -6,-21 -8,-21M.8,-13C3,-19 6,-21 8,-21', fill: 'none', stroke: '#1d2540', 'stroke-width': .8, 'stroke-linecap': 'round' }, g);
  return { g, wings };
}
const flyers = [
  ['#9fd0ff', '#2f5ea8', 175, 120, 0, 1, .34], ['#ffe27a', '#b07a10', 150, 150, 2.1, -1, .28],
  ['#f9bfd6', '#b04570', 190, 95, 4.0, 1, .4], ['#ffffff', '#6f8fbf', 120, 135, 1.0, -1, .46],
  ['#c7e3ff', '#3c6fb4', 205, 160, 5.2, 1, .25],
].map(([c1, c2, ax, ay, p, dir, w], i) => {
  const b = butterfly(root, c1, c2);
  return Object.assign(b, { ax, ay, p, w: w * dir, size: [.9, .8, .75, .7, .85][i] });
});
function bfPos(f, t) {
  const a = f.w * t + f.p;
  return [200 + f.ax * Math.cos(a), 190 + f.ay * Math.sin(a * 1.3) + 10 * Math.sin(t * 2.4 + f.p)];
}
(function fly() {
  const t = performance.now() / 1000;
  flyers.forEach((f) => {
    const [x, y] = bfPos(f, t), [x2, y2] = bfPos(f, t + .05);
    const h = deg(Math.atan2(x2 - x, -(y2 - y)));
    f.g.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${h.toFixed(1)}) scale(${f.size})`);
    f.wings.setAttribute('transform', `scale(${(.28 + .72 * Math.abs(Math.cos(t * 13 + f.p))).toFixed(2)},1)`);
  });
  requestAnimationFrame(fly);
})();

/* 12. a heart floating above the bouquet */
(function () {
  const g = S('g', { transform: 'translate(200,-6)' }, root);
  const hb = S('g', { class: 'heart-beat' }, g);
  S('path', { d: 'M0,18C-28,-2 -24,-28 -9,-28C-3,-28 0,-24 0,-21C0,-24 3,-28 9,-28C24,-28 28,-2 0,18Z', fill: 'url(#heartG)', stroke: '#fff', 'stroke-opacity': .7, 'stroke-width': 1.2, filter: 'url(#ds)' }, hb);
  S('path', { d: 'M-14,-20C-19,-18 -21,-11 -19,-6', fill: 'none', stroke: '#fff', 'stroke-opacity': .75, 'stroke-width': 2.4, 'stroke-linecap': 'round' }, hb);
})();

/* ---------- falling petals and hearts ---------- */
(function () {
  const box = $('#petals');
  const colors = ['#6fa8ee', '#9cc3f3', '#4f7fe0', '#86c9f0', '#f2c230', '#f7d977', '#f2a3c0', '#f7c6d8'];
  for (let i = 0; i < 38; i++) {
    const pt = document.createElement('div');
    pt.className = 'pt';
    pt.style.cssText = `--x:${rnd(2, 96).toFixed(1)}%;--dur:${rnd(9, 17).toFixed(1)}s;--del:${(-rnd(0, 16)).toFixed(1)}s`;
    const pi = document.createElement('div');
    if (i % 5 === 0) {
      pi.className = 'pi heart';
      pi.style.cssText = `--w:${rnd(16, 26).toFixed(0)}px;--pc:${i % 10 ? '#f08ab0' : '#8fb8ee'};--sw:${rnd(2.4, 4.5).toFixed(1)}s`;
      pi.textContent = '♥';
    } else {
      pi.className = 'pi';
      pi.style.cssText = `--w:${rnd(11, 21).toFixed(0)}px;--pc:${colors[i % colors.length]};--sw:${rnd(2.2, 4.5).toFixed(1)}s`;
    }
    pt.appendChild(pi); box.appendChild(pt);
  }
})();

/* ---------- letter ---------- */
function renderLetter() {
  $('#letterMeta').innerHTML = LETTER.meta.map((m) => `<span>${m}</span>`).join('');
  $('#letterTo').textContent = LETTER.to;
  $('#letterFrom').textContent = LETTER.from;
  const body = $('#letterBody');
  body.innerHTML = '';
  LETTER.body.forEach((text, i) => {
    const p = document.createElement('p');
    p.className = 'line';
    p.style.animationDelay = (1.4 + i * 0.9) + 's';
    p.textContent = text;
    body.appendChild(p);
  });
  renderPhotos(1.6 + LETTER.body.length * 0.4);
  $('#letterFrom').className = 'line';
  $('#letterFrom').style.animationDelay = (1.4 + LETTER.body.length * 0.9) + 's';
}

function renderPhotos(startDelay) {
  const box = $('#photos');
  box.innerHTML = '';
  PHOTOS.forEach((ph, i) => {
    const fig = document.createElement('figure');
    fig.className = 'photo' + (ph.big ? ' big' : '');
    fig.style.animationDelay = (startDelay + i * 0.5) + 's';
    const img = new Image();
    img.alt = ph.caption || '';
    if (ph.pos) img.style.objectPosition = ph.pos;
    img.src = ph.src;
    img.onerror = () => { const d = document.createElement('div'); d.className = 'ph'; img.replaceWith(d); };
    fig.appendChild(img);
    if (ph.caption) {
      const cap = document.createElement('figcaption');
      cap.textContent = ph.caption;
      fig.appendChild(cap);
    }
    box.appendChild(fig);
  });
}

/* ---------- name under the bouquet ---------- */
$('#bouqLabel').textContent = BOUQUET.label;
$('#envTo').textContent = BOUQUET.envelope;
$('#bouqName').textContent = BOUQUET.name;
$('#bouqHint').textContent = BOUQUET.hint;

/* ---------- envelope sequence ---------- */
const envelope = $('#envelope');
let opened = false, timers = [];

function openEnvelope() {
  if (opened) return;
  opened = true;
  renderLetter();
  envelope.classList.add('open');
  timers.push(setTimeout(() => envelope.classList.add('gone'), 2000));
  timers.push(setTimeout(() => { document.body.classList.add('opened'); }, 2300));
}

function closeEnvelope() {
  timers.forEach(clearTimeout); timers = [];
  document.body.classList.remove('opened');
  setTimeout(() => {
    envelope.classList.remove('gone', 'open');
    opened = false;
  }, 900);
}

envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); } });
$('#replay').addEventListener('click', closeEnvelope);


/* ---------- the question: only "yes" works ---------- */
(function () {
  const yes = $('#yes'), no = $('#no');
  let n = 0, grow = 1;
  $('#askQ').textContent = ASK.question;
  $('#askNote').textContent = ASK.note;
  yes.textContent = ASK.yes;
  no.textContent = ASK.no[0];

  function dodge(e) {
    if (e) e.preventDefault();
    n++;
    no.textContent = ASK.no[n % ASK.no.length || 1];        // never goes back to the plain "No"
    grow = Math.min(1.8, grow + 0.1);                         // "Yes" gets a little bigger
    yes.style.setProperty('--g', grow);
    no.classList.add('fly');
    const yr = yes.getBoundingClientRect(), w = no.offsetWidth, h = no.offsetHeight;
    let x, y, tries = 0;
    do {
      x = 16 + Math.random() * (innerWidth - w - 32);
      y = 16 + Math.random() * (innerHeight - h - 32);
      tries++;
    } while (tries < 20 && x < yr.right + 30 && x + w > yr.left - 30 && y < yr.bottom + 30 && y + h > yr.top - 30);
    no.style.left = x + 'px';
    no.style.top = y + 'px';
  }
  no.addEventListener('pointerenter', dodge);
  no.addEventListener('pointerdown', dodge);
  no.addEventListener('click', (e) => e.preventDefault());
  no.addEventListener('focus', dodge);                        // keyboard users get the same game

  yes.addEventListener('click', () => {
    const r = yes.getBoundingClientRect(), cols = ['#6fa8ee', '#9cc3f3', '#f2c230', '#f2a3c0', '#f7c6d8'];
    for (let i = 0; i < 18; i++) {                            // a small burst of petals from the button
      const p = document.createElement('span');
      p.className = 'burst';
      p.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;background:${cols[i % cols.length]};` +
        `--x:${(Math.random() - 0.5) * 460}px;--y:${-60 - Math.random() * 320}px;--r:${Math.random() * 540 - 270}deg;animation-delay:${i * 0.025}s`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 2000);
    }
    setTimeout(() => document.body.classList.add('asked'), 500);
    Music.start();                                            // the click counts as the tap browsers need to allow sound
  });
})();

/* ---------- letter doodles: blue heart balloons on strings ---------- */
(function () {
  const deco = document.querySelector('.paper .deco');
  if (!deco) return;
  deco.removeAttribute('viewBox'); deco.removeAttribute('preserveAspectRatio');
  const H = 'M12 21s-8-4.9-8-10.6A4.5 4.5 0 0 1 12 7.6a4.5 4.5 0 0 1 8 2.8C20 16.100 12 21 12 21Z';
  // [right px, top px, heart size, string length, string sway, tilt, opacity]
  const balloons = [
    [16, 12, 30, 150, 8, 8, .95],
    [46, 40, 20, 110, -7, -10, .75],
    [12, 190, 16, 90, 6, 6, .55],
  ];
  let html = '';
  balloons.forEach(([r, t, sz, len, sw, tilt, op]) => {
    const w = sz + 30, cx = w / 2, y0 = sz * .92;
    html += `<svg style="position:absolute;right:${r}px;top:${t}px;width:${w}px;height:${sz + len}px;overflow:visible;opacity:${op}" viewBox="0 0 ${w} ${sz + len}">
      <path d="M${cx},${y0} c${sw},${len * .22} ${-sw * 1.4},${len * .4} ${sw * .6},${len * .62} s${-sw * .8},${len * .26} ${sw * .2},${len * .38}" fill="none" stroke="#6f8fc6" stroke-width="1.3" stroke-linecap="round"/>
      <g transform="translate(${cx - sz / 2},0) rotate(${tilt} ${sz / 2} ${sz / 2})"><path transform="scale(${sz / 24})" d="${H}" fill="url(#bh)" stroke="#2f55a8" stroke-opacity=".35" stroke-width=".6"/>
      <ellipse cx="${sz * .33}" cy="${sz * .38}" rx="${sz * .1}" ry="${sz * .06}" fill="#fff" fill-opacity=".6" transform="rotate(-30 ${sz * .33} ${sz * .38})"/></g></svg>`;
  });
  // tiny floating hearts near the bottom-left, by the signature
  html += `<svg style="position:absolute;left:14px;bottom:10px;width:70px;height:34px;opacity:.7" viewBox="0 0 70 34">
    <path d="M4,28 C14,22 18,30 28,22 S44,14 52,18" fill="none" stroke="#6f8fc6" stroke-width="1.2" stroke-dasharray="1 4" stroke-linecap="round"/>
    <path transform="translate(50,6) scale(.7)" d="${H}" fill="#4a78d8"/><path transform="translate(2,18) scale(.4)" d="${H}" fill="#8fb5f2"/></svg>`;
  html += `<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="bh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fb5f2"/><stop offset="1" stop-color="#2f58c0"/></linearGradient></defs></svg>`;
  deco.outerHTML = `<div class="deco" aria-hidden="true">${html}</div>`;
})();


/* ---------- on phones, the photos move into the bouquet pane so they sit around it ---------- */
(function () {
  const mq = window.matchMedia('(max-width:760px)');
  function place() {
    const ph = $('#photos');
    (mq.matches ? $('#flowerPane') : document.querySelector('.collage')).appendChild(ph);
  }
  place();
  (mq.addEventListener ? mq.addEventListener('change', place) : mq.addListener(place));
})();


/* ---------- background music (YouTube, hidden player) ---------- */
const MUSIC = { id: 'v82VtUUGFqk', volume: 70 };   // change the video id or volume here

const Music = (function () {
  let player = null, ready = false, wantPlay = false, userPaused = false;
  const btn = $('#music');
  const setUI = (on) => { btn.classList.toggle('on', on); btn.setAttribute('aria-pressed', on); };

  function create() {
    player = new YT.Player('ytPlayer', {
      width: '200', height: '200', videoId: MUSIC.id,
      playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: MUSIC.id, playsinline: 1, rel: 0, modestbranding: 1 },
      events: {
        onReady: () => { ready = true; player.setVolume(MUSIC.volume); if (wantPlay) player.playVideo(); },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) setUI(true);
          else if (e.data === YT.PlayerState.PAUSED) setUI(false);
          else if (e.data === YT.PlayerState.ENDED) player.playVideo();
        },
      },
    });
  }
  window.onYouTubeIframeAPIReady = create;
  const s = document.createElement('script');
  s.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(s);

  btn.addEventListener('click', () => {
    if (!ready) { wantPlay = !wantPlay; setUI(wantPlay); return; }
    if (btn.classList.contains('on')) { userPaused = true; player.pauseVideo(); }
    else { userPaused = false; player.playVideo(); }
  });

  return {
    start() { if (userPaused) return; wantPlay = true; if (ready) player.playVideo(); setUI(true); },
  };
})();
