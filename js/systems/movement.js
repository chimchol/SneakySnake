// ---------- Game loop ----------
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
let wiggle = 0, last = performance.now(), tongueT = 0, spin = 0;
const camPos = new THREE.Vector3(0, 14, 16);

function placeBodyOnTrail(moving) {
  let idx = 0, travelled = 0, want = snake.spacing * 1.2;
  for (let s = 0; s < segMeshes.length; s++) {
    while (idx < trail.length - 1) {
      const a = trail[idx], b = trail[idx + 1];
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      if (travelled + len >= want) break;
      travelled += len; idx++;
    }
    const a = trail[idx], b = trail[Math.min(idx + 1, trail.length - 1)];
    const len = Math.hypot(b.x - a.x, b.z - a.z) || 1;
    const t = Math.min(1, Math.max(0, (want - travelled) / len));
    const px = a.x + (b.x - a.x) * t, pz = a.z + (b.z - a.z) * t;
    const nx = -(b.z - a.z) / len, nz = (b.x - a.x) / len;
    const amp = Math.min(0.35, s * 0.04) * (moving ? 1 : 0.3);
    const off = Math.sin(wiggle - s * 0.7) * amp;
    const taper = 1 - (s / segMeshes.length) * 0.6;
    const m = segMeshes[s];
    m.position.set(px + nx * off, 0.45 * taper + (a.y || 0), pz + nz * off);
    m.scale.setScalar(taper);
    want += snake.spacing;
  }
}

function gain(dt) {
  snake.gainT += dt;
  while (snake.gainT >= 1) {
    snake.gainT -= 1;
    if (snake.state === 'tread') {
      snake.speedStat += treadGain(snake.treadLvl); bump('speedChip');
      pop('+' + short(treadGain(snake.treadLvl)) + ' speed', 'speed', snake.x, 2.5, snake.z);
    } else {
      snake.segments += woodGain(snake.woodLvl); buildBody(); bump('lengthChip');
      pop('+' + short(woodGain(snake.woodLvl)) + ' length', 'length', WOOD.x, 0.4 + WOOD.h + 1.5, WOOD.z);
    }
    refreshHud(); save();
  }
}

function update(dt) {
  spin += dt * 1.6 * (1 + motorTier * 0.9); // motors spin the log faster
  woodSpin.rotation.y = spin;
  tongueT += dt;
  tongue.visible = (tongueT % 1.6) < 0.25;

  if (snake.state === 'tread') {
    // Run in place, facing up the belt; the belt rolls under you
    beltTex.offset.y -= dt * moveSpeed() * 0.25;
    wiggle += dt * moveSpeed() * 1.6;
    snake.x = TREAD.x; snake.z = TREAD.z - TREAD.l / 2 + 1.4; snake.heading = Math.PI;
    head.position.set(snake.x, 0.85, snake.z); head.rotation.set(0, Math.PI, 0);
    for (let s = 0; s < segMeshes.length; s++) {
      const taper = 1 - (s / segMeshes.length) * 0.6;
      const dz = (s + 1.2) * snake.spacing;
      const off = Math.sin(wiggle - s * 0.7) * Math.min(0.5, s * 0.06);
      const onBelt = dz < TREAD.l - 1.4;
      segMeshes[s].position.set(snake.x + off, (onBelt ? 0.36 : 0) + 0.45 * taper, snake.z + dz);
      segMeshes[s].scale.setScalar(taper);
    }
    gain(dt);
  } else if (snake.state === 'wood') {
    // Coil around the spinning log, head on top
    const n = segMeshes.length, rad = WOOD.r + 0.45;
    const pitch = Math.min(0.16, (WOOD.h - 0.6) / n);
    const step = snake.spacing / rad;
    const topY = 0.4 + 0.5 + n * pitch;
    const ha = spin;
    snake.x = WOOD.x; snake.z = WOOD.z;
    head.position.set(WOOD.x + Math.sin(ha) * rad, topY + 0.3, WOOD.z + Math.cos(ha) * rad);
    head.rotation.set(0, ha + Math.PI / 2, 0);
    for (let s = 0; s < n; s++) {
      const a = ha - (s + 1) * step;
      const taper = 1 - (s / n) * 0.5;
      segMeshes[s].position.set(WOOD.x + Math.sin(a) * rad, topY - (s + 1) * pitch, WOOD.z + Math.cos(a) * rad);
      segMeshes[s].scale.setScalar(taper);
    }
    gain(dt);
  } else if (snake.state === 'pole') {
    updatePole(dt);
  } else if (snake.state === 'falling') {
    updateFall(dt);
  } else if (snake.state === 'park') {
    updatePark(dt);
  } else if (snake.state === 'thrown') {
    updateThrown(dt);
  } else {
    let wantHeading = null;
    if (mode === 'keys') {
      const dx = (keys.ArrowRight ? 1 : 0) - (keys.ArrowLeft ? 1 : 0);
      const dz = (keys.ArrowDown ? 1 : 0) - (keys.ArrowUp ? 1 : 0);
      if (dx || dz) wantHeading = Math.atan2(dx, dz);
    } else if (pointerTarget) {
      const dx = pointerTarget.x - snake.x, dz = pointerTarget.z - snake.z;
      if (Math.hypot(dx, dz) > 1.2) wantHeading = Math.atan2(dx, dz);
    }
    const moving = wantHeading !== null;
    if (moving) {
      const diff = wrap(wantHeading - snake.heading);
      const turn = 7 * dt;
      snake.heading += Math.max(-turn, Math.min(turn, diff));
      snake.x += Math.sin(snake.heading) * moveSpeed() * dt;
      snake.z += Math.cos(snake.heading) * moveSpeed() * dt;
      wiggle += dt * moveSpeed() * 1.6;
    }
    // Stay on whichever island you are on
    const isl = islandAt(snake.z), inForest = isl > 0;
    const cz = ISLANDS[isl].cz, maxR = ISLANDS[isl].r - 1.2;
    const d = Math.hypot(snake.x, snake.z - cz);
    if (d > maxR) { snake.x *= maxR / d; snake.z = cz + (snake.z - cz) * maxR / d; }

    // Machines: step on to start training
    const inTread = onTreadmill(snake.x, snake.z), inWood = nearWood(snake.x, snake.z);
    if (mustLeave === 'tread' && !inTread) mustLeave = null;
    if (mustLeave === 'wood' && !inWood) mustLeave = null;
    if (inTread && mustLeave !== 'tread') { hopOn('tread'); return; }
    if (inWood && mustLeave !== 'wood') { hopOn('wood'); return; }
    checkTelePad(isl);
    if (isl === 0) checkShops();
    if (isl === 13) checkPixie();

    // The pole: slither onto it from either end
    // North end of this island leads onto POLES[isl]; south end leads back onto POLES[isl - 1]
    const nearX = Math.abs(snake.x) < (snake.carry ? 3.5 : 1.4); // easier to hit the pole while carrying an egg
    const northPole = isl < POLES.length && nearX && snake.z < cz - ISLANDS[isl].r + 2 ? POLES[isl] : null;
    const southPole = isl > 0 && nearX && snake.z > cz + ISLANDS[isl].r - 2 ? POLES[isl - 1] : null;
    const atSpawnEnd = isl === 0 && !!northPole;
    if (mustLeave === 'pole' && !northPole && !southPole) mustLeave = null;
    if (moving && mustLeave !== 'pole' && atSpawnEnd && night.on) {
      if (!night.warned) { night.warned = true; hintEl.textContent = 'The wall is up! Wait until morning.'; setTimeout(() => { night.warned = false; }, 3000); }
    } else if (moving && mustLeave !== 'pole' && northPole) { startPole(northPole, -1); return; }
    else if (moving && mustLeave !== 'pole' && southPole) { startPole(southPole, 1); return; }

    // Grab an egg from a nest, or drop it in the pen
    if (!snake.carry && inForest) {
      const nest = nests.find((n) => n.egg && n.zone === isl && Math.hypot(n.x - snake.x, n.z - snake.z) < 1.3);
      if (nest) grabEgg(nest);
    }
    // As soon as you are back on the spawn island, the egg flies into your pen
    if (snake.carry && isl === 0) deliverEgg();
    // Glowing arrow pointing to the pole home while you carry an egg
    homeArrow.visible = !!snake.carry && isl > 0;
    if (homeArrow.visible) {
      const tz = ISLANDS[isl].cz + ISLANDS[isl].r;
      homeArrow.position.set(snake.x, 2.6 + Math.sin(wiggle * 0.3) * 0.15, snake.z);
      homeArrow.rotation.y = Math.atan2(0 - snake.x, tz - snake.z);
    }

    if (Math.hypot(snake.x - trail[0].x, snake.z - trail[0].z) > 0.08) {
      trail.unshift({ x: snake.x, z: snake.z });
      const maxTrail = Math.ceil((shownSegs() + 6) * snake.spacing / 0.08) + 50;
      while (trail.length > maxTrail) trail.pop();
    }
    head.position.set(snake.x, 0.5, snake.z);
    head.rotation.set(0, snake.heading, 0);
    placeBodyOnTrail(moving);
  }
}
