import React, { useContext } from 'react';
import Context from '../context/Context';
import delIcon from '../icons/trash.svg'

export default function CartTable({ data }) {

  const { setCartData } = useContext(Context);

  const deleteCartItem = (index) => {
    const newData = data.filter((_item, i) => i !== index);
    setCartData(newData);
  }

  return (
    <div className="cart-table-container">
      <table>
        <thead id='thead'>
          <tr>
            <th>Descrição do Produto</th>
            <th>Quantidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody id='tbody'>
          {data.map((product, index) => (
            <tr key={index}>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td onClick={ () => deleteCartItem(index) }><img src={delIcon} alt="trashButton"></img></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
