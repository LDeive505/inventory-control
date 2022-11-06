import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

export default function InputColumn({ inStock, id }) {

  const [input, setInput] = useState('');
  const { cartItens, setCartItens, productList, cartData } = useContext(Context);
  useEffect(() => {
    setInput('');
  }, [cartData]);

  useEffect(()=> {
    if(input === '0')  setInput('');
  } , [input]);

  useEffect(()=> {
    const description = productList.find((item) => item.id === id).description;
    const salePrice = productList.find((item) => item.id === id).salePrice;
    const cartObj = { description, salePrice, id, quantity: input, };
    const hasInCart = cartItens.find((item) => item.id === id);

    let newCartItens = [];
    if (hasInCart) {
      newCartItens = cartItens.map((item) => {
        if (item.id === id) return cartObj;
        return item;
      });
    } else {
      newCartItens = [...cartItens, cartObj];
    }
    setCartItens(newCartItens);
  }, [input]); // eslint-disable-line

  const onInputsChange = ({ target }) => {

    setInput(target.value);
    const value = Number(target.value);
    const min = Number(target.min);
    const max = Number(target.max);
  
    if( value > max) {
      setInput(String(max));
      return;
    }
    if( value < min) {
      setInput('');
      return;
    }
  };

  const addOrSubOne = ({ target: { innerHTML } }) => {
    const value = Number(input);
    if(value === 0 && innerHTML === '-') return;
    if(value >= Number(inStock) && innerHTML === '+') {
      setInput(inStock);
      return;
    }
    innerHTML === '+' ? setInput(String(Number(input) + 1)) : setInput(String(Number(input) - 1));
  };

  return (
    <td className='white-column'> 
      <button onClick={ addOrSubOne } className="table-button">-</button>
      <input
        value={ input }
        onChange={ onInputsChange }
        type="number"
        min="0"
        max={ inStock }
        className="table-input"
      />
      <button onClick={ addOrSubOne } className="table-button">+</button>
    </td>
  );
}
