import React, { useState } from "react";
import { Form, Button, FormControl, FormCheck } from "react-bootstrap";
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
  MDBIcon,
} from "mdb-react-ui-kit";
import "../Pages/CSS/Register.css";
import { useFirebaseRegister } from "./BackendFiles/Backend";

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
    termsAccepted,
    setTermsAccepted,
    receiveNews,
    setReceiveNews,
  } = useFirebaseRegister();

  return (
    <div className="container-fluid p-0 mt-4 h-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 no-gutters">
        <div className="col-xs-12 col-md-8 col-lg-6 p-4 bg-primary text-white">
          <div className="d-flex flex-column align-items-center justify-content-center w-100">
            <div className="row mb-2 mt-4">
              <h2>
                <strong>Registration is easy and free!</strong>
              </h2>
            </div>
            <Form className="w-100 mt-3">
              <div className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <FormControl
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      backgroundColor: "#e0e0e0",
                      width: "100%",
                      minWidth: "18vw",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <FormControl
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      backgroundColor: "#e0e0e0",
                      width: "100%",
                      minWidth: "18vw",
                    }}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-4"
                  controlId="formBasicPasswordConfirm"
                >
                  <FormControl
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      backgroundColor: "#e0e0e0",
                      width: "100%",
                      minWidth: "18vw",
                    }}
                  />
                </Form.Group>

                <div className="mb-3">
                  <strong>
                    The password must meet 3 of the following requirements:
                  </strong>
                </div>
                <div
                  className="mb-3"
                  style={{ color: lowercase ? "lightgreen" : "white" }}
                >
                  Lowercase character
                </div>
                <div
                  className="mb-3"
                  style={{ color: uppercase ? "lightgreen" : "white" }}
                >
                  Capital character
                </div>
                <div
                  className="mb-3"
                  style={{ color: specialChar ? "lightgreen" : "white" }}
                >
                  Special character
                </div>
                <div
                  className="mb-3"
                  style={{ color: number ? "lightgreen" : "white" }}
                >
                  Number
                </div>
                <div className="text-left mb-4">
                  <FormCheck
                    className="mt-3 text-left small-text limited-width"
                    type="checkbox"
                    label="I would like to receive personalized news and commercial communications from IntecnoPT via email and other means."
                    checked={receiveNews}
                    onChange={(e) => setReceiveNews(e.target.checked)}
                  />
                  <FormCheck
                    className="mt-3 text-left small-text limited-width"
                    type="checkbox"
                    label={
                      <span>
                        I agree to the <strong>Terms and Conditions</strong>,
                        and the use of my personal data as explained by the{" "}
                        <strong>Privacy Policy</strong>.
                      </span>
                    }
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                </div>
                <Button
                  variant="light"
                  type="submit"
                  className="mt-3"
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <div className="col-xs-12 col-md-8 col-lg-6 p-4 bg-light text-dark">
          <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
            <div className="row mb-2 text-center w-100">
              <h3>
                <strong>Or sign in with a social network</strong>
              </h3>
            </div>
            <div className="row mt-4">
              <Button
                variant="primary"
                className="w-80 btn-lg py-3"
                onClick={handleFacebookRegister}
              >
                <MDBIcon fab icon="facebook" className="me-2" />
                Facebook
              </Button>
              <Button
                variant="danger"
                className="w-80 btn-lg py-3"
                onClick={handleGoogleRegister}
              >
                <MDBIcon fab icon="google" className="me-2" />
                Google
              </Button>
            </div>
            <div className="mt-4 small-text">Only used for authentication.</div>
            <div className="mb-3 small-text">
              We will never post anything on your profile
            </div>
            <div className="row mt-4">
              <h4>
                <strong>Already have an IntecnoPT account?</strong>
              </h4>
            </div>
            <div className="row mt-3">Click below to Login!</div>
            <Button className="row mt-3" variant="primary" onClick={""}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
