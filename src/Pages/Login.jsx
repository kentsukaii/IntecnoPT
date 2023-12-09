import React, { useState } from 'react';
import { useFirebaseLogin } from './BackendFiles/Backend';
import PasswordReset from './PasswordReset';
import { Container, Row, Col } from 'react-bootstrap';
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
  } = useFirebaseLogin();

  return (
    <Container fluid className="p-0 h-100 d-flex justify-content-center align-items-center">
    <Row noGutters className="w-100 d-flex align-items-center">
        <Col className="d-flex align-items-center justify-content-center bg-light" style={{ height: '600px' }} xs={12} md={6}>
            <div>
                <h2>Content for the first container</h2>
                <p>This is some text inside the first container.</p>
            </div>
        </Col>
        <Col className="d-flex align-items-center justify-content-center bg-primary text-white" style={{ height: '600px' }} xs={12} md={6}>
            <div>
                <h2>Content for the second container</h2>
                <p>This is some text inside the second container.</p>
            </div>
        </Col>
    </Row>
</Container>


  );
};

export default Login;
