import { IStatus } from ".."

export interface IStatusContext {
  status: IStatus[],
  setStatus: (status: IStatus[]) => void,
  progress: number,
  setProgress: (progress: number) => void
}