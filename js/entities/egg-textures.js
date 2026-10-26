// Egg textures (spots, stripes, scales ...) painted on small canvases
const featherTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#8a5a2b'; x.fillRect(0, 0, 64, 64);
  x.strokeStyle = '#c8955a'; x.lineWidth = 2.5;
  for (let row = 0; row < 6; row++) for (let col = 0; col < 5; col++) {
    x.beginPath(); x.arc(col * 14 + (row % 2) * 7, row * 11 + 4, 6, 0.1 * Math.PI, 0.9 * Math.PI); x.stroke();
  }
  return new THREE.CanvasTexture(c);
})();
const spotTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#8a5a2b';
  [[10, 12, 6], [40, 8, 5], [28, 30, 7], [52, 34, 5], [12, 46, 6], [42, 54, 6], [60, 56, 4]].forEach(([cx, cy, r]) => { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); });
  return new THREE.CanvasTexture(c);
})();
const scaleTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#4ab0e0'; x.fillRect(0, 0, 64, 64);
  x.strokeStyle = '#bfefff'; x.lineWidth = 2.5;
  for (let row = 0; row < 7; row++) for (let col = 0; col < 6; col++) {
    x.beginPath(); x.arc(col * 12 + (row % 2) * 6, row * 10 + 3, 5, 0.1 * Math.PI, 0.9 * Math.PI); x.stroke();
  }
  return new THREE.CanvasTexture(c);
})();
const shellTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#3f8a3a'; x.fillRect(0, 0, 64, 64);
  x.strokeStyle = '#24561f'; x.lineWidth = 3;
  const hex = (cx, cy, r) => { x.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k; x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } x.closePath(); x.stroke(); };
  for (let row = 0; row < 5; row++) for (let col = 0; col < 4; col++) hex(col * 20 + (row % 2) * 10, row * 16, 9);
  return new THREE.CanvasTexture(c);
})();
const frogSpotTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#3a7a30';
  [[12, 14, 6], [44, 10, 5], [30, 34, 7], [54, 40, 5], [14, 50, 6], [44, 56, 5]].forEach(([cx, cy, r]) => { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); });
  return new THREE.CanvasTexture(c);
})();
function stripeTexture(bg, fg, angleDeg, w, gap) {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = bg; x.fillRect(0, 0, 64, 64);
  x.save(); x.translate(32, 32); x.rotate(angleDeg * Math.PI / 180); x.fillStyle = fg;
  for (let i = -64; i < 64; i += w + gap) x.fillRect(i, -64, w, 128);
  x.restore();
  return new THREE.CanvasTexture(c);
}
const lizardTex = stripeTexture('#b8c95a', '#7a8a2a', 45, 4, 8);
const bandTex = stripeTexture('#a9a39a', '#7d776e', 90, 3, 7);
const snakeTex = stripeTexture('#5ccf3a', '#2f8f2a', 45, 4, 6);
const chameleonTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  const gr = x.createLinearGradient(0, 0, 64, 64);
  gr.addColorStop(0, '#5ccf3a'); gr.addColorStop(0.35, '#2fb8b0'); gr.addColorStop(0.7, '#ffd23f'); gr.addColorStop(1, '#5ccf3a');
  x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();
const salamanderTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#e2401e'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#ffd23f';
  [[12, 14, 5], [44, 10, 5], [30, 34, 6], [54, 40, 4], [14, 50, 5], [44, 56, 5]].forEach(([cx, cy, r]) => { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); });
  return new THREE.CanvasTexture(c);
})();
const dragonTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#a0201a'; x.fillRect(0, 0, 64, 64); x.strokeStyle = '#e0503a'; x.lineWidth = 2.5;
  for (let row = 0; row < 7; row++) for (let col = 0; col < 6; col++) { x.beginPath(); x.arc(col * 12 + (row % 2) * 6, row * 10 + 3, 5, 0.1 * Math.PI, 0.9 * Math.PI); x.stroke(); }
  return new THREE.CanvasTexture(c);
})();
const penguinTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#1a1a22'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#ffffff'; x.fillRect(24, 0, 16, 64);
  return new THREE.CanvasTexture(c);
})();
const coalTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#1a1a1a';
  [[28, 26, 3], [36, 26, 3], [30, 40, 2], [34, 42, 2], [38, 40, 2]].forEach(([cx, cy, r]) => { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); });
  return new THREE.CanvasTexture(c);
})();
const yetiEggTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#f4f6fa'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#6a8ab0'; x.fillRect(22, 22, 20, 20);
  return new THREE.CanvasTexture(c);
})();
const sharkTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#7a8a9a'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#f4f4f4'; x.fillRect(0, 40, 64, 24);
  return new THREE.CanvasTexture(c);
})();
const whaleSharkTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#2a4a7a'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#ffffff';
  for (let i = 0; i < 18; i++) { x.beginPath(); x.arc((i * 23) % 64, (i * 37) % 64, 2.5, 0, 7); x.fill(); }
  return new THREE.CanvasTexture(c);
})();
const mermaidTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#2fb8b0'; x.fillRect(0, 0, 64, 64); x.strokeStyle = '#8af0e0'; x.lineWidth = 2.5;
  for (let row = 0; row < 7; row++) for (let col = 0; col < 6; col++) { x.beginPath(); x.arc(col * 12 + (row % 2) * 6, row * 10 + 3, 5, 0.1 * Math.PI, 0.9 * Math.PI); x.stroke(); }
  return new THREE.CanvasTexture(c);
})();
const raptorTex = stripeTexture('#c8a050', '#8a6a2a', 90, 4, 8);
const ankyTex = stripeTexture('#8a7a5a', '#5a4a3a', 0, 3, 7);
const koiTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#ff7a2a';
  [[20, 20, 11], [46, 40, 10], [14, 50, 7]].forEach(([cx, cy, r]) => { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); });
  return new THREE.CanvasTexture(c);
})();
const jadeTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#2fa86a'; x.fillRect(0, 0, 64, 64); x.strokeStyle = '#8af0b0'; x.lineWidth = 2.5;
  for (let row = 0; row < 7; row++) for (let col = 0; col < 6; col++) { x.beginPath(); x.arc(col * 12 + (row % 2) * 6, row * 10 + 3, 5, 0.1 * Math.PI, 0.9 * Math.PI); x.stroke(); }
  return new THREE.CanvasTexture(c);
})();
const headdressTex = stripeTexture('#2a5ab0', '#f2bd2c', 0, 5, 5);
const rainbowTex = (function () {
  const c = document.createElement('canvas'); c.width = 8; c.height = 64; const x = c.getContext('2d');
  ['#ff4b4b', '#ff9f2e', '#ffe14a', '#5bd65b', '#4aa8ff', '#9a5bff'].forEach((col, i) => { x.fillStyle = col; x.fillRect(0, i * 64 / 6, 8, 64 / 6 + 1); });
  return new THREE.CanvasTexture(c);
})();
