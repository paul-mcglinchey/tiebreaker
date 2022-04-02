import { IEmployee } from "./employee.model";

export interface IScheduleShift {
  date: Date,
  startHour: string,
  endHour: string,
  notes: string
}
export interface IScheduleEmployees {
  employee: IEmployee,
  shifts: IScheduleShift[]
}

export interface ISchedule {
  startDate: string,
  employees: IScheduleEmployees[]
}

export interface IScheduleResponse {
  schedule: ISchedule
}