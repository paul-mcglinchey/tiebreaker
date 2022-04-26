import { IAudit } from "./audit.model";
import { IEmployee } from "./employee.model";
import { ISchedule } from "./schedule.model";
import { DayOfWeek } from "./types";

export interface IRota {
  _id?: string,
  name?: string,
  description?: string,
  closingHour?: number,
  startDay?: DayOfWeek,
  schedules?: ISchedule[],
  employeeIds?: string[],
  employees?: IEmployee[],
  locked?: boolean,
  audit?: IAudit,
  createdAt?: string,
  updatedAt?: string,
  colour?: string
}

export interface IRotaResponse {
  rota: IRota
}
export interface IRotasResponse {
  count: number,
  rotas: IRota[]
}