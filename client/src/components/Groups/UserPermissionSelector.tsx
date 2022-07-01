import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { useApplicationService, useGroupService, usePermissionService, useUserService } from "../../hooks"
import { IGroup } from "../../models"
import { combineClassNames } from "../../services"

interface IUserPermissionSelectorProps {
  group: IGroup
}

const UserPermissionSelector = ({ group }: IUserPermissionSelectorProps) => {

  const [expandedUser, setExpandedUser] = useState<string | undefined>()

  const { users } = useUserService()
  const { getApplication } = useApplicationService()
  const { permissions } = usePermissionService()
  const { updateGroup } = useGroupService()

  const expandUserPermissions = (userId: string | undefined) => {
    if (expandedUser === userId) return setExpandedUser(undefined)

    setExpandedUser(userId)
  }

  const userHasApplication = (userId: string | undefined, applicationIdentifier: string | undefined): boolean => {
    if (!userId || !applicationIdentifier) return false

    return group.users?.find(gu => gu.user === userId)?.applications.map(a => a.application).includes(applicationIdentifier) || false
  }

  const userHasPermission = (userId: string | undefined, applicationIdentifier: string | undefined, permissionIdentifier: string | undefined): boolean => {
    if (!userId || !applicationIdentifier || !permissionIdentifier) return false

    return group.users?.find(gu => gu.user === userId)?.applications.find(a => a.application === applicationIdentifier)?.permissions.includes(permissionIdentifier) || false
  }

  const togglePermission = (userId: string | undefined, applicationIdentifier: string | undefined, permissionIdentifier: string | undefined) => {
    let users = group.users || []

    if (!userId || !applicationIdentifier || !permissionIdentifier) return

    users = users?.map(u => u.user === userId ? {
      user: u.user,
      applications: userHasApplication(userId, applicationIdentifier) ? u.applications.map(a => a.application === applicationIdentifier ? {
        application: a.application,
        permissions: userHasPermission(userId, applicationIdentifier, permissionIdentifier)
          ? a.permissions.filter(p => p !== permissionIdentifier)
          : [...a.permissions, permissionIdentifier]
      } : a) : [...u.applications, {
        application: applicationIdentifier,
        permissions: [permissionIdentifier]
      }]
    } : u)

    updateGroup({ users: users }, group._id)
  }

  return (
    <>
      {users.map((u, i) => (
        <div key={i} className="flex flex-col">
          <button type="button" onClick={() => expandUserPermissions(u._id)} className="flex justify-between p-4 border-2 border-green-500 rounded-lg items-center group">
            <h2 className="text-lg font-bold tracking-wider">{u.username}</h2>
            <ChevronDownIcon className="w-6 h-6 group-hover:text-green-500 transition-colors" />
          </button>
          {u._id === expandedUser && (
            <div className="flex flex-col">
              {group.applications?.map(ga => getApplication(ga)).map((a, i) => (
                <div key={i} className="flex flex-col mt-2">
                  <div className="flex items-center space-x-2 p-2 border-l-2 border-red-500">
                    <h3 className="font-semibold tracking-wider">{a?.name}</h3>
                    {permissions.filter(p => p.application === a?.identifier).map((p, i) => (
                      <button type="button" onClick={() => togglePermission(u._id, a?.identifier, p.identifier)} key={i} className={combineClassNames(userHasPermission(u._id, a?.identifier, p.identifier) ? "border-green-500" : "border-red-500", "border inline-flex items-center rounded-lg p-1")}>
                        {p.name} {userHasPermission(u._id, a?.identifier, p.identifier) && <CheckCircleIcon className="w-4 h-4 ml-1 mt-0.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {group.users?.find(gu => gu.user === u._id)?.applications.map((a, i) => (
                <div key={i} className="flex flex-col">
                  {getApplication(a.application)?.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default UserPermissionSelector