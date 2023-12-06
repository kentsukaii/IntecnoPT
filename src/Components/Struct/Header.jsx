// Importing React, react-router-dom, and MDB modules
import {
    MDBCol,
    MDBIcon
} from "mdbreact";
import React, { useState } from "react";
import maguire from "../../assets/godmaguire.jpg";
import logotype from "../../assets/logotype.png";
import menuicon from "../../assets/menu.png";
import "./Header.css";
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import "../../fonts/fonts.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" style={{ padding: '20px 5%' }}>
      <Navbar.Brand href="#home" className="d-none d-lg-block" style={{fontFamily: "QuartzoBold", fontSize: "40px", marginRight: '20px'}}>
        <span style={{color: "#ff0000"}}>Intecno</span>
        <span style={{color: "#0000ff"}}>PT</span>
      </Navbar.Brand>

      <div className="d-flex justify-content-center w-100" style={{maxWidth: "100%"}}>
        <Form inline className="mx-auto" style={{width: '50%'}}>
          <FormControl type="text" placeholder="Search" className="w-100" style={{height: '50px'}}/>
        </Form>
      </div>

      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{position: 'absolute', top: '20px', right: '5%'}} />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end align-items-center">
        <Nav>
          <Nav.Link href="#cart" className="order-1 ml-auto align-self-center flex-shrink-0 text-center mx-auto d-lg-none" style={{position: 'absolute', top: '20px', left: '5%'}}> 
            <FontAwesomeIcon icon={faShoppingCart} size="2x" /> 
            <span className="badge badge-warning">5</span> 
          </Nav.Link>
          <Nav.Link href="#cart" className="order-1 ml-auto align-self-center flex-shrink-0 text-center mx-auto d-none d-lg-block"> 
            <FontAwesomeIcon icon={faShoppingCart} size="2x" /> 
            <span className="badge badge-warning">5</span> 
          </Nav.Link>
          <Dropdown className="order-2" align="end" style={{marginLeft: '20px'}}> 
            <Dropdown.Toggle variant="success" id="dropdown-basic" as="img" src={maguire} alt="menu icon" width="75" height="75" style={{borderRadius: "50%", border: "2px solid blue"}}>
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight style={{width: "80%"}}>
              <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
