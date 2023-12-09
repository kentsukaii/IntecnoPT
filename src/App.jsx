// Importando os módulos necessários do React e react-router-dom
import { useEffect } from 'react'; // Import useEffect from react
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutPage from './Pages/AboutPage';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Profile from './Pages/Profile.jsx';
import Register from './Pages/Register';
import TemplatePage from './Pages/TemplatePage.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Card from './Components/Cards/ProductCard.jsx';

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";


// Importando o componente Header
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import Header from './Components/Struct/Header';

// Inicializando o aplicativo Firebase
initializeApp(firebaseConfig);

// Definindo o componente funcional App
function App() {
  return (
    // JSX que representa a estrutura do aplicativo
    <div className="App">

      {/* Configurando as rotas com o BrowserRouter */}
      <Router>
        {/* Renderizando o componente Header no topo */}
        <Header />
        <Routes>
          {/* Definindo as rotas para os diferentes componentes */}
          <Route path="/" element={<HomePage className="home-page" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/templatepage" element={<TemplatePage />} />
          <Route path="/card" element={<Card />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

// Exportando o componente para uso em outros lugares
export default App;
