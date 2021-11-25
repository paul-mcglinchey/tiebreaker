const setUser = (userObj) => {
  return {
    type: "SET_USER",
    payload: userObj
  }
}

const logOut = () => {
  return {
    type: "LOG_OUT"
  }
}

const userActions = {
  setUser,
  logOut
}

export default userActions;