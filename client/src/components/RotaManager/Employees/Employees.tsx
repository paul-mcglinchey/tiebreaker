import { useState } from "react";
import { useParams } from "react-router";
import { AddEmployeeModal, EmployeeList } from "../..";
import { useEmployeeService, useGroupService, useRefresh } from "../../../hooks";
import { FetchError, SpinnerIcon, GroupToolbar } from "../../Common";
import { AddGroupModal, GroupPrompter } from "../../Groups";

const Employees = () => {

  const { isAddEmployeeOpen } = useParams();

  const { dependency, refresh } = useRefresh();

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const [addEmployeeOpen, setAddEmployeeOpen] = useState(isAddEmployeeOpen ? true : false);
  const toggleAddEmployeeOpen = () => setAddEmployeeOpen(!addEmployeeOpen);

  const { getCount, isLoading, error, addGroup } = useGroupService();
  const employeeService = useEmployeeService(refresh);

  return (
    <>
      {isLoading ? (
        <div>
          <SpinnerIcon className="text-white h-12 w-12" />
        </div>
      ) : (
        getCount() > 0 ? (
          <>
            <GroupToolbar title="Employees" addEmployeeAction={() => toggleAddEmployeeOpen()} showSelector />
            <EmployeeList dependency={dependency} employeeService={employeeService} toggleAddEmployeeOpen={toggleAddEmployeeOpen} />
          </>
        ) : (
          error ? (
            <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
          ) : (
            <GroupPrompter action={toggleAddGroupOpen} />
          )
        )
      )}
      <>
        <AddGroupModal addGroupOpen={addGroupOpen} toggleAddGroupOpen={toggleAddGroupOpen} addGroup={addGroup} />
        <AddEmployeeModal addEmployeeOpen={addEmployeeOpen} toggleAddEmployeeOpen={toggleAddEmployeeOpen} employeeService={employeeService} />
      </>
    </>
  )
}

export default Employees;