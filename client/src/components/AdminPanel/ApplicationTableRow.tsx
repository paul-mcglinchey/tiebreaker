import { useState } from "react"
import { useApplicationService } from "../../hooks"
import { IApplication } from "../../models"
import { Dialog, InlineButton, Modal, TableRow, TableRowItem } from "../Common"

interface IApplicationTableRowProps {
  application: IApplication
}

const ApplicationTableRow = ({ application }: IApplicationTableRowProps) => {

  const { deleteApplication } = useApplicationService()

  const [editApplicationOpen, setEditApplicationOpen] = useState<boolean>(false)
  const [deleteApplicationOpen, setDeleteApplicationOpen] = useState<boolean>(false)

  return (
    <TableRow>
      <TableRowItem>
        <div className="flex flex-col">
          <div className="text-sm font-medium text-white">{application.identifier}</div>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex items-center space-x-4 min-w-40">
          <span>{application.name}</span>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex items-center space-x-4 min-w-40">
          <span>{application.description}</span>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex items-center space-x-4 min-w-40">
          <span>{application.icon}</span>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex items-center space-x-4 min-w-40">
          <span>{application.url}</span>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex justify-end">
          <InlineButton action={() => setEditApplicationOpen(true)} color="text-blue-500">Edit</InlineButton>
          <InlineButton action={() => setDeleteApplicationOpen(true)} color="text-red-500">Delete</InlineButton>
          <Modal
            title="Edit application"
            description="This dialog can be used to edit existing applications"
            isOpen={editApplicationOpen}
            close={() => setEditApplicationOpen(false)}
          >
          </Modal>
          <Dialog 
            title="Delete application"
            description="This dialog can be used to delete an existing application"
            content="Deleting this application will cause any subscribing groups to be unsubscribed and all feature access to be revoked until a new application is created with the same identifier"
            isOpen={deleteApplicationOpen}
            close={() => setDeleteApplicationOpen(false)}
            positiveActions={[() => deleteApplication(application._id)]}
          />
        </div>
      </TableRowItem>
    </TableRow>
  )
}

export default ApplicationTableRow