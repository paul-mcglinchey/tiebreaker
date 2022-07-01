import { dashboardLinks } from "../../config";
import { NavMenu, Toolbar } from "../Common";
import { AppCard } from ".";
import { useAuth, useGroupService, useApplicationService } from "../../hooks";
import { Permission } from "../../enums";
import { IApplication } from "../../models";

const Dashboard = () => {

  const { user } = useAuth()
  const { currentGroup } = useGroupService()
  const { applications } = useApplicationService()

  const getUserAccessibleApps = (): IApplication[] => {
    let userApps = currentGroup?.users && currentGroup?.users.find(u => u.user === user?._id)?.applications
    let userAccessibleApps = applications.filter(a => a.identifier && userApps?.find(ua => ua.application === a.identifier && ua.permissions.includes(Permission.ApplicationAccess)))

    return userAccessibleApps
  }

  return (
    <>
      <NavMenu links={dashboardLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        <Toolbar title="Applications" />
        <div className="grid grid-cols-3 tracking-wide gap-8">
          {getUserAccessibleApps().map((a, i) => (
            <AppCard 
              title={a.name || '--'}
              backgroundImage={a.icon}
              href={a.url || '/dashboard'}
              subtitle={a.description}
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Dashboard;