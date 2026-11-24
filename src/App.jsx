import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CatalogoProductos from './components/CatalogoProductos';
import FormularioContacto from './components/FormularioContacto';
import AuthStorage from './components/AuthStorage';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Examen Componentes
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Ejercicio 1 (Catálogo)
            </Link>
            <Link className="nav-link" to="/ejercicio2">
              Ejercicio 2 (Formulario)
            </Link>
            <Link className="nav-link" to="/ejercicio3">
              Ejercicio 3 (Auth y Storage)
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<CatalogoProductos />} />
        <Route path="/ejercicio2" element={<FormularioContacto />} />
        <Route path="/ejercicio3" element={<AuthStorage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;