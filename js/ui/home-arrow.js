// ---------- Home arrow (shown while carrying an egg) ----------
const homeArrow = new THREE.Group();
(function () {
  const m = new THREE.MeshBasicMaterial({ color: 0xffe14a });
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.9, 4), m); tip.rotation.x = Math.PI / 2; tip.position.z = 0.9; homeArrow.add(tip);
  const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 1.0), m); shaft.position.z = 0.1; homeArrow.add(shaft);
  homeArrow.visible = false; scene.add(homeArrow);
})();
