import { useState, useEffect, useMemo, useCallback } from 'react';
import TopBar from './components/TopBar';
import Filters from './components/Filters';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import './App.css';
import api from './services/api';
import TotalDespesas from './components/TotalDespesas';

const App = () => {
const [categories, setCategories] = useState([]);
const [expenses, setExpenses] = useState([]);
// Api para fazer get das categorias
useEffect(() => {
  api.get('/category/all')
    .then(res => {
      if (res.data && Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        console.error('Resposta da API inesperada:', res.data);
      }
    })
    .catch(err => {
      console.error('Erro ao buscar categoria:', err);
    });
}, []);
// Api para fazer o get das despesas
const fetchExpenses = useCallback(() => {
  api.get('/expense/all')
    .then(res => {
      if (res.data) {
        const enrichedExpenses = res.data.content.map(expense => ({
          ...expense,
          category: (categories.find(cat => cat.id === expense.categoryId) || {}).title || null
        }));
        setExpenses(enrichedExpenses);
      } else {
        console.error('Resposta da API inesperada:', res.data);
      }
    })
    .catch(err => {
      console.error('Erro ao buscar despesas:', err);
    });
}, [categories, setExpenses]);

useEffect(() => {
  fetchExpenses();
}, [fetchExpenses]);

  // Salva no localStorage sempre que expenses mudar
  useEffect(() => {
    localStorage.setItem('poupapp-expenses', JSON.stringify(expenses));
  }, [expenses]);

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
  if (!expenses || expenses.length === 0) return [];

  let result = [...expenses];

  
  // Filtro por categoria - Adicionada validação para comparar category id  do backend com id da categoria escolhida
  if (categoryFilter && categoryFilter !== 'Todos') {
    result = result.filter(e => e.categoryId === parseInt(categoryFilter));
  }
// Faz o filtro pela data
  if (dateFilter) {
    const [day, month, year] = dateFilter.split('/');
    const targetDate = new Date(`${year}-${month}-${day}`);

    const isSameDate = (a, b) =>
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();

    result = result.filter(e => {
      const [y, m, d] = e.date.split('-').map(Number);
      const expenseDate = new Date(y, m - 1, d); // mês é 0-based
      return isSameDate(expenseDate, targetDate);
    });

  }

  // Ordenação por valor
  if (sortOrder) {
    result.sort((a, b) => {
      const valA = typeof a.valor === 'string' ? parseFloat(a.valor.replace(',', '.')) : a.valor;
      const valB = typeof b.valor === 'string' ? parseFloat(b.valor.replace(',', '.')) : b.valor;
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }

  return result;
}, [expenses, categoryFilter, sortOrder, dateFilter]);


  // Adiciona nova despesa
const handleAddExpense = newExpense => {
// cria um obejto para ser enviado ao backend
  let { description, value: valor, category: categoryId, date } = newExpense;
// Trata alguns itens para o envio
  categoryId = parseInt(categoryId);
  valor = parseFloat(valor.replace(',', '.'));
  // envia o objeto ao endpoint de registro
  api.post('/expense/register', {
    description,
    valor,
    categoryId,
    date
  })
    .then(res => {
      // se o statu code for == criado então foi criado com sucesso
      if (res.status === 201) fetchExpenses(); // carrega a lista de despesas novamente
      else console.error('Erro ao adicionar despesa:', res);
    })
    .catch(err => console.error('Erro na requisição de adicionar despesa:', err));
};
// Para deletar despesas
  const handleDeleteExpense = id => {
    if(id && id !== null){
      api
      .delete(`/expense/delete/${id}`)
      .then(res => {
        if (res.status === 204) fetchExpenses();
        else console.error('Erro ao deletar despesa:', res);
      })
      .catch(err =>console.error('Erro ao deletar despesa:', err));
    }
  };
// Edição de despesas
  const handleEditExpense = id => {
    const expenseToEdit = expenses.filter(expense => expense.id == id)[0]; // percorre a lista das despesas para procurar o id da despesa

    setEditingIndex(id); // salva na variável
    setEditFormData({
      description: expenseToEdit.description,
      value: expenseToEdit.valor,
      category: expenseToEdit.categoryId,
      date: expenseToEdit.date
    });
  };
// Atualização para o backend
  const handleUpdateExpense = () => {
    if (editingIndex !== null){
      const id = editingIndex;

      let {category:categoryId, date, description, value:valor } = editFormData;

      api.put('/expense/update', 
        {
          id,
          categoryId,
          date,
          description,
          valor
        })
        .then(res => {
          if (res.status === 200){
            fetchExpenses();
            setEditingIndex(null);
          } else console.error('Falha na atualização da despesa:', res);
        })
        .catch(err => {
          console.error('Erro ao atualizar despesa:', err);
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
          categories={[{ id: null, title: 'Todos' }, ...categories]}
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
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
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
        <TotalDespesas expenses={filteredExpenses}></TotalDespesas>
      </div>
    </div>
  );
};

export default App;