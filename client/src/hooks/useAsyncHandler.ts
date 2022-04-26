import { useNotification } from "."
import { Notification } from "../models"

const useAsyncHandler = () => {
  const { addNotification } = useNotification()
  
  const asyncHandler = (fn: (...args: any[]) => any) => async (...args: any) => {
    try {
      await fn(...args)
    } catch (err) {
      console.error(err)
      addNotification('Something went wrong...', Notification.Error)
    }
  } 
  
  return { asyncHandler }
}

export default useAsyncHandler