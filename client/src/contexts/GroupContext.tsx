import { createContext, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IGroup, IGroupsResponse } from "../models";
import { useAuthService, useFetch, useIsMounted, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { getItemInLocalStorage, setItemInLocalStorage } from "../services";
import { IGroupContext } from "./interfaces";

export const GroupContext = createContext<IGroupContext>({
  currentGroup: undefined,
  setCurrentGroup: () => {},
  groups: [],
  invites: [],
  setGroups: () => {},
  count: 0,
  isLoading: false,
  error: undefined
});

export const GroupProvider = ({ children }: IChildrenProps) => {
  const [groups, setGroups] = useState<IGroup[] | undefined>()
  const [count, setCount] = useState<number>(0)
  const [currentGroup, setCurrentGroup] = useState<IGroup | undefined>(groups && groups.find(g => g.id === getItemInLocalStorage('group-id')))
  
  const isMounted = useIsMounted()
  const { requestBuilder } = useRequestBuilder()
  const { user } = useAuthService()
  const { response, isLoading, error }: IFetch<IGroupsResponse> = useFetch(endpoints.groups, requestBuilder(), [user])

  useEffect(() => {
    if (isMounted() && response) {
      setGroups(response.items)
      setCount(response.count)

      if (!currentGroup) {
        response.items[0] && setCurrentGroup(response.items.find(g => g.id === getItemInLocalStorage('group-id')) || response.items[0])
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  useEffect(() => {
    currentGroup && setItemInLocalStorage('group-id', currentGroup?.id)
  }, [currentGroup])

  useEffect(() => {
    groups && setCurrentGroup(groups.find(g => g.id === getItemInLocalStorage('group-id')) || groups[0])
  }, [groups])

  const contextValue = {
    currentGroup,
    setCurrentGroup,
    groups: groups?.filter(g => g.groupUsers.find(gu => gu.userId === user?.id)?.hasJoined),
    invites: groups?.filter(g => !g.groupUsers.find(gu => gu.userId === user?.id)?.hasJoined),
    setGroups,
    count,
    isLoading,
    error
  }

  return (
    <GroupContext.Provider value={contextValue}>
      {children}
    </GroupContext.Provider>
  )
} 