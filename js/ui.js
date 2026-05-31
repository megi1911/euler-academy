/* ============================================
   EULER ACADEMY — UI Utilities
   ============================================ */

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

// ---- TOAST ----
function toast(msg, type = 'default') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const icons = { success:'✓', error:'✕', default:'ℹ' };
  t.innerHTML = `<span>${icons[type]||'ℹ'}</span> ${msg}`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ---- MODAL ----
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

// ---- CONFIRM ----
function confirmAction(message, onConfirm) {
  const existing = document.getElementById('confirm-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'confirm-modal';
  modal.className = 'modal-overlay open';
  modal.innerHTML = `<div class="modal" style="max-width:380px"><div class="modal-body" style="text-align:center;padding:2rem">
    <div style="font-size:2.5rem;margin-bottom:1rem">⚠️</div>
    <p style="font-size:1rem;color:var(--text);margin-bottom:1.5rem">${message}</p>
    <div style="display:flex;gap:.75rem;justify-content:center">
      <button class="btn btn-ghost" onclick="document.getElementById('confirm-modal').remove()">${LANG.t('cancel')}</button>
      <button class="btn btn-danger" id="confirm-yes">${LANG.t('yes')}</button>
    </div></div></div>`;
  document.body.appendChild(modal);
  document.getElementById('confirm-yes').onclick = () => { modal.remove(); onConfirm(); };
}

// ---- AVATAR ----
function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();
}
function avatarEl(name, photo, size=40) {
  if (photo) return `<img src="${photo}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;flex-shrink:0" alt="${name}">`;
  const colors = ['#2563a8','#16a34a','#d97706','#7c3aed','#db2777','#0891b2'];
  const color = colors[(name||'?').charCodeAt(0) % colors.length];
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color}20;color:${color};font-size:${size*.35}px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${getInitials(name)}</div>`;
}

// ---- IMAGE UPLOAD ----
function handleImageUpload(inputEl, callback) {
  if (!inputEl) return;
  inputEl.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2*1024*1024) { toast('Image too large (max 2MB)', 'error'); return; }
    const reader = new FileReader();
    reader.onload = ev => callback(ev.target.result);
    reader.readAsDataURL(file);
  });
}

// ---- NAVBAR ----
function buildNavbar(activePage, academyName) {
  const user = window._currentUser;
  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';
  return `<nav class="navbar">
    <a href="index.html" class="nav-logo">
      <div class="logo-icon">E</div>
      <span>${academyName || 'Euler Academy'}</span>
    </a>
    <div class="nav-links">
      <a href="index.html" class="${activePage==='home'?'active':''}">${LANG.t('home')}</a>
      <a href="teachers.html" class="${activePage==='teachers'?'active':''}">${LANG.t('teachers')}</a>
      <a href="enroll.html" class="${activePage==='enroll'?'active':''}">${LANG.t('enroll')}</a>
      ${isAdmin ? `<a href="admin.html" class="${activePage==='admin'?'active':''}">${LANG.t('dashboard')}</a>` : ''}
      ${isTeacher ? `<a href="teacher-dashboard.html" class="${activePage==='teacher'?'active':''}">${LANG.t('dashboard')}</a>` : ''}
    </div>
    <div class="nav-right">
      <div class="lang-toggle">
        <button class="lang-btn ${LANG.current==='en'?'active':''}" data-lang="en" onclick="LANG.set('en')">EN</button>
        <button class="lang-btn ${LANG.current==='ka'?'active':''}" data-lang="ka" onclick="LANG.set('ka')">KA</button>
      </div>
      ${user
        ? `<div style="display:flex;align-items:center;gap:8px">
             ${avatarEl(user.name,'',32)}
             <span style="font-size:.8rem;font-weight:500;color:var(--text-light)">${user.name}</span>
             <button class="btn btn-ghost btn-sm" onclick="doLogout()">${LANG.t('logout')}</button>
           </div>`
        : `<a href="login.html" class="btn btn-primary btn-sm">${LANG.t('login')}</a>`}
    </div>
  </nav>`;
}

async function doLogout() {
  await AUTH_DB.signOut();
  window._currentUser = null;
  localStorage.removeItem('euler_user');
  window.location.href = 'index.html';
}

// ---- TABS ----
function initTabs(containerEl) {
  if (!containerEl) return;
  containerEl.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      containerEl.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      containerEl.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = containerEl.querySelector('#'+btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// ---- SESSION (keep user in localStorage for page reloads) ----
window._currentUser = null;
try {
  const saved = localStorage.getItem('euler_user');
  if (saved) window._currentUser = JSON.parse(saved);
} catch {}

function saveUserSession(user) {
  window._currentUser = user;
  localStorage.setItem('euler_user', JSON.stringify(user));
}
function clearUserSession() {
  window._currentUser = null;
  localStorage.removeItem('euler_user');
}
