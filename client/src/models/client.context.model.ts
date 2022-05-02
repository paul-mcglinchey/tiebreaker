import { IClient, SortDirection, IFilter } from "."

export interface IClientContext {
  getClients: () => IClient[]
  getCount: () => number
  sortField: string | undefined
  setSortField: (sortField: string) => void
  sortDirection: SortDirection
  setSortDirection: (sortDirection: SortDirection) => void
  pageNumber: number,
  updatePageNumber: (pageNumber: number) => void,
  pageSize: number,
  updatePageSize: (pageSize: number) => void,
  filters: IFilter,
  setFilters: (filters: IFilter) => void,
  isLoading: boolean
  error: any | undefined
  refresh: () => void
  dependency: boolean
}