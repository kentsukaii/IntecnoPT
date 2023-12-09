import React from 'react';
import { loadData } from '..//REST_API/Data/loadData';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { setDoc } from "firebase/firestore"; 


function Dashboard() {
    return (
        <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">      
                    <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky"></div>
                        <Nav.Item>
                            <Nav.Link href="#home">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#features">Features</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <Button variant="primary" onClick={loadData}>
                        Load Data
                    </Button>
                    <h1>Dashboard</h1>
                    {/* Your dashboard code here */}
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
