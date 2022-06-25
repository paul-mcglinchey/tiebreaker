export interface IPermissionGroup {
  groupId: string
  permissions: IPermission[]
  rotas: {
    rotaId: string,
    permissions: IPermission[]
  }[]
}

export enum PermissionType {
  Group = 'Group',
  Application = 'Application'
}
export interface IPermission {
  _id?: string,
  identifier?: string,
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