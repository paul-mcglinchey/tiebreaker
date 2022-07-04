import { useContext } from "react"
import { IUser } from "../models"
import { UserContext } from "../contexts"
import { IUserService } from "./interfaces"
import { useAsyncHandler, useRequestBuilder, useResolutionService } from "."
import { endpoints } from "../config"

const useUserService = (): IUserService => {
  
  const { asyncHandler } = useAsyncHandler()
  const { requestBuilder } = useRequestBuilder()
  const { handleResolution } = useResolutionService()

  const userContext = useContext(UserContext)
  const { users, setUsers } = userContext

  const getUser = (userId: string | undefined): IUser | undefined => {
    return users.find((user: IUser) => user._id === userId)
  }

  const updateUser = asyncHandler(async (userId: string | undefined, values: IUser) => {
    if (!userId) throw new Error()

    const res = await fetch(endpoints.user(userId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'update', 'user', [() => updateUserInContext(userId, values)])
  })

  const updateUserInContext = (userId: string, values: IUser) => {
    setUsers(users => users.map(u => {
      return u._id === userId ? { ...u, ...values } : u
    }))
  }

  return { ...userContext, getUser, updateUser }
}

export default useUserService