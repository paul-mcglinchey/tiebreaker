import { useState } from "react";
import { useParams } from "react-router";
import { AddEmployeeModal, EmployeeList } from "../..";
import { useEmployeeService, useGroupService } from "../../../hooks";
import { FetchError, SpinnerIcon, GroupToolbar } from "../../Common";
import { AddGroupModal, GroupPrompter } from "../../Groups";

const Employees = () => {
  const { isAddEmployeeOpen } = useParams();

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const [addEmployeeOpen, setAddEmployeeOpen] = useState(isAddEmployeeOpen ? true : false);
  const toggleAddEmployeeOpen = () => setAddEmployeeOpen(!addEmployeeOpen);

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
            <GroupToolbar title="Employees" addEmployeeAction={() => toggleAddEmployeeOpen()} showSelector />
            <EmployeeList toggleAddEmployeeOpen={toggleAddEmployeeOpen} />
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
        <AddGroupModal addGroupOpen={addGroupOpen} toggleAddGroupOpen={toggleAddGroupOpen} />
        <AddEmployeeModal addEmployeeOpen={addEmployeeOpen} toggleAddEmployeeOpen={toggleAddEmployeeOpen} />
      </>
    </>
  )
}

export default Employees;