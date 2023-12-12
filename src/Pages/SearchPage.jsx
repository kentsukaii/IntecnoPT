import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faList } from '@fortawesome/free-solid-svg-icons';
import { getProductsByStock, searchProducts, getAllProducts } from '../REST_API/firebaseSearch';
import ProductCard from '../Components/Cards/ProductCard'; // Import the ProductCard component

const SearchPage = () => {
  const [product, setProduct] = useState('product_here');
  const [results, setResults] = useState('xxx');
  const [products, setProducts] = useState([]); // State variable to store the products
  const [searchTerm, setSearchTerm] = useState(''); // State variable to store the search term

  useEffect(() => {
    // Fetch all products when the component mounts
    getAllProducts().then(setProducts);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    if (searchTerm) {
      // If a search term is entered, search for products
      searchProducts(searchTerm).then(setProducts);
    } else {
      // If no search term is entered, fetch all products
      getAllProducts().then(setProducts);
    }
  };

  return (
    <Container style={{ borderRadius: '15px', padding: '20px' }}>
      <div
        className="d-flex justify-content-center w-100"
        style={{ maxWidth: "100%" }}
      >
        <Form inline className="mx-auto" style={{ width: "55%" }} onSubmit={handleSearch}>
          <FormControl
            type="text"
            placeholder="Search"
            className="w-100"
            style={{ height: "50px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>
      </div>
      <Row className="align-items-center my-3" style={{ marginBottom: '10px' }}>
        <Col className="text-left">
          <h3 style={{ borderLeft: '4px solid #4EADFE', paddingLeft: '10px' }}>Search results for: {product.Name}</h3>
          <p>{results} results.</p>
        </Col>
      </Row>
      <Row className="align-items-center my-3" style={{ backgroundColor: '#e9ecef', borderRadius: '15px', padding: '20px', marginBottom: '10px' }}>
        <Col md={3} className="text-left">
          <h5 style={{ fontWeight: 'bold' }}>FILTERS</h5>
          <Form.Label style={{ fontSize: '1.2em' }}>Stock</Form.Label>
          <hr />
          <Form.Check
            type="checkbox"
            label="Available Stock"
            style={{ fontSize: '0.8em' }}
            onChange={(e) => getProductsByStock(e.target.checked).then(setProducts)}
          />
          <Form.Check
            type="checkbox"
            label="Out of Stock"
            style={{ fontSize: '0.8em' }}
            onChange={(e) => getProductsByStock(!e.target.checked).then(setProducts)}
          />
        </Col>
        <Col md={8}>
          <Row className="justify-content-end">
            <Col md={3} className="d-flex align-items-center">
              <FontAwesomeIcon icon={faSort} className="mr-2" />
              <Form.Control as="select" size="sm" style={{ width: '75%' }}>
                <option>Price</option>
                <option>Rating</option>
                <option>Popularity</option>
              </Form.Control>
            </Col>
            <Col md={3} className="d-flex align-items-center">
              <FontAwesomeIcon icon={faList} className="mr-2" />
              <Form.Control as="select" size="sm" style={{ width: '75%' }}>
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="align-items-center my-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px', padding: '20px' }}>
            <Col>
              {/* Map over the products and render a ProductCard for each one */}
              <Row>
                {products.map((product) => (
                  <Col md={3}>
                    <ProductCard
                      key={product.id}
                      product={product}
                      isBestSeller={product.isBestSeller}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchPage;