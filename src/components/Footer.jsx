import React, { useContext } from 'react';
import Context from '../context/Context';
import DateAndTime from './DateAndTime';
import '../styles/Footer.css';

export default function Footer({ prodInfo }) {
  const { cartData } = useContext(Context);
  const prodQuantity = cartData.length;
  const itemQuantity = cartData.reduce((acc, curr) => acc + Number(curr.quantity), 0);
  const value = cartData.reduce((acc, curr) => acc + Number(curr.salePrice) * Number(curr.quantity), 0);
  const total = value.toFixed(2);
  const cartTotal = total.includes('.') ? total.replace('.', ',') : `${total},00`;

  const hasToShow = () => {
    if (!prodInfo) return "ocult-text";
    return "";
  }

  return (
    <footer>
        <span className={ hasToShow()}>Produtos Adicionados ao Carrinho: {prodQuantity}</span>
        <span className={ hasToShow()}>Quantidade de Itens: {itemQuantity}</span>
        <span className={ hasToShow()}>Valor Total: {`R$ ${cartTotal}`}</span>
      <DateAndTime />
    </footer>
  );
}
