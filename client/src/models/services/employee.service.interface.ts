import { IEmployee } from "..";

export interface IEmployeeService {
  addEmployee: (values: IEmployee, groupId: string) => void
  deleteEmployee: (employeeId: string | undefined, groupId: string | undefined) => void
}