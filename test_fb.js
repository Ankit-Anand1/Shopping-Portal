const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyA7Oa6YUYE-0r3hk0PX07yTI_nqkS8xjg8",
  authDomain: "smart-shop-36f1a.firebaseapp.com",
  projectId: "smart-shop-36f1a",
  storageBucket: "smart-shop-36f1a.firebasestorage.app",
  messagingSenderId: "145944184401",
  appId: "1:145944184401:web:e919d8f5482c4a6c8d5a70",
  measurementId: "G-3C0WWNFRKM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase Auth Initialized using Node.js");
