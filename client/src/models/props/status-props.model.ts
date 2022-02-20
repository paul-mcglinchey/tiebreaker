import { IStatus } from "..";

export interface IStatusProps {
  status: IStatus,
  setStatus: (status: IStatus) => void
}