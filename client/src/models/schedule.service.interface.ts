import { ISchedule, IScheduleContext, IRota } from ".";

export interface IScheduleService extends IScheduleContext {
  getSchedule: (startDate: Date, rota: IRota, week: Date[]) => ISchedule
  createSchedule: (values: ISchedule, rotaId: string | undefined) => Promise<ISchedule | void>
  updateSchedule: (values: ISchedule, rotaId: string | undefined, scheduleId: string | undefined) => Promise<ISchedule | void>
  getWeek: (weekModifier: number) => { firstDay: Date, lastDay: Date, week: Date[] }
}