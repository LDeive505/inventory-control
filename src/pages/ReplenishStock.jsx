import React, { useContext} from 'react';
import Table from '../components/Table';
import Context from '../context/Context';
import saveShoppingList from '../helpers/fileSaver';
import '../styles/ReplenishStock.css';
import saveIcon from '../icons/save.svg';

export default function ReplenishStock() {
  const { productList } = useContext(Context);
  const printerInkData = [];
  
  const productData = productList.filter((product) => {
    const { inStock, description } = product;
    const nameText = description.toLowerCase();
    const hasInkText = nameText.includes('tinta') || nameText.includes('toner');
    const lowStock = inStock <= 5;
    if (hasInkText && lowStock) {
      printerInkData.push(product);
      return false;
    }
    if (lowStock) return true;
    return false;
  });

  const generateListFile = () => {
    const checkBoxes = document.querySelectorAll('.checkbox');
    const selectedCheckBoxes = Array.from(checkBoxes).filter((checkbox) => checkbox.checked);
    const shoppingList = selectedCheckBoxes.map((checkbox) => checkbox.name);
    if(shoppingList.length === 0) return;
    saveShoppingList(shoppingList);
  };

  return (
    <div className="replenish-stock-container">
      <Table data={ productData } hasInput={ false } hasCheckbox={ true } hasInkColumn={ false }/>
      <Table data={ printerInkData } hasInput={ false } hasCheckbox={ true } hasInkColumn={ true }/>
      <button id="generate-list-button" onClick={ generateListFile }>
        <img src={ saveIcon } alt="saveIcon" id='save'></img>
        Gerar Lista de Compras
      </button>
    </div>
  );
}
