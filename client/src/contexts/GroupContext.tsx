import { createContext, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IGroup, IGroupsResponse } from "../models";
import { useFetch, useIsMounted, useRefresh, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { getItemInLocalStorage, setItemInLocalStorage } from "../services";
import { IGroupContext } from "./interfaces";

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
  const [count, setCount] = useState<number>(0)
  const [currentGroup, setCurrentGroup] = useState<IGroup | undefined>(groups.find(g => g._id === getItemInLocalStorage('group-id')))
  
  const isMounted = useIsMounted()
  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh()
  const { response, isLoading, error }: IFetch<IGroupsResponse> = useFetch(endpoints.groups, requestBuilder(), [dependency])

  useEffect(() => {
    if (isMounted() && response) {
      setGroups(response.groups)
      setCount(response.count)

      if (!currentGroup) {
        response.groups[0] && setCurrentGroup(response.groups.find(g => g._id === getItemInLocalStorage('group-id')) || response.groups[0])
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  useEffect(() => {
    currentGroup && setItemInLocalStorage('group-id', currentGroup?._id)
  }, [currentGroup])

  useEffect(() => {
    setCurrentGroup(groups.find(g => g._id === getItemInLocalStorage('group-id')) || groups[0])
  }, [groups])

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