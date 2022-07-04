import { Dispatch, SetStateAction } from "react"
import { IEmployee, ISortable } from "../../models"

export interface IEmployeeContext extends ISortable {
  employees: IEmployee[]
  setEmployees: Dispatch<SetStateAction<IEmployee[]>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
  isLoading: boolean
  error: any | undefined
  refresh: () => void
  dependency: boolean
}