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
    error,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleGoogleRegister,
    handleFacebookRegister,
    handleRegister,
    handlePasswordChange,
    lowercase,
    uppercase,
    specialChar,
    number,
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
                <MDBInput label="E-Mail" id="form1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <p></p>
              <div className="col-md-6">
                <MDBInput label="Password" id="form2" type="password" value={password} onChange={handlePasswordChange} />
              </div>
              <p></p>
              <div className="col-md-6">
                <MDBInput label="Password Confirm" id="form3" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <p></p>
              <p>The password must meet 3 of the following requirements:</p>
              <p style={{ color: lowercase ? 'green' : 'red' }}>Lowercase character</p>
              <p style={{ color: uppercase ? 'green' : 'red' }}>Capital character</p>
              <p style={{ color: specialChar ? 'green' : 'red' }}>Special character</p>
              <p style={{ color: number ? 'green' : 'red' }}>Number</p>
              <MDBCheckbox label="I would like to receive personalized news and commercial communications from IntecnoPT via email and other means." />
              <p></p>
              <MDBCheckbox label="I agree to the Terms and Conditions" />
              <p></p>
              <MDBBtn onClick={handleRegister}>Register</MDBBtn>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-5">
          <div className="bg-light p-5">
            <div className="container">
              <h2>Or sign in with a social network</h2>
              <MDBBtn onClick={handleFacebookRegister}>Sign In with Facebook</MDBBtn>
              <MDBBtn onClick={handleGoogleRegister}>Sign In with Google</MDBBtn>
              <p></p>
              <h7>Only used for authentication.</h7>
              <p></p>
              <h7>We will never post anything on your profile</h7>
              <p></p>
              <h2>Do you already have an IntecnoPT account?</h2>
              <p>Click below to Login!</p>
              <MDBBtn onClick={''}>Login</MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
