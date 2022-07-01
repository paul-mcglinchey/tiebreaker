import { Dispatch, SetStateAction } from "react"
import { IEmployee, SortDirection } from "."

export interface IEmployeeContext {
  employees: IEmployee[]
  setEmployees: Dispatch<SetStateAction<IEmployee[]>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
  sortField: string | undefined
  setSortField: Dispatch<SetStateAction<string | undefined>>
  sortDirection: SortDirection
  setSortDirection: Dispatch<SetStateAction<SortDirection>>
  isLoading: boolean
  error: any | undefined
  refresh: () => void
  dependency: boolean
}