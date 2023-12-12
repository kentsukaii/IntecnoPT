import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../Pages/CSS/HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faBars } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { FaCheckCircle, FaStar } from "react-icons/fa"; // Importing icons
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../Components/Cards/ProductCard";
import { getTopSellingProducts } from "../REST_API/firebaseAPI";
import { getOnSaleProducts } from "../REST_API/firebaseAPI";

const HomePage = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: "portrait" });
  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    const fetchTopSellingProducts = async () => {
      const products = await getTopSellingProducts();
      setTopSellingProducts(products);
    };
    getOnSaleProducts().then(setOnSaleProducts);
    fetchTopSellingProducts();
  }, []);


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

  const routes = ["/login", "/register", "/templatepage", "/templatepage"];

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
              <MDBCarouselItem itemId={i + 1} key={i}>
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
                <div
                  onClick={() => (window.location.href = routes[i])}
                  style={{ width: "25%", padding: "1%", cursor: "pointer" }}
                >
                  <div
                    key={i}
                    className="text-center d-flex flex-column align-items-center circle-container"
                    style={{ width: "100%" }}
                  >
                    <div
                      className="circle bg-light rounded-circle d-flex justify-content-center align-items-center"
                      style={{
                        width: "50%",
                        height: "50%",
                        margin: "0 auto",
                        transition: "transform .2s, border-color .2s",
                        border: "solid 3px transparent",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                        e.currentTarget.style.borderColor = "#4EADFE";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      <img
                        src={image}
                        alt={`Circle ${i + 1}`}
                        className="rounded-circle"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }} // Set the width and height to be the same
                      />
                    </div>
                    <div
                      className="mt-2 circle-text"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "1.5vmin",
                      }}
                    >
                      {names[i]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: "#f1f1f1" }}>
            <div className="col-12 p-0 overflow-auto">
              <div className="d-flex align-items-center p-4">
                <div
                  style={{
                    height: "2rem",
                    width: "0.3rem",
                    backgroundColor: "#4EADFE",
                    marginRight: "8px",
                  }}
                ></div>
                <h2
                  style={{ margin: 0, fontSize: "2.3rem", lineHeight: "2rem" }}
                >
                  <b>TOP SALES</b>
                </h2>
              </div>
            </div>
            <div className="col-12 p-0 overflow-x-auto">
              <div
                className="d-flex flex-row flex-nowrap p-3 align-items-start custom-class w-100"
                style={{ gap: "1rem" }}
              >
                {topSellingProducts.map((product) => (
                  <ProductCard
                    key={product.Name}
                    product={product}
                    isBestSeller={product.isBestSeller}
                  />
                ))}
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
            <div className="col-12 p-0 overflow-auto">
              <div className="d-flex align-items-center p-4">
                <div
                  style={{
                    height: "2rem",
                    width: "0.3rem",
                    backgroundColor: "#4EADFE",
                    marginRight: "8px",
                  }}
                ></div>
                <h2
                  style={{ margin: 0, fontSize: "2.3rem", lineHeight: "2rem" }}
                >
                  <b>ON SALE</b>
                </h2>
              </div>
            </div>
            <div className="col-12 p-0 overflow-x-auto">
              <div
                className="d-flex flex-row flex-nowrap p-3 align-items-start custom-class w-100"
                style={{ gap: "1rem" }}
              >
                {onSaleProducts.map((product) => (
                  <ProductCard key={product.Name} product={product} />
                ))}
              </div>
            </div>
          </div>
          <div className="container-fluid mt-4">
  <div className="row no-gutters justify-content-center">
    <div
      className="col text-white text-left py-5 mx-2 d-flex align-items-center justify-content-start"
      style={{ backgroundColor: "grey", boxSizing: "border-box" }}
    >
      <i className="fas fa-shipping-fast fa-2x mb-5 mr-3 ml-4"></i>
      <div>
        <h2>
          <strong>DELIVERY IN 24 HOURS</strong>
        </h2>
        <p>Average delivery time, only for MainLand Portugal</p>
      </div>
    </div>
    <div
      className="col text-white text-left py-5 mx-2 d-flex align-items-center justify-content-start"
      style={{ backgroundColor: "#4eadfe", boxSizing: "border-box" }}
    >
      <i className="fas fa-shopping-cart fa-2x mb-7 mr-4 ml-4"></i>
      <div>
        <h2>
          <strong>100% ONLINE STORE</strong>
        </h2>
        <div style={{ maxWidth: "90%" }}>
          <p>
            Make your purchases in the comfort of your home with the
            Intecno quality guarantee
          </p>
        </div>
      </div>
    </div>
    <div
      className="col text-white text-left py-5 mx-2 d-flex align-items-center justify-content-start"
      style={{ backgroundColor: "grey", boxSizing: "border-box" }}
    >
      <i className="fas fa-box fa-2x mb-5 mr-4 ml-4"></i>
      <div>
        <h2>
          <strong>FREE SHIPPING</strong>
        </h2>
        <p>
        Take advantage of free shipping on our entire website
        </p>
      </div>
    </div>
  </div>
</div>
          <div
            className="d-flex mt-2 mb-4 justify-content-center align-items-center"
            style={{ height: "2rem" }}
          >
            <div
              style={{
                width: "5%",
                height: "0.3rem",
                backgroundColor: "#4EADFE",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
