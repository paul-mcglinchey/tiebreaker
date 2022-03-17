export interface IGroup {
  _id: string,
  groupName: string,
  accessControl: {
    [key: string]: string[]
  },
  listDefinitions: string,
  groupColour: string
}