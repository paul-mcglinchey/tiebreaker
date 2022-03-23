import { IClientGroup } from "..";
import { IRotaGroup } from "..";

export interface IApplicationContext {
  rotaGroup: IRotaGroup,
  setRotaGroup: (group: IRotaGroup) => void,
  clientGroup: IClientGroup,
  setClientGroup: (group: IClientGroup) => void
}