import { Status } from "./types/status.type";

export interface IStatus {
  _id: string,
  isLoading: boolean,
  message: string,
  type: Status
};