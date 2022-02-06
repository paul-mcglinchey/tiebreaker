import { ClientOptions } from '.';
import { RowItem } from './Table';

const ClientRow = ({ client, userGroup }) => {
  return (
    <tr>
      <RowItem>
        <div className="flex items-center">
          <div className="">
            <div className="text-sm font-medium text-gray-900">{client.clientName.firstName} {client.clientName.lastName}</div>
            <div className="text-sm text-gray-500">{client.contactInfo.primaryEmail}</div>
          </div>
        </div>
      </RowItem>
      <RowItem>{client.clientName.firstName} {client.clientName.lastName}</RowItem>
      <RowItem>{client.clientName.firstName} {client.clientName.lastName}</RowItem>
      <RowItem>{client.clientName.firstName} {client.clientName.lastName}</RowItem>
    </tr>
  )
}

export default ClientRow;