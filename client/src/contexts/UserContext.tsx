import { createContext, useCallback, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IUser, IUsersResponse } from "../models";
import { useFetch, useGroupService, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";

interface IUserContext {
  getUsers: () => IUser[]
  getCount: () => number
  isLoading: boolean
  error: any | undefined
}

export const UserContext = createContext<IUserContext>({
  getUsers: () => [],
  getCount: () => 0,
  isLoading: false,
  error: undefined
});

export const UserProvider = ({ children }: IChildrenProps) => {
  const [users, setUsers] = useState<IUser[]>([])
  const [count, setCount] = useState<number>(0)
  
  const { currentGroup } = useGroupService()
  const { requestBuilder } = useRequestBuilder()
  const { response, isLoading, error }: IFetch<IUsersResponse> = useFetch(endpoints.groupusers(currentGroup?._id || ""), requestBuilder(), [currentGroup?._id])

  useEffect(() => {
    if (response) {
      setUsers(response.users)
      setCount(response.count)
    }
  }, [response])

  const contextValue = {
    getUsers: useCallback(() => users, [users]), 
    getCount: useCallback(() => count, [count]),
    isLoading,
    error
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
} 