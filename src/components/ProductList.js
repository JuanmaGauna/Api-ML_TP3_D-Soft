import React from 'react';
import { Link } from 'react-router-dom';

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <p className="price">${product.price}</p>
          <Link to={`/product/${product.id}`}>
            <button>Ver Detalles</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
