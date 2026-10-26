// ---------- Night every 5 minutes ----------
const night = { on: false, t: 0, k: 0, warned: false };
const nightBg = (function () {
  const c = document.createElement('canvas'); c.width = 2; c.height = 256; const x = c.getContext('2d');
  const gr = x.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, '#0d1033'); gr.addColorStop(0.45, '#2a2a63'); gr.addColorStop(0.62, '#2a1846'); gr.addColorStop(1, '#0b0518');
  x.fillStyle = gr; x.fillRect(0, 0, 2, 256);
  return new THREE.CanvasTexture(c);
})();
const dayBg = scene.background;
const stars = (function () {
  const geo = new THREE.BufferGeometry(), pts = [];
  for (let i = 0; i < 400; i++) {
    const a = Math.random() * Math.PI * 2, e = 0.15 + Math.random() * 1.2, r = 180;
    pts.push(Math.cos(a) * Math.cos(e) * r, Math.sin(e) * r, Math.sin(a) * Math.cos(e) * r);
  }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const s = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 1.4, transparent: true, opacity: 0, fog: false }));
  scene.add(s); return s;
})();
// The night wall: blocks the way to the eggs
const wall = new THREE.Group();
(function buildWall() {
  const stone = [mat(0x8c8a93), mat(0x77757f), mat(0x9d9ba5)];
  for (let row = 0; row < 3; row++) for (let i = 0; i < 6; i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.9, 1), stone[(row + i) % 3]);
    b.position.set(-3.75 + i * 1.5 + (row % 2) * 0.4, 0.45 + row * 0.95, 0); b.castShadow = true; wall.add(b);
  }
  wall.position.set(0, -4, -R + 0.9); scene.add(wall);
})();
const clockEl = document.getElementById('clock'), clockText = document.getElementById('clockText'), clockIcon = document.getElementById('clockIcon');
const dayFog = new THREE.Color(0xbfe6f7), nightFog = new THREE.Color(0x1a1840);
const daySky = new THREE.Color(0xeaf7ff), nightSky = new THREE.Color(0x6a70c8);
let clockShown = '';

function nightFalls() {
  night.on = true; night.t = 0;
  // Bosses go home; new eggs grow in the nests
  bosses.forEach((b) => { b.state = 'home'; b.t = 0; });
  rollAngelsDemons();
  nests.forEach((n) => { if (n.mesh) scene.remove(n.mesh); n.mesh = null; n.egg = null; if (!n.boss.off) fillNest(n); });
  setTimeout(() => { if (night.on) hintEl.textContent = AD_TEXT[AD.mode]; }, 5500);
  // Anyone out in the forest goes back to spawn, and loses their egg
  const outThere = snake.state !== 'park' && (snake.state === 'pole' || snake.state === 'thrown' || (snake.z < POLE.mid && snake.state !== 'falling'));
  if (outThere) {
    const hadEgg = !!snake.carry;
    loseEgg(); resetPole();
    snake.state = 'free'; mustLeave = null;
    snake.x = 0; snake.z = 0; snake.heading = Math.PI; head.rotation.set(0, Math.PI, 0); resetTrail(0, 0, Math.PI);
    hintEl.textContent = hadEgg ? 'Night fell! You lost the egg and went back to spawn.' : 'Night fell! Back to spawn you go.';
  } else {
    hintEl.textContent = 'Night time! The wall is up until morning.';
  }
  // Tell everyone if a good egg spawned (but not the mutation)
  // The rarest egg out there tonight (only the two rarest kinds in each zone count as "good")
  const goodNames = bosses.map((b) => b.zone).flatMap((z) => eggsOfZone(z).sort((a, b) => a.weight - b.weight).slice(0, 2).map((t) => t.name));
  const good = nests.filter((n) => n.egg && goodNames.includes(n.egg.type)).sort((a, b) => typeOf(a.egg).weight - typeOf(b.egg).weight)[0];
  if (good) setTimeout(() => {
    const t = typeOf(good.egg);
    const article = /^[AEIOU]/.test(t.name) ? 'An ' : 'A ';
    hintEl.textContent = '✨ ' + article + t.name + ' spawned in the ' + ISLANDS[t.zone].name + '!';
  }, 2500);
}
function dayBreaks() {
  night.on = false; night.t = 0;
  hintEl.textContent = 'Good morning! The wall is down. Go get some eggs!';
  setTimeout(() => { if (!night.on && snake.state === 'free' && !snake.carry) hintEl.textContent = FREE_HINT; }, 4000);
}
function updateNight(dt) {
  night.t += dt;
  if (!night.on && night.t >= DAY_LEN - 30 && !night.warned30) { night.warned30 = true; hintEl.textContent = '⏰ Night comes in 30 seconds! Hurry!'; }
  if (night.on) night.warned30 = false;
  if (!night.on && night.t >= DAY_LEN) nightFalls();
  else if (night.on && night.t >= NIGHT_LEN) dayBreaks();
  // Fade the lights
  const goal = night.on ? 1 : 0;
  night.k += Math.sign(goal - night.k) * Math.min(Math.abs(goal - night.k), dt / 2);
  const k = night.k;
  sun.intensity = 0.9 * (1 - 0.8 * k);
  hemi.intensity = 0.75 * (1 - 0.45 * k);
  hemi.color.copy(daySky).lerp(nightSky, k);
  scene.fog.color.copy(dayFog).lerp(nightFog, k);
  scene.background = k > 0.5 ? nightBg : dayBg;
  stars.material.opacity = Math.max(0, k * 1.2 - 0.2);
  wall.position.y = -4 + 4 * k;
  // Clock
  const left = Math.max(0, Math.ceil((night.on ? NIGHT_LEN : DAY_LEN) - night.t));
  const txt = (night.on ? 'Night ' : 'Day ') + Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0');
  if (txt !== clockShown) {
    clockShown = txt; clockText.textContent = txt;
    clockIcon.textContent = night.on ? '🌙' : '☀️';
    clockEl.classList.toggle('night', night.on);
  }
}
