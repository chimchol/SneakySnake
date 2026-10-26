// ---------- Saved progress ----------
let saved = {};
try { saved = JSON.parse(localStorage.getItem('sneaky-snake') || '{}') || {}; } catch (e) { saved = {}; }
const snake = {
  x: 0, z: 0, heading: Math.PI,
  speedStat: saved.speed || 6, segments: saved.length || 12,
  coins: saved.coins || 0, treadLvl: Math.min(15, saved.treadLvl || 1), woodLvl: Math.min(15, saved.woodLvl || 1),
  spacing: 0.55, state: 'free', since: 0, gainT: 0
};
function save() { try { localStorage.setItem('sneaky-snake', JSON.stringify({ speed: snake.speedStat, length: snake.segments, coins: Math.floor(snake.coins), treadLvl: snake.treadLvl, woodLvl: snake.woodLvl, pixie: pixieBoost, skin: skinOwned, skinOn: skinOn, trail: trailTier, motor: motorTier })); } catch (e) {} }
// Slow mode caps how fast you move, so huge speeds stay easy to steer
let slowMode = false;
try { slowMode = localStorage.getItem('sneaky-snake-slow') === '1'; } catch (e) {}
pixieBoost = !!saved.pixie;
let skinOwned = !!saved.skin, skinOn = saved.skinOn !== false;
trailTier = Math.min(TRAILS.length - 1, saved.trail || 0); motorTier = Math.min(MOTORS.length - 1, saved.motor || 0);
const moveSpeed = () => { const v = speedFromStat(snake.speedStat); return slowMode ? Math.min(v, SLOW_CAP) : v; };
const slowBtn = document.getElementById('slowBtn');
function refreshSlow() { slowBtn.textContent = slowMode ? '🐢 Slow: ON' : '🐢 Slow: off'; slowBtn.classList.toggle('on', slowMode); slowBtn.setAttribute('aria-pressed', slowMode ? 'true' : 'false'); }
function toggleSlow() {
  slowMode = !slowMode; refreshSlow();
  try { localStorage.setItem('sneaky-snake-slow', slowMode ? '1' : '0'); } catch (e) {}
  hintEl.textContent = slowMode ? 'Slow mode ON: easy to steer, but bosses can catch you! (press S to switch)' : 'Slow mode off: full speed!';
}
slowBtn.addEventListener('click', () => { toggleSlow(); slowBtn.blur(); });
addEventListener('keydown', (e) => { if ((e.key === 's' || e.key === 'S') && !e.repeat) toggleSlow(); });
refreshSlow();
const repaintMachines = () => applyMachineLooks(snake.treadLvl, snake.woodLvl);
repaintMachines();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(repaintMachines);
