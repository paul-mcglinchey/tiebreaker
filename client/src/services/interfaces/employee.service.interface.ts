import { IEmployee } from "../../models";

export interface IEmployeeService {
  addEmployee: (values: IEmployee, groupId: string) => void
  deleteEmployee: (employeeId: string | undefined, groupId: string | undefined) => void
} 