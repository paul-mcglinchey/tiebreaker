import { IUserContext } from "../../contexts/interfaces"
import { IGroup, IUser } from "../../models"

export interface IUserService extends IUserContext {
  getUser: (userId: string | undefined) => IUser | undefined
  updateUser: (userId: string | undefined, values: IUser) => void
  userHasApplication: (group: IGroup, userId: string | undefined, applicationIdentifier: number | undefined) => boolean
  userHasPermission: (group: IGroup, userId: string | undefined, applicationIdentifier: number | undefined, permissionIdentifier: number | undefined) => boolean
}