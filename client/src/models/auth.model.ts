import { IUser } from "./user.model"

export interface IAuth {
  user: IUser | undefined
  isLoading: boolean
  getAccess: () => boolean
  login: (user: IUser) => void
  signup: (user: IUser) => void
  logout: () => void
}