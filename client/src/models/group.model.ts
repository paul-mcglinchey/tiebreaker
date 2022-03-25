export interface IGroup {
  _id: string,
  name: string,
  description: string,
  accessControl: {
    [key: string]: string[]
  },
  listDefinitions: string,
  colour: string
}