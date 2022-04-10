import { Status } from "../../models";

export interface IStatusService {
  appendStatus: (isLoading: boolean, message: string, type: Status) => void;
  updateIsLoading: (isLoading: boolean) => void;
}