import { IRotaGroup } from "./rota-group.model";

export interface IRotaGroupsResponse {
  count: number,
  rotaGroups: IRotaGroup[]
}