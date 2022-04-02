import { IRota, IRotaGroup, ISchedule } from "../../models";

export interface IRotaService {
  addRota: (values: IRota, rotaGroup: IRotaGroup) => void,
  deleteRota: (r: IRota) => void,
  getWeek: (weekModifier: number) => { firstDay: Date, lastDay: Date },
  updateSchedule: (r: IRota, s: ISchedule) => void,
}