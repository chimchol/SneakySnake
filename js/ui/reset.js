// ---------- Reset (tap twice to be sure) ----------
const resetBtn = document.getElementById('reset');
let resetArmed = 0;
resetBtn.addEventListener('click', () => {
  if (performance.now() - resetArmed > 3000) {
    resetArmed = performance.now(); resetBtn.textContent = 'Tap again to reset'; resetBtn.classList.add('sure');
    setTimeout(() => { resetBtn.textContent = 'Reset game'; resetBtn.classList.remove('sure'); }, 3000);
    return;
  }
  resetArmed = 0; resetBtn.textContent = 'Reset game'; resetBtn.classList.remove('sure');
  snake.speedStat = 6; snake.segments = 12; snake.coins = 0; snake.treadLvl = 1; snake.woodLvl = 1;
  found = []; try { localStorage.removeItem('sneaky-snake-found'); } catch (e) {}
  reached = 0; try { localStorage.removeItem('sneaky-snake-reached'); } catch (e) {}
  QUEST.mystic = 0; QUEST.enchanted = 0; QUEST.claimed = false; saveQuest();
  pixieBoost = false; skinOwned = false; skinOn = true; applySkin(); trailTier = 0; motorTier = 0; refreshMotor(); repaintMachines(); if (snake.state === 'park') leaveParkour();
  if (night.on) dayBreaks(); night.t = 0; upBtn.hidden = true; repaintMachines();
  while (segMeshes.length > snake.segments) scene.remove(segMeshes.pop());
  loseEgg(); penEggs = []; savePen(); drawPen(); save();
  snake.state = 'free'; mustLeave = null; hopBtn.hidden = true; resetPole();
  snake.x = 0; snake.z = 0; snake.heading = Math.PI; head.rotation.set(0, Math.PI, 0); resetTrail(0, 0, Math.PI);
  bosses.forEach((b) => { b.state = 'home'; b.t = 0; });
  refreshHud(); hintEl.textContent = 'Fresh start! Speed 6, length 12.';
  resetBtn.blur();
});
