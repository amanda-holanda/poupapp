import './styles.css';

const Filters = () => {
  return (
    <div className="filters">
      <label>
        Filtrar Categoria:
        <select>
          <option>Todos</option>
        </select>
      </label>
      <label>
        Filtrar Valor:
        <input type="text" placeholder="Ordenar por valor" />
      </label>
    </div>
  );
};

export default Filters;