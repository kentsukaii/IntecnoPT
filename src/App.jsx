// Importando os módulos necessários do React e react-router-dom
<<<<<<< HEAD
import { useEffect } from "react"; // Import useEffect from react
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import ProductsPage from "./Pages/ProductPage.jsx";
import Profile from "./Pages/Profile.jsx";
import Register from "./Pages/Register";
import TemplatePage from "./Pages/TemplatePage.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Card from "./Components/Cards/ProductCard.jsx";
=======
import { useEffect } from 'react'; // Import useEffect from react
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutPage from './Pages/AboutPage';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import ProductsPage from './Pages/ProductPage.jsx';
import Profile from './Pages/Profile.jsx';
import Register from './Pages/Register';
import TemplatePage from './Pages/TemplatePage.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import SearchPage from './Pages/SearchPage.jsx';
import Card from './Components/Cards/ProductCard.jsx';
import { getProductCount } from './REST_API/firebaseAPI.js';
>>>>>>> 0e1fbf392481abcfd6ea3326c833c7adb4e4ddc5


// Importando o componente Header
<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./App.css";
import Footer from "../src/Components/Struct/Footer";
import Footer2 from "../src/Components/Struct/Footer2";
import Footer3 from "../src/Components/Struct/Footer3";
import Header from "./Components/Struct/Header";
import Header2 from "./Components/Struct/Header2";

// Inicializando o aplicativo Firebase
initializeApp(firebaseConfig);
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import Footer from '../src/Components/Struct/Footer';
import Header from './Components/Struct/Header';
import React, { useState } from "react";
>>>>>>> 0e1fbf392481abcfd6ea3326c833c7adb4e4ddc5

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
<<<<<<< HEAD
        {/* Conditionally render Header or Header2 based on the current route */}
        {location.pathname === "/register" || location.pathname === "/login" ? (
          <Header2 />
        ) : (
          <Header />
        )}

=======
        {/* Renderizando o componente Header no topo */}
        <Header productCount={productCount} />
>>>>>>> 0e1fbf392481abcfd6ea3326c833c7adb4e4ddc5
        <Routes>
          <Route path="/products/:id" element={<ProductPage />} />
          {/* Definindo as rotas para os diferentes componentes */}
          <Route path="/" element={<HomePage className="home-page" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/templatepage" element={<TemplatePage />} />
          <Route path="/card" element={<Card />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/search" element={<SearchPage />} />
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
