import { Dispatch, SetStateAction } from "react"
import { IUser } from "."

export interface IUserContext {
  users: IUser[]
  setUsers: Dispatch<SetStateAction<IUser[]>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  error: any | undefined
  setError: Dispatch<SetStateAction<any | undefined>>
}