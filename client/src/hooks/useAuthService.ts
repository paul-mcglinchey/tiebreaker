import { useContext } from "react"
import { useNavigate } from "react-router"
import { IPreferences, IUserRequest } from "../models"
import { AuthContext } from "../contexts"
import { endpoints } from '../config'
import { useRequestBuilder, useAsyncHandler, useResolutionService, useGroupService } from '.'
import { Permission } from "../enums"
import { IAuthService } from "./interfaces"

const useAuthService = (): IAuthService => {
  const auth = useContext(AuthContext)
  const { user, setUser } = auth
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()
  const { currentGroup } = useGroupService()
  const navigate = useNavigate()

  const login = asyncHandler(async (user: IUserRequest) => {
    const res = await fetch(endpoints.login, requestBuilder('POST', undefined, user))
    const json = await res.json()

    handleResolution(res, json, undefined, undefined, [() => setUser(json), () => navigate('/dashboard', { replace: true })], undefined, false)
  })

  const signup = asyncHandler(async (user: IUserRequest) => {
    const res = await fetch(endpoints.signup, requestBuilder('POST', undefined, user))
    const json = await res.json()

    handleResolution(res, json, undefined, undefined, [() => setUser(json), () => navigate('/dashboard', { replace: true })], undefined, false)
  })

  const logout = () => {
    setUser(undefined)
  }

  const hasPermission = (applicationIdentifier: number, permission: Permission): boolean => {
    if (!currentGroup?.applications?.includes(applicationIdentifier)) return false

    return currentGroup?.users.find(u => u.user === user?.id)?.applications.find(a => a.application === applicationIdentifier)?.permissions.includes(permission) ? true : false
  }

  const updatePreferences = asyncHandler(async (values: IPreferences) => {
    if (!user?.id) throw new Error()
    
    const res = await fetch(endpoints.user(user.id), requestBuilder('PUT', undefined, { preferences: values }))
    const json = await res.json()

    handleResolution(res, json, 'update', 'preferences', [() => setUser({ ...user, preferences: values })])
  })

  return { ...auth, signup, login, logout, hasPermission, updatePreferences }
}

export default useAuthService;