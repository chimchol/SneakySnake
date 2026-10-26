// ---------- Crossing the pole ----------
let poleT = 0, fallV = 0, fallT = 0;
function startPole(pole, dir) {
  homeArrow.visible = false;
  snake.state = 'pole'; snake.pole = pole; snake.poleDir = dir; snake.poleP = 0; poleT = 0;
  snake.long = snake.segments >= pole.need;
  pointerTarget = null;
  hintEl.textContent = snake.long ? 'Long enough! Slithering across...' : 'Uh oh... the pole is wobbling!';
  if (!snake.long) pop('Need length ' + pole.need, 'speed', snake.x, 2.5, snake.z);
}
function updatePole(dt) {
  const POLE = snake.pole, poleGroup = POLE.group;
  const dir = snake.poleDir, startZ = dir < 0 ? POLE.z1 : POLE.z2, endZ = dir < 0 ? POLE.z2 : POLE.z1;
  const failAt = POLE.len * 0.45;
  snake.poleP += moveSpeed() * 1.1 * dt; // a little faster on poles, so bosses can't catch up there
  poleT += dt;
  wiggle += dt * moveSpeed() * 1.6;
  snake.x = 0; snake.z = startZ + dir * snake.poleP; snake.heading = dir < 0 ? Math.PI : 0;
  head.position.set(0, 1.0, snake.z); head.rotation.set(0, snake.heading, 0);
  const n = segMeshes.length;
  for (let s = 0; s < n; s++) {
    const taper = 1 - (s / n) * 0.6;
    const zs = snake.z - dir * (s + 1.2) * snake.spacing;
    const onPole = dir < 0 ? zs < startZ : zs > startZ;
    if (onPole) {
      const a = s * 0.9 - wiggle * 0.4, r = 0.4 + 0.4 * taper;
      segMeshes[s].position.set(Math.sin(a) * r, 0.15 + Math.cos(a) * r, zs);
    } else {
      segMeshes[s].position.set(Math.sin(wiggle - s * 0.7) * 0.2, 0.45 * taper, zs);
    }
    segMeshes[s].scale.setScalar(taper);
  }
  if (!snake.long) {
    const k = Math.min(1, snake.poleP / failAt);
    poleGroup.rotation.z = Math.sin(poleT * 22) * 0.07 * k;
    if (snake.poleP >= failAt) { snake.state = 'falling'; fallV = 0; fallT = 0; hintEl.textContent = 'Too short! Down into the void...'; }
  } else if (snake.poleP >= POLE.len + 1) {
    // Made it across
    snake.z = endZ + dir * 2.6; snake.x = 0;
    resetTrail(snake.x, snake.z, snake.heading);
    snake.state = 'free'; mustLeave = 'pole';
    markReached(islandAt(snake.z));
    const arrived = ISLANDS[islandAt(snake.z)].name;
    hintEl.textContent = arrived === 'Spawn' ? 'Back at spawn!' : 'Welcome to the ' + arrived + '!';
    setTimeout(() => { if (snake.state === 'free') hintEl.textContent = FREE_HINT; }, 2500);
  }
}
function updateFall(dt) {
  fallT += dt; fallV += 18 * dt;
  const poleGroup = snake.pole.group;
  poleGroup.position.y -= fallV * dt;
  poleGroup.rotation.z += dt * 1.2;
  poleGroup.rotation.x += dt * 0.4;
  head.position.y -= fallV * dt;
  head.rotation.z += dt * 3;
  segMeshes.forEach((m, i) => { m.position.y -= fallV * dt * (1 - i * 0.004); });
  if (fallT > 1.8) {
    // Respawn back at spawn
    snake.x = 0; snake.z = 0; snake.heading = Math.PI;
    resetTrail(0, 0, Math.PI); resetPole(); loseEgg();
    head.rotation.set(0, Math.PI, 0);
    snake.state = 'free'; mustLeave = null;
    hintEl.textContent = 'You fell into the void! Grow longer on the wood and try again.';
    setTimeout(() => { if (snake.state === 'free') hintEl.textContent = FREE_HINT; }, 4000);
  }
}
