import React, { useContext } from 'react';
import Context from '../context/Context';
import logoRidicula from '../icons/logo-ridicula.png';

export default function Header() {
  const { screenSelector, setHeaderInput, headerInput } = useContext(Context);
  const { hasInput } = screenSelector;

  const handleInputChange = ({target: { value }}) => {
    setHeaderInput(value);
  };

  return (
    <header>
      {hasInput ? (
        <input
          value={ headerInput }
          onChange={ handleInputChange }
          type="text"
          placeholder="Digite o nome ou código do produto que deseja buscar"
        />
      ) : (<img src={logoRidicula} alt="logo-ridicula" />)}
    </header>
  );
}
