import { useContext } from "react"
import { useNavigate } from "react-router"
import { IUser } from "../models"
import { AuthContext } from "../contexts"
import { endpoints } from '../config'
import { useRequestBuilder, useAsyncHandler, useResolutionService } from '.'

const useAuth = () => {
  const auth = useContext(AuthContext)
  const { updateUser, setIsLoading } = auth
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()
  const navigate = useNavigate()

  const login = asyncHandler(async (user: IUser) => {
    setIsLoading(true)

    const res = await fetch(endpoints.login, requestBuilder('POST', undefined, user))
    const json = await res.json()
    
    setIsLoading(false)

    handleResolution(res, json, undefined, undefined, [() => updateUser(json), () => navigate('/dashboard', { replace: true })], undefined, false)
  })

  const signup = asyncHandler(async (user: IUser) => {
    setIsLoading(true)

    const res = await fetch(endpoints.signup, requestBuilder('POST', undefined, user))
    const json = await res.json()

    setIsLoading(false)

    handleResolution(res, json, undefined, undefined, [() => updateUser(json), () => navigate('/dashboard', { replace: true })], undefined, false)
  })

  const logout = () => {
    updateUser(undefined)
  }

  return { ...auth, signup, login, logout }
}

export default useAuth;