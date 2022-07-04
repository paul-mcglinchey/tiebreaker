import { useNotification } from "."
import { Notification } from "../enums"
import { IAsyncHandler } from "./interfaces"

const useAsyncHandler = (): IAsyncHandler => {
  const { addNotification } = useNotification()
  
  const asyncHandler = (fn: (...args: any[]) => any, notify: boolean = true) => async (...args: any) => {
    try {
      await fn(...args)
    } catch (err) {
      console.error(err)
      notify && addNotification('Something went wrong...', Notification.Error)
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