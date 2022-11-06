import { useContext , useEffect, useState } from 'react';
import Context from '../context/Context';
import InputColumn from './InputColumn';
import { sortByStock, sortByDescription, sortById,
  sortByPurchasePrice, sortBySalePrice } from '../helpers/tableSorters';
import '../styles/Table.css';

export default function Table(props) {
  const { setIdOfSelected, idOfSelected, headerInput, screenSelector } = useContext(Context);
  const { hasInput, hasCheckbox, hasInkColumn, data } = props;
  const [filteredData, setFilteredData] = useState([]);
  const defaultCheboxes = data.map((_item) => false);
  const [checkboxList, setCheckboxList] =  useState(defaultCheboxes);
  const inkOrProductText = hasInkColumn ? 'Tinta de Impressora' : 'Descrição do produto';

  useEffect(()=>{
    if (headerInput === '') return setFilteredData(data);

    const idInput = Number(headerInput);
    if (!isNaN(idInput)) { 
      const newData = data.filter((line) => line.id === idInput);
      return setFilteredData(newData);
    }

    const newData = data.filter((line) => line.description.toLowerCase().includes(headerInput.toLowerCase()));
    setFilteredData(newData);
  },[headerInput]); // eslint-disable-line

  useEffect(()=> {
    setFilteredData(data);
  }, [data]);

  const setLineColor = (value) => {
      if(Number(value) === 0 ) return "red-line";
      if(Number(value) <= 9 ) return "yellow-line";
      return "";
  }

  const checkScreen = (value) => {
    const { screenNumber } = screenSelector;
    if( screenNumber === 1) return setLineColor(value);
    return 'selected';
  }

  const checkAll = ({target:{ checked }}) => {
    if(checked) {
      const newList = checkboxList.map((_checkbox)=> true);
      return setCheckboxList(newList);
    }
    const newList = checkboxList.map((_checkbox)=> false);
    setCheckboxList(newList);
  };

  const handleCheckBoxes = (ind) => {
      const newList = checkboxList.map((checkbox,index) => {
        if(index === ind) return !checkbox;
        return checkbox;
      });
      return setCheckboxList(newList);
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {hasCheckbox && (
              <th className="checkbox-th">
                <input type="checkbox" onChange={checkAll} />
              </th>
            )}
            <th
              className="id-th"
              onClick={() => setFilteredData(sortById(data))}
            >
              Código
            </th>
            <th
              className="product-th"
              onClick={() =>
                setFilteredData([...sortByDescription(data, filteredData)])
              }
            >
              {inkOrProductText}
            </th>
            <th className="unit-th">Und.Med</th>
            <th
              className="stock-th"
              onClick={() =>
                setFilteredData([...sortByStock(data, filteredData)])
              }
            >
              Estoque
            </th>
            <th
              className="purchase-price-th"
              onClick={() =>
                setFilteredData([...sortByPurchasePrice(data, filteredData)])
              }
            >
              Preço de compra
            </th>
            <th
              className="sale-price-th"
              onClick={() =>
                setFilteredData([...sortBySalePrice(data, filteredData)])
              }
            >
              Preço de venda
            </th>
            {hasInput && <th className="white-column" id='white-th'>Adicionar</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((product, index) => (
            <tr
              key={index}
              onClick={ () => setIdOfSelected(product.id)}
              className={ idOfSelected !== product.id ? setLineColor(product.inStock) : checkScreen(product.inStock) }
            >
              {hasCheckbox && (
                <td>
                  <input
                    type="checkbox"
                    name={`${product.description} - ${product.inStock}`}
                    checked={checkboxList[index]}
                    className="checkbox"
                    onChange={() => handleCheckBoxes(index)}
                  />
                </td>
              )}
              <td>{product.id}</td>
              <td>
                {product.description}
              </td>
              <td>
                {product.measurementUnit}
              </td>
              <td>
                {product.inStock}
              </td>
              <td
              
              >{`R$ ${product.purchasePrice.replace(".", ",")}`}</td>
              <td>
                {product.salePrice !== ""
                  ? `R$ ${product.salePrice.replace(".", ",")}`
                  : ""}
              </td>
              {hasInput && (
                <InputColumn inStock={product.inStock} id={product.id} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
