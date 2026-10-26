// ---------- Pets (blocky, matching the bosses) ----------
function buildPet(egg) {
  const type = typeOf(egg);
  const g = new THREE.Group();
  const box = (w, h, d, m, x, y, z) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); b.castShadow = true; g.add(b); return b; };
  const black = mat(0x111111), orange = mat(0xf39a1e), red = mat(0xe23b2e);
  if (type.pet === 'Chicken') {
    const body = mutMat(egg.mut) || mat(0xfafafa);
    box(0.65, 0.55, 0.8, body, 0, 0.58, 0);
    box(0.1, 0.35, 0.5, body, -0.37, 0.6, -0.05); box(0.1, 0.35, 0.5, body, 0.37, 0.6, -0.05);
    box(0.45, 0.3, 0.2, body, 0, 0.75, -0.45);
    box(0.4, 0.45, 0.35, body, 0, 1.0, 0.35);
    box(0.22, 0.12, 0.2, orange, 0, 0.98, 0.6);
    box(0.12, 0.17, 0.08, red, 0, 0.83, 0.55);
    box(0.1, 0.14, 0.26, red, 0, 1.29, 0.35);
    box(0.04, 0.08, 0.08, black, -0.21, 1.05, 0.42); box(0.04, 0.08, 0.08, black, 0.21, 1.05, 0.42);
    box(0.08, 0.3, 0.08, orange, -0.15, 0.15, 0.05); box(0.08, 0.3, 0.08, orange, 0.15, 0.15, 0.05);
  } else if (type.pet === 'Dog') {
    const body = mutMat(egg.mut) || mat(0xd9a066), white = mat(0xfff7ea), brown = mat(0x7a4a26);
    box(0.6, 0.5, 1.0, body, 0, 0.6, 0);
    box(0.55, 0.5, 0.5, body, 0, 0.95, 0.6);
    box(0.3, 0.22, 0.25, white, 0, 0.83, 0.92);
    box(0.1, 0.08, 0.06, black, 0, 0.92, 1.05);
    box(0.12, 0.3, 0.15, brown, -0.3, 1.0, 0.55); box(0.12, 0.3, 0.15, brown, 0.3, 1.0, 0.55);
    box(0.06, 0.08, 0.04, black, -0.14, 1.05, 0.86); box(0.06, 0.08, 0.04, black, 0.14, 1.05, 0.86);
    const tail = box(0.1, 0.1, 0.4, body, 0, 0.8, -0.62); tail.rotation.x = 0.6; g.userData.tail = tail;
    [[-0.2, 0.35], [0.2, 0.35], [-0.2, -0.35], [0.2, -0.35]].forEach(([x, z]) => box(0.15, 0.35, 0.15, body, x, 0.18, z));
  } else if (type.pet === 'Owl') {
    const body = mutMat(egg.mut) || mat(0x8a5a2b), belly = mat(0xd9b48a), yellow = mat(0xffd23f), wing = mat(0x6b4220);
    box(0.65, 0.75, 0.55, body, 0, 0.6, 0);
    box(0.45, 0.5, 0.06, belly, 0, 0.5, 0.28);
    box(0.6, 0.45, 0.5, body, 0, 1.18, 0.02);
    box(0.12, 0.2, 0.12, body, -0.22, 1.48, 0); box(0.12, 0.2, 0.12, body, 0.22, 1.48, 0); // ear tufts
    box(0.2, 0.2, 0.05, yellow, -0.15, 1.22, 0.28); box(0.2, 0.2, 0.05, yellow, 0.15, 1.22, 0.28); // big eyes
    box(0.09, 0.09, 0.03, black, -0.15, 1.22, 0.31); box(0.09, 0.09, 0.03, black, 0.15, 1.22, 0.31);
    box(0.1, 0.12, 0.1, mat(0xf39a1e), 0, 1.07, 0.3);
    const lw = box(0.08, 0.5, 0.4, wing, -0.36, 0.65, 0), rw = box(0.08, 0.5, 0.4, wing, 0.36, 0.65, 0);
    g.userData.wings = [lw, rw];
    box(0.12, 0.1, 0.18, orange, -0.15, 0.17, 0.1); box(0.12, 0.1, 0.18, orange, 0.15, 0.17, 0.1);
  } else if (type.pet === 'Tree Man') {
    const bark = mutMat(egg.mut) || mat(0x7a4f28), leaf = mat(0x3d9a3a), leaf2 = mat(0x4fb548);
    box(0.6, 0.8, 0.45, bark, 0, 0.9, 0);                      // trunk body
    box(0.2, 0.5, 0.25, bark, -0.17, 0.25, 0); box(0.2, 0.5, 0.25, bark, 0.17, 0.25, 0); // root legs
    const la = box(0.5, 0.12, 0.12, bark, -0.5, 1.05, 0); la.rotation.z = 0.5;  // branch arms
    const ra = box(0.5, 0.12, 0.12, bark, 0.5, 1.05, 0); ra.rotation.z = -0.5;
    box(0.1, 0.25, 0.1, leaf, -0.78, 1.28, 0); box(0.1, 0.25, 0.1, leaf, 0.78, 1.28, 0);
    g.userData.arms = [la, ra];
    box(0.1, 0.12, 0.04, black, -0.13, 1.08, 0.24); box(0.1, 0.12, 0.04, black, 0.13, 1.08, 0.24); // face
    box(0.24, 0.05, 0.04, black, 0, 0.86, 0.24);
    box(0.9, 0.45, 0.8, leaf, 0, 1.55, 0); box(0.6, 0.35, 0.55, leaf2, 0.05, 1.9, -0.05);  // leafy crown
  } else if (type.pet === 'Giant Tiger') {
    // A big version of the Tiger boss, but friendly
    const fur = mutMat(egg.mut, tigerTex) || new THREE.MeshLambertMaterial({ map: tigerTex }), white = mat(0xfff7ea), pink = mat(0xff8a9a);
    const S = 0.55;
    const B = (w, h, d, m, x, y, z) => box(w * S, h * S, d * S, m, x * S, y * S, z * S);
    B(2.6, 2.2, 4.4, fur, 0, 2.2, 0); B(2.4, 2.2, 2.0, fur, 0, 3.2, 2.8); B(1.4, 0.9, 0.8, white, 0, 2.7, 3.9); B(0.5, 0.35, 0.3, pink, 0, 3.05, 4.3);
    B(0.6, 0.6, 0.4, fur, -0.85, 4.5, 2.5); B(0.6, 0.6, 0.4, fur, 0.85, 4.5, 2.5);
    B(0.35, 0.3, 0.1, black, -0.6, 3.6, 3.82); B(0.35, 0.3, 0.1, black, 0.6, 3.6, 3.82);
    B(1.6, 0.6, 3.2, white, 0, 1.15, 0.2);
    [[-0.85, 1.4], [0.85, 1.4], [-0.85, -1.4], [0.85, -1.4]].forEach(([x, z]) => { B(0.75, 1.4, 0.75, fur, x, 0.7, z); B(0.8, 0.25, 0.9, white, x, 0.12, z + 0.15); });
    const tail = B(0.4, 0.4, 2.6, fur, 0, 3.0, -3.2); tail.rotation.x = -0.6; g.userData.tail = tail;
    const crown = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.06, 6, 16), new THREE.MeshBasicMaterial({ color: 0xffe68a })); crown.rotation.x = Math.PI / 2; crown.position.set(0, 2.85, 1.5); g.add(crown);
  } else if (type.pet === 'Spirit Deer') {
    const body = mutMat(egg.mut) || new THREE.MeshPhongMaterial({ color: 0xd8f0ff, emissive: 0x1a3a4a, transparent: true, opacity: 0.85 }), antler = new THREE.MeshBasicMaterial({ color: 0x5af0ff });
    box(0.45, 0.42, 0.85, body, 0, 0.85, 0);
    box(0.16, 0.4, 0.16, body, 0, 1.15, 0.42);
    box(0.28, 0.26, 0.4, body, 0, 1.36, 0.55);
    box(0.05, 0.06, 0.03, black, -0.12, 1.42, 0.7); box(0.05, 0.06, 0.03, black, 0.12, 1.42, 0.7);
    [-1, 1].forEach((sd) => { const a1 = box(0.05, 0.45, 0.05, antler, sd * 0.12, 1.72, 0.48); a1.rotation.z = -sd * 0.35; box(0.22, 0.05, 0.05, antler, sd * 0.27, 1.85, 0.48); box(0.05, 0.18, 0.05, antler, sd * 0.36, 1.95, 0.48); });
    [[-0.15, 0.3], [0.15, 0.3], [-0.15, -0.3], [0.15, -0.3]].forEach(([x, z]) => box(0.09, 0.65, 0.09, body, x, 0.32, z));
  } else if (type.pet === 'Fairy Butterfly') {
    const body = mutMat(egg.mut) || mat(0x3a2a4a), w1 = new THREE.MeshBasicMaterial({ color: 0xff7ae0, transparent: true, opacity: 0.85, side: THREE.DoubleSide }), w2 = new THREE.MeshBasicMaterial({ color: 0x5af0ff, transparent: true, opacity: 0.85, side: THREE.DoubleSide });
    box(0.1, 0.1, 0.5, body, 0, 0.6, 0);
    box(0.12, 0.12, 0.12, body, 0, 0.62, 0.28);
    [-1, 1].forEach((sd) => { const an = box(0.02, 0.2, 0.02, body, sd * 0.05, 0.75, 0.32); an.rotation.z = -sd * 0.4; });
    const lw = new THREE.Group(), rw = new THREE.Group();
    [[lw, -1], [rw, 1]].forEach(([wg, sd]) => { const a = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.4), w1); a.position.set(sd * 0.25, 0, 0.1); a.rotation.x = -Math.PI / 2; wg.add(a); const b2 = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.3), w2); b2.position.set(sd * 0.2, 0, -0.2); b2.rotation.x = -Math.PI / 2; wg.add(b2); wg.position.y = 0.62; g.add(wg); });
    g.userData.butterfly = [lw, rw]; g.userData.fly = true;
  } else if (type.pet === 'Mushroom Buddy') {
    const capM = mutMat(egg.mut) || new THREE.MeshBasicMaterial({ color: 0xb07aff }), stem = mat(0xf0e8f0), dot = mat(0xffffff);
    box(0.35, 0.45, 0.3, stem, 0, 0.35, 0);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.42, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), capM); cap.position.y = 0.55; cap.castShadow = true; g.add(cap);
    [[0.15, 0.1], [-0.18, 0.12], [0, -0.22]].forEach(([dx, dz]) => box(0.08, 0.04, 0.08, dot, dx, 0.88, dz));
    box(0.05, 0.06, 0.03, black, -0.08, 0.42, 0.16); box(0.05, 0.06, 0.03, black, 0.08, 0.42, 0.16);
    box(0.1, 0.12, 0.1, stem, -0.1, 0.06, 0); box(0.1, 0.12, 0.1, stem, 0.1, 0.06, 0);
    g.userData.hop = true;
  } else if (type.pet === 'Wise Owl') {
    const body = mutMat(egg.mut) || mat(0x8a6a4a), belly = mat(0xd9c0a0), yellow = mat(0xffd23f), hat = mat(0x3a2a8a), star2 = new THREE.MeshBasicMaterial({ color: 0xffe68a });
    box(0.6, 0.7, 0.5, body, 0, 0.55, 0);
    box(0.42, 0.45, 0.06, belly, 0, 0.48, 0.26);
    box(0.56, 0.42, 0.46, body, 0, 1.08, 0.02);
    box(0.18, 0.18, 0.04, yellow, -0.13, 1.12, 0.26); box(0.18, 0.18, 0.04, yellow, 0.13, 1.12, 0.26);
    box(0.08, 0.08, 0.02, black, -0.13, 1.12, 0.29); box(0.08, 0.08, 0.02, black, 0.13, 1.12, 0.29);
    box(0.46, 0.03, 0.03, mat(0x2a2a2a), 0, 1.2, 0.29);         // glasses
    const hc = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.6, 8), hat); hc.position.set(0, 1.58, 0); hc.rotation.z = 0.15; g.add(hc);
    box(0.66, 0.05, 0.6, hat, 0, 1.3, 0.02);
    box(0.08, 0.08, 0.04, star2, 0.08, 1.55, 0.2);
    const lw = box(0.08, 0.45, 0.35, body, -0.34, 0.6, 0), rw = box(0.08, 0.45, 0.35, body, 0.34, 0.6, 0); g.userData.wings = [lw, rw];
  } else if (type.pet === 'Moon Rabbit') {
    const body = mutMat(egg.mut) || new THREE.MeshLambertMaterial({ color: 0xa0d0ff, emissive: 0x1a3a6a }), inner = new THREE.MeshBasicMaterial({ color: 0xe0f4ff });
    box(0.4, 0.4, 0.5, body, 0, 0.3, 0);
    box(0.34, 0.32, 0.32, body, 0, 0.62, 0.18);
    box(0.08, 0.4, 0.06, body, -0.08, 0.98, 0.14); box(0.08, 0.4, 0.06, body, 0.08, 0.98, 0.14);
    box(0.04, 0.3, 0.03, inner, -0.08, 0.98, 0.17); box(0.04, 0.3, 0.03, inner, 0.08, 0.98, 0.17);
    box(0.05, 0.06, 0.03, black, -0.08, 0.67, 0.35); box(0.05, 0.06, 0.03, black, 0.08, 0.67, 0.35);
    box(0.14, 0.14, 0.12, inner, 0, 0.35, -0.3);
    g.userData.hop = true;
  } else if (type.pet === 'Unicorn') {
    const body = mutMat(egg.mut) || mat(0xffffff), mane = new THREE.MeshLambertMaterial({ map: rainbowTex }), gold = mat(0xf2d06a);
    box(0.45, 0.45, 0.95, body, 0, 0.9, 0);
    const neck = box(0.2, 0.45, 0.2, body, 0, 1.2, 0.45); neck.rotation.x = 0.4;
    box(0.26, 0.26, 0.45, body, 0, 1.45, 0.65);
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.4, 8), gold); horn.position.set(0, 1.75, 0.75); horn.rotation.x = 0.4; g.add(horn);
    box(0.05, 0.06, 0.04, black, -0.14, 1.5, 0.78); box(0.05, 0.06, 0.04, black, 0.14, 1.5, 0.78);
    box(0.08, 0.32, 0.5, mane, 0, 1.55, 0.4); box(0.1, 0.4, 0.14, mane, 0, 0.95, -0.55);
    [[-0.15, 0.35], [0.15, 0.35], [-0.15, -0.35], [0.15, -0.35]].forEach(([x, z]) => box(0.12, 0.7, 0.12, body, x, 0.35, z));
  } else if (type.pet === 'Crystal Wolf') {
    const cry = mutMat(egg.mut) || new THREE.MeshPhongMaterial({ color: 0x8af0ff, emissive: 0x0a3a4a, transparent: true, opacity: 0.85, shininess: 120, specular: 0xffffff });
    box(0.5, 0.45, 0.95, cry, 0, 0.6, 0);
    box(0.42, 0.4, 0.42, cry, 0, 0.88, 0.58);
    box(0.2, 0.16, 0.25, cry, 0, 0.8, 0.85);
    [-1, 1].forEach((sd) => { const ear = new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), cry); ear.position.set(sd * 0.14, 1.15, 0.52); ear.scale.y = 1.6; g.add(ear); });
    box(0.05, 0.06, 0.03, new THREE.MeshBasicMaterial({ color: 0xffffff }), -0.11, 0.95, 0.8); box(0.05, 0.06, 0.03, new THREE.MeshBasicMaterial({ color: 0xffffff }), 0.11, 0.95, 0.8);
    [0.25, -0.05, -0.35].forEach((z) => { const sp = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), cry); sp.position.set(0, 0.9, z); sp.scale.y = 1.8; g.add(sp); });
    const tail = box(0.1, 0.1, 0.55, cry, 0, 0.7, -0.65); tail.rotation.x = -0.5; g.userData.tail = tail;
    [[-0.16, 0.32], [0.16, 0.32], [-0.16, -0.32], [0.16, -0.32]].forEach(([x, z]) => box(0.12, 0.38, 0.12, cry, x, 0.19, z));
  } else if (type.pet === 'Forest Dragon') {
    const body = mutMat(egg.mut) || mat(0x3a8a3a), leaf = mat(0x7ad04a), vine = mat(0x2a6a2a), flower = mat(0xff7ae0);
    box(0.5, 0.45, 0.8, body, 0, 0.5, 0);
    box(0.18, 0.3, 0.18, body, 0, 0.82, 0.35);
    box(0.4, 0.32, 0.45, body, 0, 1.0, 0.55);
    box(0.05, 0.06, 0.03, mat(0xffe14a), -0.13, 1.05, 0.78); box(0.05, 0.06, 0.03, mat(0xffe14a), 0.13, 1.05, 0.78);
    box(0.1, 0.1, 0.1, flower, 0, 1.22, 0.5);
    const lw = box(0.55, 0.05, 0.45, leaf, -0.45, 0.85, -0.05), rw = box(0.55, 0.05, 0.45, leaf, 0.45, 0.85, -0.05);
    g.userData.dragonWings = [lw, rw];
    [0.25, 0, -0.25].forEach((z) => box(0.08, 0.15, 0.15, leaf, 0, 0.8, z));
    const tail = box(0.14, 0.14, 0.6, vine, 0, 0.42, -0.65); g.userData.tail = tail;
    [[-0.16, 0.25], [0.16, 0.25], [-0.16, -0.25], [0.16, -0.25]].forEach(([x, z]) => box(0.13, 0.3, 0.13, body, x, 0.15, z));
  } else if (type.pet === 'Baby Magic Lion') {
    const fur = mutMat(egg.mut) || new THREE.MeshLambertMaterial({ color: 0x8a5ad0, emissive: 0x1a0a3a }), mane = new THREE.MeshBasicMaterial({ color: 0x5af0ff }), mane2 = new THREE.MeshBasicMaterial({ color: 0xff7ae0 }), white = mat(0xf0e8ff);
    box(0.5, 0.45, 0.85, fur, 0, 0.55, 0);
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; box(0.16, 0.16, 0.16, k % 2 ? mane : mane2, Math.cos(a) * 0.3, 0.95 + Math.sin(a) * 0.3, 0.42); }
    box(0.42, 0.4, 0.3, fur, 0, 0.95, 0.55);
    box(0.2, 0.12, 0.1, white, 0, 0.85, 0.72);
    box(0.08, 0.08, 0.03, new THREE.MeshBasicMaterial({ color: 0xffe68a }), 0, 1.1, 0.71);
    box(0.05, 0.06, 0.03, black, -0.1, 1.0, 0.71); box(0.05, 0.06, 0.03, black, 0.1, 1.0, 0.71);
    const tail = box(0.07, 0.07, 0.5, fur, 0, 0.7, -0.62); tail.rotation.x = -0.5; g.userData.tail = tail;
    box(0.15, 0.15, 0.15, mane, 0, 0.92, -0.85);
    [[-0.15, 0.3], [0.15, 0.3], [-0.15, -0.3], [0.15, -0.3]].forEach(([x, z]) => box(0.14, 0.35, 0.14, fur, x, 0.17, z));
  } else if (type.zone === 12) {
    buildHeavenHellPet(type, egg, g, box);
  } else if (type.pet === 'Stone Golem') {
    const rock = mutMat(egg.mut) || mat(0x9a9a9a), dark2 = mat(0x6a6a6a), glowB = new THREE.MeshBasicMaterial({ color: 0x7fe0ff });
    box(0.6, 0.55, 0.4, rock, 0, 0.75, 0);
    box(0.4, 0.35, 0.35, rock, 0, 1.2, 0.02);
    box(0.08, 0.05, 0.03, glowB, -0.09, 1.23, 0.2); box(0.08, 0.05, 0.03, glowB, 0.09, 1.23, 0.2);
    box(0.15, 0.15, 0.03, glowB, 0, 0.82, 0.21);                 // glowing rune
    const la = box(0.2, 0.55, 0.2, dark2, -0.42, 0.65, 0), ra = box(0.2, 0.55, 0.2, dark2, 0.42, 0.65, 0);
    g.userData.swing = [la, ra];
    box(0.2, 0.4, 0.2, dark2, -0.15, 0.2, 0); box(0.2, 0.4, 0.2, dark2, 0.15, 0.2, 0);
    g.userData.slow = true;
  } else if (type.pet === 'Golden Scarab') {
    const shell = mutMat(egg.mut) || new THREE.MeshPhongMaterial({ color: 0xf2bd2c, shininess: 100, specular: 0xffffff }), dark2 = mat(0x5a3a10);
    box(0.55, 0.3, 0.7, shell, 0, 0.3, 0);
    box(0.02, 0.32, 0.72, dark2, 0, 0.31, 0);
    box(0.35, 0.2, 0.25, dark2, 0, 0.25, 0.45);
    box(0.06, 0.06, 0.2, dark2, -0.1, 0.3, 0.62); box(0.06, 0.06, 0.2, dark2, 0.1, 0.3, 0.62);
    [-1, 1].forEach((sd) => { [-0.2, 0, 0.2].forEach((z) => { const l = box(0.3, 0.05, 0.05, dark2, sd * 0.35, 0.12, z); l.rotation.z = -sd * 0.5; }); });
    g.userData.fast = true;
  } else if (type.pet === 'Temple Cobra') {
    const body = mutMat(egg.mut) || mat(0x2f7a4a), gold = mat(0xf2bd2c);
    const segs = [];
    for (let i = 0; i < 6; i++) { const seg = new THREE.Mesh(new THREE.SphereGeometry(0.18 * (1 - i * 0.1), 10, 8), body); seg.position.set(0, 0.16, -0.15 - i * 0.26); seg.castShadow = true; g.add(seg); segs.push(seg); }
    const neck = box(0.18, 0.6, 0.18, body, 0, 0.45, 0.05);
    const hood = box(0.5, 0.45, 0.06, gold, 0, 0.7, -0.02);
    box(0.24, 0.16, 0.3, body, 0, 0.9, 0.12);
    box(0.04, 0.05, 0.04, mat(0xff2a1a), -0.08, 0.95, 0.27); box(0.04, 0.05, 0.04, mat(0xff2a1a), 0.08, 0.95, 0.27);
    g.userData.segs = segs;
  } else if (type.pet === 'Sphinx Cat') {
    const body = mutMat(egg.mut) || mat(0xe0c080), head2 = new THREE.MeshLambertMaterial({ map: headdressTex }), gold = mat(0xf2bd2c);
    box(0.45, 0.4, 0.8, body, 0, 0.35, -0.1);
    box(0.4, 0.38, 0.36, body, 0, 0.75, 0.3);
    box(0.5, 0.42, 0.25, head2, 0, 0.82, 0.18);                  // striped headdress
    box(0.18, 0.4, 0.08, head2, -0.25, 0.6, 0.25); box(0.18, 0.4, 0.08, head2, 0.25, 0.6, 0.25);
    box(0.06, 0.06, 0.03, mat(0x2a8a3a), -0.09, 0.8, 0.49); box(0.06, 0.06, 0.03, mat(0x2a8a3a), 0.09, 0.8, 0.49);
    box(0.1, 0.14, 0.04, gold, 0, 1.0, 0.33);
    box(0.12, 0.12, 0.3, body, -0.13, 0.08, 0.35); box(0.12, 0.12, 0.3, body, 0.13, 0.08, 0.35);   // front paws stretched out
    const tail = box(0.06, 0.06, 0.45, body, 0, 0.3, -0.65); g.userData.tail = tail;
  } else if (type.pet === 'War Elephant') {
    const body = mutMat(egg.mut) || mat(0x9aa0a8), dark = mat(0x7d838c), gold = new THREE.MeshPhongMaterial({ color: 0xf2bd2c, shininess: 90, specular: 0xfff2b0 }), red = mat(0xb02a2a), white = mat(0xfffbe9);
    box(0.8, 0.7, 1.05, body, 0, 0.8, 0);
    box(0.84, 0.15, 0.7, red, 0, 1.18, 0);                      // red saddle cloth
    box(0.5, 0.3, 0.5, gold, 0, 1.38, 0);                       // golden seat
    box(0.62, 0.58, 0.5, body, 0, 1.1, 0.64);
    box(0.66, 0.25, 0.2, gold, 0, 1.3, 0.82);                   // gold head armor
    const le = box(0.06, 0.5, 0.45, dark, -0.37, 1.1, 0.5), re = box(0.06, 0.5, 0.45, dark, 0.37, 1.1, 0.5);
    g.userData.ears = [le, re];
    const trunk = box(0.15, 0.55, 0.15, body, 0, 0.75, 0.95); trunk.rotation.x = 0.2;
    box(0.06, 0.06, 0.25, white, -0.17, 0.85, 0.92); box(0.06, 0.06, 0.25, white, 0.17, 0.85, 0.92);
    box(0.06, 0.07, 0.04, black, -0.18, 1.2, 0.9); box(0.06, 0.07, 0.04, black, 0.18, 1.2, 0.9);
    [[-0.27, 0.36], [0.27, 0.36], [-0.27, -0.36], [0.27, -0.36]].forEach(([x, z]) => { box(0.22, 0.45, 0.22, body, x, 0.22, z); box(0.24, 0.08, 0.24, gold, x, 0.3, z); });
  } else if (type.pet === 'Stone Lion') {
    const stone2 = mutMat(egg.mut) || mat(0xb8b0a0), mane = mat(0x8a8070);
    box(0.5, 0.45, 0.85, stone2, 0, 0.55, 0);
    box(0.7, 0.65, 0.3, mane, 0, 0.95, 0.4);                    // big mane
    box(0.42, 0.4, 0.3, stone2, 0, 0.92, 0.6);
    box(0.18, 0.12, 0.1, mane, 0, 0.82, 0.78);
    box(0.06, 0.06, 0.03, mat(0xf2bd2c), -0.1, 1.0, 0.76); box(0.06, 0.06, 0.03, mat(0xf2bd2c), 0.1, 1.0, 0.76);
    const tail = box(0.07, 0.07, 0.5, stone2, 0, 0.7, -0.62); tail.rotation.x = -0.5; g.userData.tail = tail;
    box(0.15, 0.15, 0.15, mane, 0, 0.92, -0.85);
    [[-0.15, 0.3], [0.15, 0.3], [-0.15, -0.3], [0.15, -0.3]].forEach(([x, z]) => box(0.14, 0.35, 0.14, stone2, x, 0.17, z));
  } else if (type.pet === 'Thunder Bird') {
    const body = mutMat(egg.mut) || mat(0x2a5ab0), bolt = new THREE.MeshBasicMaterial({ color: 0xffe14a }), white = mat(0xffffff);
    box(0.45, 0.45, 0.6, body, 0, 0.6, 0);
    box(0.36, 0.34, 0.36, body, 0, 0.98, 0.22);
    box(0.12, 0.1, 0.18, bolt, 0, 0.94, 0.46);
    box(0.08, 0.05, 0.03, white, -0.1, 1.04, 0.4); box(0.08, 0.05, 0.03, white, 0.1, 1.04, 0.4);
    const lw = box(0.08, 0.3, 0.6, bolt, -0.3, 0.68, 0), rw = box(0.08, 0.3, 0.6, bolt, 0.3, 0.68, 0);
    g.userData.wings = [lw, rw]; g.userData.flash = bolt;
    [-0.3, 0, 0.3].forEach((r) => { const f = box(0.1, 0.05, 0.5, body, Math.sin(r) * 0.12, 0.62, -0.5); f.rotation.y = r; f.rotation.x = -0.3; });
    g.userData.fly = true;
  } else if (type.pet === 'Tiny Titan') {
    const armor = mutMat(egg.mut) || new THREE.MeshPhongMaterial({ color: 0xc08a4a, shininess: 80, specular: 0xffe0b0 }), skin = mat(0xf2c9a0), red = mat(0xd0302a), wood = mat(0x7a4f28), steel = mat(0xd0d0d8);
    box(0.4, 0.45, 0.28, armor, 0, 0.7, 0);
    box(0.42, 0.18, 0.3, red, 0, 0.42, 0);                      // red skirt
    box(0.3, 0.3, 0.3, skin, 0, 1.08, 0.02);
    box(0.36, 0.22, 0.36, armor, 0, 1.2, 0);                    // helmet
    box(0.06, 0.22, 0.45, red, 0, 1.38, -0.02);                  // helmet crest
    box(0.04, 0.05, 0.03, black, -0.07, 1.06, 0.18); box(0.04, 0.05, 0.03, black, 0.07, 1.06, 0.18);
    box(0.06, 0.38, 0.38, armor, -0.28, 0.7, 0.05);             // round-ish shield
    const spear = box(0.04, 1.2, 0.04, wood, 0.3, 0.8, 0.05); box(0.08, 0.15, 0.08, steel, 0.3, 1.45, 0.05);
    g.userData.spear = spear;
    box(0.12, 0.35, 0.12, skin, -0.1, 0.17, 0); box(0.12, 0.35, 0.12, skin, 0.1, 0.17, 0);
  } else if (type.pet === 'Baby Titan Gorilla') {
    const body = mutMat(egg.mut) || mat(0x3a3a44), chest = mat(0x7a7a84), face = mat(0x5a5a64), gold = new THREE.MeshPhongMaterial({ color: 0xf2bd2c, shininess: 90, specular: 0xfff2b0 });
    box(0.75, 0.75, 0.55, body, 0, 0.75, 0);
    box(0.45, 0.45, 0.06, chest, 0, 0.75, 0.28);
    box(0.78, 0.12, 0.58, gold, 0, 0.45, 0);
    box(0.5, 0.45, 0.45, body, 0, 1.3, 0.05);
    box(0.32, 0.26, 0.06, face, 0, 1.25, 0.28);
    box(0.52, 0.1, 0.47, gold, 0, 1.5, 0.05);                    // tiny crown band
    box(0.05, 0.06, 0.03, black, -0.09, 1.33, 0.32); box(0.05, 0.06, 0.03, black, 0.09, 1.33, 0.32);
    const la = box(0.2, 0.75, 0.2, body, -0.5, 0.65, 0.1), ra = box(0.2, 0.75, 0.2, body, 0.5, 0.65, 0.1);
    box(0.22, 0.1, 0.22, gold, -0.5, 0.85, 0.1); box(0.22, 0.1, 0.22, gold, 0.5, 0.85, 0.1);
    g.userData.thump = [la, ra];
    box(0.22, 0.4, 0.22, body, -0.2, 0.2, 0); box(0.22, 0.4, 0.22, body, 0.2, 0.2, 0);
  } else if (type.pet === 'Kitsune') {
    const body = mutMat(egg.mut) || mat(0xffffff), red = mat(0xe0402a), orange = mat(0xffb03a), flame = new THREE.MeshBasicMaterial({ color: 0x7ac8ff });
    box(0.45, 0.4, 0.8, body, 0, 0.5, 0);
    box(0.42, 0.38, 0.4, body, 0, 0.78, 0.48);
    box(0.18, 0.15, 0.2, body, 0, 0.7, 0.75);
    box(0.05, 0.04, 0.04, black, 0, 0.74, 0.86);
    box(0.12, 0.22, 0.06, body, -0.14, 1.05, 0.44); box(0.12, 0.22, 0.06, body, 0.14, 1.05, 0.44);
    box(0.06, 0.12, 0.03, red, -0.14, 1.05, 0.48); box(0.06, 0.12, 0.03, red, 0.14, 1.05, 0.48);
    box(0.08, 0.03, 0.03, red, -0.11, 0.88, 0.69); box(0.08, 0.03, 0.03, red, 0.11, 0.88, 0.69);   // eye markings
    const tails = [-0.5, 0, 0.5].map((r) => { const tl = box(0.16, 0.16, 0.6, body, Math.sin(r) * 0.2, 0.7, -0.62); tl.rotation.y = r; tl.rotation.x = 0.5; box(0.1, 0.1, 0.12, orange, Math.sin(r) * 0.32, 0.92, -0.86); return tl; });
    g.userData.kitsuneTails = tails;
    const fl = box(0.12, 0.18, 0.12, flame, 0, 1.4, 0.48); g.userData.foxfire = fl;
    [[-0.15, 0.3], [0.15, 0.3], [-0.15, -0.3], [0.15, -0.3]].forEach(([x, z]) => box(0.12, 0.3, 0.12, body, x, 0.15, z));
  } else if (type.pet === 'Koi') {
    const stoneM = mat(0xa8a49a);
    for (let k = 0; k < 10; k++) { const st = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 0), stoneM); const a = k * 0.63; st.position.set(Math.cos(a) * 0.7, 0.08, Math.sin(a) * 0.7); g.add(st); }
    const water = new THREE.Mesh(new THREE.CircleGeometry(0.66, 20), new THREE.MeshPhongMaterial({ color: 0x3a9ad9, shininess: 80 })); water.rotation.x = -Math.PI / 2; water.position.y = 0.06; g.add(water);
    const fish = new THREE.Group();
    const kb = mutMat(egg.mut, koiTex) || new THREE.MeshLambertMaterial({ map: koiTex });
    const f1 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.4), kb); fish.add(f1);
    const ft = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.04, 0.16), kb); ft.position.z = -0.26; fish.add(ft);
    fish.position.y = 0.1; g.add(fish); g.userData.koi = fish;
  } else if (type.pet === 'Crane') {
    const body = mutMat(egg.mut) || mat(0xffffff), blk = mat(0x1a1a1a), red = mat(0xe0302a), beak = mat(0xd9c080);
    box(0.4, 0.35, 0.6, body, 0, 1.2, 0);
    box(0.3, 0.2, 0.3, blk, 0, 1.18, -0.38);
    box(0.1, 0.55, 0.1, blk, 0, 1.55, 0.25);
    box(0.18, 0.16, 0.25, body, 0, 1.85, 0.32);
    box(0.1, 0.05, 0.1, red, 0, 1.95, 0.32);
    box(0.05, 0.05, 0.25, beak, 0, 1.83, 0.55);
    box(0.03, 0.04, 0.04, black, -0.09, 1.88, 0.38); box(0.03, 0.04, 0.04, black, 0.09, 1.88, 0.38);
    const lw = box(0.06, 0.25, 0.5, body, -0.23, 1.25, -0.02), rw = box(0.06, 0.25, 0.5, body, 0.23, 1.25, -0.02);
    g.userData.wings = [lw, rw];
    const legA = box(0.04, 1.0, 0.04, blk, -0.08, 0.5, 0), legB = box(0.04, 1.0, 0.04, blk, 0.08, 0.5, 0);
    g.userData.legs = [legA, legB];
  } else if (type.pet === 'Little Dragon') {
    const body = mutMat(egg.mut, jadeTex) || new THREE.MeshLambertMaterial({ map: jadeTex }), gold = mat(0xf2bd2c), white = mat(0xfff2e0);
    const segs = [];
    for (let k = 0; k < 8; k++) { const sg2 = new THREE.Mesh(new THREE.BoxGeometry(0.2 - k * 0.012, 0.2 - k * 0.012, 0.22), body); sg2.position.set(0, 0, -0.2 - k * 0.2); sg2.castShadow = true; g.add(sg2); segs.push(sg2); if (k % 2 === 0) { const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.1, 0.1), gold); fin.position.y = 0.13; sg2.add(fin); } }
    const hd = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 0.32), body); hd.position.z = 0.05; g.add(hd);
    [-1, 1].forEach((sd) => {
      const hn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.04), gold); hn.position.set(sd * 0.08, 0.18, 0); hn.rotation.x = -0.5; hd.add(hn);
      const wh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.02), gold); wh.position.set(sd * 0.25, -0.04, 0.12); wh.rotation.z = sd * 0.4; hd.add(wh);
      const e9 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.03), black); e9.position.set(sd * 0.09, 0.05, 0.16); hd.add(e9);
    });
    const mane = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.15), white); mane.position.set(0, 0.12, -0.12); hd.add(mane);
    g.userData.noodle = segs; g.userData.fly = true;
  } else if (type.pet === 'Lucky Cat') {
    const body = mutMat(egg.mut) || mat(0xffffff), red = mat(0xe0302a), gold = new THREE.MeshPhongMaterial({ color: 0xf2bd2c, shininess: 90, specular: 0xffffff }), pink = mat(0xff9ab8);
    box(0.5, 0.5, 0.42, body, 0, 0.3, 0);
    box(0.5, 0.42, 0.42, body, 0, 0.75, 0.02);
    box(0.12, 0.14, 0.06, body, -0.16, 1.02, 0.02); box(0.12, 0.14, 0.06, body, 0.16, 1.02, 0.02);
    box(0.06, 0.08, 0.03, pink, -0.16, 1.02, 0.06); box(0.06, 0.08, 0.03, pink, 0.16, 1.02, 0.06);
    box(0.08, 0.03, 0.03, black, -0.11, 0.8, 0.24); box(0.08, 0.03, 0.03, black, 0.11, 0.8, 0.24);   // happy closed eyes
    box(0.05, 0.04, 0.03, pink, 0, 0.72, 0.24);
    box(0.52, 0.06, 0.44, red, 0, 0.53, 0.02);                 // red collar
    const bell = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), gold); bell.position.set(0, 0.47, 0.25); g.add(bell);
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.04, 18), gold); coin.rotation.x = Math.PI / 2; coin.position.set(-0.12, 0.3, 0.24); g.add(coin);
    const paw = box(0.12, 0.35, 0.12, body, 0.3, 0.75, 0.1); g.userData.wave = paw;
  } else if (type.pet === 'Baby Oni Tiger') {
    const fur = mutMat(egg.mut, oniTex) || new THREE.MeshLambertMaterial({ map: oniTex }), white = mat(0xfff2e8), horn = mat(0xfff2c0), fang = mat(0xffffff);
    box(0.55, 0.45, 0.9, fur, 0, 0.55, 0);
    box(0.5, 0.45, 0.42, fur, 0, 0.8, 0.55);
    box(0.3, 0.18, 0.12, white, 0, 0.7, 0.8);
    box(0.04, 0.1, 0.04, fang, -0.08, 0.6, 0.84); box(0.04, 0.1, 0.04, fang, 0.08, 0.6, 0.84);
    const h1 = box(0.07, 0.25, 0.07, horn, -0.15, 1.12, 0.5); h1.rotation.z = 0.3;
    const h2 = box(0.07, 0.25, 0.07, horn, 0.15, 1.12, 0.5); h2.rotation.z = -0.3;
    box(0.05, 0.07, 0.03, new THREE.MeshBasicMaterial({ color: 0xffe14a }), -0.12, 0.88, 0.77); box(0.05, 0.07, 0.03, new THREE.MeshBasicMaterial({ color: 0xffe14a }), 0.12, 0.88, 0.77);
    const tail = box(0.08, 0.08, 0.6, fur, 0, 0.7, -0.7); tail.rotation.x = -0.5; g.userData.tail = tail;
    box(0.12, 0.12, 0.12, new THREE.MeshBasicMaterial({ color: 0xb05aff }), 0, 0.95, -0.98);
    [[-0.15, 0.3], [0.15, 0.3], [-0.15, -0.3], [0.15, -0.3]].forEach(([x, z]) => box(0.14, 0.35, 0.14, fur, x, 0.17, z));
  } else if (type.pet === 'Alien') {
    const body = mutMat(egg.mut) || mat(0x8aef6a), dark = mat(0x1a1a1a), glowY = new THREE.MeshBasicMaterial({ color: 0xffe14a });
    box(0.35, 0.45, 0.28, body, 0, 0.5, 0);
    box(0.6, 0.5, 0.5, body, 0, 1.0, 0.02);                 // big head
    box(0.16, 0.2, 0.04, dark, -0.13, 1.02, 0.27); box(0.16, 0.2, 0.04, dark, 0.13, 1.02, 0.27);
    box(0.1, 0.03, 0.03, dark, 0, 0.85, 0.27);
    [-1, 1].forEach((sd) => { const st = box(0.03, 0.3, 0.03, body, sd * 0.15, 1.38, 0); st.rotation.z = -sd * 0.3; box(0.08, 0.08, 0.08, glowY, sd * 0.2, 1.53, 0); });
    box(0.08, 0.35, 0.08, body, -0.24, 0.5, 0); box(0.08, 0.35, 0.08, body, 0.24, 0.5, 0);
    box(0.1, 0.3, 0.1, body, -0.1, 0.15, 0); box(0.1, 0.3, 0.1, body, 0.1, 0.15, 0);
  } else if (type.pet === 'Space Cat') {
    const body = mutMat(egg.mut) || mat(0x9aa4b8), suit = mat(0xf4f4f8), pink = mat(0xff9ab8);
    box(0.45, 0.4, 0.7, suit, 0, 0.45, 0);
    box(0.12, 0.25, 0.12, suit, -0.15, 0.12, 0.25); box(0.12, 0.25, 0.12, suit, 0.15, 0.12, 0.25); box(0.12, 0.25, 0.12, suit, -0.15, 0.12, -0.25); box(0.12, 0.25, 0.12, suit, 0.15, 0.12, -0.25);
    box(0.38, 0.34, 0.34, body, 0, 0.82, 0.38);
    box(0.1, 0.12, 0.06, body, -0.12, 1.04, 0.38); box(0.1, 0.12, 0.06, body, 0.12, 1.04, 0.38);
    box(0.05, 0.06, 0.03, black, -0.09, 0.86, 0.56); box(0.05, 0.06, 0.03, black, 0.09, 0.86, 0.56);
    box(0.05, 0.04, 0.03, pink, 0, 0.79, 0.56);
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), new THREE.MeshPhongMaterial({ color: 0xbfe8ff, transparent: true, opacity: 0.3, shininess: 120, specular: 0xffffff }));
    helmet.position.set(0, 0.86, 0.38); g.add(helmet);
    const tail = box(0.07, 0.07, 0.45, body, 0, 0.6, -0.5); tail.rotation.x = -0.5; g.userData.tail = tail;
  } else if (type.pet === 'Star Baby') {
    const gold = mutMat(egg.mut) || new THREE.MeshLambertMaterial({ color: 0xffe14a, emissive: 0xa07a00 });
    const starG = new THREE.Group();
    const core = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.2), gold); starG.add(core);
    for (let k = 0; k < 5; k++) { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.32, 0.16), gold); const a = k * Math.PI * 2 / 5; arm.position.set(Math.sin(a) * 0.3, Math.cos(a) * 0.3, 0); arm.rotation.z = -a; starG.add(arm); }
    [-1, 1].forEach((sd) => { const e5 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.03), black); e5.position.set(sd * 0.08, 0.04, 0.11); starG.add(e5); });
    const sm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.03, 0.03), black); sm.position.set(0, -0.06, 0.11); starG.add(sm);
    starG.position.y = 0.5; g.add(starG); g.userData.spinZ = starG; g.userData.fly = true;
  } else if (type.pet === 'Planet Pet') {
    const pl = mutMat(egg.mut) || new THREE.MeshLambertMaterial({ color: 0xff9a4a, emissive: 0x3a1a00 });
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.32, 18, 12), pl); ball.castShadow = true; g.add(ball);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.05, 6, 28), mat(0xfff2c0)); ring.rotation.x = Math.PI / 2.4; g.add(ring);
    [-1, 1].forEach((sd) => { const e6 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.03), black); e6.position.set(sd * 0.1, 0.06, 0.31); g.add(e6); });
    g.userData.spinY = ball; g.userData.fly = true;
  } else if (type.pet === 'Comet') {
    const head3 = new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 10), mutMat(egg.mut) || new THREE.MeshLambertMaterial({ color: 0xeaf8ff, emissive: 0x4a8aaa })); g.add(head3);
    [0.5, 0.9, 1.3].forEach((z, k) => { const t3 = new THREE.Mesh(new THREE.ConeGeometry(0.22 - k * 0.05, 0.5, 8), new THREE.MeshBasicMaterial({ color: [0x7ae0ff, 0x5aa8ff, 0xb07aff][k], transparent: true, opacity: 0.7 - k * 0.15 })); t3.rotation.x = -Math.PI / 2; t3.position.z = -z; g.add(t3); });
    [-1, 1].forEach((sd) => { const e7 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.03), black); e7.position.set(sd * 0.09, 0.05, 0.25); g.add(e7); });
    g.userData.fly = true; g.userData.fast = true;
  } else if (type.pet === 'UFO') {
    const hull = mutMat(egg.mut) || new THREE.MeshPhongMaterial({ color: 0xb8c0cc, shininess: 90, specular: 0xffffff });
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.4, 0.15, 24), hull); g.add(disc);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshPhongMaterial({ color: 0x8affc0, transparent: true, opacity: 0.6 })); dome.position.y = 0.07; g.add(dome);
    const pilot = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), mat(0x8aef6a)); pilot.position.y = 0.14; g.add(pilot);
    const lights = [];
    for (let k = 0; k < 6; k++) { const lt = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffe14a })); const a = k * Math.PI / 3; lt.position.set(Math.cos(a) * 0.5, -0.04, Math.sin(a) * 0.5); g.add(lt); lights.push(lt); }
    g.userData.ufoLights = lights; g.userData.spinY = disc; g.userData.fly = true;
  } else if (type.pet === 'Space Jelly') {
    const jm = mutMat(egg.mut) || new THREE.MeshPhongMaterial({ color: 0xff8ae0, emissive: 0x6a1a6a, transparent: true, opacity: 0.75, shininess: 100 });
    const bell = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), jm); bell.castShadow = true; g.add(bell);
    [-1, 1].forEach((sd) => { const e8 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.03), black); e8.position.set(sd * 0.1, 0.15, 0.31); g.add(e8); });
    const tents = [];
    for (let k = 0; k < 6; k++) { const tt = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.04), jm); const a = k * Math.PI / 3; tt.position.set(Math.cos(a) * 0.2, -0.25, Math.sin(a) * 0.2); g.add(tt); tents.push({ m: tt, a }); }
    g.userData.jellyTents = tents; g.userData.fly = true;
  } else if (type.pet === 'Moon Bunny') {
    const body = mutMat(egg.mut) || mat(0xf4f4ff), pink = mat(0xffc0d8);
    box(0.4, 0.4, 0.5, body, 0, 0.3, 0);
    box(0.34, 0.32, 0.32, body, 0, 0.62, 0.18);
    box(0.08, 0.38, 0.06, body, -0.08, 0.98, 0.14); box(0.08, 0.38, 0.06, body, 0.08, 0.98, 0.14);
    box(0.04, 0.28, 0.03, pink, -0.08, 0.98, 0.17); box(0.04, 0.28, 0.03, pink, 0.08, 0.98, 0.17);
    box(0.05, 0.06, 0.03, black, -0.08, 0.67, 0.35); box(0.05, 0.06, 0.03, black, 0.08, 0.67, 0.35);
    box(0.05, 0.04, 0.03, pink, 0, 0.6, 0.35);
    box(0.14, 0.14, 0.12, body, 0, 0.35, -0.3);
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfff2a0 })); moon.position.set(0, 1.4, 0); g.add(moon);
    g.userData.hop = true;
  } else if (type.pet === 'Baby Cosmic Man') {
    const st = mutMat(egg.mut, cosmicTex) || new THREE.MeshLambertMaterial({ map: cosmicTex, emissive: 0x1a0a40 }), glowM = new THREE.MeshBasicMaterial({ color: 0xfff2a0 });
    box(0.45, 0.55, 0.3, st, 0, 0.75, 0);
    box(0.4, 0.38, 0.36, st, 0, 1.25, 0);
    box(0.08, 0.06, 0.03, glowM, -0.09, 1.28, 0.19); box(0.08, 0.06, 0.03, glowM, 0.09, 1.28, 0.19);
    box(0.12, 0.12, 0.04, glowM, 0, 0.82, 0.17);
    const la = box(0.12, 0.45, 0.12, st, -0.32, 0.72, 0), ra = box(0.12, 0.45, 0.12, st, 0.32, 0.72, 0);
    g.userData.swing = [la, ra];
    box(0.14, 0.45, 0.14, st, -0.12, 0.23, 0); box(0.14, 0.45, 0.14, st, 0.12, 0.23, 0);
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 6, 20), glowM); halo.rotation.x = Math.PI / 2; halo.position.y = 1.6; g.add(halo);
  } else if (type.pet === 'Velociraptor') {
    const body = mutMat(egg.mut, raptorTex) || new THREE.MeshLambertMaterial({ map: raptorTex }), claw = mat(0x2a2a2a), feather = mat(0x8a3a2a);
    box(0.35, 0.4, 0.7, body, 0, 0.75, 0);
    box(0.15, 0.3, 0.15, body, 0, 1.0, 0.35);
    box(0.25, 0.22, 0.45, body, 0, 1.15, 0.55);
    box(0.04, 0.05, 0.04, black, -0.12, 1.2, 0.68); box(0.04, 0.05, 0.04, black, 0.12, 1.2, 0.68);
    box(0.06, 0.15, 0.25, feather, 0, 1.3, 0.4);
    box(0.06, 0.2, 0.06, body, -0.18, 0.8, 0.35); box(0.06, 0.2, 0.06, body, 0.18, 0.8, 0.35);
    box(0.12, 0.55, 0.15, body, -0.12, 0.3, -0.05); box(0.12, 0.55, 0.15, body, 0.12, 0.3, -0.05);
    box(0.04, 0.1, 0.1, claw, -0.12, 0.05, 0.12); box(0.04, 0.1, 0.1, claw, 0.12, 0.05, 0.12);
    const tail = box(0.12, 0.12, 0.7, body, 0, 0.8, -0.65); g.userData.tail = tail;
    g.userData.fast = true;
  } else if (type.pet === 'Brontosaurus') {
    const body = mutMat(egg.mut) || mat(0x7aa86a), belly = mat(0xc8d8a0);
    box(0.6, 0.5, 1.0, body, 0, 0.75, 0);
    box(0.45, 0.1, 0.8, belly, 0, 0.5, 0);
    const neck = box(0.18, 0.9, 0.18, body, 0, 1.3, 0.5); neck.rotation.x = 0.3; g.userData.neck = neck;
    box(0.22, 0.2, 0.32, body, 0, 1.75, 0.75);
    box(0.04, 0.05, 0.04, black, -0.1, 1.8, 0.86); box(0.04, 0.05, 0.04, black, 0.1, 1.8, 0.86);
    const tail = box(0.14, 0.14, 0.8, body, 0, 0.7, -0.85); tail.rotation.x = 0.2; g.userData.tail = tail;
    [[-0.2, 0.35], [0.2, 0.35], [-0.2, -0.35], [0.2, -0.35]].forEach(([x, z]) => box(0.18, 0.5, 0.18, body, x, 0.25, z));
    g.userData.slow = true;
  } else if (type.pet === 'Triceratops') {
    const body = mutMat(egg.mut) || mat(0x6a8ab0), frill = mat(0xd08a4a), horn = mat(0xfff2d0);
    box(0.65, 0.5, 1.0, body, 0, 0.6, 0);
    box(0.45, 0.4, 0.45, body, 0, 0.7, 0.62);
    box(0.75, 0.6, 0.08, frill, 0, 0.95, 0.4);
    const h1 = box(0.06, 0.32, 0.06, horn, -0.15, 1.0, 0.75); h1.rotation.x = 0.7;
    const h2 = box(0.06, 0.32, 0.06, horn, 0.15, 1.0, 0.75); h2.rotation.x = 0.7;
    const h3 = box(0.06, 0.18, 0.06, horn, 0, 0.72, 0.9); h3.rotation.x = 0.6;
    box(0.04, 0.05, 0.04, black, -0.18, 0.82, 0.78); box(0.04, 0.05, 0.04, black, 0.18, 0.82, 0.78);
    box(0.1, 0.1, 0.35, body, 0, 0.6, -0.65);
    [[-0.22, 0.35], [0.22, 0.35], [-0.22, -0.35], [0.22, -0.35]].forEach(([x, z]) => box(0.18, 0.35, 0.18, body, x, 0.17, z));
  } else if (type.pet === 'Stegosaurus') {
    const body = mutMat(egg.mut) || mat(0xb0a040), plate = mat(0xd06a3a), spike = mat(0xfff2d0);
    box(0.6, 0.55, 1.1, body, 0, 0.65, 0);
    box(0.25, 0.22, 0.35, body, 0, 0.5, 0.7);
    box(0.04, 0.05, 0.04, black, -0.12, 0.56, 0.82); box(0.04, 0.05, 0.04, black, 0.12, 0.56, 0.82);
    [0.4, 0.15, -0.1, -0.35].forEach((z, k) => { const pl = box(0.06, 0.35 - Math.abs(z) * 0.2, 0.3, plate, 0, 1.08 - Math.abs(z) * 0.15, z); pl.rotation.z = (k % 2 ? 0.2 : -0.2); });
    const tail = box(0.14, 0.14, 0.7, body, 0, 0.6, -0.85); g.userData.tail = tail;
    [-1, 1].forEach((sd) => { const sp = box(0.04, 0.04, 0.25, spike, sd * 0.12, 0.66, -1.15); sp.rotation.y = sd * 0.8; });
    [[-0.2, 0.35], [0.2, 0.35], [-0.2, -0.35], [0.2, -0.35]].forEach(([x, z]) => box(0.16, 0.4, 0.16, body, x, 0.2, z));
  } else if (type.pet === 'Ankylosaurus') {
    const shell = mutMat(egg.mut, ankyTex) || new THREE.MeshLambertMaterial({ map: ankyTex }), skin = mat(0x9a8a6a), spike = mat(0xfff2d0), club = mat(0x5a4a3a);
    box(0.85, 0.4, 1.0, shell, 0, 0.5, 0);
    box(0.7, 0.12, 0.85, shell, 0, 0.75, 0);
    [-1, 1].forEach((sd) => { [0.3, 0, -0.3].forEach((z) => { const sp = box(0.18, 0.06, 0.06, spike, sd * 0.5, 0.5, z); sp.rotation.z = sd * 0.2; }); });
    box(0.4, 0.28, 0.35, skin, 0, 0.45, 0.62);
    box(0.04, 0.05, 0.04, black, -0.15, 0.52, 0.8); box(0.04, 0.05, 0.04, black, 0.15, 0.52, 0.8);
    box(0.1, 0.1, 0.6, shell, 0, 0.45, -0.75);
    const cl = box(0.3, 0.2, 0.25, club, 0, 0.45, -1.1); g.userData.tail = cl;
    [[-0.28, 0.32], [0.28, 0.32], [-0.28, -0.32], [0.28, -0.32]].forEach(([x, z]) => box(0.18, 0.3, 0.18, skin, x, 0.15, z));
    g.userData.slow = true;
  } else if (type.pet === 'Baby T-Rex') {
    const body = mutMat(egg.mut) || mat(0x4a8a3a), belly = mat(0xc8d88a), white = mat(0xffffff), mouth = mat(0x8a2a2a);
    box(0.5, 0.55, 0.7, body, 0, 0.75, 0);
    box(0.35, 0.35, 0.4, belly, 0, 0.68, 0.18);
    box(0.4, 0.38, 0.6, body, 0, 1.2, 0.4);
    box(0.36, 0.1, 0.45, mouth, 0, 1.03, 0.5);
    [-0.1, 0.1].forEach((x) => box(0.05, 0.07, 0.05, white, x, 1.07, 0.7));
    box(0.04, 0.06, 0.04, black, -0.17, 1.3, 0.55); box(0.04, 0.06, 0.04, black, 0.17, 1.3, 0.55);
    const la = box(0.07, 0.18, 0.07, body, -0.28, 0.85, 0.3), ra = box(0.07, 0.18, 0.07, body, 0.28, 0.85, 0.3);
    la.rotation.x = -0.8; ra.rotation.x = -0.8; g.userData.tinyArms = [la, ra];
    box(0.18, 0.5, 0.22, body, -0.16, 0.25, -0.05); box(0.18, 0.5, 0.22, body, 0.16, 0.25, -0.05);
    const tail = box(0.16, 0.16, 0.7, body, 0, 0.75, -0.6); g.userData.tail = tail;
  } else if (type.pet === 'Crab') {
    const body = mutMat(egg.mut) || mat(0xe8502a), dark = mat(0xb0301a), white = mat(0xffffff);
    box(0.7, 0.28, 0.5, body, 0, 0.32, 0);
    [-1, 1].forEach((sd) => {
      box(0.05, 0.2, 0.05, body, sd * 0.12, 0.55, 0.15);
      box(0.08, 0.08, 0.08, white, sd * 0.12, 0.67, 0.15); box(0.04, 0.04, 0.03, black, sd * 0.12, 0.67, 0.2);
      box(0.12, 0.1, 0.3, body, sd * 0.42, 0.35, 0.25);
      box(0.22, 0.18, 0.18, dark, sd * 0.5, 0.38, 0.45);
      [-0.15, 0, 0.15].forEach((z) => { const l = box(0.3, 0.05, 0.05, dark, sd * 0.45, 0.15, z); l.rotation.z = -sd * 0.6; });
    });
    g.userData.sideways = true;
  } else if (type.pet === 'Pufferfish') {
    const body = mutMat(egg.mut) || mat(0xffd23f), spike = mat(0xc09020), fin = mat(0xf0a020);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.35, 14, 10), body); ball.castShadow = true; g.add(ball); ball.position.y = 0.0;
    for (let k = 0; k < 16; k++) { const sp = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.12, 4), spike); const a = k * 1.3, el = (k % 4 - 1.5) * 0.5; const dx = Math.cos(a) * Math.cos(el), dy = Math.sin(el), dz = Math.sin(a) * Math.cos(el); sp.position.set(dx * 0.36, dy * 0.36, dz * 0.36); sp.lookAt(dx * 2, dy * 2, dz * 2); sp.rotateX(Math.PI / 2); ball.add(sp); }
    [-1, 1].forEach((sd) => { const e3 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), black); e3.position.set(sd * 0.13, 0.08, 0.3); ball.add(e3); });
    const tf = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.22, 0.18), fin); tf.position.set(0, 0, -0.42); ball.add(tf);
    g.userData.puff = ball; g.userData.fly = true;
  } else if (type.pet === 'Dolphin') {
    const body = mutMat(egg.mut) || mat(0x7a9ab8), belly = mat(0xe8eef4);
    box(0.4, 0.38, 1.0, body, 0, 0.45, 0);
    box(0.3, 0.1, 0.8, belly, 0, 0.28, 0.05);
    box(0.18, 0.14, 0.3, body, 0, 0.42, 0.62);
    box(0.05, 0.06, 0.04, black, -0.17, 0.55, 0.38); box(0.05, 0.06, 0.04, black, 0.17, 0.55, 0.38);
    const df = box(0.05, 0.25, 0.25, body, 0, 0.72, -0.05); df.rotation.x = -0.4;
    box(0.5, 0.05, 0.18, body, 0, 0.45, -0.62);
    g.userData.jump = true;
  } else if (type.pet === 'Octopus' || type.pet === 'Baby Kraken') {
    const kraken = type.pet === 'Baby Kraken';
    const body = mutMat(egg.mut) || new THREE.MeshLambertMaterial({ color: kraken ? 0x6a2a50 : 0xb05aff, emissive: kraken ? 0x200818 : 0x000000 });
    const head2 = new THREE.Mesh(new THREE.SphereGeometry(kraken ? 0.42 : 0.35, 14, 10), body); head2.scale.y = 1.2; head2.position.y = 0.75; head2.castShadow = true; g.add(head2);
    const eyeM = kraken ? new THREE.MeshBasicMaterial({ color: 0x7fff8a }) : mat(0xffffff);
    [-1, 1].forEach((sd) => {
      const e4 = new THREE.Mesh(new THREE.SphereGeometry(kraken ? 0.1 : 0.08, 8, 6), eyeM); e4.position.set(sd * 0.14, 0.72, 0.3); g.add(e4);
      if (!kraken) { const pu = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 4), black); pu.position.set(sd * 0.14, 0.72, 0.37); g.add(pu); }
    });
    const tents = [];
    for (let k = 0; k < 8; k++) {
      const a = k * Math.PI / 4;
      const tt = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.1), body);
      tt.position.set(Math.cos(a) * 0.25, 0.25, Math.sin(a) * 0.25); g.add(tt); tents.push({ m: tt, a });
    }
    g.userData.tents = tents;
  } else if (type.pet === 'Shark' || type.pet === 'Whale Shark') {
    const ws = type.pet === 'Whale Shark';
    const tex = ws ? whaleSharkTex : sharkTex;
    const body = mutMat(egg.mut, tex) || new THREE.MeshLambertMaterial({ map: tex }), white = mat(0xffffff);
    const sc = ws ? 1.3 : 1;
    box(0.45 * sc, 0.4 * sc, 1.1 * sc, body, 0, 0.45, 0);
    box(0.35 * sc, 0.32 * sc, 0.35 * sc, body, 0, 0.45, 0.7 * sc);
    if (!ws) { [-0.08, 0, 0.08].forEach((x) => box(0.04, 0.06, 0.03, white, x, 0.35, 0.87)); }
    box(0.04, 0.06, 0.04, black, -0.18 * sc, 0.52, 0.7 * sc); box(0.04, 0.06, 0.04, black, 0.18 * sc, 0.52, 0.7 * sc);
    const df = box(0.05, 0.35 * sc, 0.3 * sc, body, 0, 0.45 + 0.35 * sc, 0); df.rotation.x = -0.4;
    const tail = box(0.05, 0.45 * sc, 0.2, body, 0, 0.5, -0.7 * sc); g.userData.tail = tail;
    box(0.35 * sc, 0.05, 0.2, body, -0.25 * sc, 0.35, 0.15); box(0.35 * sc, 0.05, 0.2, body, 0.25 * sc, 0.35, 0.15);
    g.userData.float = true;
  } else if (type.pet === 'Mermaid') {
    const tailM = mutMat(egg.mut, mermaidTex) || new THREE.MeshLambertMaterial({ map: mermaidTex }), skin = mat(0xf2c9a0), hair = mat(0xd0402a), shell = mat(0xffb0c8), fin = mat(0x8af0e0);
    box(0.32, 0.45, 0.25, tailM, 0, 0.35, 0);                    // tail
    box(0.26, 0.3, 0.22, tailM, 0, 0.1, -0.12);
    const tf = box(0.45, 0.06, 0.25, fin, 0, 0.05, -0.32); g.userData.tail = tf;
    box(0.34, 0.35, 0.24, shell, 0, 0.75, 0);                    // shell top
    box(0.34, 0.34, 0.32, skin, 0, 1.12, 0.02);                  // head
    box(0.4, 0.4, 0.14, hair, 0, 1.15, -0.16); box(0.38, 0.1, 0.36, hair, 0, 1.32, 0.0); box(0.4, 0.55, 0.12, hair, 0, 0.85, -0.18);
    box(0.05, 0.06, 0.03, black, -0.08, 1.14, 0.19); box(0.05, 0.06, 0.03, black, 0.08, 1.14, 0.19);
    box(0.1, 0.03, 0.03, mat(0xd04a5a), 0, 1.03, 0.19);
    const la = box(0.09, 0.32, 0.09, skin, -0.22, 0.75, 0.02), ra = box(0.09, 0.32, 0.09, skin, 0.22, 0.75, 0.02);
    g.userData.swing = [la, ra];
    g.userData.hopSoft = true;
  } else if (type.pet === 'Penguin') {
    const body = mutMat(egg.mut) || mat(0x1a1a22), white = mat(0xffffff), orange = mat(0xf39a1e);
    box(0.5, 0.65, 0.42, body, 0, 0.45, 0);
    box(0.36, 0.5, 0.06, white, 0, 0.42, 0.21);
    box(0.4, 0.34, 0.36, body, 0, 0.95, 0.02);
    box(0.26, 0.18, 0.06, white, 0, 0.92, 0.2);
    box(0.12, 0.07, 0.14, orange, 0, 0.9, 0.26);
    box(0.04, 0.05, 0.03, black, -0.08, 0.98, 0.24); box(0.04, 0.05, 0.03, black, 0.08, 0.98, 0.24);
    box(0.06, 0.4, 0.2, body, -0.28, 0.5, 0); box(0.06, 0.4, 0.2, body, 0.28, 0.5, 0);
    box(0.14, 0.05, 0.2, orange, -0.1, 0.03, 0.08); box(0.14, 0.05, 0.2, orange, 0.1, 0.03, 0.08);
    g.userData.waddle = true;
  } else if (type.pet === 'Arctic Fox' || type.pet === 'Polar Bear') {
    const fox = type.pet === 'Arctic Fox';
    const body = mutMat(egg.mut) || mat(fox ? 0xf4fbff : 0xf8f6ee), nose = mat(0x1a1a1a);
    if (fox) {
      box(0.5, 0.42, 0.85, body, 0, 0.5, 0);
      box(0.42, 0.38, 0.4, body, 0, 0.78, 0.5);
      box(0.18, 0.15, 0.2, body, 0, 0.7, 0.78);
      box(0.06, 0.05, 0.04, nose, 0, 0.75, 0.89);
      box(0.12, 0.22, 0.06, body, -0.14, 1.05, 0.45); box(0.12, 0.22, 0.06, body, 0.14, 1.05, 0.45);
      box(0.05, 0.06, 0.03, black, -0.11, 0.86, 0.71); box(0.05, 0.06, 0.03, black, 0.11, 0.86, 0.71);
      const tail = box(0.22, 0.22, 0.55, body, 0, 0.6, -0.6); tail.rotation.x = 0.4; g.userData.tail = tail;
      [[-0.15, 0.3], [0.15, 0.3], [-0.15, -0.3], [0.15, -0.3]].forEach(([x, z]) => box(0.12, 0.3, 0.12, body, x, 0.15, z));
    } else {
      box(0.7, 0.6, 1.0, body, 0, 0.6, 0);
      box(0.55, 0.5, 0.5, body, 0, 0.85, 0.62);
      box(0.25, 0.2, 0.2, body, 0, 0.75, 0.92);
      box(0.1, 0.08, 0.04, nose, 0, 0.8, 1.03);
      box(0.14, 0.14, 0.08, body, -0.2, 1.15, 0.55); box(0.14, 0.14, 0.08, body, 0.2, 1.15, 0.55);
      box(0.05, 0.06, 0.03, black, -0.13, 0.95, 0.88); box(0.05, 0.06, 0.03, black, 0.13, 0.95, 0.88);
      [[-0.22, 0.35], [0.22, 0.35], [-0.22, -0.35], [0.22, -0.35]].forEach(([x, z]) => box(0.2, 0.35, 0.2, body, x, 0.17, z));
    }
  } else if (type.pet === 'Reindeer') {
    const body = mutMat(egg.mut) || mat(0x9a6a3a), antler = mat(0x5a3a1a), white = mat(0xfff7ea);
    box(0.5, 0.45, 0.9, body, 0, 0.8, 0);
    box(0.18, 0.4, 0.18, body, 0, 1.1, 0.45);
    box(0.3, 0.28, 0.42, body, 0, 1.32, 0.58);
    box(0.08, 0.07, 0.05, black, 0, 1.3, 0.8);
    box(0.05, 0.06, 0.03, black, -0.12, 1.4, 0.72); box(0.05, 0.06, 0.03, black, 0.12, 1.4, 0.72);
    [-1, 1].forEach((sd) => {
      const a1 = box(0.06, 0.45, 0.06, antler, sd * 0.13, 1.7, 0.5); a1.rotation.z = -sd * 0.35;
      box(0.25, 0.06, 0.06, antler, sd * 0.3, 1.82, 0.5); box(0.06, 0.2, 0.06, antler, sd * 0.38, 1.95, 0.5);
    });
    box(0.15, 0.15, 0.1, white, 0, 0.85, -0.48);
    [[-0.16, 0.32], [0.16, 0.32], [-0.16, -0.32], [0.16, -0.32]].forEach(([x, z]) => box(0.1, 0.6, 0.1, body, x, 0.3, z));
  } else if (type.pet === 'Whale') {
    // A little whale splashing in its own tub of water
    const tub = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.65, 0.4, 20), mat(0xb5853f)); tub.position.y = 0.2; tub.castShadow = true; g.add(tub);
    const water = new THREE.Mesh(new THREE.CircleGeometry(0.68, 20), new THREE.MeshPhongMaterial({ color: 0x4ab0e0, shininess: 80 })); water.rotation.x = -Math.PI / 2; water.position.y = 0.38; g.add(water);
    const whale = new THREE.Group();
    const wb = mutMat(egg.mut) || mat(0x3a6ab0), belly = mat(0xd8e8f8);
    const w1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.3, 0.7), wb); whale.add(w1);
    const w2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.5), belly); w2.position.y = -0.14; whale.add(w2);
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 0.15), wb); tl.position.set(0, 0.08, -0.42); whale.add(tl);
    [-1, 1].forEach((sd) => { const e2 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.05, 0.05), black); e2.position.set(sd * 0.23, 0.04, 0.22); whale.add(e2); });
    whale.position.y = 0.45; g.add(whale); g.userData.whale = whale;
    const spout = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 6), new THREE.MeshPhongMaterial({ color: 0xbfe8ff, transparent: true, opacity: 0.8 }));
    spout.rotation.x = Math.PI; spout.position.set(0, 0.8, 0.05); g.add(spout); g.userData.spout = spout;
  } else if (type.pet === 'Snow Golem') {
    const snowM = mutMat(egg.mut) || mat(0xffffff), coal = mat(0x1a1a1a), carrot = mat(0xf39a1e), stick = mat(0x6b4220);
    const b1 = new THREE.Mesh(new THREE.SphereGeometry(0.38, 14, 10), snowM); b1.position.y = 0.36; b1.castShadow = true; g.add(b1);
    const b2 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 10), snowM); b2.position.y = 0.88; b2.castShadow = true; g.add(b2);
    const b3 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10), snowM); b3.position.y = 1.28; b3.castShadow = true; g.add(b3);
    box(0.05, 0.05, 0.04, coal, -0.07, 1.33, 0.18); box(0.05, 0.05, 0.04, coal, 0.07, 1.33, 0.18);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.2, 6), carrot); nose.rotation.x = Math.PI / 2; nose.position.set(0, 1.27, 0.28); g.add(nose);
    box(0.05, 0.05, 0.04, coal, 0, 0.95, 0.27); box(0.05, 0.05, 0.04, coal, 0, 0.82, 0.28);
    const la = box(0.45, 0.04, 0.04, stick, -0.45, 0.95, 0); la.rotation.z = 0.5;
    const ra = box(0.45, 0.04, 0.04, stick, 0.45, 0.95, 0); ra.rotation.z = -0.5;
    g.userData.arms = [la, ra];
    box(0.3, 0.06, 0.3, coal, 0, 1.45, 0); box(0.2, 0.2, 0.2, coal, 0, 1.58, 0); // little hat
  } else if (type.pet === 'Baby Mammoth') {
    const body = mutMat(egg.mut) || mat(0x7a4a2a), dark = mat(0x5a3a1a), tusk = mat(0xfff8e6);
    box(0.75, 0.7, 1.0, body, 0, 0.75, 0);
    box(0.6, 0.6, 0.5, body, 0, 1.05, 0.62);
    box(0.4, 0.15, 0.4, dark, 0, 1.4, 0.55);                  // fluffy top
    const le = box(0.06, 0.3, 0.25, dark, -0.33, 1.05, 0.55), re = box(0.06, 0.3, 0.25, dark, 0.33, 1.05, 0.55);
    g.userData.ears = [le, re];
    const trunk = box(0.15, 0.55, 0.15, body, 0, 0.72, 0.92); trunk.rotation.x = 0.2;
    [-1, 1].forEach((sd) => { const t2 = box(0.06, 0.06, 0.35, tusk, sd * 0.18, 0.78, 1.0); t2.rotation.x = -0.6; });
    box(0.06, 0.07, 0.04, black, -0.18, 1.15, 0.88); box(0.06, 0.07, 0.04, black, 0.18, 1.15, 0.88);
    [[-0.25, 0.35], [0.25, 0.35], [-0.25, -0.35], [0.25, -0.35]].forEach(([x, z]) => box(0.22, 0.45, 0.22, body, x, 0.22, z));
  } else if (type.pet === 'Baby Yeti') {
    const fur = mutMat(egg.mut) || mat(0xf4f6fa), face = mat(0x6a8ab0), horn = mat(0xc8c0a8);
    box(0.6, 0.65, 0.5, fur, 0, 0.6, 0);
    box(0.5, 0.45, 0.45, fur, 0, 1.15, 0.05);
    box(0.34, 0.28, 0.06, face, 0, 1.12, 0.28);
    box(0.05, 0.06, 0.03, black, -0.08, 1.18, 0.32); box(0.05, 0.06, 0.03, black, 0.08, 1.18, 0.32);
    box(0.12, 0.03, 0.03, black, 0, 1.03, 0.32);
    box(0.08, 0.18, 0.08, horn, -0.2, 1.45, 0.05); box(0.08, 0.18, 0.08, horn, 0.2, 1.45, 0.05);
    const la = box(0.16, 0.55, 0.16, fur, -0.4, 0.6, 0.05), ra = box(0.16, 0.55, 0.16, fur, 0.4, 0.6, 0.05);
    g.userData.swing = [la, ra];
    box(0.2, 0.3, 0.2, fur, -0.15, 0.15, 0); box(0.2, 0.3, 0.2, fur, 0.15, 0.15, 0);
    box(0.24, 0.08, 0.3, face, -0.15, 0.04, 0.06); box(0.24, 0.08, 0.3, face, 0.15, 0.04, 0.06);
  } else if (type.pet === 'Fire Salamander') {
    const body = mutMat(egg.mut, salamanderTex) || new THREE.MeshLambertMaterial({ map: salamanderTex, emissive: 0x3a0a00 });
    box(0.4, 0.22, 0.9, body, 0, 0.2, 0);
    box(0.34, 0.2, 0.32, body, 0, 0.25, 0.58);
    box(0.05, 0.06, 0.06, black, -0.16, 0.32, 0.62); box(0.05, 0.06, 0.06, black, 0.16, 0.32, 0.62);
    const tail = box(0.12, 0.1, 0.7, body, 0, 0.15, -0.75); g.userData.tail = tail;
    [[-0.28, 0.3], [0.28, 0.3], [-0.28, -0.3], [0.28, -0.3]].forEach(([x, z]) => box(0.2, 0.08, 0.1, body, x, 0.08, z));
    g.userData.fast = true;
  } else if (type.pet === 'Fire Bat') {
    const body = mutMat(egg.mut) || mat(0x3a2040), wing = new THREE.MeshBasicMaterial({ color: 0xff7a1a });
    box(0.35, 0.4, 0.35, body, 0, 0.6, 0);
    box(0.3, 0.28, 0.28, body, 0, 0.9, 0.05);
    box(0.08, 0.16, 0.06, body, -0.1, 1.1, 0.05); box(0.08, 0.16, 0.06, body, 0.1, 1.1, 0.05);
    box(0.06, 0.06, 0.03, new THREE.MeshBasicMaterial({ color: 0xffe14a }), -0.07, 0.94, 0.2); box(0.06, 0.06, 0.03, new THREE.MeshBasicMaterial({ color: 0xffe14a }), 0.07, 0.94, 0.2);
    const lw = box(0.6, 0.35, 0.05, wing, -0.45, 0.65, 0), rw = box(0.6, 0.35, 0.05, wing, 0.45, 0.65, 0);
    g.userData.batWings = [lw, rw]; g.userData.fly = true;
  } else if (type.pet === 'Imp') {
    const body = mutMat(egg.mut) || mat(0xd02a2a), horn = mat(0x2a0a0a), fork = mat(0xffd23f);
    box(0.4, 0.45, 0.3, body, 0, 0.55, 0);
    box(0.38, 0.36, 0.34, body, 0, 0.98, 0.02);
    box(0.07, 0.16, 0.07, horn, -0.13, 1.23, 0); box(0.07, 0.16, 0.07, horn, 0.13, 1.23, 0);
    box(0.07, 0.05, 0.03, new THREE.MeshBasicMaterial({ color: 0xffe14a }), -0.08, 1.02, 0.2); box(0.07, 0.05, 0.03, new THREE.MeshBasicMaterial({ color: 0xffe14a }), 0.08, 1.02, 0.2);
    box(0.16, 0.03, 0.03, black, 0, 0.9, 0.2);
    box(0.1, 0.35, 0.1, body, -0.25, 0.6, 0); box(0.1, 0.35, 0.1, body, 0.25, 0.6, 0);
    box(0.04, 0.9, 0.04, fork, 0.33, 0.75, 0.08); box(0.2, 0.04, 0.04, fork, 0.33, 1.2, 0.08); box(0.04, 0.12, 0.04, fork, 0.25, 1.26, 0.08); box(0.04, 0.12, 0.04, fork, 0.41, 1.26, 0.08);
    box(0.12, 0.3, 0.12, body, -0.1, 0.15, 0); box(0.12, 0.3, 0.12, body, 0.1, 0.15, 0);
    const tail = box(0.05, 0.05, 0.45, body, 0, 0.45, -0.32); tail.rotation.x = -0.5; g.userData.tail = tail;
  } else if (type.pet === 'Hellhound') {
    const body = mutMat(egg.mut) || mat(0x1e1a1e), fire = new THREE.MeshBasicMaterial({ color: 0xff7a1a }), fire2 = new THREE.MeshBasicMaterial({ color: 0xffd23f });
    box(0.55, 0.5, 1.0, body, 0, 0.6, 0);
    box(0.5, 0.48, 0.5, body, 0, 0.95, 0.6);
    box(0.28, 0.2, 0.25, body, 0, 0.82, 0.92);
    box(0.12, 0.25, 0.1, body, -0.18, 1.25, 0.55); box(0.12, 0.25, 0.1, body, 0.18, 1.25, 0.55);
    box(0.08, 0.06, 0.03, new THREE.MeshBasicMaterial({ color: 0xff2a1a }), -0.13, 1.03, 0.86); box(0.08, 0.06, 0.03, new THREE.MeshBasicMaterial({ color: 0xff2a1a }), 0.13, 1.03, 0.86);
    const flames = [box(0.2, 0.3, 0.2, fire, 0, 0.98, 0.2), box(0.16, 0.24, 0.16, fire2, 0, 0.95, -0.15), box(0.2, 0.3, 0.2, fire, 0, 0.98, -0.42)];
    g.userData.flames = flames;
    [[-0.18, 0.35], [0.18, 0.35], [-0.18, -0.35], [0.18, -0.35]].forEach(([x, z]) => box(0.14, 0.35, 0.14, body, x, 0.17, z));
  } else if (type.pet === 'Phoenix') {
    const body = mutMat(egg.mut) || new THREE.MeshLambertMaterial({ color: 0xffa020, emissive: 0x7a2a00 }), fire = new THREE.MeshBasicMaterial({ color: 0xff5a1a }), gold = new THREE.MeshBasicMaterial({ color: 0xffe14a });
    box(0.45, 0.45, 0.6, body, 0, 0.6, 0);
    box(0.36, 0.34, 0.36, body, 0, 0.98, 0.22);
    box(0.12, 0.1, 0.18, gold, 0, 0.94, 0.46);
    box(0.04, 0.06, 0.06, black, -0.18, 1.02, 0.3); box(0.04, 0.06, 0.06, black, 0.18, 1.02, 0.3);
    box(0.06, 0.25, 0.06, fire, 0, 1.25, 0.18); box(0.06, 0.2, 0.06, gold, 0.08, 1.22, 0.12);
    const lw = box(0.08, 0.35, 0.55, fire, -0.28, 0.65, -0.02), rw = box(0.08, 0.35, 0.55, fire, 0.28, 0.65, -0.02);
    g.userData.wings = [lw, rw];
    [-0.3, 0, 0.3].forEach((r) => { const f = box(0.1, 0.05, 0.55, r === 0 ? gold : fire, Math.sin(r) * 0.12, 0.6, -0.52); f.rotation.y = r; f.rotation.x = -0.3; });
    g.userData.fly = true;
  } else if (type.pet === 'Baby Dragon') {
    const body = mutMat(egg.mut, dragonTex) || new THREE.MeshLambertMaterial({ map: dragonTex }), belly = mat(0xffd23f), wing = mat(0x7a1a14), horn = mat(0xfff2d0);
    box(0.5, 0.45, 0.8, body, 0, 0.5, 0);
    box(0.3, 0.1, 0.5, belly, 0, 0.3, 0.05);
    box(0.18, 0.3, 0.18, body, 0, 0.82, 0.35);
    box(0.4, 0.32, 0.45, body, 0, 1.0, 0.55);
    box(0.06, 0.18, 0.06, horn, -0.12, 1.24, 0.45); box(0.06, 0.18, 0.06, horn, 0.12, 1.24, 0.45);
    box(0.05, 0.07, 0.04, black, -0.13, 1.05, 0.78); box(0.05, 0.07, 0.04, black, 0.13, 1.05, 0.78);
    box(0.04, 0.04, 0.03, black, -0.06, 0.95, 0.79); box(0.04, 0.04, 0.03, black, 0.06, 0.95, 0.79);
    const lw = box(0.5, 0.06, 0.4, wing, -0.45, 0.85, -0.05), rw = box(0.5, 0.06, 0.4, wing, 0.45, 0.85, -0.05);
    g.userData.dragonWings = [lw, rw];
    const tail = box(0.14, 0.14, 0.6, body, 0, 0.42, -0.65); g.userData.tail = tail;
    [[-0.16, 0.25], [0.16, 0.25], [-0.16, -0.25], [0.16, -0.25]].forEach(([x, z]) => box(0.13, 0.3, 0.13, body, x, 0.15, z));
  } else if (type.pet === 'Baby Cerberus') {
    const body = mutMat(egg.mut) || mat(0x2a2228), collar = mat(0xb02a1a), eye = new THREE.MeshBasicMaterial({ color: 0xff2a1a });
    box(0.6, 0.5, 0.85, body, 0, 0.55, 0);
    [-0.28, 0, 0.28].forEach((x, k) => {
      const tilt = (k - 1) * 0.08;
      box(0.26, 0.26, 0.3, body, x + tilt, 0.95, 0.5);
      box(0.14, 0.11, 0.12, body, x + tilt, 0.88, 0.69);
      box(0.06, 0.12, 0.05, body, x + tilt - 0.08, 1.12, 0.45); box(0.06, 0.12, 0.05, body, x + tilt + 0.08, 1.12, 0.45);
      box(0.04, 0.04, 0.03, eye, x + tilt - 0.06, 0.99, 0.66); box(0.04, 0.04, 0.03, eye, x + tilt + 0.06, 0.99, 0.66);
      box(0.22, 0.06, 0.22, collar, x, 0.8, 0.45);
    });
    const tail = box(0.08, 0.08, 0.4, body, 0, 0.7, -0.55); tail.rotation.x = -0.6; g.userData.tail = tail;
    [[-0.18, 0.3], [0.18, 0.3], [-0.18, -0.3], [0.18, -0.3]].forEach(([x, z]) => box(0.13, 0.32, 0.13, body, x, 0.16, z));
  } else if (type.pet === 'Monkey') {
    const body = mutMat(egg.mut) || mat(0x8a5a2b), face = mat(0xe0b88a);
    box(0.5, 0.55, 0.45, body, 0, 0.6, 0);
    box(0.45, 0.42, 0.42, body, 0, 1.07, 0.05);
    box(0.32, 0.28, 0.06, face, 0, 1.03, 0.27);
    box(0.12, 0.16, 0.08, face, -0.28, 1.1, 0); box(0.12, 0.16, 0.08, face, 0.28, 1.1, 0);
    box(0.05, 0.06, 0.03, black, -0.08, 1.1, 0.31); box(0.05, 0.06, 0.03, black, 0.08, 1.1, 0.31);
    const la = box(0.12, 0.5, 0.12, body, -0.32, 0.75, 0), ra = box(0.12, 0.5, 0.12, body, 0.32, 0.75, 0);
    g.userData.swing = [la, ra];
    box(0.14, 0.35, 0.14, body, -0.12, 0.17, 0); box(0.14, 0.35, 0.14, body, 0.12, 0.17, 0);
    const tail = box(0.07, 0.07, 0.5, body, 0, 0.5, -0.4); tail.rotation.x = -0.6; g.userData.tail = tail;
  } else if (type.pet === 'Parrot') {
    const body = mutMat(egg.mut) || mat(0xe23b2e), blue = mat(0x2f6fe0), yellow = mat(0xffd23f), beak = mat(0x2a2a2a), white = mat(0xffffff);
    box(0.4, 0.5, 0.45, body, 0, 0.55, 0);
    box(0.36, 0.34, 0.36, body, 0, 0.95, 0.08);
    box(0.12, 0.14, 0.14, beak, 0, 0.88, 0.32);
    box(0.12, 0.1, 0.04, white, -0.12, 1.0, 0.25); box(0.12, 0.1, 0.04, white, 0.12, 1.0, 0.25);
    box(0.04, 0.05, 0.03, black, -0.12, 1.0, 0.28); box(0.04, 0.05, 0.03, black, 0.12, 1.0, 0.28);
    const lw = box(0.07, 0.35, 0.4, blue, -0.24, 0.6, -0.02), rw = box(0.07, 0.35, 0.4, blue, 0.24, 0.6, -0.02);
    g.userData.wings = [lw, rw];
    box(0.12, 0.05, 0.5, yellow, -0.05, 0.4, -0.38); box(0.12, 0.05, 0.5, blue, 0.07, 0.42, -0.38);
    box(0.05, 0.25, 0.05, beak, -0.1, 0.17, 0); box(0.05, 0.25, 0.05, beak, 0.1, 0.17, 0);
    g.userData.fly = true;
  } else if (type.pet === 'Sloth') {
    const body = mutMat(egg.mut) || mat(0xa08a70), face = mat(0xe8d8c0), mask = mat(0x4a3a2a);
    box(0.55, 0.55, 0.5, body, 0, 0.55, 0);
    box(0.45, 0.4, 0.4, body, 0, 1.0, 0.05);
    box(0.36, 0.28, 0.06, face, 0, 0.98, 0.26);
    box(0.12, 0.08, 0.04, mask, -0.09, 1.02, 0.3); box(0.12, 0.08, 0.04, mask, 0.09, 1.02, 0.3);
    box(0.12, 0.02, 0.03, black, 0, 0.9, 0.3);
    [-1, 1].forEach((sd) => { const arm = box(0.12, 0.55, 0.12, body, sd * 0.34, 0.6, 0.15); arm.rotation.x = -0.6; });
    box(0.14, 0.25, 0.14, body, -0.15, 0.13, 0); box(0.14, 0.25, 0.14, body, 0.15, 0.13, 0);
    g.userData.slow = true;
  } else if (type.pet === 'Chameleon') {
    const skin = new THREE.MeshLambertMaterial({ color: mutMat(egg.mut) ? 0xffffff : 0x5ccf3a });
    const body = mutMat(egg.mut) || skin;
    box(0.35, 0.35, 0.8, body, 0, 0.35, 0);
    box(0.3, 0.3, 0.35, body, 0, 0.42, 0.5);
    box(0.14, 0.14, 0.14, body, -0.17, 0.48, 0.55); box(0.14, 0.14, 0.14, body, 0.17, 0.48, 0.55);
    box(0.05, 0.06, 0.06, black, -0.24, 0.48, 0.58); box(0.05, 0.06, 0.06, black, 0.24, 0.48, 0.58);
    box(0.1, 0.12, 0.25, body, 0, 0.62, 0.05);
    const t1 = box(0.1, 0.1, 0.35, body, 0, 0.3, -0.55); const t2 = box(0.1, 0.25, 0.1, body, 0, 0.22, -0.72);
    [[-0.2, 0.25], [0.2, 0.25], [-0.2, -0.25], [0.2, -0.25]].forEach(([x, z]) => box(0.08, 0.2, 0.08, body, x, 0.1, z));
    if (!mutMat(egg.mut)) g.userData.colorMat = skin;
  } else if (type.pet === 'Elephant') {
    const body = mutMat(egg.mut) || mat(0x9aa0a8), dark = mat(0x7d838c), white = mat(0xfffbe9);
    box(0.75, 0.65, 1.0, body, 0, 0.75, 0);
    box(0.6, 0.55, 0.5, body, 0, 1.05, 0.62);
    const le = box(0.06, 0.5, 0.45, dark, -0.36, 1.05, 0.5), re = box(0.06, 0.5, 0.45, dark, 0.36, 1.05, 0.5);
    g.userData.ears = [le, re];
    const trunk = box(0.15, 0.55, 0.15, body, 0, 0.72, 0.92); trunk.rotation.x = 0.2;
    box(0.06, 0.06, 0.18, white, -0.15, 0.85, 0.9); box(0.06, 0.06, 0.18, white, 0.15, 0.85, 0.9);
    box(0.06, 0.07, 0.04, black, -0.18, 1.15, 0.88); box(0.06, 0.07, 0.04, black, 0.18, 1.15, 0.88);
    [[-0.25, 0.35], [0.25, 0.35], [-0.25, -0.35], [0.25, -0.35]].forEach(([x, z]) => box(0.22, 0.45, 0.22, body, x, 0.22, z));
    box(0.06, 0.25, 0.06, body, 0, 0.75, -0.55);
  } else if (type.pet === 'Gorilla') {
    const body = mutMat(egg.mut) || mat(0x2a2a2a), chest = mat(0x6a6a6a), face = mat(0x4a4a4a);
    box(0.75, 0.75, 0.55, body, 0, 0.75, 0);
    box(0.45, 0.45, 0.06, chest, 0, 0.75, 0.28);
    box(0.5, 0.45, 0.45, body, 0, 1.3, 0.05);
    box(0.32, 0.26, 0.06, face, 0, 1.25, 0.28);
    box(0.05, 0.06, 0.03, black, -0.09, 1.33, 0.32); box(0.05, 0.06, 0.03, black, 0.09, 1.33, 0.32);
    const la = box(0.2, 0.75, 0.2, body, -0.5, 0.65, 0.1), ra = box(0.2, 0.75, 0.2, body, 0.5, 0.65, 0.1);
    g.userData.thump = [la, ra];
    box(0.22, 0.4, 0.22, body, -0.2, 0.2, 0); box(0.22, 0.4, 0.22, body, 0.2, 0.2, 0);
  } else if (type.pet === 'Panther') {
    const body = mutMat(egg.mut) || new THREE.MeshPhongMaterial({ color: 0x151515, shininess: 60, specular: 0x555577 });
    const eye = new THREE.MeshBasicMaterial({ color: 0xffd23f });
    box(0.5, 0.42, 1.0, body, 0, 0.55, 0);
    box(0.45, 0.4, 0.45, body, 0, 0.78, 0.62);
    box(0.12, 0.14, 0.08, body, -0.16, 1.04, 0.55); box(0.12, 0.14, 0.08, body, 0.16, 1.04, 0.55);
    box(0.1, 0.06, 0.03, eye, -0.11, 0.85, 0.85); box(0.1, 0.06, 0.03, eye, 0.11, 0.85, 0.85);
    const tail = box(0.08, 0.08, 0.7, body, 0, 0.65, -0.8); tail.rotation.x = -0.3; g.userData.tail = tail;
    [[-0.15, 0.35], [0.15, 0.35], [-0.15, -0.35], [0.15, -0.35]].forEach(([x, z]) => box(0.12, 0.35, 0.12, body, x, 0.17, z));
  } else if (type.pet === 'Tiger') {
    const fur = mutMat(egg.mut, tigerTex) || new THREE.MeshLambertMaterial({ map: tigerTex }), white = mat(0xfff7ea), pink = mat(0xff8a9a);
    box(0.55, 0.45, 0.9, fur, 0, 0.55, 0);
    box(0.5, 0.45, 0.42, fur, 0, 0.8, 0.55);
    box(0.3, 0.18, 0.12, white, 0, 0.7, 0.8);
    box(0.1, 0.07, 0.04, pink, 0, 0.77, 0.87);
    box(0.12, 0.12, 0.08, fur, -0.17, 1.07, 0.5); box(0.12, 0.12, 0.08, fur, 0.17, 1.07, 0.5);
    box(0.05, 0.07, 0.03, black, -0.12, 0.88, 0.77); box(0.05, 0.07, 0.03, black, 0.12, 0.88, 0.77);
    const tail = box(0.08, 0.08, 0.6, fur, 0, 0.7, -0.7); tail.rotation.x = -0.5; g.userData.tail = tail;
    [[-0.15, 0.3], [0.15, 0.3], [-0.15, -0.3], [0.15, -0.3]].forEach(([x, z]) => box(0.14, 0.35, 0.14, fur, x, 0.17, z));
  } else if (type.pet === 'Lizard') {
    const body = mutMat(egg.mut, lizardTex) || new THREE.MeshLambertMaterial({ map: lizardTex });
    box(0.4, 0.22, 0.9, body, 0, 0.2, 0);
    box(0.32, 0.2, 0.3, body, 0, 0.25, 0.58);
    box(0.05, 0.06, 0.06, black, -0.15, 0.32, 0.62); box(0.05, 0.06, 0.06, black, 0.15, 0.32, 0.62);
    const tail = box(0.12, 0.1, 0.7, body, 0, 0.15, -0.75); g.userData.tail = tail;
    [[-0.28, 0.3], [0.28, 0.3], [-0.28, -0.3], [0.28, -0.3]].forEach(([x, z]) => box(0.2, 0.08, 0.1, body, x, 0.08, z));
    g.userData.fast = true;
  } else if (type.pet === 'Fox') {
    const body = mutMat(egg.mut) || mat(0xf08a3a), white = mat(0xffffff);
    box(0.5, 0.45, 0.85, body, 0, 0.5, 0);
    box(0.45, 0.4, 0.4, body, 0, 0.8, 0.5);
    box(0.2, 0.16, 0.22, white, 0, 0.72, 0.78);
    box(0.08, 0.06, 0.04, black, 0, 0.78, 0.9);
    box(0.18, 0.35, 0.08, body, -0.18, 1.15, 0.45); box(0.18, 0.35, 0.08, body, 0.18, 1.15, 0.45); // big ears
    box(0.1, 0.22, 0.04, white, -0.18, 1.12, 0.5); box(0.1, 0.22, 0.04, white, 0.18, 1.12, 0.5);
    box(0.05, 0.07, 0.04, black, -0.12, 0.88, 0.71); box(0.05, 0.07, 0.04, black, 0.12, 0.88, 0.71);
    const tail = box(0.22, 0.22, 0.5, body, 0, 0.6, -0.6); tail.rotation.x = 0.4; g.userData.tail = tail;
    box(0.18, 0.18, 0.15, white, 0, 0.72, -0.85);
    [[-0.15, 0.3], [0.15, 0.3], [-0.15, -0.3], [0.15, -0.3]].forEach(([x, z]) => box(0.12, 0.3, 0.12, body, x, 0.15, z));
  } else if (type.pet === 'Camel') {
    const body = mutMat(egg.mut) || mat(0xd9b07a), dark = mat(0x9a7a4a);
    box(0.55, 0.45, 1.0, body, 0, 0.95, 0);
    box(0.4, 0.3, 0.4, body, 0, 1.3, 0);                        // hump
    box(0.2, 0.55, 0.2, body, 0, 1.25, 0.55);                   // neck
    box(0.28, 0.25, 0.45, body, 0, 1.55, 0.7);                  // head
    box(0.05, 0.07, 0.04, black, -0.13, 1.6, 0.8); box(0.05, 0.07, 0.04, black, 0.13, 1.6, 0.8);
    [[-0.18, 0.35], [0.18, 0.35], [-0.18, -0.35], [0.18, -0.35]].forEach(([x, z]) => box(0.12, 0.75, 0.12, body, x, 0.38, z));
    box(0.06, 0.25, 0.06, dark, 0, 0.9, -0.55);
  } else if (type.pet === 'Armadillo') {
    const shell = mutMat(egg.mut, bandTex) || new THREE.MeshLambertMaterial({ map: bandTex }), skin = mat(0xd9b8a0);
    box(0.6, 0.45, 0.8, shell, 0, 0.35, 0);
    box(0.5, 0.15, 0.6, shell, 0, 0.62, 0);
    box(0.22, 0.2, 0.3, skin, 0, 0.3, 0.52);
    box(0.08, 0.15, 0.06, skin, -0.07, 0.48, 0.48); box(0.08, 0.15, 0.06, skin, 0.07, 0.48, 0.48);
    box(0.04, 0.05, 0.04, black, -0.08, 0.36, 0.66); box(0.04, 0.05, 0.04, black, 0.08, 0.36, 0.66);
    box(0.1, 0.1, 0.4, shell, 0, 0.2, -0.55);
    g.userData.roll = true;
  } else if (type.pet === 'Vulture') {
    const body = mutMat(egg.mut) || mat(0x4a3a30), headSkin = mat(0xe8a0a0), ruff = mat(0xf0e8e0), beak = mat(0xd9c080);
    box(0.55, 0.5, 0.75, body, 0, 0.6, 0);
    box(0.45, 0.15, 0.3, ruff, 0, 0.9, 0.25);
    box(0.25, 0.25, 0.28, headSkin, 0, 1.08, 0.38);
    box(0.1, 0.1, 0.18, beak, 0, 1.03, 0.58);
    box(0.04, 0.05, 0.05, black, -0.13, 1.13, 0.45); box(0.04, 0.05, 0.05, black, 0.13, 1.13, 0.45);
    const lw = box(0.08, 0.15, 0.6, body, -0.4, 0.75, 0), rw = box(0.08, 0.15, 0.6, body, 0.4, 0.75, 0);
    lw.scale.x = 1; g.userData.wings = [lw, rw]; g.userData.fly = true;
  } else if (type.pet === 'Snake') {
    const body = mutMat(egg.mut) || mat(0x5ccf3a), dark = mat(0x2f8f2a), white = mat(0xffffff);
    const segs = [];
    for (let i = 0; i < 6; i++) {
      const seg = new THREE.Mesh(new THREE.SphereGeometry(0.2 * (1 - i * 0.1), 10, 8), i % 3 === 1 ? (mutMat(egg.mut) || dark) : body);
      seg.position.set(0, 0.18, -0.25 - i * 0.28); seg.castShadow = true; g.add(seg); segs.push(seg);
    }
    const head2 = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 10), body); head2.scale.set(1, 0.8, 1.2); head2.position.set(0, 0.22, 0.05); head2.castShadow = true; g.add(head2);
    [-1, 1].forEach((sd) => {
      const w = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), white); w.position.set(sd * 0.12, 0.35, 0.2); g.add(w);
      const b2 = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 4), black); b2.position.set(sd * 0.13, 0.37, 0.26); g.add(b2);
    });
    g.userData.segs = segs;
  } else if (type.pet === 'Scorpion') {
    const shell = mutMat(egg.mut) || mat(0x9a2f1f), dark = mat(0x5a1a10);
    box(0.6, 0.25, 0.8, shell, 0, 0.25, 0);
    box(0.45, 0.2, 0.3, shell, 0, 0.27, 0.5);
    box(0.06, 0.06, 0.03, black, -0.1, 0.36, 0.66); box(0.06, 0.06, 0.03, black, 0.1, 0.36, 0.66);
    [-1, 1].forEach((sd) => {
      box(0.12, 0.12, 0.35, shell, sd * 0.32, 0.25, 0.7);
      box(0.22, 0.16, 0.22, shell, sd * 0.4, 0.25, 0.95);
      [-0.25, 0, 0.25].forEach((z) => { const l = box(0.35, 0.06, 0.06, dark, sd * 0.42, 0.12, z); l.rotation.z = -sd * 0.5; });
    });
    box(0.2, 0.2, 0.2, shell, 0, 0.32, -0.5);
    box(0.18, 0.2, 0.18, shell, 0, 0.5, -0.65);
    box(0.16, 0.2, 0.16, shell, 0, 0.72, -0.62);
    const st = box(0.12, 0.12, 0.2, dark, 0, 0.82, -0.45); g.userData.tail = st;
  } else if (type.pet === 'Duck') {
    const body = mutMat(egg.mut) || mat(0xffd84a), wing = mat(0xf0c030);
    box(0.6, 0.45, 0.75, body, 0, 0.45, 0);
    box(0.4, 0.4, 0.38, body, 0, 0.85, 0.3);
    box(0.3, 0.08, 0.25, orange, 0, 0.78, 0.6);
    box(0.04, 0.07, 0.07, black, -0.2, 0.92, 0.38); box(0.04, 0.07, 0.07, black, 0.2, 0.92, 0.38);
    const lw = box(0.08, 0.25, 0.45, wing, -0.33, 0.5, -0.05), rw = box(0.08, 0.25, 0.45, wing, 0.33, 0.5, -0.05);
    g.userData.wings = [lw, rw];
    box(0.25, 0.15, 0.15, body, 0, 0.6, -0.42);
    box(0.18, 0.06, 0.25, orange, -0.15, 0.03, 0.1); box(0.18, 0.06, 0.25, orange, 0.15, 0.03, 0.1);
    box(0.06, 0.2, 0.06, orange, -0.15, 0.13, 0); box(0.06, 0.2, 0.06, orange, 0.15, 0.13, 0);
  } else if (type.pet === 'Frog') {
    const body = mutMat(egg.mut) || mat(0x6cc44a), belly = mat(0xd9f2a0), white = mat(0xffffff);
    box(0.75, 0.4, 0.7, body, 0, 0.3, 0);
    box(0.55, 0.06, 0.5, belly, 0, 0.1, 0.05);
    box(0.22, 0.22, 0.22, body, -0.22, 0.6, 0.2); box(0.22, 0.22, 0.22, body, 0.22, 0.6, 0.2); // eye bumps
    box(0.14, 0.14, 0.05, white, -0.22, 0.62, 0.32); box(0.14, 0.14, 0.05, white, 0.22, 0.62, 0.32);
    box(0.07, 0.07, 0.03, black, -0.22, 0.62, 0.35); box(0.07, 0.07, 0.03, black, 0.22, 0.62, 0.35);
    box(0.4, 0.04, 0.04, mat(0xc0392b), 0, 0.28, 0.36); // smile
    box(0.25, 0.12, 0.45, body, -0.45, 0.08, -0.1); box(0.25, 0.12, 0.45, body, 0.45, 0.08, -0.1); // back legs
    g.userData.hop = true;
  } else if (type.pet === 'Fish') {
    // A fish in its own little bowl
    const glass = new THREE.MeshPhongMaterial({ color: 0xcfefff, transparent: true, opacity: 0.35, shininess: 100, specular: 0xffffff });
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 14), glass); bowl.position.y = 0.55; g.add(bowl);
    const water = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 14, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65), new THREE.MeshPhongMaterial({ color: 0x4ab0e0, transparent: true, opacity: 0.5 }));
    water.position.y = 0.55; g.add(water);
    const fish = new THREE.Group();
    const fb = mutMat(egg.mut) || mat(0xff8a3a);
    const f1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.22, 0.32), fb); fish.add(f1);
    const ft = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.22, 0.14), fb); ft.position.z = -0.22; fish.add(ft);
    const fe = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.05, 0.05), black); fe.position.set(0, 0.04, 0.1); fish.add(fe);
    fish.position.y = 0.5; g.add(fish); g.userData.fish = fish;
  } else if (type.pet === 'Turtle') {
    const shell = mutMat(egg.mut, shellTex) || new THREE.MeshLambertMaterial({ map: shellTex }), skin = mat(0xc9b37a);
    box(0.8, 0.35, 0.9, shell, 0, 0.4, 0);
    box(0.6, 0.15, 0.7, shell, 0, 0.65, 0);
    box(0.3, 0.28, 0.3, skin, 0, 0.35, 0.55);
    box(0.04, 0.06, 0.06, black, -0.15, 0.42, 0.65); box(0.04, 0.06, 0.06, black, 0.15, 0.42, 0.65);
    [[-0.35, 0.3], [0.35, 0.3], [-0.35, -0.3], [0.35, -0.3]].forEach(([x, z]) => box(0.18, 0.2, 0.18, skin, x, 0.12, z));
    box(0.1, 0.08, 0.18, skin, 0, 0.3, -0.5);
    g.userData.slow = true;
  } else if (type.pet === 'Beaver') {
    const body = mutMat(egg.mut) || mat(0x9a6233), dark = mat(0x4a2c16), white = mat(0xffffff), nose = mat(0x2a1a10);
    box(0.6, 0.55, 0.8, body, 0, 0.45, 0);
    box(0.5, 0.45, 0.42, body, 0, 0.8, 0.45);
    box(0.12, 0.1, 0.06, white, 0, 0.6, 0.67);                  // big teeth
    box(0.12, 0.08, 0.06, nose, 0, 0.82, 0.68);
    box(0.05, 0.07, 0.04, black, -0.15, 0.92, 0.66); box(0.05, 0.07, 0.04, black, 0.15, 0.92, 0.66);
    box(0.12, 0.12, 0.08, body, -0.2, 1.06, 0.4); box(0.12, 0.12, 0.08, body, 0.2, 1.06, 0.4);
    const tail = box(0.4, 0.08, 0.6, dark, 0, 0.12, -0.65); g.userData.tail = tail;
    [[-0.2, 0.3], [0.2, 0.3], [-0.2, -0.25], [0.2, -0.25]].forEach(([x, z]) => box(0.15, 0.2, 0.15, dark, x, 0.1, z));
  } else if (type.pet === 'Flamingo') {
    const body = mutMat(egg.mut) || mat(0xff8fc0), pink2 = mat(0xff6fae), beakTip = mat(0x222222), white = mat(0xfff2f8);
    box(0.5, 0.4, 0.75, body, 0, 1.15, 0);
    box(0.12, 0.12, 0.3, pink2, 0, 1.2, -0.48);                 // tail feathers
    box(0.12, 0.5, 0.12, body, 0, 1.55, 0.3);                    // neck
    box(0.12, 0.12, 0.25, body, 0, 1.8, 0.4);
    box(0.25, 0.25, 0.3, body, 0, 1.9, 0.55);                    // head
    box(0.1, 0.1, 0.2, white, 0, 1.85, 0.78);
    box(0.1, 0.1, 0.08, beakTip, 0, 1.8, 0.9);
    box(0.04, 0.06, 0.06, black, -0.13, 1.95, 0.6); box(0.04, 0.06, 0.06, black, 0.13, 1.95, 0.6);
    const legA = box(0.05, 0.95, 0.05, pink2, -0.1, 0.48, 0);
    const legB = box(0.05, 0.95, 0.05, pink2, 0.1, 0.48, 0);
    g.userData.legs = [legA, legB];
  } else {
    const body = mutMat(egg.mut) || mat(0x5aa7e8), yellow = mat(0xffd23f), wing = mat(0x3b84c9);
    box(0.5, 0.45, 0.6, body, 0, 0.55, 0);
    box(0.4, 0.38, 0.38, body, 0, 0.9, 0.22);
    box(0.14, 0.1, 0.18, yellow, 0, 0.87, 0.48);
    box(0.04, 0.07, 0.07, black, -0.2, 0.95, 0.3); box(0.04, 0.07, 0.07, black, 0.2, 0.95, 0.3);
    const lw = box(0.08, 0.3, 0.45, wing, -0.29, 0.58, -0.02), rw = box(0.08, 0.3, 0.45, wing, 0.29, 0.58, -0.02);
    g.userData.wings = [lw, rw];
    [-0.3, 0, 0.3].forEach((r) => { const f = box(0.1, 0.05, 0.35, wing, Math.sin(r) * 0.1, 0.62, -0.42); f.rotation.y = r; f.rotation.x = -0.3; });
    box(0.05, 0.3, 0.05, orange, -0.1, 0.17, 0); box(0.05, 0.3, 0.05, orange, 0.1, 0.17, 0);
  }
  return g;
}
