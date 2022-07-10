import { createContext, useEffect, useState } from "react";
import { IChildrenProps, IUser } from "../models";
import { useCookies } from 'react-cookie'
import { useFetch, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { IAuthContext } from "./interfaces";

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  setUser: () => { },
  getAccess: () => false,
  getToken: () => undefined,
  getCookie: () => undefined,
  isAdmin: () => false,
  isLoading: false
});

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['UserAuth'])
  const { requestBuilder } = useRequestBuilder()

  const [user, setUser] = useState<IUser | undefined>(cookies.UserAuth)
  const { response, isLoading } = useFetch<IUser>(endpoints.authenticate, requestBuilder('GET', user?.token))

  useEffect(() => {
    setUser(response)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  useEffect(() => {
    const currentDate = new Date()
    const expiryDate = new Date(currentDate.setDate(currentDate.getDate() + 14))

    user?.token
      ? setCookie('UserAuth', user, { path: '/', expires: expiryDate })
      : removeCookie('UserAuth')
  }, [user])

  const getAccess = () => user !== undefined
  const getToken = () => user?.token
  const getCookie = () => cookies.UserAuth
  const isAdmin = () => user?.isAdmin || false

  const contextValue = {
    user,
    setUser,
    getAccess,
    getToken,
    getCookie,
    isAdmin,
    isLoading
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
} 