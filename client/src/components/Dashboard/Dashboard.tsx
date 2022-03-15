import { useFetch } from "../../hooks";
import { Application, IGroupsResponse, IProps, IRotaGroup, IRotaGroupsResponse } from "../../models";
import { requestBuilder } from "../../services";
import { endpoints } from "../../utilities";
import { AppCard } from "./Common";

const Dashboard = ({ setCurrentApplication }: IProps) => {

  setCurrentApplication(undefined);

  const getTotalEmployees = (rotaGroups: IRotaGroup[]): number => {
    const distinctEmployees: string[] = [];

    rotaGroups.forEach((rotaGroup: IRotaGroup) => {
      rotaGroup.employees.forEach((employeeId: string) => {
        if (!distinctEmployees.includes(employeeId)) distinctEmployees.push(employeeId);
      });
    });

    return distinctEmployees.length;
  }

  const getTotalRotas = (rotaGroups: IRotaGroup[]): number => {
    const distinctRotas: string[] = [];

    rotaGroups.forEach((rotaGroup: IRotaGroup) => {
      rotaGroup.rotas.forEach((rotaId: string) => {
        if (!distinctRotas.includes(rotaId)) distinctRotas.push(rotaId);
      });
    });

    return distinctRotas.length;
  }

  const groupsResponse = useFetch<IGroupsResponse>(endpoints.groups, requestBuilder("GET")).response;
  const rotaGroupsResponse = useFetch<IRotaGroupsResponse>(endpoints.rotagroups, requestBuilder("GET")).response;

  return (
    <div className="flex justify-start text-gray-200 mt-10 font-semibold tracking-wide space-x-8">
      <AppCard title={Application.ClientManager} href="/clients/dashboard" subtitle="Manage all of your clients here." 
        datapoints={[]}
      />
      {rotaGroupsResponse && rotaGroupsResponse.rotaGroups && (
        <AppCard title={Application.RotaManager} href="/rotas/dashboard" subtitle="Manage all of your rotas here." 
          datapoints={[
            {
              title: 'rota',
              value: getTotalRotas(rotaGroupsResponse.rotaGroups)
            },
            {
              title: 'employee',
              value: getTotalEmployees(rotaGroupsResponse.rotaGroups)
            }
          ]}
        />
      )}
    </div>
  )
}

export default Dashboard;