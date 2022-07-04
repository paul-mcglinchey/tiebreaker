import { IGroupContext } from "../../contexts/interfaces"
import { IGroup } from "../../models"

export interface IGroupService extends IGroupContext {
  getGroup: (groupId: string | undefined) => IGroup | undefined
  addGroup: (values: IGroup) => void
  updateGroup: (values: IGroup, groupId: string | undefined) => void
  deleteGroup: (groupId: string | undefined) => void
}