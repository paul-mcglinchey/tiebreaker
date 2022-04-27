import { IAudit } from "./audit.model";
import { IRota } from "./rota.model";

export interface IScheduleShift {
  date: Date,
  startHour: string,
  endHour: string,
  notes: string
}
export interface IEmployeeSchedule {
  employeeId: string | undefined,
  shifts: IScheduleShift[]
}

export interface ISchedule {
  _id?: string,
  startDate?: Date,
  locked?: boolean,
  employeeSchedules: IEmployeeSchedule[]
  audit?: IAudit
}

export interface IScheduleResponse {
  rota: IRota
  schedule: ISchedule
}

export interface ISchedulesResponse {
  count: number
  schedules: ISchedule[]
}