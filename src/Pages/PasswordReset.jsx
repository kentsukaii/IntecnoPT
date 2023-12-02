import React from 'react';
import { useFirebaseLogin } from "./Backend";

const PasswordReset = () => {
  const {
    email,
    setEmail,
    error,
    handleResetPassword,
  } = useFirebaseLogin();

  return (
    <div>
      <h1>Password Reset</h1>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleResetPassword}>Reset Password</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PasswordReset;
