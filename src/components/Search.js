import React, { useState, useEffect } from 'react';

function Search() {
  const [query, setQuery] = useState(''); // Para almacenar la búsqueda del usuario
  const [products, setProducts] = useState([]); // Para almacenar los resultados de la búsqueda
  const [categories, setCategories] = useState([]); // Para almacenar las categorías
  const [selectedCategory, setSelectedCategory] = useState(''); // Para almacenar la categoría seleccionada

  // Obtener las categorías de la API al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.mercadolibre.com/sites/MLA/categories');
        const data = await response.json();
        setCategories(data); // Guardar las categorías obtenidas en el estado
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories(); // Llamada a la función para obtener las categorías
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault(); // Evita que el formulario se recargue

    if (!query) return; // Si el campo de búsqueda está vacío, no hacemos nada

    try {
      let url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;

      // Si hay una categoría seleccionada, agregarla a la URL de búsqueda
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }

      const response = await fetch(url);
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
        
        {/* Select para elegir una categoría */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)} // Actualiza la categoría seleccionada
        >
          <option value="">Todas las Categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

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