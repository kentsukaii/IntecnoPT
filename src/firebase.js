import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLAeB-82QzQbCPpc076TOCXIqPkVFeln0",
  authDomain: "intecnopt.firebaseapp.com",
  projectId: "intecnopt",
  storageBucket: "intecnopt.appspot.com",
  messagingSenderId: "564679934361",
  appId: "1:564679934361:web:7ea150e7784bff1dee5308"
};

const getAllCollections = async () => {
  try {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    // Get a list of all collections
    const querySnapshot = await getDocs(collection(firestore, 'Users'));


    const collections = querySnapshot.docs.map((doc) => doc.id);
    console.log("Collections:", collections);
  } catch (error) {
    // Handle error
    console.error("Error getting collections:", error);
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, firebaseConfig };

getAllCollections();