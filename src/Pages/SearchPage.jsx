import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const SearchPage = () => {
  const [product, setProduct] = useState('product_here');
  const [results, setResults] = useState('xxx');

  return (
    <Container style={{ backgroundColor: '#f8f9fa' }}>
      <Row className="align-items-center my-3">
        <Col>
          <h1>Search results for: {product}</h1>
          <p>{results} results.</p>
        </Col>
      </Row>
      <Row className="align-items-center my-3" style={{ backgroundColor: '#e9ecef' }}>
        <Col md={4}>
          <Form.Label>Products per page:</Form.Label>
          <Form.Control as="select" size="sm">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </Form.Control>
        </Col>
        <Col md={4}>
          <Form.Label>Sort by:</Form.Label>
          <Form.Control as="select" size="sm">
            <option>Price</option>
            <option>Rating</option>
            <option>Popularity</option>
          </Form.Control>
        </Col>
        <Col md={4}>
          <Form.Label>Filter by:</Form.Label>
          <Form.Control as="select" size="sm">
            <option>Category</option>
            <option>Brand</option>
            <option>Price range</option>
          </Form.Control>
        </Col>
      </Row>
      <Row className="align-items-center my-3" style={{ backgroundColor: '#f8f9fa' }}>
        <Col>
          <div>Placeholder for product results</div>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchPage;
