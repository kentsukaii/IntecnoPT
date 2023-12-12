import { createContext, useState, useContext, useEffect, useRef } from "react";
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
  fetchSignInMethodsForEmail,

} from "firebase/auth";
import { collection, addDoc, getDocs, query, where, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase"; // import firestore from your firebase file
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useQuery } from 'react-query';
import maguire from "../../assets/godmaguire.png";

//import axios from './axiosConfig';

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

      setUser(null);  // Set user to null
      navigate('/login');
      setProfilePicUrl(maguire);
      localStorage.setItem('profilePicUrl', maguire);

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
  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [number, setNumber] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [receiveNews, setReceiveNews] = useState(false);







  const checkDuplicateEmail = async (email) => {
    const usersCollection = collection(firestore, "Users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;

  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);

    // Only check password requirements if there is input
    if (password) {
      setLowercase(/[a-z]/.test(password));
      setUppercase(/[A-Z]/.test(password));
      setSpecialChar(/[^A-Za-z0-9]/.test(password));
      setNumber(/[0-9]/.test(password));
    } else {
      // Reset colors to default if there is no input
      setLowercase(false);
      setUppercase(false);
      setSpecialChar(false);
      setNumber(false);
    }
  };
  const isValidEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };


  const handleRegister = async () => {
    let errors = [];

    try {
      setLoading(true);

      if (!email || !password || !confirmPassword) {
        errors.push("All fields are required");
      }

      if (!termsAccepted) {
        errors.push("You must agree to the Terms and Conditions");
      }

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
          errors.push(requirement.message);
          continue;
        }
      }

      if (password !== confirmPassword) {
        errors.push("Passwords do not match");
      }

      if (!isValidEmailFormat(email)) {
        errors.push("Invalid email format");
      }

      const emailExistsInDatabase = await checkDuplicateEmail(email);

      if (emailExistsInDatabase) {
        errors.push("Email already exists");
      }

      if (errors.length > 0) {
        setError(errors.join("\n"));
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
        Phone_number: "",
        dateOfBirth: "",
      };
      await addDoc(usersCollection, userData);

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(null);
      navigate('/');
      window.location.reload();

    } catch (error) {
      console.error('Error registering user:', error.message);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);

    }
  };


  const handleGoogleRegister = async () => { // HANDLE GOOGLE REGISTER
    setAuthing(true);

    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const authUser = result.user;

      await handleAuthUser(authUser);

      // Redirect after a successful login
      navigate('/');
      window.location.reload()

    } catch (error) {
      console.log(error);
      setAuthing(false);
      window.location.reload()
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
      window.location.reload()

    } catch (error) {
      console.log(error);
      setAuthing(false);
      window.location.reload()
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
        Phone_number: "",
        dateOfBirth: "",
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
    handlePasswordChange,
    lowercase,
    uppercase,
    specialChar,
    number,
    termsAccepted,
    setTermsAccepted,
    receiveNews,
    setReceiveNews,
    authing,
    onAuthStateChanged,
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
  const [saveSession, setSaveSession] = useState(false);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);


  const handleCheckboxChange = () => {
    setSaveSession(!saveSession);
  };


  const checkEmailExists = async (email) => {
    const auth = getAuth();
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    const emailExistsInFirebaseAuth = signInMethods.length > 0;

    if (!emailExistsInFirebaseAuth) {
      const usersCollection = collection(firestore, 'Users');
      const userQuery = query(usersCollection, where('email', '==', email));
      const userQuerySnapshot = await getDocs(userQuery);
      return !userQuerySnapshot.empty;
    }

    return emailExistsInFirebaseAuth;
  };

  const isValidEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    console.log("Starting login process...");
    setAuthing(true);

    try {
      // Check if the email exists in the Users collection before signing in
      const emailExists = await checkEmailExists(email);
      console.log(`Email exists: ${emailExists}`);

      if (!emailExists) {
        setError('Email does not exist');
        return;
      }

      if (!isValidEmailFormat(email)) {
        setErrorh("Invalid email format");
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");
      console.log(`User ID: ${userCredential.user.uid}`); // Print the user's ID

      setLoggedInUser(userCredential);
      setError(null); // Clear any previous errors
      navigate('/');

      window.location.reload()

    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      errorMessage = errorMessage.replace('Firebase: ', ''); // Remove 'Firebase: ' prefix
      setError(errorMessage);
      setLoggedInUser(null);
      setAuthing(false);



    }
  };

  const deleteUser = async (user) => {
    try {
      await user.delete();
    } catch (error) {
      console.log(`Error deleting user: ${error}`);
    }
  };

  const handleLogingoogle = async () => {
    setAuthing(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(auth, provider);
      const authUser = result.user;

      // Check email existence asynchronously
      const emailExists = await checkEmailExists(authUser.email);

      if (!emailExists) {
        setError('Email does not exist');
        setAuthing(false);

        // Delete the user from Firebase Authentication
        await deleteUser(authUser);

        return; // Add this line
      }

      await handleAuthUser(authUser);

      // Redirect after a successful login
      navigate('/');

      window.location.reload()

    } catch (error) {
      console.log(error);
      setAuthing(false);
      window.location.reload()
    }
  };

  const handleLoginFacebook = async () => {
    setAuthing(true);

    try {
      const provider = new FacebookAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      const result = await signInWithPopup(auth, provider);
      const authUser = result.user;

      // Check email existence asynchronously
      const emailExists = await checkEmailExists(authUser.email);
      console.log('Email exists: ', emailExists);

      if (!emailExists) {
        setError('Email does not exist');
        setAuthing(false);

        // Delete the user from Firebase Authentication
        await deleteUser(authUser);

        return; // Add this line
      }

      await handleAuthUser(authUser);

      // Redirect after a successful login
      navigate('/');

      window.location.reload()
      localStorage.removeItem('profilePicUrl');

    } catch (error) {
      console.log(error);
      setAuthing(false);

      window.location.reload()
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      // User is signed in, get the user's email
      const email = user.email;

      // Delete the user account
      deleteUser(user).then(async () => {
        console.log('User account has been successfully deleted.');

        // Now you can delete the user's data from your database
        // Query the Users collection to find the document with the matching email
        const usersCollection = collection(firestore, 'Users');
        const userQuery = query(usersCollection, where('email', '==', email));
        const userQuerySnapshot = await getDocs(userQuery);

        // If a document with the matching email is found, delete it
        if (!userQuerySnapshot.empty) {
          const userDoc = doc(firestore, 'Users', userQuerySnapshot.docs[0].id);
          deleteDoc(userDoc).then(() => {
            console.log('User data has been successfully deleted from the database.');
          }).catch((error) => {
            console.error('Error deleting user data from the database: ', error);
          });
        }
        navigate('/login')
        localStorage.removeItem('profilePicUrl');
        setProfilePicUrl(maguire);
      }).catch((error) => {
        console.error('Error deleting user account: ', error);
      });
    } else {
      // No user is signed in, cannot delete account
      console.log('User needs to be signed in to delete account.');
    }
  };


  const handleAuthUser = async (authUser) => {
    // Check if the user already exists in the Users collection
    const usersCollection = collection(firestore, 'Users');
    const userQuery = query(usersCollection, where('email', '==', authUser.email));
    const userQuerySnapshot = await getDocs(userQuery);

    if (userQuerySnapshot.empty) {
      // If the user doesn't exist, redirect to the register page
      navigate('/register');
      window.location.reload()

    } else {
      // If the user exists, proceed as normal
      authUser.emailVerified = false;
      setLoggedInUser(authUser);
      // Add this line for debugging
      console.log('User exists, navigating to home page');
      navigate('/');
      window.location.reload()
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
    handlePasswordReset,
    handlePasswordResetComplete,
    handleResetPassword,
    showPasswordReset,
    setShowPasswordReset,
    saveSession,
    userProfile,
    setUserProfile,
    setSaveSession,
    handleCheckboxChange,
    onAuthStateChanged,
    checkEmailExists,
    handleDeleteAccount,
  };
};



export const getUserData = async () => {
  // Get the current user
  const user = getAuth().currentUser;


  if (user) {
    // Get the user's email
    const email = user.email;

    // Query for the user document where the email field matches the user's email
    const q = query(collection(firestore, "Users"), where("email", "==", email));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Get the first document from the query result (assuming email is unique)
    const userDocSnap = querySnapshot.docs[0];

    if (userDocSnap) {

      // Return the document data
      return userDocSnap.data();
    } else {
      throw new Error('No document found for the current user');
    }
  } else {
    throw new Error('No user signed in');
  };



};


export const ChangePicture = () => {
  const [profilePicUrl, setProfilePicUrl] = useState(localStorage.getItem('profilePicUrl') || maguire);
  const fileInputRef = useRef();
  const auth = getAuth();
  const storage = getStorage();

  const handleProfilePicClick = () => {

    fileInputRef.current.click();

  };

  const handleProfilePicChange = async (event) => {
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const file = event.target.files[0];

      // Create a storage reference
      const storageRef = ref(storage, 'ProfilePictures/' + uid);

      // Upload the file to the reference
      await uploadBytes(storageRef, file);

      // Get the download URL and update the user's profile picture
      const url = await getDownloadURL(storageRef);
      setProfilePicUrl(url);  // Update the profile picture URL

      // Store the URL in local storage
      localStorage.setItem('profilePicUrl', url);

      console.log('Profile picture has been successfully updated.');
      window.location.reload()
    } else {
      console.log('User needs to be signed in to change profile picture.');
    }
  };


  return {
    profilePicUrl,
    fileInputRef,
    handleProfilePicChange,
    handleProfilePicClick,
  };
};


/*
export const API_Fetch = {
  fetchDesktopComputers: async () => {
    try {
      const response = await axios.get('/desktopComputers'); // replace with your endpoint
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
      return null;
    }
  },
  // other fetch functions...
};
*/

export default useFirebaseLogin;
