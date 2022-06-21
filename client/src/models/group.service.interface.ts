import { IGroup, IGroupContext, IGroupsResponse } from ".";

export interface IGroupService extends IGroupContext {
  getGroup: (groupId: string | undefined) => IGroup | undefined
  getAllGroups: () => Promise<IGroupsResponse | void>
  addGroup: (values: IGroup) => void
  updateGroup: (values: IGroup, groupId: string | undefined) => void
  deleteGroup: (groupId: string | undefined) => void
}