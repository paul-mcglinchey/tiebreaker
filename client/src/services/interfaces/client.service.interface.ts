import { IClient, ISession } from "../../models";

export interface IClientService {
  addClient: (values: IClient, groupId: string) => void,
  updateClient: (values: IClient, _id: string) => void,
  deleteClient: (_id: string, groupId: string) => void,
  addSession: (clientId: string, session: ISession) => void,
  refresh?: () => void
} 