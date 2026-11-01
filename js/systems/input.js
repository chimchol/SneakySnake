// ---------- Input ----------
const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
let mode = 'keys', pointerTarget = null;
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
addEventListener('blur', () => { for (const k in keys) keys[k] = false; pointerTarget = null; stickId = null; stickHeading = null; stickEl.hidden = true; });

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit = new THREE.Vector3();
function aim(e) {
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  if (ray.ray.intersectPlane(ground, hit)) { pointerTarget = { x: hit.x, z: hit.z }; return true; }
  return false;
}
// Touch: a floating joystick. Put a finger down anywhere and drag; the snake goes the way you drag.
// The camera looks straight down the -z axis, so screen right is +x and screen down is +z.
const stickEl = document.getElementById('stick'), stickKnob = document.getElementById('stickKnob');
const STICK_R = 50, STICK_DEAD = 10;
let stickId = null, stickX = 0, stickY = 0, stickHeading = null;
function stickMove(e) {
  const dx = e.clientX - stickX, dy = e.clientY - stickY, d = Math.hypot(dx, dy), k = Math.min(1, STICK_R / (d || 1));
  stickKnob.style.transform = 'translate(' + dx * k + 'px, ' + dy * k + 'px)';
  stickHeading = d > STICK_DEAD ? Math.atan2(dx, dy) : null;
}
function stickEnd(e) {
  if (e.pointerId !== stickId) return;
  stickId = null; stickHeading = null; stickEl.hidden = true;
}
canvas.addEventListener('pointerdown', (e) => {
  if (e.pointerType !== 'mouse') {
    if (stickId !== null) return;
    if (onMachine() && now() - snake.since > 0.5 && aim(e)) {
      hopOff(Math.atan2(pointerTarget.x - snake.x, pointerTarget.z - snake.z));
    }
    pointerTarget = null;
    stickId = e.pointerId; stickX = e.clientX; stickY = e.clientY; stickHeading = null; mode = 'stick';
    stickEl.style.left = stickX + 'px'; stickEl.style.top = stickY + 'px'; stickKnob.style.transform = '';
    stickEl.hidden = false;
    return;
  }
  if (aim(e)) {
    mode = 'point';
    if (onMachine() && now() - snake.since > 0.5) hopOff(Math.atan2(pointerTarget.x - snake.x, pointerTarget.z - snake.z));
  }
});
canvas.addEventListener('pointermove', (e) => {
  if (e.pointerId === stickId) stickMove(e);
  else if (e.pointerType === 'mouse' && aim(e)) mode = 'point';
});
addEventListener('pointerup', stickEnd);
addEventListener('pointercancel', stickEnd);
canvas.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') pointerTarget = null; });
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
hopBtn.addEventListener('click', () => {
  const cx = snake.state === 'tread' ? TREAD.x : WOOD.x, cz = snake.state === 'tread' ? TREAD.z : WOOD.z;
  hopOff(Math.atan2(-cx, -cz)); // toward the middle of the island
});
