import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../Pages/CSS/HomePage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faBars } from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Row, Col } from 'react-bootstrap'; import { useMediaQuery } from 'react-responsive';
import { FaCheckCircle, FaStar } from 'react-icons/fa'; // Importing icons
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../Components/Cards/ProductCard';


const HomePage = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro durante o logout:", error);
    }
  };

  const carousel_images = [
    "src/Components/Images/Carousel/pcdiga_camera.jpg",
    "src/Components/Images/Carousel/intecno1.png",
  ];

  const circle_images = [
    "src/Components/Images/Circles/Prebuilt_Computers.png",
    "src/Components/Images/Circles/Components.png",
    "src/Components/Images/Circles/Peripherals.png",
    "src/Components/Images/Circles/Laptops.png",
  ];

  const names = ["Desktop Computers", "Components", "Peripherals", "Laptops"];

  const routes = [
    "/card",
    "/templatepage",
    "/templatepage",
    "/templatepage",
  ];


  // Function to chunk an array into smaller arrays
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  // Generate rows based on the chunked circle_images
  const rows = chunkArray(circle_images, 4);

  const productCards = Array.from({ length: 15 }, (_, i) => (
    <div className="m-2" key={i}>
      <ProductCard />
    </div>
  ));

  // TEMPORARY FUNCTION N TOCA ROSA XE

  const renderCards = () => {
    const cards = [];
    for (let i = 0; i < 15; i++) {
      cards.push(<ProductCard key={i} />);
    }
    return cards;
  };



  return (
    <div className="container-fluid custom-class p-0">
      <div className="row m-0">
        <div className="col-md-12 mt-3 p-0">
          <MDBCarousel showIndicators showControls fade>
            {carousel_images.map((image, i) => (
              <MDBCarouselItem itemId={i + 1} key={i} >
                <img
                  src={image}
                  className="d-block w-100"
                  alt={`Slide ${i + 1}`}
                  style={{ height: "300px", width: "1584px" }}
                />
              </MDBCarouselItem>
            ))}
          </MDBCarousel>









          <div className="col-md-12 mt-4 p-0">
            <div
              className="bg-white p-5 d-flex justify-content-start align-items-start flex-wrap"
              style={{ color: "white" }}
            >
              {circle_images.map((image, i) => (
                <Link to={routes[i]} style={{ width: "25%", padding: "1%" }}>
                  <div
                    key={i}
                    className="text-center d-flex flex-column align-items-center circle-container"
                    style={{ width: "100%" }}
                  >
                    <div
                      className="circle bg-light rounded-circle d-flex justify-content-center align-items-center"
                      style={{ width: "50%", height: "50%", margin: "0 auto" }}
                    >
                      <img
                        src={image}
                        alt={`Circle ${i + 1}`}
                        className="rounded-circle"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }} // Set the width and height to be the same
                      />
                    </div>
                    <div
                      className="mt-2 circle-text"
                      style={{ color: "black", fontWeight: "bold", fontSize: "1.5vmin" }}
                    >
                      {names[i]}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>





          <div style={{ backgroundColor: "#f1f1f1" }}>

            <div className="col-12 p-0 overflow-auto"> {/* TOP SALES TITLE */}
              <div className="d-flex align-items-center p-4">
                <div style={{ height: '2rem', width: '0.3rem', backgroundColor: 'blue', marginRight: '8px' }}></div>
                <h2 style={{ margin: 0, fontSize: '2.3rem', lineHeight: '2rem' }}><b>TOP SALES</b></h2>
              </div>
            </div>

            <div className="col-12 p-0 overflow-x-auto"> {/* TOP SALES CONTAINER */}

              <div className="d-flex flex-row flex-nowrap p-3 align-items-start custom-class w-100" style={{ gap: '1rem' }}>
                {/* RENDER THE CARDS HERE */}
                {renderCards()}
              </div>

            </div>

          </div>












          <div className="col-md-12 mt-4 p-0">
            <div
              className="bg-black p-5 mx-auto"
              style={{ height: "110px", maxWidth: "98.5%", color: "white" }}
            >
              {"ADVERTISING"}
            </div>

          </div>



          <div className="mt-4" style={{ backgroundColor: "#f1f1f1" }}>

            <div className="col-12 p-0 overflow-auto"> {/* PROMOTIONS TITLE */}
              <div className="d-flex align-items-center p-4">
                <div style={{ height: '2rem', width: '0.3rem', backgroundColor: 'blue', marginRight: '8px' }}></div>
                <h2 style={{ margin: 0, fontSize: '2.3rem', lineHeight: '2rem' }}><b>PROMOTIONS</b></h2>
              </div>
            </div>

            <div className="col-12 p-0 overflow-x-auto"> {/* TOP SALES CONTAINER */}

              <div className="d-flex flex-row flex-nowrap p-3 align-items-start custom-class w-100" style={{ gap: '1rem' }}>
                {/* RENDER THE CARDS HERE */}
                {renderCards()}
              </div>

            </div>

          </div>


        </div>
      </div>
    </div>

  );
};

export default HomePage;