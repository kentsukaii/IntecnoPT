import React from 'react';
import { InputGroup, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { MDBIcon } from "mdb-react-ui-kit";

const Login = () => {
  return (
    <Container fluid className="p-0 mt-4 h-100 d-flex justify-content-center align-items-center">
      <Row noGutters className="w-100">
        <Col xs={12} md={8} lg={6} className="p-4 bg-light">
          <div className="d-flex flex-column align-items-center justify-content-center w-100">
            <Row className="mb-2 mt-4">
              <h2><strong>Login to your IntecnoPT account!</strong></h2>
            </Row>
            <Row className="mb-4">
              <Col xs={12} md={6} className="mb-2 mb-md-0">
                <Button variant="primary" className="w-100 btn-lg py-3">
                  <MDBIcon fab icon="facebook" className="me-2" />
                  Facebook
                </Button>
              </Col>
              <Col xs={12} md={6}>
                <Button variant="danger" className="w-100 btn-lg py-3">
                  <MDBIcon fab icon="google" className="me-2" />
                  Google
                </Button>
              </Col>
            </Row>
            <Form className="w-100">
              <div className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4">
                  <Form.Control type="email" placeholder="E-Mail" className="form-control-md" style={{ backgroundColor: '#e0e0e0', width: '100%', minWidth: "19.5vw" }} />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control type="password" placeholder="Password" className="form-control-md" style={{ backgroundColor: '#e0e0e0', width: '100%', minWidth: "19.5vw" }} />
                </Form.Group>
              </div>
              <div className="d-flex justify-content-center align-items-center w-100 mb-2">
                <a href="#" className="text-decoration-none">Forgot your password?</a>
                <div className="ms-5">
                  <Form.Check type="checkbox" label="Save Session" />
                </div>
              </div>
              <div className="text-center">
                <Button variant="primary" type="submit" className="mb-4 btn-lg py-3">
                  Login
                </Button>
                <Row>
                  <Col className="text-left small-text" xs={12} md={8} lg={8}>
                    <p>
                      <MDBIcon icon="check-circle" className="me-2" />
                      By logging in, I declare that I have read and accept the Terms and Conditions, and the use of my personal data as explained in the Privacy Policy.
                    </p>
                  </Col>
                </Row>
              </div>
            </Form>
          </div>
        </Col>
        <Col xs={12} md={8} lg={6} className="p-4 bg-primary text-white">
          <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
            <Row className="mb-2 mt-4 text-center w-100">
              <h3><strong>Don't have an account? Register now!</strong></h3>
            </Row>
            <div className="row mt-4">
              <h4>
                <strong>Fast and easy!</strong>
              </h4>
            </div>
            <Row className="mt-4 mb-4">
              <Col xs={12} md={12} lg={12}>
                <ul className="list-unstyled text-left">
                  <li className="mb-2"><MDBIcon icon="check-circle" className="me-2" />A feature to track orders</li>
                  <li className="mb-2"><MDBIcon icon="check-circle" className="me-2" />A feature to save payment and shipping details for convenience</li>
                  <li className="mb-2"><MDBIcon icon="check-circle" className="me-2" />A feature to make online returns</li>
                </ul>
              </Col>
            </Row>
            <Row className="mb-4">

                <Button variant="white" className="w-100 btn-lg py-3" >
                  Create Account
                </Button>

            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;