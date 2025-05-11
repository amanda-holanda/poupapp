import { useState } from 'react';
import './styles.css';

const ExpenseForm = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('Outros');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      description,
      value,
      category,
      date
    };
    onAddExpense(newExpense);
    // Limpar formulário
    setDescription('');
    setValue('');
    setCategory('Selecione uma opção');
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
        placeholder="Valor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Selecione uma opção</option>
        <option>Aluguel/hipoteca</option>
        <option>Condomínio</option>
        <option>Contas de água, luz, gás</option>
        <option>Internet/telefone</option>
        <option>Plano de saúde</option>
        <option>Seguros</option>
        <option>Mensalidades escolares/faculdade</option>
        <option>Transporte público/combustível</option>
        <option>Financiamentos</option>
        <option>Impostos</option>
        <option>Supermercado/alimentação</option>
        <option>Farmácia/medicamentos</option>
        <option>Vestuário/calçados</option>
        <option>Manutenção de casa/carro</option>
        <option>Educação</option>
        <option>Cuidados pessoais</option>
        <option>Lazer/entretenimento</option>
        <option>Viagens</option>
        <option>Restaurantes/bares</option>
        <option>Assinaturas</option>
        <option>Compras por impulso</option>
        <option>Presentes/doações</option>
        <option>Hobbies/esportes</option>
        <option>Reparos domésticos</option>
        <option>Gastos médicos inesperados</option>
        <option>Multas</option>
        <option>Outros</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default ExpenseForm;