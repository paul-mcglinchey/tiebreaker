import { IEmployee } from "./employee.model";

export interface ISchedule {
  employee: IEmployee,
  shifts: {
    date: String,
    startTime: number,
    endTime: number
  }[]
}