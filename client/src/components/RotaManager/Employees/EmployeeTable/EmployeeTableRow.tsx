import { useState } from "react"
import { useEmployeeService, useGroupService } from "../../../../hooks"
import { IEmployee } from "../../../../models"
import { DeleteDialog, InlineButton, TableRow, TableRowItem } from "../../../Common"

interface IEmployeeTableRowProps {
  employee: IEmployee
}

const EmployeeTableRow = ({ employee }: IEmployeeTableRowProps) => {

  const { groupId } = useGroupService()
  const { deleteEmployee } = useEmployeeService()

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
              deleteAction={() => deleteEmployee(employee._id, groupId)}
            />
          </div>
        </TableRowItem>
      </TableRow>
    </>
  )
}

export default EmployeeTableRow;