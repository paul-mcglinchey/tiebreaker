import { Dispatch, SetStateAction } from "react"
import { IUser, IPermission, IPermissionGroup } from "."

export interface IAuthContext {
  user: IUser | undefined
  updateUser: (user: IUser | undefined) => void
  getAccess: () => boolean
  getToken: () => string | undefined
  getCookie: () => IUser | undefined
  isAdmin: () => boolean
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  getPermissions: () => IPermissionGroup[]
  getGroupPermissions: (groupId: string) => IPermission[]
}