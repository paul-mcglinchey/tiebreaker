import { Fragment } from "react";
import { useFetch, useRefresh, useStatus } from "../../hooks";
import { IFetch, IGroupsResponse, IRotaGroup } from "../../models";
import { numberParser, requestBuilder, RotaGroupService } from "../../services";
import { endpoints } from "../../utilities";
import { Fetch, SpinnerIcon, Toolbar } from "../Common";
import GroupCard from "./GroupCard";
import GroupPrompter from "./GroupPrompter";

const RotaGroupDashboard = () => {

  const { dependency, refresh } = useRefresh();
  const { statusService } = useStatus();
  const groupService = new RotaGroupService(statusService, refresh);

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
              <div className="flex flex-wrap relative -m-2 mb-2">
                {response.groups.map((g: IRotaGroup) => (
                  <GroupCard
                    g={g}
                    groupService={groupService}
                    key={g._id}
                    render={isCardFlipped => (
                      <div className="flex space-x-4">
                        <div>
                          <span className="text-8xl font-bold">{isCardFlipped ? numberParser(groupService.getTotalUsers(g.accessControl)) : numberParser(g.rotas.length)}</span>
                          <span className="font-bold text-gray-700">{isCardFlipped ? 'users' : 'rotas'}</span>
                        </div>
                        {!isCardFlipped && (
                          <div>
                            <span className="text-8xl font-bold">{numberParser(g.employees.length)}</span>
                            <span className="font-bold text-gray-700">employees</span>
                          </div>
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