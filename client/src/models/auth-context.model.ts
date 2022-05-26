import { IUser, IPermission, IPermissionGroup } from "."

export interface IAuthContext {
  user: IUser | undefined,
  getUser: () => IUser | undefined
  updateUser: (user: IUser | undefined) => void,
  getAccess: () => boolean
  getToken: () => string | undefined
  getCookie: () => IUser | undefined
  isAdmin: () => boolean
  getPermissions: () => IPermissionGroup[]
  getGroupPermissions: (groupId: string) => IPermission[]
}