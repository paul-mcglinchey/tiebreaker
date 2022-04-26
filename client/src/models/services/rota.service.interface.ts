import { IRota, ISchedule } from "..";

export interface IRotaService {
  addRota       : (
    values: IRota, 
    groupId: string | undefined
  ) => void,
  updateRota    : (
    values: IRota, 
    rotaId: string | undefined, 
    groupId: string | undefined
  ) => void,
  deleteRota    : (
    rotaId: string | undefined, 
    groupId: string | undefined
  ) => void,
  getWeek       : (
    weekModifier: number
  ) => { firstDay: Date, lastDay: Date },
  updateSchedule: (
    values: ISchedule, 
    rotaId: string | undefined, 
    groupId: string | undefined
  ) => void,
  refresh: () => void
  dependency: boolean
}