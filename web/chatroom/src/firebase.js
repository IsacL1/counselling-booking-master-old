import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPq3-Wcix-6xtA8V4jmAZmu2HES_WkO1Q",
  authDomain: "fyp-chatroom-ffe7b.firebaseapp.com",
  projectId: "fyp-chatroom-ffe7b",
  storageBucket: "fyp-chatroom-ffe7b.appspot.com",
  messagingSenderId: "710575606967",
  appId: "1:710575606967:web:a62da042c9be748453d132",
  measurementId: "G-SZQFMBHZH4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
