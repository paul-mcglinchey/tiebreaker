import { IGroup } from "..";

export interface IGroupService {
  groupId: string
  updateGroupId: (groupId: string) => void
  getGroups: () => IGroup[]
  getCount: () => number
  isLoading: boolean
  error: any | undefined
  refresh: () => void
  addGroup: (values: IGroup) => void
  updateGroup: (values: IGroup, groupId: string | undefined) => void
  deleteGroup: (groupId: string | undefined) => void
  getTotalClients: (groups: IGroup[]) => number
  getTotalEmployees: (groups: IGroup[]) => number
  getTotalRotas: (groups: IGroup[]) => number
}