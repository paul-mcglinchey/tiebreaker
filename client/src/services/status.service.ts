import { IStatus, Status } from "../models";
import { IStatusService } from "./interfaces/status.service.interface";

export class StatusService implements IStatusService {
  status: IStatus[];
  setStatus: (status: IStatus[]) => void;

  constructor(status: IStatus[], setStatus: (status: IStatus[]) => void) {
    this.status = status;
    this.setStatus = setStatus;
  }

  getStatusFeed = (): IStatus[] => {
    return this.status;
  }

  removeStatus = (statusItemToRemove: IStatus): void => {
    this.status.filter((statusItem: IStatus) => statusItem !== statusItemToRemove);
  }

  appendStatus = (isLoading: boolean, message: string, type: Status): void => {
    this.setStatus([...this.status, {
      isLoading: isLoading,
      message: message,
      type: type
    }])
  }

  setLoading = (loading: boolean = true): void => {
    this.setStatus([...this.status, {
      isLoading: loading,
      message: '',
      type: Status.None
    }])
  }
}