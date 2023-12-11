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


const Header = () => {
  const { handleLogout } = useFirebaseAuth();
  const { user } = useFirebaseLogin();
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const loadBookmarks = async () => {
    setIsLoading(true);
    const products = await loadBookmarkedProducts();
    setBookmarkedProducts(products);
    setIsLoading(false);
    setMenuOpen(true);
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

          <Nav.Link href="/cart" className="order-1 ml-auto align-self-center flex-shrink-0 text-center mx-auto d-lg-none" style={{ position: 'absolute', top: '20px', left: '5%' }}>
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            <span className="badge badge-warning">5</span>
          </Nav.Link>

          <Nav.Link className="order-1 ml-auto align-self-center flex-shrink-0 text-center mx-auto d-none d-lg-block" onClick={handleOpen}>
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            <span className="badge badge-warning">5</span>
          </Nav.Link>
          <SideMenu2 isOpen={isOpen} onClose={handleClose} />

          <Nav.Link onClick={loadBookmarks} className="order-1 ml-auto align-self-center flex-shrink-0 text-center mx-auto d-none d-lg-block">
            <FontAwesomeIcon icon={faStar} size="2x" />
          </Nav.Link>
          {isLoading ? <p></p> : <SideMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} bookmarkedProducts={bookmarkedProducts} />} {/* HANDLE LOADING MESSAGE ETC */}


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
