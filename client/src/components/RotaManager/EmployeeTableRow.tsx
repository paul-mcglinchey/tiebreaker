import { useState } from "react"
import { useEmployeeService } from "../../hooks"
import { IEmployee } from "../../models"
import { InlineButton, Dialog, TableRow, TableRowItem } from "../Common"

interface IEmployeeTableRowProps {
  employee: IEmployee
}

const EmployeeTableRow = ({ employee }: IEmployeeTableRowProps) => {

  const { deleteEmployee } = useEmployeeService()

  const [deleteEmployeeOpen, setDeleteEmployeeOpen] = useState(false)

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
            <InlineButton action={() => setDeleteEmployeeOpen(true)} color="text-red-500">
              <div>Delete</div>
            </InlineButton>
            <Dialog 
              isOpen={deleteEmployeeOpen} 
              close={() => setDeleteEmployeeOpen(false)} 
              positiveActions={[() => deleteEmployee(employee._id), () => setDeleteEmployeeOpen(false)]}
              title="Delete employee"
              description="This action will delete the employee from the current group"
              content="If you choose to continue you'll no longer have access to this employee in future schedules - this won't affect schedules created in the past."
            />
          </div>
        </TableRowItem>
      </TableRow>
    </>
  )
}

export default EmployeeTableRow;