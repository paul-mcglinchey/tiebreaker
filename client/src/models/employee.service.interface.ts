import { IEmployee, IEmployeeContext } from "."

export interface IEmployeeService extends IEmployeeContext {
  getEmployee: (employeeId: string | undefined) => IEmployee | undefined
  addEmployee: (values: IEmployee, groupId: string) => void
  deleteEmployee: (employeeId: string | undefined, groupId: string | undefined) => void
  refresh: () => void
}