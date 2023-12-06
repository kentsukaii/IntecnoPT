import React, { useState } from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import PasswordReset from './PasswordReset';
import {
  MDBInput,
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBCheckbox,
} from "mdb-react-ui-kit";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authing, setAuthing] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const navigate = useNavigate();

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
  const handlePasswordReset = () => {
    setShowPasswordReset(true);
  };

  const handlePasswordResetComplete = () => {
    setShowPasswordReset(false);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <div className="bg-light p-5">
            <div className="container">
              <h2>Log in to your IntecnoPT account!</h2>
  
              <div className="col-md-12">
                <MDBBtn style={{ backgroundColor: '#3b5998' }} href='#'>
                  <MDBIcon className='me-2' fab icon='facebook' /> Facebook
                </MDBBtn>
                <MDBBtn style={{ backgroundColor: '#dd4b39' }} href='#'>
                  <MDBIcon className='me-2' fab icon='google' /> google
                </MDBBtn>
              </div>
              <div className="col-md-12">
                <p>-----------------------------or-------------------------</p>
              </div>
              <div className="col-md-12 mb-4">
                <MDBInput label="E-Mail" id="typeEmail" type="email" size='lg' className="p-3 w-50"/>
                <br />
                <MDBInput label="Password" id="typePassword" type="password" size='lg' className="p-3 w-50"/>
              </div>
              <div className="col-md-12">
                {"Forgot your Password?"}
                <MDBCheckbox label="Save Session" />
              </div>
              <div className="col-md-12">
                {"reCAPTCHA"}
              </div>
              <div className="col-md-12">
                <MDBBtn>LOGIN</MDBBtn></div>
              <div className="col-md-12">
                {"By logging in, I declare that I have read and accept the Terms and Conditions, and the use of my personal data as explained in the Privacy Policy."}</div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-5 mx-auto">
          <div className="bg-light p-5">
            <div className="container">
              <h2>Don't have an account yet? Register now!</h2>
              <div className="col-md-12">
                <h4>Fast and quick!</h4>
              </div>
              <div className="col-md-12 mt-5">
                <h4>Track your orders</h4>
                <h4>Save your payment and shipping details and save time</h4>
                <h4>Make returns online</h4>
              </div>
              <div className="col-md-12 mt-5">
              </div>
              <div className="col-md-12">
                <MDBBtn>REGISTER</MDBBtn></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  
};

export default Login;
