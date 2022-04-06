import { IGroup } from "../../models";

export interface IGroupService<TGroup> {
  addGroup: (values: IGroup) => void,
  updateGroup: (values: IGroup, _id: string | undefined) => void,
  deleteGroup: (g: TGroup) => void,
  refresh: () => void,
  getTotalUsers: (accessControl: { [key: string]: string[] }) => number
} 