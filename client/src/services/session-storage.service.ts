export const getUserGroupInStorage = () => {
  try {
    return JSON.parse(sessionStorage.getItem("userGroup") || "");
  } catch {
    return null;
  }
}

export const getUsersInStorage = () => {
  try {
    return JSON.parse(sessionStorage.getItem("users") || "");
  } catch {
    return null;
  }
}

export const getUserInStorage = (uuid: string) => {
  try {
    const users = JSON.parse(sessionStorage.getItem("users") || "");
    return users.includes(uuid) ? users[uuid] : null;
  } catch {
    return null;
  }
}

export const updateUsersInStorage = (uuid: string, user: any) => {
  sessionStorage.setItem("users", { ...getUsersInStorage(), [uuid]: user });
}