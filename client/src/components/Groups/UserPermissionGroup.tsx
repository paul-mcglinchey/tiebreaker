import { useUserService } from "../../hooks"
import { IGroup, IGroupUser, IPermission, IUser } from "../../models"
import { Switch } from "../Common"

interface IUserPermissionGroupProps {
  group: IGroup
  onChange: (users: IGroupUser[]) => void
  label?: string | undefined
  permissions: IPermission[]
  user: IUser
  applicationId?: number | undefined
}

const UserPermissionGroup = ({ group, label, permissions, user, applicationId }: IUserPermissionGroupProps) => {

  const { userHasPermission } = useUserService()

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
            <Switch enabled={userHasPermission(group, user.id, applicationId, p?.id)} setEnabled={() => {}} description="User access control" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPermissionGroup