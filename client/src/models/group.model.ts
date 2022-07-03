interface IGroupEntities {
  users?: string[]
  rotas?: string[]
  clients?: string[]
  employees?: string[]
} 

export interface IGroupUser {
  user: string,
  permissions: number[]
  applications: {
    application: number
    permissions: number[]
  }[]
}

export interface IGroup {
  _id?: string
  name?: string
  description?: string
  applications?: number[]
  users: IGroupUser[],
  entities?: IGroupEntities
  deletedEntities?: IGroupEntities
  listDefinitions?: string
  colour?: string
}

export interface IGroupsResponse {
  count: number,
  groups: IGroup[]
}