import { IRota, ISchedule } from "../../models";

export interface IRotaService {
  addRota: (values: IRota, groupId: string) => void,
  updateRota: (values: IRota, rota: IRota | undefined) => void,
  deleteRota: (r: IRota, groupId: string | undefined) => void,
  getWeek: (weekModifier: number) => { firstDay: Date, lastDay: Date },
  updateSchedule: (r: IRota, s: ISchedule) => void,
}