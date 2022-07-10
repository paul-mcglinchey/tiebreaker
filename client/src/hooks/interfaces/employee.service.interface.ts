import { IEmployeeContext } from "../../contexts/interfaces"
import { IEmployee } from "../../models"

export interface IEmployeeService extends IEmployeeContext {
  getEmployee: (employeeId: string | undefined) => IEmployee | undefined
  addEmployee: (values: IEmployee) => void
  updateEmployee: (employeeId: string | undefined, values: IEmployee) => void
  deleteEmployee: (employeeId: string | undefined) => void
}