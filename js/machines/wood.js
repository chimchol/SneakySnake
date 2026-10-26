// ---------- Spinning wood ----------
const barkCanvas = document.createElement('canvas'); barkCanvas.width = 64; barkCanvas.height = 64;
const kc = barkCanvas.getContext('2d');
kc.fillStyle = '#ffffff'; kc.fillRect(0, 0, 64, 64);
kc.fillStyle = '#b4b4b4'; for (let i = 0; i < 8; i++) kc.fillRect(i * 8 + 2, 0, 3, 64);
const barkTex = new THREE.CanvasTexture(barkCanvas); barkTex.wrapS = barkTex.wrapT = THREE.RepeatWrapping; barkTex.repeat.set(3, 2);
const woodBark = new THREE.MeshPhongMaterial({ map: barkTex, color: 0x8a5a2b, shininess: 10 });
const woodCut = new THREE.MeshPhongMaterial({ color: 0xe9c48a, shininess: 10 });
const woodStand = new THREE.MeshPhongMaterial({ color: 0x8c8a93, shininess: 20 });
const woodSpin = new THREE.Group();
(function buildWood() {
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.5, 0.4, 24), woodStand);
  stand.position.set(WOOD.x, 0.2, WOOD.z); stand.receiveShadow = true; stand.castShadow = true; scene.add(stand);
  const log = new THREE.Mesh(new THREE.CylinderGeometry(WOOD.r, WOOD.r, WOOD.h, 20), [woodBark, woodCut, woodCut]);
  log.position.y = 0.4 + WOOD.h / 2; log.castShadow = true; woodSpin.add(log);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.05, 6, 20), mat(0xc29a62));
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.4 + WOOD.h + 0.01; woodSpin.add(ring);
  woodSpin.position.set(WOOD.x, 0, WOOD.z); scene.add(woodSpin);
})();
const nearWood = (x, z) => Math.hypot(x - WOOD.x, z - WOOD.z) < 2.2;
