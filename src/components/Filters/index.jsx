import { useState } from 'react';
import './styles.css';

const Filters = ({ 
  categories, 
  onCategoryChange, 
  onSortValue, 
  onClearFilters,
  onDateFilterChange 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortValue, setSortValue] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const handleClearFilters = () => {
    setSelectedCategory('Todos');
    setSortValue('');
    setFilterDate('');
    onClearFilters();
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setFilterDate(date);
    onDateFilterChange(date);
  };

  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split('T')[0];

  return (
    <div className="filters">
      {/* Filtro de Categoria */}
      <label>
        Filtrar Categoria:
        <select 
          value={selectedCategory} 
          onChange={e => {
            console.log(`Cat: ${e.target.value}`);
            
            setSelectedCategory(e.target.value);
            onCategoryChange(e.target.value);
          }}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.title}</option>
          ))}
        </select>
      </label>

      {/* Filtro por Data Única */}
      <label>
        Filtrar por Data:
        <input 
          type="date" 
          value={filterDate}
          onChange={handleDateChange}
          max={lastDayOfMonth}
        />
      </label>

      {/* Ordenação por Valor */}
      <label>
        Ordenar por Valor:
        <select
          value={sortValue}
          onChange={(e) => {
            setSortValue(e.target.value);
            onSortValue(e.target.value);
          }}
        >
          <option value="">Padrão</option>
          <option value="asc">Menor para Maior</option>
          <option value="desc">Maior para Menor</option>
        </select>
      </label>

      {/* Botão Limpar Filtros */}
      <button 
        className="clear-filters"
        onClick={handleClearFilters}
        disabled={selectedCategory === 'Todos' && !sortValue && !filterDate}
      >
        Limpar Filtros
      </button>
    </div>
  );
};

export default Filters;