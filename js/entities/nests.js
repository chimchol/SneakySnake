// Nests on each island, guarded by the bosses
const nests = [];
(function buildNests() {
  const nestMat = mat(0x9a6a33), reedNest = mat(0xa8a050), sandNest = mat(0xc98d4a), jungleNest = mat(0x4a7a2a), lavaNest = new THREE.MeshLambertMaterial({ color: 0x4a2a2a, emissive: 0x5a1a00 }), snowNest = mat(0xbfe0f4), shellNest = mat(0xffd0e0), fernNest = mat(0x5a7a2a), starNest = new THREE.MeshLambertMaterial({ color: 0x8a6aff, emissive: 0x2a1a6a }), petalNest = mat(0xff9ec8), goldNest = new THREE.MeshPhongMaterial({ color: 0xd4a01a, shininess: 80, specular: 0xfff2b0 }), cloudNest = mat(0xffffff), hellNest = new THREE.MeshLambertMaterial({ color: 0x3a0a0a, emissive: 0x4a0a00 }), magicNest = new THREE.MeshLambertMaterial({ color: 0x3ae0c0, emissive: 0x0a4a40 });
  bosses.forEach((b) => {
    const count = [0, 5, 6, 7, 8, 7, 8, 8, 6, 9, 6, 9, 8, 9][b.zone];
    for (let i = 0; i < count; i++) {
      const spread = count >= 9 ? 2.8 : count >= 8 ? 2.5 : count >= 7 ? 2.2 : 1.9;
      const a = -spread / 2 + i * (spread / (count - 1));
      const nr = b.zone === 12 ? 6 : 7;
      const x = b.home.x + Math.sin(a) * nr, z = b.home.z + Math.cos(a) * nr;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.25, 8, 16), b.zone === 13 ? magicNest : b.zone === 12 ? (b.side === 'angel' ? cloudNest : hellNest) : b.zone === 11 ? goldNest : b.zone === 10 ? petalNest : b.zone === 9 ? starNest : b.zone === 8 ? fernNest : b.zone === 7 ? shellNest : b.zone === 6 ? snowNest : b.zone === 5 ? lavaNest : b.zone === 4 ? jungleNest : b.zone === 3 ? sandNest : b.zone === 2 ? reedNest : nestMat);
      ring.rotation.x = -Math.PI / 2; ring.position.set(x, 0.2, z); ring.castShadow = true; scene.add(ring);
      const nest = { x, z, zone: b.zone, side: b.side, boss: b, egg: null, mesh: null };
      nests.push(nest); b.nests.push(nest); fillNest(nest);
    }
  });
})();
function fillNest(nest) {
  nest.egg = rollEgg(nest.zone, nest.side);
  nest.mesh = makeEgg(nest.egg); nest.mesh.position.set(nest.x, 0.5, nest.z); scene.add(nest.mesh);
}
