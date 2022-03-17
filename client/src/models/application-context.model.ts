import { IClientGroup } from "./client-group-model";
import { IRotaGroup } from "./rota-group.model";

export interface IApplicationContext {
  rotaGroup: IRotaGroup,
  setRotaGroup: (group: IRotaGroup) => void,
  clientGroup: IClientGroup,
  setClientGroup: (group: IClientGroup) => void
}