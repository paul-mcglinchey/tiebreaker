import { IUserGroup } from ".";
import { IStatus } from "./status.model";

export interface IApplicationContext {
  userGroup: IUserGroup | null,
  setUserGroup: ((userGroup: IUserGroup) => void) | null,
  status: IStatus | null,
  setStatus: ((status: IStatus) => void) | null
}