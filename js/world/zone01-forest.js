// ---------- Zone 1: the forest island ----------
(function buildForest() {
  const top = new THREE.Mesh(new THREE.CylinderGeometry(FR, FR, 1, 56), mat(0x3f8f34));
  top.position.set(0, -0.5, FZ); top.receiveShadow = true; scene.add(top);
  const fdirt = new THREE.Mesh(new THREE.CylinderGeometry(FR - 0.2, FR * 0.85, 4, 56), mat(0x6e4a2c));
  fdirt.position.set(0, -3, FZ); scene.add(fdirt);
  const frock = new THREE.Mesh(new THREE.ConeGeometry(FR * 0.85, 18, 28), mat(0x5d5163));
  frock.position.set(0, -14, FZ); frock.rotation.x = Math.PI; scene.add(frock);

  // Leaf litter
  const leaves = new THREE.InstancedMesh(new THREE.CircleGeometry(0.25, 5), new THREE.MeshLambertMaterial({ color: 0xb07a2a, side: THREE.DoubleSide }), 260);
  const q = new THREE.Object3D();
  for (let i = 0; i < 260; i++) {
    const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * (FR - 1);
    q.position.set(Math.cos(a) * r, 0.03, FZ + Math.sin(a) * r); q.rotation.set(-Math.PI / 2, 0, Math.random() * 6); q.updateMatrix();
    leaves.setMatrixAt(i, q.matrix);
  }
  scene.add(leaves);

  // Pine trees, round trees, bushes, mushrooms, logs. The middle stays clear for the boss later.
  const pineMats = [mat(0x2e7a3a), mat(0x276b33), mat(0x348a40)];
  function pine(x, z, s) {
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25 * s, 0.35 * s, 1.6 * s, 7), mat(0x6b4220));
    trunk.position.y = 0.8 * s; trunk.castShadow = true; t.add(trunk);
    const pm = pineMats[Math.floor(Math.random() * 3)];
    for (let k = 0; k < 3; k++) {
      const c = new THREE.Mesh(new THREE.ConeGeometry((1.7 - k * 0.45) * s, 1.8 * s, 8), pm);
      c.position.y = (1.8 + k * 1.05) * s; c.castShadow = true; t.add(c);
    }
    t.position.set(x, 0, z); t.rotation.y = Math.random() * 6; scene.add(t);
  }
  function mushroom(x, z) {
    const m = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.5, 8), mat(0xf3ead2)); stem.position.y = 0.25; m.add(stem);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xe2402f)); cap.position.y = 0.48; cap.castShadow = true; m.add(cap);
    [[0.15, 0.1], [-0.12, 0.18], [0.02, -0.2]].forEach(([dx, dz]) => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), mat(0xffffff)); dot.position.set(dx, 0.72, dz); m.add(dot);
    });
    m.position.set(x, 0, z); scene.add(m);
  }
  function bush(x, z) {
    const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 0), mat(0x3a9a3a));
    b.position.set(x, 0.5, z); b.scale.y = 0.7; b.castShadow = true; scene.add(b);
  }
  function fallenLog(x, z, rot) {
    const l = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 3.4, 12), [mat(0x7a4f28), mat(0xe9c48a), mat(0xe9c48a)]);
    l.rotation.set(0, rot, Math.PI / 2); l.position.set(x, 0.45, z); l.castShadow = true; scene.add(l);
  }
  const spots = [];
  const free = (x, z, gap) => spots.every((p) => Math.hypot(p.x - x, p.z - z) > gap);
  let tries = 0;
  while (spots.length < 46 && tries++ < 2000) {
    const a = Math.random() * Math.PI * 2, r = 8 + Math.random() * (FR - 10);
    const x = Math.cos(a) * r, z = FZ + Math.sin(a) * r;
    if (Math.abs(x) < 3 && z > FZ + 6) continue; // keep the path from the pole clear
    if (!free(x, z, 3)) continue;
    spots.push({ x, z }); pine(x, z, 0.9 + Math.random() * 0.6);
  }
  for (let i = 0; i < 18; i++) {
    const a = Math.random() * Math.PI * 2, r = 4 + Math.random() * (FR - 6);
    const x = Math.cos(a) * r, z = FZ + Math.sin(a) * r;
    if (Math.abs(x) < 2.5 && z > FZ + 6) continue;
    if (!free(x, z, 1.5)) continue;
    if (i % 2) mushroom(x, z); else bush(x, z);
  }
  fallenLog(-6, FZ + 2, 0.6);
  fallenLog(7, FZ - 4, -0.4);
})();
