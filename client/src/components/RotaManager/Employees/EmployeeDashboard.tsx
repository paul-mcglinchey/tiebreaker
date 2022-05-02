import { useState } from "react";
import { useParams } from "react-router";
import { AddEmployeeModal, EmployeeList } from "../..";
import { useEmployeeService, useGroupService } from "../../../hooks";
import { FetchError, SpinnerIcon, GroupToolbar } from "../../Common";
import { AddGroupModal, GroupPrompter } from "../../Groups";

const EmployeeDashboard = () => {
  const { isAddEmployeeOpen } = useParams();

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(isAddEmployeeOpen ? true : false);

  const { getCount, isLoading, error } = useGroupService();
  const { refresh } = useEmployeeService();

  return (
    <>
      {isLoading ? (
        <div>
          <SpinnerIcon className="text-white h-12 w-12" />
        </div>
      ) : (
        getCount() > 0 ? (
          <>
            <GroupToolbar title="Employees" addEmployeeAction={() => setAddEmployeeOpen(true)} showSelector />
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
        <AddGroupModal isOpen={addGroupOpen} close={() => setAddGroupOpen(false)} />
        <AddEmployeeModal isOpen={addEmployeeOpen} close={() => setAddEmployeeOpen(false)} />
      </>
    </>
  )
}

export default EmployeeDashboard;