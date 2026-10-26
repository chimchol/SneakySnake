// ---------- Bosses ----------
function makeBoss(zone, name, home, speed, build, eyeSpots, glowAt) {
  const b = { zone, name, home, x: home.x, z: home.z, heading: 0, state: 'sleep', t: 0, speed, zzz: Math.random() * 2 };
  b.group = new THREE.Group();
  b.eyeMat = new THREE.MeshLambertMaterial({ color: 0x111111, emissive: 0x000000 });
  const box = (w, h, d, m, x, y, z) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.castShadow = true; b.group.add(o); return o; };
  const extra = build(box);
  if (extra) { b.group.add(extra); b.extra = extra; }
  b.eyes = eyeSpots.map(([x, y, z, w, h, d]) => { const e = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), b.eyeMat); e.position.set(x, y, z); b.group.add(e); return e; });
  b.glow = new THREE.PointLight(0xff2a1a, 0, 8); b.glow.position.set(glowAt[0], glowAt[1], glowAt[2]); b.group.add(b.glow);
  b.group.position.set(home.x, 0, home.z); scene.add(b.group);
  b.nests = [];
  return b;
}
const chickenBoss = makeBoss(1, 'Chicken', { x: 0, z: FZ - 5 }, 3.6, (box) => {
  const white = mat(0xfafafa), red = mat(0xe23b2e), orange = mat(0xf39a1e);
  box(2.6, 2.2, 3.2, white, 0, 2.3, 0);            // body
  box(0.4, 1.4, 2.0, white, -1.5, 2.4, -0.2);      // left wing
  box(0.4, 1.4, 2.0, white, 1.5, 2.4, -0.2);       // right wing
  box(1.8, 1.2, 0.8, white, 0, 3.0, -1.9);         // tail
  box(1.6, 1.8, 1.4, white, 0, 4.0, 1.4);          // head
  box(0.9, 0.5, 0.8, orange, 0, 3.9, 2.4);         // beak
  box(0.5, 0.7, 0.3, red, 0, 3.3, 2.2);            // wattle
  box(0.4, 0.5, 1.0, red, 0, 5.15, 1.4);           // comb
  box(0.4, 0.35, 0.5, red, 0, 5.4, 1.2);
  box(0.3, 1.2, 0.3, orange, -0.6, 0.6, 0.2);      // legs
  box(0.3, 1.2, 0.3, orange, 0.6, 0.6, 0.2);
  box(0.7, 0.15, 0.9, orange, -0.6, 0.08, 0.5);    // feet
  box(0.7, 0.15, 0.9, orange, 0.6, 0.08, 0.5);
}, [[-0.82, 4.25, 1.6, 0.1, 0.35, 0.35], [0.82, 4.25, 1.6, 0.1, 0.35, 0.35]], [0, 4.3, 2.2]);

const swanBoss = makeBoss(2, 'Swan', { x: 0, z: LZ - 3 }, bossSpeedFor(30), (box) => {
  const white = mat(0xfdfdfd), orange = mat(0xf39a1e), black = mat(0x1a1a1a), grey = mat(0xe6e6ee);
  box(3.0, 1.8, 4.0, white, 0, 1.4, 0);              // body
  box(2.4, 1.2, 1.2, white, 0, 1.9, -2.4);           // tail, tipped up
  box(1.6, 0.6, 0.8, white, 0, 2.6, -2.8);
  box(0.5, 1.6, 3.4, grey, -1.7, 1.9, -0.2);         // wings
  box(0.5, 1.6, 3.4, grey, 1.7, 1.9, -0.2);
  box(0.8, 1.4, 0.8, white, 0, 2.8, 1.8);            // long neck, in blocks
  box(0.7, 1.3, 0.7, white, 0, 4.0, 2.1);
  box(0.65, 1.1, 0.65, white, 0, 5.1, 2.2);
  box(1.0, 0.9, 1.4, white, 0, 6.0, 2.5);            // head
  box(0.55, 0.4, 0.9, orange, 0, 5.85, 3.55);        // beak
  box(0.6, 0.5, 0.3, black, 0, 5.95, 3.15);          // black knob at the beak
  box(0.35, 0.8, 0.35, black, -0.7, 0.4, 0.4);       // legs
  box(0.35, 0.8, 0.35, black, 0.7, 0.4, 0.4);
  box(0.8, 0.12, 1.0, black, -0.7, 0.06, 0.7);       // webbed feet
  box(0.8, 0.12, 1.0, black, 0.7, 0.06, 0.7);
}, [[-0.52, 6.15, 2.8, 0.06, 0.25, 0.25], [0.52, 6.15, 2.8, 0.06, 0.25, 0.25]], [0, 6.1, 3.2]);
const scorpionBoss = makeBoss(3, 'Scorpion', { x: 0, z: DZ - 3 }, bossSpeedFor(120), (box) => {
  const shell = mat(0x9a2f1f), dark = mat(0x5a1a10), sting = mat(0x2a0a05);
  box(2.6, 1.0, 3.6, shell, 0, 1.0, 0);                 // body
  box(2.0, 0.8, 1.2, shell, 0, 1.05, 2.1);              // head
  box(2.2, 0.3, 3.0, dark, 0, 1.55, -0.1);              // back plates
  // claws
  [-1, 1].forEach((s) => {
    box(0.5, 0.45, 1.6, shell, s * 1.5, 1.0, 3.0);
    box(0.9, 0.6, 1.0, shell, s * 1.8, 1.0, 4.1);
    box(0.3, 0.35, 0.9, dark, s * 2.15, 1.0, 4.9);
    box(0.3, 0.35, 0.7, dark, s * 1.5, 1.0, 4.8);
    // legs
    [-1.2, -0.3, 0.6, 1.4].forEach((z) => { const l = box(1.4, 0.25, 0.25, dark, s * 1.8, 0.55, z); l.rotation.z = -s * 0.5; });
  });
  // tail curling up over the back
  box(1.0, 0.8, 1.0, shell, 0, 1.2, -2.2);
  box(0.9, 0.9, 0.9, shell, 0, 1.9, -2.9);
  box(0.8, 0.9, 0.8, shell, 0, 2.8, -3.2);
  box(0.75, 0.85, 0.75, shell, 0, 3.7, -2.9);
  box(0.7, 0.7, 0.9, shell, 0, 4.3, -2.2);
  box(0.35, 0.35, 0.9, sting, 0, 4.1, -1.4);           // stinger
}, [[-0.55, 1.35, 2.72, 0.3, 0.25, 0.06], [0.55, 1.35, 2.72, 0.3, 0.25, 0.06]], [0, 1.4, 3.2]);
const tigerBoss = makeBoss(4, 'Tiger', { x: 0, z: JZ - 3 }, bossSpeedFor(400), (box) => {
  const fur = new THREE.MeshLambertMaterial({ map: tigerTex }), white = mat(0xfff7ea), black = mat(0x1a1a1a), pink = mat(0xff8a9a);
  box(2.6, 2.2, 4.4, fur, 0, 2.2, 0);                 // body
  box(2.4, 2.2, 2.0, fur, 0, 3.2, 2.8);               // head
  box(1.4, 0.9, 0.8, white, 0, 2.7, 3.9);             // muzzle
  box(0.5, 0.35, 0.3, pink, 0, 3.05, 4.3);            // nose
  box(0.6, 0.6, 0.4, fur, -0.85, 4.5, 2.5); box(0.6, 0.6, 0.4, fur, 0.85, 4.5, 2.5); // ears
  box(0.3, 0.3, 0.42, black, -0.85, 4.5, 2.52); box(0.3, 0.3, 0.42, black, 0.85, 4.5, 2.52);
  box(1.6, 0.6, 3.2, white, 0, 1.15, 0.2);            // belly
  [[-0.85, 1.4], [0.85, 1.4], [-0.85, -1.4], [0.85, -1.4]].forEach(([x, z]) => { box(0.75, 1.4, 0.75, fur, x, 0.7, z); box(0.8, 0.25, 0.9, white, x, 0.12, z + 0.15); });
  const tail = box(0.4, 0.4, 2.6, fur, 0, 3.0, -3.2); tail.rotation.x = -0.6;
  box(0.45, 0.45, 0.5, black, 0, 3.9, -4.3);
}, [[-0.6, 3.6, 3.82, 0.4, 0.3, 0.06], [0.6, 3.6, 3.82, 0.4, 0.3, 0.06]], [0, 3.6, 4.4]);
const cerberusBoss = makeBoss(5, 'Cerberus', { x: 0, z: VZ - 3 }, bossSpeedFor(1500), (box) => {
  const fur = mat(0x2a2228), dark = mat(0x151015), collar = mat(0xb02a1a), spike = mat(0xd8d8d8), fire = new THREE.MeshBasicMaterial({ color: 0xff7a1a });
  box(3.2, 2.6, 5.0, fur, 0, 2.6, 0);                     // body
  [[-1, 1.4], [1, 1.4], [-1, -1.6], [1, -1.6]].forEach(([x, z]) => box(0.9, 1.8, 0.9, dark, x, 0.9, z));
  const tail = box(0.45, 0.45, 2.4, fur, 0, 3.6, -3.4); tail.rotation.x = -0.7;
  box(0.5, 0.6, 0.5, fire, 0, 4.5, -4.3);                // flaming tail tip
  // three heads on three necks
  [-1.5, 0, 1.5].forEach((x, k) => {
    const tilt = (k - 1) * 0.25;
    const neck = box(1.0, 1.4, 1.0, fur, x, 3.9, 2.4); neck.rotation.z = -tilt;
    box(1.5, 1.4, 1.6, fur, x + tilt * 1.5, 4.9, 3.0);     // head
    box(0.9, 0.7, 0.9, dark, x + tilt * 1.5, 4.55, 4.0);   // snout
    box(0.35, 0.25, 0.2, mat(0x0a0a0a), x + tilt * 1.5, 4.85, 4.48);
    box(0.35, 0.6, 0.25, dark, x + tilt * 1.5 - 0.5, 5.85, 2.8); box(0.35, 0.6, 0.25, dark, x + tilt * 1.5 + 0.5, 5.85, 2.8); // ears
    box(1.2, 0.35, 1.2, collar, x, 3.55, 2.4);             // spiked collar
    box(0.18, 0.3, 0.18, spike, x, 3.55, 3.05);
  });
}, [-1.5, 0, 1.5].flatMap((x, k) => { const hx = x + (k - 1) * 0.375; return [[hx - 0.38, 5.15, 3.82, 0.3, 0.22, 0.05], [hx + 0.38, 5.15, 3.82, 0.3, 0.22, 0.05]]; }), [0, 5.2, 4.2]);
const yetiBoss = makeBoss(6, 'Yeti', { x: 0, z: IZ - 3 }, bossSpeedFor(5000), (box) => {
  const fur = mat(0xf4f6fa), fur2 = mat(0xdfe6f0), face = mat(0x6a8ab0), horn = mat(0xc8c0a8), mouth = mat(0x2a2a3a), tooth = mat(0xffffff);
  box(3.6, 4.0, 2.8, fur, 0, 3.6, 0);                 // big body
  box(2.4, 2.4, 0.3, fur2, 0, 3.4, 1.45);             // belly fur
  box(2.6, 2.2, 2.4, fur, 0, 6.6, 0.3);               // head
  box(1.8, 1.4, 0.3, face, 0, 6.5, 1.55);             // blue face
  box(1.0, 0.35, 0.2, mouth, 0, 6.0, 1.72);
  box(0.2, 0.25, 0.1, tooth, -0.3, 5.95, 1.8); box(0.2, 0.25, 0.1, tooth, 0.3, 5.95, 1.8);
  box(0.4, 0.9, 0.4, horn, -1.2, 8.0, 0.2); box(0.4, 0.9, 0.4, horn, 1.2, 8.0, 0.2);
  box(1.1, 3.6, 1.1, fur, -2.4, 3.4, 0.3); box(1.1, 3.6, 1.1, fur, 2.4, 3.4, 0.3);   // long arms
  box(1.3, 0.8, 1.4, face, -2.4, 1.4, 0.5); box(1.3, 0.8, 1.4, face, 2.4, 1.4, 0.5); // hands
  box(1.3, 1.6, 1.3, fur, -0.9, 0.8, 0); box(1.3, 1.6, 1.3, fur, 0.9, 0.8, 0);       // legs
  box(1.5, 0.4, 2.0, face, -0.9, 0.2, 0.4); box(1.5, 0.4, 2.0, face, 0.9, 0.2, 0.4); // big feet
}, [[-0.45, 6.85, 1.72, 0.35, 0.3, 0.06], [0.45, 6.85, 1.72, 0.35, 0.3, 0.06]], [0, 6.9, 2.2]);
const whaleBoss = makeBoss(7, 'Whale', { x: 0, z: OZ - 3 }, bossSpeedFor(15000), (box) => {
  const blue = mat(0x2a5a9a), belly = mat(0xd8e8f8), dark = mat(0x1a3a6a);
  box(4.4, 3.4, 7.0, blue, 0, 2.0, 0);                // big body
  box(3.6, 0.8, 5.6, belly, 0, 0.55, 0.6);            // white belly
  box(3.8, 2.6, 1.4, blue, 0, 2.2, 4.0);              // front of the head
  box(3.0, 0.3, 1.0, dark, 0, 1.3, 4.65);             // mouth line
  box(2.4, 1.8, 2.0, blue, 0, 2.4, -4.4);             // tail
  box(1.6, 1.2, 1.6, blue, 0, 2.8, -5.9);
  const fl = box(2.6, 0.35, 1.4, blue, -1.4, 3.3, -6.8); fl.rotation.z = 0.25;  // tail flukes
  const fr = box(2.6, 0.35, 1.4, blue, 1.4, 3.3, -6.8); fr.rotation.z = -0.25;
  const finL = box(2.0, 0.3, 1.2, blue, -2.9, 1.2, 1.6); finL.rotation.z = 0.5;
  const finR = box(2.0, 0.3, 1.2, blue, 2.9, 1.2, 1.6); finR.rotation.z = -0.5;
  box(0.8, 0.3, 0.8, dark, 0, 3.75, 2.4);             // blowhole
  const spout = new THREE.Mesh(new THREE.ConeGeometry(0.6, 2.4, 8), new THREE.MeshPhongMaterial({ color: 0xbfe8ff, transparent: true, opacity: 0.7 }));
  spout.position.set(0, 5.1, 2.4); spout.rotation.x = Math.PI; return spout;
}, [[-2.22, 2.6, 3.4, 0.06, 0.4, 0.4], [2.22, 2.6, 3.4, 0.06, 0.4, 0.4]], [0, 2.8, 4.8]);
const trexBoss = makeBoss(8, 'T-Rex', { x: 0, z: PZ - 3 }, bossSpeedFor(40000), (box) => {
  const green = mat(0x4a8a3a), belly = mat(0xc8d88a), dark = mat(0x2f5f2a), tooth = mat(0xffffff), mouth = mat(0x8a2a2a);
  box(3.0, 3.2, 5.0, green, 0, 4.4, 0);               // body
  box(2.2, 2.2, 3.4, belly, 0, 3.9, 0.6);             // belly
  box(1.6, 2.2, 1.6, green, 0, 6.2, 2.4);             // neck
  box(2.4, 2.0, 3.6, green, 0, 7.6, 3.8);             // big head
  box(2.2, 0.6, 3.0, mouth, 0, 6.6, 4.2);             // open jaw
  box(2.2, 0.7, 3.2, green, 0, 6.1, 4.1);             // lower jaw
  [-0.8, -0.3, 0.2, 0.7].forEach((x) => { box(0.2, 0.35, 0.2, tooth, x, 6.75, 5.45); });
  box(0.3, 0.3, 0.3, dark, -0.6, 8.2, 5.3); box(0.3, 0.3, 0.3, dark, 0.6, 8.2, 5.3); // nostrils
  // tiny arms!
  const la = box(0.35, 1.0, 0.35, green, -1.3, 4.8, 2.2); la.rotation.x = -0.7;
  const ra = box(0.35, 1.0, 0.35, green, 1.3, 4.8, 2.2); ra.rotation.x = -0.7;
  // big legs
  box(1.2, 3.2, 1.6, green, -1.2, 2.2, -0.4); box(1.2, 3.2, 1.6, green, 1.2, 2.2, -0.4);
  box(1.0, 1.4, 1.0, dark, -1.2, 0.7, 0); box(1.0, 1.4, 1.0, dark, 1.2, 0.7, 0);
  box(1.4, 0.4, 2.0, dark, -1.2, 0.2, 0.5); box(1.4, 0.4, 2.0, dark, 1.2, 0.2, 0.5);
  // long tail
  box(2.2, 2.2, 3.0, green, 0, 4.4, -3.8); box(1.4, 1.4, 3.0, green, 0, 4.2, -6.6); box(0.8, 0.8, 2.6, green, 0, 4.0, -9.2);
  for (let k = 0; k < 6; k++) box(0.25, 0.5, 0.6, dark, 0, 6.2 - k * 0.25, 1.6 - k * 1.6); // back spikes
}, [[-1.22, 8.0, 4.4, 0.06, 0.35, 0.45], [1.22, 8.0, 4.4, 0.06, 0.35, 0.45]], [0, 8.0, 5.2]);
const cosmicBoss = makeBoss(9, 'Cosmic Man', { x: 0, z: CZ - 3 }, bossSpeedFor(100000), (box) => {
  const star = new THREE.MeshLambertMaterial({ map: cosmicTex, emissive: 0x1a0a40 }), glow = new THREE.MeshBasicMaterial({ color: 0xfff2a0 });
  box(2.6, 3.6, 1.6, star, 0, 5.6, 0);                // chest
  box(2.2, 1.4, 1.4, star, 0, 3.4, 0);                // hips
  box(1.0, 3.2, 1.0, star, -0.65, 1.6, 0); box(1.0, 3.2, 1.0, star, 0.65, 1.6, 0);   // legs
  box(0.8, 3.4, 0.8, star, -1.8, 5.4, 0); box(0.8, 3.4, 0.8, star, 1.8, 5.4, 0);     // arms
  box(1.0, 1.0, 1.0, glow, -1.8, 3.5, 0); box(1.0, 1.0, 1.0, glow, 1.8, 3.5, 0);     // glowing hands
  box(1.9, 1.9, 1.7, star, 0, 8.4, 0);                // head
  box(0.7, 0.7, 0.2, glow, 0, 6.0, 0.85);             // star on the chest
  const halo = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.15, 8, 32), glow);
  halo.position.set(0, 10.0, 0); halo.rotation.x = Math.PI / 2; return halo;
}, [[-0.45, 8.6, 0.88, 0.4, 0.25, 0.05], [0.45, 8.6, 0.88, 0.4, 0.25, 0.05]], [0, 8.6, 1.6]);
const oniBoss = makeBoss(10, 'Oni Tiger', { x: 0, z: BZ - 3 }, bossSpeedFor(250000), (box) => {
  const fur = new THREE.MeshLambertMaterial({ map: oniTex }), white = mat(0xfff2e8), horn = mat(0xfff2c0), gold = mat(0xf2bd2c), dark = mat(0x1a0a14), fang = mat(0xffffff);
  box(2.8, 2.4, 4.6, fur, 0, 2.3, 0);                 // body
  box(2.6, 2.4, 2.2, fur, 0, 3.5, 2.9);               // head
  box(1.6, 1.0, 0.9, white, 0, 2.9, 4.1);             // muzzle
  box(0.5, 0.35, 0.3, dark, 0, 3.3, 4.55);            // nose
  box(0.22, 0.6, 0.22, fang, -0.45, 2.4, 4.4); box(0.22, 0.6, 0.22, fang, 0.45, 2.4, 4.4); // big fangs
  box(2.8, 0.3, 0.2, gold, 0, 4.2, 4.05);             // gold mask band
  const h1 = box(0.45, 1.6, 0.45, horn, -0.85, 5.3, 2.7); h1.rotation.z = 0.3;  // oni horns
  const h2 = box(0.45, 1.6, 0.45, horn, 0.85, 5.3, 2.7); h2.rotation.z = -0.3;
  box(0.6, 0.6, 0.4, fur, -1.2, 4.8, 2.4); box(0.6, 0.6, 0.4, fur, 1.2, 4.8, 2.4);  // ears
  box(1.8, 0.6, 3.4, white, 0, 1.2, 0.2);            // belly
  [[-0.9, 1.5], [0.9, 1.5], [-0.9, -1.5], [0.9, -1.5]].forEach(([x, z]) => { box(0.8, 1.5, 0.8, fur, x, 0.75, z); box(0.9, 0.25, 1.0, dark, x, 0.12, z + 0.1); });
  const tail = box(0.4, 0.4, 2.8, fur, 0, 3.0, -3.4); tail.rotation.x = -0.6;
  box(0.6, 0.6, 0.6, new THREE.MeshBasicMaterial({ color: 0xb05aff }), 0, 4.0, -4.6);  // ghostly flame on the tail
  box(3.0, 0.4, 0.4, mat(0x6a1a8a), 0, 3.0, 1.6);    // purple rope collar
}, [[-0.65, 3.9, 4.0, 0.45, 0.32, 0.06], [0.65, 3.9, 4.0, 0.45, 0.32, 0.06]], [0, 3.9, 4.6]);
const titanBoss = makeBoss(11, 'Titan Gorilla', { x: 0, z: TZ - 3 }, bossSpeedFor(600000), (box) => {
  const fur = mat(0x3a3a44), chest = mat(0x7a7a84), face = mat(0x5a5a64), gold = new THREE.MeshPhongMaterial({ color: 0xf2bd2c, shininess: 90, specular: 0xfff2b0 });
  box(4.4, 4.2, 3.0, fur, 0, 4.6, 0);                 // huge body
  box(3.0, 2.6, 0.3, chest, 0, 4.4, 1.55);            // chest
  box(4.6, 0.6, 3.2, gold, 0, 2.9, 0);                // gold belt
  box(2.6, 2.2, 2.4, fur, 0, 7.6, 0.6);               // head
  box(1.8, 1.4, 0.3, face, 0, 7.4, 1.85);
  box(2.8, 0.5, 2.6, gold, 0, 8.7, 0.6);              // gold crown band
  [-0.9, 0, 0.9].forEach((x) => box(0.4, 0.7, 0.4, gold, x, 9.2, 1.5));   // crown spikes
  box(1.6, 5.0, 1.6, fur, -3.0, 3.6, 0.8); box(1.6, 5.0, 1.6, fur, 3.0, 3.6, 0.8);   // giant arms
  box(1.8, 0.6, 1.8, gold, -3.0, 5.4, 0.8); box(1.8, 0.6, 1.8, gold, 3.0, 5.4, 0.8); // gold arm bands
  box(1.9, 1.2, 2.0, face, -3.0, 0.6, 1.2); box(1.9, 1.2, 2.0, face, 3.0, 0.6, 1.2); // fists
  box(1.6, 2.4, 1.6, fur, -1.2, 1.2, -0.4); box(1.6, 2.4, 1.6, fur, 1.2, 1.2, -0.4); // legs
}, [[-0.45, 7.75, 2.02, 0.4, 0.28, 0.06], [0.45, 7.75, 2.02, 0.4, 0.28, 0.06]], [0, 7.8, 2.6]);
const angelBoss = makeBoss(12, 'Angel', { x: -7, z: AZ - 3 }, bossSpeedFor(1500000), (box) => {
  const robe = mat(0xfffbf2), gold = new THREE.MeshPhongMaterial({ color: 0xf2d06a, shininess: 90, specular: 0xffffff }), skin = mat(0xf6dcc0), hair = mat(0xf2d06a), feather = mat(0xffffff);
  box(2.6, 4.6, 2.0, robe, 0, 2.3, 0);                // long robe
  box(2.8, 0.4, 2.2, gold, 0, 3.6, 0);                // gold sash
  box(2.2, 2.0, 1.6, robe, 0, 5.4, 0);                // chest
  box(0.7, 2.6, 0.7, robe, -1.5, 5.0, 0.2); box(0.7, 2.6, 0.7, robe, 1.5, 5.0, 0.2);   // arms
  box(1.6, 1.6, 1.5, skin, 0, 7.2, 0.05);             // head
  box(1.8, 0.6, 1.7, hair, 0, 8.1, -0.05); box(1.8, 1.4, 0.4, hair, 0, 7.3, -0.75);
  // big feathered wings
  [-1, 1].forEach((sd) => { box(0.3, 3.4, 1.4, feather, sd * 2.1, 6.0, -1.0); box(0.3, 2.6, 1.2, feather, sd * 3.0, 6.6, -1.3); box(0.3, 1.8, 1.0, feather, sd * 3.8, 7.2, -1.5); });
  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.12, 8, 28), new THREE.MeshBasicMaterial({ color: 0xffe68a }));
  halo.position.set(0, 8.9, 0); halo.rotation.x = Math.PI / 2; return halo;
}, [[-0.38, 7.3, 0.82, 0.3, 0.22, 0.06], [0.38, 7.3, 0.82, 0.3, 0.22, 0.06]], [0, 7.3, 1.4]);
angelBoss.side = 'angel';
const demonBoss = makeBoss(12, 'Demon', { x: 7, z: AZ - 3 }, bossSpeedFor(1500000), (box) => {
  const red = new THREE.MeshLambertMaterial({ color: 0xb01a1a, emissive: 0x2a0000 }), dark = mat(0x2a0a0a), horn = mat(0x1a1010), wing = mat(0x4a0a14), fire = new THREE.MeshBasicMaterial({ color: 0xff7a1a });
  box(2.8, 3.0, 2.0, red, 0, 4.4, 0);                 // muscly chest
  box(2.2, 1.4, 1.8, dark, 0, 2.5, 0);                // dark belt and hips
  box(1.0, 2.0, 1.0, red, -0.7, 1.0, 0); box(1.0, 2.0, 1.0, red, 0.7, 1.0, 0);       // legs
  box(1.2, 0.5, 1.4, dark, -0.7, 0.25, 0.2); box(1.2, 0.5, 1.4, dark, 0.7, 0.25, 0.2); // hooves
  box(0.8, 2.8, 0.8, red, -1.8, 4.2, 0.2); box(0.8, 2.8, 0.8, red, 1.8, 4.2, 0.2);   // arms
  box(1.8, 1.7, 1.6, red, 0, 6.8, 0.1);               // head
  box(0.3, 0.45, 0.3, mat(0xffffff), -0.4, 6.0, 0.95); box(0.3, 0.45, 0.3, mat(0xffffff), 0.4, 6.0, 0.95); // fangs
  const h1 = box(0.4, 1.6, 0.4, horn, -0.85, 8.2, 0); h1.rotation.z = 0.5;
  const h2 = box(0.4, 1.6, 0.4, horn, 0.85, 8.2, 0); h2.rotation.z = -0.5;
  // bat wings
  [-1, 1].forEach((sd) => { box(0.25, 3.2, 1.8, wing, sd * 2.2, 5.6, -1.1); box(0.25, 2.4, 1.6, wing, sd * 3.2, 6.2, -1.4); box(0.25, 1.4, 1.2, wing, sd * 4.0, 6.8, -1.6); });
  const tail = box(0.3, 0.3, 2.4, red, 0, 2.4, -1.8); tail.rotation.x = 0.4;
  box(0.6, 0.6, 0.3, dark, 0, 1.9, -3.0);             // arrow tip on the tail
  box(0.7, 1.0, 0.7, fire, 2.2, 6.2, 0.5);            // fireball in one hand
}, [[-0.42, 7.0, 0.92, 0.35, 0.22, 0.06], [0.42, 7.0, 0.92, 0.35, 0.22, 0.06]], [0, 7.0, 1.6]);
demonBoss.side = 'demon';
const lionBoss = makeBoss(13, 'Magic Lion', { x: 0, z: MZ - 3 }, bossSpeedFor(4000000), (box) => {
  const fur = new THREE.MeshLambertMaterial({ color: 0x8a5ad0, emissive: 0x1a0a3a }), mane = new THREE.MeshBasicMaterial({ color: 0x5af0ff }), mane2 = new THREE.MeshBasicMaterial({ color: 0xff7ae0 }), white = mat(0xf0e8ff), gold = new THREE.MeshBasicMaterial({ color: 0xffe68a });
  box(3.0, 2.6, 5.0, fur, 0, 2.6, 0);                 // body
  // glowing crystal mane, two colors
  for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; const m = box(0.9, 0.9, 1.0, k % 2 ? mane : mane2, Math.cos(a) * 1.9, 4.4 + Math.sin(a) * 1.9, 2.6); m.rotation.z = a; }
  box(2.4, 2.4, 2.0, fur, 0, 4.4, 3.2);               // head
  box(1.4, 0.9, 0.8, white, 0, 3.8, 4.3);             // muzzle
  box(0.5, 0.35, 0.3, mat(0x2a1a3a), 0, 4.2, 4.72);   // nose
  box(0.5, 0.5, 0.2, gold, 0, 5.3, 4.25);             // glowing star on the forehead
  [[-1, 1.6], [1, 1.6], [-1, -1.6], [1, -1.6]].forEach(([x, z]) => { box(0.85, 1.6, 0.85, fur, x, 0.8, z); box(0.95, 0.3, 1.0, white, x, 0.15, z + 0.1); });
  const tail = box(0.35, 0.35, 2.8, fur, 0, 3.2, -3.4); tail.rotation.x = -0.5;
  box(0.8, 0.8, 0.8, mane, 0, 4.0, -4.7);             // glowing tail tuft
  const aura = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.08, 6, 40), new THREE.MeshBasicMaterial({ color: 0xc0a0ff, transparent: true, opacity: 0.7 }));
  aura.rotation.x = Math.PI / 2; aura.position.y = 0.2; return aura;
}, [[-0.6, 4.75, 4.22, 0.4, 0.3, 0.06], [0.6, 4.75, 4.22, 0.4, 0.3, 0.06]], [0, 4.8, 4.8]);
const bosses = [chickenBoss, swanBoss, scorpionBoss, tigerBoss, cerberusBoss, yetiBoss, whaleBoss, trexBoss, cosmicBoss, oniBoss, titanBoss, angelBoss, demonBoss, lionBoss];
