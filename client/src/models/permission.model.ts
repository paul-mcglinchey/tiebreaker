export interface IPermission {
  _id?: string,
  identifier?: number,
  name?: string,
  description?: string
  language?: string,
  applications?: number[],
  audit?: {
    createdBy: string
    updatedBy: string
  }
}

export interface IPermissionsResponse {
  count: number
  permissions: IPermission[]
}