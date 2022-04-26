import { useContext } from "react"
import { IUser, IUserService } from "../models"
import { UserContext } from "../utilities"

const useUserService = (): IUserService => {
  const { getUsers, getCount, isLoading, error } = useContext(UserContext)

  const getUser = (userId: string | undefined): IUser | undefined => {
    return getUsers() && getUsers().filter((user: IUser) => user._id === userId)[0]
  }

  return { getUsers, getCount, isLoading, error, getUser }
}

export default useUserService