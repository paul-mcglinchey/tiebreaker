import { IStatus, IStatusContext, Status } from "../models";
import { IStatusService } from "./interfaces/status.service.interface";

export class StatusService implements IStatusService {
  statusContext: IStatusContext;
  status: IStatus[];
  setStatus: (status: IStatus[]) => void;

  constructor(statusContext: IStatusContext) {
    this.statusContext = statusContext;
    this.status = this.statusContext.status;
    this.setStatus = this.statusContext.setStatus;
  }

  appendStatus = (isLoading: boolean, message: string, type: Status) => {
    this.setStatus([...this.status, {
      isLoading: isLoading,
      message: message,
      type: type
    }])
  }

  setLoading = (loading: boolean = true) => {
    console.log(this.statusContext);
    this.setStatus([...this.status, {
      isLoading: loading,
      message: '',
      type: Status.None
    }])
  }
}