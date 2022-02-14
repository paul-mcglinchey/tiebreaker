const getUserGroupInStorage = () => {
  try {
    return JSON.parse(sessionStorage.getItem("userGroup"));
  } catch {
    return null;
  }
}

export default getUserGroupInStorage;