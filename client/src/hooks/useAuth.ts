import { useContext, useEffect, useState } from "react"
import { IUser, Notification } from "../models"
import { AuthContext, endpoints } from "../utilities"
import useIsMounted from "./useIsMounted"
import useRequestBuilder from "./useRequestBuilder"
import useNotification from "./useNotification"

const useAuth = (shouldAuthenticate: boolean = false) => {
  const auth = useContext(AuthContext)
  const { updateUser } = auth
  const { requestBuilder } = useRequestBuilder()
  const { addNotification } = useNotification()
  const isMounted = useIsMounted()

  const [isLoading, setIsLoading] = useState(false)

  const authenticate = async () => {
    const res = await fetch(endpoints.authenticate, requestBuilder())

    !res.ok && isMounted() && updateUser(undefined)
  }

  useEffect(() => {
    shouldAuthenticate && authenticate()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAuthenticate])

  const login = async (user: IUser) => {
    setIsLoading(true)

    const res = await fetch(endpoints.login, requestBuilder('POST', undefined, user))
    const json = await res.json()

    if (!res.ok) {
      const message = res.status < 500 && json.message ? json.message : 'Something went wrong...'
      addNotification(message, Notification.Error)
    } else {
      updateUser(json)
    }

    setIsLoading(false)
  }

  const signup = async (user: IUser) => {
    setIsLoading(true)

    const res = await fetch(endpoints.signup, requestBuilder('POST', undefined, user))
    const json = await res.json()

    if (!res.ok) {
      const message = res.status < 500 && json.message ? json.message : 'Something went wrong...'
      addNotification(message, Notification.Error)
    } else {
      updateUser(json)
    }

    setIsLoading(false)
  }

  const logout = () => {
    updateUser(undefined)
  }

  return { ...auth, signup, login, logout, isLoading }
}

export default useAuth;