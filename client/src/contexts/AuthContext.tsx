import { createContext, useEffect, useState } from "react";
import { IChildrenProps, IUser } from "../models";
import { useCookies } from 'react-cookie'
import { useAsyncHandler, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { IAuthContext } from "./interfaces";
import { useNavigate } from "react-router";

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
  const [user, setUser] = useState<IUser | undefined>(cookies.UserAuth)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { asyncHandler } = useAsyncHandler();
  const { requestBuilder } = useRequestBuilder()
  const navigate = useNavigate()

  useEffect(() => {
    authenticate()
  }, [])

  useEffect(() => {
    const currentDate = new Date()
    const expiryDate = new Date(currentDate.setDate(currentDate.getDate() + 14))

    user?.token
      ? setCookie('UserAuth', user, { path: '/', expires: expiryDate })
      : removeCookie('UserAuth')
  }, [user])

  const authenticate = asyncHandler(async () => {
    const res = await fetch(endpoints.authenticate, requestBuilder('GET', user?.token))

    setIsLoading(false)

    if (!res.ok) throw new Error("Failed to authenticate user.")
  }, [() => navigate('/login')])

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