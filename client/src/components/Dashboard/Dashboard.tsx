import { useFetch, useRequestBuilder } from "../../hooks";
import { Application, GroupType, IClientGroup, IGroupsResponse, IRotaGroup } from "../../models";
import { endpoints } from "../../utilities";
import { NavMenu } from "../Common";
import { AppCard } from ".";

const Dashboard = () => {

  const { requestBuilder } = useRequestBuilder();

  const getTotalEmployees = (rotaGroups: IRotaGroup[]): number => {
    const distinctEmployees: string[] = [];

    rotaGroups.forEach((rotaGroup: IRotaGroup) => {
      rotaGroup.employees?.forEach((employeeId: string) => {
        if (!distinctEmployees.includes(employeeId)) distinctEmployees.push(employeeId);
      });
    });

    return distinctEmployees.length;
  }

  const getTotalRotas = (rotaGroups: IRotaGroup[]): number => {
    const distinctRotas: string[] = [];

    rotaGroups.forEach((rotaGroup: IRotaGroup) => {
      rotaGroup.rotas?.forEach((rotaId: string) => {
        if (!distinctRotas.includes(rotaId)) distinctRotas.push(rotaId);
      });
    });

    return distinctRotas.length;
  }

  const getTotalClients = (clientGroups: IClientGroup[]): number => {
    let totalClients: number = 0;

    clientGroups.forEach((clientGroup: IClientGroup) => {
      totalClients += clientGroup.clients?.length || 0;
    })

    return totalClients;
  }

  const clientGroupsResponse = useFetch<IGroupsResponse<IClientGroup>>(endpoints.groups(GroupType.CLIENT).groups, requestBuilder()).response;
  const rotaGroupsResponse = useFetch<IGroupsResponse<IRotaGroup>>(endpoints.groups(GroupType.ROTA).groups, requestBuilder()).response;

  return (
    <>
      <NavMenu />
      <div className="flex flex-col md:flex-row justify-start text-gray-200 mt-10 font-semibold tracking-wide gap-8 px-2 sm:px-6 lg:px-8">
        {clientGroupsResponse && clientGroupsResponse.groups && (
          <AppCard 
            title={Application.ClientManager} 
            href="/clients/dashboard" 
            subtitle="Manage all of your clients here."
            datapoints={[
              {
                title: 'group',
                value: clientGroupsResponse ? clientGroupsResponse.count : 0
              },
              {
                title: 'client',
                value: getTotalClients(clientGroupsResponse.groups)
              }
            ]}
            colours={{ from: 'from-orange-400', to: 'to-red-500' }}
          />
        )}
        {rotaGroupsResponse && rotaGroupsResponse.groups && (
          <AppCard 
            title={Application.RotaManager} 
            href="/rotas/dashboard" 
            subtitle="Manage all of your rotas here."
            datapoints={[
              {
                title: 'group',
                value: rotaGroupsResponse ? rotaGroupsResponse.count : 0
              },
              {
                title: 'rota',
                value: getTotalRotas(rotaGroupsResponse.groups)
              },
              {
                title: 'employee',
                value: getTotalEmployees(rotaGroupsResponse.groups)
              }
            ]}
            colours={{ from: 'from-blue-500', to: 'to-purple-600' }}
          />
        )}
      </div>
    </>
  )
}

export default Dashboard;