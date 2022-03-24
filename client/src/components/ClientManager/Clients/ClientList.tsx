import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { SearchBar } from '../..';
import { Paginator } from '../..';
import { ClientTable } from './ClientTable';
import { ClientPrompter } from '.';
import { ApplicationContext, endpoints } from '../../../utilities';
import { requestBuilder } from '../../../services';
import { IClient, IClientsResponse, IFilter } from '../../../models';

const headers = [
  { name: "Name", value: "clientName", interactive: true },
  { name: "Last updated", value: "updatedAt", interactive: true },
  { name: "Sessions", value: "sessions", interactive: true },
  { name: "Options", value: "", interactive: false },
]

const ClientList = () => {
  
  const abortController = new AbortController();
  const signal = abortController.signal;

  const componentIsMounted = useRef(true);
  const { clientGroup } = useContext(ApplicationContext);

  const [clients, setClients] = useState<IClient[]>([]);
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<Object | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    queryString += `groupName=${clientGroup && clientGroup.groupName}&`;
    queryString += `sortField=${sortField}&sortDirection=${sortDirection}&`

    for (var key in filters) {
      if (filters[key]!.value) {
        queryString += `${key}=${filters[key]!.value}&`
      }
    }

    return queryString;
  }

  useEffect(() => {
    const _fetch = async () => {

      if (componentIsMounted) setIsLoading(true);

      await fetch(`${endpoints.clients}?${buildQueryString()}`, { ...requestBuilder("GET"), signal: signal })
        .then(res => res.json())
        .then((json: IClientsResponse) => {
          if (componentIsMounted) setCount(json.totalClients);
          if (componentIsMounted) setClients(json.clients);
        })
        .catch(err => {
          if (componentIsMounted) setError(err);
        })
        .finally(() => {
          if (componentIsMounted) setIsLoading(false);
        })
    }

    componentIsMounted && _fetch();

    return () => {
      abortController.abort();
      componentIsMounted.current = false;
    }
  }, [pageSize, pageNumber, filters, sortField, sortDirection])

  return (
        <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
            {count > 0 && !error ? (
              <Fragment>
                <div className="flex flex-col flex-grow space-y-4">
                  <SearchBar
                    filters={filters}
                    setFilters={setFilters}
                    searchField='clientName'
                  />
                  <ClientTable
                    clients={clients}
                    totalClients={count}
                    sortField={sortField}
                    setSortField={setSortField}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    headers={headers}
                    isLoading={isLoading}
                  />
                </div>
                <Paginator pageNumber={pageNumber} pageSize={pageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} totalClients={count} />
              </Fragment>
            ) : (
              <ClientPrompter />
            )}
        </div>
  )
}

export default ClientList;