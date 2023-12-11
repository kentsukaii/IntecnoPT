import React, { useEffect, useState } from 'react';
import './CSS/SideMenu2.css'; // Import the CSS
import CartCard from './CartCard'; // Import the CartCard component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { loadCartProducts } from '../../REST_API/firebaseAPI'; // Import the loadCartProducts function

const SideMenu2 = ({ isOpen, onClose }) => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    loadCartProducts().then((products) => {
      setCartProducts(products);
    });
  }

  const handleRemove = () => {
    loadCart();
  }

  // Calculate the total price of cart products
  const totalPrice = cartProducts.reduce((total, product) => total + parseFloat(product.Price), 0);

  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div style={{ backgroundColor: '#4eadfe', color: 'white', padding: '10px', marginBottom: '20px', marginTop: '20px' }}>Cart</div> {/* Add marginBottom */}
        <div>TOTAL ({cartProducts.length} Items): {totalPrice.toFixed(2)}€</div>
        <hr style={{ borderColor: '#808080' }} /> {/* Make the line darker */}
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}> {/* Add this div */}
          {cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <CartCard key={product.id} product={product} onRemove={handleRemove} />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div> {/* End of the added div */}
        <button className="close-button" onClick={onClose} style={{ color: 'black', marginBottom: '10px' }}> {/* Make the close button black and add marginBottom */}
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </>
  );
}

export default SideMenu2;
