// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhA8bieHgGmKGzHcrjrm-vEiMXX3f5zzE",
  authDomain: "my-secrets-62e59.firebaseapp.com",
  projectId: "my-secrets-62e59",
  storageBucket: "my-secrets-62e59.appspot.com",
  messagingSenderId: "778732615455",
  appId: "1:778732615455:web:0c6365d4b1c533f36be22a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };