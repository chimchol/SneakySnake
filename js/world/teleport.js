// ---------- Teleport pad ----------
const teleRing = new THREE.MeshBasicMaterial({ color: 0xb07aff });
(function buildPad() {
  const base = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.5, 0.3, 32), mat(0x4a3a6a)); base.position.set(TELE.x, 0.15, TELE.z); base.receiveShadow = true; scene.add(base);
  const glowDisc = new THREE.Mesh(new THREE.CircleGeometry(1.8, 32), new THREE.MeshBasicMaterial({ color: 0x8a5bd6, transparent: true, opacity: 0.8 }));
  glowDisc.rotation.x = -Math.PI / 2; glowDisc.position.set(TELE.x, 0.32, TELE.z); scene.add(glowDisc);
  const rings = [0, 1, 2].map((k) => { const r = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.06, 6, 32), teleRing); r.rotation.x = Math.PI / 2; r.position.set(TELE.x, 0.5 + k, TELE.z); scene.add(r); return r; });
  worldTicks.push((dt, t) => { rings.forEach((r, k) => { const ph = (t * 0.5 + k / 3) % 1; r.position.y = 0.4 + ph * 3; r.scale.setScalar(1 - ph * 0.4); }); teleRing.color.setHSL(0.75 + Math.sin(t * 2) * 0.05, 0.9, 0.7); });
})();
sign(TELE.x + 3.2, TELE.z - 1.5, 0.6, ['Teleport', 'Step on the pad']);

// Which zones you have reached. Old saves: zones your length could already cross count as reached.
// You unlock a zone for teleporting only by crossing its pole yourself.
let reached = 0;
try { reached = Number(localStorage.getItem('sneaky-snake-reached')) || 0; } catch (e) {}
function markReached(i) {
  if (i <= reached) return;
  reached = i;
  try { localStorage.setItem('sneaky-snake-reached', String(reached)); } catch (e) {}
  pop('Teleport unlocked: ' + ISLANDS[i].name + '!', 'length', snake.x, 3.4, snake.z);
}
const teleEl = document.getElementById('tele'), teleList = document.getElementById('teleList');
let onPad = false;
function checkTelePad(isl) {
  const here = isl === 0 && Math.hypot(snake.x - TELE.x, snake.z - TELE.z) < TELE.r;
  if (here && !onPad) {
    onPad = true;
    if (snake.carry) { hintEl.textContent = 'You cannot teleport with an egg. Take it to the pen!'; return; }
    if (night.on) { hintEl.textContent = 'The teleporter is off at night. Wait until morning!'; return; }
    openTele();
  }
  if (!here) onPad = false;
}
function openTele() {
  teleList.innerHTML = '';
  ISLANDS.forEach((isl, i) => {
    if (i === 0) return;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'tele-btn';
    const name = document.createElement('span'); name.textContent = 'Zone ' + i + ': ' + isl.name;
    const info = document.createElement('small');
    const ok = i <= reached;
    info.textContent = ok ? (i === 12 ? 'Now: ' + { angel: 'Angel 😇', demon: 'Demon 😈', both: 'BOTH! ⚡' }[AD.mode] : 'Boss: ' + bosses[i - 1].name) : 'Locked: cross the pole first';
    b.append(name, info); b.disabled = !ok;
    b.addEventListener('click', () => teleportTo(i));
    teleList.appendChild(b);
  });
  keys.ArrowUp = keys.ArrowDown = keys.ArrowLeft = keys.ArrowRight = false; pointerTarget = null;
  teleEl.hidden = false;
  const first = teleList.querySelector('button:not(:disabled)'); (first || document.getElementById('teleClose')).focus();
}
function teleportTo(i) {
  teleEl.hidden = true;
  const isl = ISLANDS[i];
  snake.x = 0; snake.z = isl.cz + isl.r - 5; snake.heading = Math.PI;
  head.rotation.set(0, Math.PI, 0); resetTrail(snake.x, snake.z, Math.PI);
  snake.state = 'free'; mustLeave = null; onPad = false;
  camPos.set(snake.x, 14, snake.z + 16);
  pop('Whoosh!', 'length', snake.x, 3, snake.z);
  hintEl.textContent = 'Welcome to the ' + isl.name + '!';
  setTimeout(() => { if (snake.state === 'free' && !snake.carry) hintEl.textContent = FREE_HINT; }, 2500);
}
document.getElementById('teleClose').addEventListener('click', () => { teleEl.hidden = true; });
teleEl.addEventListener('click', (e) => { if (e.target === teleEl) teleEl.hidden = true; });
addEventListener('keydown', (e) => { if (e.key === 'Escape') teleEl.hidden = true; });
