import { IGroup, IGroupContext } from ".";

export interface IGroupService extends IGroupContext {
  getGroup: (groupId: string | undefined) => IGroup | undefined
  addGroup: (values: IGroup) => void
  updateGroup: (values: IGroup, groupId: string | undefined) => void
  deleteGroup: (groupId: string | undefined) => void
}