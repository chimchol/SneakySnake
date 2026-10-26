// ---------- Zone 12: angels & demons island (left half heaven, right half underworld) ----------
(function buildAngelsDemons() {
  const heavenM = mat(0xfff8e6), hellM = new THREE.MeshLambertMaterial({ color: 0x3a1418, emissive: 0x1a0404 });
  // three.js cylinders start at +z and go toward +x, so theta 0..PI is the right (x > 0) half
  const hell = new THREE.Mesh(new THREE.CylinderGeometry(AR, AR, 1, 40, 1, false, 0, Math.PI), hellM);
  hell.position.set(0, -0.5, AZ); hell.receiveShadow = true; scene.add(hell);
  const heaven = new THREE.Mesh(new THREE.CylinderGeometry(AR, AR, 1, 40, 1, false, Math.PI, Math.PI), heavenM);
  heaven.position.set(0, -0.5, AZ); heaven.receiveShadow = true; scene.add(heaven);
  const aside = new THREE.Mesh(new THREE.CylinderGeometry(AR - 0.2, AR * 0.85, 4, 64), mat(0x6a5a6a)); aside.position.set(0, -3, AZ); scene.add(aside);
  const arock = new THREE.Mesh(new THREE.ConeGeometry(AR * 0.85, 26, 30), mat(0x4a3a4a)); arock.position.set(0, -18, AZ); arock.rotation.x = Math.PI; scene.add(arock);
  // A glowing line down the middle where the two worlds meet
  const seam = new THREE.Mesh(new THREE.PlaneGeometry(0.5, AR * 2), new THREE.MeshBasicMaterial({ color: 0xffd8a0 })); seam.rotation.x = -Math.PI / 2; seam.position.set(0, 0.03, AZ); scene.add(seam);
  // Heaven side: soft clouds, golden pillars, beams of light
  const cloud = mat(0xffffff), gold = new THREE.MeshPhongMaterial({ color: 0xf2d06a, shininess: 90, specular: 0xffffff });
  for (let i = 0; i < 12; i++) {
    const x = -6 - Math.random() * (AR - 10), z = AZ + (Math.random() - 0.5) * AR * 1.4;
    if (Math.hypot(x, z - AZ) > AR - 3 || Math.hypot(x + 7, z - (AZ - 3)) < 9) continue;
    const g = new THREE.Group();
    for (let k = 0; k < 4; k++) { const puff = new THREE.Mesh(new THREE.SphereGeometry(0.9 + Math.random() * 0.6, 12, 8), cloud); puff.position.set((k - 1.5) * 0.9, 0.5 + Math.random() * 0.4, Math.random() * 0.6); g.add(puff); }
    g.position.set(x, 0, z); scene.add(g);
  }
  for (let i = 0; i < 7; i++) {
    const a = Math.PI * (0.62 + i * 0.12); const r = AR - 5;
    const x = Math.sin(a) * r * -1 * -1, z = AZ + Math.cos(a) * r;
    const px = -Math.abs(x);
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 7, 12), gold); col.position.set(px, 3.5, z); col.castShadow = true; scene.add(col);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 30, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff2c0, transparent: true, opacity: 0.18, side: THREE.DoubleSide })); beam.position.set(px, 15, z); scene.add(beam);
  }
  // Underworld side: lava cracks, dark spikes, fire bowls
  const lava = new THREE.MeshBasicMaterial({ color: 0xff4a1a });
  for (let i = 0; i < 9; i++) {
    const crack = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 4 + Math.random() * 6), lava);
    crack.rotation.x = -Math.PI / 2; crack.rotation.z = Math.random() * 3; crack.position.set(8 + Math.random() * (AR - 14), 0.04, AZ + (Math.random() - 0.5) * AR * 1.3);
    if (Math.hypot(crack.position.x, crack.position.z - AZ) < AR - 3) scene.add(crack);
  }
  const spikeM = new THREE.MeshPhongMaterial({ color: 0x1a0a10, shininess: 100, specular: 0x884444 });
  const fire = new THREE.MeshBasicMaterial({ color: 0xff7a1a }), flames = [];
  for (let i = 0; i < 7; i++) {
    const a = Math.PI * (0.62 + i * 0.12); const r = AR - 5;
    const px = Math.abs(Math.sin(a) * r), z = AZ + Math.cos(a) * r;
    const h = 3 + Math.random() * 3;
    const sp = new THREE.Mesh(new THREE.ConeGeometry(0.8, h, 5), spikeM); sp.position.set(px, h / 2, z); sp.castShadow = true; scene.add(sp);
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.4, 0.6, 10), spikeM); bowl.position.set(px - 2.2, 1.6, z); scene.add(bowl);
    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.3, 0.2), spikeM); stand.position.set(px - 2.2, 0.65, z); scene.add(stand);
    const fl = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1, 6), fire); fl.position.set(px - 2.2, 2.3, z); scene.add(fl); flames.push(fl);
  }
  worldTicks.push((dt, t) => { flames.forEach((fl, i) => { fl.scale.y = 0.8 + Math.abs(Math.sin(t * 7 + i)) * 0.6; }); lava.color.setHSL(0.04 + Math.sin(t * 2) * 0.01, 1, 0.55); });
})();
