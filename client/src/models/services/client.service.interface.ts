import { IClient, ISession } from "..";

export interface IClientService {
  addClient:    (
    values: IClient, 
    groupId: string | undefined
  ) => void,
  updateClient: (
    values: IClient, 
    clientId: string | undefined, 
    groupId: string | undefined
  ) => void,
  deleteClient: (
    clientId: string | undefined, 
    groupId: string | undefined
  ) => void,
  addSession:   (
    values: ISession, 
    clientId: string | undefined, 
    groupId: string | undefined
  ) => void
}