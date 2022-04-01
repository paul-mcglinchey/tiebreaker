import { IEmployee } from "./employee.model";
import { ISchedule } from "./schedule.model";
import { DayOfWeek } from "./types";

export interface IRota {
  _id?: string,
  name?: string,
  description?: string,
  accessControl?: {
    [key: string]: string[],
  },
  startDay?: DayOfWeek,
  schedule?: ISchedule[],
  employeeIds?: string[],
  employees?: IEmployee[],
  locked?: boolean,
  createdBy?: string,
  updatedBy?: string,
  createdAt?: string,
  updatedAt?: string,
  colour?: string
}