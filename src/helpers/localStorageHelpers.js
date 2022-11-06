export function getLocalStorage(key, defaultReturn) {
  const localData = localStorage.getItem(key);
  if (!localData) return defaultReturn;
  const parsedData = JSON.parse(localData);
  return parsedData;
}

export function setLocalStorage(key, data) {
  const stringData = JSON.stringify(data);
  localStorage.setItem(key, stringData);
}