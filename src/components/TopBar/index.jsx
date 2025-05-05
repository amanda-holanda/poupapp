import './styles.css';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="logo">
        <div className="logo-icon">🐖</div>
        <div className="logo-text">
          <span>Poup</span>
          <span>App</span>
        </div>
      </div>
      <div className="menu">
        <a href="#">Início</a>
        <a href="#">Despesas</a>
        <a href="#" style={{ marginLeft: 'auto' }}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png" 
            alt="Sair" 
            style={{ width: '20px', verticalAlign: 'middle' }} 
          /> Sair
        </a>
      </div>
    </div>
  );
};

export default TopBar;