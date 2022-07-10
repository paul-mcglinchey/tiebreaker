import { Dispatch, SetStateAction } from "react"
import { IClient, IFilter, ISortable } from '../../models'

export interface IClientContext extends ISortable {
  clients: IClient[]
  setClients: Dispatch<SetStateAction<IClient[]>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
  pageNumber: number,
  setPageNumber: Dispatch<SetStateAction<number>>,
  pageSize: number,
  setPageSize: Dispatch<SetStateAction<number>>,
  filters: IFilter,
  setFilters: (filters: IFilter) => void,
  isLoading: boolean
  error: any | undefined
}