import { IUser } from ".."

export interface IAuthContext {
  user: IUser | undefined,
  updateUser: (user: IUser | undefined) => void,
  getAccess: () => boolean
  getToken: () => string | undefined
}