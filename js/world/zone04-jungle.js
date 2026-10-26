// ---------- Zone 4: the jungle island ----------
(function buildJungle() {
  const top = new THREE.Mesh(new THREE.CylinderGeometry(JR, JR, 1, 64), mat(0x2f7a2a));
  top.position.set(0, -0.5, JZ); top.receiveShadow = true; scene.add(top);
  const jdirt = new THREE.Mesh(new THREE.CylinderGeometry(JR - 0.2, JR * 0.85, 4, 64), mat(0x5a3a1f));
  jdirt.position.set(0, -3, JZ); scene.add(jdirt);
  const jrock = new THREE.Mesh(new THREE.ConeGeometry(JR * 0.85, 22, 30), mat(0x4a5a4a));
  jrock.position.set(0, -16, JZ); jrock.rotation.x = Math.PI; scene.add(jrock);
  const leafA = mat(0x1f6b2a), leafB = mat(0x2f8a3a), leafC = mat(0x3fa046), trunkM = mat(0x5a3a1f), vine = mat(0x3f9a3a);
  function bigTree(x, z, s) {
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.45 * s, 0.7 * s, 7 * s, 8), trunkM);
    trunk.position.y = 3.5 * s; trunk.castShadow = true; t.add(trunk);
    [[0, 7.2, 0, 3.2, leafA], [1.5, 6.4, 0.6, 2.2, leafB], [-1.4, 6.6, -0.4, 2.3, leafC], [0.3, 8.4, -0.5, 2.0, leafB]].forEach(([dx, dy, dz, r, m]) => {
      const c = new THREE.Mesh(new THREE.IcosahedronGeometry(r * s, 0), m); c.position.set(dx * s, dy * s, dz * s); c.scale.y = 0.6; c.castShadow = true; t.add(c);
    });
    // hanging vines
    for (let k = 0; k < 3; k++) {
      const len = 2 + Math.random() * 3;
      const v = new THREE.Mesh(new THREE.BoxGeometry(0.08, len, 0.08), vine);
      const a = Math.random() * 6; v.position.set(Math.cos(a) * 2.2 * s, 6.4 * s - len / 2, Math.sin(a) * 2.2 * s); t.add(v);
    }
    t.position.set(x, 0, z); t.rotation.y = Math.random() * 6; scene.add(t);
  }
  function fern(x, z) {
    const g = new THREE.Group();
    for (let k = 0; k < 6; k++) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.05, 1.4), k % 2 ? leafB : leafC);
      leaf.rotation.set(-0.5, k * 1.05, 0); leaf.position.y = 0.35; leaf.translateZ(0.55); g.add(leaf);
    }
    g.position.set(x, 0, z); scene.add(g);
  }
  function flower(x, z, color) {
    const st = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.06), leafC); st.position.set(x, 0.3, z); scene.add(st);
    const f = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 0), mat(color)); f.position.set(x, 0.65, z); scene.add(f);
  }
  const placed = [];
  const freeSpot = (x, z, gap) => placed.every((p) => Math.hypot(p.x - x, p.z - z) > gap);
  let tries = 0;
  while (placed.length < 26 && tries++ < 2500) {
    const a = Math.random() * Math.PI * 2, r = 11 + Math.random() * (JR - 13);
    const x = Math.cos(a) * r, z = JZ + Math.sin(a) * r;
    if (Math.abs(x) < 4 && z > JZ + 4) continue; // path from the pole
    if (!freeSpot(x, z, 4.5)) continue;
    placed.push({ x, z }); bigTree(x, z, 0.85 + Math.random() * 0.4);
  }
  for (let i = 0; i < 30; i++) {
    const a = Math.random() * Math.PI * 2, r = 9 + Math.random() * (JR - 10);
    const x = Math.cos(a) * r, z = JZ + Math.sin(a) * r;
    if (Math.abs(x) < 3 && z > JZ + 4) continue;
    if (i % 3 === 0) flower(x, z, [0xff4b6e, 0xffb03a, 0xb05aff][i % 3 === 0 ? (i / 3) % 3 : 0]); else fern(x, z);
  }
  // Old stone ruins
  const stone = mat(0x8a9a88), mossy = mat(0x6a8a5a);
  [[-12, JZ - 12], [13, JZ - 9]].forEach(([x, z], k) => {
    for (let i = 0; i < 3; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(2.4 - i * 0.6, 1, 2.4 - i * 0.6), i % 2 ? mossy : stone);
      b.position.set(x, 0.5 + i, z); b.castShadow = true; b.receiveShadow = true; scene.add(b);
    }
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.6, 0.7), stone); pillar.position.set(x + (k ? -2.6 : 2.6), 1.3, z + 1.5); pillar.castShadow = true; scene.add(pillar);
  });
})();
