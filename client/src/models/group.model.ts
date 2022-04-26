export interface IGroup {
  _id?: string
  name?: string
  description?: string
  applications?: string[]
  users?: string[]
  clients?: string[]
  rotas?: string[]
  employees?: string[]
  listDefinitions?: string
  colour?: string
}

export interface IGroupsResponse {
  count: number,
  groups: IGroup[]
}