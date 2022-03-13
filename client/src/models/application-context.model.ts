import { IStatus, IUserGroup } from ".";
import { Application } from "./types";

export interface IApplicationContext {
  userGroup: IUserGroup,
  setUserGroup: ((userGroup: IUserGroup) => void),
  status: IStatus[],
  setStatus: ((status: IStatus[]) => void),
  currentApplication: Application | undefined
}