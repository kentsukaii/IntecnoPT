import React from "react";
import "../Struct/Footer.css";
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="mt-auto py-5 bg-light">
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