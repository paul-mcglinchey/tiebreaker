import { Fragment } from "react";
import { GroupList, Toolbar } from "..";
import { useFetch } from "../../hooks";
import { IClientGroup, IFetch, IGroupsResponse, ToolbarType } from "../../models";
import { requestBuilder } from "../../services";
import { endpoints } from "../../utilities";
import { Fetch, SpinnerIcon } from "../Common";
import GroupPrompter from "./GroupPrompter";


const ClientGroupDashboard = () => {
  return (
    <Fragment>
      <Toolbar toolbarTypes={[ToolbarType.ClientGroups]}>Group Management</Toolbar>
      <Fetch
        fetchOutput={useFetch(endpoints.clientgroups, requestBuilder("GET"))}
        render={({ response, isLoading }: IFetch<IGroupsResponse<IClientGroup>>) => (
          isLoading ? (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          ) : (
            response && response.count > 0 ? (
              <GroupList groups={response.groups} />
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