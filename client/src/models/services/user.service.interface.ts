import { IUser } from "../user.model";

export interface IUserService {
  getUsers: () => IUser[]
  getCount: () => number
  isLoading: boolean
  error: any | undefined
  getUser: (userId: string | undefined) => IUser | undefined
}