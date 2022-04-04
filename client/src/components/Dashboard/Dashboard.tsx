import { useFetch } from "../../hooks";
import { Application, IClientGroup, IGroupsResponse, IRotaGroup } from "../../models";
import { requestBuilder } from "../../services";
import { endpoints } from "../../utilities";
import { AppCard } from "./Common";

const Dashboard = () => {
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

  const clientGroupsResponse = useFetch<IGroupsResponse<IClientGroup>>(endpoints.groups("client").groups, requestBuilder("GET")).response;
  const rotaGroupsResponse = useFetch<IGroupsResponse<IRotaGroup>>(endpoints.groups("rota").groups, requestBuilder("GET")).response;

  return (
    <div className="flex flex-col md:flex-row justify-start text-gray-200 mt-10 font-semibold tracking-wide gap-8">
      {clientGroupsResponse && clientGroupsResponse.groups && (
        <AppCard title={Application.ClientManager} href="/clients/dashboard" subtitle="Manage all of your clients here."
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
        />
      )}
      {rotaGroupsResponse && rotaGroupsResponse.groups && (
        <AppCard title={Application.RotaManager} href="/rotas/dashboard" subtitle="Manage all of your rotas here."
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
        />
      )}
    </div>
  )
}

export default Dashboard;