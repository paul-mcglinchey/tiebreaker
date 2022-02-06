import { Link } from 'react-router-dom';
import { InlineButton, RowItem } from '.';

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
        <div className="flex items-center space-x-4">
          <span>
            {new Date(client.updatedAt).toLocaleDateString()}
          </span>
          {client.updatedBy && (
            <span className="font-medium px-2 bg-gray-800 tracking-wide rounded-lg">
              {client.updatedBy.name}
            </span>
          )}
        </div>
      </RowItem>
      <RowItem>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{client.sessions.length}</span>
          <Link to={`/clients/${client._id}/newsession`}>
            <InlineButton color="text-green-500" title="Add" />
          </Link>
        </div>
      </RowItem>
      <RowItem>
        <div className="flex items-center space-x-2 justify-end">
          <InlineButton color="text-blue-500" title="Edit" />
          <InlineButton color="text-red-500" title="Delete" />
        </div>
      </RowItem>
    </tr>
  )
}

export default ClientRow;