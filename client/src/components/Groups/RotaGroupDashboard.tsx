import { Fragment } from "react";
import { GroupList } from ".";
import { useFetch } from "../../hooks";
import { IFetch, IGroupDashboardProps, IGroupsResponse, IRotaGroup, ToolbarType } from "../../models";
import { requestBuilder, RotaGroupService } from "../../services";
import { endpoints } from "../../utilities";
import { Fetch, SpinnerIcon, Toolbar } from "../Common";
import GroupPrompter from "./GroupPrompter";

const RotaGroupDashboard = ({ statusService }: IGroupDashboardProps) => {
  return (
    <Fragment>
      <Toolbar toolbarTypes={[ToolbarType.RotaGroups]}>Group Management</Toolbar>
      <Fetch
        fetchOutput={useFetch(endpoints.groups("rota").groups, requestBuilder("GET"))}
        render={({ response, isLoading }: IFetch<IGroupsResponse<IRotaGroup>>) => (
          isLoading ? (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          ) : (
            response && response.count > 0 ? (
              <GroupList groups={response.groups} groupService={new RotaGroupService(statusService)} />
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

export default RotaGroupDashboard;