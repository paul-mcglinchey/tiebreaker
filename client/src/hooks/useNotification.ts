import { useContext } from "react"
import { NotificationContext } from "../utilities"

const useNotification = () => {
  return useContext(NotificationContext);
}

export default useNotification;