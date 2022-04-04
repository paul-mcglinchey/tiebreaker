import { IClient } from "../../models";

export interface IClientService {
  addClient: (values: IClient, groupId: string) => void,
  updateClient: (values: IClient, _id: string) => void,
  deleteClient: (_id: string, groupId: string) => void,
  refresh?: () => void
} 