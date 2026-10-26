// ---------- Zone 8: the prehistoric island ----------
(function buildPrehistoric() {
  const top = new THREE.Mesh(new THREE.CylinderGeometry(PR, PR, 1, 64), mat(0x6a9a3a));
  top.position.set(0, -0.5, PZ); top.receiveShadow = true; scene.add(top);
  const pside = new THREE.Mesh(new THREE.CylinderGeometry(PR - 0.2, PR * 0.85, 4, 64), mat(0x7a5a3a));
  pside.position.set(0, -3, PZ); scene.add(pside);
  const prock = new THREE.Mesh(new THREE.ConeGeometry(PR * 0.85, 24, 30), mat(0x5a4a3a));
  prock.position.set(0, -17, PZ); prock.rotation.x = Math.PI; scene.add(prock);
  const fernA = mat(0x3f7a2a), fernB = mat(0x5a9a3a), trunkM = mat(0x6b4a2a);
  // Giant ferns and cycad trees
  function cycad(x, z, s) {
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35 * s, 0.55 * s, 3.5 * s, 7), trunkM); trunk.position.y = 1.75 * s; trunk.castShadow = true; t.add(trunk);
    for (let k = 0; k < 8; k++) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.4 * s, 0.08, 3.2 * s), k % 2 ? fernA : fernB);
      leaf.position.y = 3.5 * s; leaf.rotation.set(0.45, k * 0.785, 0); leaf.translateZ(1.4 * s); leaf.castShadow = true; t.add(leaf);
    }
    t.position.set(x, 0, z); t.rotation.y = Math.random() * 6; scene.add(t);
  }
  function fern(x, z, s) {
    const g = new THREE.Group();
    for (let k = 0; k < 7; k++) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.35 * s, 0.05, 1.8 * s), k % 2 ? fernA : fernB);
      leaf.rotation.set(-0.6, k * 0.9, 0); leaf.position.y = 0.45 * s; leaf.translateZ(0.7 * s); g.add(leaf);
    }
    g.position.set(x, 0, z); scene.add(g);
  }
  const placed = [];
  const freeSpot = (x, z, gap) => placed.every((p) => Math.hypot(p.x - x, p.z - z) > gap);
  let tries = 0;
  while (placed.length < 22 && tries++ < 2500) {
    const a = Math.random() * Math.PI * 2, r = 13 + Math.random() * (PR - 15);
    const x = Math.cos(a) * r, z = PZ + Math.sin(a) * r;
    if (Math.abs(x) < 4 && z > PZ + 4) continue;
    if (!freeSpot(x, z, 4.5)) continue;
    placed.push({ x, z }); cycad(x, z, 0.9 + Math.random() * 0.5);
  }
  for (let i = 0; i < 24; i++) {
    const a = Math.random() * Math.PI * 2, r = 10 + Math.random() * (PR - 11);
    const x = Math.cos(a) * r, z = PZ + Math.sin(a) * r;
    if (Math.abs(x) < 3 && z > PZ + 4) continue;
    fern(x, z, 0.8 + Math.random() * 0.8);
  }
  // A big dinosaur skeleton lying in the grass
  const bone = mat(0xf2ead2);
  const sx = -15, sz = PZ - 6;
  const skull = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 2.2), bone); skull.position.set(sx, 0.6, sz + 5); skull.castShadow = true; scene.add(skull);
  for (let k = 0; k < 9; k++) {
    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.8), bone); spine.position.set(sx, 0.5, sz + 3.6 - k * 0.9); scene.add(spine);
    if (k > 1 && k < 7) [-1, 1].forEach((sd) => { const rib = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.6, 0.15), bone); rib.position.set(sx + sd * 0.7, 0.7, sz + 3.6 - k * 0.9); rib.rotation.z = sd * 0.5; rib.castShadow = true; scene.add(rib); });
  }
  // Tar pit
  const tar = new THREE.Mesh(new THREE.CircleGeometry(3.4, 24), new THREE.MeshPhongMaterial({ color: 0x14100c, shininess: 100, specular: 0x555555 }));
  tar.rotation.x = -Math.PI / 2; tar.position.set(15, 0.03, PZ - 10); scene.add(tar);
  // A smoking volcano in the distance and big boulders
  const cone = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 8, 9, 16), mat(0x5a4a40)); cone.position.set(10, 4.5, PZ - 22); cone.castShadow = true; scene.add(cone);
  const smokeMat = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.6 });
  const puffs = [0, 1, 2, 3].map((k) => { const sm = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 0), smokeMat); sm.position.set(10, 9.5 + k * 1.8, PZ - 22); scene.add(sm); return sm; });
  worldTicks.push((dt, t) => { puffs.forEach((sm, k) => { const ph = (t * 0.25 + k / 4) % 1; sm.position.y = 9.5 + ph * 8; sm.scale.setScalar(0.6 + ph * 1.4); }); });
  for (let i = 0; i < 10; i++) {
    const a = Math.random() * Math.PI * 2, r = 9 + Math.random() * (PR - 11);
    const x = Math.cos(a) * r, z = PZ + Math.sin(a) * r;
    if (Math.abs(x) < 3 && z > PZ) continue;
    const rk = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7 + Math.random() * 0.8, 0), mat(0x8a7a6a));
    rk.position.set(x, 0.5, z); rk.castShadow = true; scene.add(rk);
  }
})();

// Starry space pattern, shared by the Cosmic Man, his egg and his baby
const cosmicTex = (function () {
  const c = document.createElement('canvas'); c.width = 128; c.height = 128; const x = c.getContext('2d');
  const gr = x.createLinearGradient(0, 0, 128, 128); gr.addColorStop(0, '#1a1050'); gr.addColorStop(0.5, '#3a1a7a'); gr.addColorStop(1, '#10204a');
  x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
  x.fillStyle = 'rgba(255,120,220,0.25)'; x.beginPath(); x.arc(40, 80, 30, 0, 7); x.fill();
  x.fillStyle = 'rgba(80,200,255,0.2)'; x.beginPath(); x.arc(95, 35, 25, 0, 7); x.fill();
  x.fillStyle = '#ffffff';
  for (let i = 0; i < 70; i++) { const r = (i % 7 === 0) ? 2 : 1; x.fillRect((i * 53) % 128, (i * 97) % 128, r, r); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
})();
