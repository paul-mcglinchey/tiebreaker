import { createContext, useCallback, useEffect, useState } from "react";
import { IChildrenProps, IFetch, IGroup, IGroupContext, IGroupsResponse } from "../models";
import { useFetch, useIsMounted, useRefresh, useRequestBuilder } from "../hooks";
import { endpoints } from "../config";
import { getItemInLocalStorage } from "../services";

export const GroupContext = createContext<IGroupContext>({
  groupId: "",
  updateGroupId: () => {},
  getGroups: () => [],
  setGroups: () => {},
  getCount: () => 0,
  isLoading: false,
  error: undefined,
  refresh: () => {}
});

export const GroupProvider = ({ children }: IChildrenProps) => {
  const [groups, setGroups] = useState<IGroup[]>([])
  const [count, setCount] = useState<number>(0)
  const [groupId, setGroupId] = useState<string>(getItemInLocalStorage('group-id') || groups[0]?._id || "")
  const isMounted = useIsMounted()
  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh()
  const { response, isLoading, error }: IFetch<IGroupsResponse> = useFetch(endpoints.groups, requestBuilder(), [dependency])

  useEffect(() => {
    if (isMounted() && response) {
      setGroups(response.groups)
      setCount(response.count)

      if (!groupId) {
        response.groups[0]?._id && setGroupId(response.groups[0]?._id)
      }
    }
  }, [isMounted, response, groupId])

  const contextValue = {
    groupId,
    updateGroupId: (groupId: string) => setGroupId(groupId),
    getGroups: useCallback(() => groups, [groups]),
    setGroups,
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