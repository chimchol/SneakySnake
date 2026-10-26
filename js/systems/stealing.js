// ---------- Stealing eggs, the boss chase, and the pen ----------
let carryMesh = null;
let penEggs = [];
try { penEggs = JSON.parse(localStorage.getItem('sneaky-snake-pen') || '[]') || []; } catch (e) { penEggs = []; }
// penEggs = everything you've saved; each one hatches into a pet that wanders the pen
const pets = [];
const randIn = (a, b) => a + Math.random() * (b - a);
function savePen() { try { localStorage.setItem('sneaky-snake-pen', JSON.stringify(penEggs.map((e) => ({ type: e.type, mut: e.mut })))); } catch (e) {} }
function addPet(egg, hatchIn) {
  const p = {
    egg, x: randIn(PEN.x1, PEN.x2), z: randIn(PEN.z1 + 1, PEN.z2), heading: Math.random() * 6,
    target: null, wait: randIn(0.5, 2), talkIn: randIn(3, 10), hatchIn, t: Math.random() * 10
  };
  p.eggMesh = hatchIn > 0 ? makeEgg(egg) : null;
  if (p.eggMesh) { p.eggMesh.position.set(p.x, 0.5, p.z); scene.add(p.eggMesh); }
  p.group = buildPet(egg); p.group.visible = hatchIn <= 0; p.group.position.set(p.x, 0, p.z); scene.add(p.group);
  p.bubble = document.createElement('div'); p.bubble.className = 'bubble'; p.bubble.hidden = true; document.body.appendChild(p.bubble);
  pets.push(p);
}
function clearPets() {
  pets.forEach((p) => { scene.remove(p.group); if (p.eggMesh) scene.remove(p.eggMesh); p.bubble.remove(); });
  pets.length = 0;
}
function drawPen() { clearPets(); penEggs.slice(-24).forEach((egg) => addPet(egg, 0)); }
drawPen();

const bubbleV = new THREE.Vector3();
function say(p, text) {
  p.bubble.textContent = text; p.bubble.hidden = false; p.bubbleT = 2.4;
}
function updatePets(dt) {
  pets.forEach((p) => {
    p.t += dt;
    if (p.hatchIn > 0) {
      // Egg wobbles, then hatches
      p.hatchIn -= dt;
      p.eggMesh.rotation.z = Math.sin(p.t * 18) * 0.25 * (1 - Math.max(0, p.hatchIn) / 5);
      if (p.hatchIn <= 0) {
        scene.remove(p.eggMesh); p.eggMesh = null; p.group.visible = true;
        markFound(p.egg.type);
        if (p.egg.mut === 'Enchanted') questBump('enchanted');
        const pet = typeOf(p.egg).pet;
        pop('A baby ' + (p.egg.mut ? p.egg.mut.toLowerCase() + ' ' : '') + pet.toLowerCase() + '!', 'length', p.x, 2, p.z);
        speakOut('Yay! A baby ' + (p.egg.mut ? p.egg.mut.toLowerCase() + ' ' : '') + pet.toLowerCase() + ' hatched!');
        setTimeout(() => say(p, PET_LINES[pet][0]), 600);
      }
      return;
    }
    // Wander around the pen
    if (!p.target) {
      p.wait -= dt;
      if (p.wait <= 0) p.target = { x: randIn(PEN.x1, PEN.x2), z: randIn(PEN.z1, PEN.z2) };
    } else {
      const dx = p.target.x - p.x, dz = p.target.z - p.z, d = Math.hypot(dx, dz);
      if (d < 0.2) { p.target = null; p.wait = randIn(1, 4); }
      else {
        p.heading = Math.atan2(dx, dz);
        const sp = p.group.userData.slow ? 0.45 : p.group.userData.fast ? 2.4 : 1.3;
        p.x += dx / d * sp * dt; p.z += dz / d * sp * dt;
      }
    }
    const ud = p.group.userData;
    const bounce = ud.hop ? Math.abs(Math.sin(p.t * 6)) * 0.45 : ud.slow ? 0.02 : 0.12;
    p.group.position.set(p.x, p.target ? Math.abs(Math.sin(p.t * 10)) * bounce * (ud.hop ? 0 : 1) + (ud.hop ? Math.abs(Math.sin(p.t * 6)) * 0.45 : 0) : 0, p.z);
    if (ud.fish) { ud.fish.rotation.y = p.t * 1.5; ud.fish.position.set(Math.sin(p.t * 1.5) * 0.2, 0.5 + Math.sin(p.t * 3) * 0.05, Math.cos(p.t * 1.5) * 0.2); }
    if (ud.fly) p.group.position.y = (ud.puff ? 0.9 : 1.4) + Math.sin(p.t * 2) * 0.25;
    if (ud.segs) ud.segs.forEach((sg, i) => { sg.position.x = Math.sin(p.t * 8 - i * 0.9) * 0.12 * (p.target ? 1 : 0.3); });
    if (ud.roll) { const balled = !p.target && Math.sin(p.t * 0.7) > 0.6; p.group.scale.set(1, balled ? 0.8 : 1, balled ? 0.7 : 1); }
    if (ud.swing) { const w = Math.sin(p.t * 6) * 0.7; ud.swing[0].rotation.x = w; ud.swing[1].rotation.x = -w; }
    if (ud.ears) { const f = Math.sin(p.t * 4) * 0.4; ud.ears[0].rotation.y = f; ud.ears[1].rotation.y = -f; }
    if (ud.thump) { const on = Math.sin(p.t * 0.8) > 0.8; const k = on ? Math.abs(Math.sin(p.t * 14)) : 0; ud.thump[0].rotation.z = -k * 1.2; ud.thump[1].rotation.z = k * 1.2; }
    if (ud.colorMat) ud.colorMat.color.setHSL((p.t * 0.05) % 1, 0.65, 0.5);
    if (ud.batWings) { const f = Math.sin(p.t * 18) * 0.6; ud.batWings[0].rotation.z = f; ud.batWings[1].rotation.z = -f; }
    if (ud.dragonWings) { const f = Math.sin(p.t * 9) * 0.5; ud.dragonWings[0].rotation.z = 0.3 + f; ud.dragonWings[1].rotation.z = -0.3 - f; }
    if (ud.flames) ud.flames.forEach((fl, i) => { fl.scale.y = 0.8 + Math.abs(Math.sin(p.t * 10 + i * 2)) * 0.6; });
    if (ud.waddle) p.group.rotation.z = p.target ? Math.sin(p.t * 10) * 0.15 : 0;
    if (ud.whale) { ud.whale.rotation.y = p.t * 1.2; ud.whale.position.y = 0.45 + Math.sin(p.t * 3) * 0.04; }
    if (ud.spout) { const k = (p.t * 0.6) % 1; ud.spout.scale.setScalar(k < 0.3 ? k / 0.3 : 0.001); }
    if (ud.sideways) p.group.rotation.y = p.heading + Math.PI / 2;
    if (ud.puff) { const k = Math.max(0, Math.sin(p.t * 0.9)); ud.puff.scale.setScalar(1 + k * k * 0.6); }
    if (ud.jump && p.target) { const ph = (p.t * 1.4) % 1; p.group.position.y = Math.sin(ph * Math.PI) * 0.9; p.group.rotation.x = -Math.cos(ph * Math.PI) * 0.6; } else if (ud.jump) p.group.rotation.x = 0;
    if (ud.tents) ud.tents.forEach((tn, i) => { tn.m.rotation.set(Math.sin(tn.a) * 0.4 + Math.sin(p.t * 4 + i) * 0.3, 0, -Math.cos(tn.a) * 0.4 + Math.cos(p.t * 4 + i) * 0.3); });
    if (ud.float) p.group.position.y = 0.5 + Math.sin(p.t * 2) * 0.12;
    if (ud.hopSoft) p.group.position.y = Math.abs(Math.sin(p.t * 3)) * 0.15;
    if (ud.neck) ud.neck.rotation.x = 0.3 + Math.sin(p.t * 1.2) * 0.2;
    if (ud.tinyArms) { const f = Math.sin(p.t * 12) * 0.4; ud.tinyArms[0].rotation.x = -0.8 + f; ud.tinyArms[1].rotation.x = -0.8 - f; }
    if (ud.spinZ) ud.spinZ.rotation.z = p.t * 1.5;
    if (ud.spinY) ud.spinY.rotation.y = p.t * 2;
    if (ud.ufoLights) ud.ufoLights.forEach((lt, i) => { lt.material.color.setHSL(((p.t * 0.5) + i / 6) % 1, 1, 0.6); });
    if (ud.jellyTents) ud.jellyTents.forEach((tn, i) => { tn.m.rotation.set(Math.sin(p.t * 3 + i) * 0.3, 0, Math.cos(p.t * 3 + i) * 0.3); });
    if (ud.kitsuneTails) ud.kitsuneTails.forEach((tl, i) => { tl.rotation.y = (i - 1) * 0.5 + Math.sin(p.t * 4 + i) * 0.2; });
    if (ud.foxfire) { ud.foxfire.position.y = 1.4 + Math.sin(p.t * 3) * 0.08; ud.foxfire.scale.y = 0.8 + Math.abs(Math.sin(p.t * 8)) * 0.5; }
    if (ud.koi) { ud.koi.position.set(Math.sin(p.t * 1.2) * 0.35, 0.1, Math.cos(p.t * 1.2) * 0.35); ud.koi.rotation.y = p.t * 1.2 + Math.PI / 2; }
    if (ud.noodle) ud.noodle.forEach((sg2, i) => { sg2.position.x = Math.sin(p.t * 5 - i * 0.7) * 0.12; sg2.position.y = Math.cos(p.t * 5 - i * 0.7) * 0.06; });
    if (ud.wave) ud.wave.rotation.x = -0.4 + Math.sin(p.t * 6) * 0.5;
    if (ud.flash) ud.flash.color.setHSL(0.15, 1, 0.5 + Math.max(0, Math.sin(p.t * 9)) * 0.4);
    if (ud.spear) ud.spear.rotation.z = Math.sin(p.t * 2) * 0.15;
    if (ud.butterfly) { const f = Math.sin(p.t * 14) * 0.8; ud.butterfly[0].rotation.z = f; ud.butterfly[1].rotation.z = -f; }
    if (ud.legs) { ud.legs[1].position.y = p.target ? 0.48 : 0.75; ud.legs[1].scale.y = p.target ? 1 : 0.45; }
    p.group.rotation.y += wrap(p.heading - p.group.rotation.y) * Math.min(1, dt * 6);
    if (p.group.userData.tail) p.group.userData.tail.rotation.y = Math.sin(p.t * 12) * 0.5;
    if (p.group.userData.arms) { const w = Math.sin(p.t * 5) * 0.25; p.group.userData.arms[0].rotation.z = 0.5 + w; p.group.userData.arms[1].rotation.z = -0.5 - w; }
    if (p.group.userData.wings) { const f = Math.sin(p.t * 16) * 0.3; p.group.userData.wings[0].rotation.z = f; p.group.userData.wings[1].rotation.z = -f; }
    // Talk sometimes
    p.talkIn -= dt;
    if (p.talkIn <= 0) { p.talkIn = randIn(7, 16); const lines = PET_LINES[typeOf(p.egg).pet]; say(p, lines[Math.floor(Math.random() * lines.length)]); }
    if (p.bubbleT > 0) {
      p.bubbleT -= dt;
      bubbleV.set(p.x, 1.9, p.z).project(camera);
      const onScreen = bubbleV.z < 1 && Math.abs(bubbleV.x) < 1.1 && Math.abs(bubbleV.y) < 1.1;
      p.bubble.hidden = p.bubbleT <= 0 || !onScreen;
      p.bubble.style.left = ((bubbleV.x + 1) / 2 * innerWidth) + 'px';
      p.bubble.style.top = ((1 - bubbleV.y) / 2 * innerHeight) + 'px';
    }
  });
}
function eggLabel(egg) { return (egg.mut ? egg.mut + ' ' : '') + egg.type; }

function grabEgg(nest) {
  snake.carry = nest.egg; snake.carryNest = nest;
  if (skinOwned && skinOn && snake.carry.mut !== 'Enchanted') { snake.carry = { type: snake.carry.type, mut: 'Enchanted' }; nest.egg = snake.carry; }
  scene.remove(nest.mesh); nest.mesh = null; nest.egg = null;
  carryMesh = makeEgg(snake.carry); carryMesh.position.set(0, 0.1, 1.05); head.add(carryMesh);
  pop('Got a ' + eggLabel(snake.carry) + '!', 'length', snake.x, 2.5, snake.z);
  const b = nest.boss;
  hintEl.textContent = 'The ' + b.name.toLowerCase() + ' is waking up... RUN back to the pen!';
  if (slowMode) { toggleSlow(); hintEl.textContent = 'Slow mode OFF! The ' + b.name.toLowerCase() + ' is waking up... RUN!'; }
  if (b.state === 'sleep' || b.state === 'home') { b.state = 'waking'; b.t = 0; }
}
function loseEgg() {
  homeArrow.visible = false;
  if (carryMesh) { head.remove(carryMesh); carryMesh = null; }
  snake.carry = null;
}
function deliverEgg() {
  penEggs.push(snake.carry); savePen(); addPet(snake.carry, 5);
  if (typeOf(snake.carry).zone === 13) questBump('mystic');
  pop('Safe! Egg sent to your pen!', 'speed', snake.x, 2.5, snake.z);
  hintEl.textContent = 'Egg saved! It will hatch in a few seconds...';
  setTimeout(() => { if (snake.state === 'free' && !snake.carry) hintEl.textContent = FREE_HINT; }, 3500);
  loseEgg();
}

function setEyes(b, awake) {
  b.eyeMat.color.set(awake ? 0xff2a1a : 0x111111);
  b.eyeMat.emissive.set(awake ? 0xff1a0a : 0x000000);
  b.glow.intensity = awake ? 2 : 0;
  b.eyes.forEach((e) => { e.scale.y = awake ? 1 : 0.25; });
}
bosses.forEach((b) => setEyes(b, false));

function updateBoss(dt) { bosses.forEach((b) => updateOneBoss(b, dt)); }
// Move a boss toward a point. Between islands it lines up with the poles (x = 0) and walks along them.
function bossStep(boss, tx, tz, speed, dt, direct) {
  let gx = tx, gz = tz;
  if (!direct) {
    if (Math.abs(boss.x) > 0.3) { gx = 0; gz = boss.z + Math.sign(tz - boss.z) * Math.abs(boss.x); }
    else { gx = 0; gz = tz; }
  }
  const dx = gx - boss.x, dz = gz - boss.z, d = Math.hypot(dx, dz);
  if (d < 0.001) return;
  boss.heading = Math.atan2(dx, dz);
  const step = Math.min(d, speed * dt);
  boss.x += dx / d * step; boss.z += dz / d * step;
}
function updateOneBoss(boss, dt) {
  boss.group.visible = !boss.off;
  if (boss.off) return;
  // Empty nests stay empty until night (new eggs grow in nightFalls)
  const isl = ISLANDS[boss.zone];
  const ct = snake.carry && typeOf(snake.carry);
  const carryingMine = !!ct && ct.zone === boss.zone && (!boss.side || ct.side === boss.side);
  // The boss chases you anywhere: across poles, all the way to spawn
  const snakeCatchable = snake.state === 'free' || snake.state === 'pole';
  const g = boss.group;
  boss.t += dt;
  if (boss.state === 'sleep') {
    g.position.y = Math.sin(boss.t * 1.5) * 0.05;
    boss.zzz += dt;
    if (boss.zzz > 2.2) { boss.zzz = 0; if (Math.hypot(snake.x - boss.x, snake.z - boss.z) < 40) pop('Zzz', 'length', boss.x + 1, [0, 6.2, 7.4, 5.2, 5.6, 6.8, 9.2, 5.2, 9.6, 11, 6.8, 10.2, 9.6, 7][boss.zone], boss.z); }
  } else if (boss.state === 'waking') {
    // 1 second to wake up: eyes open and glow, the boss shakes
    setEyes(boss, boss.t > 0.3);
    g.position.y = Math.abs(Math.sin(boss.t * 14)) * 0.15 * Math.min(1, boss.t);
    if (boss.t >= 1) { boss.state = 'chase'; boss.t = 0; }
  } else if (boss.state === 'chase') {
    if (!carryingMine || !snakeCatchable) { boss.state = 'home'; boss.t = 0; }
    else {
      const d = Math.hypot(snake.x - boss.x, snake.z - boss.z);
      // Same island: run straight at you. Different island: head for the pole and follow you across.
      const sameIsland = snake.state === 'free' && islandAt(snake.z) === islandAt(boss.z);
      bossStep(boss, snake.x, snake.z, boss.speed, dt, sameIsland);
      g.position.y = Math.abs(Math.sin(boss.t * 10)) * 0.4;
      if (d < [0, 2.6, 3.2, 3.6, 3.8, 4.4, 4.6, 5.4, 5.6, 4.0, 3.9, 4.6, 4.2, 4.0][boss.zone]) throwSnake(boss);
    }
  } else if (boss.state === 'home') {
    // Poof! The boss teleports straight back to its nest
    if (Math.hypot(boss.home.x - boss.x, boss.home.z - boss.z) > 3) pop('Poof!', 'length', boss.x, 3, boss.z);
    boss.x = boss.home.x; boss.z = boss.home.z;
    boss.state = 'sleep'; boss.heading = 0; setEyes(boss, false); boss.t = 0; g.rotation.y = 0;
  }
  // Keep the boss on an island, or on the pole between islands
  const here = ISLANDS[islandAt(boss.z)];
  const bd = Math.hypot(boss.x, boss.z - here.cz), bmax = here.r - 2;
  if (bd > bmax && Math.abs(boss.x) > 0.8) { boss.x *= bmax / bd; boss.z = here.cz + (boss.z - here.cz) * bmax / bd; }
  if (bd > bmax && Math.abs(boss.x) <= 0.8) boss.x *= 0.9; // walking the pole: stay in the middle
  if (boss.extra && boss.name === 'Magic Lion') { boss.extra.scale.setScalar(1 + Math.sin(boss.t * 3) * 0.1); boss.extra.rotation.z = boss.t; }
  else if (boss.extra && boss.name === 'Angel') { boss.extra.position.y = 8.9 + Math.sin(boss.t * 2) * 0.15; }
  else if (boss.extra && boss.name === 'Cosmic Man') { boss.extra.rotation.z = boss.t * 2; boss.extra.position.y = 10 + Math.sin(boss.t * 2) * 0.2; }
  else if (boss.extra) { const awake = boss.state === 'chase' || boss.state === 'waking'; const k = (boss.t * 0.8) % 1; boss.extra.scale.setScalar(awake ? 0.6 + Math.sin(k * Math.PI) * 0.6 : (k < 0.15 ? k / 0.15 * 0.5 : 0.001)); }
  g.position.x = boss.x; g.position.z = boss.z;
  g.rotation.y += wrap(boss.heading - g.rotation.y) * Math.min(1, dt * 8);
}

// Caught! The chicken throws you all the way back to spawn
let throwT = 0, throwFrom = null;
function throwSnake(boss) {
  if (snake.state === 'pole') resetPole();
  snake.state = 'thrown'; throwT = 0; throwFrom = { x: snake.x, z: snake.z };
  // The boss takes its egg back: it goes home to the same nest
  const nest = snake.carryNest;
  if (snake.carry && nest && !nest.egg) {
    nest.egg = snake.carry;
    nest.mesh = makeEgg(nest.egg); nest.mesh.position.set(nest.x, 0.5, nest.z); scene.add(nest.mesh);
  }
  loseEgg();
  boss.state = 'home'; boss.t = 0;
  const shout = { Chicken: 'BOK!', Swan: 'HONK!', Scorpion: 'SNAP!', Tiger: 'ROAR!', Cerberus: 'WOOF WOOF WOOF!', Yeti: 'RAAAWR!', Whale: 'SPLOOSH!', 'T-Rex': 'ROOOAAAR!', 'Cosmic Man': 'BEGONE, SNAKE!', 'Oni Tiger': 'GRAAAAH!', 'Titan Gorilla': 'TITAN SMASH!', Angel: 'BE GONE, THIEF!', Demon: 'MWAHAHA!', 'Magic Lion': 'MAGIC ROAR!' }[boss.name];
  hintEl.textContent = shout + ' The ' + boss.name.toLowerCase() + ' took its egg back and threw you to spawn!';
  pop(shout, 'speed', boss.x, [0, 6.5, 7.5, 5.5, 6, 7, 9.5, 6.5, 10, 11.5, 7, 10.5, 10, 7.5][boss.zone], boss.z);
}
function updateThrown(dt) {
  throwT += dt;
  const T = 1.6 + Math.hypot(throwFrom.x, throwFrom.z) / 120;
  const at = (t) => {
    const k = Math.min(1, Math.max(0, t / T));
    return { x: throwFrom.x * (1 - k), z: throwFrom.z * (1 - k), y: 0.5 + Math.sin(k * Math.PI) * 22 };
  };
  const p = at(throwT);
  snake.x = p.x; snake.z = p.z;
  head.position.set(p.x, p.y, p.z); head.rotation.x += dt * 8;
  segMeshes.forEach((m, i) => { const q = at(throwT - (i + 1) * 0.02); m.position.set(q.x, q.y, q.z); });
  if (throwT >= T) {
    head.rotation.set(0, Math.PI, 0);
    snake.x = 0; snake.z = 0; snake.heading = Math.PI; resetTrail(0, 0, Math.PI);
    snake.state = 'free';
    setTimeout(() => { if (snake.state === 'free' && !snake.carry) hintEl.textContent = FREE_HINT; }, 2500);
  }
}
