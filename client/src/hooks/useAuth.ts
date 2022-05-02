import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { IUser } from "../models"
import { AuthContext } from "../contexts"
import { endpoints } from '../config'
import { useRequestBuilder, useAsyncHandler, useResolutionService } from '.'

const useAuth = (shouldAuthenticate: boolean = false) => {
  const auth = useContext(AuthContext)
  const { updateUser } = auth
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const authenticate = asyncHandler(async () => {
    setIsLoading(true)

    const res = await fetch(endpoints.authenticate, requestBuilder())
    const json: IUser | undefined = await res.json()

    setIsLoading(false)

    res.ok && json !== undefined ? updateUser(json) : updateUser(undefined)
  })

  useEffect(() => {
    shouldAuthenticate && authenticate()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAuthenticate])

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

  return { ...auth, signup, login, logout, isLoading }
}

export default useAuth;