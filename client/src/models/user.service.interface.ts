import { IUser, IUserContext } from ".";

export interface IUserService extends IUserContext {
  getUser: (userId: string | undefined) => IUser | undefined
}