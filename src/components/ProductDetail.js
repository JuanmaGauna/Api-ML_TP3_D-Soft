import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

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
      <h3>{product.title}</h3>

      {product.pictures && product.pictures.length > 1 ? (
        <Carousel>
          {product.pictures.map((picture) => (
            <div key={picture.id}>
              <img src={picture.url} alt={product.title} style={{ width: '300px' }} />
            </div>
          ))}
        </Carousel>
      ) : (
        <img src={product.pictures?.[0].url} alt={product.title} style={{ width: '300px' }} />
      )}

      <p>Precio: ${product.price}</p>
      <p>{product.description}</p>

      {/* Tabla con atributos del producto */}
      {product.attributes && product.attributes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Atributo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {product.attributes.map((attribute) => (
              <tr key={attribute.id}>
                <td>{attribute.name}</td>
                <td>{attribute.value_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => addToCart(product)}>Agregar al carrito</button>
      <button onClick={() => window.history.back()}>Volver</button>
    </div>
  );
}

export default ProductDetail;
