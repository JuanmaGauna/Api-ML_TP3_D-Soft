import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Search from './components/Search';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Navbar from './components/Navbar'; // Importar el componente Navbar desde otro archivo

function App() {
  return (
    <Router>
      <Navbar /> {/* Agrega la barra de navegación */}
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
