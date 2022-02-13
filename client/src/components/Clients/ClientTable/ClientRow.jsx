import { RowItem } from '.';
import { ViewGridAddIcon } from '@heroicons/react/outline';
import InlineLink from './InlineLink';
import { Fragment, useState } from 'react';

const ClientRow = ({ client, userGroup }) => {

  const [isDeleteClientOpen, setIsDeleteClientOpen] = useState(false);
  const toggleDeleteClientOpen = () => setIsDeleteClientOpen(!isDeleteClientOpen);

  return (
    <Fragment>
      <tr className="bg-gray-900 border-gray-700">
        <RowItem>
          <div className="flex items-center">
            <div className="">
              <div className="text-sm font-medium text-white">{client.clientName.firstName} {client.clientName.lastName}</div>
              <div className="text-sm">{client.contactInfo.primaryEmail}</div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <div className="flex items-center space-x-4 min-w-40">
            <span>
              {new Date(client.updatedAt).toLocaleDateString()}
            </span>
            {client.updatedBy && (
              <span className="font-medium px-2 bg-gray-800 tracking-wide rounded-lg select-none">
                {client.updatedBy.name}
              </span>
            )}
          </div>
        </RowItem>
        <RowItem>
          <div className="flex flex-grow items-center justify-start">
            {client.sessions.length > 0 ? (
              <InlineLink to={`/clients/${client._id}/addsession`} color="text-amber-400">
                <span>Sessions</span>
                <div className="pr-1">
                  <span className="text-center text-lg">{client.sessions.length}</span>
                </div>
              </InlineLink>
            ) : (
              <InlineLink to={`/clients/${client._id}/addsession`} color="text-green-500">
                <div className="whitespace-nowrap">Add session</div>
                <ViewGridAddIcon className="w-6 h-6" />
              </InlineLink>
            )}
          </div>
        </RowItem>
        <RowItem>
          <div className="flex items-center space-x-2 justify-end">
            <InlineLink to={`/clients/${client._id}`} color="text-gray-500">View</InlineLink>
            <InlineLink to={`/clients/${client._id}/edit`} color="text-blue-500">Edit</InlineLink>
          </div>
        </RowItem>
      </tr>
    </Fragment>
  )
}

export default ClientRow;