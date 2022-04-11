import { IEmployee } from "./employee.model";

export interface IScheduleShift {
  date: Date,
  startHour: string,
  endHour: string,
  notes: string
}
export interface IEmployeeSchedule {
  employee: IEmployee,
  shifts: IScheduleShift[]
}

export interface ISchedule {
  accessControl?: {
    viewers: string[],
    editors: string[],
    owners: string[],
  },
  startDate?: Date,
  locked?: boolean,
  employeeSchedules: IEmployeeSchedule[]
}

export interface IScheduleResponse {
  schedule: ISchedule
}