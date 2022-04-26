import { IListCollection, Notification } from "../models"
import { endpoints } from "../utilities"
import { useAsyncHandler, useNotification, useRequestBuilder, useResolutionService } from '.'

const useListCollectionService = (refresh: () => void = () => {}) => {

  const { addNotification } = useNotification()
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()

  const init = asyncHandler(async () => {
    const res = await fetch(endpoints.systemlistcollections, requestBuilder('POST', undefined, { lists: [] }))
    const json = await res.json()

    handleResolution(res, json, 'initialize', 'system list collection')
  })

  const update = asyncHandler(async (listcollectionId: string | undefined, values: IListCollection) => {
    if (!listcollectionId) return addNotification('Something went wrong...', Notification.Error)

    const res = await fetch(endpoints.systemlistcollection(listcollectionId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    if (res.ok) {
      addNotification(`${res.status}: Successfully updated system list collection`, Notification.Success)
      return refresh()
    }

    const message = `${res.status}: ${res.status < 500 ? (json.message || res.statusText) : 'A problem occurred updating system list collection'}`
    return addNotification(message, Notification.Error)
  })

  return { init, update }
}

export default useListCollectionService