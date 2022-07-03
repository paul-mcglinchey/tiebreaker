export interface IPermissionGroup {
  groupId: string
  permissions: IPermission[]
  rotas: {
    rotaId: string,
    permissions: IPermission[]
  }[]
}

export enum PermissionType {
  Group = 1,
  Application = 2
}

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