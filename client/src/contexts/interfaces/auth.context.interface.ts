import { Dispatch, SetStateAction } from "react"
import { IUser } from "../../models"

export interface IAuthContext {
  user: IUser | undefined
  setUser: Dispatch<SetStateAction<IUser | undefined>>
  getAccess: () => boolean
  getToken: () => string | undefined
  getCookie: () => IUser | undefined
  isAdmin: () => boolean
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}