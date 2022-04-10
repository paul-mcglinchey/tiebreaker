import { Fragment, useContext, useState } from 'react';
import { ApplicationContext, endpoints } from '../../../utilities';
import { requestBuilder } from '../../../services';
import { IClient, IClientsResponse, IFetch, IFilter } from '../../../models';
import { useFetch } from '../../../hooks';
import { SearchBar, ClientTableRow } from '.';
import { Paginator, Table, Fetch, Prompter } from '../../Common';
import { UserAddIcon } from '@heroicons/react/solid';

const headers = [
  { name: "Name", value: "clientName", interactive: true },
  { name: "Last updated", value: "updatedAt", interactive: true },
  { name: "Sessions", value: "sessions", interactive: true },
  { name: "Options", value: "", interactive: false },
]

interface IClientListProps {
  toggleAddClientOpen: () => void,
  dependency: boolean
}

const ClientList = ({ toggleAddClientOpen, dependency }: IClientListProps) => {

  const { groupId } = useContext(ApplicationContext);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortField, setSortField] = useState(headers[1]!.value);
  const [sortDirection, setSortDirection] = useState("descending");

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
        groupId && `${endpoints.clients(groupId)}&${buildQueryString()}`, 
        requestBuilder("GET"), 
        [pageSize, pageNumber, filters, sortField, sortDirection, groupId, dependency]
      )}
      render={({ response, isLoading }: IFetch<IClientsResponse>) => (
        <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
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