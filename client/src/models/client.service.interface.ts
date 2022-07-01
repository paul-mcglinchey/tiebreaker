import { IClient, ISession, IClientContext } from ".";

export interface IClientService extends IClientContext {
  getClient: (clientId: string | undefined) => IClient | undefined
  addClient: (values: IClient) => void
  updateClient: (clientId: string | undefined, values: IClient) => void
  deleteClient: (clientId: string | undefined) => void
  addSession: (clientId: string | undefined, values: ISession) => void
}