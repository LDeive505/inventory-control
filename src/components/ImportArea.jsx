import React, { useContext, useRef } from 'react';
import Context from '../context/Context';
import swal from 'sweetalert';
import '../styles/ImportArea.css';

export default function ImportArea() {
  const { setShowImportScreen } = useContext(Context);
  const textArea = useRef(null);

  const importData = async () => {
    const { value } = textArea.current;
    let parsedValue;

    try {
      parsedValue = JSON.parse(value);
    } catch (error) {
      swal({ title: 'Dados Inválidos!', text: "Verifique se o campo de importação foi preenchido corretamente", icon: "error"});
      return;
    }
    const entries = Object.entries(parsedValue);
    
    localStorage.clear();

    entries.forEach(([key, value]) =>localStorage.setItem(key, value));
    const text = "Dados importados com sucesso! Reinicie a aplicação para que suas alterações tenham efeito";
    swal({ text, icon: "success"});
    setShowImportScreen(false);
  }

  return (
    <div className='import-area'>
      <textarea ref={ textArea } placeholder='Cole aqui os dados a serem importados' />
      <div className='import-buttons-container'>
        <button id='import-cancel' onClick={ ()=> setShowImportScreen(false) }>Cancelar Importação</button>
        <button id='import-confirm' onClick={ importData }>Confirmar Importação</button>
      </div>
    </div>
  );
}
