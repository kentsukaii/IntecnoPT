import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

import { auth, firestore } from '../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  
  const checkDuplicateEmail = async (email) => {
    const usersCollection = collection(firestore, 'Users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      const passwordRequirements = [
        { test: (password) => password.length >= 12, message: 'Password must be at least 12 characters long' },
        { test: (password) => /[A-Z]/.test(password), message: 'Password must contain at least one uppercase letter' },
        { test: (password) => /[a-z]/.test(password), message: 'Password must contain at least one lowercase letter' },
        { test: (password) => /[0-9]/.test(password), message: 'Password must contain at least one number' },
        { test: (password) => /[^A-Za-z0-9]/.test(password), message: 'Password must contain at least one special character' },
      ];

      for (let requirement of passwordRequirements) {
        if (!requirement.test(password)) {
          setError(requirement.message);
          return;
        }
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (!isValidEmailFormat(email)) {
        setError('Invalid email format');
        return;
      }

      const emailExistsInDatabase = await checkDuplicateEmail(email);
      if (emailExistsInDatabase) {
        setError('Email already exists');
        return;
      }


      const authUser = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(authUser.user);
      const usersCollection = collection(firestore, 'Users');
      const userData = {
        email: authUser.user.email,
        Address: "",
        Name: "",
        Phone_number: "",
      };
      await addDoc(usersCollection, userData);

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Registration form</h1>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Confirm Password:</label>
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
