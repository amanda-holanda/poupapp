import './styles.css';

const Filters = () => {
  return (
    <div className="filters">
      <label>
        Filtrar Categoria:
        <select>
          <option>Todos</option>
          <option>Aluguel/hipoteca</option>
          <option>Assinaturas</option>
          <option>Compras por impulso</option>
          <option>Condomínio</option>
          <option>Contas de água, luz, gás</option>
          <option>Cuidados pessoais</option>
          <option>Educação</option>
          <option>Farmácia/medicamentos</option>
          <option>Financiamentos</option>
          <option>Gastos médicos inesperados</option>
          <option>Hobbies/esportes</option>
          <option>Impostos</option>
          <option>Internet/telefone</option>
          <option>Lazer</option>
          <option>Manutenção de casa/carro</option>
          <option>Mensalidades escolares/faculdade</option>
          <option>Multas</option>
          <option>Outros</option>
          <option>Plano de saúde</option>
          <option>Presentes/doações</option>
          <option>Reparos domésticos</option>
          <option>Restaurantes/bares</option>
          <option>Seguros</option>
          <option>Supermercado/alimentação</option>
          <option>Transporte público/combustível</option>
          <option>Vestuário/calçados</option>
          <option>Viagens</option>
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