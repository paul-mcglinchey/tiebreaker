export const getItemInStorage = (itemName: string) => {
  try {
    return JSON.parse(sessionStorage.getItem(itemName) || "");
  } catch {
    return null;
  }
}

export const getUserInStorage = (uuid: string) => {
  try {
    const users = JSON.parse(sessionStorage.getItem("users") || "{}");
    return Object.keys(users).includes(uuid) ? users[uuid] : null;
  } catch {
    return null;
  }
}

export const updateUsersInStorage = (uuid: string, user: any) => {
  sessionStorage.setItem("users", JSON.stringify({ ...getItemInStorage("users"), [uuid]: user }));
}