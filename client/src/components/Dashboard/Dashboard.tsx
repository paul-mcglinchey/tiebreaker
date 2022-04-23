import { useFetch, useGroupService, useRefresh, useRequestBuilder } from "../../hooks";
import { Application, IFetch, IGroup, IGroupsResponse } from "../../models";
import { dashboardLinks, endpoints } from "../../utilities";
import { Fetch, FetchError, NavMenu, SpinnerIcon } from "../Common";
import { AppCard } from ".";
import { AddGroupModal, GroupPrompter } from "../Groups";
import { useState } from "react";

const Dashboard = () => {

  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh()

  const [addGroupOpen, setAddGroupOpen] = useState(false)
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen)

  const groupService = useGroupService(refresh)

  const getTotalEmployees = (groups: IGroup[]): number => {
    const distinctEmployees: string[] = [];

    groups.forEach((group: IGroup) => {
      group.employees?.forEach((employeeId: string) => {
        if (!distinctEmployees.includes(employeeId)) distinctEmployees.push(employeeId);
      });
    });

    return distinctEmployees.length;
  }

  const getTotalRotas = (groups: IGroup[]): number => {
    const distinctRotas: string[] = [];

    groups.forEach((group: IGroup) => {
      group.rotas?.forEach((rotaId: string) => {
        if (!distinctRotas.includes(rotaId)) distinctRotas.push(rotaId);
      });
    });

    return distinctRotas.length;
  }

  const getTotalClients = (groups: IGroup[]): number => {
    let totalClients: number = 0;

    groups.forEach((group: IGroup) => {
      totalClients += group.clients?.length || 0;
    })

    return totalClients;
  }

  return (
    <>
      <NavMenu links={dashboardLinks} />
      <Fetch
        fetchOutput={useFetch(endpoints.groups, requestBuilder(), [dependency])}
        render={({ response, isLoading, error }: IFetch<IGroupsResponse>) => (
          <>
            {response ? (
              response.count > 0 ? (
                <div className="flex flex-col md:flex-row justify-start text-gray-200 mt-10 font-semibold tracking-wide gap-8 px-2 sm:px-6 lg:px-8">
                  <AppCard
                    title={Application.ClientManager}
                    href="/clients/dashboard"
                    subtitle="Manage all of your clients here."
                    datapoints={[
                      {
                        title: 'client',
                        value: getTotalClients(response.groups)
                      }
                    ]}
                    colours={{ from: 'from-orange-400', to: 'to-red-500' }}
                  />
                  <AppCard
                    title={Application.RotaManager}
                    href="/rotas/dashboard"
                    subtitle="Manage all of your rotas here."
                    datapoints={[
                      {
                        title: 'rota',
                        value: getTotalRotas(response.groups)
                      },
                      {
                        title: 'employee',
                        value: getTotalEmployees(response.groups)
                      }
                    ]}
                    colours={{ from: 'from-blue-500', to: 'to-purple-600' }}
                  />
                </div>
              ) : (
                <GroupPrompter action={toggleAddGroupOpen} />
              )
            ) : (
              isLoading ? (
                <SpinnerIcon className="w-8 h-8 text-gray-300" />
              ) : (
                error && (
                  <FetchError error={error} toggleRefresh={refresh} isLoading={isLoading} />
                )
              )
            )}
          </>
        )}
      />
      <AddGroupModal addGroupOpen={addGroupOpen} toggleAddGroupOpen={toggleAddGroupOpen} groupService={groupService} />
    </>
  )
}

export default Dashboard;