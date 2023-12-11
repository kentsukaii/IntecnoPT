// Importing React, react-router-dom, and MDB modules
import { faShoppingCart, faMoon, faSun, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from "react";
import { Dropdown, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import maguire from "../../assets/godmaguire.png";
import "../../fonts/fonts.css";
import "./Header.css";
import SideMenu from '../../Components/Cards/SideMenu';
import SideMenu2 from '../../Components/Cards/SideMenu2';
import { useFirebaseAuth, useFirebaseLogin } from '../../Pages/BackendFiles/Backend';
import { loadBookmarkedProducts } from '../../REST_API/firebaseAPI';
import { loadCartProducts } from '../../REST_API/firebaseAPI';
import { getProductCount } from '../../REST_API/firebaseAPI';
import { getAuth } from "firebase/auth";
import { firestore } from '../../firebase';
import { doc, getDoc, collection } from "firebase/firestore";

const Header = ({ productCount }) => {
  const { handleLogout } = useFirebaseAuth();
  const { user } = useFirebaseLogin();
  const [darkMode, setDarkMode] = useState(false);
  const [isBookmarkMenuOpen, setBookmarkMenuOpen] = useState(false);
  const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
  const [isBookmarkLoading, setBookmarkLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [isCartMenuOpen, setCartMenuOpen] = useState(false);
  const [isCartLoading, setCartLoading] = useState(false);



  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // CODE FOR THE SECOND SIDE MENU - SIDE MENU 2 

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // ------------------------------------------

  // Load bookmarks both client and server sided 
  const loadBookmarks = async () => {
    setBookmarkLoading(true);
    const products = await loadBookmarkedProducts();
    setBookmarkedProducts(products);
    setBookmarkLoading(false);
    setBookmarkMenuOpen(true);
  };

  // Do the same but with item carts
  const loadCart = async () => {
    setCartLoading(true);
    const products = await loadCartProducts();
    setCartProducts(products);
    setCartLoading(false);
    setCartMenuOpen(true);
  };




  return (
    <Navbar className="mt-4" bg="light" expand="lg" style={{ padding: '20px 5%' }}>
      <Navbar.Brand href="/" className="d-none d-lg-block" style={{ fontFamily: "AusterBlack", fontSize: "40px", marginRight: '20px' }}>
        <span style={{ color: "#4eadfe" }}>INTECNO</span>
        <span style={{ color: "#4eadfe" }}>PT</span>
      </Navbar.Brand>

      <div className="d-flex justify-content-center w-100" style={{ maxWidth: "100%" }}>
        <Form inline className="mx-auto" style={{ width: '50%' }}>
          <FormControl type="text" placeholder="Search" className="w-100" style={{ height: '50px' }} />
        </Form>
      </div>

      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ position: 'absolute', top: '20px', right: '5%' }} />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end align-items-center">
        <Nav>
          <Nav.Link onClick={toggleDarkMode} className="order-0 ml-auto align-self-center flex-shrink-0 text-center mx-auto d-none d-lg-block">
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="2x" />
          </Nav.Link>


          <Nav.Link className="order-1 ml-auto align-self-center flex-shrink-0 text-center mx-auto d-none d-lg-block" onClick={loadBookmarks}>
            <FontAwesomeIcon icon={faStar} size="2x" />
          </Nav.Link>
          {isBookmarkLoading ? <p></p> : <SideMenu isOpen={isBookmarkMenuOpen} onClose={() => setBookmarkMenuOpen(false)} bookmarkedProducts={bookmarkedProducts} />}

          <Nav.Link className="order-2 ml-auto align-self-center flex-shrink-0 text-center mx-auto d-none d-lg-block" onClick={loadCart}>
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            
          </Nav.Link>

          {isCartLoading ? <p></p> : <SideMenu2 isOpen={isCartMenuOpen} onClose={() => setCartMenuOpen(false)} cartProducts={cartProducts} />}

          <Dropdown className="order-2" align="end" style={{ marginLeft: '20px' }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic" as="img" src={maguire} alt="menu icon" width="75" height="75" style={{ borderRadius: "50%", border: "2px solid #4eadfe" }}>
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight style={{ width: "80%" }}>
              <Dropdown.Item href="/profile" className="text-center">Profile</Dropdown.Item>
              <Dropdown.Item href="/myordersinvoices" className="text-center">My Orders / Invoices</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/" className="text-center" onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  );
}

export default Header;
