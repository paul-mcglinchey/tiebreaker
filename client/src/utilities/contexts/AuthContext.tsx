import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { useRequestBuilder, useStatus } from "../../hooks";
import { IChildrenProps, IUser, Status } from "../../models";
import { endpoints } from "../config";
import { useCookies } from 'react-cookie'

interface IAuthContext {
  user: IUser | undefined,
  isLoading: boolean
  login: (user: IUser) => void,
  signup: (user: IUser) => void,
  logout: () => void
  authenticate: () => void
  getAccess: () => boolean
  getToken: () => string | undefined
}

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  isLoading: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
  authenticate: () => {},
  getAccess: () => false,
  getToken: () => undefined
});

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['UserAuth'])
  const { appendStatus } = useStatus()
  const navigate = useNavigate()
  const { requestBuilder } = useRequestBuilder()

  const [user, setUser] = useState<IUser | undefined>(cookies.UserAuth);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateUser = (user: IUser | undefined) => {
    setUser(user?.token ? user : undefined)

    user?.token 
      ? setCookie('UserAuth', user)
      : removeCookie('UserAuth')

    navigate(user ? '/dashboard' : '/login', { replace: true })
  }

  const login = (user: IUser) => {
    setIsLoading(true)

    fetch(endpoints.login, requestBuilder('POST', undefined, user))
      .then(res => {
        if (!res.ok) throw new Error(res.status.toString())
        
        return res.json()
      })
      .then((json: IUser) => updateUser(json))
      .catch(err => {
        console.error(err)
      })
      .finally(() => setIsLoading(false))
  }

  const signup = async (user: IUser) => {
    setIsLoading(true)

    const res = await fetch(endpoints.signup, requestBuilder('POST', undefined, user))
    const json = await res.json()

    if (!res.ok) {
      appendStatus(false, `${json.message}`, Status.Error)
    } else {
      updateUser(json)
    }

    setIsLoading(false)
  }

  const logout = () => {
    updateUser(undefined)
  }

  const authenticate = () => {
    setIsLoading(true)

    fetch(endpoints.authenticate, requestBuilder())
      .then(res => {
        if (!res.ok) updateUser(undefined)

        return res.json()
      })
      .then((json: IUser) => updateUser(json))
      .finally(() => setIsLoading(false))
  }

  const getAccess = () => user !== undefined

  const getToken = () => user?.token;

  const contextValue = {
    user,
    isLoading,
    login: login,
    signup: signup,
    logout: logout,
    authenticate: authenticate,
    getAccess: getAccess,
    getToken: getToken
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
} 