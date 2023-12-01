import React, { useState } from "react";
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
import { useFirebaseRegister } from "./Backend";


const Register = () => {
  const {
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
  } = useFirebaseRegister();

  return (
    <div>
    <div className="row">
      <div className="col-md-6 mt-5">
        <div className="bg-light p-5">
          <div className="container">
            <h2>Registration is easy and free!</h2>
            <div className="col-md-6">
              <p></p>
              <MDBInput label="E-Mail" id="form1" type="text" />
            </div>
            <p></p>
            <div className="col-md-6">
              <MDBInput label="Password" id="form2" type="password"/>
            </div>
            <p></p>
            <div className="col-md-6">
              <MDBInput label="Password Confirm" id="form3" type="password" />
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
            <MDBBtn>Sign In with Facebook</MDBBtn>
            <MDBBtn >Sign In with Google</MDBBtn>
            <p></p>
            <p>Only used for authentication.</p>
            <p></p>
            <p>We will never post anything on your profile</p>
            <p></p>
            <h2>Do you already have an IntecnoPT account?</h2>
            <p>Click below to Login!</p>
            <MDBBtn >Login</MDBBtn>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Register;
