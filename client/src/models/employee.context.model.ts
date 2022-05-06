import { Dispatch, SetStateAction } from "react"
import { IEmployee, SortDirection } from "."

export interface IEmployeeContext {
  getEmployees: () => IEmployee[]
  setEmployees: Dispatch<SetStateAction<IEmployee[]>>
  getCount: () => number
  sortField: string | undefined
  updateSortField: (sortField: string) => void
  sortDirection: SortDirection
  updateSortDirection: (sortDirection: SortDirection) => void
  isLoading: boolean
  error: any | undefined
  refresh: () => void
  dependency: boolean
}