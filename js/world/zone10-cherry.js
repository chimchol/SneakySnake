// ---------- Zone 10: cherry blossom island ----------
(function buildBlossom() {
  const top = new THREE.Mesh(new THREE.CylinderGeometry(BR, BR, 1, 64), mat(0x8ac86a));
  top.position.set(0, -0.5, BZ); top.receiveShadow = true; scene.add(top);
  const bside = new THREE.Mesh(new THREE.CylinderGeometry(BR - 0.2, BR * 0.85, 4, 64), mat(0x7a5a4a));
  bside.position.set(0, -3, BZ); scene.add(bside);
  const brock = new THREE.Mesh(new THREE.ConeGeometry(BR * 0.85, 24, 30), mat(0x6a5a6a));
  brock.position.set(0, -17, BZ); brock.rotation.x = Math.PI; scene.add(brock);
  // Petals on the grass
  const petalMat = new THREE.MeshLambertMaterial({ color: 0xffb8d0, side: THREE.DoubleSide });
  const fallen = new THREE.InstancedMesh(new THREE.CircleGeometry(0.18, 5), petalMat, 300);
  const q = new THREE.Object3D();
  for (let i = 0; i < 300; i++) { const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * (BR - 1); q.position.set(Math.cos(a) * r, 0.03, BZ + Math.sin(a) * r); q.rotation.set(-Math.PI / 2, 0, Math.random() * 6); q.updateMatrix(); fallen.setMatrixAt(i, q.matrix); }
  scene.add(fallen);
  // Cherry blossom trees
  const pinkA = mat(0xffb0cc), pinkB = mat(0xff8ab8), pinkC = mat(0xffd0e0), bark = mat(0x5a3a3a);
  function sakura(x, z, s) {
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3 * s, 0.45 * s, 3.2 * s, 7), bark); trunk.position.y = 1.6 * s; trunk.rotation.z = 0.1; trunk.castShadow = true; t.add(trunk);
    const br1 = new THREE.Mesh(new THREE.CylinderGeometry(0.15 * s, 0.22 * s, 2 * s, 6), bark); br1.position.set(0.6 * s, 3.2 * s, 0); br1.rotation.z = -0.8; t.add(br1);
    [[0, 4.2, 0, 2.2, pinkA], [1.6, 3.8, 0.5, 1.6, pinkB], [-1.4, 3.9, -0.3, 1.7, pinkC], [0.4, 5.0, -0.6, 1.4, pinkB]].forEach(([dx, dy, dz, r, m]) => {
      const c = new THREE.Mesh(new THREE.IcosahedronGeometry(r * s, 1), m); c.position.set(dx * s, dy * s, dz * s); c.scale.y = 0.75; c.castShadow = true; t.add(c);
    });
    t.position.set(x, 0, z); t.rotation.y = Math.random() * 6; scene.add(t);
  }
  const placed = [];
  const freeSpot = (x, z, gap) => placed.every((p) => Math.hypot(p.x - x, p.z - z) > gap);
  let tries = 0;
  while (placed.length < 20 && tries++ < 2500) {
    const a = Math.random() * Math.PI * 2, r = 13 + Math.random() * (BR - 15);
    const x = Math.cos(a) * r, z = BZ + Math.sin(a) * r;
    if (Math.abs(x) < 5 && z > BZ + 4) continue;
    if (Math.hypot(x - 14, z - (BZ - 10)) < 7) continue; // pond
    if (!freeSpot(x, z, 5)) continue;
    placed.push({ x, z }); sakura(x, z, 0.9 + Math.random() * 0.4);
  }
  // A red torii gate at the entrance
  const red = mat(0xd0302a), black = mat(0x1a1a1a);
  const gz = BZ + BR - 7;
  [-2.6, 2.6].forEach((x) => { const post = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 5, 10), red); post.position.set(x, 2.5, gz); post.castShadow = true; scene.add(post); });
  const beam1 = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.5, 0.6), black); beam1.position.set(0, 5.2, gz); beam1.castShadow = true; scene.add(beam1);
  const beam2 = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.35, 0.45), red); beam2.position.set(0, 4.2, gz); scene.add(beam2);
  // Koi pond with an arched bridge
  const pond = new THREE.Mesh(new THREE.CircleGeometry(5, 32), new THREE.MeshPhongMaterial({ color: 0x3a9ad9, shininess: 80, specular: 0xbfe8ff }));
  pond.rotation.x = -Math.PI / 2; pond.position.set(14, 0.04, BZ - 10); scene.add(pond);
  for (let k = 0; k < 7; k++) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 1.0), red);
    const u = k / 6 - 0.5; plank.position.set(14 + u * 7, 0.4 + Math.cos(u * Math.PI) * 1.0, BZ - 10); plank.rotation.z = -Math.sin(u * Math.PI) * 0.5; plank.rotation.y = Math.PI / 2; scene.add(plank);
  }
  // Stone lanterns
  const stone = mat(0xa8a49a), glowL = new THREE.MeshBasicMaterial({ color: 0xffe0a0 });
  [[-8, BZ + 14], [8, BZ + 14], [-16, BZ - 4]].forEach(([x, z]) => {
    const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.3, 0.9), stone); b1.position.set(x, 0.15, z); scene.add(b1);
    const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.2, 0.35), stone); b2.position.set(x, 0.9, z); scene.add(b2);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.55, 0.7), glowL); lamp.position.set(x, 1.75, z); scene.add(lamp);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.75, 0.5, 4), stone); roof.position.set(x, 2.3, z); roof.rotation.y = Math.PI / 4; scene.add(roof);
  });
  // Falling petals
  const N = 200, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * BR * 2; pos[i * 3 + 1] = Math.random() * 12; pos[i * 3 + 2] = BZ + (Math.random() - 0.5) * BR * 2; }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xffb0cc, size: 0.35 })));
  worldTicks.push((dt, t) => {
    for (let i = 0; i < N; i++) { pos[i * 3 + 1] -= dt * (0.6 + (i % 3) * 0.25); pos[i * 3] += Math.sin(t * 1.3 + i) * dt * 0.6; if (pos[i * 3 + 1] < 0) pos[i * 3 + 1] = 12; }
    pg.attributes.position.needsUpdate = true;
  });
})();
