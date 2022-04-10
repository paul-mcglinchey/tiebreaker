import { useContext } from "react"
import { StatusService } from "../services";
import { StatusContext } from "../utilities"

const useStatus = () => {
  const { status, addStatus, removeStatus, setLoading } = useContext(StatusContext);

  const statusService = new StatusService(addStatus, setLoading);

  return { statusService, status, addStatus, removeStatus }
}

export default useStatus;