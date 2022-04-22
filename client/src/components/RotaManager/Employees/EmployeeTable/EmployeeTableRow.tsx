import { useContext, useState } from "react"
import { IEmployee, IEmployeeService } from "../../../../models"
import { ApplicationContext } from "../../../../utilities"
import { DeleteDialog, InlineButton, TableRow, TableRowItem } from "../../../Common"

interface IEmployeeTableRowProps {
  employee: IEmployee
  employeeService: IEmployeeService
}

const EmployeeTableRow = ({ employee, employeeService }: IEmployeeTableRowProps) => {

  const { groupId } = useContext(ApplicationContext);

  const [deleteEmployeeOpen, setDeleteEmployeeOpen] = useState(false)
  const toggleDeleteEmployeeOpen = () => setDeleteEmployeeOpen(!deleteEmployeeOpen)

  return (
    <>
      <TableRow>
        <TableRowItem>
          <div className="flex flex-col">
            <div>{employee.fullName}</div>
            <div>{employee.contactInfo.primaryEmail}</div>
          </div>
        </TableRowItem>
        <TableRowItem>
          <div className="flex flex-grow justify-end">
            <InlineButton action={() => toggleDeleteEmployeeOpen()} color="text-red-500">
              <div>Delete</div>
            </InlineButton>
            <DeleteDialog
              dialogOpen={deleteEmployeeOpen}
              toggleDialogOpen={toggleDeleteEmployeeOpen}
              itemType="employee"
              deleteAction={() => employeeService.deleteEmployee(employee._id, groupId)}
            />
          </div>
        </TableRowItem>
      </TableRow>
    </>
  )
}

export default EmployeeTableRow;