import { IStatus, Status } from "../../models";

export interface IStatusService {
  getStatusFeed: () => IStatus[],
  removeStatus: (statusItemToRemove: IStatus) => void,
  appendStatus: (isLoading: boolean, message: string, type: Status) => void;
  setLoading: (loading?: boolean | undefined) => void;
}