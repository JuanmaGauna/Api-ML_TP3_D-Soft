import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { cartItems } = useContext(CartContext); // Usamos el contexto para obtener la cantidad de productos en el carrito

  return (
    <nav>
      <h2>Mi Tienda</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>
          <Link to="/cart">
            🛒 Carrito ({cartItems.length}) {/* Muestra la cantidad de productos en el carrito */}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
