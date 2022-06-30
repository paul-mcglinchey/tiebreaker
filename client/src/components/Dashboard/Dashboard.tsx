import { Application } from "../../models";
import { dashboardLinks } from "../../config";
import { NavMenu, Toolbar } from "../Common";
import { AppCard } from ".";
import { useAuth, useGroupService, useApplicationService } from "../../hooks";

const Dashboard = () => {

  const { user } = useAuth()
  const { currentGroup } = useGroupService()
  const { applications } = useApplicationService()

  console.log(currentGroup?.users?.find(a => a.user === user?._id)?.applications.map(a => a.application))
  console.log(applications)

  return (
    <>
      <NavMenu links={dashboardLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        <Toolbar title="Applications" />
        <div className="flex flex-col md:flex-row justify-start tracking-wide gap-8">
          {applications.map((a, i) => (
            <AppCard 
              title={a.name || '--'}
              href={a.url || '/dashboard'}
              subtitle={a.description}
              datapoints={[]}
              key={i}
            />
          ))}
          <AppCard
            title={Application.ClientManager}
            href="/clients/dashboard"
            subtitle="Manage all of your clients here."
            datapoints={[
            ]}
            colours={{ from: 'from-orange-400', to: 'to-red-500' }}
          />
          <AppCard
            title={Application.RotaManager}
            href="/rotas/dashboard"
            subtitle="Manage all of your rotas here."
            datapoints={[
            ]}
            colours={{ from: 'from-blue-500', to: 'to-purple-600' }}
          />
        </div>
      </div>
    </>
  )
}

export default Dashboard;