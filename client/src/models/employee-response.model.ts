import { IEmployee } from "./employee.model";

export interface IEmployeeResponse {
  employee: IEmployee
}

export interface IEmployeesResponse {
  count: number,
  employees: IEmployee[]
}