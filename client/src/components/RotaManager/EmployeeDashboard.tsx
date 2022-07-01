import { useState } from "react";
import { useParams } from "react-router";
import { FetchError, SpinnerIcon, Toolbar } from "../Common";
import { useEmployeeService, useGroupService } from "../../hooks";
import { GroupModal, GroupPrompter } from "../Groups";
import { EmployeeModal, EmployeeList } from ".";

const EmployeeDashboard = () => {
  const { isAddEmployeeOpen } = useParams();

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(isAddEmployeeOpen ? true : false);

  const { count, isLoading, error } = useGroupService();
  const { refresh } = useEmployeeService();

  return (
    <>
      {isLoading ? (
        <div>
          <SpinnerIcon className="text-white h-12 w-12" />
        </div>
      ) : (
        count > 0 ? (
          <>
            <Toolbar title="Employees" addEmployeeAction={() => setAddEmployeeOpen(true)} />
            <EmployeeList setAddEmployeesOpen={setAddEmployeeOpen} />
          </>
        ) : (
          error ? (
            <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
          ) : (
            <GroupPrompter action={() => setAddGroupOpen(true)} />
          )
        )
      )}
      <>
        <GroupModal isOpen={addGroupOpen} close={() => setAddGroupOpen(false)} />
        <EmployeeModal isOpen={addEmployeeOpen} close={() => setAddEmployeeOpen(false)} />
      </>
    </>
  )
}

export default EmployeeDashboard;