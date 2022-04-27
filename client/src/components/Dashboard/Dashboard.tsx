import { useGroupService } from "../../hooks";
import { Application } from "../../models";
import { dashboardLinks } from "../../utilities";
import { NavMenu, SpinnerIcon } from "../Common";
import { AppCard } from ".";
import { AddGroupModal, GroupPrompter } from "../Groups";
import { useState } from "react";

const Dashboard = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false)
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen)

  const { getGroups, getCount, isLoading, getTotalClients, getTotalEmployees, getTotalRotas } = useGroupService()

  return (
    <>
      <NavMenu links={dashboardLinks} />
      {getCount() > 0 ? (
        <div className="flex flex-col md:flex-row justify-start mt-10 tracking-wide gap-8 px-2 sm:px-6 lg:px-8">
          <AppCard
            title={Application.ClientManager}
            href="/clients/dashboard"
            subtitle="Manage all of your clients here."
            datapoints={[
              {
                title: 'client',
                value: getTotalClients(getGroups())
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
                value: getTotalRotas(getGroups())
              },
              {
                title: 'employee',
                value: getTotalEmployees(getGroups())
              }
            ]}
            colours={{ from: 'from-blue-500', to: 'to-purple-600' }}
          />
        </div>
      ) : (
        isLoading ? (
          <SpinnerIcon className="w-8 h-8" />
        ) : (
          <GroupPrompter action={toggleAddGroupOpen} />
        )
      )}
      <AddGroupModal addGroupOpen={addGroupOpen} toggleAddGroupOpen={toggleAddGroupOpen} />
    </>
  )
}

export default Dashboard;