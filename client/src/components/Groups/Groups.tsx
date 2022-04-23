import { useState } from "react";
import { useFetch, useGroupService, useRefresh, useRequestBuilder } from "../../hooks";
import { IFetch, IGroup, IGroupsResponse } from "../../models";
import { dashboardLinks, endpoints } from "../../utilities";
import { Fetch, GroupToolbar, NavMenu, SpinnerIcon } from "../Common";
import { GroupCard, DataPoint, GroupPrompter, AddGroupModal } from ".";

const Groups = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const { requestBuilder } = useRequestBuilder();
  const { dependency, refresh } = useRefresh();

  const groupService = useGroupService(refresh);

  return (
    <>
      <NavMenu links={dashboardLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        <GroupToolbar title="Group management" createGroupAction={toggleAddGroupOpen} />
        <Fetch
          fetchOutput={useFetch(endpoints.groups, requestBuilder(), [dependency])}
          render={({ response, isLoading }: IFetch<IGroupsResponse>) => (
            isLoading ? (
              <div className="flex justify-center py-10">
                <SpinnerIcon className="text-white h-12 w-12" />
              </div>
            ) : (
              response && response.count > 0 ? (
                <div className="flex flex-wrap -m-2 mb-2">
                  {response.groups.map((g: IGroup) => (
                    <GroupCard
                      g={g}
                      groupService={groupService}
                      key={g._id}
                      render={isCardFlipped => (
                        <div className="flex space-x-8">
                          {isCardFlipped ? (
                            <>
                              <DataPoint value={g.users?.length || 0} label="user" />
                            </>
                          ) : (
                            <>
                              <DataPoint value={g.clients?.length} label="client" />
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
      </div>
      <AddGroupModal addGroupOpen={addGroupOpen} toggleAddGroupOpen={toggleAddGroupOpen} groupService={groupService} />
    </>
  )
}

export default Groups