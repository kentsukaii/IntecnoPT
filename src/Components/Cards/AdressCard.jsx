import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';

const AddressCard = () => {
  return (
    <Container className="p-3 border rounded" style={{ width: "22rem", marginTop: "1rem", position: "relative", backgroundColor: "#f8f9fa" }}>
      <input type="radio" className="position-absolute" style={{ right: "1rem", top: "1rem" }} />
      <Row>
        <Col className="text-left">
          <h5>First Name</h5>
          <p>Address</p>
          <p>Region, Postal Code</p>
          <p>PT</p>
          <p>Phone Number</p>
          <p>NIF</p>
          <hr />
          <div className="d-flex flex-column justify-content-start align-items-start">
            <div className="mb-2">
              <Badge variant="light" className="p-2">Morada de Entrega Pré-definida</Badge>
            </div>
            <div className="mb-2">
              <Badge variant="light" className="p-2">Morada de Faturação Pré-definida</Badge>
            </div>
          </div>
          <Button variant="secondary" className="p-2 position-absolute" style={{ borderRadius: "50%", right: "1rem", bottom: "1rem" }}>
            <i className="fas fa-pencil-alt"></i>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AddressCard;
