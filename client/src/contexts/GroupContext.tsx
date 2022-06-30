import { createContext, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IGroup, IGroupContext, IGroupsResponse } from "../models";
import { useFetch, useIsMounted, useRefresh, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { getItemInLocalStorage, setItemInStorage } from "../services";

export const GroupContext = createContext<IGroupContext>({
  currentGroup: undefined,
  setCurrentGroup: () => {},
  groups: [],
  setGroups: () => {},
  count: 0,
  isLoading: false,
  error: undefined,
  refresh: () => {}
});

export const GroupProvider = ({ children }: IChildrenProps) => {
  const [groups, setGroups] = useState<IGroup[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  const [currentGroup, setCurrentGroup] = useState<IGroup | undefined>(groups.find(g => g._id === getItemInLocalStorage('group-id')) || groups[0])
  
  const isMounted = useIsMounted()
  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh()
  const { response, isLoading: isGroupsLoading, error }: IFetch<IGroupsResponse> = useFetch(endpoints.groups, requestBuilder(), [dependency])

  useEffect(() => {
    setIsLoading(isGroupsLoading)
  }, [isGroupsLoading])

  useEffect(() => {
    if (isMounted() && response) {
      setGroups(response.groups)
      setCount(response.count)

      if (!currentGroup) {
        response.groups[0] && setCurrentGroup(response.groups[0])
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  useEffect(() => {
    setItemInStorage('group-id', currentGroup?._id)
  }, [currentGroup])

  const contextValue = {
    currentGroup,
    setCurrentGroup,
    groups,
    setGroups,
    count,
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