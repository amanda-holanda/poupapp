import { useState } from 'react';
import TopBar from './components/TopBar';
import Filters from './components/Filters';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([
    { description: 'Reforma', value: '325,00', category: 'Utilidades Domésticas', date: '21/08/2023' },
    { description: 'Mercado', value: '300,00', category: 'Alimentação', date: '08/05/2023' },
    { description: 'Pediatra', value: '300,00', category: 'Saúde', date: '06/09/2023' },
    { description: 'Faculdade', value: '229,00', category: 'Educação', date: '10/08/2023' },
    { description: 'Cinema', value: '100,00', category: 'Lazer', date: '30/09/2023' }
  ]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const handleEditExpense = (index) => {
    // Implementar lógica de edição
    console.log('Editar despesa:', expenses[index]);
  };

  return (
    <div>
      <TopBar />
      <div className="container">
        <h2>Minhas Despesas</h2>
        
        <Filters />
        
        <ExpenseForm onAddExpense={handleAddExpense} />
        
        <ExpenseTable 
          expenses={expenses} 
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
        />
      </div>
    </div>
  );
};

export default App;