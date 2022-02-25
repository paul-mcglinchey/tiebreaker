import { Status } from "./types/status.type";

export interface IStatus { 
  isLoading: boolean,
  message: string,
  type: Status
};