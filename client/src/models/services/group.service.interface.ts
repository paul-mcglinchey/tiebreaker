import { IGroup } from "..";

export interface IGroupService {
  addGroup: (values: IGroup) => void,
  updateGroup: (values: IGroup, groupId: string | undefined) => void,
  deleteGroup: (groupId: string | undefined) => void,
  getTotalUsers: (accessControl: { [key: string]: string[] } | undefined) => number
}

export interface IUseGroupService extends IGroupService {
  groupService: IGroupService
}