import { IActivityLog, ISession, IAudit } from ".";
import { IHasAddress, IHasContactInfo, IHasName } from "./base";

export interface IClient extends IHasName, IHasAddress, IHasContactInfo {
  _id?: string,
  birthdate?: string,
  sessions?: ISession[],
  createdAt?: Date,
  updatedAt?: Date,
  audit?: IAudit
  colour?: string,
  activityLog?: IActivityLog[],
  fullName?: string,
}

export interface IClientsResponse {
  count: number,
  clients: IClient[]
}