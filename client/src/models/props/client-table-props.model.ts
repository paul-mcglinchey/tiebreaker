import { IClient, ISortable, IClientGroup } from "..";

export interface IClientTableProps extends ISortable {
  clients: IClient[],
  totalClients: number,
  clientGroup: IClientGroup,
  headers: Array<{
    name: string, value: string, interactive: boolean
  }>,
  isLoading: boolean
}