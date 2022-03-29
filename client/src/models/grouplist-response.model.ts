export interface IGroupListValue {
  _id: string, 
  short?: string,
  long: string,
  colour: string
}

export interface IGroupList {
  _id: string,
  name: string,
  description: string,
  values: IGroupListValue[]
}

export interface IGrouplistResponse {
  _id: string,
  lists: IGroupList[],
  createdBy?: string,
  updatedBy?: string,
  default?: boolean
}

export interface IDefaultGrouplistResponse {
  defaultLists: IGrouplistResponse
}