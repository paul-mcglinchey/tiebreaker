import { IRota, IRotaGroup } from "../../models";

export interface IRotaService {
  addRota: (values: IRota, rotaGroup: IRotaGroup) => void,
  deleteRota: (r: IRota) => void
}