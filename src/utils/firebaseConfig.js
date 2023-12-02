// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCowIatABdqg_BE9pL8agbVzVGSthVrmA",
  authDomain: "auth-smartagenda.firebaseapp.com",
  projectId: "auth-smartagenda",
  storageBucket: "auth-smartagenda.appspot.com",
  messagingSenderId: "750146540269",
  appId: "1:750146540269:web:901b13997733ef8c4b32e4",
  measurementId: "G-XDYWFX5173"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();