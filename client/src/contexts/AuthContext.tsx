import { createContext, useEffect, useState } from "react";
import { IAuthContext, IChildrenProps, IPermissionGroup, IUser } from "../models";
import { useCookies } from 'react-cookie'
import { useFetch, useIsMounted, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  updateUser: () => {},
  getAccess: () => false,
  getToken: () => undefined,
  getCookie: () => undefined,
  isAdmin: () => false,
  isLoading: false,
  setIsLoading: () => {},
  getPermissions: () => [],
  getGroupPermissions: () => []
});

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['UserAuth'])
  const isMounted = useIsMounted()
  const { requestBuilder } = useRequestBuilder()

  const [user, setUser] = useState<IUser | undefined>(cookies.UserAuth)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { response, isLoading: isAuthLoading } = useFetch<IUser>(endpoints.authenticate, requestBuilder('GET', user?.token))

  const updateUser = (user: IUser | undefined) => {
    isMounted() && setUser(user?.token ? user : undefined)

    const currentDate = new Date()
    const expiryDate = new Date(currentDate.setDate(currentDate.getDate() + 14))

    user?.token
      ? setCookie('UserAuth', user, { path: '/', expires: expiryDate })
      : removeCookie('UserAuth')
  }

  useEffect(() => {
    updateUser(response)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  useEffect(() => {
    setIsLoading(isAuthLoading)
  }, [isAuthLoading])

  const getAccess = () => user !== undefined
  const getToken = () => user?.token
  const getCookie = () => cookies.UserAuth
  const isAdmin = () => user?.isAdmin || false
  const getPermissions = () => user?.permissions || []
  const getGroupPermissions = (groupId: string) => user?.permissions?.filter((p: IPermissionGroup) => p.groupId === groupId)[0]?.permissions || []

  const contextValue = {
    user,
    updateUser,
    getAccess,
    getToken,
    getCookie,
    isAdmin,
    isLoading,
    setIsLoading,
    getPermissions,
    getGroupPermissions
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
} 