import { useState } from 'react';
import './styles.css';

const Filters = ({ categories, onCategoryChange, onSortValue }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortValue, setSortValue] = useState('');

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortValue(value);
    onSortValue(value);
  };

  return (
    <div className="filters">
      <label>
        Filtrar Categoria:
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Ordenar por Valor:
        <select value={sortValue} onChange={handleSortChange}>
          <option value="">Padrão</option>
          <option value="asc">Menor para Maior</option>
          <option value="desc">Maior para Menor</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;