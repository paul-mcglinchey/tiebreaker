import { useUserService } from "../../hooks"
import { IGroup, IGroupUser, IPermission, IUser } from "../../models"
import { Switch } from "../Common"

interface IUserPermissionGroupProps {
  group: IGroup
  onChange: (users: IGroupUser[]) => void
  label?: string | undefined
  permissions: IPermission[]
  user: IUser
  applicationIdentifier?: number | undefined
}

const UserPermissionGroup = ({ group, onChange, label, permissions, user, applicationIdentifier }: IUserPermissionGroupProps) => {

  const { userHasApplication, userHasPermission } = useUserService()

  const toggleUserPermission = (userId: string | undefined, applicationIdentifier: number | undefined, permissionIdentifier: number | undefined) => {
    let user: IGroupUser | undefined = group.users?.find(gu => gu.user === userId)

    if (!permissionIdentifier || !user) {
      return console.error("Something went wrong while updating a user's permissions")
    }

    applicationIdentifier ? toggleApplicationPermission(user, applicationIdentifier, permissionIdentifier) : toggleGroupPermission(user, permissionIdentifier)
  }

  const toggleGroupPermission = (user: IGroupUser, permissionIdentifier: number) => {
    const userId = user.user
    const hasPermission: boolean = userHasPermission(group, userId, undefined, permissionIdentifier)

    let tempUser = {
      ...user,
      permissions: hasPermission 
        ? user.permissions.filter(p => p !== permissionIdentifier) 
        : [...user.permissions, permissionIdentifier]
    }

    let tempUsers = group.users?.map(gu => gu.user === userId ? tempUser : gu)

    onChange(tempUsers)
  }

  const toggleApplicationPermission = (user: IGroupUser, applicationIdentifer: number, permissionIdentifier: number) => {
    const userId = user.user
    const hasApplication: boolean = userHasApplication(group, userId, applicationIdentifer)
    const hasPermission: boolean = userHasPermission(group, userId, applicationIdentifer, permissionIdentifier)

    let tempUser = {
      ...user,
      applications: hasApplication
        ? user
            ? user.applications.map(gua => gua.application === applicationIdentifier
                ? ({
                  application: applicationIdentifier,
                  permissions: hasPermission ? gua.permissions.filter(p => p !== permissionIdentifier) : [...gua.permissions, permissionIdentifier]
                })
                : gua)
            : []
        : [...user.applications, { application: applicationIdentifer, permissions: [permissionIdentifier] }]
    }

    let tempUsers = group.users?.map(gu => gu.user === userId ? tempUser : gu)

    onChange(tempUsers)
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">
        {label || "Permission Group"}
      </h3>
      <div className="grid gap-2">
        {permissions.map((p, k) => (
          <div className="flex p-2 justify-between bg-gray-900 rounded-lg">
            <div key={k}>
              {p?.name}
            </div>
            <Switch enabled={userHasPermission(group, user.id, applicationIdentifier, p?.identifier)} setEnabled={() => toggleUserPermission(user.id, applicationIdentifier, p?.identifier)} description="User access control" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPermissionGroup