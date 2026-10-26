// ---------- Zone 7: the ocean island ----------
(function buildOcean() {
  const top = new THREE.Mesh(new THREE.CylinderGeometry(OR, OR, 1, 64), mat(0xf2dc9a));
  top.position.set(0, -0.5, OZ); top.receiveShadow = true; scene.add(top);
  const side = new THREE.Mesh(new THREE.CylinderGeometry(OR - 0.2, OR * 0.85, 4, 64), mat(0xd9b46a));
  side.position.set(0, -3, OZ); scene.add(side);
  const orock = new THREE.Mesh(new THREE.ConeGeometry(OR * 0.85, 24, 30), mat(0x4a6a8a));
  orock.position.set(0, -17, OZ); orock.rotation.x = Math.PI; scene.add(orock);
  // A big lagoon behind the boss, with a coral reef
  const sea = new THREE.MeshPhongMaterial({ color: 0x1a8ad0, shininess: 90, specular: 0xbfe8ff, transparent: true, opacity: 0.88 });
  const shallow = new THREE.Mesh(new THREE.CircleGeometry(12, 40), new THREE.MeshPhongMaterial({ color: 0x5ad0e0, shininess: 80 }));
  shallow.rotation.x = -Math.PI / 2; shallow.position.set(0, 0.02, OZ - 16); scene.add(shallow);
  const deep = new THREE.Mesh(new THREE.CircleGeometry(9, 40), sea);
  deep.rotation.x = -Math.PI / 2; deep.position.set(0, 0.04, OZ - 17); scene.add(deep);
  const coralColors = [0xff6f8a, 0xffa040, 0xb05aff, 0xffe14a, 0x40d0b0];
  for (let i = 0; i < 26; i++) {
    const a = Math.random() * Math.PI * 2, r = 3 + Math.random() * 8;
    const x = Math.cos(a) * r, z = OZ - 17 + Math.sin(a) * r;
    const h = 0.4 + Math.random() * 1.2;
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.3, h, 0.3), mat(coralColors[i % 5]));
    c.position.set(x, h / 2, z); c.rotation.z = (Math.random() - 0.5) * 0.6; scene.add(c);
    if (i % 3 === 0) { const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.35, 0), mat(coralColors[(i + 2) % 5])); b.position.set(x, h + 0.1, z); scene.add(b); }
  }
  // Palm trees around the beach
  function palm(x, z) {
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 4.5, 6), mat(0x9a7a4a)); trunk.position.y = 2.25; trunk.rotation.z = 0.18; trunk.castShadow = true; t.add(trunk);
    for (let k = 0; k < 6; k++) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 2.4), mat(0x3f9a3a));
      leaf.position.set(0.4, 4.4, 0); leaf.rotation.set(0.35, k * 1.05, 0); leaf.translateZ(1.1); leaf.castShadow = true; t.add(leaf);
    }
    for (let k = 0; k < 3; k++) { const nut = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), mat(0x6b4220)); nut.position.set(0.4 + Math.cos(k * 2) * 0.25, 4.15, Math.sin(k * 2) * 0.25); t.add(nut); }
    t.position.set(x, 0, z); t.rotation.y = Math.random() * 6; scene.add(t);
  }
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + 0.2;
    if (Math.sin(a) > 0.55 || Math.sin(a) < -0.7) continue; // keep the pole path and the lagoon clear
    const r = OR - 3 - Math.random() * 3;
    palm(Math.cos(a) * r, OZ + Math.sin(a) * r);
  }
  // Seashells, starfish and rocks on the sand
  const shellCols = [0xffd0e0, 0xfff2d0, 0xffb0a0];
  for (let i = 0; i < 20; i++) {
    const a = Math.random() * Math.PI * 2, r = 6 + Math.random() * (OR - 8);
    const x = Math.cos(a) * r, z = OZ + Math.sin(a) * r;
    if ((Math.abs(x) < 3 && z > OZ) || Math.hypot(x, z - (OZ - 16)) < 12.5) continue;
    if (i % 3 === 0) {
      const star = new THREE.Group();
      for (let k = 0; k < 5; k++) { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.4), mat(0xff7a5a)); arm.rotation.y = k * 1.257; arm.translateZ(0.18); star.add(arm); }
      star.position.set(x, 0.05, z); scene.add(star);
    } else {
      const sh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6, 0, Math.PI), mat(shellCols[i % 3])); sh.rotation.x = -Math.PI / 2; sh.position.set(x, 0.02, z); scene.add(sh);
    }
  }
  // A little rowing boat on the beach
  const boat = new THREE.Group();
  const hull = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 3.4), mat(0x8a4a2a)); hull.position.y = 0.3; hull.castShadow = true; boat.add(hull);
  const inside = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.3, 3.0), mat(0xc98d4a)); inside.position.y = 0.5; boat.add(inside);
  boat.position.set(13, 0, OZ + 4); boat.rotation.y = 0.6; scene.add(boat);
  worldTicks.push((dt, t) => { deep.material.opacity = 0.84 + Math.sin(t * 1.5) * 0.06; });
})();
