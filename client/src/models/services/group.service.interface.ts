import { IGroup } from "..";

export interface IGroupService {
  addGroup: (values: IGroup) => void
  updateGroup: (values: IGroup, groupId: string | undefined) => void
  deleteGroup: (groupId: string | undefined) => void
}