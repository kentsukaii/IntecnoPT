// Importing React and react-router-dom modules
import React from 'react';
import maguire from '../../assets/godmaguire.jpg';
import logotype from '../../assets/logotype.png';
import './Header.css';



// Defining the Header component as a function
function Header() {
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
                                <a className="nav-link" href="/team">Team</a>
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
                                    <li><a className="dropdown-item" href="/logout">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header >






    );
}

// Exporting the component for use in other files
export default Header;
