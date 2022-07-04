import { PermissionType } from "../enums"

export interface IPermission {
  _id?: string,
  identifier?: number,
  name?: string,
  description?: string
  language?: string
  type?: PermissionType
  audit?: {
    createdBy: string
    updatedBy: string
  }
}

export interface IPermissionsResponse {
  count: number
  permissions: IPermission[]
}