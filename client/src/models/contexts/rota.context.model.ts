import { IRota, SortDirection } from ".."

export interface IRotaContext {
  getRotas: () => IRota[]
  getCount: () => number
  rotaId: string | undefined
  updateRotaId: (rotaId: string | undefined) => void 
  sortField: string | undefined
  updateSortField: (sortField: string) => void
  sortDirection: SortDirection
  updateSortDirection: (sortDirection: SortDirection) => void
  isLoading: boolean
  error: any | undefined
  refresh: () => void
  dependency: boolean
}