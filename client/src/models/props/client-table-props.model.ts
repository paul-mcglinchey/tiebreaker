import { IClient, ISortable } from "..";

export interface IClientTableProps extends ISortable {
  clients: IClient[],
  totalClients: number,
  headers: Array<{
    name: string, value: string, interactive: boolean
  }>,
  isLoading: boolean
}