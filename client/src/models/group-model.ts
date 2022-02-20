export interface IGroup {
  _id: string,
  groupName: string,
  default: boolean,
  clients: string[],
  users: string[]
}