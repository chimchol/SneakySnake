// ---------- Zone 6: ice land ----------
(function buildIce() {
  const top = new THREE.Mesh(new THREE.CylinderGeometry(IR, IR, 1, 64), mat(0xf2f8ff));
  top.position.set(0, -0.5, IZ); top.receiveShadow = true; scene.add(top);
  const cliff = new THREE.Mesh(new THREE.CylinderGeometry(IR - 0.2, IR * 0.85, 4, 64), mat(0xa8d4ee));
  cliff.position.set(0, -3, IZ); scene.add(cliff);
  const irock = new THREE.Mesh(new THREE.ConeGeometry(IR * 0.85, 24, 30), mat(0x7aa8c8));
  irock.position.set(0, -17, IZ); irock.rotation.x = Math.PI; scene.add(irock);
  // Frozen pond
  const iceMat = new THREE.MeshPhongMaterial({ color: 0xbfe8ff, shininess: 120, specular: 0xffffff, transparent: true, opacity: 0.85 });
  const pond = new THREE.Mesh(new THREE.CircleGeometry(6, 32), iceMat); pond.rotation.x = -Math.PI / 2; pond.position.set(-12, 0.03, IZ - 10); scene.add(pond);
  // Glowing ice crystals
  const crystal = new THREE.MeshPhongMaterial({ color: 0x8fe0ff, emissive: 0x1a6a8a, shininess: 120, specular: 0xffffff, transparent: true, opacity: 0.85 });
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2 + Math.random() * 0.2;
    if (Math.sin(a) > 0.55) continue;
    const r = 14 + Math.random() * (IR - 17), h = 1.5 + Math.random() * 3;
    const c = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), crystal);
    c.scale.set(0.8, h, 0.8); c.position.set(Math.cos(a) * r, h * 0.7, IZ + Math.sin(a) * r); c.rotation.y = Math.random() * 3; c.castShadow = true; scene.add(c);
  }
  // Snowy pine trees
  const snowCap = mat(0xffffff), pineDark = mat(0x2a5a4a);
  for (let i = 0; i < 14; i++) {
    const a = Math.random() * Math.PI * 2, r = 16 + Math.random() * (IR - 19);
    const x = Math.cos(a) * r, z = IZ + Math.sin(a) * r;
    if (Math.abs(x) < 5 && z > IZ) continue;
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 1.4, 6), mat(0x6b4220)); trunk.position.y = 0.7; t.add(trunk);
    for (let k = 0; k < 3; k++) {
      const c = new THREE.Mesh(new THREE.ConeGeometry(1.8 - k * 0.45, 1.8, 8), pineDark); c.position.y = 1.8 + k * 1.05; c.castShadow = true; t.add(c);
      const cap = new THREE.Mesh(new THREE.ConeGeometry((1.8 - k * 0.45) * 0.7, 0.7, 8), snowCap); cap.position.y = 2.35 + k * 1.05; t.add(cap);
    }
    t.position.set(x, 0, z); scene.add(t);
  }
  // An igloo
  const snow = mat(0xf8fbff);
  const igloo = new THREE.Mesh(new THREE.SphereGeometry(3, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), snow); igloo.position.set(14, 0, IZ - 8); igloo.castShadow = true; scene.add(igloo);
  const door = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.6, 1.6), snow); door.position.set(12, 0.8, IZ - 6.2); door.rotation.y = 0.8; scene.add(door);
  const hole = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.2), mat(0x203040)); hole.position.set(11.4, 0.7, IZ - 5.6); hole.rotation.y = 0.8; scene.add(hole);
  // Snowballs and lumps
  for (let i = 0; i < 14; i++) {
    const a = Math.random() * Math.PI * 2, r = 9 + Math.random() * (IR - 10);
    const x = Math.cos(a) * r, z = IZ + Math.sin(a) * r;
    if (Math.abs(x) < 3 && z > IZ) continue;
    const lump = new THREE.Mesh(new THREE.SphereGeometry(0.4 + Math.random() * 0.6, 10, 8), snow); lump.scale.y = 0.6; lump.position.set(x, 0.1, z); scene.add(lump);
  }
  // Falling snow
  const N = 220, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * IR * 2; pos[i * 3 + 1] = Math.random() * 16; pos[i * 3 + 2] = IZ + (Math.random() - 0.5) * IR * 2; }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 })));
  worldTicks.push((dt, t) => {
    for (let i = 0; i < N; i++) {
      pos[i * 3 + 1] -= dt * (1.2 + (i % 4) * 0.3); pos[i * 3] += Math.sin(t + i) * dt * 0.3;
      if (pos[i * 3 + 1] < 0) pos[i * 3 + 1] = 16;
    }
    sg.attributes.position.needsUpdate = true;
  });
})();
