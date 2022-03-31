import { IClient } from "./client.model";
export interface IClientResponse {
  client: IClient
}
export interface IClientsResponse {
  count: number,
  clients: IClient[]
}