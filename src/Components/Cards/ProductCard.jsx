import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaStar } from 'react-icons/fa'; // Importing icons
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase"; // Import the already initialized Storage
import { bookmarkProduct } from '../../REST_API/firebaseAPI';

const ProductCard = ({ product, isBestSeller }) => {
  const [imageUrl, setImageUrl] = useState(null);

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
    }
  }, [product]);

  // Check if product is defined
  if (!product) {
    return null; // or return a loading spinner, placeholder, etc.
  }

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
  let colorT = availability.color

  // Function to handle click on title or image
  const handleClick = () => {
    window.location.href = '/placeholder-url'; // Replace with the actual URL
  }

  return (
    <div className="card p-3 border rounded text-left" style={{ flex: '0 0 22rem', marginTop: "1rem", backgroundColor: "#f8f9fa", display: 'inline-block', height: '100%' }}>
      <div style={{ position: 'relative' }}>
        {imageUrl && <img className="card-img-top" src={imageUrl} alt="Card cap" style={{ width: "100%", height: "200px", objectFit: "cover", transition: 'transform .2s', cursor: 'pointer' }} onClick={handleClick} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = ''} />}
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column' }}>
          {product.OnSale && <span className="badge rounded-pill " style={{ backgroundColor: '#24CCA6', padding: '10px', marginBottom: '10px' }}>On Sale</span>}
          {isBestSeller && <span className="badge rounded-pill " style={{ backgroundColor: '#E96616', padding: '10px' }}>Best Seller</span>}
        </div>
      </div>
      <div className="card-body" style={{ height: '100%', overflow: 'auto' }}>
        <h3 className="card-title font-weight-bold" style={{ cursor: 'pointer', color: 'black', transition: 'color .2s' }} onClick={handleClick} onMouseOver={e => e.currentTarget.style.color = '#4EADFE'} onMouseOut={e => e.currentTarget.style.color = 'black'}>{product.Name}</h3>
        <p className="card-text text-muted" style={{ height: '50px', overflow: 'hidden' }}>{product.Description}</p>
        <p className="mb-0" style={{ color: colorT }}><FaCheckCircle /><b> {availability.text}</b></p>
        <p className="" style={{ fontSize: "0.8rem", color: colorT }}>Expected delivery date: {product.ExpectedDeliveryDate}</p>
        <h3 className="d-inline-block mr-2 font-weight-bold">{parseFloat(product.Price).toFixed(2)} €</h3>
        {product.OnSale && <s className="text-muted">{(parseFloat(product.Price) / (1 - parseFloat(product.SalePercentage))).toFixed(2)} €</s>}
        <div className="mt-4">

        <button className="btn text" style={{ backgroundColor: "transparent", color: "#4eadfe", fontSize: "0.8rem" }} onClick={() => bookmarkProduct(product.id)}><FaStar /> Bookmark</button>




        </div>
      </div>
    </div>
  );
}

export default ProductCard;
