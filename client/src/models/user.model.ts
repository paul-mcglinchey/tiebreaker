import { IAudit } from "./audit.model"
import { IPermission } from "./permission.model"

export interface IPreferences {
  defaultGroup?: string | undefined
}

export interface IUser {
  _id?: string
  username?: string,
  email?: string,
  password?: string
  token?: string
  isAdmin?: boolean
  invites?: {
    groupId: string
    permissions: IPermission[]
    createdAt?: string
    updatedAt?: string
    audit: IAudit
  }[]
  preferences?: IPreferences
  createdAt?: string
  updatedAt?: string
}

export interface IUsersResponse {
  count: number,
  users: IUser[]
}