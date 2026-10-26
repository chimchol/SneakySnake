// ---------- Spawn island ----------
const grass = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 1, 64), mat(0x6cc24a));
grass.position.y = -0.5; grass.receiveShadow = true; scene.add(grass);
const dirt = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.2, R * 0.85, 4, 64), mat(0x8a5a34));
dirt.position.y = -3; scene.add(dirt);
const rock = new THREE.Mesh(new THREE.ConeGeometry(R * 0.85, 22, 32), mat(0x6b5a6e));
rock.position.y = -16; rock.rotation.x = Math.PI; scene.add(rock);

const tufts = new THREE.InstancedMesh(new THREE.ConeGeometry(0.15, 0.5, 4), mat(0x4f9f36), 500);
const m4 = new THREE.Matrix4();
for (let i = 0; i < 500; i++) {
  const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * (R - 1);
  m4.makeTranslation(Math.cos(a) * r, 0.2, Math.sin(a) * r); tufts.setMatrixAt(i, m4);
}
scene.add(tufts);

function tree(x, z, s) {
  const t = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3 * s, 0.4 * s, 2 * s, 8), mat(0x7a4a26));
  trunk.position.y = s; trunk.castShadow = true; t.add(trunk);
  const top = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6 * s, 0), mat(0x3d9a3a));
  top.position.y = 2.6 * s; top.castShadow = true; t.add(top);
  t.position.set(x, 0, z); scene.add(t);
}
for (let i = 0; i < 14; i++) {
  const a = (i / 14) * Math.PI * 2 + 0.3;
  if (Math.abs(a - Math.PI * 1.5) < 0.35) continue;
  const r = R - 3 - Math.random() * 3;
  tree(Math.cos(a) * r, Math.sin(a) * r, 0.9 + Math.random() * 0.5);
}
