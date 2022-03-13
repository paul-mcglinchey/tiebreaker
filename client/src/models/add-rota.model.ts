import { IEmployee } from "./employee.model";

export interface IAddRota {
  startDate: string,
  endDate: string,
  employees: IEmployee[]
}