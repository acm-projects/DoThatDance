import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAatJeC_vABK3i7V2E4elNnuWxcXFYernE",
  authDomain: "auth-project-9c474.firebaseapp.com",
  projectId: "auth-project-9c474",
  storageBucket: "auth-project-9c474.appspot.com",
  messagingSenderId: "666075808294",
  appId: "1:666075808294:web:ba44557035957c0b2b1ce7",
  measurementId: "G-JBX4JBE217"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;