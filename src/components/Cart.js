import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleCheckout = () => {
    // Aquí se debería integrar MercadoPago o cualquier plataforma de pago
    alert('Redirigiendo a MercadoPago...');
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <img src={item.thumbnail} alt={item.title} style={{ width: '100px' }} />
                <h3>{item.title}</h3>
                <p>Precio: ${item.price}</p>
                <p>
                  Cantidad:
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                </p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h2>Total de la compra: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</h2>
          <button onClick={handleCheckout}>Terminar compra</button>
          {/* Agregar un enlace para volver a la página de inicio */}
          <Link to="/">Volver a Inicio</Link>
        </>
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
}

export default Cart;
