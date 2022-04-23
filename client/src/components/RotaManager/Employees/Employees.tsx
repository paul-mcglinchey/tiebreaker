import { useContext, useState } from "react";
import { useParams } from "react-router";
import { AddEmployeeModal, EmployeeList } from "../..";
import { useEmployeeService, useFetch, useGroupService, useRefresh, useRequestBuilder } from "../../../hooks";
import { IFetch, IGroupsResponse } from "../../../models";
import { ApplicationContext, endpoints } from "../../../utilities";
import { Fetch, FetchError, SpinnerIcon, GroupToolbar } from "../../Common";
import { AddGroupModal, GroupPrompter } from "../../Groups";

const Employees = () => {

  const { isAddEmployeeOpen } = useParams();

  const { dependency, refresh } = useRefresh();
  const { setGroupId } = useContext(ApplicationContext);
  const { requestBuilder } = useRequestBuilder();

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const [addEmployeeOpen, setAddEmployeeOpen] = useState(isAddEmployeeOpen ? true : false);
  const toggleAddEmployeeOpen = () => setAddEmployeeOpen(!addEmployeeOpen);

  const groupService = useGroupService(refresh);
  const employeeService = useEmployeeService(refresh);

  return (
    <>
      <Fetch
        fetchOutput={useFetch(endpoints.groups, requestBuilder())}
        render={({ response, error, isLoading }: IFetch<IGroupsResponse>) => (
          isLoading ? (
            <div>
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          ) : (
            response && response.count > 0 ? (
              <>
                <GroupToolbar title="Employees" addEmployeeAction={() => toggleAddEmployeeOpen()} showSelector setGroupId={setGroupId} />
                <EmployeeList dependency={dependency} employeeService={employeeService} toggleAddEmployeeOpen={toggleAddEmployeeOpen} />
              </>
            ) : (
              error ? (
                <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
              ) : (
                <GroupPrompter action={toggleAddGroupOpen} />
              )
            )
          )
        )}
      />
      <>
        <AddGroupModal addGroupOpen={addGroupOpen} toggleAddGroupOpen={toggleAddGroupOpen} groupService={groupService} />
        <AddEmployeeModal addEmployeeOpen={addEmployeeOpen} toggleAddEmployeeOpen={toggleAddEmployeeOpen} employeeService={employeeService} />
      </>
    </>
  )
}

export default Employees;