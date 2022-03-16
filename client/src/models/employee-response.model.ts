import { IEmployee } from "./employee.model";

export interface IEmployeeResponse {
  count: number,
  employees: IEmployee[]
}