import { Fragment, useState } from "react";
import { useFetch, useGroupService, useRefresh, useRequestBuilder } from "../../hooks";
import { GroupType, IFetch, IGroupsResponse, IRotaGroup } from "../../models";
import { endpoints } from "../../utilities";
import { Fetch, SpinnerIcon } from "../Common";
import { GroupToolbar } from "../Toolbar";
import { DataPoint, GroupCard, AddGroupModal, GroupPrompter } from ".";
const RotaGroupDashboard = () => {

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const { requestBuilder } = useRequestBuilder();

  const { dependency, refresh } = useRefresh();
  const groupService = useGroupService(GroupType.ROTA, refresh);

  return (
    <Fragment>
      <GroupToolbar title="Group management" groupType={GroupType.ROTA} createGroupAction={toggleAddGroupOpen} />
      <Fetch
        fetchOutput={useFetch(endpoints.groups(GroupType.ROTA).groups, requestBuilder(), [dependency])}
        render={({ response, isLoading }: IFetch<IGroupsResponse<IRotaGroup>>) => (
          isLoading ? (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          ) : (
            response && response.count > 0 ? (
              <div className="flex flex-wrap -m-2 mb-2">
                {response.groups.map((g: IRotaGroup) => (
                  <GroupCard
                    g={g}
                    groupService={groupService}
                    key={g._id}
                    render={isCardFlipped => (
                      <div className="flex space-x-8">
                        {isCardFlipped ? (
                          <>
                            <DataPoint value={groupService.getTotalUsers(g.accessControl)} label="user" />
                          </>
                        ) : (
                          <>
                            <DataPoint value={g.employees?.length} label="employee" />
                            <DataPoint value={g.rotas?.length} label="rota" />
                          </>
                        )}
                      </div>
                    )}
                  />
                ))}
              </div>
            ) : (
              <GroupPrompter action={toggleAddGroupOpen} />
            )
          )
        )}
      />
      <AddGroupModal addGroupOpen={addGroupOpen} toggleAddGroupOpen={toggleAddGroupOpen} groupService={groupService} />
    </Fragment>
  )
}

export default RotaGroupDashboard;