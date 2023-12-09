<<<<<<< HEAD
import React from "react";
import { useFirebaseLogin } from "./Backend";
import PasswordReset from "./PasswordReset";
=======
import React, { useState } from 'react';
import { useFirebaseLogin } from './BackendFiles/Backend';
import PasswordReset from './PasswordReset';
>>>>>>> c54fbb84acd9852a66d3b999a8c5218562a1def2
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
  MDBContainer,
  MDBRow,
  MDBCol,
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
<<<<<<< HEAD
=======

>>>>>>> c54fbb84acd9852a66d3b999a8c5218562a1def2
  } = useFirebaseLogin();

  return (
    <MDBContainer>
      {!showPasswordReset && (
        <MDBRow>
          <MDBCol md="6" xs="12" className="mt-5 mb-6 mx-auto">
            <div className="bg-light p-5">
              <div className="container text-left">
                <h4>Log in to your IntecnoPT account!</h4>
                <div className="d-flex mt-4">
                  <MDBCol md="6" sm="12" className="mb-3 mb-md-0">
                    <MDBBtn
                      color="indigo"
                      className="text-white w-100"
                      onClick={handleLoginFacebook}
                      disabled={authing}
                    >
                      <MDBIcon fab icon="facebook" /> Facebook
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol md="6" sm="12">
                    <MDBBtn
                      color="danger"
                      className="text-white w-100"
                      onClick={handleLogingoogle}
                      disabled={authing}
                    >
                      <MDBIcon fab icon="google" /> Google
                    </MDBBtn>
                  </MDBCol>
                </div>
                <div className="col-md-12 mt-4"></div>
                {!loggedInUser && (
                  <div>
<<<<<<< HEAD
                    <div className="col-md-12 mb-4 w-85">
                      <MDBInput
                        label="E-Mail"
                        id="typeEmail"
                        type="email"
                        size="lg"
                        className="p-3 w-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <br />
                      <MDBInput
                        label="Password"
                        id="typePassword"
                        type="password"
                        size="lg"
                        className="p-3 w-100"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 d-flex justify-content-between">
                      <p href="#" onClick={handlePasswordReset}>
                        Forgot your Password?
                      </p>
                      <MDBCheckbox
                        label="Save Session"
                        checked={saveSession}
                        onChange={handleCheckboxChange}
                      />
                    </div>

                    <div className="col-md-12 mt-">
                      {/*<ReCAPTCHA sitekey="6Ldu3igpAAAAAIubuBWKw9YLJ-_mIaBd2EnYm8m1" onChange={handleCaptchaChange} />*/}
                    </div>
                    <div className="col-md-12">
                      <MDBBtn onClick={handleLogin} disabled={authing}>
                        LOGIN
                      </MDBBtn>
                    </div>
                  </div>
                )}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="col-md-12 mt-2">
                  <MDBIcon fas icon="check-circle" /> By logging in, I declare
                  that I have read and accept the Terms and Conditions, and the
                  use of my personal data as explained in the Privacy Policy.
                </div>
              </div>
            </div>
          </MDBCol>
          <MDBCol md="6" xs="12" className="mt-5 mx-auto">
=======
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
>>>>>>> c54fbb84acd9852a66d3b999a8c5218562a1def2
            <div className="bg-light p-5">
              <div className="container text-left">
                <h2>Don't have an account yet? Register now!</h2>
                <div className="col-md-12">
                  <h4>Fast and quick!</h4>
                </div>
                <div className="col-md-12 mt-5">
                  <h4>Track your orders</h4>
                  <h4>Save your payment and shipping details and save time</h4>
                  <h4>Make returns online</h4>
                </div>
                <div className="col-md-12 mt-5"></div>
                <div className="col-md-12">
                  <MDBBtn>REGISTER</MDBBtn>
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      )}
      {showPasswordReset && (
        <PasswordReset onComplete={handlePasswordResetComplete} />
      )}
    </MDBContainer>
  );
};

export default Login;
