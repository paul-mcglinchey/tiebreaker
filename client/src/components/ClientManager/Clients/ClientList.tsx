import { Fragment, useState } from 'react';
import { endpoints } from '../../../utilities';
import { IClient, IClientsResponse, IFetch, IFilter, SortDirection } from '../../../models';
import { useFetch, useGroupService, useRequestBuilder } from '../../../hooks';
import { ClientTableRow } from '.';
import { Paginator, Table, Fetch, Prompter, SearchBar } from '../../Common';
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

  const { groupId } = useGroupService();
  const { requestBuilder } = useRequestBuilder();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortField, setSortField] = useState(headers[1]!.value);
  const [sortDirection, setSortDirection] = useState(SortDirection.Desc);

  const [filters, setFilters] = useState<IFilter>({
    'name': { value: null, label: 'Name' }
  });

  const buildQueryString = () => {

    var queryString = "";

    queryString += `pageNumber=${pageNumber}&pageSize=${pageSize}&`;
    queryString += `sortField=${sortField}&sortDirection=${sortDirection}`

    for (var key in filters) {
      if (filters[key]!.value) {
        queryString += `&${key}=${filters[key]!.value}`
      }
    }

    return queryString;
  }

  return (
    <Fetch
      fetchOutput={useFetch(
        groupId && `${endpoints.clients(groupId)}?${buildQueryString()}`, 
        requestBuilder(), 
        [pageSize, pageNumber, filters, sortField, sortDirection, groupId]
      )}
      render={({ response, isLoading }: IFetch<IClientsResponse>) => (
        <div className="rounded-lg flex flex-col space-y-0 pb-2">
          {response && response.count > 0 ? (
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
                    {response.clients.map((c: IClient, index: number) => (
                      <ClientTableRow client={c} key={index} />
                    ))}
                  </>
                </Table>
              </div>
              <Paginator pageNumber={pageNumber} pageSize={pageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} totalClients={response.count} />
            </Fragment>
          ) : (
            !isLoading && (
              <Prompter title="Add a client to get started" Icon={UserAddIcon} action={toggleAddClientOpen} />
            )
          )}
        </div>
      )}
    />
  )
}

export default ClientList;