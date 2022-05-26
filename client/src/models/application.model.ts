import { IAudit } from "."

export interface IApplication {
  _id?: string
  name?: string
  description?: string
  icon?: string
  audit?: IAudit
}