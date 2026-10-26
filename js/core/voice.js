// ---------- Game voice: reads important messages out loud ----------
let voiceOn = true;
try { voiceOn = localStorage.getItem('sneaky-snake-voice') !== '0'; } catch (e) {}
let lastSaid = '', lastSaidAt = 0;
function speakOut(text) {
  if (!voiceOn || !('speechSynthesis' in window)) return;
  const clean = String(text).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').trim();
  if (!clean) return;
  const nowT = performance.now();
  if (clean === lastSaid && nowT - lastSaidAt < 4000) return;
  lastSaid = clean; lastSaidAt = nowT;
  try {
    const u = new SpeechSynthesisUtterance(clean);
    u.rate = 1.08; u.pitch = 1.15; u.lang = 'en-US'; u.volume = 0.45; // quieter, so you can still hear Claude
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch (e) {}
}
const isTouch = matchMedia('(pointer: coarse)').matches;
const hintEl = document.getElementById('hint');
const hopBtn = document.getElementById('hop');
const FREE_HINT = isTouch ? 'Drag your finger to slither. Visit the treadmill and the wood!' : 'Arrow keys or mouse to slither. Visit the treadmill and the wood!';
hintEl.textContent = FREE_HINT;
// Speak the hint whenever it changes to something important
new MutationObserver(() => {
  const t = hintEl.textContent;
  if (t === FREE_HINT || /^(Running!|Wrapping!)/.test(t)) return;
  speakOut(t);
}).observe(hintEl, { childList: true, characterData: true, subtree: true });
const voiceBtn = document.getElementById('voiceBtn');
function refreshVoice() { voiceBtn.textContent = voiceOn ? '🔊 Voice: on' : '🔇 Voice: off'; voiceBtn.setAttribute('aria-pressed', voiceOn ? 'true' : 'false'); }
voiceBtn.addEventListener('click', () => {
  voiceOn = !voiceOn; refreshVoice();
  try { localStorage.setItem('sneaky-snake-voice', voiceOn ? '1' : '0'); } catch (e) {}
  if (voiceOn) speakOut('Voice is on!'); else if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  voiceBtn.blur();
});
refreshVoice();
