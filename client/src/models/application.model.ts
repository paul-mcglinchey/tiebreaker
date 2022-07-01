import { IAudit } from "."

export interface IApplication {
  _id?: string
  identifier?: string
  name?: string
  description?: string
  icon?: string
  url?: string
  requiredPermissions?: string[]
  audit?: IAudit
}

export interface IApplicationsResponse {
  count: number
  applications: IApplication[]
}