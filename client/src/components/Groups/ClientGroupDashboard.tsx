import { Fragment } from "react";
import { GroupList, Toolbar } from "..";
import { useFetch, useRefresh, useStatus } from "../../hooks";
import { IClientGroup, IFetch, IGroupsResponse } from "../../models";
import { ClientGroupService, requestBuilder } from "../../services";
import { endpoints } from "../../utilities";
import { Fetch, SpinnerIcon } from "../Common";
import GroupPrompter from "./GroupPrompter";

const ClientGroupDashboard = () => {

  const { dependency, refresh } = useRefresh();
  const { statusService } = useStatus();

  return (
    <Fragment>
      <Toolbar>Group Management</Toolbar>
      <Fetch
        fetchOutput={useFetch(endpoints.groups("client").groups, requestBuilder("GET"), [dependency])}
        render={({ response, isLoading }: IFetch<IGroupsResponse<IClientGroup>>) => (
          isLoading ? (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          ) : (
            response && response.count > 0 ? (
              <GroupList groups={response.groups} groupService={new ClientGroupService(statusService, refresh)} />
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