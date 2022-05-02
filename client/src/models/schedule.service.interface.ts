import { ISchedule, IScheduleContext, IRota } from ".";

export interface IScheduleService extends IScheduleContext {
  getSchedule: (startDate: Date, rota: IRota) => ISchedule
  createSchedule: (values: ISchedule, rotaId: string | undefined) => void
  updateSchedule: (values: ISchedule, rotaId: string | undefined, scheduleId: string | undefined) => void
  getWeek: (weekModifier: number) => { firstDay: Date, lastDay: Date }
}