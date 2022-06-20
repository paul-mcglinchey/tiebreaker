import { useContext } from "react"
import { IGroup, IGroupService } from "../models"
import { GroupContext } from "../contexts"
import { endpoints } from '../config'
import { useRequestBuilder, useAsyncHandler, useResolutionService } from '.'

const useGroupService = (): IGroupService => {
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()
  
  const groupContext = useContext(GroupContext)
  const { groups, setGroups } = groupContext

  const getGroup = (groupId: string | undefined): IGroup | undefined => {
    return groups.find((group: IGroup) => group._id === groupId)
  }

  const addGroup = asyncHandler(async (values: IGroup) => {
    const res = await fetch(endpoints.groups, requestBuilder('POST', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'create', 'group', [() => addGroupInContext(json)])
  })

  const updateGroup = asyncHandler(async (values: IGroup, groupId: string | undefined) => {
    if (!groupId) throw new Error('Group ID not set')

    const res = await fetch(endpoints.group(groupId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'update', 'group', [() => updateGroupInContext(groupId, values)])
  })

  const deleteGroup = asyncHandler(async (groupId: string | undefined) => {
    if (!groupId) throw new Error('Group ID not set')
    
    const res = await fetch(endpoints.group(groupId), requestBuilder("DELETE"))
    const json = await res.json()

    handleResolution(res, json, 'delete', 'group', [() => removeGroupInContext(groupId)])
  })

  const addGroupInContext = (group: IGroup) => {
    setGroups(groups => [...groups, group])
  }

  const removeGroupInContext = (groupId: string) => {
    setGroups(groups => groups.filter(g => g._id !== groupId))
  }

  const updateGroupInContext = (groupId: string, values: IGroup) => {
    setGroups(groups => {
      return groups.map(g => {
        return g._id === groupId ? { ...g, ...values } : g
      })
    })
  }

  return { ...groupContext, getGroup, addGroup, updateGroup, deleteGroup }
}

export default useGroupService