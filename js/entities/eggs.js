// ---------- Nests and eggs ----------
const eggsOfZone = (zone, side) => EGG_TYPES.filter((t) => t.zone === zone && (!side || t.side === side));
function rollEgg(zone, side) {
  const list = eggsOfZone(zone, side), total = list.reduce((s, t) => s + t.weight, 0);
  let r = Math.random() * total, type = list[0];
  for (const t of list) { if (r < t.weight) { type = t; break; } r -= t.weight; }
  let m = Math.random(), mut = null;
  if (zone === 13 && Math.random() < 0.5) return { type: type.name, mut: 'Enchanted' };
  for (const mu of MUTATIONS) { if (m < mu.chance) { mut = mu.name; break; } m -= mu.chance; }
  return { type: type.name, mut };
}
const eggGeo = new THREE.SphereGeometry(0.38, 16, 12);
// Mutation look, shared by eggs and pets. `map` keeps spots visible on silver/gold.
function mutMat(mut, map) {
  if (mut === 'Silver') return new THREE.MeshPhongMaterial({ color: 0xc9ced8, shininess: 90, specular: 0xffffff, map: map || null });
  if (mut === 'Gold') return new THREE.MeshPhongMaterial({ color: 0xf2bd2c, shininess: 90, specular: 0xfff2b0, map: map || null });
  if (mut === 'Rainbow') return new THREE.MeshLambertMaterial({ map: rainbowTex });
  if (mut === 'Enchanted') return new THREE.MeshPhongMaterial({ color: 0xa54be0, emissive: 0x4a1278, shininess: 100, specular: 0xffd6ff });
  return null;
}
const typeOf = (egg) => EGG_TYPES.find((t) => t.name === egg.type) || EGG_TYPES.find((t) => t.zone === 1);
const EGG_MAPS = { 'Dog egg': spotTex, 'Owl egg': featherTex, 'Fish egg': scaleTex, 'Turtle egg': shellTex, 'Frog egg': frogSpotTex, 'Lizard egg': lizardTex, 'Armadillo egg': bandTex, 'Snake egg': snakeTex, 'Vulture egg': spotTex, 'Chameleon egg': chameleonTex, 'Tiger egg': tigerTex, 'Salamander egg': salamanderTex, 'Dragon egg': dragonTex, 'Penguin egg': penguinTex, 'Snow Golem egg': coalTex, 'Yeti egg': yetiEggTex, 'Shark egg': sharkTex, 'Whale Shark egg': whaleSharkTex, 'Mermaid egg': mermaidTex, 'Raptor egg': raptorTex, 'Ankylosaurus egg': ankyTex, 'Cosmic egg': cosmicTex, 'Koi egg': koiTex, 'Little Dragon egg': jadeTex, 'Oni Tiger egg': oniTex };
function makeEgg(egg) {
  const type = typeOf(egg);
  const spots = EGG_MAPS[type.name] || null;
  const m = mutMat(egg.mut, spots) || new THREE.MeshLambertMaterial({ color: type.color, map: spots });
  const g = new THREE.Group();
  const e = new THREE.Mesh(eggGeo, m); e.scale.set(1, 1.3, 1); e.castShadow = true; g.add(e);
  if (type.name === 'Bird egg') {
    // a little bird tail sticking out of the back
    const fm = mat(0x4a8fd8);
    [-0.35, 0, 0.35].forEach((r) => {
      const f = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.4), fm);
      f.position.set(Math.sin(r) * 0.12, 0.05, -0.5); f.rotation.y = r; f.rotation.x = -0.4; g.add(f);
    });
  }
  if (type.name === 'Tree egg') {
    // a little tree growing on top
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.3, 6), mat(0x6b4220));
    trunk.position.y = 0.6; g.add(trunk);
    const leaves = new THREE.Mesh(new THREE.IcosahedronGeometry(0.25, 0), mat(0x3d9a3a));
    leaves.position.y = 0.85; leaves.castShadow = true; g.add(leaves);
  }
  if (type.name === 'Duck egg') {
    // a tiny orange bill poking out the front
    const bill = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.16), mat(0xf39a1e)); bill.position.set(0, 0.05, 0.42); g.add(bill);
  }
  if (type.name === 'Fish egg') {
    // a little fin on top
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.22, 0.3), mat(0xff8a3a)); fin.position.set(0, 0.55, -0.05); fin.rotation.x = -0.3; g.add(fin);
  }
  if (type.name === 'Beaver egg') {
    // a flat beaver tail sticking out the back
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.45), mat(0x4a2c16)); tail.position.set(0, -0.3, -0.5); tail.rotation.x = 0.3; g.add(tail);
  }
  if (type.name === 'Flamingo egg') {
    // a pink feather on top
    const f = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.14), mat(0xff5fa2)); f.position.set(0, 0.62, 0); f.rotation.z = 0.3; g.add(f);
  }
  if (type.name === 'Fox egg') {
    // two pointy ears with white tips
    [-1, 1].forEach((sd) => {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.25, 4), mat(0xf08a3a)); ear.position.set(sd * 0.15, 0.55, 0); g.add(ear);
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.1, 4), mat(0xffffff)); tip.position.set(sd * 0.15, 0.7, 0); g.add(tip);
    });
  }
  if (type.name === 'Camel egg') {
    const hump = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), mat(0xc99a5a)); hump.scale.y = 0.6; hump.position.y = 0.46; g.add(hump);
  }
  if (type.name === 'Snake egg') {
    const tongue = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.2), mat(0xe8364f)); tongue.position.set(0, 0.1, 0.45); g.add(tongue);
  }
  if (type.name === 'Scorpion egg') {
    // a curly stinger tail on top
    const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.1), mat(0x9a2f1f)); t1.position.set(0, 0.55, -0.1); g.add(t1);
    const t2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.18), mat(0x9a2f1f)); t2.position.set(0, 0.68, 0); g.add(t2);
    const st = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 4), mat(0x2a0a05)); st.position.set(0, 0.62, 0.12); st.rotation.x = Math.PI * 0.6; g.add(st);
  }
  if (type.name === 'Monkey egg') {
    const tail = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 6, 12, Math.PI * 1.5), mat(0x6b4220)); tail.position.set(0, -0.2, -0.45); tail.rotation.y = Math.PI / 2; g.add(tail);
  }
  if (type.name === 'Parrot egg') {
    [0x2f6fe0, 0xffd23f, 0x3fbf4a].forEach((c, k) => {
      const f = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.35, 0.12), mat(c)); f.position.set((k - 1) * 0.1, 0.62, 0); f.rotation.z = (k - 1) * 0.35; g.add(f);
    });
  }
  if (type.name === 'Elephant egg') {
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.1), mat(0x8a9098)); trunk.position.set(0, -0.05, 0.43); trunk.rotation.x = 0.4; g.add(trunk);
    [-1, 1].forEach((sd) => { const ear = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.3, 0.25), mat(0x8a9098)); ear.position.set(sd * 0.4, 0.1, 0); g.add(ear); });
  }
  if (type.name === 'Panther egg') {
    [-1, 1].forEach((sd) => { const eye = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.04), new THREE.MeshBasicMaterial({ color: 0xffd23f })); eye.position.set(sd * 0.12, 0.12, 0.37); g.add(eye); });
  }
  if (type.name === 'Fire Bat egg') {
    [-1, 1].forEach((sd) => { const w = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.04), mat(0xff7a1a)); w.position.set(sd * 0.48, 0.15, 0); w.rotation.z = sd * 0.4; g.add(w); });
  }
  if (type.name === 'Imp egg') {
    [-1, 1].forEach((sd) => { const h = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 5), mat(0x2a0a0a)); h.position.set(sd * 0.13, 0.55, 0); h.rotation.z = -sd * 0.3; g.add(h); });
  }
  if (type.name === 'Hellhound egg' || type.name === 'Phoenix egg') {
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.35, 6), new THREE.MeshBasicMaterial({ color: type.name === 'Phoenix egg' ? 0xffe14a : 0xff7a1a }));
    flame.position.y = 0.62; g.add(flame);
  }
  if (type.name === 'Phoenix egg') e.material = mutMat(egg.mut) || new THREE.MeshLambertMaterial({ color: 0xffb030, emissive: 0x8a3a00 });
  if (type.name === 'Dragon egg') {
    [0.3, 0.05, -0.2].forEach((y) => { const sp = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 4), mat(0xffd23f)); sp.position.set(0, y + 0.1, -0.37); sp.rotation.x = -1.2; g.add(sp); });
  }
  if (type.name === 'Arctic Fox egg' || type.name === 'Polar Bear egg') {
    const fox = type.name === 'Arctic Fox egg';
    [-1, 1].forEach((sd) => {
      const ear = fox ? new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.22, 4), mat(0xffffff)) : new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), mat(0xe6e2d6));
      ear.position.set(sd * 0.16, 0.52, 0); g.add(ear);
    });
  }
  if (type.name === 'Reindeer egg') {
    [-1, 1].forEach((sd) => {
      const a1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.3, 0.04), mat(0x5a3a1a)); a1.position.set(sd * 0.14, 0.62, 0); a1.rotation.z = -sd * 0.3; g.add(a1);
      const a2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.04), mat(0x5a3a1a)); a2.position.set(sd * 0.22, 0.7, 0); g.add(a2);
    });
  }
  if (type.name === 'Whale egg') {
    const spout = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.3, 6), new THREE.MeshPhongMaterial({ color: 0xbfe8ff, transparent: true, opacity: 0.8 }));
    spout.position.y = 0.62; spout.rotation.x = Math.PI; g.add(spout);
  }
  if (type.name === 'Snow Golem egg') {
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.22, 6), mat(0xf39a1e)); nose.position.set(0, 0.0, 0.45); nose.rotation.x = Math.PI / 2; g.add(nose);
  }
  if (type.name === 'Mammoth egg') {
    [-1, 1].forEach((sd) => { const tusk = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.3, 6), mat(0xfff8e6)); tusk.position.set(sd * 0.12, -0.2, 0.42); tusk.rotation.x = 1.9; g.add(tusk); });
  }
  if (type.name === 'Crab egg') {
    [-1, 1].forEach((sd) => { const cl = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.16), mat(0xb0301a)); cl.position.set(sd * 0.42, 0, 0.15); g.add(cl); });
  }
  if (type.name === 'Pufferfish egg') {
    for (let k = 0; k < 10; k++) { const sp = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 4), mat(0xc09020)); const a = k * 0.63, h = (k % 3 - 1) * 0.25; sp.position.set(Math.cos(a) * 0.38, h, Math.sin(a) * 0.38); sp.lookAt(Math.cos(a) * 2, h, Math.sin(a) * 2); sp.rotateX(Math.PI / 2); g.add(sp); }
  }
  if (type.name === 'Dolphin egg' || type.name === 'Shark egg') {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.25, 0.25), mat(type.name === 'Shark egg' ? 0x5a6a7a : 0x4a6a88)); fin.position.set(0, 0.56, -0.05); fin.rotation.x = -0.4; g.add(fin);
  }
  if (type.name === 'Octopus egg' || type.name === 'Kraken egg') {
    const tm = mat(type.name === 'Kraken egg' ? 0x6a2a50 : 0x8a3ad0);
    for (let k = 0; k < 6; k++) { const tt = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.06), tm); const a = k * 1.05; tt.position.set(Math.cos(a) * 0.25, -0.5, Math.sin(a) * 0.25); tt.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5); g.add(tt); }
  }
  if (type.name === 'Kraken egg') {
    [-1, 1].forEach((sd) => { const eye = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.04), new THREE.MeshBasicMaterial({ color: 0x7fff8a })); eye.position.set(sd * 0.13, 0.1, 0.37); g.add(eye); });
  }
  if (type.name === 'Mermaid egg') {
    const shell = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 6, 0, Math.PI), mat(0xffb0c8)); shell.position.y = 0.55; shell.rotation.x = -0.4; g.add(shell);
  }
  if (type.name === 'Brontosaurus egg') {
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.08), mat(0x5a8a4a)); neck.position.set(0, 0.6, 0.12); neck.rotation.x = 0.4; g.add(neck);
    const hd = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.16), mat(0x5a8a4a)); hd.position.set(0, 0.76, 0.24); g.add(hd);
  }
  if (type.name === 'Triceratops egg') {
    [-0.12, 0, 0.12].forEach((x) => { const h = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.2, 5), mat(0xfff2d0)); h.position.set(x, 0.58, 0.1); h.rotation.x = 0.4; g.add(h); });
  }
  if (type.name === 'Stegosaurus egg') {
    [0.25, 0.05, -0.15, -0.35].forEach((z) => { const pl = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.15), mat(0xd06a3a)); pl.position.set(0, 0.45 - Math.abs(z) * 0.3, z); pl.rotation.z = Math.PI / 4; g.add(pl); });
  }
  if (type.name === 'Ankylosaurus egg') {
    const club = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.16), mat(0x5a4a3a)); club.position.set(0, -0.25, -0.5); g.add(club);
  }
  if (type.name === 'T-Rex egg') {
    [-1, 1].forEach((sd) => { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.12, 0.05), mat(0x3a7a2a)); arm.position.set(sd * 0.32, 0.05, 0.22); arm.rotation.x = -0.6; g.add(arm); });
  }
  if (type.name === 'Alien egg') {
    [-1, 1].forEach((sd) => { const st = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.03), mat(0x5aaf3a)); st.position.set(sd * 0.1, 0.58, 0); st.rotation.z = -sd * 0.3; g.add(st); const ball = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe14a })); ball.position.set(sd * 0.14, 0.7, 0); g.add(ball); });
  }
  if (type.name === 'Space Cat egg' || type.name === 'Moon Bunny egg') {
    const bunny = type.name === 'Moon Bunny egg';
    [-1, 1].forEach((sd) => { const ear = new THREE.Mesh(bunny ? new THREE.BoxGeometry(0.07, 0.3, 0.05) : new THREE.ConeGeometry(0.07, 0.16, 4), mat(bunny ? 0xf4f4ff : 0x9aa4b8)); ear.position.set(sd * 0.12, bunny ? 0.62 : 0.52, 0); g.add(ear); });
  }
  if (type.name === 'Star Baby egg') e.material = mutMat(egg.mut) || new THREE.MeshLambertMaterial({ color: 0xffe14a, emissive: 0x8a6a00 });
  if (type.name === 'Planet egg') {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.04, 6, 24), mat(0xfff2c0)); ring.rotation.x = Math.PI / 2.3; g.add(ring);
  }
  if (type.name === 'Comet egg') {
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.7, 8), new THREE.MeshBasicMaterial({ color: 0x7ae0ff, transparent: true, opacity: 0.6 })); tail.rotation.x = -Math.PI / 2; tail.position.set(0, 0.1, -0.6); g.add(tail);
  }
  if (type.name === 'UFO egg') {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.08, 20), mat(0x6a7a8a)); g.add(disc);
  }
  if (type.name === 'Space Jelly egg') { e.material = mutMat(egg.mut) || new THREE.MeshPhongMaterial({ color: 0xff8ae0, emissive: 0x5a1a5a, transparent: true, opacity: 0.8, shininess: 100 }); }
  if (type.name === 'Kitsune egg') {
    [-1, 1].forEach((sd) => { const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 4), mat(0xffffff)); ear.position.set(sd * 0.14, 0.55, 0); g.add(ear); });
    [-0.5, 0, 0.5].forEach((r) => { const tl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.35), mat(0xffb03a)); tl.position.set(Math.sin(r) * 0.15, -0.1, -0.5); tl.rotation.y = r; tl.rotation.x = -0.4; g.add(tl); });
  }
  if (type.name === 'Crane egg') {
    const crest = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.12), mat(0xe0302a)); crest.position.y = 0.5; g.add(crest);
  }
  if (type.name === 'Lucky Cat egg') {
    [-1, 1].forEach((sd) => { const ear = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.16, 4), mat(0xffffff)); ear.position.set(sd * 0.13, 0.53, 0); g.add(ear); });
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.03, 16), new THREE.MeshPhongMaterial({ color: 0xf2bd2c, shininess: 90, specular: 0xffffff })); coin.rotation.x = Math.PI / 2; coin.position.set(0, -0.05, 0.4); g.add(coin);
  }
  if (type.name === 'Oni Tiger egg') {
    [-1, 1].forEach((sd) => { const h = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.2, 5), mat(0xfff2c0)); h.position.set(sd * 0.12, 0.56, 0); h.rotation.z = -sd * 0.3; g.add(h); });
  }
  if (type.name === 'Little Dragon egg') {
    [-1, 1].forEach((sd) => { const wh = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.02, 0.02), mat(0xf2bd2c)); wh.position.set(sd * 0.45, 0.1, 0.1); wh.rotation.z = sd * 0.3; g.add(wh); });
  }
  if (type.name === 'Golem egg') {
    [-1, 1].forEach((sd) => { const ey = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.04), new THREE.MeshBasicMaterial({ color: 0x7fe0ff })); ey.position.set(sd * 0.12, 0.12, 0.37); g.add(ey); });
  }
  if (type.name === 'Scarab egg') e.material = mutMat(egg.mut) || new THREE.MeshPhongMaterial({ color: 0xf2bd2c, shininess: 100, specular: 0xffffff });
  if (type.name === 'Cobra egg') {
    const hood = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.06), mat(0xf2bd2c)); hood.position.set(0, 0.35, -0.3); g.add(hood);
  }
  if (type.name === 'Sphinx egg') {
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.36, 0.25, 16, 1, true), new THREE.MeshLambertMaterial({ map: headdressTex, side: THREE.DoubleSide })); band.position.y = 0.3; g.add(band);
  }
  if (type.name === 'War Elephant egg') {
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.1), mat(0x8a9098)); trunk.position.set(0, -0.05, 0.43); trunk.rotation.x = 0.4; g.add(trunk);
  }
  if (type.name === 'Stone Lion egg') {
    const mane = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.1, 6, 16), mat(0x8a8070)); mane.position.set(0, 0.15, 0.1); g.add(mane);
  }
  if (type.name === 'Thunder egg') {
    const bolt = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.06), new THREE.MeshBasicMaterial({ color: 0xffe14a })); bolt.position.y = 0.62; bolt.rotation.z = 0.4; g.add(bolt);
  }
  if (type.name === 'Tiny Titan egg') {
    const crest = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.4), mat(0xd0302a)); crest.position.y = 0.58; g.add(crest);
  }
  if (type.name === 'Spirit Deer egg') {
    [-1, 1].forEach((sd) => { const a = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.3, 0.04), new THREE.MeshBasicMaterial({ color: 0x5af0ff })); a.position.set(sd * 0.13, 0.6, 0); a.rotation.z = -sd * 0.4; g.add(a); });
  }
  if (type.name === 'Butterfly egg') {
    [-1, 1].forEach((sd) => { const w = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.35, 0.3), new THREE.MeshBasicMaterial({ color: sd < 0 ? 0xff7ae0 : 0x5af0ff })); w.position.set(sd * 0.42, 0.15, -0.05); w.rotation.z = sd * 0.5; g.add(w); });
  }
  if (type.name === 'Mushroom egg') {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xb07aff })); cap.position.y = 0.42; g.add(cap);
  }
  if (type.name === 'Wise Owl egg') {
    const hat = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.45, 8), mat(0x3a2a8a)); hat.position.y = 0.68; g.add(hat);
  }
  if (type.name === 'Moon Rabbit egg') {
    [-1, 1].forEach((sd) => { const ear = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.3, 0.05), new THREE.MeshBasicMaterial({ color: 0xa0d0ff })); ear.position.set(sd * 0.1, 0.62, 0); g.add(ear); });
  }
  if (type.name === 'Unicorn egg') {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.32, 8), mat(0xf2d06a)); horn.position.set(0, 0.6, 0.12); horn.rotation.x = 0.3; g.add(horn);
  }
  if (type.name === 'Crystal Wolf egg') e.material = mutMat(egg.mut) || new THREE.MeshPhongMaterial({ color: 0x8af0ff, transparent: true, opacity: 0.85, shininess: 120, specular: 0xffffff });
  if (type.name === 'Forest Dragon egg') {
    [-0.3, 0, 0.3].forEach((r) => { const lf = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.3), mat(0x7ad04a)); lf.position.set(Math.sin(r) * 0.15, 0.52, 0); lf.rotation.y = r * 3; lf.rotation.x = 0.4; g.add(lf); });
  }
  if (type.name === 'Magic Lion egg') {
    const mane = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.08, 6, 16), new THREE.MeshBasicMaterial({ color: 0x5af0ff })); mane.position.set(0, 0.15, 0.1); g.add(mane);
  }
  if (type.side === 'angel') {
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 6, 18), new THREE.MeshBasicMaterial({ color: 0xffe68a })); halo.rotation.x = Math.PI / 2; halo.position.y = 0.68; g.add(halo);
    [-1, 1].forEach((sd) => { const w = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.2), mat(0xffffff)); w.position.set(sd * 0.4, 0.1, -0.05); w.rotation.z = sd * 0.4; g.add(w); });
  }
  if (type.side === 'demon') {
    [-1, 1].forEach((sd) => { const h = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.22, 5), mat(0x1a0a0a)); h.position.set(sd * 0.14, 0.56, 0); h.rotation.z = -sd * 0.4; g.add(h); });
    const ey = new THREE.MeshBasicMaterial({ color: 0xff2a1a });
    [-1, 1].forEach((sd) => { const e2 = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.04, 0.03), ey); e2.position.set(sd * 0.1, 0.15, 0.37); g.add(e2); });
  }
  if (type.name === 'Turtle egg') {
    // little turtle feet poking out
    [[-0.3, 0.25], [0.3, 0.25], [-0.3, -0.25], [0.3, -0.25]].forEach(([fx, fz]) => {
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.12), mat(0xc9b37a)); foot.position.set(fx, -0.42, fz); g.add(foot);
    });
  }
  return g;
}
