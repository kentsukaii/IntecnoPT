// Importando os módulos necessários do React e react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
<<<<<<< HEAD
import Register from './Pages/Profile';

=======
>>>>>>> 4d9d145c2e86426af153b7904f22e6bc8185d542
import { firebaseConfig } from "./firebase";
import { initializeApp } from "firebase/app";
// Importando o componente Header
import Header from './Components/Struct/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';



// Inicializando o aplicativo Firebase
initializeApp(firebaseConfig);

// Definindo o componente funcional App
function App() {
  return (
    // JSX que representa a estrutura do aplicativo
    <div className="App">
      {/* Renderizando o componente Header no topo */}
      <Header />
      {/* Configurando as rotas com o BrowserRouter */}
      <Router>
        <Routes>
          {/* Definindo as rotas para os diferentes componentes */}
          <Route path="/" element={<HomePage className="home-page" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

// Exportando o componente para uso em outros lugares
export default App;
