import { Fragment, useState } from "react";
import { useFetch, useRefresh, useStatus } from "../../hooks";
import { GroupType, IClientGroup, IFetch, IGroupsResponse } from "../../models";
import { ClientGroupService, requestBuilder } from "../../services";
import { endpoints } from "../../utilities";
import { Fetch, SpinnerIcon } from "../Common";
import { GroupToolbar } from "../Toolbar";
import AddGroupModal from "./AddGroupModal";
import { DataPoint, GroupCard } from "./GroupCard";
import GroupPrompter from "./GroupPrompter";

const ClientGroupDashboard = () => {

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const { dependency, refresh } = useRefresh();
  const { statusService } = useStatus();
  const groupService = new ClientGroupService(statusService, refresh);

  return (
    <Fragment>
      <GroupToolbar title="Group management" groupType={GroupType.CLIENT} showGroupInfo createGroupAction={toggleAddGroupOpen} />
      <Fetch
        fetchOutput={useFetch(endpoints.groups(GroupType.CLIENT).groups, requestBuilder("GET"), [dependency])}
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