import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const InVoicesPage = () => {
  return (
    <div className="container-fluid mb-4 p-0">
      <div className="bg-white row m-0">
        <div className="col-md-12 p-0">
          <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InVoicesPage;