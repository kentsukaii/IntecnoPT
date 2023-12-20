import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaTelegram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import stripeLogo from '../../assets/stripe.png';
import '../../fonts/fonts.css';
import './Footer.css';

// Footer1
export const Footer = () => {
    return (
        <footer className="footer p-3 bg-light">
            <Container>
                <Row>
                    <Col className="text-center">
                        <span className="text-muted footer-text">© 2023 IntecnoPT. All rights reserved.</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

const socialMedia = [
    { name: 'Facebook', icon: <FaFacebook />, link: 'https://www.facebook.com' },
    { name: 'Twitter', icon: <FaTwitter />, link: 'https://www.twitter.com' },
    { name: 'Instagram', icon: <FaInstagram />, link: 'https://www.instagram.com' },
    { name: 'YouTube', icon: <FaYoutube />, link: 'https://www.youtube.com' },
    { name: 'TikTok', icon: <FaTiktok />, link: 'https://www.tiktok.com' },
    { name: 'Telegram', icon: <FaTelegram />, link: 'https://www.telegram.com' }
];

const columns = [
    { 
        title: 'Client support', 
        options: [
            { name: 'Help center', link: '/help-center' },
            { name: 'Order shipping and taxes', link: '/shipping-taxes' },
            { name: 'Exchanges and returns', link: '/returns' },
            { name: 'Warranty & RMA', link: '/warranty-rma' },
            { name: 'Payment methods', link: '/payment-methods' }
        ] 
    },
    { 
        title: 'Legal information', 
        options: [
            { name: 'Online account terms and conditions', link: '/terms-conditions' },
            { name: 'Privacy policy', link: '/privacy-policy' },
            { name: 'Cookies policy', link: '/cookies-policy' },
            { name: 'Dispute resolution', link: '/dispute-resolution' },
            { name: 'Complaint book', link: '/complaint-book' }
        ] 
    },
    { 
        title: 'Intecnopt', 
        options: [
            { name: 'About us', link: '/about-us' },
            { name: 'Intecnopt for companies', link: '/for-companies' },
            { name: 'Recruitment', link: '/recruitment' }
        ] 
    },
    { 
        title: 'Useful links', 
        options: [
            { name: 'Customer area', link: '/customer-area' },
            { name: 'Blog', link: '/blog' },
            { name: 'Refurbished', link: '/refurbished' }
        ] 
    }
];

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


// Footer2
export const Footer2 = () => {
    return (
        <footer className="footer py-4">
            <Container>
                <Row className="no-gutters align-items-start">
                    <Col>
                        <Link to="/" onClick={handleClick} style={{ textDecoration: 'none' }}>
                            <div className="d-lg-block" style={{ fontFamily: "AusterBlack", fontSize: "40px", marginRight: '20px', userSelect: 'none' }}>
                                <span style={{ color: "#4eadfe" }}>INTECNO</span>
                                <span style={{ color: "#4eadfe" }}>PT</span>
                            </div>
                        </Link>
                        <div className="d-flex justify-content-between">
                            {socialMedia.map((media, index) => (
                                <Button variant="link" key={index} className="px-1">
                                    <Link to={media.link}>
                                        <div className={`d-flex justify-content-center align-items-center rounded-circle bg-light p-1 p-sm-1`}>
                                            {media.icon}
                                        </div>
                                    </Link>
                                </Button>
                            ))}
                        </div>
                        <img src={stripeLogo} alt="Stripe" width="50" height="50" />
                    </Col>

                    {columns.map((column, index) => (
                        <Col key={index} className="mb-2">
                            <Button variant="link"><h5>{column.title}</h5></Button>
                            {column.options.map((option, index) => (
                                <Button variant="link" key={index} className="btn-link small my-0" style={{ textTransform: 'none' }}>
                                    <Link to={option.link} onClick={handleClick}>{option.name}</Link>
                                </Button>
                            ))}
                        </Col>
                    ))}
                </Row>
            </Container>
        </footer>
    );
}

// Footer3
export const Footer3 = () => {
    return (
        <footer className="footer3 mt-4 p-3 bg-light">
            <Container>
                <Row>
                    <Col className="text-center">
                        <span className="text-muted footer-text">© 2023 IntecnoPT. All rights reserved.</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}