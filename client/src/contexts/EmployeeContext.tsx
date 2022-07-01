import { createContext, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IEmployee, IEmployeesResponse, SortDirection, IEmployeeContext } from "../models";
import { useFetch, useGroupService, useRefresh, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";

interface IEmployeeProviderProps extends IChildrenProps {
  includeDeleted?: boolean
}

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
  error: undefined,
  refresh: () => {},
  dependency: false
});

export const EmployeeProvider = ({ includeDeleted = false, children }: IEmployeeProviderProps) => {
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [count, setCount] = useState<number>(0)

  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

  const { currentGroup, refresh: groupRefresh } = useGroupService()
  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh([groupRefresh])
  const { response, isLoading, error }: IFetch<IEmployeesResponse> = useFetch(endpoints.employees(currentGroup?._id || "", includeDeleted), requestBuilder(), [dependency, sortField, sortDirection, currentGroup])

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
    error,
    refresh,
    dependency
  }

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  )
} 