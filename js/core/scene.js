const canvas = document.getElementById('game');
// ---------- Renderer & scene ----------
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();

const bg = document.createElement('canvas'); bg.width = 2; bg.height = 256;
const g = bg.getContext('2d'); const grad = g.createLinearGradient(0, 0, 0, 256);
grad.addColorStop(0, '#5fb6ea'); grad.addColorStop(0.45, '#bfe6f7'); grad.addColorStop(0.62, '#8a6fc4'); grad.addColorStop(1, '#2a1846');
g.fillStyle = grad; g.fillRect(0, 0, 2, 256);
scene.background = new THREE.CanvasTexture(bg);
scene.fog = new THREE.Fog(0xbfe6f7, 70, 160);

const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 400);

const hemi = new THREE.HemisphereLight(0xeaf7ff, 0x6a5a3a, 0.75);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff3d6, 0.9);
sun.position.set(25, 40, 15);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
const sc = sun.shadow.camera; sc.left = -45; sc.right = 45; sc.top = 45; sc.bottom = -45; sc.far = 120;
scene.add(sun);

const mat = (c) => new THREE.MeshLambertMaterial({ color: c });

const worldTicks = []; // little animations for the world (embers, lava glow)
