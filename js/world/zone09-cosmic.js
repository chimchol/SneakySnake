// ---------- Zone 9: the cosmic island ----------
(function buildCosmic() {
  const groundTex = cosmicTex.clone(); groundTex.needsUpdate = true; groundTex.repeat.set(6, 6);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(CR, CR, 1, 64), [new THREE.MeshLambertMaterial({ color: 0x2a1a5a }), new THREE.MeshLambertMaterial({ map: groundTex, emissive: 0x100830 }), mat(0x2a1a5a)]);
  top.position.set(0, -0.5, CZ); top.receiveShadow = true; scene.add(top);
  const cside = new THREE.Mesh(new THREE.CylinderGeometry(CR - 0.2, CR * 0.85, 4, 64), mat(0x1a1040));
  cside.position.set(0, -3, CZ); scene.add(cside);
  const crock = new THREE.Mesh(new THREE.ConeGeometry(CR * 0.85, 24, 30), mat(0x120a30));
  crock.position.set(0, -17, CZ); crock.rotation.x = Math.PI; scene.add(crock);
  // Glowing crystals
  const crys = [new THREE.MeshPhongMaterial({ color: 0xff7ae0, emissive: 0x7a1a6a, shininess: 120, specular: 0xffffff }), new THREE.MeshPhongMaterial({ color: 0x7ae0ff, emissive: 0x1a5a7a, shininess: 120, specular: 0xffffff })];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + Math.random() * 0.2;
    if (Math.sin(a) > 0.55) continue;
    const r = 15 + Math.random() * (CR - 18), h = 1.5 + Math.random() * 3;
    const c = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), crys[i % 2]);
    c.scale.set(0.8, h, 0.8); c.position.set(Math.cos(a) * r, h * 0.7, CZ + Math.sin(a) * r); c.rotation.y = Math.random() * 3; scene.add(c);
  }
  // Moon craters
  for (let i = 0; i < 9; i++) {
    const a = Math.random() * Math.PI * 2, r = 10 + Math.random() * (CR - 12);
    const x = Math.cos(a) * r, z = CZ + Math.sin(a) * r;
    if (Math.abs(x) < 3 && z > CZ) continue;
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1 + Math.random(), 0.25, 6, 18), mat(0x4a3a7a)); rim.rotation.x = -Math.PI / 2; rim.position.set(x, 0.05, z); scene.add(rim);
  }
  // Little planets floating above the island
  const planets = [];
  [[-14, 9, CZ - 12, 2.2, 0xff9a4a, true], [15, 11, CZ - 8, 1.6, 0x5ad0ff, false], [8, 14, CZ - 22, 3, 0xd07aff, true], [-10, 7, CZ + 10, 1.1, 0x9aff7a, false]].forEach(([x, y, z, r, col, ring]) => {
    const g = new THREE.Group();
    const ball = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), new THREE.MeshLambertMaterial({ color: col, emissive: new THREE.Color(col).multiplyScalar(0.25) })); g.add(ball);
    if (ring) { const rg = new THREE.Mesh(new THREE.TorusGeometry(r * 1.6, r * 0.12, 6, 32), new THREE.MeshLambertMaterial({ color: 0xfff2c0, emissive: 0x6a5a30 })); rg.rotation.x = Math.PI / 2.4; g.add(rg); }
    g.position.set(x, y, z); scene.add(g); planets.push({ g, y });
  });
  // Twinkling stars around the island
  const N = 260, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * CR * 2.4; pos[i * 3 + 1] = 2 + Math.random() * 22; pos[i * 3 + 2] = CZ + (Math.random() - 0.5) * CR * 2.4; }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, transparent: true });
  scene.add(new THREE.Points(sg, starMat));
  worldTicks.push((dt, t) => {
    planets.forEach((p, k) => { p.g.position.y = p.y + Math.sin(t * 0.6 + k) * 0.8; p.g.rotation.y = t * 0.2 * (k % 2 ? 1 : -1); });
    starMat.opacity = 0.65 + Math.sin(t * 3) * 0.3;
  });
})();

// Signs (text drawn on a little canvas)
function signTexture(lines) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = '#d9a75c'; x.fillRect(0, 0, 256, 128);
  x.strokeStyle = '#7a4a26'; x.lineWidth = 10; x.strokeRect(5, 5, 246, 118);
  x.fillStyle = '#3b230f'; x.textAlign = 'center'; x.textBaseline = 'middle';
  // Shrink the words if they are too wide for the sign
  const fit = (txt, size, family, y) => { let f = size; do { x.font = 'bold ' + f + 'px ' + family; f -= 2; } while (x.measureText(txt).width > 228 && f > 12); x.fillText(txt, 128, y); };
  fit(lines[0], 40, '"Lilita One", "Trebuchet MS", sans-serif', 46);
  fit(lines[1], 26, '"Nunito", "Trebuchet MS", sans-serif', 92);
  const t = new THREE.CanvasTexture(c); return t;
}
function sign(x, z, rotY, lines) {
  const s = new THREE.Group();
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.2), mat(0x7a4a26)); post.position.y = 1.1; s.add(post);
  const face = new THREE.MeshLambertMaterial({ map: signTexture(lines) });
  const edge = mat(0xb5853f);
  const board = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.4, 0.15), [edge, edge, edge, edge, face, face]);
  board.position.y = 2.3; board.castShadow = true; s.add(board);
  s.position.set(x, 0, z); s.rotation.y = rotY; scene.add(s);
  return board;
}
const signs = [];
function makeSigns() {
  signs.forEach((b) => scene.remove(b.parent)); signs.length = 0;
  signs.push(sign(-2.6, -R + 2.2, 0, ['Forest', 'Need length ' + POLE.need]));
  signs.push(sign(2.6, POLE.z2 - 2.2, Math.PI, ['Spawn', 'Need length ' + POLE.need]));
  signs.push(sign(-3, FZ + 8, 0.3, ['Zone 1', 'The Forest']));
  signs.push(sign(-2.6, FZ - FR + 2.2, 0, ['Lake', 'Need length ' + POLES[1].need]));
  signs.push(sign(2.6, POLES[1].z2 - 2.2, Math.PI, ['Forest', 'Need length ' + POLES[1].need]));
  signs.push(sign(-3.4, LZ + 9, 0.3, ['Zone 2', 'The Lake']));
  signs.push(sign(9, FZ - 3, -0.7, ['Chicken Boss', 'Escape: any speed']));
  signs.push(sign(9.5, LZ - 2, -0.7, ['Swan Boss', 'Escape: speed 30+']));
  signs.push(sign(-2.6, LZ - LR + 2.2, 0, ['Desert', 'Need length ' + POLES[2].need]));
  signs.push(sign(2.6, POLES[2].z2 - 2.2, Math.PI, ['Lake', 'Need length ' + POLES[2].need]));
  signs.push(sign(-3.6, DZ + 10, 0.3, ['Zone 3', 'The Desert']));
  signs.push(sign(10, DZ - 2, -0.7, ['Scorpion Boss', 'Escape: speed 120+']));
  signs.push(sign(-2.6, DZ - DR + 2.2, 0, ['Jungle', 'Need length ' + POLES[3].need]));
  signs.push(sign(2.6, POLES[3].z2 - 2.2, Math.PI, ['Desert', 'Need length ' + POLES[3].need]));
  signs.push(sign(-3.8, JZ + 11, 0.3, ['Zone 4', 'The Jungle']));
  signs.push(sign(10.5, JZ - 2, -0.7, ['Tiger Boss', 'Escape: speed 400+']));
  signs.push(sign(-2.6, JZ - JR + 2.2, 0, ['Volcano', 'Need length ' + POLES[4].need]));
  signs.push(sign(2.6, POLES[4].z2 - 2.2, Math.PI, ['Jungle', 'Need length ' + POLES[4].need]));
  signs.push(sign(-4, VZ + 12, 0.3, ['Zone 5', 'The Volcano']));
  signs.push(sign(11, VZ - 2, -0.7, ['Cerberus Boss', 'Escape: speed 1500+']));
  signs.push(sign(-2.6, VZ - VR + 2.2, 0, ['Ice Land', 'Need length ' + POLES[5].need.toLocaleString()]));
  signs.push(sign(2.6, POLES[5].z2 - 2.2, Math.PI, ['Volcano', 'Need length ' + POLES[5].need.toLocaleString()]));
  signs.push(sign(-4, IZ + 12, 0.3, ['Zone 6', 'Ice Land']));
  signs.push(sign(11, IZ - 2, -0.7, ['Yeti Boss', 'Escape: speed 5000+']));
  signs.push(sign(-2.6, IZ - IR + 2.2, 0, ['Ocean', 'Need length ' + POLES[6].need.toLocaleString()]));
  signs.push(sign(2.6, POLES[6].z2 - 2.2, Math.PI, ['Ice Land', 'Need length ' + POLES[6].need.toLocaleString()]));
  signs.push(sign(-4, OZ + 12, 0.3, ['Zone 7', 'The Ocean']));
  signs.push(sign(12, OZ - 1, -0.7, ['Whale Boss', 'Escape: speed 15,000+']));
  signs.push(sign(-2.6, OZ - OR + 2.2, 0, ['Prehistoric', 'Need length ' + POLES[7].need.toLocaleString()]));
  signs.push(sign(2.6, POLES[7].z2 - 2.2, Math.PI, ['Ocean', 'Need length ' + POLES[7].need.toLocaleString()]));
  signs.push(sign(-4, PZ + 13, 0.3, ['Zone 8', 'Prehistoric']));
  signs.push(sign(12.5, PZ - 1, -0.7, ['T-Rex Boss', 'Escape: speed 40,000+']));
  signs.push(sign(-2.6, PZ - PR + 2.2, 0, ['Cosmic', 'Need length ' + POLES[8].need.toLocaleString()]));
  signs.push(sign(2.6, POLES[8].z2 - 2.2, Math.PI, ['Prehistoric', 'Need length ' + POLES[8].need.toLocaleString()]));
  signs.push(sign(-4, CZ + 13, 0.3, ['Zone 9', 'Cosmic']));
  signs.push(sign(13, CZ - 1, -0.7, ['Cosmic Man', 'Escape: speed 100K+']));
  signs.push(sign(-2.6, CZ - CR + 2.2, 0, ['Cherry Blossom', 'Need length 400K']));
  signs.push(sign(2.6, POLES[9].z2 - 2.2, Math.PI, ['Cosmic', 'Need length 400K']));
  signs.push(sign(-5.5, BZ + 13, 0.3, ['Zone 10', 'Cherry Blossom']));
  signs.push(sign(13, BZ - 1, -0.7, ['Oni Tiger', 'Escape: speed 250K+']));
  signs.push(sign(-2.6, BZ - BR + 2.2, 0, ['Titan Temple', 'Need length 1M']));
  signs.push(sign(2.6, POLES[10].z2 - 2.2, Math.PI, ['Cherry Blossom', 'Need length 1M']));
  signs.push(sign(-5.5, TZ + 13, 0.3, ['Zone 11', 'Titan Temple']));
  signs.push(sign(13, TZ - 1, -0.7, ['Titan Gorilla', 'Escape: speed 600K+']));
  signs.push(sign(-2.6, TZ - TR + 2.2, 0, ['Angels & Demons', 'Need length 2.5M']));
  signs.push(sign(2.6, POLES[11].z2 - 2.2, Math.PI, ['Titan Temple', 'Need length 2.5M']));
  signs.push(sign(-4.5, AZ + 14, 0.3, ['Zone 12', 'Angels & Demons']));
  signs.push(sign(-15, AZ - 1, 0.7, ['Angel Boss', 'Escape: speed 1.5M+']));
  signs.push(sign(15, AZ - 1, -0.7, ['Demon Boss', 'Escape: speed 1.5M+']));
  signs.push(sign(-2.6, AZ - AR + 2.2, 0, ['Mystical Forest', 'Need length 6M']));
  signs.push(sign(2.6, POLES[12].z2 - 2.2, Math.PI, ['Angels & Demons', 'Need length 6M']));
  signs.push(sign(-5, MZ + 15, 0.3, ['Zone 13', 'Mystical Forest']));
  signs.push(sign(14, MZ - 1, -0.7, ['Magic Lion', 'Escape: speed 4M+']));
  signs.push(sign(PIXIE_SPOT.x + 3, PIXIE_SPOT.z + 2, 0.9, ['Pixie\'s Log', 'Talk to Pixie!']));
}
makeSigns();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(makeSigns);

// The wobbly pole bridges
POLES.forEach((p) => {
  p.group = new THREE.Group();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, p.len + 1, 14), mat(0xa0703f));
  m.rotation.x = Math.PI / 2; m.castShadow = true; p.group.add(m);
  p.group.position.set(0, 0.15, p.mid); scene.add(p.group);
});
function resetPole() { POLES.forEach((p) => { p.group.position.set(0, 0.15, p.mid); p.group.rotation.set(0, 0, 0); }); }

// Tiger stripes, shared by the tiger boss, the tiger egg and the baby tiger
const tigerTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#f08a2a'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#1a1a1a';
  for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(i * 11, 0); x.lineTo(i * 11 + 5, 0); x.lineTo(i * 11 + 2, 64); x.lineTo(i * 11 - 2, 64); x.fill(); }
  return new THREE.CanvasTexture(c);
})();
// Red oni tiger stripes
const oniTex = (function () {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#c8302a'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#1a0a14';
  for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(i * 11, 0); x.lineTo(i * 11 + 5, 0); x.lineTo(i * 11 + 2, 64); x.lineTo(i * 11 - 2, 64); x.fill(); }
  return new THREE.CanvasTexture(c);
})();
// How fast you really move for a speed number. It grows slowly, so even huge numbers stay easy to steer.
function speedFromStat(st) { return 4 + 2.4 * Math.log10(Math.max(1, st)); }
// A boss that needs speed N to escape is a tiny bit slower than a snake with speed N
function bossSpeedFor(n) { return speedFromStat(n) * 0.9; }
