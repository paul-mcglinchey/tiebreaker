import { useContext } from "react"
import { IUser, IUserService } from "../models"
import { UserContext } from "../contexts"

const useUserService = (): IUserService => {
  const userContext = useContext(UserContext)
  const { users } = userContext

  const getUser = (userId: string | undefined): IUser | undefined => {
    return users.find((user: IUser) => user._id === userId)
  }

  return { ...userContext, getUser }
}

export default useUserService