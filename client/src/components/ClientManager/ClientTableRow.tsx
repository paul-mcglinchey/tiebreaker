import { ViewGridAddIcon } from '@heroicons/react/outline';
import { useUserService } from '../../hooks';
import { IClient } from '../../models';
import { ClientModal, InlineLink, InlineButton, TableRow, TableRowItem } from '..';
import { useState } from 'react';

const ClientTableRow = ({ client }: { client: IClient }) => {

  const [editClientOpen, setEditClientOpen] = useState<boolean>(false)

  const { getUser } = useUserService()

  return (
    <TableRow>
      <TableRowItem>
        <div className="flex flex-col">
          <div className="text-sm font-medium text-white">{client.fullName || "--"}</div>
          <div className="text-sm">{client?.contactInfo?.primaryEmail || "--"}</div>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex items-center space-x-4 min-w-40">
          <span>
            {new Date(client.updatedAt || "").toLocaleDateString()}
          </span>
          <span className="font-medium px-2 bg-gray-800 tracking-wide rounded-lg select-none">
            <div>{getUser(client.audit?.updatedBy)?.username || '--'}</div>
          </span>
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex flex-grow items-center justify-start">
          {(client?.sessions?.length || 0) > 0 ? (
            <InlineLink to={`/clients/${client._id}/addsession`} color="text-amber-400">
              <span className="self-center pt-0.5">Sessions</span>
              <span className="text-lg">{client?.sessions?.length}</span>
            </InlineLink>
          ) : (
            <InlineLink to={`/clients/${client._id}/addsession`} color="text-green-500">
              <div className="whitespace-nowrap">Add session</div>
              <ViewGridAddIcon className="w-6 h-6" />
            </InlineLink>
          )}
        </div>
      </TableRowItem>
      <TableRowItem>
        <div className="flex flex-grow items-center space-x-2 justify-end">
          <InlineLink to={`/clients/${client._id}/view`} color="text-gray-500">View</InlineLink>
          <InlineButton action={() => setEditClientOpen(true)} color="text-blue-500">Edit</InlineButton>
        </div>
        <ClientModal
          isOpen={editClientOpen}
          close={() => setEditClientOpen(false)}
          client={client}
        />
      </TableRowItem>
    </TableRow>
  )
}

export default ClientTableRow;