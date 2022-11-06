function getDateAndHour(){
    const actualHour = new Date().toLocaleTimeString();
    const actualDate = new Date().toLocaleDateString();
    return `${actualDate}  ${actualHour}`;
};

function chooseActionText(diff) {
  switch (diff) {
    case 1: return 'Foi Adicionado';
    case -1: return 'Foi Removido';
    default:
      if (diff > 1) return 'Foram Adicionados';
      else if (diff < -1) return 'Foram Removidos';
  }
}

export function registerHistoryAdd(productList) {
  const newProduct = productList[productList.length - 1];
  const actionText = newProduct.inStock === '1' ? 'Foi Adicionado' : 'Foram Adicionados';
  const logObj =  {
    action: actionText,
    quantity: newProduct.inStock,
    description: newProduct.description,
    date: getDateAndHour(),
  }
  return [logObj];
};

export function registerHistoryRemove(oldProductList, productList) {
  const newRecord = [];
  oldProductList.forEach((product) => {
    const hasProduct = productList.some((oldProduct) => oldProduct.description === product.description);
    if (!hasProduct) {
      const actionText = product.inStock === '1' ? 'Foi Removido' : 'Foram Removidos';
      const logObj =  {
        action: actionText,
        quantity: product.inStock,
        description: product.description,
        date: getDateAndHour(),
      } 
      newRecord.push(logObj);
    }
  });
  return newRecord;
}

export default function registerHistoryChange(oldProductList, productList) {
  const diff  = productList.length - oldProductList.length;
  if (diff > 0) return registerHistoryAdd(productList);
  if(diff < 0) return registerHistoryRemove(oldProductList, productList);
  
  const newRecord = [];
  productList.forEach((product, index)=>{
    const compProduct = oldProductList[index];
    const diff = Number(product.inStock) - Number(compProduct.inStock);
    if (diff === 0) return;

    const logObj = {
      action: chooseActionText(diff),
      quantity: String(Math.abs(diff)),
      description: product.description,
      date: getDateAndHour(),
    };
    newRecord.push(logObj);
  });

  return newRecord; 
}
