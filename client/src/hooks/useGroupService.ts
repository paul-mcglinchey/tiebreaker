import { IGroup, IGroupService } from "../models";
import { endpoints, GroupContext } from "../utilities";
import { useRequestBuilder, useAsyncHandler, useResolutionService } from '.';
import { useContext } from "react";

const useGroupService = (): IGroupService => {
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()
  const { groupId, updateGroupId, getGroups, getCount, isLoading, error, refresh } = useContext(GroupContext)

  const addGroup = asyncHandler(async (values: IGroup) => {
    const res = await fetch(endpoints.groups, requestBuilder('POST', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'create', 'group', [() => refresh()])
  })

  const updateGroup = asyncHandler(async (values: IGroup, groupId: string | undefined) => {
    if (!groupId) throw new Error('Group ID not set')

    const res = await fetch(endpoints.group(groupId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'update', 'group', [() => refresh()])
  })

  const deleteGroup = asyncHandler(async (groupId: string | undefined) => {
    if (!groupId) throw new Error('Group ID not set')
    
    const res = await fetch(endpoints.group(groupId), requestBuilder("DELETE"))
    const json = await res.json()

    handleResolution(res, json, 'delete', 'group', [() => refresh()])
  })

  const getTotalEmployees = (groups: IGroup[]): number => {
    const distinctEmployees: string[] = [];

    groups.forEach((group: IGroup) => {
      group.entities?.employees?.forEach((employeeId: string) => {
        if (!distinctEmployees.includes(employeeId)) distinctEmployees.push(employeeId);
      });
    });

    return distinctEmployees.length;
  }

  const getTotalRotas = (groups: IGroup[]): number => {
    const distinctRotas: string[] = [];

    groups.forEach((group: IGroup) => {
      group.entities?.rotas?.forEach((rotaId: string) => {
        if (!distinctRotas.includes(rotaId)) distinctRotas.push(rotaId);
      });
    });

    return distinctRotas.length;
  }

  const getTotalClients = (groups: IGroup[]): number => {
    let totalClients: number = 0;

    groups.forEach((group: IGroup) => {
      totalClients += group.entities?.clients?.length || 0;
    })

    return totalClients;
  }

  return { groupId, updateGroupId, getGroups, getCount, isLoading, error, refresh, addGroup, updateGroup, deleteGroup, getTotalClients, getTotalEmployees, getTotalRotas }
}

export default useGroupService