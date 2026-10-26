// ---------- Money from pets ----------
const petCoins = (egg) => typeOf(egg).coins * (MUT_X[egg.mut] || 1);
let hudT = 0, coinPopT = 0;
function updateMoney(dt) {
  const hatched = pets.filter((p) => p.hatchIn <= 0);
  let rate = 0;
  penEggs.forEach((egg, i) => { if (i < penEggs.length - 24 || hatched.some((p) => p.egg === egg)) rate += petCoins(egg); });
  snake.coins += rate * dt;
  hudT += dt; coinPopT += dt;
  if (hudT > 0.25) { hudT = 0; refreshHud(); if (onMachine()) { const lvl = snake.state === 'tread' ? snake.treadLvl : snake.woodLvl; upBtn.disabled = pixieBoost || lvl >= MAX_LVL || snake.coins < upCost(lvl); } }
  if (coinPopT > 2 && hatched.length) {
    coinPopT = 0;
    const p = hatched[Math.floor(Math.random() * hatched.length)];
    if (Math.hypot(p.x - snake.x, p.z - snake.z) < 45) pop('+' + short(petCoins(p.egg)) + '/sec', 'speed', p.x, 1.6, p.z);
    save();
  }
}
