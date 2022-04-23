import { IActivityLog, ISession } from ".";
import { IHasAddress, IHasContactInfo, IHasName } from "./base";

export interface IClient extends IHasName, IHasAddress, IHasContactInfo {
  _id?: string,
  accessControl?: {
    viewers: string[],
    editors: string[],
    owners: string[],
  },
  birthdate?: string,
  sessions?: ISession[],
  createdAt?: Date,
  updatedAt?: Date,
  createdBy?: string,
  updatedBy?: string,
  colour?: string,
  activityLog?: IActivityLog[],
  fullName?: string,
  groupId?: string
}