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
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td>{expense.description}</td>
            <td>R$ {expense.value}</td>
            <td>{expense.category}</td>
            <td>{expense.date}</td>
            <td className="actions">
              <span onClick={() => onEdit(index)}>✏️</span>
              <span onClick={() => onDelete(index)}>🗑️</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;