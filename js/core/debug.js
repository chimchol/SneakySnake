// If something breaks, show it on screen so it can be reported
function showBug(msg) {
  let box = document.getElementById('bugBox');
  if (!box) {
    box = document.createElement('div'); box.id = 'bugBox';
    box.style.cssText = 'position:fixed;left:12px;right:12px;top:50%;transform:translateY(-50%);background:#fff3f0;color:#7a1a0a;border:3px solid #c0301a;border-radius:14px;padding:12px 14px;font:800 14px Nunito,system-ui,sans-serif;z-index:50;text-align:center';
    document.body.appendChild(box);
  }
  box.textContent = 'Oops! Something broke. Tell Claude this: ' + msg;
}
window.addEventListener('error', (e) => showBug((e.message || 'error') + ' (' + (e.filename || '').split('/').pop() + ' line ' + e.lineno + ')'));
