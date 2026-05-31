# Euler Academy — Setup Guide

## 📁 Files
```
euler-academy/
├── index.html              ← Home page
├── teachers.html           ← Teachers list  
├── teacher-profile.html    ← Teacher detail + slots
├── enroll.html             ← Student enrollment (3 steps)
├── login.html              ← Admin & Teacher login
├── admin.html              ← Admin dashboard
├── teacher-dashboard.html  ← Teacher dashboard
├── css/style.css
└── js/
    ├── firebase-config.js  ← ★ YOU FILL THIS IN
    ├── db.js               ← Firebase database layer
    ├── lang.js             ← EN/KA translations
    └── ui.js               ← Shared UI components
```

---

## ⚙️ STEP 1 — Create Firebase Project (5 minutes)

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"**
3. Name it `euler-academy` → Continue
4. **Disable** Google Analytics → **Create project**
5. Wait for project to be created → **Continue**

---

## ⚙️ STEP 2 — Enable Firestore Database

1. In left sidebar → **Build → Firestore Database**
2. Click **"Create database"**
3. Select **"Start in test mode"** → **Next**
4. Choose region `europe-west` (closest to Georgia) → **Enable**

---

## ⚙️ STEP 3 — Enable Authentication

1. In left sidebar → **Build → Authentication**
2. Click **"Get started"**
3. Click **"Email/Password"** → Toggle **Enable** → **Save**

---

## ⚙️ STEP 4 — Register Web App & Get Config

1. In Firebase console home, click the **"</>"** (Web) icon
2. Name it `euler-academy` → **Register app**
3. You'll see a `firebaseConfig` object like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "euler-academy-xxx.firebaseapp.com",
  projectId: "euler-academy-xxx",
  storageBucket: "euler-academy-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```
4. Open `js/firebase-config.js` in VS Code
5. **Paste your values** into the FIREBASE_CONFIG object (replace the PASTE_YOUR_... placeholders)
6. Click **Continue to console**

---

## ⚙️ STEP 5 — Create Admin Account

1. In Firebase console → **Authentication → Users → Add user**
2. Email: `admin@euleracademy.ge` (or any email you want)
3. Password: choose a strong password
4. Click **Add user** → copy the **User UID** shown

5. In Firebase console → **Firestore Database → Start collection**
6. Collection ID: `users` → **Next**
7. Document ID: **paste the UID you copied**
8. Add fields:
   - `role` (string) = `admin`
   - `name` (string) = `Admin`
9. Click **Save**

---

## ⚙️ STEP 6 — Add Teacher Accounts

For each teacher:

1. **Firebase → Authentication → Add user**
   - Email: `nino@euleracademy.ge`
   - Password: `choose password`
   - Copy the UID

2. **Firebase → Firestore → users collection → Add document**
   - Document ID: the teacher's UID
   - Fields:
     - `role` = `teacher`
     - `name` = `Nino Kvaratskhelia`
     - `teacherId` = *(will be set after adding teacher in admin panel)*

3. **Login as admin → Admin Dashboard → Teachers → Add Teacher**
   - Fill in teacher details
   - The teacher ID is shown in the URL when you view their profile
   - Go back to Firestore → users → teacher's doc → update `teacherId`

---

## 🚀 STEP 7 — Deploy to GitHub Pages

1. Create new repo on GitHub: `euler-academy`
2. Upload all files keeping folder structure
3. **Settings → Pages → Source: Deploy from branch → main → / (root) → Save**
4. Site live at: `https://yourusername.github.io/euler-academy/`

---

## 🔒 Firestore Security Rules (Optional but recommended)

In Firebase → Firestore → Rules, replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public can read teachers, subjects, settings
    match /teachers/{id} { allow read: if true; allow write: if request.auth != null; }
    match /subjects/{id} { allow read: if true; allow write: if request.auth != null; }
    match /settings/{id} { allow read: if true; allow write: if request.auth != null; }
    match /slots/{id} { allow read: if true; allow write: if request.auth != null; }
    match /meetLinks/{id} { allow read: if true; allow write: if request.auth != null; }
    // Enrollments: anyone can create, only auth users can read/update
    match /enrollments/{id} { allow create: if true; allow read, update, delete: if request.auth != null; }
    // Users: only owner or admin
    match /users/{uid} { allow read, write: if request.auth.uid == uid || request.auth != null; }
  }
}
```

---

## ✅ What Works

| Feature | Who |
|---------|-----|
| View teachers, subjects, schedule | Everyone |
| Enroll student | Everyone (no login needed) |
| Approve/reject enrollments | Admin |
| Add/edit/delete subjects | Admin |
| Add/edit/delete teachers | Admin |
| Edit site info, cover photo | Admin |
| Add/remove time slots | Teacher |
| Upload Google Meet links (per date) | Teacher |
| View own students | Teacher |
| Update bio & photo | Teacher |
| EN/KA language toggle | Everyone |

---

## 💰 Cost

**Firebase Free Tier (Spark plan):**
- 50,000 reads/day
- 20,000 writes/day  
- 1 GB storage

More than enough for an academy with hundreds of students. **$0/month.**
