import { IClient } from "./client.model";

export interface IClientsResponse {
  count: number,
  clients: IClient[]
}