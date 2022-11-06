const fileSaver = require('file-saver');

export default function saveShoppingList(shoppingList) {
  const header = `== Lista de Compras - Data ${new Date().toLocaleDateString()} ==`;
  const itensString = shoppingList.reduce((acc,item) =>acc.concat(`${item}\n`),'');
  const shoppingListString = `${header}\n\n${itensString}`;
  const blob = new Blob([shoppingListString], {type: "text/plain;charset=utf-8"});
  fileSaver.saveAs(blob, "lista.txt");
}