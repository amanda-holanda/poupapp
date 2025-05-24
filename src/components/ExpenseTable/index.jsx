import './styles.css';

const ExpenseTable = ({ expenses, onDelete, onEdit }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>
              { new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(expense.valor)}
            </td>
            <td>{expense.category}</td>
            <td>{
              (() => {
                const [year, month, day] = expense.date.split('-').map(Number);
                const date = new Date(Date.UTC(year, month - 1, day));
                return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
              })()
            }</td>
            <td className="actions">
              <span onClick={() => onEdit(expense.id)}>✏️</span>
              <span onClick={() => onDelete(expense.id)}>🗑️</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;