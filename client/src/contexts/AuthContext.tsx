import { createContext, useState } from "react";
import { IAuthContext, IChildrenProps, IPermissionGroup, IUser } from "../models";
import { useCookies } from 'react-cookie'
import { useIsMounted } from "../hooks";

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  getUser: () => undefined,
  updateUser: () => {},
  getAccess: () => false,
  getToken: () => undefined,
  getCookie: () => undefined,
  isAdmin: () => false,
  getPermissions: () => [],
  getGroupPermissions: () => []
});

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['UserAuth'])
  const isMounted = useIsMounted()

  const [user, setUser] = useState<IUser | undefined>(cookies.UserAuth)

  const getUser = () => user

  const updateUser = (user: IUser | undefined) => {
    isMounted() && setUser(user?.token ? user : undefined)

    const currentDate = new Date()
    const expiryDate = new Date(currentDate.setDate(currentDate.getDate() + 14))

    user?.token
      ? setCookie('UserAuth', user, { path: '/', expires: expiryDate })
      : removeCookie('UserAuth')
  }

  const getAccess = () => user !== undefined
  const getToken = () => user?.token
  const getCookie = () => cookies.UserAuth
  const isAdmin = () => user?.isAdmin || false
  const getPermissions = () => user?.permissions || []
  const getGroupPermissions = (groupId: string) => user?.permissions?.filter((p: IPermissionGroup) => p.groupId === groupId)[0]?.permissions || []

  const contextValue = {
    user,
    getUser,
    updateUser,
    getAccess,
    getToken,
    getCookie,
    isAdmin,
    getPermissions,
    getGroupPermissions
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
} 