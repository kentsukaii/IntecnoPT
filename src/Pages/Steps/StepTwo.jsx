import React, { useState } from 'react';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';

function StepTwo({ nextStep, prevStep, updateData }) {
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const handleSubmit = (event) => {
    event.preventDefault();
    updateData({ paymentMethod });
    nextStep();
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
      <Card style={{ width: '18rem', marginTop: '2rem', marginBottom: '2rem' }}>
        <Card.Header as="h5" className="text-center">Select Payment Method</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Form.Check 
              type="radio"
              label="Stripe"
              name="paymentMethod"
              id="stripe"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={e => setPaymentMethod(e.target.value)}
            />
          </ListGroup.Item>
          {/* Add more ListGroup.Item for other payment methods */}
        </ListGroup>
      </Card>

      <div>
        <Button variant="secondary" onClick={prevStep} className="mr-2">Back</Button>
        <Button variant="primary" type="submit">Next</Button>
      </div>
    </Form>
  );
}

export default StepTwo;
