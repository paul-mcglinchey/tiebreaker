import { IGroupUserService } from "./interfaces"
import { useAsyncHandler, useRequestBuilder, useResolutionService } from "."
import { endpoints } from "../config"

const useGroupUserService = (): IGroupUserService => {
  
  const { asyncHandler } = useAsyncHandler()
  const { requestBuilder } = useRequestBuilder()
  const { handleResolution } = useResolutionService()

  const joinGroup = asyncHandler(async (groupId: string | undefined) => {
    if (!groupId) throw new Error('Group ID not set')

    const res = await fetch(endpoints.joingroup(groupId), requestBuilder('PUT'));
    const json = await res.json()

    handleResolution(res, json, 'join', 'group')
  })

  return { joinGroup }
}

export default useGroupUserService