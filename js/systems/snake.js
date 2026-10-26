// ---------- The snake ----------
const bodyLight = mat(0x5ccf3a), bodyDark = mat(0x2f8f2a);
const head = new THREE.Group();
const skull = new THREE.Mesh(new THREE.SphereGeometry(0.62, 20, 16), bodyLight);
skull.scale.set(1, 0.8, 1.25); skull.castShadow = true; head.add(skull);
const eyeW = new THREE.SphereGeometry(0.2, 12, 10), eyeB = new THREE.SphereGeometry(0.11, 10, 8);
[-1, 1].forEach((s) => {
  const w = new THREE.Mesh(eyeW, mat(0xffffff)); w.position.set(0.3 * s, 0.32, 0.42); head.add(w);
  const b = new THREE.Mesh(eyeB, mat(0x111111)); b.position.set(0.33 * s, 0.36, 0.56); head.add(b);
});
const tongue = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.5), mat(0xe8364f));
tongue.position.set(0, -0.05, 0.9); head.add(tongue);
scene.add(head);

const segMeshes = [];
const segGeo = new THREE.SphereGeometry(0.5, 14, 10);
const shownSegs = () => Math.min(snake.segments, MAX_SEG);
function buildBody() {
  while (segMeshes.length < shownSegs()) {
    const i = segMeshes.length;
    const m = new THREE.Mesh(segGeo, i % 3 === 1 ? bodyDark : bodyLight);
    m.castShadow = true; scene.add(m); segMeshes.push(m);
  }
}
buildBody();

let trail = [];
function resetTrail(x, z, heading) {
  trail = [];
  const n = Math.ceil((shownSegs() + 4) * snake.spacing / 0.08);
  for (let i = 0; i < n; i++) trail.push({ x: x - Math.sin(heading) * i * 0.08, z: z - Math.cos(heading) * i * 0.08 });
}
resetTrail(0, 0, Math.PI);
