import { Card, Row, Col, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from "../../firebase"; // Import your Firebase storage instance
import { removeCartItem } from '../../REST_API/firebaseAPI';

// CartCard code:

const CartCard = ({ product, onRemove, handleCheckout }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch the image URL from Firebase Storage
  useEffect(() => {
    const imageRef = ref(storage, `${product.Category}/${product.ImageReference}`);
    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Error getting image URL: ', error);
      });
  }, [product]);

  // Function to determine availability text and color
  const getAvailability = (stock) => {
    if (stock > 0) {
      return {
        text: 'Available',
        color: stock <= 10 ? '#E8A200' : '#008000', // yellow and green in hexadecimal
        icon: faCheckCircle
      };
    } else {
      return {
        text: 'Not Available',
        color: '#FF0000', // red in hexadecimal
        icon: faTimesCircle
      };
    }
  }

  const availability = getAvailability(product.StockAvailable);

  const originalPrice = product.OnSale ? product.Price / (1 - product.SalePercentage) : product.Price;

  const handleRemoveClick = () => {
    setShowModal(true); // Show the modal when the remove button is clicked
  }

  const confirmRemove = async () => {
    await onRemove(product.id); // Remove the product when the user confirms
    setShowModal(false); // Hide the modal
  };
  

  const confirmCheckout = () => {
    handleCheckout(product.id);
    setShowModal(false);
  };

  const handlePageLink = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card style={{ width: '100%' }}>
      <Row className="no-gutters">
        <Col md={4} className="d-flex align-items-center justify-content-center">
          {imageUrl && (
            <Card.Img
              className="card-image"
              variant="top"
              src={imageUrl}
              onClick={handlePageLink} // Add the onClick handler here
            />
          )}
        </Col>

        <Col md={8}>
          <Card.Body className="text-left">
            <Card.Title className="card-title" onClick={handlePageLink}> {/* Add the onClick handler here */}
              {product.Name}
            </Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={availability.icon} style={{ color: availability.color }} /> <span style={{ color: availability.color }}>{availability.text}</span><br />
              <span style={{ color: availability.color }}>Expected delivery date:</span><br /><span style={{ color: availability.color }}>{product.ExpectedDeliveryDate}</span><br />
              {product.OnSale ? (
                <>
                  <span>Original Price: {originalPrice.toFixed(2)}€</span><br />
                  <span>Discounted Price: {product.Price}€</span>
                </>
              ) : (
                <span>Price: {product.Price}€</span>
              )}
            </Card.Text>

            <Button
              variant="danger"
              onClick={handleRemoveClick} // Call the function here
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            >
              <FontAwesomeIcon icon={faTimes} /> Remove
            </Button>



          </Card.Body>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this product from your cart?</Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: '#4EADFE' }} onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemove} >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>


  );
}

export default CartCard;
