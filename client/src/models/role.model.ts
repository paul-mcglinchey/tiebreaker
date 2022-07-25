import { IPermission } from "."

export interface IRole {
  id: string
  name: string
  description: string
  permissions: IPermission[]
}