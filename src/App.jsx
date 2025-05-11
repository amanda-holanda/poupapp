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
  const [dateFilter, setDateFilter] = useState('');

  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    description: '',
    value: '',
    category: '',
    date: ''
  });

  // Função para lidar com filtro por data única
  const handleDateFilterChange = (date) => {
    setDateFilter(date);
  };

  // Filtra e ordena as despesas
  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    // Filtro por categoria
    if (categoryFilter !== 'Todos') {
      result = result.filter(exp => exp.category === categoryFilter);
    }

    // Filtro por data única
    if (dateFilter) {
      result = result.filter(exp => {
        const expenseDate = exp.date.split('/').reverse().join('-');
        return expenseDate === dateFilter;
      });
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
  }, [expenses, categoryFilter, sortOrder, dateFilter]);

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
    const expenseToEdit = expenses[index];
    setEditingIndex(index);
    setEditFormData({
      description: expenseToEdit.description,
      value: expenseToEdit.value.replace(',', '.'),
      category: expenseToEdit.category,
      date: expenseToEdit.date.split('/').reverse().join('-')
    });
  };

  const handleUpdateExpense = () => {
    if (editingIndex !== null) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editingIndex] = {
        description: editFormData.description,
        value: parseFloat(editFormData.value).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        category: editFormData.category,
        date: editFormData.date.split('-').reverse().join('/')
      };

      setExpenses(updatedExpenses);
      setEditingIndex(null);
      setEditFormData({
        description: '',
        value: '',
        category: '',
        date: ''
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditFormData({
      description: '',
      value: '',
      category: '',
      date: ''
    });
  };

  const handleClearFilters = () => {
    setCategoryFilter('Todos');
    setSortOrder('');
    setDateFilter('');
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
          onClearFilters={handleClearFilters}
          onDateFilterChange={handleDateFilterChange}
        />

        <ExpenseForm
          onAddExpense={handleAddExpense}
          categories={categories}
        />

        {editingIndex !== null ? (
          <div className="edit-form-container">
            <h3>Editar Despesa</h3>
            <div className="edit-form">
              <input
                type="text"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                placeholder="Descrição"
              />
              <input
                type="number"
                value={editFormData.value}
                onChange={(e) => setEditFormData({ ...editFormData, value: e.target.value })}
                placeholder="Valor"
                step="0.01"
              />
              <select
                value={editFormData.category}
                onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="date"
                value={editFormData.date}
                onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
              />
              <div className="edit-buttons">
                <button onClick={handleUpdateExpense}>Salvar</button>
                <button onClick={handleCancelEdit}>Cancelar</button>
              </div>
            </div>
          </div>
        ) : (
          <ExpenseTable
            expenses={filteredExpenses}
            onDelete={handleDeleteExpense}
            onEdit={handleEditExpense}
          />
        )}
      </div>
    </div>
  );
};

export default App;