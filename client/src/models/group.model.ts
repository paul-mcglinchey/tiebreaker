import { IRole, IApplication } from "."

export interface IGroupUserApplication {
  applicationId: number
  roles: IRole[]
}

export interface IGroupUser {
  id: string
  userId: string
  hasJoined: boolean
  roles: IRole[]
  applications: IGroupUserApplication[]
}

export interface IGroup {
  id?: string
  name?: string
  description?: string
  applications: IApplication[]
  groupUsers: IGroupUser[]
  listDefinitions?: string
  colour?: string
}

export interface IGroupsResponse {
  count: number,
  items: IGroup[]
}