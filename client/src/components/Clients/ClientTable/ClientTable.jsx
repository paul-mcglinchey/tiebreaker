import { ClientRow, Header } from ".";
import { ClientPrompter } from "..";

const ClientTable = ({ clients, totalClients, userGroup, sortField, setSortField, sortDirection, setSortDirection, headers }) => {

  return (
    <div className="shadow overflow-hidden sm:rounded-md">
      <table className="min-w-full">
        <thead className="bg-gray-800">
          <tr>
            {headers.map((h, i) => (
              <Header sortField={sortField} sortDirection={sortDirection} setSortField={setSortField} setSortDirection={setSortDirection} key={i} value={h.value}>{h.name}</Header>
            ))}
            <th>
              <span className="sr-only">
                Options
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {clients && (
            totalClients > 0 ? (
              clients.map((c) => (
                <ClientRow client={c} key={c._id} userGroup={userGroup} />
              ))
            ) : (
              <ClientPrompter />
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ClientTable;