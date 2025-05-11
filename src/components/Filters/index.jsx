import { useState } from 'react'; 
import './styles.css';

const Filters = ({ categories, onCategoryChange, onSortValue, onClearFilters }) => {
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

  const handleClearFilters = () => {
    setSelectedCategory('Todos');
    setSortValue('');
    onClearFilters();
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
      
      <button 
        type="button" 
        className="clear-filters"
        onClick={handleClearFilters}
        disabled={selectedCategory === 'Todos' && sortValue === ''}
      >
        Limpar Filtros
      </button>
    </div>
  );
};

export default Filters;