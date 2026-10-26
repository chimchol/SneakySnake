// ---------- Angels & Demons: who guards tonight ----------
// Half the nights the Angel, half the Demon. Rarely (1 in 8) both, but never within 5 nights of the last time.
const AD = { mode: 'angel', since: 0 };
try { const saved2 = JSON.parse(localStorage.getItem('sneaky-snake-ad') || 'null'); if (saved2 && saved2.mode) { AD.mode = saved2.mode; AD.since = saved2.since || 0; } else { AD.mode = Math.random() < 0.5 ? 'angel' : 'demon'; } } catch (e) {}
function rollAngelsDemons() {
  AD.since++;
  if (AD.since > 5 && Math.random() < 1 / 8) { AD.mode = 'both'; AD.since = 0; }
  else AD.mode = Math.random() < 0.5 ? 'angel' : 'demon';
  try { localStorage.setItem('sneaky-snake-ad', JSON.stringify(AD)); } catch (e) {}
  applyAngelsDemons();
}
function applyAngelsDemons() {
  angelBoss.off = AD.mode === 'demon';
  demonBoss.off = AD.mode === 'angel';
  [angelBoss, demonBoss].forEach((b) => {
    b.group.visible = !b.off;
    if (b.off) { b.state = 'sleep'; b.x = b.home.x; b.z = b.home.z; b.nests.forEach((n) => { if (n.mesh) scene.remove(n.mesh); n.mesh = null; n.egg = null; }); }
  });
}
applyAngelsDemons();
