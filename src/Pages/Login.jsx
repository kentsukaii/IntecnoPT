import React, { useState } from 'react';
import { useFirebaseLogin } from './BackendFiles/Backend';
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
    handlePasswordResetComplete,
    showPasswordReset,
    handlePasswordReset,
    handleCheckboxChange,
    saveSession,

  } = useFirebaseLogin();


  return (
    <div>
      {!showPasswordReset && (
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <div className="bg-light p-5">
              <div className="container">
                <h2>Log in to your IntecnoPT account!</h2>
                <div className="col-md-12">
                  <MDBBtn style={{ backgroundColor: '#3b5998' }} onClick={handleLoginFacebook} disabled={authing}>
                    <MDBIcon className='me-2' fab icon='facebook' /> Facebook
                  </MDBBtn>
                  <MDBBtn style={{ backgroundColor: '#dd4b39' }} onClick={handleLogingoogle} disabled={authing}>
                    <MDBIcon className='me-2' fab icon='google' /> Google
                  </MDBBtn>
                </div>
                <div className="col-md-12">
                  <p>-----------------------------or-------------------------</p>
                </div>
                {!loggedInUser && (
                  <div>
                    <div className="col-md-12 mb-4 w-75">
                      <MDBInput label="E-Mail" id="typeEmail" type="email" size='lg' className="p-3 w-100" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <br />
                      <MDBInput label="Password" id="typePassword" type="password" size='lg' className="p-3 w-100" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                      <a href="#" onClick={handlePasswordReset}>Forgot your Password?</a>
                      <MDBCheckbox label="Save Session" checked={saveSession} onChange={handleCheckboxChange} />
                    </div>

                    <div className="col-md-12">
                      {/*<ReCAPTCHA sitekey="6Ldu3igpAAAAAIubuBWKw9YLJ-_mIaBd2EnYm8m1" onChange={handleCaptchaChange} />*/}
                    </div>
                    <div className="col-md-12">
                      <MDBBtn onClick={handleLogin} disabled={authing}>LOGIN</MDBBtn></div>
                  </div>)}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="col-md-12">
                  {"By logging in, I declare that I have read and accept the Terms and Conditions, and the use of my personal data as explained in the Privacy Policy."}
                </div>
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
      )}
      {showPasswordReset && (
        <PasswordReset onResetComplete={handlePasswordResetComplete} />
      )}
    </div>
  );
};

export default Login;
