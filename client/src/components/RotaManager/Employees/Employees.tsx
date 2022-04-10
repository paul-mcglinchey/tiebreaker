import { useContext, useState } from "react";
import { AddEmployeeModal } from "../..";
import { useFetch, useRefresh, useStatus } from "../../../hooks";
import { GroupType, IFetch, IGroupsResponse, IRotaGroup } from "../../../models";
import { requestBuilder, RotaGroupService } from "../../../services";
import { ApplicationContext, endpoints } from "../../../utilities";
import { Fetch, FetchError } from "../../Common";
import { AddGroupModal, GroupPrompter } from "../../Groups";
import { GroupToolbar } from "../../Toolbar";

const Employees = () => {

  const { dependency, refresh } = useRefresh();
  const { setRotaGroup } = useContext(ApplicationContext);

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const toggleAddEmployeeOpen = () => setAddEmployeeOpen(!addEmployeeOpen);

  const { statusService } = useStatus();
  const groupService = new RotaGroupService(statusService);

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups(GroupType.ROTA).groups, requestBuilder(), [dependency])}
      render={({ response, error, isLoading }: IFetch<IGroupsResponse<IRotaGroup>>) => (
        <>
          {!error ? (
            response && response.count > 0 ? (
              <>
                <GroupToolbar title="Employees" addEmployeeAction={() => toggleAddEmployeeOpen()} groupType={GroupType.ROTA} showSelector setGroup={setRotaGroup} />
              </>
            ) : (
              !isLoading && (
                <GroupPrompter action={toggleAddGroupOpen} />
              )
            )
          ) : (
            <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
          )}
          <AddGroupModal addGroupOpen={addGroupOpen} toggleAddGroupOpen={toggleAddGroupOpen} groupService={groupService} />
          <AddEmployeeModal modalOpen={addEmployeeOpen} toggleModalOpen={toggleAddEmployeeOpen} />
        </>
      )}
    />
  )
}

export default Employees;