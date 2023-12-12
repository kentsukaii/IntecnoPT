// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDLAeB-82QzQbCPpc076TOCXIqPkVFeln0",
  authDomain: "intecnopt.firebaseapp.com",
  projectId: "intecnopt",
  storageBucket: "intecnopt.appspot.com",
  messagingSenderId: "564679934361",
  appId: "1:564679934361:web:7ea150e7784bff1dee5308"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, firebaseConfig, storage }; // Add app to the exports
