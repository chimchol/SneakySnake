// ---------- Zone 13: the mystical forest ----------
const pixie = new THREE.Group();
(function buildMystical() {
  const top = new THREE.Mesh(new THREE.CylinderGeometry(MR, MR, 1, 72), new THREE.MeshLambertMaterial({ color: 0x1f5a5a, emissive: 0x041a1a }));
  top.position.set(0, -0.5, MZ); top.receiveShadow = true; scene.add(top);
  const mside = new THREE.Mesh(new THREE.CylinderGeometry(MR - 0.2, MR * 0.85, 4, 72), mat(0x3a2a4a)); mside.position.set(0, -3, MZ); scene.add(mside);
  const mrock = new THREE.Mesh(new THREE.ConeGeometry(MR * 0.85, 28, 32), mat(0x2a1a3a)); mrock.position.set(0, -19, MZ); mrock.rotation.x = Math.PI; scene.add(mrock);
  // Glowing magic trees
  const trunkM = mat(0x3a2a4a);
  const leafMats = [new THREE.MeshLambertMaterial({ color: 0x7a4aff, emissive: 0x2a0a6a }), new THREE.MeshLambertMaterial({ color: 0x3ae0c0, emissive: 0x0a4a40 }), new THREE.MeshLambertMaterial({ color: 0xff7ae0, emissive: 0x4a0a3a })];
  function magicTree(x, z, s) {
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4 * s, 0.6 * s, 5 * s, 8), trunkM); trunk.position.y = 2.5 * s; trunk.castShadow = true; t.add(trunk);
    const lm = leafMats[Math.floor(Math.random() * 3)];
    [[0, 5.6, 0, 2.4], [1.4, 4.8, 0.4, 1.6], [-1.3, 5.0, -0.3, 1.7], [0.3, 6.8, -0.3, 1.5]].forEach(([dx, dy, dz, r]) => { const c = new THREE.Mesh(new THREE.IcosahedronGeometry(r * s, 0), lm); c.position.set(dx * s, dy * s, dz * s); c.castShadow = true; t.add(c); });
    t.position.set(x, 0, z); t.rotation.y = Math.random() * 6; scene.add(t);
  }
  const placed = [];
  const freeSpot = (x, z, gap) => placed.every((p) => Math.hypot(p.x - x, p.z - z) > gap);
  let tries = 0;
  while (placed.length < 24 && tries++ < 3000) {
    const a = Math.random() * Math.PI * 2, r = 14 + Math.random() * (MR - 16);
    const x = Math.cos(a) * r, z = MZ + Math.sin(a) * r;
    if (Math.abs(x) < 5 && z > MZ + 4) continue;
    if (Math.hypot(x - PIXIE_SPOT.x, z - PIXIE_SPOT.z) < 10) continue;
    if (!freeSpot(x, z, 5)) continue;
    placed.push({ x, z }); magicTree(x, z, 0.9 + Math.random() * 0.5);
  }
  // Glowing mushrooms
  const capMats = [new THREE.MeshBasicMaterial({ color: 0x5af0ff }), new THREE.MeshBasicMaterial({ color: 0xff7ae0 }), new THREE.MeshBasicMaterial({ color: 0xb07aff })];
  for (let i = 0; i < 30; i++) {
    const a = Math.random() * Math.PI * 2, r = 9 + Math.random() * (MR - 10);
    const x = Math.cos(a) * r, z = MZ + Math.sin(a) * r;
    if (Math.abs(x) < 3 && z > MZ + 4) continue;
    const sz = 0.5 + Math.random() * 0.8;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.1 * sz, 0.14 * sz, 0.7 * sz, 6), mat(0xe8e0f0)); stem.position.set(x, 0.35 * sz, z); scene.add(stem);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.4 * sz, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), capMats[i % 3]); cap.position.set(x, 0.65 * sz, z); scene.add(cap);
  }
  // The giant hollow log, with the Pixie floating next to it
  const logM = mat(0x5a3a2a), dark = mat(0x140a10), moss = new THREE.MeshLambertMaterial({ color: 0x3aa86a, emissive: 0x0a2a14 });
  const bigLog = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 16, 20, 1, true), new THREE.MeshLambertMaterial({ color: 0x5a3a2a, side: THREE.DoubleSide }));
  bigLog.rotation.z = Math.PI / 2; bigLog.position.set(PIXIE_SPOT.x - 6, 4, PIXIE_SPOT.z - 7); bigLog.castShadow = true; scene.add(bigLog);
  const opening = new THREE.Mesh(new THREE.CircleGeometry(3.6, 20), dark); opening.rotation.y = Math.PI / 2; opening.position.set(PIXIE_SPOT.x + 2.05, 4, PIXIE_SPOT.z - 7); scene.add(opening);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(3.9, 0.35, 8, 24), logM); rim.rotation.y = Math.PI / 2; rim.position.set(PIXIE_SPOT.x + 2.1, 4, PIXIE_SPOT.z - 7); scene.add(rim);
  for (let k = 0; k < 6; k++) { const m = new THREE.Mesh(new THREE.BoxGeometry(2, 0.3, 1.5), moss); m.position.set(PIXIE_SPOT.x - 12 + k * 2.4, 7.9, PIXIE_SPOT.z - 7 + (k % 2 - 0.5)); scene.add(m); }
  // Pixie: a tiny glowing fairy
  const glowP = new THREE.MeshBasicMaterial({ color: 0xfff2ff }), wingP = new THREE.MeshBasicMaterial({ color: 0xb0f0ff, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
  const pb = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.45, 0.2), new THREE.MeshBasicMaterial({ color: 0x8af0c0 })); pixie.add(pb);
  const ph = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.28), mat(0xf6dcc0)); ph.position.y = 0.38; pixie.add(ph);
  const hairP = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.32), mat(0xff7ae0)); hairP.position.y = 0.55; pixie.add(hairP);
  const pw = [-1, 1].map((sd) => { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.6), wingP); w.position.set(sd * 0.25, 0.15, -0.12); w.rotation.y = sd * 0.6; pixie.add(w); return w; });
  const wand = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.4, 0.03), mat(0xf2d06a)); wand.position.set(0.25, 0.1, 0.1); pixie.add(wand);
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.08, 0), glowP); star.position.set(0.25, 0.32, 0.1); pixie.add(star);
  const pl = new THREE.PointLight(0xc0a0ff, 1.5, 6); pixie.add(pl);
  pixie.scale.setScalar(1.6);
  pixie.position.set(PIXIE_SPOT.x, 2.2, PIXIE_SPOT.z); scene.add(pixie);
  // Fireflies
  const N = 160, pos = new Float32Array(N * 3), base = [];
  for (let i = 0; i < N; i++) { const x = (Math.random() - 0.5) * MR * 1.8, y = 0.5 + Math.random() * 7, z = MZ + (Math.random() - 0.5) * MR * 1.8; base.push([x, y, z]); pos.set([x, y, z], i * 3); }
  const fg = new THREE.BufferGeometry(); fg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const ffMat = new THREE.PointsMaterial({ color: 0xfff27a, size: 0.35, transparent: true });
  scene.add(new THREE.Points(fg, ffMat));
  worldTicks.push((dt, t) => {
    for (let i = 0; i < N; i++) { const b = base[i]; pos[i * 3] = b[0] + Math.sin(t * 0.7 + i) * 0.8; pos[i * 3 + 1] = b[1] + Math.sin(t * 1.1 + i * 2) * 0.5; pos[i * 3 + 2] = b[2] + Math.cos(t * 0.6 + i) * 0.8; }
    fg.attributes.position.needsUpdate = true;
    ffMat.opacity = 0.6 + Math.sin(t * 4) * 0.3;
    pixie.position.y = 2.2 + Math.sin(t * 2) * 0.3; pixie.rotation.y = Math.sin(t * 0.8) * 0.6;
    pw.forEach((w, k) => { w.rotation.y = (k ? 1 : -1) * (0.6 + Math.sin(t * 25) * 0.5); });
  });
})();
