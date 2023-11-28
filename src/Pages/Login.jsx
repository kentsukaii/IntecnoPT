import React, { useState } from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setLoggedInUser(userCredential);
      setError(null); // Clear any previous errors
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

      // Check if the user already exists in the Users collection
      const usersCollection = collection(firestore, 'Users');
      const userQuery = query(usersCollection, where('email', '==', authUser.email));
      const userQuerySnapshot = await getDocs(userQuery);

      if (userQuerySnapshot.empty) {
        // If the user doesn't exist, add them to the Users collection
        const usersCollection = collection(firestore, 'Users');
        const userData = {
          email: authUser.email,
          Address: "",
          Name: "",
          Phone_number: "",
        };
        await addDoc(usersCollection, userData);
      }

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

      // Check if the user already exists in the Users collection
      const usersCollection = collection(firestore, 'Users');
      const userQuery = query(usersCollection, where('email', '==', authUser.email));
      const userQuerySnapshot = await getDocs(userQuery);

      if (userQuerySnapshot.empty) {
        // If the user doesn't exist, add them to the Users collection
        const usersCollection = collection(firestore, 'Users');
        const userData = {
          email: authUser.email,
          Address: "",
          Name: "",
          Phone_number: "",
        };
        await addDoc(usersCollection, userData);
      }

      // Redirect after a successful login
      navigate('/');
    } catch (error) {
      console.log(error);
      setAuthing(false);
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

  return (
    <div>
      <h1>Login form</h1>
      {loggedInUser && (
        <div>
          <p>Congratulations! You are logged in with the email: {loggedInUser.user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!loggedInUser && (
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => handleLogingoogle()} disabled={authing}>Login with Google</button>
          <button onClick={() => handleLoginFacebook()} disabled={authing}> Login with Facebook </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
