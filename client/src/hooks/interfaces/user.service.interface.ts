import { IUserContext } from "../../contexts/interfaces"
import { IUser } from "../../models"

export interface IUserService extends IUserContext {
  getUser: (userId: string | undefined) => IUser | undefined
  updateUser: (userId: string | undefined, values: IUser) => void
}