// ---------- Trail Shop and Motor Shop (on the spawn island) ----------
SHOPS.forEach((sh) => {
  const g = new THREE.Group();
  const counter = new THREE.Mesh(new THREE.BoxGeometry(4.4, 1.2, 1.4), mat(0xc98d4a)); counter.position.y = 0.6; counter.castShadow = true; g.add(counter);
  [-2, 2].forEach((x) => { const post = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.4, 0.25), mat(0x8a5a2b)); post.position.set(x, 1.7, -0.4); g.add(post); });
  for (let k = 0; k < 6; k++) { const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.25, 2.2), mat(k % 2 ? 0xffffff : sh.roof)); stripe.position.set(-2 + k * 0.8, 3.5, 0.1); stripe.rotation.x = -0.25; stripe.castShadow = true; g.add(stripe); }
  if (sh.key === 'trail') { [0xff7a1a, 0x7fe0ff, 0xb07aff, 0xffd23f].forEach((c, k) => { const orb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), new THREE.MeshBasicMaterial({ color: c })); orb.position.set(-1.2 + k * 0.8, 1.45, 0); g.add(orb); }); }
  else { const mtr = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.8, 12), mat(0x8c8a93)); mtr.rotation.z = Math.PI / 2; mtr.position.set(0, 1.6, 0); g.add(mtr); const gear = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.12, 6, 10), mat(0xf2bd2c)); gear.position.set(0.6, 1.6, 0); gear.rotation.y = Math.PI / 2; g.add(gear); sh.gear = gear; }
  g.position.set(sh.x, 0, sh.z); g.rotation.y = sh.x < 0 ? 0.5 : -0.5; scene.add(g);
  sign(sh.x + (sh.x < 0 ? 3 : -3), sh.z - 2.5, sh.x < 0 ? 0.5 : -0.5, [sh.name, 'Step up to shop!']);
});
worldTicks.push((dt, t) => { const sh = SHOPS[1]; if (sh.gear) sh.gear.rotation.z = t * 3; });
// A little motor box on the log stand, which changes color with your motor
const motorBox = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 1.2), mat(0x8c8a93));
motorBox.position.set(WOOD.x + 2.1, 0.8, WOOD.z); motorBox.castShadow = true; scene.add(motorBox);
function refreshMotor() { motorBox.visible = motorTier > 0; if (motorTier > 0) motorBox.material.color.set(MOTORS[motorTier].color); }
refreshMotor();
// Trail sparkles behind the snake
const trailBits = [];
for (let i = 0; i < 40; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })); m.visible = false; scene.add(m); trailBits.push({ m, life: 0 }); }
let trailNext = 0, trailIdx = 0;
worldTicks.push((dt, t) => {
  const tr = TRAILS[trailTier];
  trailBits.forEach((b) => { if (b.life > 0) { b.life -= dt; b.m.material.opacity = Math.max(0, b.life / 0.9); b.m.position.y += dt * 0.4; b.m.visible = b.life > 0; } });
  if (trailTier === 0 || snake.state === 'tread' || snake.state === 'wood') return;
  trailNext -= dt;
  if (trailNext <= 0 && segMeshes.length) {
    trailNext = 0.05;
    const tail = segMeshes[segMeshes.length - 1];
    const b = trailBits[trailIdx++ % trailBits.length];
    b.life = 0.9; b.m.visible = true;
    b.m.position.set(tail.position.x + (Math.random() - 0.5) * 0.4, tail.position.y + 0.1, tail.position.z + (Math.random() - 0.5) * 0.4);
    if (tr.rainbow) b.m.material.color.setHSL((t * 0.5) % 1, 1, 0.6); else b.m.material.color.set(tr.color);
  }
});
const shopBox = document.getElementById('shopBox');
let openShop = null, onShop = null;
function drawShop(sh) {
  openShop = sh;
  const tier = sh.key === 'trail' ? trailTier : motorTier;
  document.getElementById('shopTitle').textContent = sh.name;
  document.getElementById('shopSays').textContent = sh.key === 'trail'
    ? 'Trails follow your snake and MULTIPLY the speed you get from the treadmill!'
    : 'Motors make your log spin faster and MULTIPLY the length you get from it!';
  const list = document.getElementById('shopList'); list.innerHTML = '';
  sh.items.forEach((it, i) => {
    if (i === 0) return;
    const d = document.createElement('div');
    const owned = i <= tier, next = i === tier + 1;
    d.className = 'shop-item' + (owned ? ' owned' : '') + (!owned && !next ? ' locked' : '');
    const info = document.createElement('div');
    const n = document.createElement('b'); n.textContent = it.name;
    const m = document.createElement('small'); m.textContent = '×' + it.mult + (sh.key === 'trail' ? ' speed' : ' length') + ' · ' + short(it.cost) + ' coins';
    info.append(n, m);
    const btn = document.createElement('button'); btn.type = 'button';
    if (owned) { btn.textContent = i === tier ? 'Using' : 'Owned'; btn.disabled = true; }
    else if (next) { btn.textContent = 'Buy'; btn.disabled = snake.coins < it.cost; btn.addEventListener('click', () => buyShop(sh, i)); }
    else { btn.textContent = 'Locked'; btn.disabled = true; }
    d.append(info, btn); list.appendChild(d);
  });
}
function buyShop(sh, i) {
  const it = sh.items[i];
  if (snake.coins < it.cost) return;
  snake.coins -= it.cost;
  if (sh.key === 'trail') trailTier = i; else { motorTier = i; refreshMotor(); }
  repaintMachines(); refreshHud(); save();
  hintEl.textContent = 'You bought the ' + it.name + '! ×' + it.mult + (sh.key === 'trail' ? ' speed!' : ' length!');
  drawShop(sh);
}
function checkShops() {
  const sh = SHOPS.find((s2) => Math.hypot(snake.x - s2.x, snake.z - s2.z) < 3.2);
  if (sh && onShop !== sh) { keys.ArrowUp = keys.ArrowDown = keys.ArrowLeft = keys.ArrowRight = false; pointerTarget = null; drawShop(sh); shopBox.hidden = false; document.getElementById('shopClose').focus(); }
  onShop = sh || null;
}
document.getElementById('shopClose').addEventListener('click', () => { shopBox.hidden = true; });
shopBox.addEventListener('click', (e) => { if (e.target === shopBox) shopBox.hidden = true; });
addEventListener('keydown', (e) => { if (e.key === 'Escape') shopBox.hidden = true; });
