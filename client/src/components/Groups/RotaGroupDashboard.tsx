import { Fragment } from "react";
import { GroupList } from ".";
import { useFetch, useRefresh, useStatus } from "../../hooks";
import { IFetch, IGroupsResponse, IRotaGroup } from "../../models";
import { requestBuilder, RotaGroupService } from "../../services";
import { endpoints } from "../../utilities";
import { Fetch, SpinnerIcon, Toolbar } from "../Common";
import GroupPrompter from "./GroupPrompter";

const RotaGroupDashboard = () => {

  const { dependency, refresh } = useRefresh();
  const { statusService } = useStatus();

  return (
    <Fragment>
      <Toolbar>Group Management</Toolbar>
      <Fetch
        fetchOutput={useFetch(endpoints.groups("rota").groups, requestBuilder("GET"), [dependency])}
        render={({ response, isLoading }: IFetch<IGroupsResponse<IRotaGroup>>) => (
          isLoading ? (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          ) : (
            response && response.count > 0 ? (
              <GroupList groups={response.groups} groupService={new RotaGroupService(statusService, refresh)} />
            ) : (
              <GroupPrompter href='/rotas/creategroup' />
            )
          )
        )}
      />
    </Fragment>
  )
}

export default RotaGroupDashboard;