export interface IPermissionGroup {
  groupId: string
  permissions: IPermission[]
  rotas: {
    rotaId: string,
    permissions: IPermission[]
  }[]
}
export interface IPermission {
  _id?: string,
  name?: string,
  description?: string
  language?: string
  audit?: {
    createdBy: string
    updatedBy: string
  }
}

export interface IPermissionsResponse {
  count: number
  permissions: IPermission[]
}