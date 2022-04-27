interface IGroupEntities {
  users?: string[]
  rotas?: string[]
  clients?: string[]
  employees?: string[]
} 
export interface IGroup {
  _id?: string
  name?: string
  description?: string
  applications?: string[]
  entities?: IGroupEntities
  deletedEntities?: IGroupEntities
  listDefinitions?: string
  colour?: string
}

export interface IGroupsResponse {
  count: number,
  groups: IGroup[]
}