// ---------- Zone 5: the volcano island ----------
const lavaMat = new THREE.MeshBasicMaterial({ color: 0xff6a1a });
(function buildVolcano() {
  const top = new THREE.Mesh(new THREE.CylinderGeometry(VR, VR, 1, 64), mat(0x3a2a2a));
  top.position.set(0, -0.5, VZ); top.receiveShadow = true; scene.add(top);
  const vdirt = new THREE.Mesh(new THREE.CylinderGeometry(VR - 0.2, VR * 0.85, 4, 64), mat(0x2a1a1a));
  vdirt.position.set(0, -3, VZ); scene.add(vdirt);
  const vrock = new THREE.Mesh(new THREE.ConeGeometry(VR * 0.85, 24, 30), mat(0x2a2030));
  vrock.position.set(0, -17, VZ); vrock.rotation.x = Math.PI; scene.add(vrock);
  // The big volcano at the back
  const cone = new THREE.Mesh(new THREE.CylinderGeometry(4, 13, 14, 20), mat(0x4a3030));
  cone.position.set(0, 7, VZ - 19); cone.castShadow = true; scene.add(cone);
  const crater = new THREE.Mesh(new THREE.CircleGeometry(3.6, 20), lavaMat);
  crater.rotation.x = -Math.PI / 2; crater.position.set(0, 14.05, VZ - 19); scene.add(crater);
  // lava dripping down the sides
  [-0.5, 0.4, 2.6].forEach((a) => {
    const drip = new THREE.Mesh(new THREE.BoxGeometry(0.9, 13, 0.4), lavaMat);
    drip.position.set(Math.sin(a) * 8.3, 7, VZ - 19 + Math.cos(a) * 8.3); drip.rotation.y = a; drip.rotation.x = Math.cos(a) > 0 ? 0.6 : -0.6;
    drip.rotation.order = 'YXZ'; drip.rotation.set(Math.cos(a) * 0.62, a, -Math.sin(a) * 0.62); scene.add(drip);
  });
  const glow = new THREE.PointLight(0xff6a1a, 2.2, 45); glow.position.set(0, 16, VZ - 19); scene.add(glow);
  // Lava rivers across the ground
  [[-12, VZ + 4, 0.5, 14], [13, VZ - 2, -0.7, 12], [-6, VZ - 10, 1.2, 9]].forEach(([x, z, r, len]) => {
    const river = new THREE.Mesh(new THREE.PlaneGeometry(1.6, len), lavaMat);
    river.rotation.x = -Math.PI / 2; river.rotation.z = r; river.position.set(x, 0.03, z); scene.add(river);
  });
  // Black obsidian spikes and glowing rocks
  const obsidian = new THREE.MeshPhongMaterial({ color: 0x1a1020, shininess: 100, specular: 0x8866aa });
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + Math.random() * 0.2;
    if (Math.sin(a) > 0.55) continue;
    const r = 14 + Math.random() * (VR - 17);
    const h = 2 + Math.random() * 3;
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.7, h, 5), obsidian);
    spike.position.set(Math.cos(a) * r, h / 2, VZ + Math.sin(a) * r); spike.rotation.z = (Math.random() - 0.5) * 0.4; spike.castShadow = true; scene.add(spike);
  }
  const hotRock = new THREE.MeshLambertMaterial({ color: 0x5a2a1a, emissive: 0x7a2a00 });
  for (let i = 0; i < 12; i++) {
    const a = Math.random() * Math.PI * 2, r = 10 + Math.random() * (VR - 12);
    const x = Math.cos(a) * r, z = VZ + Math.sin(a) * r;
    if (Math.abs(x) < 3 && z > VZ) continue;
    const rk = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5 + Math.random() * 0.6, 0), hotRock);
    rk.position.set(x, 0.35, z); rk.castShadow = true; scene.add(rk);
  }
  // Embers floating up
  const N = 120, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * VR * 1.6; pos[i * 3 + 1] = Math.random() * 14; pos[i * 3 + 2] = VZ + (Math.random() - 0.5) * VR * 1.6; }
  const eg = new THREE.BufferGeometry(); eg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const embers = new THREE.Points(eg, new THREE.PointsMaterial({ color: 0xffa040, size: 0.35 }));
  scene.add(embers);
  worldTicks.push((dt, t) => {
    for (let i = 0; i < N; i++) { pos[i * 3 + 1] += dt * (1 + (i % 5) * 0.4); if (pos[i * 3 + 1] > 15) pos[i * 3 + 1] = 0; }
    eg.attributes.position.needsUpdate = true;
    lavaMat.color.setHSL(0.06 + Math.sin(t * 2) * 0.012, 1, 0.55);
    glow.intensity = 2 + Math.sin(t * 3) * 0.4;
  });
})();
