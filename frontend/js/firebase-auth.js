import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7Oa6YUYE-0r3hk0PX07yTI_nqkS8xjg8",
  authDomain: "smart-shop-36f1a.firebaseapp.com",
  projectId: "smart-shop-36f1a",
  storageBucket: "smart-shop-36f1a.firebasestorage.app",
  messagingSenderId: "145944184401",
  appId: "1:145944184401:web:e919d8f5482c4a6c8d5a70",
  measurementId: "G-3C0WWNFRKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL
        };
    } catch (error) {
        console.error("Firebase Google Auth Error: ", error);
        throw error;
    }
}
