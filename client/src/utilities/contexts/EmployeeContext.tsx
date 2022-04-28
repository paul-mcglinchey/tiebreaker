import { createContext, useCallback, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IEmployee, IEmployeesResponse, SortDirection, IEmployeeContext } from "../../models";
import { useFetch, useGroupService, useRefresh, useRequestBuilder } from "../../hooks";
import { endpoints } from "../config";

export const EmployeeContext = createContext<IEmployeeContext>({
  getEmployees: () => [],
  getAllEmployees: () => [],
  getCount: () => 0,
  sortField: undefined,
  updateSortField: () => {},
  sortDirection: SortDirection.Desc,
  updateSortDirection: () => {},
  isLoading: false,
  error: undefined,
  refresh: () => {},
  dependency: false
});

export const EmployeeProvider = ({ children }: IChildrenProps) => {
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [count, setCount] = useState<number>(0)

  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

  const { groupId, refresh: groupRefresh } = useGroupService()
  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh([groupRefresh])
  const { response, isLoading, error }: IFetch<IEmployeesResponse> = useFetch(endpoints.employees(groupId), requestBuilder(), [dependency, sortField, sortDirection, groupId])

  useEffect(() => {
    if (response) {
      setEmployees(response.employees)
      setCount(response.count)
    }
  }, [response])

  const contextValue = {
    getEmployees: useCallback(() => employees.filter((e: IEmployee) => !e.deleted), [employees]),
    getAllEmployees: useCallback(() => employees, [employees]),
    getCount: useCallback(() => count, [count]),
    sortField,
    updateSortField: useCallback((sortField: string) => setSortField(sortField), []),
    sortDirection,
    updateSortDirection: useCallback((sortDirection: SortDirection) => setSortDirection(sortDirection), []),
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