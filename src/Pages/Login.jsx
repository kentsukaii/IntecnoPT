import React, { useState } from 'react';
import { useFirebaseLogin } from "./Backend";
import PasswordReset from './PasswordReset'; // Adjust the import path as needed

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loggedInUser,
    authing,
    handleLogin,
    handleLogingoogle,
    handleLoginFacebook,
    handleLogout,
    handlePasswordResetComplete,
  } = useFirebaseLogin();

  const [showPasswordReset, setShowPasswordReset] = useState(false);

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
              <button>Forgot Password?</button>
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
