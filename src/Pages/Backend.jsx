// Backend.jsx
import { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import PasswordReset from "./PasswordReset";
import { useNavigate } from "react-router-dom";

//
//
//
// Firebase Authentication Logic
//
export const useFirebaseAuth = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the subscription when the component is unmounted
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { user, handleLogout };
};





// Firebase Registration Logic
// Basicly this const is exported to whatever page we need and the functions
// inside can be freely used.

export const useFirebaseRegister = () => { // MAIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkDuplicateEmail = async (email) => {
    const usersCollection = collection(firestore, "Users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleGoogleRegister = async () => { // HANDLE GOOGLE REGISTER
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };

  const handleFacebookRegister = async () => { // HANDLE FACEBOOK REGISTER
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      // ...
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    loading,
    setLoading,
    handleGoogleRegister,
    handleFacebookRegister,
  };
};





// Firebase Login Logic
// Basicly this const is exported to whatever page we need and the functions
// inside can be freely used.

// Firebase Login Logic
export const useFirebaseLogin = () => {  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [authing, setAuthing] = useState(false);
  
    const handleLogin = async () => {
      // Your existing login logic here...
    };
  
    const handleLogingoogle = async () => {
      setAuthing(true);
  
      try {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        const authUser = result.user;
  
        await handleAuthUser(authUser);
  
        // Redirect after a successful login
        navigate('/');
      } catch (error) {
        console.log(error);
        setAuthing(false);
      }
    };
  
    const handleLoginFacebook = async () => {
      setAuthing(true);
  
      try {
        const result = await signInWithPopup(auth, new FacebookAuthProvider());
        const authUser = result.user;
  
        await handleAuthUser(authUser);
  
        // Redirect after a successful login
        navigate('/');
      } catch (error) {
        console.log(error);
        setAuthing(false);
      }
    };
  
    const handleAuthUser = async (authUser) => {
      // Your existing auth user logic here...
    };
  
    const handleLogout = async () => {
      // Your existing logout logic here...
    };
  
    return {
      email,
      setEmail,
      password,
      setPassword,
      error,
      setError,
      loggedInUser,
      setLoggedInUser,
      authing,
      setAuthing,
      handleLogin,
      handleLogingoogle,
      handleLoginFacebook,
      handleAuthUser,
      handleLogout,
    };
  };
