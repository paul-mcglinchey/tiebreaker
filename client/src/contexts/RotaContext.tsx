import { createContext, useCallback, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IRota, IRotaContext, IRotasResponse, SortDirection } from "../models";
import { useFetch, useGroupService, useRefresh, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";

export const RotaContext = createContext<IRotaContext>({
  getRotas: () => [],
  getCount: () => 0,
  rotaId: undefined,
  updateRotaId: () => {},
  sortField: undefined,
  updateSortField: () => {},
  sortDirection: SortDirection.Desc,
  updateSortDirection: () => {},
  isLoading: false,
  error: undefined,
  refresh: () => {},
  dependency: false
});

export const RotaProvider = ({ children }: IChildrenProps) => {
  const [rotaId, setRotaId] = useState<string | undefined>(undefined)
  const [rotas, setRotas] = useState<IRota[]>([])
  const [count, setCount] = useState<number>(0)

  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

  const { groupId, refresh: groupRefresh } = useGroupService()
  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh([groupRefresh])
  const { response, isLoading, error }: IFetch<IRotasResponse> = useFetch(endpoints.rotas(groupId), requestBuilder(), [dependency, sortField, sortDirection, groupId])

  useEffect(() => {
    if (response) {
      setRotas(response.rotas)
      setCount(response.count)
    }
  }, [response])

  const contextValue = {
    getRotas: useCallback(() => rotas, [rotas]),
    getCount: useCallback(() => count, [count]),
    rotaId,
    updateRotaId: useCallback((rotaId: string | undefined) => setRotaId(rotaId), []),  
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
    <RotaContext.Provider value={contextValue}>
      {children}
    </RotaContext.Provider>
  )
} 