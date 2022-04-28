import { Fragment } from 'react';
import { IClient } from '../../../models';
import { useClientService } from '../../../hooks';
import { ClientTableRow } from '.';
import { Paginator, Table, Prompter, SearchBar } from '../../Common';
import { UserAddIcon } from '@heroicons/react/solid';

const headers = [
  { name: "Name", value: "name", interactive: true },
  { name: "Last updated", value: "updatedAt", interactive: true },
  { name: "Sessions", value: "sessions", interactive: true },
  { name: "Options", value: "", interactive: false },
]

interface IClientListProps {
  toggleAddClientOpen: () => void
}

const ClientList = ({ toggleAddClientOpen }: IClientListProps) => {

  const { getClients, getCount, filters, setFilters, sortField, setSortField, sortDirection, setSortDirection, isLoading, pageNumber, updatePageNumber, pageSize, updatePageSize } = useClientService()
  const clients = getClients()

  return (
    <div className="rounded-lg flex flex-col space-y-0 pb-2">
      {getCount() > 0 ? (
        <Fragment>
          <div className="flex flex-col flex-grow space-y-4">
            <SearchBar
              filters={filters}
              setFilters={setFilters}
              searchField='name'
            />
            <Table
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              headers={headers}
              isLoading={isLoading}
            >
              <>
                {clients.map((c: IClient, index: number) => (
                  <ClientTableRow client={c} key={index} />
                ))}
              </>
            </Table>
          </div>
          <Paginator pageNumber={pageNumber} pageSize={pageSize} setPageNumber={updatePageNumber} setPageSize={updatePageSize} totalClients={getCount()} />
        </Fragment>
      ) : (
        !isLoading && (
          <Prompter title="Add a client to get started" Icon={UserAddIcon} action={toggleAddClientOpen} />
        )
      )}
    </div>
  )
}

export default ClientList;