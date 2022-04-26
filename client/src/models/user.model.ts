import { IAudit } from "./audit.model"
import { IPermission, IPermissionGroup } from "./permission.model"

export interface IUser {
  _id?: string
  username?: string,
  email?: string,
  password?: string
  token?: string
  isAdmin?: boolean
  permissions?: IPermissionGroup[]
  invites?: {
    groupId: string
    permissions: IPermission[]
    createdAt?: string
    updatedAt?: string
    audit: IAudit
  }[]
  createdAt?: string
  updatedAt?: string
}

export interface IUsersResponse {
  count: number,
  users: IUser[]
}