import { Fragment } from "react";
import { GroupList, Toolbar } from "..";
import { useFetch } from "../../hooks";
import { IClientGroup, IFetch, IGroupDashboardProps, IGroupsResponse, ToolbarType } from "../../models";
import { ClientGroupService, requestBuilder } from "../../services";
import { endpoints } from "../../utilities";
import { Fetch, SpinnerIcon } from "../Common";
import GroupPrompter from "./GroupPrompter";


const ClientGroupDashboard = ({ statusService }: IGroupDashboardProps) => {
  return (
    <Fragment>
      <Toolbar toolbarTypes={[ToolbarType.ClientGroups]}>Group Management</Toolbar>
      <Fetch
        fetchOutput={useFetch(endpoints.groups("client").groups, requestBuilder("GET"))}
        render={({ response, isLoading }: IFetch<IGroupsResponse<IClientGroup>>) => (
          isLoading ? (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          ) : (
            response && response.count > 0 ? (
              <GroupList groups={response.groups} groupService={new ClientGroupService(statusService)} />
            ) : (
              setTimeout(() => {
                return (
                  <GroupPrompter />
                )
              }, 500)
            )
          )
        )} 
      />
    </Fragment>
  )
}

export default ClientGroupDashboard;