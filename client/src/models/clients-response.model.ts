import { IClient } from "./client.model";

export interface IClientsResponse {
  totalClients: number,
  clients: IClient[]
}