import { useState } from "react"
import { useApplicationService, usePermissionService, useUserService } from "../../hooks"
import { IGroup, IGroupUser } from "../../models"
import { InlineButton, Modal, Switch } from "../Common"

interface IUserPermissionSelectorProps {
  group: IGroup
  onChange: (users: IGroupUser[]) => void
}

const UserPermissionSelector = ({ group, onChange }: IUserPermissionSelectorProps) => {

  const [editUserPermissionsOpen, setEditUserPermissionsOpen] = useState<boolean>(false)

  const { getUser } = useUserService()
  const { getApplication } = useApplicationService()
  const { permissions } = usePermissionService()

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

    onChange(tempUsers)
  }

  return (
    <div>
      {group.users?.map(u => getUser(u.user)).map((gu, i) => (
        <div key={i}>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="uppercase font-bold text-lg tracking-wider">
                {gu?.username}
              </span>
              <span className="text-sm tracking-wide dark:text-gray-500 text-gray-500">{gu?.email}</span>
            </div>
            <div>
              <InlineButton color="text-blue-500" action={() => setEditUserPermissionsOpen(true)}>Edit</InlineButton>
            </div>
          </div>
          <Modal
            title="Edit user permissions"
            description="This dialog can be used to edit and update an existing user's permissions within the currently selected group."
            isOpen={editUserPermissionsOpen}
            close={() => setEditUserPermissionsOpen(false)}
            level={2}
          >
            {(ConfirmSubmission) => (
              <div className="mt-4 grid grid-cols-1 gap-2">
                {group.applications?.map(ga => getApplication(ga)).map((ga, j) => (
                  <div key={j}>
                    <h3 className="text-xl font-bold mb-2">
                      {ga?.name}
                    </h3>
                    <div className="grid gap-2">
                      {permissions.filter(p => ga?.identifier && p.applications?.includes(ga.identifier)).map((p, k) => (
                        <div className="flex p-2 justify-between bg-gray-900 rounded-lg">
                          <div key={k}>
                            {p?.name}
                          </div>
                          <Switch enabled={userHasPermission(gu?._id, ga?.identifier, p?.identifier)} setEnabled={() => toggleUserPermission(gu?._id, ga?.identifier, p?.identifier)} description="User access control" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {ConfirmSubmission("Ok")}
              </div>
            )}
          </Modal>
        </div>
      ))}
    </div>
  )
}

export default UserPermissionSelector