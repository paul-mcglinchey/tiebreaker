import { IEmployee } from "./employee.model";

export interface IAddRota {
  startDate: string,
  employees: IEmployee[]
}