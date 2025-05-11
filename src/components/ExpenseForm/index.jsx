import { useState } from 'react';
import './styles.css';

const ExpenseForm = ({ onAddExpense, categories }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('Selecione uma opção');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (category === 'Selecione uma opção') {
      alert('Por favor, selecione uma categoria válida');
      return;
    }

    const formattedValue = parseFloat(value).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    const newExpense = {
      description,
      value: formattedValue,
      category,
      date: date || new Date().toISOString().split('T')[0]
    };
    
    onAddExpense(newExpense);
    // Limpa o formulário mas mantém a categoria selecionada
    setDescription('');
    setValue('');
    setDate('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      
      <input
        type="number"
        placeholder="Valor (ex: 50.99)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        step="0.01"
        min="0"
        required
      />
      
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option disabled value="Selecione uma opção">Selecione uma opção</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        max={new Date().toISOString().split('T')[0]}
      />
      
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default ExpenseForm;