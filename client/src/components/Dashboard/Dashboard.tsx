import { dashboardLinks } from "../../config";
import { NavMenu, Toolbar } from "../Common";
import { AppCard } from ".";
import { useAuth, useGroupService, useApplicationService } from "../../hooks";
import { IApplication } from "../../models";

const Dashboard = () => {

  const { user } = useAuth()
  const { currentGroup } = useGroupService()
  const { applications } = useApplicationService()

  const getUserAccessibleApps = (): IApplication[] => {
    let groupApps = applications.filter(a => a.identifier && currentGroup?.applications?.includes(a.identifier))
    let userApps = currentGroup?.users && currentGroup?.users.find(u => u.user === user?._id)?.applications
    let userAccessibleApps = groupApps?.filter(a => a?.identifier && userApps?.find(ua => ua.application === a.identifier) && a.requiredPermissions.every(rp => userApps?.find(ua => ua.application == a.identifier)?.permissions.includes(rp)))

    return userAccessibleApps
  }

  return (
    <>
      <NavMenu links={dashboardLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        <Toolbar title="Applications" />
        <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 tracking-wide gap-4 md:gap-8">
          {getUserAccessibleApps().map((a, i) => (
            <AppCard 
              title={a.name || '--'}
              backgroundImage={a.backgroundImage}
              backgroundVideo={a.backgroundVideo}
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