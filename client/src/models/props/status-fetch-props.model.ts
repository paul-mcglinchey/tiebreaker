import { IFetchStatus } from "../status-fetch.model";

export interface IFetchStatusProps {
  status: IFetchStatus,
  setStatus: (status: IFetchStatus) => void
}