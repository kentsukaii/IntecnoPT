import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const PasswordReset = ({ onResetComplete }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const auth = getAuth();

  const handleResetPassword = async () => {
  try {
    await sendPasswordResetEmail(auth, email);
    setError(null);
    // Provide a user-friendly message to inform the user that a password reset email has been sent
    alert('A password reset email has been sent to your email address. Please check your inbox.');
    onResetComplete();
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};


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
