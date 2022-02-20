import { IStatus } from ".";

export interface IFetchStatus extends IStatus {
  isFetchLoading: boolean
}