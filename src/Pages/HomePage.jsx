// HomePage.jsx
import React from "react";
import ProductCard from "../Components/Cards/ProductCard";
import "../Pages/CSS/HomePage.css";
import { useFirebaseAuth } from "./Backend";
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption
} from "mdb-react-ui-kit";

const HomePage = () => {
  const { user, handleLogout } = useFirebaseAuth();

  // Replace these with your actual image paths and names
  const carousel_images = [
    "src/Components/Images/Carousel/pcdiga_camera.jpg",
    "src/Components/Images/Carousel/pcdiga_christmas.jpg",
    "src/Components/Images/Carousel/pcdiga_christmas_2.jpg",
    "src/Components/Images/Carousel/pcdiga_christmas_3.jpg",
    "src/Components/Images/Carousel/pcdiga_christmas_4.jpg",
    "src/Components/Images/Carousel/pcdiga_computer.jpg",
    "src/Components/Images/Carousel/pcdiga_vacuum_cleaner.jpg",
  ];
  const names = ["Computadores", "Name 2", "Name 3", "Name 4", "Name 5"];

  return (
    <div className="container-fluid custom-class p-0">
      <div className="row m-0">
        <div className="col-md-12 p-0">
          <MDBCarousel showIndicators showControls fade>
            {carousel_images.map((image, i) => (
              <MDBCarouselItem itemId={i + 1} key={i}>
                <img src={image} className='d-block w-100' alt={`Slide ${i + 1}`} />
              </MDBCarouselItem>
            ))}
          </MDBCarousel>
          <div className="bg-light p-5" style={{ height: "200px" }}></div>
        </div>
        <div className="col-md-12 mt-4 p-0">
          <div
            className="bg-light p-5 d-flex justify-content-around align-items-center"
            style={{ height: "200px" }}
          >
            {carousel_images.map((image, i) => (
              <div
                key={i}
                className="text-center d-flex flex-column align-items-center"
              >
                <div
                  className="circle bg-primary rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <img
                    src={image}
                    alt={`Circle ${i + 1}`}
                    className="rounded-circle"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="mt-2">{names[i]}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-12 mt-4 p-0 ">
          <div className="bg-light p-2">{"Sale of the day"}</div>
        </div>
        <div className="col-md-12 mt-4 p-0 ">
          <div
            className="bg-light p-5 mx-auto"
            style={{ height: "200px", maxWidth: "98.5%" }}
          ></div>
        </div>
        <div className="col-md-12 mt-4 p-0 ">
          <div
            className="bg-light p-0 d-flex flex-column align-items-center "
            style={{ height: "690px" }}
          >
            <div
              className="bg-dark p-3 d-flex justify-content-around align-items-center m-0 custom-class w-100"
              style={{
                height: "28px",
              }}
            ></div>
            <div
              className="bg-warning p-3 d-flex justify-content-around align-items-center m-0 custom-class w-100"
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
              className="bg-black p-3  d-flex justify-content-around align-items-center  custom-class w-100"
              style={{
                height: "576px",
              }}
            ></div>
          </div>
          <div className="col-md-12 mt-4 p-0">
            <div
              className="bg-light p-5 mx-auto"
              style={{ height: "110px", maxWidth: "98.5%" }}
            >
              {"SPECIAL CAMPAIGNS AND OFFERS"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
