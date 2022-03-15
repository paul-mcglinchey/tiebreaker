import { Fragment, useContext, useState } from 'react';
import { Fetch, SearchBar } from '../..';
import { Paginator } from '../..';
import { ClientTable } from './ClientTable';
import { ClientPrompter } from '.';
import { useFetch } from '../../../hooks';
import { ApplicationContext, endpoints } from '../../../utilities';
import { requestBuilder } from '../../../services';
import { IClientsResponse, IFilter } from '../../../models';
import { IFetch } from '../../../models/fetch.model';

const headers = [
  { name: "Name", value: "clientName", interactive: true },
  { name: "Last updated", value: "updatedAt", interactive: true },
  { name: "Sessions", value: "sessions", interactive: true },
  { name: "Options", value: "", interactive: false },
]

const ClientList = () => {

  const { userGroup } = useContext(ApplicationContext);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortField, setSortField] = useState(headers[1]!.value);
  const [sortDirection, setSortDirection] = useState("descending");

  const [filters, setFilters] = useState<IFilter>({
    'clientName': { value: null, label: 'Name' }
  });

  const buildQueryString = () => {
    
    var queryString = "";

    queryString += `pageNumber=${pageNumber}&pageSize=${pageSize}&`;
    queryString += `groupName=${userGroup && userGroup.groupName}&`;
    queryString += `sortField=${sortField}&sortDirection=${sortDirection}&`

    for (var key in filters) {
      if (filters[key]!.value) {
        queryString += `${key}=${filters[key]!.value}&`
      }
    }

    return queryString;
  }

  return (
    <Fetch
      fetchOutput={useFetch(
        `${endpoints.clients}?${buildQueryString()}`, 
        requestBuilder(), 
        [pageSize, pageNumber, filters, sortField, sortDirection, userGroup]
      )}
      render={({ response, isLoading }: IFetch<IClientsResponse>) => (
        <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
            {response && response.totalClients && response.totalClients > 0 ? (
              <Fragment>
                <div className="flex flex-col flex-grow space-y-4">
                  <SearchBar
                    filters={filters}
                    setFilters={setFilters}
                    searchField='clientName'
                  />
                  <ClientTable
                    clients={response.clients}
                    totalClients={response.totalClients}
                    userGroup={userGroup}
                    sortField={sortField}
                    setSortField={setSortField}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    headers={headers}
                    isLoading={isLoading}
                  />
                </div>
                <Paginator pageNumber={pageNumber} pageSize={pageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} totalClients={response.totalClients} />
              </Fragment>
            ) : (
              <ClientPrompter />
            )}
        </div>
      )
      }
    />
  )
}

export default ClientList;