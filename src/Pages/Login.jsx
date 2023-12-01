import React, { useState } from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import PasswordReset from './PasswordReset'; 
import { useFirebaseLogin } from "./Backend";


const Login = () => {
  const {
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
    handleLogout,
  } = useFirebaseLogin();

  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {!showPasswordReset && (
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
              <button onClick={() => handleLogingoogle()} disabled={authing}>
                Login with Google
              </button>
              <button onClick={() => handleLoginFacebook()} disabled={authing}>
                Login with Facebook
              </button>
              <button onClick={handlePasswordReset}>Forgot Password?</button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          )}
        </div>
      )}
      {showPasswordReset && (
        <PasswordReset onResetComplete={handlePasswordResetComplete} />
      )}
    </div>
  );
};

export default Login;
