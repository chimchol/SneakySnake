// ---------- Input ----------
const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
let mode = 'keys', pointerTarget = null, fingerDown = false;
const now = () => performance.now() / 1000;
const onMachine = () => snake.state === 'tread' || snake.state === 'wood';

addEventListener('keydown', (e) => {
  if (snake.state === 'park') {
    if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); PK.jump = true; return; }
    if (PK.sub === 'poles' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { e.preventDefault(); if (!e.repeat) switchLane(e.key === 'ArrowLeft' ? -1 : 1); return; }
  }
  if (!(e.key in keys)) return;
  e.preventDefault();
  if (!e.repeat && onMachine() && now() - snake.since > 0.5) {
    const dx = (e.key === 'ArrowRight') - (e.key === 'ArrowLeft'), dz = (e.key === 'ArrowDown') - (e.key === 'ArrowUp');
    hopOff(Math.atan2(dx, dz));
  }
  keys[e.key] = true; mode = 'keys';
});
addEventListener('keyup', (e) => { if (e.key in keys) keys[e.key] = false; });
addEventListener('blur', () => { for (const k in keys) keys[k] = false; fingerDown = false; pointerTarget = null; });

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit = new THREE.Vector3();
function aim(e) {
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  if (ray.ray.intersectPlane(ground, hit)) { pointerTarget = { x: hit.x, z: hit.z }; mode = 'point'; return true; }
  return false;
}
canvas.addEventListener('pointerdown', (e) => {
  fingerDown = true;
  if (aim(e) && onMachine() && now() - snake.since > 0.5) {
    hopOff(Math.atan2(pointerTarget.x - snake.x, pointerTarget.z - snake.z));
  }
});
canvas.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' || fingerDown) aim(e); });
addEventListener('pointerup', (e) => { fingerDown = false; if (e.pointerType !== 'mouse') pointerTarget = null; });
canvas.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') pointerTarget = null; });
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
hopBtn.addEventListener('click', () => {
  const cx = snake.state === 'tread' ? TREAD.x : WOOD.x, cz = snake.state === 'tread' ? TREAD.z : WOOD.z;
  hopOff(Math.atan2(-cx, -cz)); // toward the middle of the island
});
