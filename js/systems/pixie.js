// ---------- The Pixie ----------
// Her 3 quests. Enchanted pets you already hatched before this count too.
const QUEST = { mystic: 0, enchanted: 0 };
try { Object.assign(QUEST, JSON.parse(localStorage.getItem('sneaky-snake-quest') || '{}')); } catch (e) {}
if (!QUEST.started) { QUEST.enchanted = penEggs.filter((e) => e.mut === 'Enchanted').length; QUEST.started = true; }
const saveQuest = () => { try { localStorage.setItem('sneaky-snake-quest', JSON.stringify(QUEST)); } catch (e) {} };
saveQuest();
function questBump(k) { const before = questsDone(); QUEST[k]++; saveQuest(); if (!before && questsDone()) setTimeout(() => { hintEl.textContent = '🧚 All of Pixie\'s quests are done! Go talk to her in the Mystical Forest!'; }, 1500); }
const questList = () => [
  { name: 'Steal 10 eggs from the Mystical Forest', have: QUEST.mystic, need: 10 },
  { name: 'Hatch 10 Enchanted pets', have: QUEST.enchanted, need: 10 },
  { name: 'Get 1 billion speed', have: snake.speedStat, need: 1e9 },
  { name: 'Get 1 billion length', have: snake.segments, need: 1e9 }
];
const questsDone = () => questList().every((q) => q.have >= q.need);
const pixieBox = document.getElementById('pixieBox');
function openPixie() {
  const ql = document.getElementById('questList'); ql.innerHTML = '';
  questList().forEach((q) => {
    const ok = q.have >= q.need;
    const d = document.createElement('div'); d.className = 'quest' + (ok ? ' done' : '');
    const n = document.createElement('b'); n.textContent = (ok ? '✅ ' : '⬜ ') + q.name;
    const bar = document.createElement('div'); bar.className = 'bar'; const fill = document.createElement('i'); fill.style.width = Math.min(100, q.have / q.need * 100) + '%'; bar.appendChild(fill);
    const t = document.createElement('small'); t.textContent = short(Math.min(q.have, q.need)) + ' / ' + short(q.need);
    d.append(n, bar, t); ql.appendChild(d);
  });
  document.getElementById('pixieSays').textContent = questsDone()
    ? '✨ You did it! My log is open for you... the parkour course is being built right now. Come back soon!'
    : 'Hi, little snake! Finish all my quests and I will open my log for you!';
  const enterBtn = document.getElementById('enterLog');
  enterBtn.hidden = !questsDone();
  if (questsDone()) document.getElementById('pixieSays').textContent = QUEST.claimed ? 'You already beat my parkour! You can play it again for fun.' : '✨ You did it! My log is open. Beat the parkour inside and the present is yours!';
  keys.ArrowUp = keys.ArrowDown = keys.ArrowLeft = keys.ArrowRight = false; pointerTarget = null;
  pixieBox.hidden = false; (questsDone() ? enterBtn : document.getElementById('pixieClose')).focus();
}
document.getElementById('pixieClose').addEventListener('click', () => { pixieBox.hidden = true; });
pixieBox.addEventListener('click', (e) => { if (e.target === pixieBox) pixieBox.hidden = true; });
addEventListener('keydown', (e) => { if (e.key === 'Escape') pixieBox.hidden = true; });
let nearPixie = false;
function checkPixie() {
  const near = Math.hypot(snake.x - PIXIE_SPOT.x, snake.z - PIXIE_SPOT.z) < 4;
  if (near && !nearPixie) { pop('Hello!', 'length', PIXIE_SPOT.x, 4.5, PIXIE_SPOT.z); if (!snake.carry) openPixie(); }
  nearPixie = near;
}
