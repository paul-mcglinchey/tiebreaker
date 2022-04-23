import { Fragment, useState } from "react";
import { useFetch, useGroupService, useRefresh, useRequestBuilder } from "../../hooks";
import { GroupType, IClientGroup, IFetch, IGroupsResponse } from "../../models";
import { endpoints } from "../../utilities";
import { Fetch, SpinnerIcon } from "../Common";
import { GroupToolbar } from "../Toolbar";
import { AddGroupModal, DataPoint, GroupCard, GroupPrompter } from ".";

const ClientGroupDashboard = () => {

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);
  
  const { dependency, refresh } = useRefresh();
  const { requestBuilder } = useRequestBuilder();

  const { groupService } = useGroupService(GroupType.CLIENT, refresh);

  return (
    <Fragment>
      <GroupToolbar title="Group management" groupType={GroupType.CLIENT} createGroupAction={toggleAddGroupOpen} />
      <Fetch
        fetchOutput={useFetch(endpoints.groups(GroupType.CLIENT).groups, requestBuilder(), [dependency])}
        render={({ response, isLoading }: IFetch<IGroupsResponse<IClientGroup>>) => (
          isLoading ? (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          ) : (
            response && response.count > 0 ? (
              <div className="flex flex-wrap -m-2 mb-2">
                {response.groups.map((g: IClientGroup) => (
                  <GroupCard
                    g={g}
                    groupService={groupService}
                    key={g._id}
                    render={isCardFlipped => (
                      <div className="flex space-x-4">
                        {isCardFlipped ? (
                          <DataPoint value={groupService.getTotalUsers(g.accessControl)} label="user" />
                        ) : (
                          <DataPoint value={g.clients?.length || 0} label="client" />
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

export default ClientGroupDashboard;