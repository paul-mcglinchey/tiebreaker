import { UserIcon } from "@heroicons/react/solid";
import { useContext, useState } from "react";
import { useFetch, useStatus } from "../../../hooks";
import { IEmployeesResponse, IFetch } from "../../../models";
import { EmployeeService, requestBuilder } from "../../../services";
import { ApplicationContext, endpoints } from "../../../utilities";
import { Fetch, Modal, Prompter, Table } from "../../Common";
import { CompactEmployeeForm } from "./Forms";

const headers = [
  { name: "Employee name", value: "name", interactive: true },
  { name: "Options", value: "", interactive: false },
]

const EmployeeList = () => {

  const { groupId } = useContext(ApplicationContext);

  const [sortField, setSortField] = useState(headers[1]!.value);
  const [sortDirection, setSortDirection] = useState("descending");

  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const toggleAddEmployeeOpen = () => setAddEmployeeOpen(!addEmployeeOpen);

  const { statusService } = useStatus();
  const employeeService = new EmployeeService(statusService);

  return (
    <>
      <Fetch
        fetchOutput={useFetch(endpoints.rotas(groupId), requestBuilder(), [sortField, sortDirection])}
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
                  <div></div>
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
      <Modal title="Add employee" modalOpen={addEmployeeOpen} toggleModalOpen={toggleAddEmployeeOpen}>
        <CompactEmployeeForm employeeService={employeeService} />
      </Modal>
    </>
  )
}

export default EmployeeList;