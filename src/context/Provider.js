import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { getLocalStorage, setLocalStorage } from '../helpers/localStorageHelpers';
import registerHistoryChange from '../helpers/recordHistory';

function Provider({ children }) {
  const localData = getLocalStorage('productList', []);
  const localCart = getLocalStorage('cartData', []);
  const localCartItens = getLocalStorage('cartItens', []);
  const localLogData = getLocalStorage('logData', []);
  const [productList, setProductList] = useState(localData);
  const [cartData, setCartData] = useState(localCart);
  const [cartItens, setCartItens] = useState(localCartItens);
  const [logData, setLogData] = useState(localLogData);
  const [idOfSelected, setIdOfSelected] = useState(null);
  const [screenSelector, setScreenSelector] = useState({ screenNumber:0, hasInput: true });
  const [headerInput, setHeaderInput] = useState('');
  const [showImportScreen, setShowImportScreen] = useState(false);

  useEffect(() => {
    if (JSON.stringify(localData) !== JSON.stringify(productList)) {
      const newRegister = registerHistoryChange(localData, productList);
      const tempLog = [...newRegister, ...logData];
      let newLog = tempLog;
      if (tempLog.length > 100) {
        newLog = tempLog.filter((_item, index) => index <= 99);
      }
      setLogData(newLog);
    }
    setLocalStorage('productList', productList) 
  }, [productList]); // eslint-disable-line

  useEffect(()=>{
    setIdOfSelected(null)
  }, [productList,cartData, screenSelector,headerInput]);

  useEffect(() => { setLocalStorage("cartData", cartData) }, [cartData]);
  useEffect(() => { setLocalStorage("cartItens", cartItens) }, [cartItens]);
  useEffect(() => { setLocalStorage("logData", logData) }, [logData]);

  const contextValue = { screenSelector, setScreenSelector, productList, setProductList, idOfSelected,
    setIdOfSelected, cartItens, setCartItens, cartData, setCartData, logData, setLogData, headerInput,
    setHeaderInput, showImportScreen, setShowImportScreen };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;