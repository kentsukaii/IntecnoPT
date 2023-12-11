// SideMenu2 code:

import React, { useEffect, useState } from 'react';
import './CSS/SideMenu2.css'; // Import the CSS
import CartCard from './CartCard'; // Import the CartCard component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import the faArrowRight icon
import { loadCartProducts, removeCartItem } from '../../REST_API/firebaseAPI'; // Import the loadCartProducts function
import { Button } from 'react-bootstrap'; // Import the Button component from Bootstrap

const SideMenu2 = ({ isOpen, onClose }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    loadCartProducts().then((products) => {
      setCartProducts(products);
      setCartCount(products.length); // Set the cart count
    });
  }
  

  const handleRemove = async (productId) => {
    await removeCartItem(productId);
    loadCart();
    setCartCount(cartCount - 1); // Decrement the cart count
  }
  

  // Calculate the total price of cart products
  const totalPrice = cartProducts.reduce((total, product) => total + parseFloat(product.Price), 0);

  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`side-menu ${isOpen ? 'open' : ''} d-flex flex-column`}> {/* Add d-flex and flex-column classes */}
        <div style={{ backgroundColor: '#4eadfe', color: 'white', padding: '10px', marginBottom: '20px', marginTop: '20px' }}>Cart</div> {/* Add marginBottom */}
        <div>TOTAL ({cartProducts.length} Items): {totalPrice.toFixed(2)}€</div>
        <hr style={{ borderColor: '#808080' }} /> {/* Make the line darker */}
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 280px)', marginBottom: '20px' }}> {/* Add this div and marginBottom */}
          {cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <CartCard key={product.id} product={product} onRemove={handleRemove} />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div> {/* End of the added div */}
        <div className="mt-auto"> {/* Add this div and mt-auto class */}
          <Button variant="primary" size="lg" block style={{ marginBottom: '10px' }}> {/* Use a Bootstrap Button */}
            CHECK OUT <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div> {/* End of the added div */}
        <button className="close-button" onClick={onClose} style={{ color: 'black', marginBottom: '10px' }}> {/* Make the close button black and add marginBottom */}
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </>
  );
}

export default SideMenu2;
