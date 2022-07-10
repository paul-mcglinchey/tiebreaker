import { useState } from "react"
import { usePermissionService } from "../../hooks"
import { IPermission } from "../../models"
import { Dialog, InlineButton, TableRow, TableRowItem } from "../Common"
import { PermissionModal } from '.'

interface IPermissionTableRowProps {
  permission: IPermission
}

const PermissionTableRow = ({ permission }: IPermissionTableRowProps) => {

  const { deletePermission } = usePermissionService()

  const [editPermissionOpen, setEditPermissionOpen] = useState<boolean>(false)
  const [deletePermissionOpen, setDeletePermissionOpen] = useState<boolean>(false)

  return (
    <TableRow>
      <TableRowItem>
        <div className="flex flex-col">
          <div className="text-sm font-medium text-white">{permission.identifier}</div>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex items-center space-x-4 min-w-40">
          <span>{permission.name}</span>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex items-center space-x-4 min-w-40">
          <span>{permission.description}</span>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex items-center space-x-4 min-w-40">
          <span>{permission.language}</span>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex justify-end">
          <InlineButton action={() => setEditPermissionOpen(true)} color="text-blue-500">Edit</InlineButton>
          <InlineButton action={() => setDeletePermissionOpen(true)} color="text-red-500">Delete</InlineButton>
          <PermissionModal 
            permission={permission}
            isOpen={editPermissionOpen}
            close={() => setEditPermissionOpen(false)}
          />
          <Dialog 
            title="Delete permission"
            description="This dialog can be used to delete an existing permission"
            content="Deleting this permission from the application will cause any users or roles to no longer be able to utilize the permission unless a new permission is created with the same identifier"
            isOpen={deletePermissionOpen}
            close={() => setDeletePermissionOpen(false)}
            positiveActions={[() => deletePermission(permission._id)]}
          />
        </div>
      </TableRowItem>
    </TableRow>
  )
}

export default PermissionTableRow