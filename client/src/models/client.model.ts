import { IActivityLog, ISession, IAudit, IAddress, IContactInfo, IName } from "."

export interface IClient extends IAddress {
  _id?: string,
  name: IName
  contactInfo: IContactInfo
  birthdate?: string,
  sessions?: ISession[],
  createdAt?: Date,
  updatedAt?: Date,
  audit?: IAudit
  colour?: string,
  activityLog?: IActivityLog[],
  fullName?: string,
  deleted?: boolean
}

export interface IClientsResponse {
  count: number,
  clients: IClient[]
}