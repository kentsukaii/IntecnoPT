import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../Pages/CSS/HomePage.css";

const TemplatePage = () => {
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


  return (
    <div className="container-fluid p-0">
      <div className="bg-light  row m-0">
        <div className="col-md-12 p-0">
        {"Sale of the day"}
          </div>
        </div>
      </div>
  );
};

export default TemplatePage;