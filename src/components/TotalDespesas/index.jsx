import './style.css';

const TotalDespesas = ({ expenses }) => {
    const total = expenses.reduce((acc, curr) => {
    const valor = parseFloat(curr.valor);
    return acc + (isNaN(valor) ? 0 : valor);
  }, 0);

  return (
    <div className="total-despesas-container">
      <h2>Total de Despesas:</h2>
      <div className="total-valor">
        R$ {total.toFixed(2).replace('.', ',')}
      </div>
    </div>
  );
};

export default TotalDespesas;

