import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <nav>
      <h2>Mi Tienda</h2>
      <Link to="/cart">
        🛒 Carrito ({cartItems.length}) {/* Muestra la cantidad de productos en el carrito */}
      </Link>
    </nav>
  );
}

export default Navbar;
