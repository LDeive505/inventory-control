export function sortByStock(data,filteredData) {
  const isSorted = filteredData.every((item,index) =>{ 
    if (index + 1 === data.length ) return true;
    return Number(filteredData[index + 1].inStock) >=  Number(item.inStock);
  });
  if(isSorted) return data.sort((a,b) => b.inStock - a.inStock);

  return data.sort((a, b) => a.inStock - b.inStock);
}

export function sortByDescription(data,filteredData) {
  const isSorted = filteredData.every((item,index) =>{ 
    if (index + 1 === data.length ) return true;
    return filteredData[index + 1].description.toLowerCase() >= item.description.toLowerCase();
  });

  if(isSorted) return data.sort((a, b) => {
    if (a.description.toLowerCase() > b.description.toLowerCase()) return -1;
    if (a.description.toLowerCase() < b.description.toLowerCase()) return 1;
    return 0;
  });

  return data.sort((a, b) => {
    if (a.description.toLowerCase() < b.description.toLowerCase()) return -1;
    if (a.description.toLowerCase() > b.description.toLowerCase()) return 1;
    return 0;
  });
}

export function sortBySalePrice(data,filteredData) {
  const isSorted = filteredData.every((item,index) =>{ 
    if (index + 1 === data.length ) return true;
    return Number(filteredData[index + 1].salePrice) >=  Number(item.salePrice);
  });
  if(isSorted) return data.sort((a,b) => b.salePrice - a.salePrice);

  return data.sort((a, b) => a.salePrice - b.salePrice);
}

export function sortByPurchasePrice(data,filteredData) {
  const isSorted = filteredData.every((item,index) =>{ 
    if (index + 1 === data.length ) return true;
    return Number(filteredData[index + 1].purchasePrice) >=  Number(item.purchasePrice);
  });
  if(isSorted) return data.sort((a,b) => b.purchasePrice - a.purchasePrice);

  return data.sort((a, b) => a.purchasePrice - b.purchasePrice);
}

export function sortById(data) {
  return data.sort((a, b) => a.id - b.id);
}