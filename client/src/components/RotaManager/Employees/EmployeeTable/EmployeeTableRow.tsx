import { IEmployee } from "../../../../models"
import { IEmployeeService } from "../../../../services"
import { InlineButton, TableRow, TableRowItem } from "../../../Common"

interface IEmployeeTableRowProps {
  employee: IEmployee
  employeeService: IEmployeeService
}

const EmployeeTableRow = ({ employee, employeeService }: IEmployeeTableRowProps) => {
  return (
    <TableRow>
      <TableRowItem>
        <div className="flex flex-col">
          <div>{employee.fullName}</div>
          <div>{employee.contactInfo.primaryEmail}</div>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex flex-grow justify-end">
          <InlineButton action={() => employeeService.deleteEmployee(employee._id)} color="text-red-500">
            <div>Delete employee</div>
          </InlineButton>
        </div>
      </TableRowItem>
    </TableRow>
  )
}

export default EmployeeTableRow;