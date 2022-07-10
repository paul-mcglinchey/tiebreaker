import { Dispatch, SetStateAction } from "react"
import { IRota } from '../../models'
import { SortDirection } from "../../enums"

export interface IRotaContext {
  rotas: IRota[]
  setRotas: Dispatch<SetStateAction<IRota[]>>
  count: number
  rotaId: string | undefined
  setRotaId: Dispatch<SetStateAction<string | undefined>>
  sortField: string | undefined
  setSortField: Dispatch<SetStateAction<string | undefined>>
  sortDirection: SortDirection
  setSortDirection: Dispatch<SetStateAction<SortDirection>>
  isLoading: boolean
  error: any | undefined
}