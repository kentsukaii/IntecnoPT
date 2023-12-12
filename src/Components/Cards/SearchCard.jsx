import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase'; // Import the already initialized Firebase storage
import { bookmarkProduct } from '../../REST_API/firebaseAPI';

const SearchCard = ({ product, isBestSeller }) => {
    const navigate = useNavigate(); // Will be used to access the page for each product
    const [imageUrl, setImageUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      if (product) {
        const imageRef = ref(storage, `${product.Category}/${product.ImageReference}`);
        getDownloadURL(imageRef)
          .then((url) => {
            setImageUrl(url);
          })
          .catch((error) => {
            console.error('Error getting image URL: ', error);
          });
        console.log('product.id:', product.id); // Debugging line
      }
    }, [product]);
  
    // Function to determine availability text and color
    const getAvailability = (stock) => {
      if (stock > 0) {
        return {
          text: 'Available',
          color: stock <= 10 ? '#E8A200' : '#008000' // yellow and green in hexadecimal
        };
      } else {
        return {
          text: 'Not Available',
          color: '#FF0000' // red in hexadecimal
        };
      }
    }
  
    const availability = getAvailability(product.StockAvailable);
    let colorT = availability.color;
  
    const handlePageLink = () => {
      navigate(`/products/${product.id}`);
    };

  return (
<div className="card search-card p-3 border rounded text-left" style={{ flex: '0 0 18rem', marginTop: "1rem", backgroundColor: "#f8f9fa", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  <div style={{ position: 'relative' }}>
    {imageUrl && <img className="card-img-top" src={imageUrl} alt="Card cap" style={{ width: "100%", height: "150px", objectFit: "cover", transition: 'transform .2s', cursor: 'pointer' }} onClick={handlePageLink} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = ''} />}
    <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column' }}>
      {product.OnSale && <span className="badge rounded-pill " style={{ backgroundColor: '#24CCA6', padding: '10px', marginBottom: '10px' }}>On Sale</span>}
      {isBestSeller && <span className="badge rounded-pill " style={{ backgroundColor: '#E96616', padding: '10px' }}>Best Seller</span>}
    </div>
  </div>

  <div className="search-card-body" style={{ height: '100%', overflow: 'auto' }}>
    <h5 className="search-card-title font-weight-bold" style={{ cursor: 'pointer', color: 'black', transition: 'color .2s' }} onClick={handlePageLink} onMouseOver={e => e.currentTarget.style.color = '#4EADFE'} onMouseOut={e => e.currentTarget.style.color = 'black'}>{product.Name}</h5>
    <p className="search-card-text text-muted" style={{ height: '50px', overflow: 'hidden', fontSize: '0.8rem' }}>{product.Description}</p>
    <p className="mb-0" style={{ color: colorT, fontSize: '0.8rem' }}><FontAwesomeIcon icon={faCheckCircle} /><b> {availability.text}</b></p>

    <p className="" style={{ fontSize: "0.7rem", color: colorT }}>Expected delivery date: {product.ExpectedDeliveryDate}</p>
    <h5 className="d-inline-block mr-2 font-weight-bold">{parseFloat(product.Price).toFixed(2)} €</h5>
    {product.OnSale && <s className="text-muted">{(parseFloat(product.Price) / (1 - parseFloat(product.SalePercentage))).toFixed(2)} €</s>}
    <div className="mt-4">

      <button className="btn text" style={{ backgroundColor: "transparent", color: "#4eadfe", fontSize: "0.7rem" }} onClick={() => bookmarkProduct(product.id, setShowModal)}><FontAwesomeIcon icon={faStar} /> Bookmark</button>


    </div>
  </div>
  <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header style={{ backgroundColor: '#4eadfe', color: 'white' }}>
      <Modal.Title><FontAwesomeIcon icon={faCheckCircle} /> Success</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p> Product successfully added to bookmarks!</p>
      <img alt="Bookmark Icon" style={{ width: '150px', height: '150px', display: 'block', margin: 'auto' }} />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={() => setShowModal(false)}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
</div>


  );
};

export default SearchCard;
