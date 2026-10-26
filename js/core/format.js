// Short numbers for the chips (12.5K, 3.2M, 18B ...) so they always fit the same space
function short(n) {
  n = Math.floor(n);
  if (n < 10000) return n.toLocaleString();
  const units = ['K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc'];
  let u = -1;
  while (n >= 1000 && u < units.length - 1) { n /= 1000; u++; }
  return (n >= 100 ? Math.floor(n) : n.toFixed(1).replace(/\.0$/, '')) + units[u];
}
