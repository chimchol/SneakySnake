// ---------- Egg album ----------
let found = [];
try { found = JSON.parse(localStorage.getItem('sneaky-snake-found') || '[]') || []; } catch (e) { found = []; }
penEggs.forEach((e) => { if (!found.includes(e.type)) found.push(e.type); });
function markFound(type) {
  if (found.includes(type)) return;
  found.push(type);
  try { localStorage.setItem('sneaky-snake-found', JSON.stringify(found)); } catch (e) {}
  pop('New in your album!', 'length', snake.x, 3.2, snake.z);
}
const albumEl = document.getElementById('album'), albumGrid = document.getElementById('albumGrid');
function drawAlbum() {
  albumGrid.innerHTML = '';
  bosses.forEach((b) => {
    const head = document.createElement('p'); head.className = 'album-zone';
    head.textContent = 'Zone ' + b.zone + ': ' + (b.zone === 12 ? '' : 'The ') + ISLANDS[b.zone].name + ' · Boss: ' + b.name;
    albumGrid.appendChild(head);
    const grid = document.createElement('div'); grid.className = 'album-cards';
    const list = eggsOfZone(b.zone, b.side).sort((x, y) => y.weight - x.weight);
    const total = list.reduce((sum, t) => sum + t.weight, 0);
    list.forEach((t, i) => {
      const card = document.createElement('div');
      card.className = 'egg-card' + (i >= list.length - 2 ? ' rare' : '');
      const pic = document.createElement('div'); pic.className = 'egg-pic'; pic.style.background = t.css;
      const name = document.createElement('b'); name.textContent = t.name;
      const pet = document.createElement('small'); pet.textContent = 'Hatches: ' + t.pet;
      const chance = document.createElement('small'); chance.textContent = Math.round(t.weight / total * 100) + '% of eggs · ' + t.coins.toLocaleString() + ' coins/sec';
      const f = document.createElement('span'); const got = found.includes(t.name);
      f.className = 'found' + (got ? '' : ' no'); f.textContent = got ? 'Found!' : 'Not found yet';
      card.append(pic, name, pet, chance, f);
      grid.appendChild(card);
    });
    albumGrid.appendChild(grid);
  });
}
document.getElementById('albumBtn').addEventListener('click', () => { drawAlbum(); albumEl.hidden = false; document.getElementById('albumClose').focus(); });
document.getElementById('albumClose').addEventListener('click', () => { albumEl.hidden = true; });
albumEl.addEventListener('click', (e) => { if (e.target === albumEl) albumEl.hidden = true; });
addEventListener('keydown', (e) => { if (e.key === 'Escape') albumEl.hidden = true; });
