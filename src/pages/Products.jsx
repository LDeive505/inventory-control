import React, { useContext} from 'react';
import Table from '../components/Table';
import CartTable from '../components/CartTable';
import Context from '../context/Context';
import swal from 'sweetalert';
import '../styles/Products.css';

export default function Products() {
  const { productList, setProductList, cartItens,
    setCartItens, cartData, setCartData } = useContext(Context);

  const addInCart = () => {
    const hasProductsToAdd = cartItens.some((item) => item.quantity !== '' );
    if (!hasProductsToAdd) return;

    const updatedItens = cartData.map((item) => {
      const editItem = cartItens.find((cartItem) => cartItem.id === item.id);
      if (!editItem) return item;
      const newQuantity = String(Number(item.quantity) + Number(editItem.quantity));
      return { ...item, quantity: newQuantity};
    });
    
    const newItens = cartItens.filter((item) => !cartData.some((cartItem) => cartItem.id === item.id));
    const newCartData = [...updatedItens, ...newItens]
      .filter((item) => item.quantity !== '' && item.quantity !== '0');
    setCartData(newCartData);
    setCartItens([]);
  };

  const removeItensFromInventory = async () => {
    const hasProductsToRemove = cartData.some((item) => item.quantity !== '');
    if (!hasProductsToRemove) return;
  
    const confirmAction = await swal("Está ação removerá os itens do estoque, deseja continuar?", {
      buttons: ["Não", "Sim"],
    });
    if (!confirmAction) return;
  
    const newProductList = productList.map((product) => {
      const newProduct = { ...product };
      const cartProduct = cartData.find((cartProd) => cartProd.id === product.id);
      if(!cartProduct) return product;
      const attStock = String(Number(product.inStock) - Number(cartProduct.quantity)); 
      newProduct.inStock = attStock;
      return newProduct
    });
  
    setProductList(newProductList);
    setCartItens([]);
    setCartData([]);
  };

  return (
    <div className='products-container'>
      <Table data={ productList } hasInput={ true } hasCheckbox={ false } hasInkColumn={ false } />
      <div className='add-button-container'>
        <button id='add-in-cart-button' onClick={ addInCart }>Adicionar</button>
      </div>
      <div className="cart-area-container">
        <div className='cart-table-block'>
          <div id="cart-title">Produtos Adicionados ao Carrinho</div>
          <CartTable data={ cartData }/>
        </div>
        <button id="empty-cart-button" onClick={ ()=> setCartData([]) }>Esvaziar Carrinho</button><br />
        <button id="remove-button" onClick={ removeItensFromInventory }>Confirmar Itens e Remover do Estoque</button>
      </div>
    </div>
  );
}
