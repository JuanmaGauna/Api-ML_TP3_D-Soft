import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Importa el contexto del carrito

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Usamos el contexto del carrito

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.pictures?.[0].url} alt={product.title} style={{ width: '300px' }} />
      <p>Precio: ${product.price}</p>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Agregar al carrito</button>
      <button onClick={() => window.history.back()}>Volver</button>
    </div>
  );
}

export default ProductDetail;
