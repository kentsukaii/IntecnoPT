import React from 'react';
import { Button } from 'react-bootstrap';

function StepThree({ prevStep, formData }) {
  const { fullName, address, region, postalCode, country, phoneNumber, paymentMethod } = formData;

  return (
    <>
      <h3>Review Your Order</h3>
      <p><strong>Full Name:</strong> {fullName}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Postal Code:</strong> {postalCode}</p>
      <p><strong>Country:</strong> {country}</p>
      <p><strong>Phone Number:</strong> {phoneNumber}</p>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      <Button variant="secondary" onClick={prevStep}>Back</Button>
      <Button variant="success">Confirm Purchase</Button>
    </>
  );
}

export default StepThree;
