import React, { useState, useEffect } from 'react';
import ProductList from './ProductList'; // Importar el nuevo componente

function Search() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.mercadolibre.com/sites/MLA/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      let url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.results);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <h2>Buscar productos</h2>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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

      {/* Usar el componente ProductList para mostrar los productos */}
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p>No hay productos para mostrar</p>
      )}
    </div>
  );
}

export default Search;