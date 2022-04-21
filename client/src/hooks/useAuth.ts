import { useContext } from "react"
import { AuthContext } from "../utilities"

const useAuth = () => {
  const { login, signup, getAccess, getToken, user } = useContext(AuthContext);

  return { login, signup, getAccess, getToken, user }
}

export default useAuth;