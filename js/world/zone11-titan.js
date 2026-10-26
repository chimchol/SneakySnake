// ---------- Zone 11: titan temple island ----------
(function buildTemple() {
  const sand = mat(0xd8c08a), stoneM = mat(0xb8a888), darkStone = mat(0x8a7a60), goldM = new THREE.MeshPhongMaterial({ color: 0xf2bd2c, shininess: 90, specular: 0xfff2b0 }), vine = mat(0x4a8a3a);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(TR, TR, 1, 64), sand);
  top.position.set(0, -0.5, TZ); top.receiveShadow = true; scene.add(top);
  const tside = new THREE.Mesh(new THREE.CylinderGeometry(TR - 0.2, TR * 0.85, 4, 64), darkStone);
  tside.position.set(0, -3, TZ); scene.add(tside);
  const trock = new THREE.Mesh(new THREE.ConeGeometry(TR * 0.85, 24, 30), mat(0x6a5a48));
  trock.position.set(0, -17, TZ); trock.rotation.x = Math.PI; scene.add(trock);
  // Stone floor path to the temple
  const path = new THREE.Mesh(new THREE.PlaneGeometry(6, TR * 1.6), mat(0xc8b490)); path.rotation.x = -Math.PI / 2; path.position.set(0, 0.02, TZ); path.receiveShadow = true; scene.add(path);
  // The big temple at the back: steps, columns, roof, golden top
  const tz = TZ - 21;
  for (let k = 0; k < 5; k++) { const st = new THREE.Mesh(new THREE.BoxGeometry(22 - k * 2.2, 0.9, 9 - k * 0.9), k % 2 ? stoneM : darkStone); st.position.set(0, 0.45 + k * 0.9, tz); st.castShadow = true; st.receiveShadow = true; scene.add(st); }
  const hall = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 4), stoneM); hall.position.set(0, 7.5, tz - 0.5); hall.castShadow = true; scene.add(hall);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(3, 4.2), mat(0x2a2018)); door.position.set(0, 6.6, tz + 1.51); scene.add(door);
  [-4.4, -2.2, 2.2, 4.4].forEach((x) => { const col = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 6, 12), stoneM); col.position.set(x, 7.5, tz + 2.1); col.castShadow = true; scene.add(col); });
  const roof = new THREE.Mesh(new THREE.ConeGeometry(7.5, 3, 4), darkStone); roof.position.set(0, 12, tz); roof.rotation.y = Math.PI / 4; roof.scale.z = 0.5; roof.castShadow = true; scene.add(roof);
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), goldM); gem.position.set(0, 14.4, tz); scene.add(gem);
  // Giant broken pillars around the island, some wrapped in vines
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + 0.15;
    if (Math.sin(a) > 0.5 || Math.sin(a) < -0.6) continue;
    const r = TR - 5 - Math.random() * 3, h = 3 + Math.random() * 6;
    const x = Math.cos(a) * r, z = TZ + Math.sin(a) * r;
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, h, 12), stoneM); col.position.set(x, h / 2, z); col.castShadow = true; scene.add(col);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 2.2), darkStone); cap.position.set(x, h + 0.25, z); scene.add(cap);
    if (i % 2) for (let k = 0; k < 3; k++) { const v = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.08, 4, 16), vine); v.rotation.x = Math.PI / 2 + 0.3; v.position.set(x, 1 + k * 1.6, z); scene.add(v); }
  }
  // Golden gorilla statues on both sides of the path
  [-6, 6].forEach((x) => {
    const ped = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 2.4), darkStone); ped.position.set(x, 0.6, TZ + 6); scene.add(ped);
    const b1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 1.2), goldM); b1.position.set(x, 2.1, TZ + 6); b1.castShadow = true; scene.add(b1);
    const b2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.0, 1.0), goldM); b2.position.set(x, 3.5, TZ + 6.2); scene.add(b2);
    [-1, 1].forEach((sd) => { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.8, 0.45), goldM); arm.position.set(x + sd * 1.0, 1.9, TZ + 6.3); scene.add(arm); });
  });
  // Fallen stone blocks
  for (let i = 0; i < 12; i++) {
    const a = Math.random() * Math.PI * 2, r = 9 + Math.random() * (TR - 12);
    const x = Math.cos(a) * r, z = TZ + Math.sin(a) * r;
    if (Math.abs(x) < 4) continue;
    const bl = new THREE.Mesh(new THREE.BoxGeometry(1 + Math.random() * 1.5, 0.8 + Math.random(), 1 + Math.random() * 1.5), i % 2 ? stoneM : darkStone);
    bl.position.set(x, 0.5, z); bl.rotation.y = Math.random() * 3; bl.castShadow = true; scene.add(bl);
  }
  worldTicks.push((dt, t) => { gem.rotation.y = t; gem.position.y = 14.4 + Math.sin(t * 2) * 0.3; });
})();
