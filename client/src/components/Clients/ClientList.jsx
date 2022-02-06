import { SearchIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { Fetch, SearchBar, SpinnerIcon } from '..';
import { endpoints, useFetch, requestHelper } from '../../utilities';
import { Paginator, Selector } from '..';
import { ClientTable } from './ClientTable';

const filterOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Assignee', value: 'assignee' },
  { label: 'Last Visit', value: 'lastVisit' },
  { label: 'Date of Birth', value: 'dateOfBirth' },
]

const headers = [
  { name: "Name", value: "name" },
  { name: "Last updated", value: "lastUpdated" },
  { name: "Sessions", value: "sessions" },
]

const ClientList = ({ userGroup }) => {

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filter, setFilter] = useState(filterOptions[0]);
  const [filterValue, setFilterValue] = useState(null);

  const [sortField, setSortField] = useState(headers[1].value);
  const [sortDirection, setSortDirection] = useState("descending");

  const query = `pageNumber=${pageNumber}&pageSize=${pageSize}&groupname=${userGroup && userGroup.groupname}&${filter.value}=${filterValue}&sortField=${sortField}&sortDirection=${sortDirection}`;

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.clients}?${query}`, requestHelper.requestBuilder("GET"), [pageSize, pageNumber, filter, filterValue])}
      render={({ response, error, isLoading }) => (
        <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
          {isLoading && (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          )}
          <div className="flex flex-col flex-grow space-y-4">
            <SearchBar
              filter={filter}
              setFilter={setFilter}
              setFilterValue={setFilterValue}
              filterOptions={filterOptions}
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
          {response && !isLoading && (
            <Paginator pageNumber={pageNumber} pageSize={pageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} totalClients={response.totalClients} />
          )}
        </div>
      )
      }
    />
  )
}

export default ClientList;