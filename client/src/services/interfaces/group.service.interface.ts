import { IAddGroup } from "../../models";

export interface IGroupService<TGroup> {
  addGroup: (values: IAddGroup) => void,
  deleteGroup: (g: TGroup) => void,
  setDefaultGroup: (g: TGroup) => void,
  isDefaultGroup: (_id: string) => Promise<boolean>,
  getDefaultGroup: () => Promise<string>
} 