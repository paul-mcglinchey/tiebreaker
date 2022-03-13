import { IAuthorization, ITenant } from ".";

export interface IUser {
  authorization: IAuthorization;
  createdAt: string,
  data: Object,
  email: string,
  image: string,
  isConfirmed: boolean,
  lastActiveAt: string,
  locked: boolean,
  mode: string,
  name: string,
  tenant: ITenant,
  tenantId: string,
  updatedAt: string,
  userId: number,
  userUuid: string,
  username: string,
  uuid: string
}