/* ============================================
   EULER ACADEMY — Firebase Configuration
   ============================================
   
   HOW TO SET UP (5 minutes):
   1. Go to https://console.firebase.google.com
   2. Click "Add project" → name it "euler-academy" → Continue
   3. Disable Google Analytics (not needed) → Create project
   4. Click "Web" icon (</>)  → Register app → name it "euler-academy"
   5. Copy the firebaseConfig object and paste it below (replace the placeholder)
   6. In Firebase console → Build → Firestore Database → Create database
      → Start in TEST MODE → choose any region → Done
   7. In Firebase console → Build → Authentication → Get started
      → Sign-in method → Email/Password → Enable → Save
   
   That's it! The site will work for everyone from any device.
   ============================================ */

// ▼▼▼ PASTE YOUR FIREBASE CONFIG HERE ▼▼▼
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCbkicMzX7NQtKYgxB8nAMNFSPjVMRocgk",
  authDomain: "euler-academy-71fbb.firebaseapp.com",
  projectId: "euler-academy-71fbb",
  storageBucket: "euler-academy-71fbb.firebasestorage.app",
  messagingSenderId: "413796757126",
  appId: "1:413796757126:web:aba544e7b544d54e876b07"
};
// ▲▲▲ END OF CONFIG ▲▲▲

// Firebase SDK (loaded from CDN in each HTML file)
// This file just exports the config — db.js does the rest
window.FIREBASE_CONFIG = FIREBASE_CONFIG;
