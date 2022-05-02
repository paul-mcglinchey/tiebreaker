import { IClient, ISession, IClientContext } from ".";

export interface IClientService extends IClientContext {
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