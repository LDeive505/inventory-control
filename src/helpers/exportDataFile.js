const fileSaver = require('file-saver');

export default function exportDataFile(shoppingList) {
  const productList = localStorage.getItem('productList');
  const cartData = localStorage.getItem('cartData');
  const logData = localStorage.getItem('logData');
  const deletedIds = localStorage.getItem('deletedIds');
  const dataToExport = { productList, cartData, logData, deletedIds };
  const file = new Blob([JSON.stringify(dataToExport)], { type: "text/plain;charset=utf-8" });
  fileSaver.saveAs(file, 'data.txt');
};