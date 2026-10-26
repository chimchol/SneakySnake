// Egg pen: a big square fence, gate facing the island middle
(function pen(cx, cz, w, d) {
  const wood = mat(0xc98d4a), dark = mat(0x8a5a2b);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat(0xe8d48a));
  floor.rotation.x = -Math.PI / 2; floor.position.set(cx, 0.02, cz); floor.receiveShadow = true; scene.add(floor);
  const postGeo = new THREE.BoxGeometry(0.35, 1.6, 0.35);
  function post(x, z) { const p = new THREE.Mesh(postGeo, dark); p.position.set(x, 0.8, z); p.castShadow = true; scene.add(p); }
  function rail(x1, z1, x2, z2) {
    const len = Math.hypot(x2 - x1, z2 - z1);
    [0.55, 1.15].forEach((y) => {
      const r = new THREE.Mesh(new THREE.BoxGeometry(len, 0.18, 0.12), wood);
      r.position.set((x1 + x2) / 2, y, (z1 + z2) / 2); r.rotation.y = -Math.atan2(z2 - z1, x2 - x1); r.castShadow = true; scene.add(r);
    });
    const n = Math.max(1, Math.round(len / 2));
    for (let i = 0; i <= n; i++) post(x1 + (x2 - x1) * i / n, z1 + (z2 - z1) * i / n);
  }
  const L = cx - w / 2, Rt = cx + w / 2, T = cz - d / 2, B = cz + d / 2, gate = 1.6;
  rail(L, B, Rt, B); rail(L, T, L, B); rail(Rt, T, Rt, B);
  rail(L, T, cx - gate, T); rail(cx + gate, T, Rt, T);
})(0, 15, 12, 9);
