import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faList } from '@fortawesome/free-solid-svg-icons';

import SearchCard from '../Components/Cards/SearchCard'; // Import the ProductCard component
import { Pagination } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import queryString from 'query-string';
import { fetchProducts, fetchProductsByCategory } from '../REST_API/firebaseSearch';
import { filterProducts } from '../REST_API/firebaseSearch';
import { fetchAllProducts } from '../REST_API/firebaseSearch';


const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('product_here');
  const [results, setResults] = useState('xxx');
  const [currentPage, setCurrentPage] = useState(1); // State variable for the current page
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const category = new URLSearchParams(location.search).get('category');
  const [showAvailable, setShowAvailable] = useState(true);
  const [showOutOfStock, setShowOutOfStock] = useState(true);

  const itemsPerPage = 9; // Set the number of items you want per page
  const filteredProducts = filterProducts(products, showAvailable, showOutOfStock);
  const itemsOnPage = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      let products;
      if (query) {
        products = await fetchProducts(query);
      } else if (category) {
        products = await fetchProductsByCategory(category);
      } else {
        products = await fetchAllProducts();
      }
      setProducts(products || []);
    };

    fetchData();
  }, [query, category]);


  return (

    <Container style={{ borderRadius: '15px', padding: '20px' }}>
      <Row className="align-items-center my-3" style={{ marginBottom: '10px' }}>
        <Col className="text-left">
          <h3 style={{ borderLeft: '4px solid #4EADFE', paddingLeft: '10px' }}>Search results for: </h3>
          <p>{products.length} results.</p>
          <Button
            size="sm" // Make the button smaller
            className="float-right" // Float the button to the right
            onClick={() => {
              setProducts([]); // Reset the products array
              navigate('/'); // Navigate back to the home page
            }}
          >
            Clear Search
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center my-3" style={{ backgroundColor: '#e9ecef', borderRadius: '15px', padding: '20px', marginBottom: '10px' }}>
        <Col md={12} className="text-left">
          <h5 style={{ fontWeight: 'bold' }}>FILTERS</h5>
          <Form.Label style={{ fontSize: '1.2em' }}>Stock</Form.Label>
          <hr />
          <Form.Check
            type="checkbox"
            label="Available Stock"
            style={{ fontSize: '0.8em' }}
            checked={showAvailable} onChange={e => setShowAvailable(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Out of Stock"
            style={{ fontSize: '0.8em' }}
            checked={showOutOfStock} onChange={e => setShowOutOfStock(e.target.checked)}
          />
        </Col>
      </Row>

      <Row className="align-items-center my-3" style={{ backgroundColor: '#e9ecef', borderRadius: '15px', padding: '20px', marginBottom: '10px' }}>
        <Col md={12}>
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





          <Row className="justify-content-center my-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px', padding: '20px' }}>
            {itemsOnPage.map(product => (
              <SearchCard key={product.id} product={product} />
            ))}
          </Row>







          <Row className="justify-content-center">

            <Pagination>
              {Array(Math.ceil(filteredProducts.length / itemsPerPage)).fill().map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => {
                    setCurrentPage(index + 1);
                    window.scrollTo({ top: 525, behavior: 'smooth' });
                  }}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>


          </Row>


        </Col>
      </Row>
    </Container>



  );
}

export default SearchPage;