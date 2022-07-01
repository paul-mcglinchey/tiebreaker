import { Dispatch, Fragment, SetStateAction } from 'react';
import { UserAddIcon } from '@heroicons/react/solid';
import { IClient } from '../../models';
import { useClientService } from '../../hooks';
import { Paginator, Table, Prompter, SearchBar } from '../Common';
import { ClientTableRow } from '.';

const headers = [
  { name: "Name", value: "name", interactive: true },
  { name: "Last updated", value: "updatedAt", interactive: true },
  { name: "Sessions", value: "sessions", interactive: true },
  { name: "Options", value: "", interactive: false },
]

interface IClientListProps {
  setAddClientOpen: Dispatch<SetStateAction<boolean>>
}

const ClientList = ({ setAddClientOpen }: IClientListProps) => {

  const { clients, count, filters, setFilters, sortField, setSortField, sortDirection, setSortDirection, isLoading, pageNumber, setPageNumber, pageSize, setPageSize } = useClientService()

  return (
    <div className="rounded-lg flex flex-col space-y-0 pb-2">
      {count > 0 ? (
        <Fragment>
          <div className="flex flex-col flex-grow space-y-4">
            <SearchBar
              filters={filters}
              setFilters={setFilters}
              searchField='name'
            />
            <Table isLoading={isLoading}>
              <Table.SortableHeader headers={headers} sortField={sortField} setSortField={setSortField} sortDirection={sortDirection} setSortDirection={setSortDirection} />
              <Table.Body>
                {clients.map((c: IClient, index: number) => (
                  <ClientTableRow client={c} key={index} />
                ))}
              </Table.Body>
            </Table>
          </div>
          <Paginator pageNumber={pageNumber} pageSize={pageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} totalItems={count} />
        </Fragment>
      ) : (
        !isLoading && (
          <Prompter title="Add a client to get started" Icon={UserAddIcon} action={() => setAddClientOpen(true)} />
        )
      )}
    </div>
  )
}

export default ClientList;