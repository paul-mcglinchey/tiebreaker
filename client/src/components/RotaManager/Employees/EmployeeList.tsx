import { UserIcon } from "@heroicons/react/solid";
import { useContext, useState } from "react";
import { useFetch } from "../../../hooks";
import { IEmployee, IEmployeesResponse, IFetch } from "../../../models";
import { IEmployeeService, requestBuilder } from "../../../services";
import { ApplicationContext, endpoints } from "../../../utilities";
import { Fetch, Prompter, Table } from "../../Common";
import { EmployeeTableRow } from "./EmployeeTable";

const headers = [
  { name: "Employee name", value: "name", interactive: true },
  { name: "Options", value: "", interactive: false },
]

interface IEmployeeListProps {
  dependency: boolean
  employeeService: IEmployeeService
  toggleAddEmployeeOpen: () => void
}

const EmployeeList = ({ dependency, employeeService, toggleAddEmployeeOpen }: IEmployeeListProps) => {

  const { groupId } = useContext(ApplicationContext);

  const [sortField, setSortField] = useState(headers[1]!.value);
  const [sortDirection, setSortDirection] = useState("descending");

  return (
    <>
      <Fetch
        fetchOutput={useFetch(endpoints.employees(groupId), requestBuilder(), [groupId, dependency, sortField, sortDirection], false)}
        render={({ response, isLoading }: IFetch<IEmployeesResponse>) => (
          <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
            {response && response.count > 0 ? (
              <div className="flex flex-col flex-grow space-y-4">
                <Table
                  sortField={sortField}
                  setSortField={setSortField}
                  sortDirection={sortDirection}
                  setSortDirection={setSortDirection}
                  headers={headers}
                  isLoading={isLoading}
                >
                  <>
                    {response.employees.map((employee: IEmployee, index: number) => (
                      <EmployeeTableRow employee={employee} key={index} employeeService={employeeService} />
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
        )}
      />
    </>
  )
}

export default EmployeeList;