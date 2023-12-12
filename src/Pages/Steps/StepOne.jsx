import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function StepOne({ nextStep, updateData }) {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Check if all fields are filled out
    if (!fullName || !address || !region || !postalCode || !country || !phoneNumber) {
      alert('Please fill out all fields before proceeding.');
      return;
    }

    updateData({ fullName, address, region, postalCode, country, phoneNumber });
    nextStep();
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <div style={{ maxWidth: "600px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your address" />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Form.Group controlId="formRegion" style={{ width: "45%" }}>
              <Form.Label>Region</Form.Label>
              <Form.Control type="text" value={region} onChange={e => setRegion(e.target.value)} placeholder="Enter your region" />
            </Form.Group>

            <Form.Group controlId="formPostalCode" style={{ width: "45%" }}>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="Enter your postal code" />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-between">
            <Form.Group controlId="formCountry" style={{ width: "45%" }}>
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="Enter your country" />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber" style={{ width: "45%" }}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" />
            </Form.Group>
          </div>

          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default StepOne;
