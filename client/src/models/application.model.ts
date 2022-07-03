import { IAudit } from "."

export interface IApplication {
  _id?: string
  identifier?: number
  name?: string
  description?: string
  icon?: string
  backgroundImage?: string
  backgroundVideo?: string
  url?: string
  requiredPermissions: number[]
  colour?: string
  audit?: IAudit
}

export interface IApplicationsResponse {
  count: number
  applications: IApplication[]
}