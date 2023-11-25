// Importando os módulos necessários do React e react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import Login from './Pages/Login';
import Register from './Pages/Register';

import { firebaseConfig } from "./firebase";
import { initializeApp } from "firebase/app";
// Importando o componente Header
import Header from './Components/Struct/Header';

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
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

// Exportando o componente para uso em outros lugares
export default App;
