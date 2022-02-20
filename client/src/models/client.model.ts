import { IActivityLog, IAddress, IContactInfo, IName, ISession } from ".";

export interface IClient {
  _id: string,
  clientName: IName,
  address: IAddress,
  birthdate: Date,
  contactInfo: IContactInfo,
  sessions: ISession[],
  createdAt: Date,
  updatedAt: Date,
  createdBy?: string,
  updatedBy?: string,
  clientColour?: string,
  activityLog?: IActivityLog[],
  fullName: string,
}