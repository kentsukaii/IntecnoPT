import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowRight, faCheck, faStar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import maguire from "../../src/assets/godmaguire.png";
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from "firebase/firestore";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const db = getFirestore();
            const docRef = doc(db, "Products", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProduct(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <Container fluid>
            <Row>
                <Col md={6} style={{ border: '1px solid black' }} >
                    <div style={{ margin: '10px' }}>
                        <img src={maguire} alt="..." style={{ width: '100%' }} />
                        <div style={{ marginTop: '10px', textAlign: 'right' }}>
                            <Button variant="link" className="text-primary text-end">
                                <FontAwesomeIcon icon={faStar} /> Bookmark
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col md={6} style={{ border: '1px solid black', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ margin: '10px' }}>
                        <h1 style={{ fontSize: '2rem' }}>Title</h1>
                        <p>Description goes here...</p>
                        <p style={{ color: 'blue', fontWeight: 'bold', fontSize: '1.2rem' }}>Price <span style={{ textDecoration: 'line-through', fontSize: '1.2rem', color: 'black' }}>Old Price</span></p>
                        <p style={{ fontSize: '1rem' }}><FontAwesomeIcon icon={faCheck} /> Available</p>
                        <p style={{ fontSize: '1rem' }}>Expected delivery date: ...</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="primary" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                            </Button>
                            <Button variant="secondary" style={{ fontSize: '1rem', padding: '0.5rem 1rem', backgroundColor: '#4EADFE' }}>
                                Buy Now <FontAwesomeIcon icon={faArrowRight} />
                            </Button>
                        </div>
                    </div>
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    <FontAwesomeIcon icon={faQuestionCircle} /> Help
                                </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">If you ever need help contact our staff our email is: intecnostaff@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductPage;
