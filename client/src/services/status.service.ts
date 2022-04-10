import { IStatus, Status } from "../models";
import { IStatusService } from "./interfaces/status.service.interface";
import { v4 as uuidv4 } from 'uuid';

export class StatusService implements IStatusService {
  addStatus: (status: IStatus) => void;
  setLoading: (isLoading: boolean) => void;

  constructor(addStatus: (status: IStatus) => void, setLoading: (isLoading: boolean) => void) {
    this.addStatus = addStatus;
    this.setLoading = setLoading;
  }

  appendStatus = (isLoading: boolean, message: string, type: Status): void => {
    this.addStatus({
      _id: uuidv4(),
      isLoading: isLoading,
      message: message,
      type: type
    })
  }

  updateIsLoading = (isLoading: boolean) => {
    this.setLoading(isLoading);
  }
}