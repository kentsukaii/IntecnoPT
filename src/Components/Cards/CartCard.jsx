import { Card, Row, Col, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartCard = ({ product, handleRemove, handleCheckout }) => {
  const [showModal, setShowModal] = useState(false);

  const confirmCheckout = () => {
    handleCheckout(product.id);
    setShowModal(false);
  };

  return (
    <Card style={{ width: '100%' }}>
      <Row className="no-gutters">
        <Col md={4} className="d-flex align-items-center justify-content-center">
          {product.imageUrl && <Card.Img className="card-image" variant="top" src={product.imageUrl} />}
        </Col>
        <Col md={8}>
          <Card.Body className="text-left">
            <div className="d-flex justify-content-between">
              <Card.Title className="card-title">{product.Name}</Card.Title>
              <Button variant="danger" onClick={handleRemove} style={{ fontSize: '0.5rem', padding: '0.25rem 0.5rem', position: 'absolute', top: '10px', right: '10px' }}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </div>
            <Card.Text>
              Price: {product.Price}€<br />
              {product.discountPrice && <>Discount price: <s>{product.Price}€</s> {product.discountPrice}€</>}
            </Card.Text>
            <Button variant="primary" onClick={() => setShowModal(true)} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
              <FontAwesomeIcon icon={faShoppingCart} /> Checkout
            </Button>
          </Card.Body>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to checkout this product?</Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: '#4EADFE' }} onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmCheckout}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default CartCard;
