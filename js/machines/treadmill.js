// ---------- Treadmill ----------
const beltCanvas = document.createElement('canvas'); beltCanvas.width = 64; beltCanvas.height = 64;
const bc = beltCanvas.getContext('2d');
bc.fillStyle = '#2b2b33'; bc.fillRect(0, 0, 64, 64);
bc.fillStyle = '#4a4a56'; bc.fillRect(0, 0, 64, 12);
const beltTex = new THREE.CanvasTexture(beltCanvas);
beltTex.wrapS = beltTex.wrapT = THREE.RepeatWrapping; beltTex.repeat.set(1, 8);
// Shared materials so upgrades can repaint the machines
const treadBody = new THREE.MeshPhongMaterial({ color: 0x39404a, shininess: 30 });
const treadTrim = new THREE.MeshPhongMaterial({ color: 0xf6c23e, shininess: 60 });
const screenCanvas = document.createElement('canvas'); screenCanvas.width = 128; screenCanvas.height = 32;
const screenTex = new THREE.CanvasTexture(screenCanvas);
function badge() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 80;
  const tex = new THREE.CanvasTexture(c);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false }));
  s.scale.set(4, 1.25, 1); scene.add(s);
  return { c, tex, s };
}
function drawBadge(b, line1, line2, color) {
  const x = b.c.getContext('2d');
  x.clearRect(0, 0, 256, 80);
  x.fillStyle = '#fffbe9'; x.strokeStyle = '#2f5d2a'; x.lineWidth = 6;
  x.beginPath(); x.moveTo(20, 4); x.arcTo(252, 4, 252, 76, 18); x.arcTo(252, 76, 4, 76, 18); x.arcTo(4, 76, 4, 4, 18); x.arcTo(4, 4, 252, 4, 18); x.fill(); x.stroke();
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = color; x.font = 'bold 30px "Lilita One", "Trebuchet MS", sans-serif'; x.fillText(line1, 128, 30);
  x.fillStyle = '#1d3a1f'; x.font = 'bold 20px "Nunito", "Trebuchet MS", sans-serif'; x.fillText(line2, 128, 58);
  b.tex.needsUpdate = true;
}
(function buildTreadmill() {
  const t = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(TREAD.w + 0.6, 0.35, TREAD.l + 0.6), treadBody);
  base.position.y = 0.17; base.castShadow = true; base.receiveShadow = true; t.add(base);
  const belt = new THREE.Mesh(new THREE.PlaneGeometry(TREAD.w, TREAD.l), new THREE.MeshLambertMaterial({ map: beltTex }));
  belt.rotation.x = -Math.PI / 2; belt.position.y = 0.36; belt.receiveShadow = true; t.add(belt);
  [-1, 1].forEach((s) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, TREAD.l * 0.7), treadTrim);
    rail.position.set(s * (TREAD.w / 2 + 0.1), 1.3, -TREAD.l * 0.1); rail.castShadow = true; t.add(rail);
    const up = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.4, 0.2), treadBody);
    up.position.set(s * (TREAD.w / 2 + 0.1), 0.7, -TREAD.l / 2 + 0.3); t.add(up);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, TREAD.l + 0.62), treadTrim);
    stripe.position.set(s * (TREAD.w / 2 + 0.31), 0.2, 0); t.add(stripe);
  });
  const consoleBar = new THREE.Mesh(new THREE.BoxGeometry(TREAD.w + 0.4, 0.8, 0.3), treadBody);
  consoleBar.position.set(0, 1.6, -TREAD.l / 2 + 0.3); consoleBar.castShadow = true; t.add(consoleBar);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(TREAD.w * 0.7, 0.5), new THREE.MeshBasicMaterial({ map: screenTex }));
  screen.position.set(0, 1.6, -TREAD.l / 2 + 0.46); t.add(screen);
  t.position.set(TREAD.x, 0, TREAD.z); scene.add(t);
})();
const onTreadmill = (x, z) => Math.abs(x - TREAD.x) < TREAD.w / 2 && Math.abs(z - TREAD.z) < TREAD.l / 2;
