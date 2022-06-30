import { Dispatch, SetStateAction } from "react"
import { IRota, SortDirection } from "."

export interface IRotaContext {
  getRotas: () => IRota[]
  setRotas: Dispatch<SetStateAction<IRota[]>>
  getCount: () => number
  rotaId: string | undefined
  updateRotaId: (rotaId: string | undefined) => void 
  sortField: string | undefined
  setSortField: Dispatch<SetStateAction<string | undefined>>
  sortDirection: SortDirection
  setSortDirection: Dispatch<SetStateAction<SortDirection>>
  isLoading: boolean
  error: any | undefined
  refresh: () => void
  dependency: boolean
}