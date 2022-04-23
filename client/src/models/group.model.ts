export interface IGroup {
  _id?: string,
  name?: string,
  description?: string,
  accessControl?: {
    viewers: string[],
    editors: string[],
    owners: string[],
  },
  listDefinitions?: string,
  colour?: string
}