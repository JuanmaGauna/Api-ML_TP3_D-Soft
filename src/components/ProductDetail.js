import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams(); // Extrae el ID del producto desde la URL
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchProductDetail = async () => {
          try {
            const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
            const data = await response.json();
            setProduct(data); // Almacena los detalles del producto en el estado
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
          <button onClick={() => window.history.back()}>Volver</button>
        </div>
      );
    }
    
    export default ProductDetail;