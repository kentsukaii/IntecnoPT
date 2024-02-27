import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from '../../firebase';

function StepThree({ prevStep, formData }) {
  const { fullName, address, region, postalCode, country, phoneNumber, paymentMethod } = formData;
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirmPurchase = async () => {
    setLoading(true);
  
    const delay = Math.random() * 5000;
    await new Promise(resolve => setTimeout(resolve, delay));
  
    const auth = getAuth();
    const user = auth.currentUser;
    const cartRef = doc(firestore, 'Cart', user.uid);
    const cartSnap = await getDoc(cartRef);
    const productsList = cartSnap.data().productsList;
  
    const productDetails = [];
    let totalPrice = 0;
    for (const productId of productsList) {
      const productRef = doc(firestore, 'Products', productId);
      const productSnap = await getDoc(productRef);
      const productData = productSnap.data();
      productDetails.push(productData);
      totalPrice += productData.Price; // assuming Price field contains the price of the product
    }
  
    let invoice = `
      Full Name: ${fullName}
      Address: ${address}
      Region: ${region}
      Postal Code: ${postalCode}
      Country: ${country}
      Phone Number: ${phoneNumber}
      Payment Method: ${paymentMethod}
      Number of Products: ${productsList.length}
      Total Price: ${totalPrice}
      Products:
    `;
    productDetails.forEach((product, index) => {
      invoice += `
        Product ${index + 1}:
        Name: ${product.Name}
        Price: ${product.Price}
        Category: ${product.Category}
        Expected delivery date: ${product.ExpectedDeliveryDate}
      `;
    });
    const blob = new Blob([invoice], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "invoice.txt");
  
    setShowModal(true);
    setLoading(false);
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };
  

  return (
    <div className="mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Review Your Order</Card.Title>
          <Card.Text>
            <strong>Full Name:</strong> {fullName}<br/>
            <strong>Address:</strong> {address}<br/>
            <strong>Region:</strong> {region}<br/>
            <strong>Postal Code:</strong> {postalCode}<br/>
            <strong>Country:</strong> {country}<br/>
            <strong>Phone Number:</strong> {phoneNumber}<br/>
            <strong>Payment Method:</strong> {paymentMethod}<br/>
          </Card.Text>
          <Button variant="secondary" onClick={prevStep}>Back</Button>
          <Button variant="success" onClick={handleConfirmPurchase} disabled={loading}>
            {loading ? <Spinner animation="border" /> : 'Confirm Purchase'}
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your purchase was successful! You will be redirected to the homepage.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StepThree;
