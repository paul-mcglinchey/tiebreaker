import { IClient, ISortable, IUserGroup } from "..";

export interface IClientTableProps extends ISortable {
  clients: IClient[],
  totalClients: number,
  userGroup: IUserGroup,
  headers: Array<{
    name: string, value: string, interactive: boolean
  }>
}