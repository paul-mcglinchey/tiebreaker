import { IEmployee } from "../../../../models"
import { InlineButton, TableRow, TableRowItem } from "../../../Common"

interface IEmployeeTableRowProps {
  employee: IEmployee
}

const EmployeeTableRow = ({ employee }: IEmployeeTableRowProps) => {
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
          <InlineButton action={() => { }} color="text-red-500">
            <div>Delete employee</div>
          </InlineButton>
        </div>
      </TableRowItem>
    </TableRow>
  )
}

export default EmployeeTableRow;