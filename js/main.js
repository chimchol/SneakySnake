// Camera, resizing, and the main game loop. Loaded last.
function updateCamera(dt) {
  // Pull back a little as the snake gets longer
  const zoom = 1 + Math.min(1.2, Math.sqrt(Math.max(0, snake.segments - 12)) * 0.06);
  let fx = snake.x, fz = snake.z;
  if (snake.state === 'wood') { fx = WOOD.x; fz = WOOD.z; }
  const sy = snake.state === 'park' ? (snake.y || 0) : 0;
  const target = new THREE.Vector3(fx, 14 * zoom + sy, fz + 16 * zoom);
  camPos.lerp(target, 1 - Math.pow(0.002, dt));
  camera.position.copy(camPos);
  camera.lookAt(fx, (snake.state === 'wood' ? 2 : 0) + sy, fz - 2);
}

function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

// Each part runs on its own, so one problem can never freeze the whole game
let shownError = false;
function safe(name, fn) {
  try { fn(); } catch (err) {
    if (!shownError) { shownError = true; showBug(name + ': ' + (err && err.message)); }
  }
}
function frame(t) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (t - last) / 1000); last = t;
  safe('move', () => update(dt));
  safe('boss', () => updateBoss(dt));
  safe('camera', () => updateCamera(dt));
  safe('pets', () => updatePets(dt));
  safe('money', () => updateMoney(dt));
  safe('night', () => updateNight(dt));
  worldTicks.forEach((fn, i) => safe('world' + i, () => fn(dt, t / 1000)));
  safe('draw', () => renderer.render(scene, camera));
}
requestAnimationFrame(frame);
