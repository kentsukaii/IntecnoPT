import React, { useEffect, useState } from 'react';
import './CSS/SideMenu.css'; // Import the CSS
import BookmarkCard from './BookmarkCard'; // Import the BookmarkCard component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { loadBookmarkedProducts } from '../../REST_API/firebaseAPI'; // Import the loadBookmarkedProducts function

const SideMenu = ({ isOpen, onClose }) => {
  const [bookmarkedProducts, setBookmarkedProducts] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    loadBookmarkedProducts().then((products) => {
      setBookmarkedProducts(products);
    });
  }

  const handleRemove = () => {
    loadBookmarks();
  }

  // Calculate the total price of bookmarked products
  const totalPrice = bookmarkedProducts.reduce((total, product) => total + parseFloat(product.Price), 0);

  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div style={{ backgroundColor: '#4eadfe', color: 'white', padding: '10px', marginBottom: '20px', marginTop: '20px' }}>Bookmarked</div> {/* Add marginBottom */}
        <div>TOTAL ({bookmarkedProducts.length} Items): {totalPrice.toFixed(2)}€</div>
        <hr style={{ borderColor: '#808080' }} /> {/* Make the line darker */}
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}> {/* Add this div */}
          {bookmarkedProducts.length > 0 ? (
            bookmarkedProducts.map((product) => (
              <BookmarkCard key={product.id} product={product} onRemove={handleRemove} />
            ))
          ) : (
            <p>You don't have any bookmarked products yet.</p>
          )}
        </div> {/* End of the added div */}
        <button className="close-button" onClick={onClose} style={{ color: 'black', marginBottom: '10px' }}> {/* Make the close button black and add marginBottom */}
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </>
  );
}

export default SideMenu;
