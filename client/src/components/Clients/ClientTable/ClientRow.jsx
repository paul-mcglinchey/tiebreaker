import { Link } from 'react-router-dom';
import { InlineButton, RowItem } from '.';
import { ViewGridAddIcon } from '@heroicons/react/outline';
import InlineLink from './InlineLink';

const ClientRow = ({ client, userGroup }) => {
  return (
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
            <InlineLink to={`/clients/${client._id}/newsession`} color="text-amber-400">
              <span>Sessions</span>
              <div className="pr-1">
                <span className="text-center text-lg">{client.sessions.length}</span>
              </div>
            </InlineLink>
          ) : (
            <InlineLink to={`/clients/${client._id}/newsession`} color="text-green-500">
              <div className="whitespace-nowrap">Add session</div>
              <ViewGridAddIcon className="w-6 h-6" />
            </InlineLink>
          )}
        </div>
      </RowItem>
      <RowItem>
        <div className="flex items-center space-x-2 justify-end">
          <InlineButton color="text-blue-500">Edit</InlineButton>
          <InlineButton color="text-red-500">Delete</InlineButton>
        </div>
      </RowItem>
    </tr>
  )
}

export default ClientRow;