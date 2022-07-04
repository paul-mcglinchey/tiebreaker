import { createContext, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IPermissionsResponse, IPermission } from "../models";
import { useFetch, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { IPermissionContext } from "./interfaces";

export const PermissionContext = createContext<IPermissionContext>({
  permissions: [],
  setPermissions: () => {},
  count: 0,
  setCount: () => {},
  isLoading: false
});

export const PermissionProvider = ({ children }: IChildrenProps) => {
  const [permissions, setPermissions] = useState<IPermission[]>([])
  const [count, setCount] = useState<number>(0)

  const { requestBuilder } = useRequestBuilder()
  const { response, isLoading }: IFetch<IPermissionsResponse> = useFetch(endpoints.permissions, requestBuilder(), [])

  useEffect(() => {
    if (response) {
      setPermissions(response.permissions)
      setCount(response.count)
    }
  }, [response])

  const contextValue = {
    permissions,
    setPermissions,
    count,
    setCount,
    isLoading
  }

  return (
    <PermissionContext.Provider value={contextValue}>
      {children}
    </PermissionContext.Provider>
  )
} 