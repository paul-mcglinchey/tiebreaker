import { IAddGroup, IUpdateGroup } from "../../models";

export interface IGroupService<TGroup> {
  addGroup: (values: IAddGroup) => void,
  updateGroup: (values: IUpdateGroup, _id: string) => void,
  deleteGroup: (g: TGroup) => void,
  refresh: () => void,
  getTotalUsers: (accessControl: { [key: string]: string[] }) => number
} 