import { Fragment } from "react";
import { ClientRow, Header } from ".";
import { SpinnerIcon } from "../..";
import { IClientTableProps } from "../../../models";
import { ClientPrompter } from "../Common";
import InteractiveHeader from "./InteractiveHeader";

const ClientTable = ({
  clients,
  totalClients,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  headers,
  isLoading
}: IClientTableProps) => {

  return (
    <div className="relative shadow overflow-x-scroll md:overflow-x-auto rounded-md">
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
        <Fragment>
          {clients && totalClients > 0 ? (
            <tbody className="divide-y divide-gray-700">
                {clients.map((c) => (
                  <ClientRow client={c} key={c._id} />
                ))}
            </tbody>
          ) : (
            <ClientPrompter />
          )}
        </Fragment>
      </table>
      {isLoading && (
        <div className="absolute left-0 top-0 rounded-md w-full h-full bg-gray-800 flex flex-grow justify-center pt-24 bg-opacity-20">
          <SpinnerIcon className="text-white h-12 w-12" />
        </div>
      )}
    </div>
  )
}

export default ClientTable;