import { createContext, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IApplicationsContext, IApplication, IApplicationsResponse } from "../models";
import { useFetch, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";

export const ApplicationsContext = createContext<IApplicationsContext>({
  applications: [],
  setApplications: () => {},
  count: 0,
  setCount: () => {}
});

export const ApplicationsProvider = ({ children }: IChildrenProps) => {
  const [applications, setApplications] = useState<IApplication[]>([])
  const [count, setCount] = useState<number>(0)

  const { requestBuilder } = useRequestBuilder()
  const { response }: IFetch<IApplicationsResponse> = useFetch(endpoints.applications, requestBuilder(), [])

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
    setCount
  }

  return (
    <ApplicationsContext.Provider value={contextValue}>
      {children}
    </ApplicationsContext.Provider>
  )
} 