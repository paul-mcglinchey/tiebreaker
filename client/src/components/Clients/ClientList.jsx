import { Fragment, useState } from 'react';
import { Fetch, SearchBar, SpinnerIcon } from '..';
import { endpoints, useFetch, requestHelper } from '../../utilities';
import { Paginator } from '..';
import { ClientTable } from './ClientTable';
import { ClientPrompter } from '.';

const headers = [
  { name: "Name", value: "clientName", interactive: true },
  { name: "Last updated", value: "updatedAt", interactive: true },
  { name: "Sessions", value: "sessions", interactive: true },
  { name: "Options", value: "", interactive: false },
]

const ClientList = ({ userGroup }) => {

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortField, setSortField] = useState(headers[1].value);
  const [sortDirection, setSortDirection] = useState("descending");

  const [filters, setFilters] = useState({
    'clientName': { value: null, label: 'Name' }
  });

  const buildQueryString = () => {
    
    var queryString = "";

    queryString += `pageNumber=${pageNumber}&pageSize=${pageSize}&`;
    queryString += `groupName=${userGroup && userGroup.groupName}&`;
    queryString += `sortField=${sortField}&sortDirection=${sortDirection}&`

    for (var key in filters) {
      if (filters[key].value) {
        queryString += `${key}=${filters[key].value}&`
      }
    }

    return queryString;
  }

  return (
    <Fetch
      fetchOutput={useFetch(
        `${endpoints.clients}?${buildQueryString()}`, 
        requestHelper.requestBuilder("GET"), 
        [pageSize, pageNumber, filters, sortField, sortDirection]
      )}
      render={({ response, error, isLoading }) => (
        <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          ) : (
            response && response.totalClients > 0 ? (
              <Fragment>
                <div className="flex flex-col flex-grow space-y-4">
                  <SearchBar
                    filters={filters}
                    setFilters={setFilters}
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
                  />
                </div>
                <Paginator pageNumber={pageNumber} pageSize={pageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} totalClients={response.totalClients} />
              </Fragment>
            ) : (
              <ClientPrompter />
            )
          )}
        </div>
      )
      }
    />
  )
}

export default ClientList;