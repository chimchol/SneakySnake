// ---------- How the machines look at each upgrade level ----------
const treadBadge = badge(), woodBadge = badge();
treadBadge.s.position.set(TREAD.x, 3.4, TREAD.z - TREAD.l / 2);
woodBadge.s.position.set(WOOD.x, 0.4 + WOOD.h + 1.6, WOOD.z);
function applyMachineLooks(treadLvl, woodLvl) {
  const PIXIE_T = { name: 'Pixie Magic', body: 0x2a1a5a, trim: 0x5af0ff, screen: '#5af0ff', text: '#7a3ab8', glow: 0x3a1a8a };
  const t = pixieBoost ? PIXIE_T : TREAD_TIERS[Math.min(treadLvl - 1, TREAD_TIERS.length - 1)];
  treadBody.color.set(t.body); treadTrim.color.set(t.trim);
  treadTrim.emissive.set(t.glow || 0x000000); treadBody.emissive.set(t.glow ? 0x1a0830 : 0x000000);
  treadBody.shininess = t.shiny ? 100 : 30; treadBody.specular.set(t.shiny ? 0xffffff : 0x111111);
  const sx = screenCanvas.getContext('2d');
  sx.fillStyle = '#10141a'; sx.fillRect(0, 0, 128, 32);
  sx.fillStyle = t.screen; sx.font = 'bold 20px "Lilita One", monospace'; sx.textAlign = 'center'; sx.textBaseline = 'middle';
  sx.fillText('+' + short(treadGain(treadLvl)) + ' SPEED/SEC', 64, 17); screenTex.needsUpdate = true;
  drawBadge(treadBadge, pixieBoost ? 'PIXIE MAGIC' : treadLvl >= MAX_LVL ? 'MAX LEVEL' : 'Level ' + treadLvl, t.name + ' treadmill', t.text);

  const PIXIE_W = { name: 'Pixie Magic', bark: 0x5a3aa8, cut: 0x5af0ff, stand: 0x2a1a5a, text: '#7a3ab8', shiny: true, glow: 0x2a1060 };
  const w = pixieBoost ? PIXIE_W : WOOD_TIERS[Math.min(woodLvl - 1, WOOD_TIERS.length - 1)];
  woodBark.color.set(w.bark); woodCut.color.set(w.cut); woodStand.color.set(w.stand);
  woodBark.shininess = w.shiny ? 90 : 10; woodBark.specular.set(w.shiny ? 0xffffff : 0x111111);
  woodBark.emissive.set(w.glow || 0x000000);
  drawBadge(woodBadge, pixieBoost ? 'PIXIE MAGIC' : woodLvl >= MAX_LVL ? 'MAX LEVEL' : 'Level ' + woodLvl, w.name + ' log', w.text);
  rainbowTread = !!t.rainbow; rainbowWood = !!w.rainbow;
}
// The top skin (Rainbow) keeps cycling through every color
let rainbowTread = false, rainbowWood = false;
worldTicks.push((dt, t) => {
  if (rainbowTread) { treadBody.color.setHSL((t * 0.1) % 1, 0.7, 0.55); treadTrim.color.setHSL((t * 0.1 + 0.5) % 1, 0.8, 0.6); }
  if (rainbowWood) { woodBark.color.setHSL((t * 0.1) % 1, 0.7, 0.55); woodCut.color.setHSL((t * 0.1 + 0.3) % 1, 0.8, 0.7); woodStand.color.setHSL((t * 0.1 + 0.6) % 1, 0.6, 0.5); }
});
