import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { MDBIcon } from "mdb-react-ui-kit";
import useFirebaseLogin from './BackendFiles/Backend';

const Login = () => {
  
  const {
    handleLogin,
  } = useFirebaseLogin();


  return (
    <Container fluid className="p-0 mt-4 h-100">
      <Row noGutters className="w-100">
        <Col xs={12} md={8} lg={6} className="p-4 bg-light">
          <div className="d-flex flex-column align-items-center justify-content-center w-100">
            <Row className="mb-2 mt-4">
              <h4>Login to your IntecnoPT account</h4>
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
              <Form.Group className="mb-4">
                <Form.Control type="email" placeholder="E-Mail" className="form-control-md" style={{ backgroundColor: '#e0e0e0', width: '80%' }} />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control type="password" placeholder="Password" className="form-control-md" style={{ backgroundColor: '#e0e0e0', width: '80%' }} />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center w-100 mb-2">
                <a href="#" className="text-decoration-none">Forgot your password?</a>
                <div className="ms-5">
                  <Form.Check type="checkbox" label="Save Session" />
                </div>
              </div>
              <div className="text-start">
                <Button onClick={handleLogin} variant="primary" type="submit" className="mb-4 btn-lg py-3">
                  Login
                </Button>
                <div style={{ width: '65%' }}>
                  <p>
                    <MDBIcon icon="check-circle" className="me-2" />
                    By logging in, I declare that I have read and accept the Terms and Conditions, and the use of my personal data as explained in the Privacy Policy.
                  </p>
                </div>
              </div>
            </Form>
          </div>
        </Col>
        <Col xs={12} md={8} lg={6} className="p-4 bg-primary text-white">
          <div className="d-flex flex-column align-items-center justify-content-center w-100">
            {/* Content for the second container, similar to the first one */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;