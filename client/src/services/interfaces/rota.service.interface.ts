import { IRota, IRotaGroup } from "../../models";

export interface IRotaService {
  addRota: (values: IRota, rotaGroup: IRotaGroup) => void,
  deleteRota: (r: IRota) => void,
  getWeek: (weekModifier: number) => { firstDay: Date, lastDay: Date },
  addSchedule: (r: IRota, startDate: Date) => void
}