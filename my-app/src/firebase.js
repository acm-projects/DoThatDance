import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBny6PCVgVeoYOsfgvXeJpZhC__GZGzhHE",
  authDomain: "auth-development-e650e.firebaseapp.com",
  projectId: "auth-development-e650e",
  storageBucket: "auth-development-e650e.appspot.com",
  messagingSenderId: "997481548398",
  appId: "1:997481548398:web:5212ced6132eb20d5fb47f",
  measurementId: "G-XLHJ2LLVGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;