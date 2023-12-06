<<<<<<< HEAD
// Importing React and react-router-dom modules
import React from 'react';
import maguire from '../../assets/godmaguire.jpg';
import logotype from '../../assets/logotype.png';
import { BrowserRouter } from 'react-router-dom';
import './Header.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useFirebaseLogin } from "../../Pages/Backend";
=======
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
>>>>>>> 1195eeded3aa390852812d627c47fe4b40189486

      <div className="d-flex justify-content-center w-100" style={{maxWidth: "100%"}}>
        <Form inline className="mx-auto" style={{width: '50%'}}>
          <FormControl type="text" placeholder="Search" className="w-100" style={{height: '50px'}}/>
        </Form>
      </div>

<<<<<<< HEAD
// Defining the Header component as a function
function Header() {

    const {
        handleLogout,
      } = useFirebaseLogin();

    return (
        // JSX that represents the header element

        <header className="header shadow-none">
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ height: '80px' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logotype} alt="Your Brand" style={{ height: '70px', width: '180px' }} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Homepage</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/card">Card</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/projects">Projects</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">

                            <div className="form-check form-switch"> 
                                <input className="form-check-input" type="checkbox" id="darkModeSwitch" />
                                <label className="form-check-label" htmlFor="darkModeSwitch">
                                    <i className="fas fa-sun"></i>
                                    <i className="fas fa-moon"></i>
                                </label>
                            </div>

                            <a className="nav-link position-relative" href="/cart">
                                <i className="fas fa-shopping-cart fa-lg"></i>
                                <span className="badge bg-warning position-absolute top-0 start-90 translate-middle">1</span>
                            </a>
                            <div className="dropdown">
                                <a className="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={maguire} alt="Profile" className="rounded-circle" style={{ width: '60px', height: '60px' }} />
                                    <span className="badge bg-warning position-relative top-0 start-0 translate-middle">18</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                    <li><a className="dropdown-item" href="/settings">Settings</a></li>
                                    <li><a className="dropdown-item" href="/notifications">Notifications</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/logout" onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header >






    );
=======
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
>>>>>>> 1195eeded3aa390852812d627c47fe4b40189486
}

export default Header;
