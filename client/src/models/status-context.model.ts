import { IStatus } from "./status.model";

export interface IStatusContext {
  status: IStatus[]
  setStatus: (status: IStatus[]) => void
}