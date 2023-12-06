import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Components/Cards/ProductCard";
import "../Pages/CSS/HomePage.css";

const HomePage = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

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

  const circle_images = [
    "src/Components/Images/Circles/Prebuilt_Computers.png",
    "src/Components/Images/Circles/Components.png",
    "src/Components/Images/Circles/Peripherals.png",
    "src/Components/Images/Circles/Laptops.png",
  ];

  const carousel_images = [
    "src/Components/Images/Carousel/pcdiga_camera.jpg",
    "src/Components/Images/Carousel/pcdiga_christmas.jpg",
    "src/Components/Images/Carousel/pcdiga_christmas_2.jpg",
    "src/Components/Images/Carousel/pcdiga_christmas_3.jpg",
    "src/Components/Images/Carousel/pcdiga_christmas_4.jpg",
    "src/Components/Images/Carousel/pcdiga_computer.jpg",
    "src/Components/Images/Carousel/pcdiga_vacuum_cleaner.jpg",
  ];

  const names = ["Prebuilt Computers", "Components", "Peripherals", "Laptops"];

  const routes = [
    "/templatepage",
    "/templatepage",
    "/templatepage",
    "/templatepage",
  ];

  const productCards = Array.from({ length: 15 }, (_, i) => (
    <div className="m-2" key={i}>
      <ProductCard />
    </div>
  ));

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
                />
              </MDBCarouselItem>
            ))}
          </MDBCarousel>
          <div className="col-md-12 mt-4 p-0">
            <div
              className="bg-white p-5 d-flex justify-content-around align-items-center"
              style={{ height: "200px", color: "white" }}
            >
              {circle_images.map((image, i) => (
                <Link to={routes[i]}>
                  <div
                    key={i}
                    className="text-center d-flex flex-column align-items-center circle-container"
                  >
                    <div
                      className="circle bg-light rounded-circle d-flex justify-content-center align-items-center"
                      style={{ width: "110px", height: "110px", margin: "0" }}
                    >
                      <img
                        src={image}
                        alt={`Circle ${i + 1}`}
                        className="rounded-circle"
                        style={{ width: "95%", height: "95%" }}
                      />
                    </div>
                    <div
                      className="mt-2 circle-text"
                      style={{ color: "black", negrita: "bold"}}
                    >
                      {names[i]}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-md-12 mt-4 p-0 ">
            <div
              className="bg-info p-0 d-flex flex-column align-items-center "
              style={{ height: "690px" }}
            >
              <div
                className="bg-dark p-3 d-flex justify-content-around align-items-center m-0 custom-class w-100"
                style={{
                  height: "28px",
                }}
              ></div>
              <div
                className="bg-success p-3  d-flex justify-content-around align-items-center  custom-class w-100"
                style={{
                  height: "50px",
                }}
              ></div>
              <div
                className="bg-white p-3  d-flex justify-content-around align-items-center  custom-class w-100"
                style={{
                  height: "576px",
                }}
              >
              </div>
            </div>
            <div className="col-md-12 mt-4 p-0">
              <div
                className="bg-black p-5 mx-auto"
                style={{ height: "110px", maxWidth: "98.5%", color: "white" }}
              >
                {"ADVERTISING"}
              </div>
              <div className="col-md-12 mt-4 p-0 ">
            <div
              className="bg-info p-0 d-flex flex-column align-items-center "
              style={{ height: "690px" }}
            >
              <div
                className="bg-dark p-3 d-flex justify-content-around align-items-center m-0 custom-class w-100"
                style={{
                  height: "28px",
                }}
              ></div>
              <div
                className="bg-success p-3  d-flex justify-content-around align-items-center  custom-class w-100"
                style={{
                  height: "50px",
                }}
              ></div>
              <div
                className="bg-white p-3  d-flex justify-content-around align-items-center  custom-class w-100"
                style={{
                  height: "576px",
                }}
              >
              </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;