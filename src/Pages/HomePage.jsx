import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import '../Pages/CSS/HomePage.css';

import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
} from "mdb-react-ui-kit";


const HomePage = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Limpar a assinatura quando o componente é desmontado
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro durante o logout:", error);
    }
  };

  // Replace these with your actual image paths and names
  const images = [
    "src/Components/Images/computadores1.png",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
  ];
  const names = ["Computadores", "Name 2", "Name 3", "Name 4", "Name 5"];
  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <div className="bg-light p-5" style={{ height: "200px" }}></div>
      </div>
      <div className="col-md-12 mt-4">
        <div
          className="bg-light p-5 d-flex justify-content-around align-items-center"
          style={{ height: "200px" }}
        >
          {images.map((image, i) => (
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
      <div className="col-md-12 mt-4">
        <div className="bg-light p-2">{"Sale of the day"}</div>
      </div>
      <div className="col-md-12 mt-4">
        <div
          className="bg-light p-5 mx-auto"
          style={{ height: "200px", maxWidth: "98.5%" }}>
          </div>
      </div>
      <div className="col-md-12 mt-4" >
  <div
    className="bg-light p-5 d-flex flex-column align-items-center p-0"
    style={{ height: "690px" }}
  >
    <div
      className="bg-dark p-3 mx-auto d-flex justify-content-around align-items-center m-0 custom-class"
      style={{
        height: "28px",
        width: "100%",
      }}
    ></div>
    <div
      className="bg-dark p-3 mx-auto d-flex justify-content-around align-items-center m-0 custom-class"
      style={{
        height: "28px",
        width: "100%",
      }}
    ></div>
    <div
      className="bg-success p-3 mx-auto d-flex justify-content-around align-items-center m-0 custom-class"
      style={{
        height: "50px",
        width: "100%",
      }}>
      </div>
  </div>
      <div className="col-md-12 mt-4">
        <div
          className="bg-light p-5 mx-auto"
          style={{ height: "110px", maxWidth: "98.5%" }}>
                      {'SPECIAL CAMPAIGNS AND OFFERS'}
          </div>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
