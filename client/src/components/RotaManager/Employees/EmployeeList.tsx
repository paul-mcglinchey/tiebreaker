import { UserIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useEmployeeService } from "../../../hooks";
import { IEmployee } from "../../../models";
import { Prompter, Table } from "../../Common";
import { EmployeeTableRow } from "./EmployeeTable";

const headers = [
  { name: "Employee name", value: "name", interactive: true },
  { name: "Options", value: "", interactive: false },
]

interface IEmployeeListProps {
  toggleAddEmployeeOpen: () => void
}

const EmployeeList = ({ toggleAddEmployeeOpen }: IEmployeeListProps) => {

  const { getEmployees, isLoading, sortField, updateSortField, sortDirection, updateSortDirection } = useEmployeeService()
  const employees = getEmployees()

  useEffect(() => {
    updateSortField(headers[1]!.value)
  }, [updateSortField])

  return (
    <>
      <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
        {employees.length > 0 ? (
          <div className="flex flex-col flex-grow space-y-4">
            <Table
              sortField={sortField}
              setSortField={updateSortField}
              sortDirection={sortDirection}
              setSortDirection={updateSortDirection}
              headers={headers}
              isLoading={isLoading}
            >
              <>
                {employees.map((employee: IEmployee, index: number) => (
                  <EmployeeTableRow employee={employee} key={index} />
                ))}
              </>
            </Table>
          </div>
        ) : (
          <Prompter
            title="Add your employees here"
            Icon={UserIcon}
            action={toggleAddEmployeeOpen}
          />
        )}
      </div>
    </>
  )
}

export default EmployeeList;