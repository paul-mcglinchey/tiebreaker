import { createContext, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IRota, IRotasResponse } from "../models";
import { useFetch, useGroupService, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { IRotaContext } from "./interfaces";
import { SortDirection } from "../enums";

export const RotaContext = createContext<IRotaContext>({
  rotas: [],
  setRotas: () => {},
  count: 0,
  rotaId: undefined,
  setRotaId: () => {},
  sortField: undefined,
  setSortField: () => {},
  sortDirection: SortDirection.Desc,
  setSortDirection: () => {},
  isLoading: false,
  error: undefined
});

export const RotaProvider = ({ children }: IChildrenProps) => {
  const [rotaId, setRotaId] = useState<string | undefined>(undefined)
  const [rotas, setRotas] = useState<IRota[]>([])
  const [count, setCount] = useState<number>(0)

  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

  const { currentGroup } = useGroupService()
  const { requestBuilder } = useRequestBuilder()
  const { response, isLoading, error }: IFetch<IRotasResponse> = useFetch(endpoints.rotas(currentGroup?._id || ""), requestBuilder(), [sortField, sortDirection, currentGroup])

  useEffect(() => {
    if (response) {
      setRotas(response.rotas)
      setCount(response.count)
    }
  }, [response])

  const contextValue = {
    rotas,
    setRotas,
    count,
    rotaId,
    setRotaId, 
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    isLoading,
    error
  }

  return (
    <RotaContext.Provider value={contextValue}>
      {children}
    </RotaContext.Provider>
  )
} 