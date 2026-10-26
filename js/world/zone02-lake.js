// ---------- Zone 2: the lake island ----------
const waterMat = new THREE.MeshPhongMaterial({ color: 0x3a9ad9, shininess: 80, specular: 0xbfe8ff, transparent: true, opacity: 0.9 });
(function buildLake() {
  const top = new THREE.Mesh(new THREE.CylinderGeometry(LR, LR, 1, 56), mat(0x7fcf5a));
  top.position.set(0, -0.5, LZ); top.receiveShadow = true; scene.add(top);
  const ldirt = new THREE.Mesh(new THREE.CylinderGeometry(LR - 0.2, LR * 0.85, 4, 56), mat(0x7a5a3a));
  ldirt.position.set(0, -3, LZ); scene.add(ldirt);
  const lrock = new THREE.Mesh(new THREE.ConeGeometry(LR * 0.85, 18, 28), mat(0x5d6378));
  lrock.position.set(0, -14, LZ); lrock.rotation.x = Math.PI; scene.add(lrock);

  // The lake itself, with a sandy shore
  const shore = new THREE.Mesh(new THREE.CircleGeometry(LAKE_WATER.r + 1.4, 40), mat(0xe8d48a));
  shore.rotation.x = -Math.PI / 2; shore.position.set(LAKE_WATER.x, 0.015, LAKE_WATER.z); shore.receiveShadow = true; scene.add(shore);
  const water = new THREE.Mesh(new THREE.CircleGeometry(LAKE_WATER.r, 40), waterMat);
  water.rotation.x = -Math.PI / 2; water.position.set(LAKE_WATER.x, 0.04, LAKE_WATER.z); scene.add(water);
  // Lily pads with pink flowers
  const padMat = mat(0x3f9a3a), flowerMat = mat(0xff9ec8);
  for (let i = 0; i < 9; i++) {
    const a = Math.random() * Math.PI * 2, r = 1.5 + Math.random() * (LAKE_WATER.r - 2.5);
    const pad = new THREE.Mesh(new THREE.CircleGeometry(0.6, 12, 0.3, Math.PI * 1.85), padMat);
    pad.rotation.x = -Math.PI / 2; pad.rotation.z = Math.random() * 6;
    pad.position.set(LAKE_WATER.x + Math.cos(a) * r, 0.07, LAKE_WATER.z + Math.sin(a) * r); scene.add(pad);
    if (i % 3 === 0) { const f = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 0), flowerMat); f.position.set(pad.position.x, 0.2, pad.position.z); scene.add(f); }
  }
  // Reeds and cattails around the edge of the water
  const reedMat = mat(0x5b9a3a), cattail = mat(0x7a4a26);
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2 + Math.random() * 0.1;
    if (Math.sin(a) > 0.75) continue; // leave the boss's beach open
    const r = LAKE_WATER.r + 0.6 + Math.random() * 0.8, h = 1.2 + Math.random() * 1.2;
    const x = LAKE_WATER.x + Math.cos(a) * r, z = LAKE_WATER.z + Math.sin(a) * r;
    const reed = new THREE.Mesh(new THREE.BoxGeometry(0.08, h, 0.08), reedMat); reed.position.set(x, h / 2, z); reed.rotation.z = (Math.random() - 0.5) * 0.3; scene.add(reed);
    if (i % 2) { const top = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.16), cattail); top.position.set(x, h + 0.1, z); scene.add(top); }
  }
  // Round willow-ish trees and rocks around the island
  function roundTree(x, z, s) {
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3 * s, 0.4 * s, 2.2 * s, 8), mat(0x7a5a3a));
    trunk.position.y = 1.1 * s; trunk.castShadow = true; t.add(trunk);
    const top = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8 * s, 0), mat(0x6fbf4a));
    top.position.y = 2.9 * s; top.scale.y = 0.8; top.castShadow = true; t.add(top);
    t.position.set(x, 0, z); scene.add(t);
  }
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + 0.2;
    if (Math.sin(a) > 0.6) continue; // path from the pole
    const r = LR - 3 - Math.random() * 3;
    roundTree(Math.cos(a) * r, LZ + Math.sin(a) * r, 0.9 + Math.random() * 0.4);
  }
  for (let i = 0; i < 10; i++) {
    const a = Math.random() * Math.PI * 2, r = 12 + Math.random() * 8;
    const x = Math.cos(a) * r, z = LZ + Math.sin(a) * r;
    if (Math.abs(x) < 3 && z > LZ) continue;
    const rk = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5 + Math.random() * 0.5, 0), mat(0x9a9aa8));
    rk.position.set(x, 0.3, z); rk.castShadow = true; scene.add(rk);
  }
  // A little wooden dock
  const dock = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.2, 4), mat(0xb5853f));
  dock.position.set(LAKE_WATER.x - 6, 0.25, LAKE_WATER.z + 2); dock.rotation.y = 0.9; dock.castShadow = true; scene.add(dock);
})();
