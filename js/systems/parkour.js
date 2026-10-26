// ---------- Pixie's parkour course (far away, inside the magic log) ----------
const PK = { sub: 'walk', vy: 0, jump: false, onPlat: null, lane: 2, laneT: 0, fallen: [], p: 0, launchT: 0 };
const parkMeshes = { movers: [], poles: [] };
(function buildPark() {
  const wood = mat(0x5a3a2a), glowWood = new THREE.MeshLambertMaterial({ color: 0x5a3aa8, emissive: 0x1a0a40 }), moss = new THREE.MeshLambertMaterial({ color: 0x3aa86a, emissive: 0x0a2a14 });
  const plat = (x, z1, z2, w, m) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, 1, z1 - z2), m || glowWood); b.position.set(x, -0.5, (z1 + z2) / 2); b.receiveShadow = true; scene.add(b); const top = new THREE.Mesh(new THREE.BoxGeometry(w, 0.1, z1 - z2), moss); top.position.set(x, 0.02, (z1 + z2) / 2); scene.add(top); };
  plat(PKX, PKZ + 10, PKZ - 6, 20);
  // glowing path that shows the way onto the log
  const guide = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 15), new THREE.MeshBasicMaterial({ color: 0xffe14a, transparent: true, opacity: 0.55 }));
  guide.rotation.x = -Math.PI / 2; guide.position.set(PKX, 0.08, PKZ + 1.5); scene.add(guide);
  for (let k = 0; k < 4; k++) { const ar = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.2, 3), new THREE.MeshBasicMaterial({ color: 0xffe14a })); ar.rotation.x = -Math.PI / 2; ar.position.set(PKX, 0.15, PKZ + 7 - k * 3.6); scene.add(ar); }
  plat(PKX, MIDA.z1, MIDA.z2, 18);
  plat(PKX, MIDB.z1, MIDB.z2, 22);
  plat(PKX, ENDP.z1, ENDP.z2, 20);
  // giant spinning log
  const logTex = barkTex.clone(); logTex.needsUpdate = true; logTex.repeat.set(4, 6);
  const bigLog = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, LOG_Z1 - LOG_Z2, 18), [new THREE.MeshLambertMaterial({ map: logTex, color: 0x8a5a2b }), mat(0xe9c48a), mat(0xe9c48a)]);
  bigLog.rotation.x = Math.PI / 2; bigLog.position.set(PKX, -1.5, (LOG_Z1 + LOG_Z2) / 2); bigLog.castShadow = true; scene.add(bigLog);
  parkMeshes.log = bigLog;
  // moving platforms
  MOVERS.forEach(() => { const m = new THREE.Mesh(new THREE.BoxGeometry(5, 0.6, 5), new THREE.MeshLambertMaterial({ color: 0xb07aff, emissive: 0x2a0a5a })); m.castShadow = true; scene.add(m); parkMeshes.movers.push(m); });
  // pole field
  LANES.forEach((lx) => { const g = new THREE.Group(); const m = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, POLE_Z1 - POLE_Z2, 12), mat(0xa0703f)); m.rotation.x = Math.PI / 2; g.add(m); g.position.set(PKX + lx, 0.15, (POLE_Z1 + POLE_Z2) / 2); scene.add(g); parkMeshes.poles.push(g); });
  // the present
  const pres = new THREE.Group();
  const boxM = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2, 2.4), new THREE.MeshLambertMaterial({ color: 0xff7ae0, emissive: 0x3a0a2a })); boxM.position.y = 1; pres.add(boxM);
  const rib = new THREE.MeshBasicMaterial({ color: 0xffe68a });
  const r1 = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.05, 0.4), rib); r1.position.y = 1; pres.add(r1);
  const r2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.05, 2.5), rib); r2.position.y = 1; pres.add(r2);
  [-1, 1].forEach((sd) => { const bow = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.12, 6, 12), rib); bow.position.set(sd * 0.4, 2.3, 0); bow.rotation.y = Math.PI / 2; pres.add(bow); });
  pres.position.set(PRESENT.x, 0, PRESENT.z); scene.add(pres); parkMeshes.present = pres;
  // magic sparkles around the course
  const N = 200, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = PKX + (Math.random() - 0.5) * 40; pos[i * 3 + 1] = -6 + Math.random() * 20; pos[i * 3 + 2] = PKZ + 10 - Math.random() * (PKZ + 10 - ENDP.z2 + 10); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xc0a0ff, size: 0.4 })));
  // signs
  sign(PKX - 4, PKZ + 3, 0.3, ['Pixie Parkour', 'Space = jump']);
  sign(PKX + 4, LOG_Z1 + 2, -0.3, ['Spinning Log', 'Need speed 1B']);
  sign(PKX - 4, MIDA.z1 - 2, 0.3, ['Moving Platforms', 'Jump carefully!']);
  sign(PKX + 6, MIDB.z2 + 3, -0.3, ['Shaky Poles', 'Need length 5B']);
  sign(PKX - 6, MIDB.z2 + 3, 0.3, ['Shaky Poles', 'Use ◀ ▶ to switch']);
  worldTicks.push((dt, t) => {
    bigLog.rotation.y += dt * 2.5;
    MOVERS.forEach((mv, i) => { const nx = PKX + Math.sin(t * mv.speed + mv.phase) * 3; mv.dx = nx - mv.x; mv.x = nx; parkMeshes.movers[i].position.set(mv.x, -0.3, mv.z); });
    pres.rotation.y = t * 0.8; pres.position.y = Math.abs(Math.sin(t * 2)) * 0.3;
  });
})();
const parkUi = document.getElementById('parkUi'), leaveBtn = document.getElementById('leavePark');
function groundAt(x, z) {
  const inX = (cx, w) => Math.abs(x - cx) <= w / 2;
  if (z <= PKZ + 10 && z >= PKZ - 6 && inX(PKX, 20)) return { y: 0 };
  if (z <= MIDA.z1 && z >= MIDA.z2 && inX(PKX, 18)) return { y: 0 };
  if (z <= MIDB.z1 && z >= MIDB.z2 && inX(PKX, 22)) return { y: 0 };
  if (z <= ENDP.z1 && z >= ENDP.z2 && inX(PKX, 20)) return { y: 0 };
  for (const mv of MOVERS) if (Math.abs(z - mv.z) <= 2.6 && Math.abs(x - mv.x) <= 2.6) return { y: 0, mover: mv };
  return null;
}
function parkTrailReset() {
  trail = [];
  const n = Math.ceil((shownSegs() + 4) * snake.spacing / 0.08);
  for (let i = 0; i < n; i++) trail.push({ x: snake.x, z: snake.z + i * 0.08, y: snake.y });
}
function parkRestart(msg) {
  snake.x = PKX; snake.z = PKZ + 3; snake.y = 0; snake.heading = Math.PI; PK.vy = 0; PK.sub = 'walk'; PK.fallen = []; PK.lane = 2;
  parkMeshes.poles.forEach((g, i) => { g.position.set(PKX + LANES[i], 0.15, (POLE_Z1 + POLE_Z2) / 2); g.rotation.set(0, 0, 0); });
  head.rotation.set(0, Math.PI, 0); parkTrailReset();
  if (msg) hintEl.textContent = msg;
}
function startParkour() {
  if (snake.carry) { hintEl.textContent = 'Put your egg in the pen first!'; return; }
  pixieBox.hidden = true;
  snake.state = 'park'; parkUi.hidden = false; leaveBtn.hidden = false; hopBtn.hidden = true; upBtn.hidden = true;
  parkRestart('🧚 Welcome to my parkour! Arrow keys or mouse to move, SPACE to jump.');
  camPos.set(snake.x, 14, snake.z + 16);
}
function leaveParkour(msg) {
  snake.state = 'free'; snake.y = 0; parkUi.hidden = true; leaveBtn.hidden = true;
  const isl = ISLANDS[13];
  snake.x = PIXIE_SPOT.x + 5; snake.z = PIXIE_SPOT.z + 4; snake.heading = Math.PI; head.rotation.set(0, Math.PI, 0);
  resetTrail(snake.x, snake.z, Math.PI); nearPixie = true;
  camPos.set(snake.x, 14, snake.z + 16);
  hintEl.textContent = msg || 'Back in the Mystical Forest!';
}
document.getElementById('enterLog').addEventListener('click', startParkour);
leaveBtn.addEventListener('click', () => { leaveParkour(); leaveBtn.blur(); });
document.getElementById('pkJump').addEventListener('pointerdown', (e) => { e.preventDefault(); PK.jump = true; });
document.getElementById('pkLeft').addEventListener('pointerdown', (e) => { e.preventDefault(); if (PK.sub === 'poles') switchLane(-1); else { mode = 'keys'; keys.ArrowLeft = true; } });
document.getElementById('pkRight').addEventListener('pointerdown', (e) => { e.preventDefault(); if (PK.sub === 'poles') switchLane(1); else { mode = 'keys'; keys.ArrowRight = true; } });
['pkLeft', 'pkRight'].forEach((id) => document.getElementById(id).addEventListener('pointerup', () => { keys.ArrowLeft = false; keys.ArrowRight = false; }));
function switchLane(d) {
  const nl = PK.lane + d;
  if (nl < 0 || nl >= LANES.length || PK.fallen[nl]) return;
  PK.lane = nl; PK.laneT = 0;
  pop('Hop!', 'length', PKX + LANES[nl], 2, snake.z);
}
function updatePark(dt) {
  wiggle += dt * PARK_SPEED * 1.6;
  if (PK.sub === 'walk') {
    let want = null;
    if (mode === 'keys') {
      const dx = (keys.ArrowRight ? 1 : 0) - (keys.ArrowLeft ? 1 : 0), dz = (keys.ArrowDown ? 1 : 0) - (keys.ArrowUp ? 1 : 0);
      if (dx || dz) want = Math.atan2(dx, dz);
    } else if (pointerTarget) {
      const dx = pointerTarget.x - snake.x, dz = pointerTarget.z - snake.z;
      if (Math.hypot(dx, dz) > 1.2) want = Math.atan2(dx, dz);
    }
    if (want !== null) {
      snake.heading += Math.max(-7 * dt, Math.min(7 * dt, wrap(want - snake.heading)));
      snake.x += Math.sin(snake.heading) * PARK_SPEED * dt; snake.z += Math.cos(snake.heading) * PARK_SPEED * dt;
    }
    // ride along on a moving platform
    if (PK.onPlat && PK.onPlat.dx) snake.x += PK.onPlat.dx;
    // jumping and falling
    const gr = groundAt(snake.x, snake.z);
    const onGround = gr && snake.y <= gr.y + 0.01 && PK.vy <= 0;
    if (PK.jump && onGround) { PK.vy = 9.5; }
    PK.jump = false;
    PK.vy -= 25 * dt; snake.y += PK.vy * dt;
    const gr2 = groundAt(snake.x, snake.z);
    if (gr2 && snake.y <= gr2.y && snake.y > gr2.y - Math.max(0.35, -PK.vy * dt + 0.1) && PK.vy <= 0) { snake.y = gr2.y; PK.vy = 0; PK.onPlat = gr2.mover || null; } else PK.onPlat = null;
    if (snake.y < -14) { parkRestart('Whoops! You fell into the void. Back to the start!'); return; }
    // stepping onto the spinning log
    if (snake.y > -0.8 && snake.z < LOG_Z1 + 0.5 && snake.z > LOG_Z1 - 2 && Math.abs(snake.x - PKX) < 4) {
      PK.sub = 'log'; PK.p = 0; snake.x = PKX; snake.y = 0;
      hintEl.textContent = snake.speedStat >= 1e9 ? 'Super fast! Running across the spinning log!' : 'Too slow! The log is spinning you off...';
    }
    // stepping onto the shaky poles
    if (snake.y > -0.5 && snake.z < POLE_Z1 && snake.z > POLE_Z1 - 1.5 && Math.abs(snake.x - PKX) < 11) {
      PK.sub = 'poles'; PK.p = 0; PK.lane = Math.max(0, Math.min(4, Math.round((snake.x - PKX) / 3) + 2)); PK.laneT = 0; snake.y = 0;
      hintEl.textContent = snake.segments >= 5e9 ? 'The pole is shaking! Press ◀ ▶ to switch poles!' : 'Too short! You need 5 billion length...';
    }
    // the present!
    if (Math.hypot(snake.x - PRESENT.x, snake.z - PRESENT.z) < 2) { openPresent(); return; }
  } else if (PK.sub === 'log') {
    if (snake.speedStat >= 1e9) {
      PK.p += 14 * dt; snake.z = LOG_Z1 - PK.p; snake.x = PKX + Math.sin(wiggle) * 0.2; snake.y = 0.1;
      if (snake.z <= LOG_Z2 - 2) { PK.sub = 'walk'; snake.y = 0; hintEl.textContent = 'You made it across! Now jump across the moving platforms!'; }
    } else {
      PK.p += 4 * dt; snake.z = LOG_Z1 - PK.p; snake.x = PKX + Math.sin(PK.p * 3) * PK.p * 0.4;
      if (PK.p > 2.5) { PK.sub = 'launch'; PK.launchT = 0; PK.from = { x: snake.x, z: snake.z }; pop('WHOOSH!', 'speed', snake.x, 3, snake.z); }
    }
  } else if (PK.sub === 'launch') {
    PK.launchT += dt; const k = Math.min(1, PK.launchT / 1.3);
    snake.x = PK.from.x + (PKX - PK.from.x) * k; snake.z = PK.from.z + (PKZ + 3 - PK.from.z) * k; snake.y = Math.sin(k * Math.PI) * 10;
    head.rotation.x += dt * 8;
    if (k >= 1) { head.rotation.x = 0; parkRestart('The log launched you back to the start! You need 1 billion speed.'); return; }
  } else if (PK.sub === 'poles') {
    const lanePole = parkMeshes.poles[PK.lane];
    if (snake.segments < 5e9) {
      PK.laneT += dt; lanePole.rotation.z = Math.sin(PK.laneT * 30) * 0.08;
      if (PK.laneT > 0.8) { PK.fallen[PK.lane] = true; PK.sub = 'fall'; PK.vy = 0; }
    } else {
      PK.p += 6 * dt; PK.laneT += dt;
      snake.z = POLE_Z1 - PK.p; snake.x += (PKX + LANES[PK.lane] - snake.x) * Math.min(1, dt * 12); snake.y = 0.5;
      lanePole.rotation.z = Math.sin(PK.laneT * 30) * 0.08 * Math.min(1, PK.laneT);
      if (PK.laneT > 1.6) { PK.fallen[PK.lane] = true; PK.sub = 'fall'; PK.vy = 0; hintEl.textContent = 'The pole fell! Switch faster next time!'; }
      if (snake.z <= POLE_Z2 - 2) { PK.sub = 'walk'; snake.y = 0; hintEl.textContent = 'You crossed the poles! Grab the present!'; }
    }
  } else if (PK.sub === 'fall') {
    PK.vy -= 25 * dt; snake.y += PK.vy * dt;
    PK.fallen.forEach((f, i) => { if (f) { const g = parkMeshes.poles[i]; g.position.y += PK.vy * dt; g.rotation.z += dt; } });
    if (snake.y < -14) { parkRestart('You fell into the void. Back to the start!'); return; }
  }
  if (Math.hypot(snake.x - trail[0].x, snake.z - trail[0].z) > 0.08 || Math.abs(snake.y - (trail[0].y || 0)) > 0.08) {
    trail.unshift({ x: snake.x, z: snake.z, y: snake.y });
    const maxTrail = Math.ceil((shownSegs() + 6) * snake.spacing / 0.08) + 50;
    while (trail.length > maxTrail) trail.pop();
  }
  head.position.set(snake.x, 0.5 + snake.y, snake.z);
  head.rotation.y = snake.heading;
  placeBodyOnTrail(true);
}
function openPresent() {
  const first = !QUEST.claimed;
  if (first) {
    QUEST.claimed = true; saveQuest();
    pixieBoost = true; skinOwned = true; skinOn = true; applySkin(); repaintMachines(); save();
    const tigerEgg = { type: 'Giant Tiger egg', mut: null }; penEggs.push(tigerEgg); savePen(); addPet(tigerEgg, 0); markFound('Giant Tiger egg');
  }
  leaveParkour(first ? '🎁 You opened Pixie\'s present!' : 'You beat the parkour again!');
  const ql = document.getElementById('questList'); ql.innerHTML = '';
  [['🪵🏃 Super overpowered log and treadmill', 'They give you 1 BILLION speed and length every second!'], ['🐍 Mystic snake skin', 'A shiny purple snake with a glowing yellow aura. While you wear it, every egg you steal turns Enchanted! (Tap the Skin button to switch it.)'], ['🐯 The Giant Tiger', 'A big, friendly version of the Tiger boss is now in your pen!']].forEach(([a, b]) => {
    const d = document.createElement('div'); d.className = 'quest done';
    const n = document.createElement('b'); n.textContent = a; const t = document.createElement('small'); t.textContent = b; d.append(n, t); ql.appendChild(d);
  });
  document.getElementById('pixieTitle').textContent = 'Pixie\'s Present';
  document.getElementById('pixieSays').textContent = first ? '🎉 YOU BEAT MY PARKOUR! Here are your rewards!' : 'You already got these rewards, but great job!';
  document.getElementById('enterLog').hidden = true;
  pixieBox.hidden = false; document.getElementById('pixieClose').focus();
  setTimeout(() => { document.getElementById('pixieTitle').textContent = 'Pixie\'s Quests'; }, 100000);
}
