import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaTelegram } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // import the Link component
import stripeLogo from '../../assets/stripe.png';
import '../../fonts/fonts.css';

const Footer2 = () => {
  const socialMedia = [
    { name: 'Facebook', icon: <FaFacebook /> },
    { name: 'Twitter', icon: <FaTwitter /> },
    { name: 'Instagram', icon: <FaInstagram /> },
    { name: 'YouTube', icon: <FaYoutube /> },
    { name: 'TikTok', icon: <FaTiktok /> },
    { name: 'Telegram', icon: <FaTelegram /> }
  ];
  
  const columns = [
    { title: 'Client support', options: ['Help center', 'Order shipping and taxes', 'Exchanges and returns', 'Warranty & RMA', 'Payment methods' ] },
    { title: 'Legal information', options: ['Online account terms and conditions', 'Privacy policy', 'Cookies policy', 'Dispute resolution', 'Complaint book' ] },
    { title: 'Intecnopt', options: ['About us', 'Intecnopt for companies', 'Recruitment'] },
    { title: 'Useful links', options: ['Customer area', 'Blog', 'Refurbished'] }
  ];

  return (
    <footer className="footer py-4">
      <Container>
        <Row className="no-gutters align-items-start">
          <Col>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="d-lg-block" style={{ fontFamily: "AusterBlack", fontSize: "40px", marginRight: '20px', userSelect: 'none' }}>
                <span style={{ color: "#4eadfe" }}>INTECNO</span>
                <span style={{ color: "#4eadfe" }}>PT</span>
              </div>
            </Link>
            <div className="d-flex justify-content-between">
              {socialMedia.map((media, index) => (
                <Button variant="link" key={index} className="px-1">
                  <div className={`d-flex justify-content-center align-items-center rounded-circle bg-light p-1 p-sm-1`}>
                    {media.icon}
                  </div>
                </Button>
              ))}
            </div>
            <img src={stripeLogo} alt="Stripe" width="50" height="50" />
          </Col>

          {columns.map((column, index) => (
            <Col key={index} className="mb-2">
              <Button variant="link"><h5>{column.title}</h5></Button>
              {column.options.map((option, index) => (
                <Button variant="link" key={index} className="btn-link small my-0" style={{ textTransform: 'none' }}>{option}</Button>
              ))}
            </Col>
          ))}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer2;
