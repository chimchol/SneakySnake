// Mystic skin: shiny purple with a glowing yellow aura
const aura = new THREE.Mesh(new THREE.SphereGeometry(1.3, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffe14a, transparent: true, opacity: 0.22, depthWrite: false }));
head.add(aura);
const auraLight = new THREE.PointLight(0xffe14a, 0, 7); head.add(auraLight);
worldTicks.push((dt, t) => { if (aura.visible) { aura.scale.setScalar(1 + Math.sin(t * 4) * 0.12); aura.material.opacity = 0.18 + Math.sin(t * 4) * 0.08; } });
const skinBtn = document.getElementById('skinBtn');
function applySkin() {
  const on = skinOwned && skinOn;
  bodyLight.color.set(on ? 0xa04aff : 0x5ccf3a); bodyLight.emissive.set(on ? 0x3a0a6a : 0x000000);
  bodyDark.color.set(on ? 0x6a1ad0 : 0x2f8f2a); bodyDark.emissive.set(on ? 0x2a0a4a : 0x000000);
  aura.visible = on; auraLight.intensity = on ? 1.6 : 0;
  skinBtn.hidden = !skinOwned; skinBtn.textContent = on ? '🐍 Skin: Mystic' : '🐍 Skin: Classic';
}
skinBtn.addEventListener('click', () => { skinOn = !skinOn; applySkin(); save(); skinBtn.blur(); });
applySkin();
