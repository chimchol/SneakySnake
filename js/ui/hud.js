// ---------- HUD helpers ----------
const speedEl = document.getElementById('speed'), lengthEl = document.getElementById('length');
const coinEl = document.getElementById('coins');
function refreshHud() { speedEl.textContent = short(snake.speedStat); lengthEl.textContent = short(snake.segments); coinEl.textContent = short(snake.coins); }
refreshHud();
function bump(id) { const c = document.getElementById(id); c.classList.add('bump'); setTimeout(() => c.classList.remove('bump'), 150); }
const tmpV = new THREE.Vector3();
function pop(text, kind, x, y, z) {
  tmpV.set(x, y, z).project(camera);
  const el = document.createElement('div');
  el.className = 'pop ' + kind; el.textContent = text;
  el.style.left = ((tmpV.x + 1) / 2 * innerWidth) + 'px';
  el.style.top = ((1 - tmpV.y) / 2 * innerHeight) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

// On touch screens the tool buttons fold into a menu, so they do not cover the game
const toolsEl = document.getElementById('tools'), menuBtn = document.getElementById('menuBtn');
function setMenu(open) {
  toolsEl.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  menuBtn.textContent = open ? '✕ Close' : '☰ Menu';
}
menuBtn.addEventListener('click', () => setMenu(!toolsEl.classList.contains('open')));
canvas.addEventListener('pointerdown', () => setMenu(false));
