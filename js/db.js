/* ============================================
   EULER ACADEMY — Database (Firebase Firestore)
   ============================================ */

// Firebase instances (set after init)
let _db = null;
let _auth = null;

// ---- INIT ----
async function initFirebase() {
  if (_db) return; // already initialized
  firebase.initializeApp(window.FIREBASE_CONFIG);
  _db = firebase.firestore();
  _auth = firebase.auth();
}

// ---- HELPERS ----
function db() { return _db; }
function auth() { return _auth; }

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ---- AUTH ----
const AUTH_DB = {
  // Sign in with email/password (used for admin & teachers)
  async signIn(email, password) {
    return _auth.signInWithEmailAndPassword(email, password);
  },
  async signOut() {
    return _auth.signOut();
  },
  currentUser() {
    return _auth.currentUser;
  },
  onAuthChange(cb) {
    return _auth.onAuthStateChanged(cb);
  }
};

// ---- USERS (Firestore collection: users) ----
const USERS_DB = {
  async get(uid) {
    const doc = await db().collection('users').doc(uid).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },
  async create(uid, data) {
    await db().collection('users').doc(uid).set({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
  },
  async update(uid, data) {
    await db().collection('users').doc(uid).update(data);
  }
};

// ---- SUBJECTS (Firestore collection: subjects) ----
const SUBJECTS_DB = {
  async getAll() {
    const snap = await db().collection('subjects').orderBy('createdAt', 'asc').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async add(data) {
    const ref = await db().collection('subjects').add({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    return ref.id;
  },
  async update(id, data) {
    await db().collection('subjects').doc(id).update(data);
  },
  async delete(id) {
    await db().collection('subjects').doc(id).delete();
  },
  onSnapshot(cb) {
    return db().collection('subjects').orderBy('createdAt', 'asc').onSnapshot(snap => {
      cb(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }
};

// ---- TEACHERS (Firestore collection: teachers) ----
const TEACHERS_DB = {
  async getAll() {
    const snap = await db().collection('teachers').orderBy('createdAt', 'asc').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async get(id) {
    const doc = await db().collection('teachers').doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },
  async add(data) {
    const ref = await db().collection('teachers').add({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    return ref.id;
  },
  async update(id, data) {
    await db().collection('teachers').doc(id).update(data);
  },
  async delete(id) {
    await db().collection('teachers').doc(id).delete();
  },
  onSnapshot(cb) {
    return db().collection('teachers').orderBy('createdAt', 'asc').onSnapshot(snap => {
      cb(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }
};

// ---- SLOTS (Firestore collection: slots) ----
const SLOTS_DB = {
  async getByTeacher(teacherId) {
    const snap = await db().collection('slots').where('teacherId', '==', teacherId).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async getAll() {
    const snap = await db().collection('slots').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async add(teacherId, day, time) {
    const ref = await db().collection('slots').add({ teacherId, day, time, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    return ref.id;
  },
  async delete(id) {
    await db().collection('slots').doc(id).delete();
  }
};

// ---- MEET LINKS (Firestore collection: meetLinks) ----
const MEET_DB = {
  async save(teacherId, slotId, date, link) {
    const key = `${teacherId}_${slotId}_${date}`;
    await db().collection('meetLinks').doc(key).set({ teacherId, slotId, date, link, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
  },
  async get(teacherId, slotId, date) {
    const key = `${teacherId}_${slotId}_${date}`;
    const doc = await db().collection('meetLinks').doc(key).get();
    return doc.exists ? doc.data() : null;
  },
  async getByTeacher(teacherId) {
    const snap = await db().collection('meetLinks').where('teacherId', '==', teacherId).get();
    return snap.docs.map(d => d.data());
  }
};

// ---- ENROLLMENTS (Firestore collection: enrollments) ----
const ENROLL_DB = {
  async getAll() {
    const snap = await db().collection('enrollments').orderBy('createdAt', 'desc').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async getByTeacher(teacherId) {
    const snap = await db().collection('enrollments').where('teacherId', '==', teacherId).orderBy('createdAt', 'desc').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async add(data) {
    const ref = await db().collection('enrollments').add({
      ...data,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return ref.id;
  },
  async updateStatus(id, status) {
    await db().collection('enrollments').doc(id).update({ status, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
  },
  async delete(id) {
    await db().collection('enrollments').doc(id).delete();
  },
  onSnapshot(cb) {
    return db().collection('enrollments').orderBy('createdAt', 'desc').onSnapshot(snap => {
      cb(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }
};

// ---- ACADEMY INFO (Firestore: single doc "settings/academy") ----
const SETTINGS_DB = {
  async get() {
    const doc = await db().collection('settings').doc('academy').get();
    if (doc.exists) return doc.data();
    // defaults
    return {
      name: 'Euler Academy',
      tagline: { en: 'Where Knowledge Meets Excellence', ka: 'სადაც ცოდნა ბრწყინავს' },
      description: {
        en: 'Euler Academy is a premier educational institution dedicated to nurturing young minds through personalized teaching and a passion for learning.',
        ka: 'ეილერის აკადემია არის საგანმანათლებლო დაწესებულება, რომელიც ეძღვნება ახალგაზრდა გონებების განვითარებას.'
      },
      address: { en: 'Tbilisi, Georgia', ka: 'თბილისი, საქართველო' },
      email: 'info@euleracademy.ge',
      phone: '+995 555 000 000',
      coverImage: ''
    };
  },
  async save(data) {
    await db().collection('settings').doc('academy').set(data, { merge: true });
  }
};

// ---- LOADING OVERLAY ----
function showLoading(msg = 'Loading...') {
  let el = document.getElementById('global-loading');
  if (!el) {
    el = document.createElement('div');
    el.id = 'global-loading';
    el.style.cssText = 'position:fixed;inset:0;background:rgba(255,255,255,0.85);backdrop-filter:blur(4px);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem';
    el.innerHTML = `<div style="width:40px;height:40px;border:3px solid #e2ddd6;border-top-color:#2563a8;border-radius:50%;animation:spin 0.8s linear infinite"></div><p style="font-family:DM Sans,sans-serif;color:#6b6560;font-size:0.9rem">${msg}</p><style>@keyframes spin{to{transform:rotate(360deg)}}</style>`;
    document.body.appendChild(el);
  } else {
    el.querySelector('p').textContent = msg;
    el.style.display = 'flex';
  }
}
function hideLoading() {
  const el = document.getElementById('global-loading');
  if (el) el.style.display = 'none';
}

// ---- FIREBASE READY CHECK ----
async function waitForFirebase() {
  showLoading('Connecting...');
  await initFirebase();
  hideLoading();
}
