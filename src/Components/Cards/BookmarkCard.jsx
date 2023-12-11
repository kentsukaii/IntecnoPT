import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { getDownloadURL, ref } from "firebase/storage"; // Import the necessary functions from Firebase
import { storage } from "../../firebase"; // Import your Firebase storage instance
import './CSS/BookmarkCard.css'; // Import the CSS file
import { removeBookmarkedProduct } from '../../REST_API/firebaseAPI';


const BookmarkCard = ({ product, onRemove }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to 

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

    const handleRemove = () => {
        setShowModal(true); // Show the modal when the remove button is clicked
    }

    const confirmRemove = async () => {
        await removeBookmarkedProduct(product.id); // Remove the product when the user confirms
        onRemove(); // Update the state of the parent component
        setShowModal(false); // Hide the modal
    }



    const availability = getAvailability(product.StockAvailable);

    return (
        <Card style={{ width: '100%' }}>
            <Row className="no-gutters">
                <Col md={4} className="d-flex align-items-center justify-content-center">
                    {imageUrl && <Card.Img className="card-image" variant="top" src={imageUrl} />}
                </Col>
                <Col md={8}>
                    <Card.Body className="text-left">
                        <div className="d-flex justify-content-between">
                            <Card.Title className="card-title">{product.Name}</Card.Title>
                            <Button variant="danger" onClick={handleRemove} style={{ fontSize: '0.5rem', padding: '0.25rem 0.5rem', position: 'absolute', top: '10px', right: '10px' }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>
                        </div>
                        <Card.Text>
                            <FontAwesomeIcon icon={availability.icon} style={{ color: availability.color }} /> <span style={{ color: availability.color }}>{availability.text}</span><br />
                            <span style={{ color: availability.color }}>Expected delivery date:</span><br /><span style={{ color: availability.color }}>{product.ExpectedDeliveryDate}</span><br />
                            Price: {product.Price}€<br />
                            {product.discountPrice && <>Discount price: <s>{product.Price}€</s> {product.discountPrice}€</>}
                        </Card.Text>
                        <Button variant="primary" onClick={() => {/* Add the product to the cart */ }} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
                            <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                        </Button>
                    </Card.Body>
                </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Remove</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this product from your bookmarks?</Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: '#4EADFE' }} onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>

                    <Button variant="danger" onClick={confirmRemove}>
                        Remove
                    </Button>

                </Modal.Footer>
            </Modal>
        </Card>
    );

}

export default BookmarkCard;
