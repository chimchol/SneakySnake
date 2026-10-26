// Angels & Demons pets: shared shapes, angel or demon dress-up
function buildHeavenHellPet(type, egg, g, box) {
  const angel = type.side === 'angel';
  const black = mat(0x111111);
  const main = mutMat(egg.mut) || (angel ? mat(type.color) : new THREE.MeshLambertMaterial({ color: type.color, emissive: 0x100000 }));
  const accent = angel ? new THREE.MeshPhongMaterial({ color: 0xf2d06a, shininess: 90, specular: 0xffffff }) : mat(0x8a0a14);
  const eyeM = angel ? mat(0x3a6ab0) : new THREE.MeshBasicMaterial({ color: 0xff2a1a });
  const wingM = angel ? mat(0xffffff) : mat(0x4a0a14);
  const halo = (y, z) => { const h = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 6, 18), new THREE.MeshBasicMaterial({ color: 0xffe68a })); h.rotation.x = Math.PI / 2; h.position.set(0, y, z || 0); g.add(h); };
  const horns = (y, z, sx) => { [-1, 1].forEach((sd) => { const h = box(0.06, 0.2, 0.06, mat(0x1a0a0a), sd * (sx || 0.14), y, z); h.rotation.z = -sd * 0.4; }); };
  const wings = (y, z, w, h) => { const lw = box(0.06, h, w, wingM, -0.32, y, z), rw = box(0.06, h, w, wingM, 0.32, y, z); g.userData.wings = [lw, rw]; };
  const eyes = (x, y, z) => { box(0.05, 0.06, 0.03, eyeM, -x, y, z); box(0.05, 0.06, 0.03, eyeM, x, y, z); };
  const legs4 = (y, h, w, dx, dz) => [[-dx, dz], [dx, dz], [-dx, -dz], [dx, -dz]].forEach(([x, z]) => box(w, h, w, main, x, y, z));
  const p = type.pet;
  if (p === 'Cloud Lamb' || p === 'Shadow Goat') {
    const fluff = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 1), main); fluff.position.y = 0.6; fluff.scale.z = 1.2; fluff.castShadow = true; g.add(fluff);
    box(0.28, 0.26, 0.3, angel ? mat(0xf6dcc0) : mat(0x1a1a1a), 0, 0.72, 0.5);
    eyes(0.08, 0.76, 0.66);
    legs4(0.18, 0.36, 0.1, 0.18, 0.22);
    if (angel) halo(1.1, 0.4); else { horns(1.0, 0.45, 0.12); box(0.08, 0.15, 0.06, mat(0x6a6a6a), 0, 0.55, 0.62); }
  } else if (p === 'Dove' || p === 'Bat') {
    box(0.36, 0.34, 0.45, main, 0, 0.55, 0);
    box(0.28, 0.26, 0.28, main, 0, 0.85, 0.18);
    eyes(0.09, 0.9, 0.33);
    if (angel) { box(0.08, 0.06, 0.12, mat(0xf39a1e), 0, 0.82, 0.38); wings(0.6, 0, 0.4, 0.25); halo(1.12, 0.18); }
    else { box(0.07, 0.14, 0.05, main, -0.09, 1.03, 0.18); box(0.07, 0.14, 0.05, main, 0.09, 1.03, 0.18); const lw = box(0.55, 0.3, 0.05, wingM, -0.42, 0.62, 0), rw = box(0.55, 0.3, 0.05, wingM, 0.42, 0.62, 0); g.userData.batWings = [lw, rw]; }
    g.userData.fly = true;
  } else if (p === 'Halo Cat' || p === 'Devil Cat') {
    box(0.42, 0.36, 0.7, main, 0, 0.45, 0);
    box(0.38, 0.34, 0.34, main, 0, 0.78, 0.38);
    box(0.1, 0.12, 0.06, main, -0.12, 1.0, 0.38); box(0.1, 0.12, 0.06, main, 0.12, 1.0, 0.38);
    eyes(0.09, 0.82, 0.56);
    legs4(0.13, 0.26, 0.1, 0.14, 0.24);
    const tail = box(0.06, 0.06, 0.45, main, 0, 0.6, -0.5); tail.rotation.x = -0.5; g.userData.tail = tail;
    if (angel) { halo(1.18, 0.38); wings(0.62, 0, 0.3, 0.2); }
    else { horns(1.05, 0.42, 0.1); box(0.14, 0.12, 0.06, accent, 0, 0.8, -0.72); }
  } else if (p === 'Pegasus' || p === 'Nightmare Horse') {
    box(0.45, 0.45, 0.95, main, 0, 0.9, 0);
    const neck = box(0.2, 0.45, 0.2, main, 0, 1.2, 0.45); neck.rotation.x = 0.4;
    box(0.26, 0.26, 0.45, main, 0, 1.45, 0.65);
    eyes(0.14, 1.5, 0.78);
    legs4(0.35, 0.7, 0.12, 0.15, 0.35);
    const mane = angel ? mat(0xf2d06a) : new THREE.MeshBasicMaterial({ color: 0xb05aff });
    box(0.08, 0.3, 0.45, mane, 0, 1.55, 0.4); box(0.1, 0.35, 0.12, mane, 0, 1.0, -0.55);
    if (angel) { const lw = box(0.08, 0.1, 0.6, wingM, -0.4, 1.2, 0), rw = box(0.08, 0.1, 0.6, wingM, 0.4, 1.2, 0); lw.rotation.z = 0.5; rw.rotation.z = -0.5; g.userData.wings = [lw, rw]; }
    else g.userData.flames = [box(0.1, 0.3, 0.1, mane, 0, 1.25, 0.1), box(0.1, 0.25, 0.1, mane, 0, 1.25, -0.2)];
  } else if (p === 'Golden Lion' || p === 'Shadow Wolf') {
    box(0.5, 0.45, 0.9, main, 0, 0.55, 0);
    if (angel) { box(0.7, 0.65, 0.3, accent, 0, 0.95, 0.4); box(0.42, 0.4, 0.3, main, 0, 0.92, 0.6); halo(1.42, 0.5); }
    else { box(0.42, 0.4, 0.42, main, 0, 0.85, 0.55); box(0.2, 0.16, 0.25, main, 0, 0.78, 0.82); box(0.12, 0.24, 0.08, main, -0.14, 1.12, 0.5); box(0.12, 0.24, 0.08, main, 0.14, 1.12, 0.5); }
    eyes(0.1, 0.98, angel ? 0.76 : 0.77);
    legs4(0.17, 0.35, 0.14, 0.15, 0.3);
    const tail = box(0.08, 0.08, 0.55, main, 0, 0.7, -0.62); tail.rotation.x = -0.5; g.userData.tail = tail;
  } else if (p === 'Light Dragon' || p === 'Dark Dragon') {
    box(0.5, 0.45, 0.8, main, 0, 0.5, 0);
    box(0.18, 0.3, 0.18, main, 0, 0.82, 0.35);
    box(0.4, 0.32, 0.45, main, 0, 1.0, 0.55);
    eyes(0.13, 1.05, 0.78);
    box(0.06, 0.18, 0.06, accent, -0.12, 1.24, 0.45); box(0.06, 0.18, 0.06, accent, 0.12, 1.24, 0.45);
    const lw = box(0.5, 0.06, 0.4, wingM, -0.45, 0.85, -0.05), rw = box(0.5, 0.06, 0.4, wingM, 0.45, 0.85, -0.05);
    g.userData.dragonWings = [lw, rw];
    const tail = box(0.14, 0.14, 0.6, main, 0, 0.42, -0.65); g.userData.tail = tail;
    legs4(0.15, 0.3, 0.13, 0.16, 0.25);
    if (angel) halo(1.4, 0.5); else box(0.12, 0.12, 0.12, new THREE.MeshBasicMaterial({ color: 0xff7a1a }), 0, 0.95, 0.85);
  } else {
    // Cherub, Imp King, Baby Angel, Baby Demon: little people
    const big = p === 'Baby Angel' || p === 'Baby Demon';
    const skin = angel ? mat(0xf6dcc0) : main;
    const cloth = angel ? mat(0xffffff) : mat(0x2a0a0a);
    box(0.4, 0.45, 0.28, cloth, 0, 0.62, 0);
    box(0.36, 0.34, 0.32, skin, 0, 1.02, 0.02);
    eyes(0.08, 1.05, 0.19);
    const la = box(0.1, 0.35, 0.1, skin, -0.26, 0.65, 0), ra = box(0.1, 0.35, 0.1, skin, 0.26, 0.65, 0);
    g.userData.swing = [la, ra];
    box(0.12, 0.35, 0.12, skin, -0.1, 0.18, 0); box(0.12, 0.35, 0.12, skin, 0.1, 0.18, 0);
    if (angel) {
      box(0.4, 0.14, 0.36, mat(0xf2d06a), 0, 1.22, -0.02);       // golden hair
      halo(1.42, 0);
      const lw = box(0.06, 0.3, 0.35, wingM, -0.24, 0.85, -0.22), rw = box(0.06, 0.3, 0.35, wingM, 0.24, 0.85, -0.22); lw.rotation.y = 0.5; rw.rotation.y = -0.5; g.userData.wings = [lw, rw];
      if (p === 'Cherub') { box(0.04, 0.4, 0.04, accent, 0.35, 0.8, 0.12); box(0.3, 0.02, 0.02, mat(0xffffff), 0.35, 0.8, 0.12); }   // little bow
      if (big) box(0.44, 0.1, 0.32, accent, 0, 0.45, 0);
    } else {
      horns(1.24, 0, 0.12);
      const tail = box(0.05, 0.05, 0.45, main, 0, 0.45, -0.3); tail.rotation.x = -0.5; g.userData.tail = tail;
      if (p === 'Imp King') { [-0.12, 0, 0.12].forEach((x) => box(0.08, 0.12, 0.08, mat(0xf2bd2c), x, 1.25, 0.12)); box(0.04, 0.9, 0.04, mat(0xf2bd2c), 0.33, 0.75, 0.08); }
      if (big) { const lw = box(0.4, 0.25, 0.05, wingM, -0.38, 0.85, -0.18), rw = box(0.4, 0.25, 0.05, wingM, 0.38, 0.85, -0.18); g.userData.batWings = [lw, rw]; }
    }
    if (big) g.userData.hopSoft = true;
  }
}
