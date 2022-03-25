import { IAddGroup } from "../../models";

export interface IGroupService<TGroup> {
  addGroup: (values: IAddGroup) => void,
  deleteGroup: (g: TGroup) => void,
  refresh: () => void
} 