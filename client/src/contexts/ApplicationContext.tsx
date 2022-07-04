import { createContext, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IApplication, IApplicationsResponse } from "../models";
import { useFetch, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { IApplicationContext } from "./interfaces";

export const ApplicationContext = createContext<IApplicationContext>({
  applications: [],
  setApplications: () => {},
  count: 0,
  setCount: () => {},
  isLoading: false
});

export const ApplicationProvider = ({ children }: IChildrenProps) => {
  const [applications, setApplications] = useState<IApplication[]>([])
  const [count, setCount] = useState<number>(0)

  const { requestBuilder } = useRequestBuilder()
  const { response, isLoading }: IFetch<IApplicationsResponse> = useFetch(endpoints.applications, requestBuilder(), [])

  useEffect(() => {
    if (response) {
      setApplications(response.applications)
      setCount(response.count)
    }
  }, [response])

  const contextValue = {
    applications,
    setApplications,
    count,
    setCount,
    isLoading
  }

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  )
} 