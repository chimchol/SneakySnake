// ---------- Getting on and off the machines ----------
let mustLeave = null; // machine we just hopped off; must leave its area before using it again
function hopOn(which) {
  snake.state = which; snake.since = now(); snake.gainT = 0;
  pointerTarget = null;
  hopBtn.hidden = false;
  refreshMachineHint();
}
// ---------- Upgrades ----------
const upBtn = document.getElementById('upgrade');
const upCost = (lvl) => 1000 * Math.pow(5, lvl - 1); // 1,000 → 5,000 → 25,000 → 125,000 ...
function refreshMachineHint() {
  const which = snake.state;
  if (which !== 'tread' && which !== 'wood') { upBtn.hidden = true; return; }
  const lvl = which === 'tread' ? snake.treadLvl : snake.woodLvl;
  hintEl.textContent = which === 'tread'
    ? 'Running! +' + short(treadGain(lvl)) + ' speed every second'
    : 'Wrapping! +' + short(woodGain(lvl)) + ' length every second';
  const cost = upCost(lvl);
  upBtn.hidden = false;
  if (pixieBoost || lvl >= MAX_LVL) { upBtn.textContent = pixieBoost ? '✨ Pixie Magic: MAX' : '🌈 MAX LEVEL'; upBtn.disabled = true; return; }
  upBtn.textContent = 'Upgrade to +' + gainOf(lvl + 1) + '/sec · ' + cost.toLocaleString() + ' coins';
  upBtn.disabled = snake.coins < cost;
}
upBtn.addEventListener('click', () => {
  const which = snake.state;
  if (which !== 'tread' && which !== 'wood') return;
  const lvl = which === 'tread' ? snake.treadLvl : snake.woodLvl, cost = upCost(lvl);
  if (snake.coins < cost || lvl >= MAX_LVL || pixieBoost) return;
  snake.coins -= cost;
  if (which === 'tread') snake.treadLvl++; else snake.woodLvl++;
  pop('Upgraded!', 'speed', which === 'tread' ? TREAD.x : WOOD.x, 4, which === 'tread' ? TREAD.z : WOOD.z);
  repaintMachines();
  const tiers = which === 'tread' ? TREAD_TIERS : WOOD_TIERS, lvlNow = which === 'tread' ? snake.treadLvl : snake.woodLvl;
  if (lvlNow <= tiers.length) pop(tiers[lvlNow - 1].name + '!', 'length', which === 'tread' ? TREAD.x : WOOD.x, 5.5, which === 'tread' ? TREAD.z : WOOD.z);
  refreshHud(); refreshMachineHint(); save(); upBtn.blur();
});
function hopOff(dir) {
  const which = snake.state;
  if (which !== 'tread' && which !== 'wood') return;
  const cx = which === 'tread' ? TREAD.x : WOOD.x, cz = which === 'tread' ? TREAD.z : WOOD.z;
  const out = which === 'tread' ? 3.4 : 3.2;
  snake.x = cx + Math.sin(dir) * out * (which === 'tread' ? 0.6 : 1);
  snake.z = cz + Math.cos(dir) * out;
  if (which === 'tread' && onTreadmill(snake.x, snake.z)) snake.x = cx + (Math.sin(dir) >= 0 ? 2.6 : -2.6);
  snake.heading = dir;
  resetTrail(snake.x, snake.z, dir);
  snake.state = 'free'; mustLeave = which;
  hopBtn.hidden = true; upBtn.hidden = true; hintEl.textContent = FREE_HINT;
  save();
}
