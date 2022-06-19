import { createContext, useCallback, useEffect, useState } from "react";
import { IChildrenProps, IFetch, ISchedule, IScheduleContext, ISchedulesResponse } from "../models";
import { useFetch, useGroupService, useRefresh, useRequestBuilder, useRotaService } from "../hooks";
import { endpoints } from "../config";

export const ScheduleContext = createContext<IScheduleContext>({
  getSchedules: () => [],
  setSchedules: () => {},
  getCount: () => 0,
  isLoading: false,
  error: undefined,
  refresh: () => {},
  dependency: false
});

export const ScheduleProvider = ({ children }: IChildrenProps) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([])
  const [count, setCount] = useState<number>(0)

  const { currentGroup, refresh: groupRefresh } = useGroupService()
  const { rotaId, dependency: rotaDependency } = useRotaService()

  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh([groupRefresh])
  const { response, isLoading, error }: IFetch<ISchedulesResponse> = useFetch(endpoints.schedules(rotaId || "", currentGroup?._id || ""), requestBuilder(), [rotaDependency, dependency, rotaId, currentGroup])

  useEffect(() => {
    if (response) {
      setSchedules(response.schedules)
      setCount(response.count)
    }
  }, [response])

  const contextValue = {
    getSchedules: useCallback(() => schedules, [schedules]),
    setSchedules,
    getCount: useCallback(() => count, [count]),
    isLoading,
    error,
    refresh,
    dependency
  }

  return (
    <ScheduleContext.Provider value={contextValue}>
      {children}
    </ScheduleContext.Provider>
  )
} 