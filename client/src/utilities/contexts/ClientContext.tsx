import { createContext, useCallback, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IClient, IClientsResponse, SortDirection, IClientContext, IFilter } from "../../models";
import { useFetch, useGroupService, useRefresh, useRequestBuilder } from "../../hooks";
import { endpoints } from "../config";
import { getItemInLocalStorage, setItemInLocalStorage } from "../../services";

interface IClientProviderProps extends IChildrenProps {
  includeDeleted?: boolean
}

export const ClientContext = createContext<IClientContext>({
  getClients: () => [],
  getCount: () => 0,
  sortField: undefined,
  setSortField: () => {},
  sortDirection: SortDirection.Desc,
  setSortDirection: () => {},
  pageNumber: 1,
  updatePageNumber: () => {},
  pageSize: 10,
  updatePageSize: () => {},
  filters: {},
  setFilters: () => {},
  isLoading: false,
  error: undefined,
  refresh: () => {},
  dependency: false
});

const buildQueryString = (pageNumber: number, pageSize: number, sortField: string | undefined, sortDirection: SortDirection, filters: IFilter) => {
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

export const ClientProvider = ({ includeDeleted = false, children }: IClientProviderProps) => {
  const [clients, setClients] = useState<IClient[]>([])
  const [count, setCount] = useState<number>(0)

  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)
  const [pageNumber, setPageNumber] = useState<number>(parseInt(getItemInLocalStorage('clientlist-pagenumber') || "1"));
  const [pageSize, setPageSize] = useState<number>(parseInt(getItemInLocalStorage('clientlist-pagesize') || "10"));

  const [filters, setFilters] = useState<IFilter>({
    'name': { value: null, label: 'Name' }
  });

  const { groupId, refresh: groupRefresh } = useGroupService()
  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh([groupRefresh])
  const { 
    response, 
    isLoading,
    error 
  }: IFetch<IClientsResponse> = useFetch(
    `${endpoints.clients(groupId, includeDeleted)}?${buildQueryString(pageNumber, pageSize, sortField, sortDirection, filters)}`, 
    requestBuilder(), 
    [dependency, sortField, sortDirection, pageSize, pageNumber, groupId]
  )

  useEffect(() => {
    if (response) {
      setClients(response.clients)
      setCount(response.count)
    }
  }, [response])

  const updatePageNumber = useCallback((pageNumber: number) => {
    setItemInLocalStorage('clientlist-pagenumber', pageNumber)
    setPageNumber(pageNumber)
  }, [])

  const updatePageSize = useCallback((pageSize: number) => {
    setItemInLocalStorage('clientlist-pagesize', pageSize)
    setPageSize(pageSize)
  }, [])

  const contextValue = {
    getClients: useCallback(() => clients, [clients]),
    getCount: useCallback(() => count, [count]),
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    pageNumber,
    updatePageNumber,
    pageSize,
    updatePageSize,
    filters,
    setFilters,
    isLoading,
    error,
    refresh,
    dependency
  }

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  )
} 