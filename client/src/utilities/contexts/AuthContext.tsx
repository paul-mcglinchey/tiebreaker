import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { IAuthContext, IChildrenProps, IPermissionGroup, IUser } from "../../models";
import { useCookies } from 'react-cookie'

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  updateUser: () => {},
  getAccess: () => false,
  getToken: () => undefined,
  isAdmin: () => false,
  getPermissions: () => [],
  getGroupPermissions: () => []
});

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['UserAuth'])
  const navigate = useNavigate()

  const [user, setUser] = useState<IUser | undefined>(cookies.UserAuth)

  const updateUser = (user: IUser | undefined) => {
    setUser(user?.token ? user : undefined)

    user?.token
      ? setCookie('UserAuth', user)
      : removeCookie('UserAuth')

    navigate(user ? '/dashboard' : '/login', { replace: true })
  }

  const getAccess = () => user !== undefined
  const getToken = () => user?.token
  const isAdmin = () => user?.isAdmin || false
  const getPermissions = () => user?.permissions || []
  const getGroupPermissions = (groupId: string) => user?.permissions?.filter((p: IPermissionGroup) => p.groupId === groupId)[0]?.permissions || []

  const contextValue = {
    user,
    updateUser: useCallback((user: IUser | undefined) => updateUser(user), []),
    getAccess: getAccess,
    getToken: getToken,
    isAdmin: isAdmin,
    getPermissions: getPermissions,
    getGroupPermissions: getGroupPermissions
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
} 