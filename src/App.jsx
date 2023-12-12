// Importando os módulos necessários do React e react-router-dom
import { useEffect } from 'react'; // Import useEffect from react
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import ProductsPage from './Pages/ProductPage.jsx';
import Profile from './Pages/Profile.jsx';
import Register from './Pages/Register';
import TemplatePage from './Pages/TemplatePage.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import NotFoundPage from './Pages/NotFoundPage';
import SearchPage from './Pages/SearchPage.jsx';
import Card from './Components/Cards/ProductCard.jsx';
import AdressCard from './Components/Cards/AdressCard.jsx';
import { getProductCount } from './REST_API/firebaseAPI.js';


// Importando o componente Header
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./App.css";
import { Footer, Footer2, Footer3 }  from "../src/Components/Struct/Footer";
import Header from "./Components/Struct/Header";
import Header2 from "./Components/Struct/Header2";

// Inicializando o aplicativo Firebase
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';


// Definindo o componente funcional App
function App() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      const count = await getProductCount();
      setProductCount(count);
    }
  
    fetchProductCount();
  }, []); // Add dependencies if any
  return (
    // JSX que representa a estrutura do aplicativo
    <div className="App">
      {/* Configurando as rotas com o BrowserRouter */}
      <Router>
        {/* Conditionally render Header or Header2 based on the current route */}
        {location.pathname === "/register" || location.pathname === "/login" ? (
          <Header2 />
        ) : (
          <Header />
        )}

        <Routes>
          <Route path="/products/:id" element={<ProductPage />} />
          {/* Definindo as rotas para os diferentes componentes */}
          <Route path="/" element={<HomePage className="home-page" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/templatepage" element={<TemplatePage />} />
          <Route path="/card" element={<Card />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {location.pathname === "/register" || location.pathname === "/login" ? (
          <Footer3 />
        ) : (
          <>
            <Footer2 />
            <Footer />
          </>
        )}
      </Router>
    </div>
  );
}

// Exportando o componente para uso em outros lugares
export default App;
