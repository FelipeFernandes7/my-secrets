import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhA8bieHgGmKGzHcrjrm-vEiMXX3f5zzE",
  authDomain: "my-secrets-62e59.firebaseapp.com",
  databaseURL: "https://my-secrets-62e59-default-rtdb.firebaseio.com",
  projectId: "my-secrets-62e59",
  storageBucket: "my-secrets-62e59.appspot.com",
  messagingSenderId: "778732615455",
  appId: "1:778732615455:web:0c6365d4b1c533f36be22a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { db, auth, database };
