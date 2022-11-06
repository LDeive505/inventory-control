import { useState, useContext, useRef, useEffect } from 'react';
import Table from '../components/Table';
import ImportArea from '../components/ImportArea';
import Context from '../context/Context';
import { getLocalStorage, setLocalStorage } from '../helpers/localStorageHelpers';
import swal from 'sweetalert';
import '../styles/ProductManagement.css';
import exportDataFile from '../helpers/exportDataFile';

export default function ProductManagement() {
  const { setProductList, productList, idOfSelected,
    showImportScreen, setShowImportScreen } = useContext(Context);
  const formRef = useRef(null);
  const firstInput = useRef(null);
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [buttonText, setButtonText] = useState('Adicionar Produto');
  const [editButtonText, setEditButtonText] = useState('Editar Produto');
  const filteredProducts = productList.filter(product =>
    product.description.toLowerCase().includes(descriptionFilter.toLowerCase())) || productList;

  useEffect(() => {
    setDescriptionFilter('');
  },[productList]);

  const editProduct = () => {
    if (idOfSelected === null) return;
    if (editButtonText === 'Cancelar Edição') {
      formRef.current.reset();
      setDescriptionFilter('');
      setButtonText('Adicionar Produto');
      return setEditButtonText('Editar Produto');
    }

    const toBeEdited = productList.find(product => product.id === idOfSelected);
    const form = formRef.current;
    form[0].value = toBeEdited.description;
    form[1].value = toBeEdited.measurementUnit;
    form[2].value = toBeEdited.inStock;
    form[3].value = toBeEdited.purchasePrice;
    form[4].value = toBeEdited.salePrice;
    setButtonText('Salvar Alterações');
    setEditButtonText('Cancelar Edição');
  };

  const saveEditedProduct = (editedProduct) => {
    const newProductList = productList.map((product, index) => {
      if (product.id === idOfSelected) {
        editedProduct.id = product.id;
        return editedProduct;
      }
      return product;
    });
    setProductList([...newProductList]);
    formRef.current.reset();
    setButtonText('Adicionar Produto');
    setEditButtonText('Editar Produto');
  }

  const stockValidation = (value) => {
    if (value[0] !== '0') return value;
    const charArr = value.split('');
    let delZero = true;
    const newValue = charArr.reduce((acc, char) => {
      if (delZero && char === '0') return acc;
      delZero = false;
      return acc + char;
    }, '');
    
    if (newValue === '') return '0';
    return newValue;  
  }

  const priceValidation = (value) => {
    if (!value.includes('.')) {
      const newValue = stockValidation(value);
      return `${newValue}.00`;
    }
    const left = stockValidation(value.split('.')[0]);
    const right = value.split('.')[1];
    const price = `${left}.${right}`;

    return Number(price).toFixed(2);
  }
  
  const onFormSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;
    const formValues = [form[0].value, form[1].value, form[2].value, form[3].value, form[4].value];
    const valuesChecker = formValues.every((value, index) => index === 4 ? true : value !== '');
    const alreadyExists = productList.some((product) =>
      product.description === formValues[0]);

    if (alreadyExists && (buttonText === 'Adicionar Produto')) {
      swal({title: 'Produto já cadastrado', icon: 'error'});
      return;
    }

    if (!valuesChecker) return;
    const deletedIds = getLocalStorage('deletedIds',[]);
    const id = (deletedIds.length > 0) ? deletedIds.shift() : productList.length + 1;
    setLocalStorage('deletedIds', deletedIds);
    
    const product = {
      id,
      description: formValues[0],
      measurementUnit: formValues[1],
      inStock: stockValidation(formValues[2]),
      purchasePrice: priceValidation(formValues[3]),
      salePrice: priceValidation(formValues[4]), 
    };
    form.reset();
    firstInput.current.focus();

    if (buttonText === 'Salvar Alterações') return saveEditedProduct(product);

    if (id !== productList.length + 1) {
      const newProductList = [...productList, product];
      const sortedProductList = newProductList.sort((a,b) => a.id - b.id);
      setProductList(sortedProductList);
      return;
    }
    form.reset();
    setProductList((prevProdList) =>([...prevProdList, product]));
  };

  const deleteProduct = async () => {
    if (idOfSelected === null) return;
    const delectionConfirmed = await swal("Está ação não poderá ser desfeita, deseja continuar?", {
      buttons: ["Não", "Sim, tenho certeza!"],
    });
    if(!delectionConfirmed) return;
    const newProductList = productList.filter((product) => product.id !== idOfSelected);

    const deletedIds = getLocalStorage('deletedIds',[]);
    deletedIds.push(idOfSelected);
    setLocalStorage('deletedIds', deletedIds);

    setProductList([...newProductList]);
  }


  return (
    <div className="product-management-container">
      {showImportScreen ? (
        <ImportArea />
      ) : (
        <>
          <form onSubmit={onFormSubmit} ref={formRef}>
            <input
              id="description-input"
              type="text"
              name="description"
              placeholder="Descrição do Produto"
              ref={firstInput}
              onChange={ (e)=> setDescriptionFilter(e.target.value)}
            />
            <select defaultValue="und" name="measurementUnit">
              <option value="und" hidden>
                Und. Med
              </option>
              <option value="und">und</option>
              <option value="cx">cx</option>
              <option value="pct">pct</option>
              <option value="m">m</option>
            </select>
            <input
              type="number"
              id="stock"
              min="0"
              name="inStock"
              placeholder="Estoque"
            />
            <input
              className="prices"
              type="number"
              min="0"
              step="0.01"
              name="purchasePrice"
              placeholder="Preço de Compra"
            />
            <input
              className="prices"
              type="number"
              min="0"
              step="0.01"
              name="salePrice"
              placeholder="Preço de Venda"
            />
            <button id="add-button" type="submit">
              {buttonText}
            </button>
          </form>
          <Table
            data={ filteredProducts }
            hasInput={false}
            hasCheckbox={false}
            hasInkColumn={false}
          />
          <div className="management-buttons">
            <button id="edit-button" onClick={editProduct}>
              {editButtonText}
            </button>
            <button id="delete-button" onClick={deleteProduct}>
              Excluir Produto
            </button>
            <button id='export-button' onClick={exportDataFile}>Exportar Dados</button>
            <button id='import-button' onClick={() => setShowImportScreen(true)}>
              Importar Dados
            </button>
          </div>
        </>
      )}
    </div>
  );
}
