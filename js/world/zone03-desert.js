// ---------- Zone 3: the desert island ----------
(function buildDesert() {
  const top = new THREE.Mesh(new THREE.CylinderGeometry(DR, DR, 1, 60), mat(0xeacb84));
  top.position.set(0, -0.5, DZ); top.receiveShadow = true; scene.add(top);
  const ddirt = new THREE.Mesh(new THREE.CylinderGeometry(DR - 0.2, DR * 0.85, 4, 60), mat(0xc98d4a));
  ddirt.position.set(0, -3, DZ); scene.add(ddirt);
  const drock = new THREE.Mesh(new THREE.ConeGeometry(DR * 0.85, 20, 30), mat(0xa0583a));
  drock.position.set(0, -15, DZ); drock.rotation.x = Math.PI; scene.add(drock);
  // Sand dunes
  const duneMat = mat(0xf0d69a);
  for (let i = 0; i < 9; i++) {
    const a = Math.random() * Math.PI * 2, r = 12 + Math.random() * (DR - 15);
    const x = Math.cos(a) * r, z = DZ + Math.sin(a) * r;
    if (Math.abs(x) < 4 && z > DZ) continue;
    const d = new THREE.Mesh(new THREE.SphereGeometry(3 + Math.random() * 2, 16, 10), duneMat);
    d.scale.set(1.3, 0.25, 0.9); d.position.set(x, -0.2, z); d.rotation.y = Math.random() * 3; d.receiveShadow = true; scene.add(d);
  }
  // Cactuses
  const cac = mat(0x4f9a4a), flower = mat(0xff6fae);
  function cactus(x, z, s) {
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.7 * s, 3.2 * s, 0.7 * s), cac); trunk.position.y = 1.6 * s; trunk.castShadow = true; g.add(trunk);
    [[-1, 1.5], [1, 2.1]].forEach(([side, h]) => {
      const out = new THREE.Mesh(new THREE.BoxGeometry(0.7 * s, 0.5 * s, 0.5 * s), cac); out.position.set(side * 0.6 * s, h * s, 0); g.add(out);
      const up = new THREE.Mesh(new THREE.BoxGeometry(0.5 * s, 1.1 * s, 0.5 * s), cac); up.position.set(side * 0.85 * s, (h + 0.5) * s, 0); up.castShadow = true; g.add(up);
    });
    if (Math.random() < 0.4) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.35 * s, 0.25 * s, 0.35 * s), flower); f.position.y = 3.3 * s; g.add(f); }
    g.position.set(x, 0, z); g.rotation.y = Math.random() * 6; scene.add(g);
  }
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2 + Math.random() * 0.2;
    if (Math.sin(a) > 0.55) continue;
    const r = 13 + Math.random() * (DR - 16);
    cactus(Math.cos(a) * r, DZ + Math.sin(a) * r, 0.8 + Math.random() * 0.5);
  }
  // Red rocks
  for (let i = 0; i < 12; i++) {
    const a = Math.random() * Math.PI * 2, r = 10 + Math.random() * (DR - 12);
    const x = Math.cos(a) * r, z = DZ + Math.sin(a) * r;
    if (Math.abs(x) < 3 && z > DZ) continue;
    const rk = new THREE.Mesh(new THREE.BoxGeometry(1 + Math.random() * 1.5, 0.8 + Math.random() * 1.6, 1 + Math.random() * 1.5), mat(0xb8603a));
    rk.position.set(x, 0.5, z); rk.rotation.y = Math.random() * 3; rk.castShadow = true; scene.add(rk);
  }
  // A tiny oasis with palm trees
  const ox = -14, oz = DZ - 8;
  const pool = new THREE.Mesh(new THREE.CircleGeometry(2.6, 28), waterMat); pool.rotation.x = -Math.PI / 2; pool.position.set(ox, 0.04, oz); scene.add(pool);
  [[-2.8, -1], [2.6, 1.2]].forEach(([dx, dz]) => {
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 4, 6), mat(0x9a7a4a)); trunk.position.y = 2; trunk.rotation.z = 0.15; trunk.castShadow = true; t.add(trunk);
    for (let k = 0; k < 5; k++) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 2.2), mat(0x3f9a3a));
      leaf.position.set(0.3, 4, 0); leaf.rotation.set(0.35, k * 1.25, 0); leaf.translateZ(1); leaf.castShadow = true; t.add(leaf);
    }
    t.position.set(ox + dx, 0, oz + dz); scene.add(t);
  });
  // Bones in the sand
  const bone = mat(0xf5f0e0);
  [[8, DZ + 6, 0.4], [-6, DZ - 15, 1.2]].forEach(([x, z, r]) => {
    const b1 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.2, 0.2), bone); b1.position.set(x, 0.12, z); b1.rotation.y = r; scene.add(b1);
    const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.4), bone); b2.position.set(x + Math.cos(r) * 0.7, 0.15, z - Math.sin(r) * 0.7); b2.rotation.y = r; scene.add(b2);
  });
})();
