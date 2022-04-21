import { useContext } from "react"
import { Status } from "../models";
import { StatusContext } from "../utilities"
import { v4 as uuidv4 } from 'uuid';

const useStatus = () => {
  const { status, addStatus, removeStatus, setLoading } = useContext(StatusContext);

  const appendStatus = (isLoading: boolean, message: string, type: Status): void => {
    addStatus({
      _id: uuidv4(),
      isLoading: isLoading,
      message: message,
      type: type
    })
  }

  const updateIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  }

  return { status, addStatus, removeStatus, appendStatus, updateIsLoading }
}

export default useStatus;