import { useContext } from "react"
import { useNotification } from "."
import { LoadingContext } from "../contexts"
import { Notification } from "../enums"
import { IAsyncHandler } from "./interfaces"

const useAsyncHandler = (): IAsyncHandler => {
  const { setIsLoading } = useContext(LoadingContext)
  const { addNotification } = useNotification()
  
  const asyncHandler = (fn: (...args: any[]) => any, failureActions: (() => void)[] = [], notify: boolean = true) => async (...args: any) => {
    setIsLoading(true)

    try {
      await fn(...args)
    } catch (err) {
      console.error(err)
      failureActions.forEach(fa => fa())
      notify && addNotification('Something went wrong...', Notification.Error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const asyncReturnHandler = <T>(fn: (...args: any[]) => any) => async (...args: any): Promise<T | void> => {
    try {
      return await fn(...args)
    } catch (err) {
      console.error(err)
      return addNotification('Something went wrong...', Notification.Error)
    }
  }
  
  return { asyncHandler, asyncReturnHandler }
}

export default useAsyncHandler