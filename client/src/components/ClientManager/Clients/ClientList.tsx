import { Fragment, useContext, useState } from 'react';
import { ClientTable } from './ClientTable';
import { ClientPrompter } from '.';
import { ApplicationContext, endpoints } from '../../../utilities';
import { requestBuilder } from '../../../services';
import { IClientsResponse, IFetch, IFilter } from '../../../models';
import { Fetch, Modal } from '../..';
import { useFetch, useRefresh } from '../../../hooks';
import { SearchBar } from './Common';
import { Paginator } from '../../Common';

const headers = [
  { name: "Name", value: "clientName", interactive: true },
  { name: "Last updated", value: "updatedAt", interactive: true },
  { name: "Sessions", value: "sessions", interactive: true },
  { name: "Options", value: "", interactive: false },
]

const ClientList = () => {

  const { clientGroup } = useContext(ApplicationContext);
  const { dependency } = useRefresh();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortField, setSortField] = useState(headers[1]!.value);
  const [sortDirection, setSortDirection] = useState("descending");

  const [addClientOpen, setAddClientOpen] = useState(false);
  const toggleAddClientOpen = () => setAddClientOpen(!addClientOpen);

  const [filters, setFilters] = useState<IFilter>({
    'clientName': { value: null, label: 'Name' }
  });

  const buildQueryString = () => {

    var queryString = "";

    queryString += `pageNumber=${pageNumber}&pageSize=${pageSize}&`;
    queryString += `sortField=${sortField}&sortDirection=${sortDirection}`

    for (var key in filters) {
      if (filters[key]!.value) {
        queryString += `&${key}=${filters[key]!.value}&`
      }
    }

    return queryString;
  }

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.clients((clientGroup && clientGroup._id) || "")}&${buildQueryString()}`, requestBuilder("GET"), [pageSize, pageNumber, filters, sortField, sortDirection, clientGroup, dependency])}
      render={({ response, isLoading }: IFetch<IClientsResponse>) => (
        <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
          {response && response.count > 0 ? (
            <Fragment>
              <div className="flex flex-col flex-grow space-y-4">
                <SearchBar
                  filters={filters}
                  setFilters={setFilters}
                  searchField='clientName'
                />
                <ClientTable
                  clients={response.clients}
                  sortField={sortField}
                  setSortField={setSortField}
                  sortDirection={sortDirection}
                  setSortDirection={setSortDirection}
                  headers={headers}
                  isLoading={isLoading}
                />
              </div>
              <Paginator pageNumber={pageNumber} pageSize={pageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} totalClients={response.count} />
            </Fragment>
          ) : (
            !isLoading && (
              <ClientPrompter action={toggleAddClientOpen} />
            )
          )}
          <Modal title="Add client" modalOpen={addClientOpen} toggleModalOpen={toggleAddClientOpen}>

          </Modal>
        </div>
      )}
    />
  )
}

export default ClientList;