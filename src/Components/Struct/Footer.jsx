import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import "../Struct/Footer.css";

const Footer = () => {
    return (
        <footer className="footer mt-5 py-4 bg-light">
            <Container>
                <Row>
                    <Col className="text-center">
                        <span className="text-muted footer-text">© 2023 IntecnoPT. All rights reserved.</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;