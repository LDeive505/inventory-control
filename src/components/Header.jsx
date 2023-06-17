import React, { useContext } from 'react';
import Context from '../context/Context';

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
      ) : (<h1>Inventory Control Print</h1>)}
    </header>
  );
}
