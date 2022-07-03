import { useApplicationService, usePermissionService, useUserService } from "../../hooks"
import { IGroup, IGroupUser } from "../../models"
import { Switch } from "../Common"

interface IUserPermissionSelectorProps {
  group: IGroup
  onChange: (users: IGroupUser[]) => void
}

const UserPermissionSelector = ({ group, onChange }: IUserPermissionSelectorProps) => {

  const { getUser } = useUserService()
  const { getApplication } = useApplicationService()
  const { getPermission } = usePermissionService()

  const userHasApplication = (userId: string | undefined, applicationIdentifer: number | undefined): boolean => {
    if (!userId || !applicationIdentifer) return false

    return group.users?.find(gu => gu.user === userId)?.applications.find(ga => ga.application === applicationIdentifer) ? true : false
  }

  const userHasPermission = (userId: string | undefined, applicationIdentifier: number | undefined, permissionIdentifier: number | undefined): boolean => {
    if (!userId || !applicationIdentifier || !permissionIdentifier) return false

    return group.users?.find(gu => gu.user === userId)?.applications.find(ga => ga.application === applicationIdentifier)?.permissions.find(gap => gap === permissionIdentifier) ? true : false
  }

  const applicationExistsInGroup = (groupId: string | undefined, applicationIdentifier: number | undefined): boolean => {
    if (!groupId || !applicationIdentifier) return false

    return group.applications?.includes(applicationIdentifier) ? true : false
  }

  const toggleUserPermission = (userId: string | undefined, applicationIdentifier: number | undefined, permissionIdentifier: number | undefined) => {
    let user: IGroupUser | undefined = group.users?.find(gu => gu.user === userId)
    
    if (!userId || !applicationIdentifier || !permissionIdentifier || !user || !applicationExistsInGroup) {
      return console.error("Something went wrong while updating a user's permissions")
    }

    let hasPermission: boolean = userHasPermission(userId, applicationIdentifier, permissionIdentifier)

    let tempUser = {
      user: userId,
      permissions: user?.permissions || [],
      applications: userHasApplication(userId, applicationIdentifier)
        ? user 
          ? user.applications.map(gua => gua.application === applicationIdentifier 
            ? ({
              application: applicationIdentifier,
              permissions: hasPermission ? gua.permissions.filter(p => p !== permissionIdentifier) : [...gua.permissions, permissionIdentifier]
            }) 
            : gua)
          : []
        : [...(user?.applications || []), {
          application: applicationIdentifier,
          permissions: [permissionIdentifier]
        }]
    }

    let tempUsers = group.users?.map(gu => gu.user === userId ? tempUser : gu)

    console.log(tempUser)

    onChange(tempUsers)
  }

  return (
    <div>
      {group.users?.map((gu, i) => (
        <div key={i}>
          <span className="uppercase font-bold text-xl tracking-wider">
            {getUser(gu.user)?.username}
          </span>
          <div>
            {group.applications?.map(ga => getApplication(ga)).map((ga, j) => (
              <div key={j}>
                <span>
                  {ga?.name}
                </span>
                <div>
                  {ga?.requiredPermissions.map(arp => getPermission(arp)).map((arp, k) => (
                    <div>
                      <div key={k}>
                        {arp?.name}
                      </div>
                      <Switch enabled={userHasPermission(gu.user, ga.identifier, arp?.identifier)} setEnabled={() => toggleUserPermission(gu.user, ga.identifier, arp?.identifier)} description="User access control" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserPermissionSelector