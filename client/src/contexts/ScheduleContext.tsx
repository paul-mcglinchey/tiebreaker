import { createContext, useCallback, useEffect, useState } from "react";
import { IChildrenProps, IFetch, ISchedule, ISchedulesResponse } from "../models";
import { useFetch, useGroupService, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { IScheduleContext } from "./interfaces";

interface IScheduleProviderProps {
  rotaId: string | undefined
}

export const ScheduleContext = createContext<IScheduleContext>({
  getSchedules: () => [],
  setSchedules: () => {},
  getCount: () => 0,
  isLoading: false,
  error: undefined
});

export const ScheduleProvider = ({ rotaId, children }: IScheduleProviderProps & IChildrenProps) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([])
  const [count, setCount] = useState<number>(0)

  const { currentGroup } = useGroupService()

  const { requestBuilder } = useRequestBuilder()
  const { response, isLoading, error }: IFetch<ISchedulesResponse> = useFetch(endpoints.schedules(rotaId || "", currentGroup?.id || ""), requestBuilder(), [rotaId, currentGroup])

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
    error
  }

  return (
    <ScheduleContext.Provider value={contextValue}>
      {children}
    </ScheduleContext.Provider>
  )
} 