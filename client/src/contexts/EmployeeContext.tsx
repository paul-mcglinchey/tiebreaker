import { createContext, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IEmployee, IEmployeesResponse } from "../models";
import { useFetch, useGroupService, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { IEmployeeContext } from "./interfaces";
import { SortDirection } from "../enums";

export const EmployeeContext = createContext<IEmployeeContext>({
  employees: [],
  setEmployees: () => {},
  count: 0,
  setCount: () => {},
  sortField: undefined,
  setSortField: () => {},
  sortDirection: SortDirection.Desc,
  setSortDirection: () => {},
  isLoading: false,
  error: undefined
});

export const EmployeeProvider = ({ children }: IChildrenProps) => {
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [count, setCount] = useState<number>(0)

  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

  const { currentGroup } = useGroupService()
  const { requestBuilder } = useRequestBuilder()
  const { response, isLoading, error }: IFetch<IEmployeesResponse> = useFetch(endpoints.employees(currentGroup?._id || ""), requestBuilder(), [sortField, sortDirection, currentGroup])

  useEffect(() => {
    if (response) {
      setEmployees(response.employees)
      setCount(response.count)
    }
  }, [response])

  const contextValue = {
    employees,
    setEmployees,
    count,
    setCount,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    isLoading,
    error
  }

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  )
} 