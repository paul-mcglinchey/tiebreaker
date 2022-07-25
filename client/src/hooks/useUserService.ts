import { useContext } from "react"
import { IGroup, IUser } from "../models"
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
    return users.find((user: IUser) => user.id === userId)
  }

  const updateUser = asyncHandler(async (userId: string | undefined, values: IUser) => {
    if (!userId) throw new Error()

    const res = await fetch(endpoints.user(userId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'update', 'user', [() => updateUserInContext(userId, values)])
  })

  const updateUserInContext = (userId: string, values: IUser) => {
    setUsers(users => users.map(u => {
      return u.id === userId ? { ...u, ...values } : u
    }))
  }

  const userHasApplication = (group: IGroup, userId: string | undefined, applicationId: number | undefined): boolean => {
    if (!userId || !applicationId) return false

    return !!group.groupUsers.find(gu => gu.userId === userId)?.applications.map(a => a.applicationId).includes(applicationId)
  }

  const userHasPermission = (group: IGroup, userId: string | undefined, applicationId: number | undefined, permissionId: number | undefined): boolean => {
    if (!userId || !permissionId) return false

    return applicationId
      ? !!getApplicationPermissions(group, userId, applicationId).includes(permissionId)
      : !!getGroupPermissions(group, userId).includes(permissionId)
  }

  const getGroupPermissions = (group: IGroup, userId: string): number[] => {
    const permissions: number[] = []
    group.groupUsers
      .find(gu => gu.userId === userId)?.roles
      .forEach(r => r.permissions
        .forEach(p => !permissions.includes(p.id) && permissions.push(p.id)))

    return permissions
  }

  const getApplicationPermissions = (group: IGroup, userId: string, applicationId: number): number[] => {
    const permissions: number[] = []
    group.groupUsers
      .find(gu => gu.userId === userId)?.applications
      .find(ga => ga.applicationId === applicationId)?.roles
      .forEach(r => r.permissions
        .forEach(p => !permissions.includes(p.id) && permissions.push(p.id)))

    return permissions
  }

  return { ...userContext, getUser, updateUser, userHasApplication, userHasPermission }
}

export default useUserService