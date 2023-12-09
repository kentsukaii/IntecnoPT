import React from 'react';
import { FaCheckCircle, FaStar } from 'react-icons/fa'; // Importing icons

const ProductCard = () => {
  return (
    <div className="card p-3 border rounded text-left" style={{ flex: '0 0 22rem', marginTop: "1rem", backgroundColor: "#f8f9fa", display: 'inline-block' }}>
      <img className="card-img-top" src="https://via.placeholder.com/350" alt="Card cap" style={{ width: "100%" }} />
      <div className="card-body">
        <h3 className="card-title font-weight-bold">Product Title</h3>
        <p className="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <p className="text-success mb-0"><FaCheckCircle /> Available</p>
        <p className="text-success" style={{ fontSize: "0.8rem" }}>Expected delivery date: MM/DD/YYYY</p>
        <h3 className="d-inline-block mr-2 font-weight-bold">00,00 €</h3>
        <s className="text-muted">00,00 €</s>
        <div className="mt-4">
          <button className="btn text" style={{ backgroundColor: "transparent", color: "#4eadfe", fontSize: "0.8rem" }}><FaStar /> Bookmark</button>
        </div>
      </div>
    </div>

  );
}

export default ProductCard;
