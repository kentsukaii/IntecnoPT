import React from 'react';
import './CSS/SideMenu.css'; // Import the CSS

const SideMenu = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <button onClick={onClose}>Close</button>
        {/* Add your menu items here */}
      </div>
    </>
  );
}

export default SideMenu;
