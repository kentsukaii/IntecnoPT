// Backend.jsx
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase"; // import firestore from your firebase file
import { useNavigate } from "react-router-dom";
import { setDoc } from "firebase/firestore"; 














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
  const [authing, setAuthing] = useState(false);
  const navigate = useNavigate();

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

  const handleRegister = async () => {
    try {
      setLoading(true);


      const passwordRequirements = [
        {
          test: (password) => password.length >= 12,
          message: "Password must be at least 12 characters long",
        },
        {
          test: (password) => /[A-Z]/.test(password),
          message: "Password must contain at least one uppercase letter",
        },
        {
          test: (password) => /[a-z]/.test(password),
          message: "Password must contain at least one lowercase letter",
        },
        {
          test: (password) => /[0-9]/.test(password),
          message: "Password must contain at least one number",
        },
        {
          test: (password) => /[^A-Za-z0-9]/.test(password),
          message: "Password must contain at least one special character",
        },
      ];

      for (let requirement of passwordRequirements) {
        if (!requirement.test(password)) {
          setError(requirement.message);
          return;
        }
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!isValidEmailFormat(email)) {
        setError("Invalid email format");
        return;
      }

      const emailExistsInDatabase = await checkDuplicateEmail(email);
      if (emailExistsInDatabase) {
        setError("Email already exists");
        return;
      }

      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(authUser.user);
      const displayName = email.split("@")[0];
      await updateProfile(authUser.user, { displayName });
      const usersCollection = collection(firestore, "Users");
      const userData = {
        displayName: displayName,
        email: authUser.user.email,
        Address: "",
        Name: "",
        Phone_number: "",
        dateofbirth: "",
      };
      await addDoc(usersCollection, userData);

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(null);
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }; //dwdwdwd

  const handleGoogleRegister = async () => { // HANDLE GOOGLE REGISTER
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

  const handleFacebookRegister = async () => { // HANDLE FACEBOOK REGISTER
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
    // Check if the user already exists in the Users collection
    const usersCollection = collection(firestore, 'Users');
    const userQuery = query(usersCollection, where('email', '==', authUser.email));
    const userQuerySnapshot = await getDocs(userQuery);

    if (userQuerySnapshot.empty) {
      // Send email verification
      authUser.emailVerified = false;
      await sendEmailVerification(authUser);

      // If the user doesn't exist, add them to the Users collection
      const userData = {
        displayName: authUser.displayName,
        email: authUser.email,
        Address: "",
        Name: "",
        Phone_number: "",
        dateofbirth: "",
      };
      await addDoc(usersCollection, userData);
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
    handleRegister,
  };
};





// Firebase Login Logic
// Basicly this const is exported to whatever page we need and the functions
// inside can be freely used.

// Firebase Login Logic
export const useFirebaseLogin = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authing, setAuthing] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState("");

  const [userProfile, setUserProfile] = useState(null);



  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setLoggedInUser(userCredential);
      setError(null); // Clear any previous errors

      // Do something with profileInfo...
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setLoggedInUser(null);
    }
  };
  
  const handleLogingoogle = async () => {
    setAuthing(true);
  
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const authUser = result.user;
  
      await handleAuthUser(authUser);
      
      // Do something with profileInfo...
  
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
    // Check if the user already exists in the Users collection
    const usersCollection = collection(firestore, 'Users');
    const userQuery = query(usersCollection, where('email', '==', authUser.email));
    const userQuerySnapshot = await getDocs(userQuery);

    if (userQuerySnapshot.empty) {
      // Send email verification
      authUser.emailVerified = false;
      await sendEmailVerification(authUser);

      // If the user doesn't exist, add them to the Users collection
      const userData = {
        email: authUser.email,
        Address: "",
        Name: "",
        Phone_number: "",
        displayName: authUser.displayName,
        dateofbirth: "",
      };
      await addDoc(usersCollection, userData);
    }
  };

  const handleLogout = async () => {
    try {
      // Sign out the user
      await signOut(auth);
      setLoggedInUser(null);
      navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError(null); // Clear any previous errors
      alert('A password reset email has been sent to your email address. Please check your inbox.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };


  const handlePasswordReset = () => {
    setShowPasswordReset(true);
  };

  const handlePasswordResetComplete = () => {
    setShowPasswordReset(false);
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
    handlePasswordReset,
    handlePasswordResetComplete,
    handleResetPassword,
  };
};


const usersCollection = collection(firestore, 'Users'); // use firestore to create the usersCollection

export const getUserData = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No user is currently signed in');
  }

  console.log('Current user ID:', user.uid);  // Log the user ID

  // Get the user document from Firestore
  const userDocRef = doc(usersCollection, user.uid);
  let userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    // The document does not exist, create it
    await setDoc(userDocRef, {
      displayName: user.displayName,
      email: user.email,
      // Add other fields as needed
    });

    // Fetch the document again
    userDoc = await getDoc(userDocRef);
  }

  console.log('User document data:', userDoc.data());  // Log the document data

  const userData = userDoc.data();

  // Split the displayName into firstName and lastName
  let firstName = userData.displayName;
  let lastName = '';

  const nameParts = userData.displayName.split(' ');
  if (nameParts.length > 1) {
    firstName = nameParts[0];
    lastName = nameParts.slice(1).join(' ');
  }

  return {
    email: user.email,
    firstName,
    lastName,
    dateOfBirth: userData.dateofbirth, // Add this line
    // Add other fields as needed
  };
};
