import { useState } from "react"
import { useApplicationService } from "../../hooks"
import { IApplication } from "../../models"
import { Dialog, InlineButton, TableRow, TableRowItem } from "../Common"
import { ApplicationModal } from "."

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
        <span className="text-sm font-medium text-white">{application.id}</span>
      </TableRowItem>
      <TableRowItem>
        <span style={{ borderColor: application.colour }} className={`px-2 py-1 rounded-lg border`}>{application.name}</span>
      </TableRowItem>
      <TableRowItem>
        <span className="max-w-xs overflow-hidden text-ellipsis">{application.description}</span>
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
          <ApplicationModal
            application={application}
            isOpen={editApplicationOpen}
            close={() => setEditApplicationOpen(false)}
          />
          <Dialog
            title="Delete application"
            description="This dialog can be used to delete an existing application"
            content="Deleting this application will cause any subscribing groups to be unsubscribed and all feature access to be revoked until a new application is created with the same identifier"
            isOpen={deleteApplicationOpen}
            close={() => setDeleteApplicationOpen(false)}
            positiveActions={[() => deleteApplication(application.id)]}
          />
        </div>
      </TableRowItem>
    </TableRow>
  )
}

export default ApplicationTableRow