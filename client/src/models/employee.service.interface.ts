import { IEmployee, IEmployeeContext } from "."

export interface IEmployeeService extends IEmployeeContext {
  getEmployee: (employeeId: string | undefined) => IEmployee | undefined
  addEmployee: (values: IEmployee) => void
  updateEmployee: (employeeId: string, values: IEmployee) => void
  deleteEmployee: (employeeId: string | undefined) => void
  refresh: () => void
}