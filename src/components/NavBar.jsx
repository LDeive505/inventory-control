import React, { useContext } from 'react'
import Context from '../context/Context';
import '../styles/NavBar.css'

export default function NavBar() {
  const { setScreenSelector } = useContext(Context);

  const setScreenConfig = (screenNumber, hasInput ) => {
    setScreenSelector({ screenNumber, hasInput });
  };
  
  return (
    <div className="navigation-container">
      <button type="button" className="nav-button" onClick={ ()=> setScreenConfig(0, true) }>Produtos</button>
      <button type="button" className="nav-button" onClick={ ()=> setScreenConfig(1, false) }>Necessário Repor Estoque</button>
      <button type="button" className="nav-button" onClick={ ()=> setScreenConfig(2, false) }>Histórico de Alterações</button>
      <button type="button" className="nav-button" onClick={ ()=> setScreenConfig(3, false) }>Gerenciamento de Produtos</button>
    </div>
  );
}
