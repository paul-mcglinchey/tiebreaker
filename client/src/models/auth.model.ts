import { IPermission, IPermissionGroup } from "./permission.model"
import { IUser } from "./user.model"

export interface IAuth {
  user: IUser | undefined
  isLoading: boolean
  getAccess: () => boolean
  isAdmin: () => boolean
  getPermissions: () => IPermissionGroup[]
  getGroupPermissions: (groupId: string) => IPermission[]
  login: (user: IUser) => void
  signup: (user: IUser) => void
  logout: () => void
}