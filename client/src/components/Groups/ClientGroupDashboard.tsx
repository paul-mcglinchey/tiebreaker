import { Fragment } from "react";
import { Toolbar } from "..";
import { useFetch, useRefresh, useStatus } from "../../hooks";
import { IClientGroup, IFetch, IGroupsResponse, ToolbarType } from "../../models";
import { ClientGroupService, numberParser, requestBuilder } from "../../services";
import { endpoints } from "../../utilities";
import { Fetch, SpinnerIcon } from "../Common";
import { DataPoint, GroupCard } from "./GroupCard";
import GroupPrompter from "./GroupPrompter";

const ClientGroupDashboard = () => {

  const { dependency, refresh } = useRefresh();
  const { statusService } = useStatus();
  const groupService = new ClientGroupService(statusService, refresh);

  return (
    <Fragment>
      <Toolbar toolbarTypes={[ToolbarType.ClientGroups]} showSelector={false}>Group Management</Toolbar>
      <Fetch
        fetchOutput={useFetch(endpoints.groups("client").groups, requestBuilder("GET"), [dependency])}
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
                          <DataPoint value={numberParser(groupService.getTotalUsers(g.accessControl))} label="users" />
                        ) : (
                          <DataPoint value={numberParser(g.clients.length)} label="clients" />
                        )}
                      </div>
                    )}
                  />
                ))}
              </div>
            ) : (
              <GroupPrompter href='/clients/creategroup' />
            )
          )
        )} 
      />
    </Fragment>
  )
}

export default ClientGroupDashboard;