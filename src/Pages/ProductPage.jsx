import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowRight, faCheck, faStar, faQuestionCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import teemoImage from '../assets/teemo.png';
import { bookmarkProduct } from '../REST_API/firebaseAPI';
import { addProductToCart } from '../REST_API/firebaseAPI';



const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(null);
    const [showModal, setShowModal] = useState(false); // Define showModal here

    useEffect(() => {
        const fetchProduct = async () => {
            const db = getFirestore();
            const docRef = doc(db, "Products", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const productData = docSnap.data();
                setProduct(productData);

                const storage = getStorage();
                const imagePath = `${productData.Category}/${productData.ImageReference}`;
                const imageRef = ref(storage, imagePath);
                const url = await getDownloadURL(imageRef);
                setImageUrl(url);

                setLoading(false);
            } else {
                console.log("No such document!");
            }
        };

        fetchProduct();
    }, [id]);





    const getAvailability = (stock) => {
        if (stock > 0) {
            return {
                text: 'Available',
                color: stock <= 10 ? '#E8A200' : '#008000' // yellow and green in hexadecimal
            };
        } else {
            return {
                text: 'Not Available',
                color: '#FF0000' // red in hexadecimal
            };
        }
    }

    const availability = product && getAvailability(product.StockAvailable);

    if (loading) {
        return <div></div>;
    }

    const originalPrice = product.OnSale ? product.Price / (1 - product.SalePercentage) : product.Price;

    return (

        <Container fluid>
            <Row>
                <Col md={6} style={{ border: '1px solid black' }} >
                    <div style={{ margin: '10px' }}>
                        <img src={imageUrl} alt="..." style={{ width: '100%' }} />
                        <div style={{ marginTop: '10px', textAlign: 'right' }}>
                            <Button variant="link" className="text-primary text-end" style={{ backgroundColor: "transparent", color: "#4eadfe", fontSize: "0.8rem" }} onClick={() => bookmarkProduct(id, setShowModal)}>
                                <FontAwesomeIcon icon={faStar} /> Bookmark
                            </Button>



                        </div>
                    </div>
                </Col>
                <Col md={6} style={{ border: '1px solid black', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ margin: '10px' }}>
                        <h1 style={{ fontSize: '2rem' }}><b>{product.Name}</b></h1>
                        <p className='mb-4'>{product.Description}</p>

                        <p style={{ color: '#4EADFE', fontSize: '1.8rem' }}>
                            <span style={{ fontWeight: 'bold', color: 'black' }}>{product.Price}€ </span>
                            {product.OnSale && <span style={{ textDecoration: 'line-through', fontSize: '1rem', color: 'gray' }}> {originalPrice.toFixed(2)}€</span>}
                        </p>
                        <div style={{ color: availability.color, margin: "0px", padding: "0px" }}>
                            <b><p style={{ fontSize: '1rem', margin: '0px' }}><FontAwesomeIcon icon={faCheck} /> {availability.text} - {product.StockAvailable} units</p></b>
                            <p className='mb-4' style={{ fontSize: '0.9rem', margin: '0px' }}>Expected delivery date: {product.ExpectedDeliveryDate}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <Button
                                variant="primary"
                                style={{ fontSize: '1rem', padding: '0.5rem 1rem', marginBottom: '2rem' }}
                                onClick={() => addProductToCart(id)} // Call the function here
                            >
                                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                            </Button>

                            <Button variant="secondary" style={{ fontSize: '1rem', padding: '0.5rem 1rem', backgroundColor: '#4EADFE', marginBottom: '2rem' }}>
                                Buy Now <FontAwesomeIcon icon={faArrowRight} />
                            </Button>
                        </div>
                    </div>


                </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header style={{ backgroundColor: '#4eadfe', color: 'white' }}>
                    <Modal.Title><FontAwesomeIcon icon={faCheckCircle} /> Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> Product successfully added to bookmarks!</p>
                    <img src={teemoImage} alt="Bookmark Icon" style={{ width: '150px', height: '150px', display: 'block', margin: 'auto' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>


    );
};

export default ProductPage;
