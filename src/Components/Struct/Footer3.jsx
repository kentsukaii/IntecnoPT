import React from "react";
import "../Struct/Footer.css";
import { Container, Row, Col } from 'react-bootstrap';

const Footer3 = () => {
    return (
        <footer className="footer3 mt-4 p-3 bg-light">
            <Container className>
                <Row>
                    <Col className="text-center">
                        <span className="text-muted footer-text">© 2023 IntecnoPT. All rights reserved.</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer3;