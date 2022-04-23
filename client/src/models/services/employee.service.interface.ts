import { IEmployee } from "..";

export interface IEmployeeService {
  addEmployee: (values: IEmployee, groupId: string) => void
  deleteEmployee: (employeeId: string | undefined, groupId: string | undefined) => void
}

export interface IUseEmployeeService extends IEmployeeService {
  employeeService: IEmployeeService
}