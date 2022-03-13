import { IClient } from "..";

export interface IClientsListResponse {
  totalClients: number,
  clients: Array<IClient>
}

export interface IClientResponse {
  client: IClient
}