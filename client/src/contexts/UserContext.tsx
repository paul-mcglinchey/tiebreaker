import { createContext, useEffect, useState } from "react";
import { endpoints } from "../config";
import { useAsyncHandler, useGroupService, useIsMounted, useRequestBuilder } from "../hooks";
import { IChildrenProps, IUser, IUserContext, IUsersResponse } from "../models";

interface IUserProviderProps {
  groupId?: string | undefined
}

export const UserContext = createContext<IUserContext>({
  users: [],
  setUsers: () => {},
  count: 0,
  setCount: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: undefined,
  setError: () => {}
});

export const UserProvider = ({ groupId, children }: IUserProviderProps & IChildrenProps) => {
  const [users, setUsers] = useState<IUser[]>([])
  const [count, setCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | undefined>(undefined)

  const { asyncHandler } = useAsyncHandler()
  const { requestBuilder } = useRequestBuilder()
  const { currentGroup } = useGroupService()
  
  const isMounted = useIsMounted() 

  const fetchUsers = asyncHandler(async (groupId: string) => {
    setIsLoading(true)
    
    const res = await fetch(endpoints.groupusers(groupId), requestBuilder())
    const json: IUsersResponse = await res.json()
    
    setUsers(json.users)
    setCount(json.count)

    setIsLoading(false)
  })

  useEffect(() => {
    isMounted() && currentGroup && fetchUsers(groupId || currentGroup._id)
  }, [currentGroup, groupId])

  const contextValue = {
    users,
    setUsers,
    count,
    setCount,
    isLoading,
    setIsLoading,
    error,
    setError
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
} 