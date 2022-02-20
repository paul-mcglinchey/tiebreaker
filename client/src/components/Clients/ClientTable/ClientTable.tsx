import { ClientRow, Header } from ".";
import { IClientTableProps } from "../../../models";
import { ClientPrompter } from "../Common";
import InteractiveHeader from "./InteractiveHeader";

const ClientTable = ({ 
  clients, 
  totalClients, 
  userGroup, 
  sortField, 
  setSortField, 
  sortDirection, 
  setSortDirection, 
  headers 
}: IClientTableProps) => {

  return (
    <div className="shadow overflow-x-scroll md:overflow-x-auto sm:rounded-md">
      <table className="min-w-full">
        <thead className="bg-gray-800">
          <tr>
            {headers.map((h, i) => (
              <Header key={i}>
                {h.interactive ? (
                  <InteractiveHeader sortField={sortField} sortDirection={sortDirection} setSortField={setSortField} setSortDirection={setSortDirection} key={i} value={h.value}>
                    {h.name}
                  </InteractiveHeader>
                ) : (
                  <span>
                    {h.value}
                  </span>
                )}
              </Header>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {clients && (
            totalClients > 0 ? (
              clients.map((c) => (
                <ClientRow client={c} key={c._id} />
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