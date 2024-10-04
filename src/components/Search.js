import React, { useState } from 'react';

function Search() {
  const [query, setQuery] = useState(''); // Para almacenar la búsqueda del usuario
  const [products, setProducts] = useState([]); // Para almacenar los resultados de la búsqueda

  // Función para manejar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault(); // Evita que el formulario se recargue

    if (!query) return; // Si el campo de búsqueda está vacío, no hacemos nada

    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
      const data = await response.json();
      setProducts(data.results); // Almacena los resultados de la búsqueda en el estado
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <h1>Buscar productos</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Actualiza el valor de la búsqueda
        />
        <button type="submit">Buscar</button>
      </form>

      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
                <p>Precio: ${product.price}</p>
                <a href={`/product/${product.id}`}>Ver detalles</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productos para mostrar</p>
        )}
      </div>
    </div>
  );
}

export default Search;