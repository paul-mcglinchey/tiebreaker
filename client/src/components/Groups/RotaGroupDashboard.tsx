import { Fragment } from "react";
import { useFetch, useRefresh, useStatus } from "../../hooks";
import { IFetch, IGroupsResponse, IRotaGroup, ToolbarType } from "../../models";
import { numberParser, requestBuilder, RotaGroupService } from "../../services";
import { endpoints } from "../../utilities";
import { Fetch, SpinnerIcon, Toolbar } from "../Common";
import { DataPoint, GroupCard } from "./GroupCard";
import GroupPrompter from "./GroupPrompter";

const RotaGroupDashboard = () => {

  const { dependency, refresh } = useRefresh();
  const { statusService } = useStatus();
  const groupService = new RotaGroupService(statusService, refresh);

  return (
    <Fragment>
      <Toolbar toolbarTypes={[ToolbarType.RotaGroups]} showSelector={false}>Group Management</Toolbar>
      <Fetch
        fetchOutput={useFetch(endpoints.groups("rota").groups, requestBuilder("GET"), [dependency])}
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
                      <div className="flex space-x-4">
                        {isCardFlipped ? (
                          <>
                            <DataPoint value={numberParser(g.employees.length)} label="employees" />
                            <DataPoint value={numberParser(g.rotas.length)} label="rotas" />
                          </>
                        ) : (
                          <>
                            <DataPoint value={numberParser(groupService.getTotalUsers(g.accessControl))} label="users" />
                          </>
                        )}
                      </div>
                    )}
                  />
                ))}
              </div>
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