import React from "react";
import { Navbar } from 'react-bootstrap';
import "./Header.css";

const Header2 = () => {
  return (
    <Navbar className="mt-4" bg="light" expand="lg" style={{ padding: '20px 5%' }}>
      <Navbar.Brand href="/" className="mx-auto" style={{ fontFamily: "AusterBlack", fontSize: "40px" }}>
        <span style={{ color: "#4eadfe" }}>INTECNO</span>
        <span style={{ color: "#4eadfe" }}>PT</span>
      </Navbar.Brand>
    </Navbar>
  );
}

export default Header2;