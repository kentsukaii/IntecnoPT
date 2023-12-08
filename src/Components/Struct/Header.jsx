// Importing React, react-router-dom, and MDB modules
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { Dropdown, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import maguire from "../../assets/godmaguire.jpg";
import "../../fonts/fonts.css";
import "./Header.css";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" style={{ padding: '20px 5%' }}>
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
          <Nav.Link href="/cart" className="order-1 ml-auto align-self-center flex-shrink-0 text-center mx-auto d-lg-none" style={{ position: 'absolute', top: '20px', left: '5%' }}>
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            <span className="badge badge-warning">5</span>
          </Nav.Link>
          <Nav.Link href="/cart" className="order-1 ml-auto align-self-center flex-shrink-0 text-center mx-auto d-none d-lg-block">
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            <span className="badge badge-warning">5</span>
          </Nav.Link>
          <Dropdown className="order-2" align="end" style={{ marginLeft: '20px' }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic" as="img" src={maguire} alt="menu icon" width="75" height="75" style={{ borderRadius: "50%", border: "2px solid blue" }}>
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight style={{ width: "80%" }}>
              <Dropdown.Item href="/profile" className="text-center">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/settings" className="text-center">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/logout" className="text-center">Logout</Dropdown.Item>
            </Dropdown.Menu>


          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
