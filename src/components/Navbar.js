import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <nav>
      <h2>Mercado Libre Clone</h2>
      <ul>
        <li><Link to="/">🏠Home</Link></li>
        <li>
          <Link to="/cart">
            🛒 Carrito ({cartItems.length})
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
