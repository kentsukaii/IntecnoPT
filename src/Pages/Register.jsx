import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { auth, firestore } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [receiveNews, setReceiveNews] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
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

  const handleGoogleLogin = async () => {
  };

  const handleFacebookLogin = async () => {
  };

  const handleLogin = async () => {
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
      
      
      const usersCollection = collection(firestore, "Users");
      const userData = {
        email: authUser.user.email,
        Address: "",
        Name: "",
        Phone_number: "",
        
      };
      await addDoc(usersCollection, userData);

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mt-5">
          <div className="bg-light p-5">
            <div className="container">
              <h2>Registration is easy and free!</h2>
              <div className="col-md-6">
                <p></p>
              <MDBInput label="E-Mail" id="form1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <p></p>
              <div className="col-md-6">
              <MDBInput label="Password" id="form2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <p></p>
              <div className="col-md-6">
              <MDBInput label="Password Confirm" id="form3" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <p></p>
              <p>The password must meet 3 of the following requirements:</p>
              <p>Lowercase character</p>
              <p>Capital character</p>
              <p>Special character</p>
              <p>Number</p>
              <MDBCheckbox label="I would like to receive personalized news and commercial communications from IntecnoPT via email and other means." />
              <p></p>
              <MDBCheckbox label="I agree to the Terms and Conditions" />
              <p></p>
              <MDBBtn onClick={handleRegister}>Register</MDBBtn>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-5">
          <div className="bg-light p-5">
            <div className="container">
              <h2>Or sign in with a social network</h2>
              <MDBBtn onClick={handleFacebookLogin}>Sign In with Facebook</MDBBtn>
              <MDBBtn onClick={handleGoogleLogin}>Sign In with Google</MDBBtn>
              <p></p>
              <h7>Only used for authentication.</h7>
              <p></p>
              <h7>We will never post anything on your profile</h7>
              <p></p>
              <h2>Do you already have an IntecnoPT account?</h2>
              <p>Click below to Login!</p>
              <MDBBtn onClick={handleLogin}>Login</MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
