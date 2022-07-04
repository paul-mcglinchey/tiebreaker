import { createContext, useCallback, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IRota, IRotasResponse } from "../models";
import { useFetch, useGroupService, useRefresh, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { IRotaContext } from "./interfaces";
import { SortDirection } from "../enums";

export const RotaContext = createContext<IRotaContext>({
  getRotas: () => [],
  setRotas: () => {},
  getCount: () => 0,
  rotaId: undefined,
  updateRotaId: () => {},
  sortField: undefined,
  setSortField: () => {},
  sortDirection: SortDirection.Desc,
  setSortDirection: () => {},
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

  const { currentGroup, refresh: groupRefresh } = useGroupService()
  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh([groupRefresh])
  const { response, isLoading, error }: IFetch<IRotasResponse> = useFetch(endpoints.rotas(currentGroup?._id || ""), requestBuilder(), [dependency, sortField, sortDirection, currentGroup])

  useEffect(() => {
    if (response) {
      setRotas(response.rotas)
      setCount(response.count)
    }
  }, [response])

  const contextValue = {
    getRotas: useCallback(() => rotas, [rotas]),
    setRotas,
    getCount: useCallback(() => count, [count]),
    rotaId,
    updateRotaId: useCallback((rotaId: string | undefined) => setRotaId(rotaId), []),  
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
    <RotaContext.Provider value={contextValue}>
      {children}
    </RotaContext.Provider>
  )
} 