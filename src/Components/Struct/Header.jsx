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

// Defining the Header component as a function
function Header() {
  const [openNavExternal, setOpenNavExternal] = useState(false);

  return (
    <header
      className="header shadow-none d-flex align-items-center"
      style={{ height: "78.7px" }}
    >
      <nav className="navbar navbar-expand-lg navbar-white bg-white w-100">
        <div className="container-fluid">
          <div className="row w-100">
            <div className="col-md-3 d-flex align-items-center justify-content-start">
            <button type="button" className="btn" style={{backgroundColor: 'white', borderRadius: '20px'}} data-mdb-ripple-init data-mdb-ripple-color="dark" >
    <img src={menuicon} alt="menuicon" style={{width: '25px', height: '25px'}}/> 
</button>              
<a className="navbar-brand ml-3" href="/">                <img
                  src={logotype}
                  alt="Your Brand"
                  style={{ width: "200px", height: "80%"}}
                />
              </a>
            </div>
            <MDBCol
              md="6"
              className="d-flex align-items-center justify-content-center"
              style={{ marginTop: "20px" }}
            >
              <div className="active-pink-3 active-pink-4 mb-4 position-relative no-focus-outline">
                <input
                  className="form-control pl-5"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  style={{
                    backgroundColor: "#E0E0E0",
                    width: "600px",
                    height: "50px",
                  }}
                />
                <MDBIcon
                  icon="search"
                  className="position-absolute"
                  style={{ left: "15px", top: "17px" }}
                />
              </div>
            </MDBCol>

            <div className="col-md-3 d-flex align-items-center justify-content-end">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="darkModeSwitch"
                />
                <label className="form-check-label" htmlFor="darkModeSwitch">
                  <i className="fas fa-sun"></i>
                  <i className="fas fa-moon"></i>
                </label>
              </div>
              <a className="nav-link position-relative" href="/cart">
                <i className="fas fa-shopping-cart fa-lg"></i>
                <span className="badge bg-warning position-absolute top-0 start-90 translate-middle">
                  1
                </span>
              </a>
              <div className="dropdown">
                <a
                  className="nav-link d-flex align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={maguire}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <span className="badge bg-warning position-relative top-0 start-0 translate-middle">
                    18
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="/profile">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/settings">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/notifications">
                      Notifications
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/logout">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

// Exporting the component for use in other files
export default Header;
