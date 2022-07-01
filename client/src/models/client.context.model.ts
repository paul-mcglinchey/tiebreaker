import { Dispatch, SetStateAction } from "react"
import { IClient, SortDirection, IFilter } from "."

export interface IClientContext {
  clients: IClient[]
  setClients: Dispatch<SetStateAction<IClient[]>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
  sortField: string | undefined
  setSortField: (sortField: string | undefined) => void
  sortDirection: SortDirection
  setSortDirection: (sortDirection: SortDirection) => void
  pageNumber: number,
  setPageNumber: Dispatch<SetStateAction<number>>,
  pageSize: number,
  setPageSize: Dispatch<SetStateAction<number>>,
  filters: IFilter,
  setFilters: (filters: IFilter) => void,
  isLoading: boolean
  error: any | undefined
  refresh: () => void
  dependency: boolean
}