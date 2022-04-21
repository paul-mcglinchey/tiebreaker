import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRequestBuilder } from "../../hooks";
import { IChildrenProps, IUser } from "../../models";
import { getJsonItemInStorage, setJsonItemInStorage } from "../../services";
import { endpoints } from "../config";

interface IAuthContext {
  user: IUser | undefined,
  isLoading: boolean
  login: (user: IUser) => void,
  signup: (user: IUser) => void,
  getAccess: () => boolean
  getToken: () => string | undefined
}

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  isLoading: false,
  login: () => {},
  signup: () => {},
  getAccess: () => false,
  getToken: () => undefined
});

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [user, setUser] = useState<IUser | undefined>(getJsonItemInStorage('user'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  const { requestBuilder } = useRequestBuilder()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user])

  const updateUser = (user: IUser) => {
    setUser(user)
    setJsonItemInStorage('user', user);

    user && navigate('/dashboard', { replace: true })
  }

  const login = (user: IUser) => {
    setIsLoading(true)

    fetch(endpoints.login, requestBuilder('POST', undefined, user))
      .then(res => res.json())
      .then(json => updateUser(json))
      .finally(() => setIsLoading(false))
  }

  const signup = (user: IUser) => {
    setIsLoading(true)

    fetch(endpoints.signup, requestBuilder('POST', undefined, user))
      .then(res => res.json())
      .then(json => updateUser(json))
      .finally(() => setIsLoading(false))
  }

  const getAccess = () => user !== undefined;

  const getToken = () => user?.token;

  const contextValue = {
    user,
    isLoading,
    login: useCallback((user: IUser) => login(user), []),
    signup: useCallback((user: IUser) => signup(user), []),
    getAccess: useCallback(() => getAccess(), []),
    getToken: useCallback(() => getToken(), [])
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
} 