export const getItemInStorage = (itemName: string | undefined) => {
  if (!itemName) return;
  return sessionStorage.getItem(itemName);
}

export const setItemInStorage = (itemName: string | undefined, data: any) => {
  if (!itemName || !data) return;
  sessionStorage.setItem(itemName, data);
}

export const getJsonItemInStorage = (itemName: string | undefined) => {
  if (!itemName) return;
  let data = sessionStorage.getItem(itemName);

  if (!data) return;
  return JSON.parse(data);
}

export const setJsonItemInStorage = (itemName: string | undefined, data: any) => {
  if (!itemName || !data) return;
  sessionStorage.setItem(itemName, JSON.stringify(data));
}

export const removeItemInStorage = (itemName: string | undefined) => {
  if (!itemName) return;
  sessionStorage.removeItem(itemName);
}