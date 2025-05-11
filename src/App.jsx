import { useState, useMemo } from 'react';
import TopBar from './components/TopBar';
import Filters from './components/Filters';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import './App.css';

const App = () => {
  // Lista completa de categorias
  const [categories] = useState([
    'Aluguel/hipoteca',
    'Assinaturas',
    'Compras por impulso',
    'Condomínio',
    'Contas de água, luz, gás',
    'Cuidados pessoais',
    'Educação',
    'Farmácia/medicamentos',
    'Financiamentos',
    'Gastos médicos inesperados',
    'Hobbies/esportes',
    'Impostos',
    'Internet/telefone',
    'Lazer',
    'Manutenção de casa/carro',
    'Mensalidades escolares/faculdade',
    'Multas',
    'Outros',
    'Plano de saúde',
    'Presentes/doações',
    'Reparos domésticos',
    'Restaurantes/bares',
    'Seguros',
    'Supermercado/alimentação',
    'Transporte público/combustível',
    'Vestuário/calçados',
    'Viagens'
  ]);

  // Estado das despesas
  const [expenses, setExpenses] = useState([
    { description: 'Reforma', value: '325,00', category: 'Utilidades Domésticas', date: '21/08/2023' },
    { description: 'Mercado', value: '300,00', category: 'Alimentação', date: '08/05/2023' },
    { description: 'Pediatra', value: '300,00', category: 'Saúde', date: '06/09/2023' },
    { description: 'Faculdade', value: '229,00', category: 'Educação', date: '10/08/2023' },
    { description: 'Cinema', value: '100,00', category: 'Lazer', date: '30/09/2023' }
  ]);

  // Estado dos filtros
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [sortOrder, setSortOrder] = useState('');

  // Filtra e ordena as despesas
  const filteredExpenses = useMemo(() => {
    let result = [...expenses];
    
    // Filtro por categoria
    if (categoryFilter !== 'Todos') {
      result = result.filter(exp => exp.category === categoryFilter);
    }
    
    // Ordenação por valor
    if (sortOrder) {
      result.sort((a, b) => {
        const valA = parseFloat(a.value.replace(',', '.'));
        const valB = parseFloat(b.value.replace(',', '.'));
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      });
    }
    
    return result;
  }, [expenses, categoryFilter, sortOrder]);

  // Adiciona nova despesa
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  // Remove despesa
  const handleDeleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  // Edita despesa (implementação básica)
  const handleEditExpense = (index) => {
    // Implementação básica - pode ser expandida
    const expenseToEdit = expenses[index];
    if (window.confirm(`Editar despesa: ${expenseToEdit.description}?`)) {
      const newDescription = prompt('Nova descrição:', expenseToEdit.description);
      if (newDescription) {
        const updatedExpenses = [...expenses];
        updatedExpenses[index].description = newDescription;
        setExpenses(updatedExpenses);
      }
    }
  };

  return (
    <div>
      <TopBar />
      <div className="container">
        <h2>Minhas Despesas</h2>
        
        <Filters 
          categories={['Todos', ...categories]}
          onCategoryChange={setCategoryFilter}
          onSortValue={setSortOrder}
        />
        
        <ExpenseForm 
          onAddExpense={handleAddExpense}
          categories={categories}
        />
        
        <ExpenseTable 
          expenses={filteredExpenses} 
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
        />
      </div>
    </div>
  );
};

export default App;