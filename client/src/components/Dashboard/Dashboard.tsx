import { dashboardLinks } from "../../config";
import { NavMenu, Toolbar } from "../Common";
import { AppCard } from ".";
import { useAuthService, useGroupService, useUserService } from "../../hooks";
import { IApplication } from "../../models";
import { Permission } from "../../enums";

const Dashboard = () => {

  const { user } = useAuthService()
  const { currentGroup } = useGroupService()
  const { userHasPermission } = useUserService()

  const getUserAccessibleApps = (): IApplication[] => {
    if (!currentGroup) return []

    let groupApps = currentGroup.applications
    let userApps = currentGroup.groupUsers.find(gu => gu.userId === user?.id)?.applications
    let userAccessibleApps = groupApps?.filter(
      ga => userApps?.find(ua => ua.applicationId === ga.id) && userHasPermission(currentGroup, user?.id, ga.id, Permission.ApplicationAccess)
    )

    return userAccessibleApps
  }

  return (
    <>
      <NavMenu links={dashboardLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        <Toolbar title="Applications" />
        <div className="grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 tracking-wide gap-4 md:gap-8">
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