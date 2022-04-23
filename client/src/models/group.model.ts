export interface IGroup {
  _id?: string
  name?: string
  description?: string
  clients?: string[]
  rotas?: string[]
  employees?: string[]
  users?: {
    user: string,
    permissions: string[]
  }[]
  listDefinitions?: string
  colour?: string
}