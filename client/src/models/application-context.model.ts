import { IStatus, IUserGroup } from ".";

export interface IApplicationContext {
  userGroup: IUserGroup,
  setUserGroup: ((userGroup: IUserGroup) => void),
  status: IStatus,
  setStatus: ((status: IStatus) => void)
}