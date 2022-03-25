import { useContext } from "react"
import { StatusService } from "../services";
import { StatusContext } from "../utilities"

const useStatus = () => {
  const { status, setStatus } = useContext(StatusContext);

  const statusService = new StatusService(status, setStatus);

  return { statusService, status, setStatus }
}

export default useStatus;