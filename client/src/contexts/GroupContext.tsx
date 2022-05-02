import { createContext, useCallback, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IGroup, IGroupsResponse } from "../models";
import { useFetch, useIsMounted, useRefresh, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { getItemInLocalStorage } from "../services";

interface IGroupContext {
  groupId: string
  updateGroupId: (groupId: string) => void
  getGroups: () => IGroup[]
  getCount: () => number
  isLoading: boolean
  error: any | undefined
  refresh: () => void
}

export const GroupContext = createContext<IGroupContext>({
  groupId: "",
  updateGroupId: () => {},
  getGroups: () => [],
  getCount: () => 0,
  isLoading: false,
  error: undefined,
  refresh: () => {}
});

export const GroupProvider = ({ children }: IChildrenProps) => {
  const [groupId, setGroupId] = useState<string>(getItemInLocalStorage('group-id') || "")
  const [groups, setGroups] = useState<IGroup[]>([])
  const [count, setCount] = useState<number>(0)
  const isMounted = useIsMounted()
  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh()
  const { response, isLoading, error }: IFetch<IGroupsResponse> = useFetch(endpoints.groups, requestBuilder(), [dependency])

  useEffect(() => {
    if (isMounted() && response) {
      setGroups(response.groups)
      setCount(response.count)
    }
  }, [isMounted, response])

  const contextValue = {
    groupId,
    updateGroupId: useCallback((groupId: string) => setGroupId(groupId), []),
    getGroups: useCallback(() => groups, [groups]), 
    getCount: useCallback(() => count, [count]),
    isLoading,
    error,
    refresh
  }

  return (
    <GroupContext.Provider value={contextValue}>
      {children}
    </GroupContext.Provider>
  )
} 