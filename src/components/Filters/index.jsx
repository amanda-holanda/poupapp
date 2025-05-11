import './styles.css';

const Filters = () => {
  return (
    <div className="filters">
      <label>
        Filtrar Categoria:
        <select>
          <option>Todos</option>
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
      </label>
      <label>
        Filtrar Valor:
        <input type="text" placeholder="Ordenar por valor" />
      </label>
    </div>
  );
};

export default Filters;