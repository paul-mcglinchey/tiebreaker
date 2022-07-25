import { useState } from "react"
import { usePermissionService, useUserService } from "../../hooks"
import { IGroup, IGroupUser, IUser } from "../../models"
import { InlineButton, Modal } from "../Common"
import { UserPermissionGroup } from '.'

interface IUserPermissionSelectorProps {
  group: IGroup
  onChange: (users: IGroupUser[]) => void
}

const UserPermissionSelector = ({ group, onChange }: IUserPermissionSelectorProps) => {

  const [editUserPermissionsOpen, setEditUserPermissionsOpen] = useState<boolean>(false)

  const { getUser } = useUserService()
  const { permissions } = usePermissionService()

  console.log(group.groupUsers?.map(gu => getUser(gu.userId)), group.groupUsers?.map(gu => getUser(gu.userId)).filter((u): u is IUser => !!u))

  return (
    <div>
      {group.groupUsers?.map(gu => getUser(gu.userId)).filter((u): u is IUser => !!u).map((gu, i) => (
        <div key={i}>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="uppercase font-bold text-lg tracking-wider">
                {gu.username}
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
              <div className="mt-4 grid grid-cols-1 gap-4">
                <UserPermissionGroup
                  group={group}
                  onChange={onChange}
                  label="Group Permissions"
                  permissions={permissions.filter(p => p.applications?.length === 0)}
                  user={gu}
                />
                {group.applications?.map((ga, j) => (
                  <UserPermissionGroup
                    key={j}
                    group={group}
                    onChange={onChange}
                    label={ga.name}
                    permissions={permissions.filter(p => p.applications?.map(a => a.id).includes(ga.id))}
                    user={gu}
                    applicationId={ga.id}
                  />
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